// Переводит собранные из геометрии SVG-иконки в png
//
// Зачем: дизайнер просил иконки отдельными png, а рендер-эндпоинт Figma
// в это время сидел в 429. Контуры берутся дешёвым /nodes?geometry=paths
// (tools/figma-icons.mjs), а растеризует их системный Chrome — сторонний
// растеризатор ради шестнадцати иконок ставить незачем
//
// Запуск: node tools/rasterize-icons.mjs
// Нужен puppeteer-core: npx --yes puppeteer-core@latest не поставит его
// сам, поэтому путь к модулю берём из переменной PUPPETEER_PATH,
// если он лежит вне проекта

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SrcDir = 'design/icon-svg/wave';
const OutDir = 'public/images/wave';
const Chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// Иконка в макете 90×90; 3× хватает и для retina, и по весу
const Scale = 3;

const { default: puppeteer } = await import(
  process.env.PUPPETEER_PATH ?? 'puppeteer-core'
);

await mkdir(OutDir, { recursive: true });

const files = (await readdir(SrcDir)).filter((name) => name.endsWith('.svg'));

const browser = await puppeteer.launch({
  executablePath: Chrome,
  headless: 'shell',
  args: ['--no-sandbox'],
});

const page = await browser.newPage();

for (const file of files) {
  const svg = await readFile(path.join(SrcDir, file), 'utf8');
  const size = Number(svg.match(/width="(\d+(?:\.\d+)?)"/)[1]);

  await page.setViewport({
    width: Math.round(size),
    height: Math.round(size),
    deviceScaleFactor: Scale,
  });

  // Фон прозрачный: иконки лежат на тёмной подложке страницы
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg}`,
    { waitUntil: 'load' },
  );

  const png = await page.screenshot({ omitBackground: true, type: 'png' });
  await writeFile(path.join(OutDir, file.replace('.svg', '.png')), png);

  console.log(`${file.replace('.svg', '.png')}  ${size * Scale}×${size * Scale}`);
}

await browser.close();
