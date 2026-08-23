// Забирает макет из Figma REST API в design/: дерево узлов, комментарии
// и превью фреймов. Нужен, потому что по публичной ссылке файл не читается —
// страница рисуется на клиенте, а API без токена отдаёт 403.
//
// Запуск: node tools/figma-pull.mjs
// Токен берётся из .env.local (см. .env.local.example).

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OutDir = 'design';
const Api = 'https://api.figma.com/v1';

async function loadEnv() {
  const file = '.env.local';

  if (!existsSync(file)) {
    throw new Error(
      `нет ${file} — скопируй .env.local.example и впиши FIGMA_TOKEN`,
    );
  }

  const env = {};

  for (const line of (await readFile(file, 'utf8')).split('\n')) {
    const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (match) env[match[1]] = match[2].trim();
  }

  if (!env.FIGMA_TOKEN) throw new Error('FIGMA_TOKEN в .env.local пустой');

  return env;
}

async function get(url, token) {
  const response = await fetch(url, { headers: { 'X-Figma-Token': token } });

  if (!response.ok) {
    // 403 почти всегда значит «токен без нужного скоупа», а не «файла нет» —
    // сообщение важнее кода, поэтому тащим тело.
    throw new Error(`${response.status} ${url}\n${await response.text()}`);
  }

  return response.json();
}

// Дерево из API — сотни килобайт JSON. Для вёрстки нужны координаты,
// размеры, заливки, шрифты и текст, поэтому схлопываем узлы в плоский
// список: его можно читать глазами и грепать.
function flatten(node, depth = 0, acc = []) {
  const box = node.absoluteBoundingBox;

  acc.push({
    depth,
    id: node.id,
    name: node.name,
    type: node.type,
    x: box?.x,
    y: box?.y,
    w: box?.width,
    h: box?.height,
    text: node.characters,
    style: node.style && {
      font: node.style.fontFamily,
      weight: node.style.fontWeight,
      size: node.style.fontSize,
      lineHeight: node.style.lineHeightPx,
      letterSpacing: node.style.letterSpacing,
      align: node.style.textAlignHorizontal,
    },
    fills: node.fills
      ?.filter((fill) => fill.visible !== false)
      .map((fill) =>
        fill.type === 'SOLID'
          ? rgba(fill.color, fill.opacity)
          : `${fill.type}${fill.imageRef ? `:${fill.imageRef}` : ''}`,
      ),
    radius: node.cornerRadius,
    padding: node.paddingLeft != null && {
      top: node.paddingTop,
      right: node.paddingRight,
      bottom: node.paddingBottom,
      left: node.paddingLeft,
    },
    layout: node.layoutMode,
    gap: node.itemSpacing,
  });

  for (const child of node.children ?? []) flatten(child, depth + 1, acc);

  return acc;
}

function rgba({ r, g, b }, opacity = 1) {
  const to255 = (channel) => Math.round(channel * 255);
  const hex = [r, g, b]
    .map((channel) => to255(channel).toString(16).padStart(2, '0'))
    .join('');

  return opacity < 1 ? `#${hex} @${opacity.toFixed(2)}` : `#${hex}`;
}

const env = await loadEnv();
const { FIGMA_TOKEN: token, FIGMA_FILE_KEY: key } = env;
const nodeId = (env.FIGMA_NODE_ID || '').replace('-', ':');

await mkdir(OutDir, { recursive: true });

const file = await get(`${Api}/files/${key}?geometry=paths`, token);
await writeFile(path.join(OutDir, 'file.json'), JSON.stringify(file, null, 2));
console.log(`файл: ${file.name}, обновлён ${file.lastModified}`);

const root = nodeId
  ? (flattenFind(file.document, nodeId) ?? file.document)
  : file.document;

function flattenFind(node, id) {
  if (node.id === id) return node;

  for (const child of node.children ?? []) {
    const found = flattenFind(child, id);
    if (found) return found;
  }

  return null;
}

const nodes = flatten(root);
await writeFile(
  path.join(OutDir, 'nodes.json'),
  JSON.stringify(nodes, null, 2),
);
console.log(`узлов: ${nodes.length} (от «${root.name}»)`);

const comments = await get(`${Api}/files/${key}/comments`, token);
await writeFile(
  path.join(OutDir, 'comments.json'),
  JSON.stringify(comments, null, 2),
);
console.log(`комментариев: ${comments.comments?.length ?? 0}`);

// Превью фреймов верхнего уровня — по ним сверяется общая раскладка.
const frames = (root.children ?? [])
  .filter((child) => child.type === 'FRAME' || child.type === 'SECTION')
  .map((child) => child.id);

if (frames.length) {
  const images = await get(
    `${Api}/images/${key}?ids=${frames.join(',')}&format=png&scale=2`,
    token,
  );

  await writeFile(
    path.join(OutDir, 'previews.json'),
    JSON.stringify(images.images, null, 2),
  );
  console.log(`превью фреймов: ${Object.keys(images.images).length}`);
}

console.log(`\nготово — смотри ${OutDir}/`);
