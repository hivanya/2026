import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SrcDir = 'design/icon-svg/wave';
const OutDir = 'public/images/wave';
const Chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
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

  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg}`,
    { waitUntil: 'load' },
  );

  const png = await page.screenshot({ omitBackground: true, type: 'png' });
  await writeFile(path.join(OutDir, file.replace('.svg', '.png')), png);

  console.log(
    `${file.replace('.svg', '.png')}  ${size * Scale}×${size * Scale}`,
  );
}

await browser.close();
