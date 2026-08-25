import { readFile, writeFile } from 'node:fs/promises';

const file = process.argv[2];
if (!file) throw new Error('нужен путь к mp4');

const source = await readFile(file);

function topLevelBoxes(buffer) {
  const boxes = [];

  for (let offset = 0; offset + 8 <= buffer.length;) {
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString('latin1', offset + 4, offset + 8);

    if (size === 1) size = Number(buffer.readBigUInt64BE(offset + 8));
    if (size === 0) size = buffer.length - offset;
    if (size < 8) throw new Error(`битый бокс ${type} на ${offset}`);

    boxes.push({ type, offset, size });
    offset += size;
  }

  return boxes;
}

function shiftChunkOffsets(moov, delta) {
  for (const type of ['stco', 'co64']) {
    const tag = Buffer.from(type, 'latin1');

    for (
      let at = moov.indexOf(tag);
      at !== -1;
      at = moov.indexOf(tag, at + 4)
    ) {
      const count = moov.readUInt32BE(at + 8);
      const wide = type === 'co64';
      const step = wide ? 8 : 4;
      const start = at + 12;

      if (start + count * step > moov.length) continue;

      for (let i = 0; i < count; i += 1) {
        const position = start + i * step;

        if (wide) {
          moov.writeBigUInt64BE(
            moov.readBigUInt64BE(position) + BigInt(delta),
            position,
          );
        } else {
          const value = moov.readUInt32BE(position) + delta;
          if (value > 0xffffffff) throw new Error('смещение не влезает в stco');
          moov.writeUInt32BE(value, position);
        }
      }
    }
  }
}

const boxes = topLevelBoxes(source);
const moovBox = boxes.find((box) => box.type === 'moov');
const mdatBox = boxes.find((box) => box.type === 'mdat');

if (!moovBox || !mdatBox) throw new Error('в файле нет moov или mdat');

if (moovBox.offset < mdatBox.offset) {
  console.log(`${file}: moov уже впереди, ничего не делаем`);
  process.exit(0);
}

const head = boxes.filter((box) => box.type === 'ftyp');
const rest = boxes.filter((box) => box.type !== 'ftyp' && box.type !== 'moov');

const slice = (box) => source.subarray(box.offset, box.offset + box.size);
const moov = Buffer.from(slice(moovBox));

const headSize = head.reduce((sum, box) => sum + box.size, 0);
const before = rest
  .slice(0, rest.indexOf(mdatBox))
  .reduce((sum, box) => sum + box.size, 0);

shiftChunkOffsets(moov, moovBox.size);

const parts = [...head.map(slice), moov, ...rest.map(slice)];
await writeFile(file, Buffer.concat(parts));

console.log(
  `${file}: moov (${moovBox.size} Б) перенесён в начало, ` +
    `mdat теперь на ${headSize + moovBox.size + before}`,
);
