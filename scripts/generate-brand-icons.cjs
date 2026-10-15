// Rasterize the existing approved symbol; do not redraw or alter the logo.
/* eslint-disable @typescript-eslint/no-require-imports -- Node maintenance script. */
const { createRequire } = require('node:module');
const { mkdir, readFile, writeFile } = require('node:fs/promises');
const requireFromNext = createRequire(require.resolve('next/package.json'));
const sharp = requireFromNext('sharp');
async function main() {
  await mkdir('public/icons', { recursive: true });
  const sourceSvg = (await readFile('public/icon-logo.svg', 'utf8'))
    .replaceAll('fill="#FFFFFF"', 'fill="#98FF03"')
    .replace(/\s+stroke="[^"]*"/g, ' stroke="none"')
    .replace(/\s+stroke-miterlimit="[^"]*"/g, '')
    .replace(/\s+stroke-width="[^"]*"/g, ' stroke-width="0"');

  for (const size of [32, 48, 180, 192, 512, 1080]) {
    const inset = Math.round(size * 0.12);
    const logo = await sharp(Buffer.from(sourceSvg)).resize(size - 2 * inset, size - 2 * inset, { fit: 'contain' }).png().toBuffer();
    const png = await sharp({ create: { width: size, height: size, channels: 4, background: '#292C2E' } })
      .composite([{ input: logo, gravity: 'center' }])
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        for (let index = 0; index < data.length; index += info.channels) {
          if (data[index] < 41 && data[index + 1] < 44 && data[index + 2] < 46) {
            data[index] = 0x29;
            data[index + 1] = 0x2c;
            data[index + 2] = 0x2e;
          }
        }
        return sharp(data, { raw: info }).png().toBuffer();
      });
    await writeFile(`public/icons/matii-${size}.png`, png);
    if (size === 48) {
      const header = Buffer.alloc(22);
      header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
      header[6] = size; header[7] = size;
      header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
      header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
      await writeFile('public/favicon.ico', Buffer.concat([header, png]));
    }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
