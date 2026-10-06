/**
 * Turn first.jpg (navy artwork on an off-white field, no alpha) into clean,
 * trimmed, transparent PNGs that can sit on ANY background.
 *
 * Method: the source is effectively two-tone, so luminance IS the coverage
 * mask. alpha = how far this pixel travelled from the background toward the
 * ink. That keeps the antialiased edges intact instead of hard-thresholding
 * them into staircases, and it means the artwork can then be painted any
 * flat colour — including white for the dark site.
 */
import sharp from 'sharp';
import path from 'node:path';

const SRC = process.argv[2];
const OUTDIR = process.argv[3];

const img = sharp(SRC);
const meta = await img.metadata();
const { data, info } = await img
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H, channels: C } = info;
const lum = new Float32Array(W * H);

for (let i = 0, p = 0; i < data.length; i += C, p++) {
  lum[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
}

// Background = the modal luminance of the border ring; ink = the darkest decile.
const border = [];
for (let x = 0; x < W; x++) { border.push(lum[x], lum[(H - 1) * W + x]); }
for (let y = 0; y < H; y++) { border.push(lum[y * W], lum[y * W + W - 1]); }
border.sort((a, b) => a - b);
const bg = border[Math.floor(border.length / 2)];

const sorted = Float32Array.from(lum).sort();
const ink = sorted[Math.floor(sorted.length * 0.005)];

const span = Math.max(1, bg - ink);
const alpha = new Uint8Array(W * H);
for (let p = 0; p < alpha.length; p++) {
  const a = (bg - lum[p]) / span;
  alpha[p] = Math.round(Math.min(1, Math.max(0, a)) * 255);
}

// --- content bbox -------------------------------------------------------
const OPAQUE = 24;
let minX = W, minY = H, maxX = -1, maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (alpha[y * W + x] > OPAQUE) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// --- find the gutter between mark and wordmark --------------------------
const colInk = new Uint8Array(W);
for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    if (alpha[y * W + x] > OPAQUE) { colInk[x] = 1; break; }
  }
}
let bestGap = null, run = null;
for (let x = minX; x <= maxX; x++) {
  if (!colInk[x]) { run = run ?? x; }
  else if (run !== null) {
    const g = { start: run, end: x - 1, len: x - run };
    if (!bestGap || g.len > bestGap.len) bestGap = g;
    run = null;
  }
}

const report = {
  source: `${meta.width}x${meta.height} ${meta.format}`,
  backgroundLum: Math.round(bg),
  inkLum: Math.round(ink),
  bbox: { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 },
  gutter: bestGap,
  written: [],
};

// --- emit ---------------------------------------------------------------
async function emit(name, box, hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const out = Buffer.alloc(box.w * box.h * 4);
  for (let y = 0; y < box.h; y++) {
    for (let x = 0; x < box.w; x++) {
      const s = (y + box.y) * W + (x + box.x);
      const d = (y * box.w + x) * 4;
      out[d] = r; out[d + 1] = g; out[d + 2] = b; out[d + 3] = alpha[s];
    }
  }
  const file = path.join(OUTDIR, name);
  await sharp(out, { raw: { width: box.w, height: box.h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(file);
  report.written.push(`${name}  ${box.w}x${box.h}`);
}

const full = { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
await emit('logo-lockup-dark.png', full, '#FFFFFF');
await emit('logo-lockup-light.png', full, '#0B0B3B');

if (bestGap && bestGap.len > 20) {
  const mark = { x: minX, y: minY, w: bestGap.start - minX, h: full.h };
  // re-tighten the mark vertically
  let mY = H, mMaxY = -1;
  for (let y = minY; y <= maxY; y++) {
    for (let x = mark.x; x < mark.x + mark.w; x++) {
      if (alpha[y * W + x] > OPAQUE) { if (y < mY) mY = y; if (y > mMaxY) mMaxY = y; break; }
    }
  }
  mark.y = mY; mark.h = mMaxY - mY + 1;
  await emit('logo-mark-dark.png', mark, '#FFFFFF');
  await emit('logo-mark-light.png', mark, '#0B0B3B');
  report.markBox = mark;
}

console.log(JSON.stringify(report, null, 2));
