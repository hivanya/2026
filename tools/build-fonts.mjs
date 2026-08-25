import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const src = process.argv[2] ?? '/tmp';

const Unicodes = [
  'U+0000-00FF',
  'U+0131',
  'U+0152-0153',
  'U+02BB-02BC',
  'U+02C6',
  'U+02DA',
  'U+02DC',
  'U+2000-206F',
  'U+2074',
  'U+20AC',
  'U+2122',
  'U+2191',
  'U+2193',
  'U+2212',
  'U+2215',
  'U+FEFF',
  'U+FFFD',
  'U+0400-045F',
  'U+0490-0491',
  'U+04B0-04B1',
  'U+2116',
].join(',');

for (const name of ['GraphikLCG-Regular', 'GraphikLCG-Medium']) {
  await run('python3', [
    '-m',
    'fontTools.subset',
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
