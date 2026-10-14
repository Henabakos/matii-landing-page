// Rasterize the existing approved symbol; do not redraw or alter the logo.
/* eslint-disable @typescript-eslint/no-require-imports -- Node maintenance script. */
const { createRequire } = require('node:module');
const { mkdir, writeFile } = require('node:fs/promises');
const requireFromNext = createRequire(require.resolve('next/package.json'));
const sharp = requireFromNext('sharp');
async function main() {
  await mkdir('public/icons', { recursive: true });
  for (const size of [32, 48, 180, 192, 512, 1080]) {
    const inset = Math.round(size * 0.12);
    const logo = await sharp('public/icon-logo.svg').resize(size - 2 * inset, size - 2 * inset, { fit: 'contain' }).png().toBuffer();
    const png = await sharp({ create: { width: size, height: size, channels: 4, background: '#98ff03' } }).composite([{ input: logo, gravity: 'center' }]).png().toBuffer();
    await writeFile(`public/icons/matii-${size}.png`, png);
    if (size === 48) {
      const header = Buffer.alloc(22);
      header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
      header[6] = size; header[7] = size;
      header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
      header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
      await writeFile('src/app/favicon.ico', Buffer.concat([header, png]));
    }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
