/**
 * Header lockup: the trimmed, transparent lockup produced by build-logo.mjs,
 * recoloured to the site's own ink and sized for the header row.
 *
 * build-logo.mjs emits at #0B0B3B, which is close to but not the same as the
 * ink sampled from the artwork (#000036). The header sits the mark directly
 * beside navy lettering, so the two must be the same navy or the mismatch
 * shows. Alpha is preserved exactly — only the RGB is replaced.
 *
 * Emitted at 4x the display height so it stays sharp on any display, and with
 * an explicit intrinsic size so the header never shifts while it loads.
 */
import sharp from 'sharp';

const SRC = 'public/brand/logo-lockup-light.png';
const OUT = 'public/brand/lockup.png';
const INK = '#000036';
const OUT_H = 128; // 4x the 32px display height

const [r, g, b] = [1, 3, 5].map((i) => parseInt(INK.slice(i, i + 2), 16));

const src = sharp(SRC);
const { width, height } = await src.metadata();
const outW = Math.round((width / height) * OUT_H);

const { data, info } = await src
  .resize({ width: outW, height: OUT_H, fit: 'fill', kernel: 'lanczos3' })
  .raw()
  .toBuffer({ resolveWithObject: true });

// Keep the alpha the trim produced; replace the colour underneath it.
for (let i = 0; i < data.length; i += info.channels) {
  data[i] = r;
  data[i + 1] = g;
  data[i + 2] = b;
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`${OUT}  ${info.width}x${info.height}  ink ${INK}`);
