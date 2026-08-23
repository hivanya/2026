// Собирает векторные иконки в SVG прямо из геометрии макета
//
// Рендер-эндпоинт Figma живёт на часовом бюджете и после первой выгрузки
// надолго уходит в 429, а /v1/files/:key/nodes?geometry=paths не лимитирован
// и отдаёт готовые контуры. Для плоских иконок этого достаточно — заодно
// получаем настоящий вектор вместо растра
//
// Запуск: node tools/figma-icons.mjs

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const Api = 'https://api.figma.com/v1';
// Контуры кладём во временную папку: наружу иконки уезжают в png,
// как просил дизайнер. Растеризует их tools/rasterize-icons.mjs
const OutRoot = 'design/icon-svg';

const WaveIcons = [
  ['274:12839', 'wave/icon-1'], ['274:12848', 'wave/icon-2'],
  ['274:12853', 'wave/icon-3'], ['274:12829', 'wave/icon-4'],
  ['274:12784', 'wave/icon-5'], ['274:12843', 'wave/icon-6'],
  ['274:12819', 'wave/icon-7'], ['274:12835', 'wave/icon-8'],
  ['274:12796', 'wave/icon-9'], ['274:12811', 'wave/icon-10'],
  ['274:12788', 'wave/icon-11'], ['274:12803', 'wave/icon-12'],
  ['274:12871', 'wave/icon-13'], ['274:12866', 'wave/icon-14'],
  ['274:12863', 'wave/icon-15'], ['274:12857', 'wave/icon-16'],
];

const Targets = [...WaveIcons, ['26:172', 'icon-flash'], ['43:6748', 'icon-plus']];

function toColor(paint) {
  if (!paint || paint.type !== 'SOLID') return null;

  const { r, g, b } = paint.color;
  const hex = [r, g, b]
    .map((channel) => Math.round(channel * 255).toString(16).padStart(2, '0'))
    .join('');

  // Прозрачность живёт в двух местах — в альфе цвета и в opacity заливки
  const alpha = (paint.color.a ?? 1) * (paint.opacity ?? 1);

  return { hex: `#${hex}`, alpha };
}

function visible(paints) {
  return (paints ?? []).find((paint) => paint.visible !== false);
}

// Контуры Figma лежат в системе координат самого узла, поэтому каждый
// сдвигаем на его смещение относительно рамки иконки
function collect(node, origin, out) {
  const box = node.absoluteBoundingBox;
  const dx = box ? box.x - origin.x : 0;
  const dy = box ? box.y - origin.y : 0;
  const shift = dx || dy ? ` transform="translate(${dx} ${dy})"` : '';

  const fill = toColor(visible(node.fills));
  const stroke = toColor(visible(node.strokes));

  if (fill) {
    for (const { path: d, windingRule } of node.fillGeometry ?? []) {
      const rule = windingRule === 'EVENODD' ? ' fill-rule="evenodd"' : '';
      const alpha = fill.alpha < 1 ? ` fill-opacity="${fill.alpha}"` : '';
      out.push(`<g${shift}><path d="${d}" fill="${fill.hex}"${rule}${alpha}/></g>`);
    }
  }

  // Обводку Figma тоже отдаёт контуром — рисуем её заливкой, иначе
  // пришлось бы угадывать stroke-width и выравнивание
  if (stroke) {
    for (const { path: d, windingRule } of node.strokeGeometry ?? []) {
      const rule = windingRule === 'EVENODD' ? ' fill-rule="evenodd"' : '';
      const alpha = stroke.alpha < 1 ? ` fill-opacity="${stroke.alpha}"` : '';
      out.push(`<g${shift}><path d="${d}" fill="${stroke.hex}"${rule}${alpha}/></g>`);
    }
  }

  // У булевых операций Figma отдаёт уже сведённый контур — дети внутри
  // это исходные фигуры, рисовать их поверх нельзя
  if (node.type === 'BOOLEAN_OPERATION') return;

  for (const child of node.children ?? []) collect(child, origin, out);
}

const env = {};
for (const line of (await readFile('.env.local', 'utf8')).split('\n')) {
  const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].trim();
}

const ids = Targets.map(([id]) => id).join(',');
const response = await fetch(
  `${Api}/files/${env.FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(ids)}&geometry=paths`,
  { headers: { 'X-Figma-Token': env.FIGMA_TOKEN } },
);

if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);

const { nodes } = await response.json();

await mkdir(path.join(OutRoot, 'wave'), { recursive: true });

for (const [id, name] of Targets) {
  const node = nodes[id]?.document;
  if (!node) {
    console.log(`${name}: узла нет в ответе`);
    continue;
  }

  const box = node.absoluteBoundingBox;
  const parts = [];
  collect(node, box, parts);

  if (!parts.length) {
    console.log(`${name}: контуров не нашлось`);
    continue;
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${box.width}" height="${box.height}" ` +
    `viewBox="0 0 ${box.width} ${box.height}" fill="none">${parts.join('')}</svg>\n`;

  await writeFile(path.join(OutRoot, `${name}.svg`), svg);
  console.log(`${name}.svg  (${parts.length} контуров)`);
}
