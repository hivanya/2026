// Выводит спеку узла: размеры, отступы, цвета, типографику
// Рендер-эндпоинт живёт на часовом бюджете, /nodes делит его с ним,
// поэтому скрипт ждёт и повторяет
//
// Запуск: node tools/figma-node.mjs <node-id>

import { readFile } from 'node:fs/promises';

const id = process.argv[2];
if (!id) throw new Error('нужен id узла');

const env = {};
for (const line of (await readFile('.env.local', 'utf8')).split('\n')) {
  const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].trim();
}

const url =
  `https://api.figma.com/v1/files/${env.FIGMA_FILE_KEY}` +
  `/nodes?ids=${encodeURIComponent(id)}&depth=4`;

let body = null;

for (let attempt = 1; attempt <= 12; attempt += 1) {
  const response = await fetch(url, { headers: { 'X-Figma-Token': env.FIGMA_TOKEN } });

  if (response.ok) {
    body = await response.json();
    break;
  }

  console.log(`HTTP ${response.status}, жду 300с (${attempt}/12)`);
  await new Promise((resolve) => setTimeout(resolve, 300000));
}

if (!body) throw new Error('не дождались');

const colour = (paint) => {
  const c = paint?.color;
  if (!c) return paint?.type;
  const hex = ['r', 'g', 'b'].map((k) => Math.round(c[k] * 255).toString(16).padStart(2, '0')).join('');
  const alpha = (c.a ?? 1) * (paint.opacity ?? 1);
  return `#${hex}${alpha < 1 ? ` @${alpha.toFixed(2)}` : ''}`;
};

const walk = (node, depth = 0, ox = null, oy = null) => {
  const box = node.absoluteBoundingBox ?? {};
  if (ox === null) [ox, oy] = [box.x ?? 0, box.y ?? 0];

  const style = node.style ?? {};
  const text =
    node.type === 'TEXT'
      ? ` | ${style.fontFamily} ${style.fontWeight} ${style.fontSize}/${style.lineHeightPx} ls=${style.letterSpacing} | ${JSON.stringify(node.characters)}`
      : '';

  console.log(
    `${'  '.repeat(depth)}${node.id} [${node.type}] ${node.name} ` +
      `${Math.round((box.x ?? 0) - ox)},${Math.round((box.y ?? 0) - oy)} ` +
      `${Math.round(box.width ?? 0)}x${Math.round(box.height ?? 0)} r=${node.cornerRadius} ` +
      `fill=${(node.fills ?? []).map(colour)} stroke=${(node.strokes ?? []).map(colour)} sw=${node.strokeWeight} ` +
      `pad=${[node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft]} gap=${node.itemSpacing}${text}`,
  );

  for (const child of node.children ?? []) walk(child, depth + 1, ox, oy);
};

walk(body.nodes[id].document);
