// Качает оригинальные растры-заливки из макета.
//
// Рендер-эндпоинт Figma (/v1/images) дорогой и быстро упирается в 429,
// а /v1/files/:key/images отдаёт карту imageRef → ссылка на S3 одним
// дешёвым запросом. Для картинок, которые в макете лежат заливкой
// прямоугольника, это и короче, и качественнее: берём исходник, а не рендер.
//
// Запуск: node tools/figma-fills.mjs

import { execFile } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const OutDir = 'public/images';
const TmpDir = 'design/fill-src';

// Имя узла в макете → имя файла в public/images.
const Wanted = {
  'image 1': 'showreel-poster',
  'YM_FinalConcept_Final deck74': 'music-artist',
  'image 4': 'music-laptop',
  object_1: 'music-icon-art',
  'image 388': 'icon-sostav',
  'image 395': 'yango-backdrop',
  'image 386': 'yango-phone',
  '360px 1': 'yango-card-tall',
  '375px 1': 'yango-card-mid',
  BlockBigSquare: 'yango-card-square',
  Price_0: 'price-card',
  'Ellipse 723': 'yango-avatar',
};

const nodes = JSON.parse(await readFile('design/nodes.json', 'utf8'));
const fills = JSON.parse(await readFile('design/fills.json', 'utf8'));
const urls = fills.meta.images;

await mkdir(TmpDir, { recursive: true });
await mkdir(OutDir, { recursive: true });

const seen = new Set();

for (const node of nodes) {
  const name = Wanted[node.name];
  if (!name || seen.has(name)) continue;

  const ref = (node.fills ?? [])
    .find((fill) => typeof fill === 'string' && fill.startsWith('IMAGE:'))
    ?.slice('IMAGE:'.length);

  if (!ref) continue;

  const href = urls[ref];
  if (!href) {
    console.log(`  ${name}: ref ${ref} не нашёлся в карте заливок`);
    continue;
  }

  const response = await fetch(href);
  if (!response.ok) {
    console.log(`  ${name}: ${response.status} при скачивании`);
    continue;
  }

  const src = path.join(TmpDir, `${name}.src`);
  await writeFile(src, Buffer.from(await response.arrayBuffer()));

  // -q 82: ниже на скриншотах интерфейса заметна каша на мелком тексте.
  await run('cwebp', ['-quiet', '-q', '82', src, '-o', path.join(OutDir, `${name}.webp`)]);

  seen.add(name);
  console.log(`${name}.webp`);
}

const missing = Object.values(Wanted).filter((name) => !seen.has(name));
if (missing.length) console.log(`\nне выгрузилось: ${missing.join(', ')}`);

await rm(TmpDir, { recursive: true, force: true });
console.log('\nготово');
