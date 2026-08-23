// Докачивает то, что нельзя взять заливкой: векторные иконки (SVG)
// и составные кадры — мокапы, карусель, нижнюю ленту (PNG).
//
// Рендер-эндпоинт Figma живёт на жёстком лимите и после серии запросов
// уходит в 429 надолго — минутами. Поэтому здесь терпеливый бэкофф и
// пропуск уже выгруженного: скрипт можно перезапускать сколько угодно.
//
// Запуск: node tools/figma-rest.mjs

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const Api = 'https://api.figma.com/v1';
const ImgDir = 'public/images';
const IconDir = 'public/images/wave';
const TmpDir = 'design/rest-src';

// Сетка «Моей волны» — 16 иконок 90×90, слева направо, сверху вниз.
const WaveIcons = [
  ['46:12227', 'icon-1'], ['46:12373', 'icon-2'], ['46:12378', 'icon-3'], ['46:12174', 'icon-4'],
  ['46:11982', 'icon-5'], ['46:12252', 'icon-6'], ['46:12146', 'icon-7'], ['46:12188', 'icon-8'],
  ['46:12082', 'icon-9'], ['46:12123', 'icon-10'], ['46:11990', 'icon-11'], ['46:12095', 'icon-12'],
  ['46:12352', 'icon-13'], ['46:12322', 'icon-14'], ['46:12171', 'icon-15'], ['46:12089', 'icon-16'],
];

const Batches = [
  { format: 'svg', dir: IconDir, items: WaveIcons },
  {
    format: 'svg',
    dir: ImgDir,
    items: [['26:172', 'icon-flash'], ['43:6748', 'icon-plus']],
  },
  {
    format: 'png',
    scale: 2,
    dir: ImgDir,
    items: [['25:1595', 'wave-phone'], ['100:118', 'watch-right'], ['171:12191', 'yango-play']],
  },
  { format: 'png', scale: 2, dir: ImgDir, items: [['80:68', 'watch-left']] },
  { format: 'png', scale: 1, dir: ImgDir, items: [['45:9911', 'music-carousel']] },
  { format: 'png', scale: 1, dir: ImgDir, items: [['136:11330', 'yango-deli']] },
  { format: 'png', scale: 1, dir: ImgDir, items: [['168:42671', 'interfaces-strip']] },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadEnv() {
  const env = {};
  for (const line of (await readFile('.env.local', 'utf8')).split('\n')) {
    const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (match) env[match[1]] = match[2].trim();
  }
  return env;
}

const { FIGMA_TOKEN: token, FIGMA_FILE_KEY: key } = await loadEnv();

await mkdir(TmpDir, { recursive: true });
await mkdir(IconDir, { recursive: true });

for (const { format, scale, dir, items } of Batches) {
  const ext = format === 'svg' ? 'svg' : 'webp';
  const todo = items.filter(([, name]) => !existsSync(path.join(dir, `${name}.${ext}`)));

  if (!todo.length) {
    console.log(`пропуск: ${items.map(([, n]) => n).join(', ')}`);
    continue;
  }

  const ids = todo.map(([id]) => id).join(',');
  const url =
    `${Api}/images/${key}?ids=${encodeURIComponent(ids)}&format=${format}` +
    (scale ? `&scale=${scale}` : '');

  let images = null;

  for (let attempt = 1; attempt <= 12; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'X-Figma-Token': token } });

      if (response.status === 429) throw new Error('429');
      if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);

      images = (await response.json()).images;
      break;
    } catch (error) {
      const throttled = String(error.message).includes('429');
      const pause = throttled ? 120000 : attempt * 10000;
      console.log(
        `  ${todo[0][1]}…: ${throttled ? 'рейт-лимит' : error.message}, жду ${pause / 1000}с (${attempt}/12)`,
      );
      await sleep(pause);
    }
  }

  if (!images) {
    console.log(`НЕ ВЫШЛО: ${todo.map(([, n]) => n).join(', ')}`);
    continue;
  }

  for (const [id, name] of todo) {
    const href = images[id];
    if (!href) {
      console.log(`  ${name}: Figma ничего не отдала`);
      continue;
    }

    const response = await fetch(href);
    if (!response.ok) {
      console.log(`  ${name}: ${response.status} при скачивании`);
      continue;
    }

    const body = Buffer.from(await response.arrayBuffer());

    if (format === 'svg') {
      await writeFile(path.join(dir, `${name}.svg`), body);
    } else {
      const src = path.join(TmpDir, `${name}.png`);
      await writeFile(src, body);
      await run('cwebp', ['-quiet', '-q', '82', src, '-o', path.join(dir, `${name}.webp`)]);
    }

    console.log(`${name}.${ext}`);
  }

  // Пауза между пачками: лимит считается по частоте, а не по объёму.
  await sleep(20000);
}

await rm(TmpDir, { recursive: true, force: true });
console.log('\nготово');
