// Пережимает присланные ttf Graphik LCG в woff2 сабсетом
//
// Полные ttf по 200 КБ на начертание — это полмегабайта на первый экран
// ради двух весов. Сабсет режет всё, чего на странице нет, и оставляет
// 23-25 КБ. Нужен python3 с fonttools и brotli
//
// Запуск: npm run fonts:build -- <папка-с-ttf>

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const src = process.argv[2] ?? '/tmp';

// Латиница, расширенная латиница, пунктуация (нужны длинное тире
// и типографские кавычки) и кириллица — начертание LCG её содержит
const Unicodes = [
  'U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA',
  'U+02DC', 'U+2000-206F', 'U+2074', 'U+20AC', 'U+2122', 'U+2191', 'U+2193',
  'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD', 'U+0400-045F', 'U+0490-0491',
  'U+04B0-04B1', 'U+2116',
].join(',');

for (const name of ['GraphikLCG-Regular', 'GraphikLCG-Medium']) {
  await run('python3', [
    '-m', 'fontTools.subset',
    `${src}/${name}.ttf`,
    `--unicodes=${Unicodes}`,
    '--layout-features=*',
    '--flavor=woff2',
    `--output-file=src/fonts/${name}.woff2`,
    '--no-hinting',
    '--desubroutinize',
  ]);

  console.log(`src/fonts/${name}.woff2`);
}
