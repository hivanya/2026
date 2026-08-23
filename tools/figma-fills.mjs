// Качает растры-заливки из макета и режет их так, как их режет Figma
//
// Рендер-эндпоинт живёт на часовом бюджете, а /v1/files/:key/images
// отдаёт карту imageRef → ссылка на S3 одним дешёвым запросом
//
// Но взять исходник «как есть» нельзя, у заливки есть режим:
//   CROP (в API он называется STRETCH) — у заливки матрица
//     imageTransform, видна только вырезанная ею часть картинки
//   FILL — картинка масштабируется «по большей стороне» и центрируется
//   FIT — влезает целиком, резать нечего
//
// Запуск: npm run figma:fills

import { execFile } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import path from 'node:path';

const run = promisify(execFile);
const Api = 'https://api.figma.com/v1';
const OutDir = 'public/images';
const TmpDir = 'design/fill-src';

// id узла в макете → имя файла в public/images
const Targets = [
  ['6:23', 'showreel-poster'],
  ['26:170', 'music-icon-art'],
  ['75:68', 'icon-sostav'],
  ['101:139', 'yango-backdrop'],
  ['60:15281', 'yango-phone'],
  ['126:7247', 'yango-card-tall'],
  ['125:4561', 'yango-card-mid'],
  ['156:1018', 'yango-avatar'],
  ['240:28322', 'case-stalo'],
  ['240:28324', 'case-5'],
  ['241:28867', 'case-32'],
  ['243:29203', 'case-ticket'],
  ['245:29393', 'case-carousel'],
  ['198:20085', 'm-wave-icons'],
  ['271:41241', 'm-wave-extra'],
];

const env = {};
for (const line of (await readFile('.env.local', 'utf8')).split('\n')) {
  const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].trim();
}

// Карту заливок тянем каждый раз: дизайнер добавляет картинки,
// и сохранённая карта устаревает
const fillsResponse = await fetch(`${Api}/files/${env.FIGMA_FILE_KEY}/images`, {
  headers: { 'X-Figma-Token': env.FIGMA_TOKEN },
});
if (!fillsResponse.ok) throw new Error(`${fillsResponse.status} при запросе карты заливок`);
const urls = (await fillsResponse.json()).meta.images;

const nodesResponse = await fetch(
  `${Api}/files/${env.FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(Targets.map(([id]) => id).join(','))}`,
  { headers: { 'X-Figma-Token': env.FIGMA_TOKEN } },
);
if (!nodesResponse.ok) throw new Error(`${nodesResponse.status} ${await nodesResponse.text()}`);
const { nodes } = await nodesResponse.json();

await mkdir(TmpDir, { recursive: true });
await mkdir(OutDir, { recursive: true });

// Какая часть исходника видна, в долях от него
function visibleRegion(fill, rect, pixelWidth, pixelHeight) {
  if (fill.scaleMode === 'STRETCH' && fill.imageTransform) {
    const [[du, , u0], [, dv, v0]] = fill.imageTransform;
    return [u0, v0, du, dv];
  }

  if (fill.scaleMode === 'FILL') {
    const rectRatio = rect.width / rect.height;
    const imageRatio = pixelWidth / pixelHeight;

    // Шире, чем нужно — режем по бокам; уже — сверху и снизу
    const width = imageRatio > rectRatio ? rectRatio / imageRatio : 1;
    const height = imageRatio > rectRatio ? 1 : imageRatio / rectRatio;

    return [(1 - width) / 2, (1 - height) / 2, width, height];
  }

  return [0, 0, 1, 1];
}

for (const [id, name] of Targets) {
  const node = nodes[id]?.document;
  const fill = (node?.fills ?? []).find((f) => f.type === 'IMAGE' && f.visible !== false);

  if (!fill) {
    console.log(`${name}: у узла ${id} нет видимой картинки-заливки`);
    continue;
  }

  const href = urls[fill.imageRef];

  if (!href) {
    console.log(`${name}: imageRef ${fill.imageRef} не нашёлся в карте заливок`);
    continue;
  }

  const response = await fetch(href);
  const src = path.join(TmpDir, `${name}.src`);
  await writeFile(src, Buffer.from(await response.arrayBuffer()));

  const info = await run('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', src]);
  const pixelWidth = Number(info.stdout.match(/pixelWidth:\s*(\d+)/)[1]);
  const pixelHeight = Number(info.stdout.match(/pixelHeight:\s*(\d+)/)[1]);

  const rect = node.absoluteBoundingBox;
  const [u0, v0, du, dv] = visibleRegion(fill, rect, pixelWidth, pixelHeight);

  const clamp = (value, max) => Math.max(0, Math.min(Math.round(value), max));
  const left = clamp(u0 * pixelWidth, pixelWidth - 1);
  const top = clamp(v0 * pixelHeight, pixelHeight - 1);
  const width = clamp(du * pixelWidth, pixelWidth - left);
  const height = clamp(dv * pixelHeight, pixelHeight - top);

  const args = ['-quiet', '-q', '82'];
  const cropped = left || top || width !== pixelWidth || height !== pixelHeight;
  if (cropped) args.push('-crop', String(left), String(top), String(width), String(height));

  await run('cwebp', [...args, src, '-o', path.join(OutDir, `${name}.webp`)]);

  console.log(
    `${name}.webp  ${fill.scaleMode}  исходник ${pixelWidth}×${pixelHeight}` +
      (cropped ? ` → вырез ${width}×${height} от (${left}, ${top})` : ' → без обрезки'),
  );
}

await rm(TmpDir, { recursive: true, force: true });
