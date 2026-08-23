// Рендерит узлы макета в PNG через Figma Images API и раскладывает
// их в public/images/ уже в webp.
//
// Почему по одному узлу за запрос: Figma рендерит крупные кадры долго,
// и пачка из тридцати id роняет соединение по таймауту (other side closed).
// Плюс так понятно, какой именно кадр не отдался.
//
// Запуск: node tools/figma-export.mjs

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const Api = 'https://api.figma.com/v1';
const OutDir = 'public/images';
const TmpDir = 'design/png';

// nodeId → имя файла в public/images. Совпадает с src/utils/consts/assets.ts.
// scale: у кадров шире ~2000px ставим 1 — Figma всё равно режет по 4096px,
// а вес растёт втрое.
const Targets = [
  ['42:6716', 'music-backdrop', 1],
  ['6:23', 'showreel-poster', 2],
  ['24:1556', 'music-phone', 2],
  ['17:183', 'music-artist', 2],
  ['17:175', 'music-laptop', 2],
  ['26:170', 'music-icon', 2],
  ['26:172', 'icon-flash', 4],
  ['43:6748', 'icon-plus', 4],
  ['75:68', 'icon-sostav', 4],
  ['45:9911', 'music-carousel', 1],
  ['25:1595', 'wave-phone', 2],
  ['46:12386', 'wave-icons', 2],
  ['80:68', 'watch-left', 2],
  ['100:118', 'watch-right', 2],
  ['101:139', 'yango-backdrop', 1],
  ['60:15281', 'yango-phone', 2],
  ['126:7247', 'yango-card-tall', 2],
  ['125:4561', 'yango-card-mid', 2],
  ['132:10979', 'yango-card-square', 2],
  ['156:1018', 'yango-avatar', 4],
  ['171:12191', 'yango-play', 2],
  ['133:11088', 'price-card', 2],
  ['136:11330', 'yango-deli', 1],
  ['168:42671', 'interfaces-strip', 1],
];

async function loadEnv() {
  const env = {};

  for (const line of (await readFile('.env.local', 'utf8')).split('\n')) {
    const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (match) env[match[1]] = match[2].trim();
  }

  return env;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Две разные беды, обе лечатся ожиданием: рендер крупного кадра рвёт
// соединение по таймауту, а частые запросы ловят 429. Для 429 ждём дольше —
// Figma отпускает лимит не сразу, и короткий повтор только тратит попытку.
async function withRetry(label, fn, attempts = 6) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= attempts) throw error;

      const throttled = String(error.message).startsWith('429');
      const pause = throttled ? 60000 : attempt * 5000;

      console.log(
        `  ${label}: ${throttled ? 'рейт-лимит' : 'обрыв'}, жду ${pause / 1000}с (попытка ${attempt})`,
      );
      await sleep(pause);
    }
  }
}

const { FIGMA_TOKEN: token, FIGMA_FILE_KEY: key } = await loadEnv();

await mkdir(TmpDir, { recursive: true });
await mkdir(OutDir, { recursive: true });

let done = 0;

for (const [nodeId, name, scale] of Targets) {
  const webp = path.join(OutDir, `${name}.webp`);

  // Выгрузка рвётся на рейт-лимите, поэтому скрипт должен доезжать
  // с места остановки, а не начинать сначала.
  if (existsSync(webp)) {
    done += 1;
    console.log(`${String(done).padStart(2)}/${Targets.length}  ${name}.webp — уже есть`);
    continue;
  }

  const url = `${Api}/images/${key}?ids=${encodeURIComponent(nodeId)}&format=png&scale=${scale}`;

  const link = await withRetry(name, async () => {
    const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);

    const body = await response.json();
    const href = body.images?.[nodeId];
    if (!href) throw new Error(`Figma не отдала картинку для ${nodeId}`);

    return href;
  });

  const png = path.join(TmpDir, `${name}.png`);

  await withRetry(`${name} (скачивание)`, async () => {
    const response = await fetch(link);
    if (!response.ok) throw new Error(`${response.status} при скачивании`);

    await writeFile(png, Buffer.from(await response.arrayBuffer()));
  });

  // -q 82 — на скриншотах интерфейса ниже уже видно кашу на тексте.
  await run('cwebp', ['-quiet', '-q', '82', png, '-o', webp]);

  done += 1;
  console.log(`${String(done).padStart(2)}/${Targets.length}  ${name}.webp`);

  // Пауза между кадрами: без неё Figma отдаёт 429 уже на шестом запросе.
  await sleep(2500);
}

if (existsSync(TmpDir)) await rm(TmpDir, { recursive: true, force: true });

console.log('\nготово');
