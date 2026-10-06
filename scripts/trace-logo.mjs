/**
 * Trace the logo bitmap into SVG.
 *
 * The mark ships in the header at 24px, so a raster is the wrong material:
 * it softens at small sizes and cannot inherit `currentColor`. The artwork is
 * flat two-tone with no gradients, which is the ideal case for a real trace.
 *
 * Marching squares over the alpha field at the 0.5 iso-line, chained into
 * closed loops, then Ramer-Douglas-Peucker simplified. Contours are emitted
 * into one path with fill-rule="evenodd", so holes (the counters in the
 * circuit nodes, the gap inside the eye) fall out of the winding rather than
 * needing to be identified.
 *
 *   node scripts/trace-logo.mjs <source.png> <out.svg>
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';

const [SRC, OUT] = process.argv.slice(2);
const EPSILON = 0.4; // px of allowed deviation when simplifying

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width;
const H = info.height;

// Pad by one cell so shapes touching the edge still close.
const gw = W + 2;
const gh = H + 2;
const a = new Float32Array(gw * gh);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    a[(y + 1) * gw + (x + 1)] = data[(y * W + x) * info.channels + 3] / 255;
  }
}

const at = (x, y) => a[y * gw + x];
const solid = (x, y) => at(x, y) >= 0.5;

// Interpolated crossing point on a grid edge, keyed by edge identity so the
// two cells sharing an edge always agree to the bit.
const pts = new Map();
function hEdge(x, y) {
  const k = `h${x},${y}`;
  if (!pts.has(k)) {
    const v0 = at(x, y);
    const v1 = at(x + 1, y);
    const t = Math.min(1, Math.max(0, (0.5 - v0) / (v1 - v0 || 1e-6)));
    pts.set(k, [x + t, y]);
  }
  return k;
}
function vEdge(x, y) {
  const k = `v${x},${y}`;
  if (!pts.has(k)) {
    const v0 = at(x, y);
    const v1 = at(x, y + 1);
    const t = Math.min(1, Math.max(0, (0.5 - v0) / (v1 - v0 || 1e-6)));
    pts.set(k, [x, y + t]);
  }
  return k;
}

// case -> pairs of [edge, edge] to join. TL=8 TR=4 BR=2 BL=1.
const CASES = {
  1: [['l', 'b']],
  2: [['b', 'r']],
  3: [['l', 'r']],
  4: [['t', 'r']],
  5: [['t', 'r'], ['l', 'b']],
  6: [['t', 'b']],
  7: [['l', 't']],
  8: [['l', 't']],
  9: [['t', 'b']],
  10: [['t', 'l'], ['b', 'r']],
  11: [['t', 'r']],
  12: [['l', 'r']],
  13: [['b', 'r']],
  14: [['l', 'b']],
};

const adj = new Map();
const link = (p, q) => {
  if (!adj.has(p)) adj.set(p, []);
  if (!adj.has(q)) adj.set(q, []);
  adj.get(p).push(q);
  adj.get(q).push(p);
};

for (let y = 0; y < gh - 1; y++) {
  for (let x = 0; x < gw - 1; x++) {
    const idx =
      (solid(x, y) ? 8 : 0) +
      (solid(x + 1, y) ? 4 : 0) +
      (solid(x + 1, y + 1) ? 2 : 0) +
      (solid(x, y + 1) ? 1 : 0);
    const pairs = CASES[idx];
    if (!pairs) continue;
    const edge = {
      t: () => hEdge(x, y),
      b: () => hEdge(x, y + 1),
      l: () => vEdge(x, y),
      r: () => vEdge(x + 1, y),
    };
    for (const [p, q] of pairs) link(edge[p](), edge[q]());
  }
}

// Walk the adjacency graph into closed loops.
const seen = new Set();
const loops = [];
for (const start of adj.keys()) {
  if (seen.has(start)) continue;
  const loop = [];
  let cur = start;
  let prev = null;
  while (cur && !seen.has(cur)) {
    seen.add(cur);
    loop.push(pts.get(cur));
    const next = (adj.get(cur) || []).find((n) => n !== prev && !seen.has(n));
    prev = cur;
    cur = next;
  }
  if (loop.length > 6) loops.push(loop);
}

// Ramer-Douglas-Peucker.
function rdp(points, eps) {
  if (points.length < 3) return points;
  let maxD = 0;
  let idx = 0;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1e-9;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d = Math.abs(dy * px - dx * py + bx * ay - by * ax) / len;
    if (d > maxD) {
      maxD = d;
      idx = i;
    }
  }
  if (maxD <= eps) return [points[0], points[points.length - 1]];
  return [
    ...rdp(points.slice(0, idx + 1), eps).slice(0, -1),
    ...rdp(points.slice(idx), eps),
  ];
}

const n = (v) => {
  const r = Math.round(v * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};

// The 0.5 iso-line falls just outside the outermost solid pixel, so the real
// vector bounds overhang the bitmap by a fraction of a pixel. Track them and
// emit an exact viewBox instead of clipping the artwork's own edge.
const ext = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };

const d = loops
  .map((loop) => {
    // RDP measures deviation from the chord between the first and last point.
    // On a closed ring those coincide, the chord degenerates, every distance
    // computes as zero and the whole contour collapses to a line. Split the
    // ring at its farthest point from the start and simplify the two open
    // halves independently.
    let far = 0;
    let fd = -1;
    for (let i = 1; i < loop.length; i++) {
      const dist = Math.hypot(loop[i][0] - loop[0][0], loop[i][1] - loop[0][1]);
      if (dist > fd) {
        fd = dist;
        far = i;
      }
    }
    const s = [
      ...rdp(loop.slice(0, far + 1), EPSILON).slice(0, -1),
      ...rdp([...loop.slice(far), loop[0]], EPSILON).slice(0, -1),
    ];
    // Shift back off the 1px pad.
    const xy = s.map(([x, y]) => {
      const px = Math.round((x - 1) * 10) / 10;
      const py = Math.round((y - 1) * 10) / 10;
      if (px < ext.x0) ext.x0 = px;
      if (py < ext.y0) ext.y0 = py;
      if (px > ext.x1) ext.x1 = px;
      if (py > ext.y1) ext.y1 = py;
      return [px, py];
    });
    const body = xy
      .slice(1)
      .map(([x, y]) => `L${n(x)} ${n(y)}`)
      .join('');
    return `M${n(xy[0][0])} ${n(xy[0][1])}${body}Z`;
  })
  .join('');

const viewBox = `${n(ext.x0)} ${n(ext.y0)} ${n(ext.x1 - ext.x0)} ${n(ext.y1 - ext.y0)}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none"><path d="${d}" fill="currentColor" fill-rule="evenodd"/></svg>\n`;

await fs.writeFile(OUT, svg);
console.log(
  JSON.stringify(
    {
      out: OUT,
      viewBox,
      aspect: +((ext.x1 - ext.x0) / (ext.y1 - ext.y0)).toFixed(4),
      loops: loops.length,
      bytes: svg.length,
    },
    null,
    2,
  ),
);
