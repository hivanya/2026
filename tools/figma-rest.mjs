// Рендерит составные кадры макета через Figma Images API
//
// Заливкой их не взять: внутри от десятков до тысяч слоёв. Дизайнер
// разложил исходники по группам «Исходнные картинки для блок N»,
// их id и стоят ниже
//
// Рендер-эндпоинт живёт на часовом бюджете и после серии запросов
// уходит в 429 надолго, поэтому: несколько id за запрос, пауза между
// пачками и пропуск уже выгруженного
//
// Запуск: npm run figma:rest

import { execFile } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
const Api = 'https://api.figma.com/v1';
const ImgDir = 'public/images';
const TmpDir = 'design/rest-src';

const Batches = [
  // Блок 3 — коллаж Яндекс Музыки
  {
    scale: 2,
    dir: ImgDir,
    items: [
      ['274:12541', 'music-phone'],
      ['274:12562', 'music-artist'],
      ['274:12565', 'music-laptop'],
      ['274:12569', 'music-icon-art'],
    ],
  },
  // Два кадра карусели: в макете под ней две точки
  {
    scale: 1,
    dir: ImgDir,
    items: [['224:22283', 'music-carousel-1'], ['224:22282', 'music-carousel-2']],
  },
  { scale: 2, dir: ImgDir, items: [['274:12573', 'wave-phone']] },
  { scale: 2, dir: ImgDir, items: [['80:68', 'watch-left'], ['100:118', 'watch-right']] },
  // У квадратного блока и карточки цены поверх картинки свои слои
  {
    scale: 2,
    dir: ImgDir,
    items: [['132:10979', 'yango-card-square'], ['133:11087', 'price-card']],
  },
  { scale: 1, dir: ImgDir, items: [['136:11330', 'yango-deli']] },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const env = {};
for (const line of (await readFile('.env.local', 'utf8')).split('\n')) {
  const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].trim();
}

await mkdir(TmpDir, { recursive: true });
await mkdir(ImgDir, { recursive: true });

for (const [index, { scale, dir, items }] of Batches.entries()) {
  const todo = items.filter(([, name]) => !existsSync(path.join(dir, `${name}.webp`)));

  if (!todo.length) {
    console.log(`пачка ${index + 1}: всё на месте`);
    continue;
  }

  const ids = todo.map(([id]) => id).join(',');
  const url = `${Api}/images/${env.FIGMA_FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=${scale}`;

  let images = null;

  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const response = await fetch(url, { headers: { 'X-Figma-Token': env.FIGMA_TOKEN } });

    if (response.ok) {
      images = (await response.json()).images;
      break;
    }

    // Бюджет рендера часовой: частые повторы держат окно занятым
    const pause = response.status === 429 ? 600000 : attempt * 8000;
    console.log(`  пачка ${index + 1}: HTTP ${response.status}, жду ${pause / 1000}с (${attempt}/8)`);
    await sleep(pause);
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

    const png = path.join(TmpDir, `${name}.png`);
    await writeFile(png, Buffer.from(await response.arrayBuffer()));

    // -q 82: ниже на скриншотах интерфейса заметна каша на мелком тексте
    await run('cwebp', ['-quiet', '-q', '82', png, '-o', path.join(dir, `${name}.webp`)]);
    console.log(`${name}.webp`);
  }

  // Пауза между пачками: лимит считается по частоте запросов
  await sleep(6000);
}

await rm(TmpDir, { recursive: true, force: true });
console.log('\nготово');
