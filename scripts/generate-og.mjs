/**
 * Generates public/og.png — the 1200x630 image shown when the site is shared
 * on LinkedIn, Slack, X, iMessage, and so on.
 *
 * It is the site's title sheet at share size: drafting stock, a ruled sheet
 * edge with corner registration marks, the mark in the margin, the headline in
 * ink, and a title block along the foot. Same four inks as the site.
 *
 * Run it with:  npm run og
 *
 * It is deliberately NOT part of `npm run build`. The output is committed to
 * the repo as a static asset, so your deploy never depends on which fonts
 * happen to exist on the build machine.
 *
 * Re-run it after changing the headline below, then commit the new PNG.
 *
 * Note on type: this renders through librsvg, which can only use fonts
 * installed on your operating system — not the Inter webfont the site loads.
 * The stack below falls back to whichever neutral grotesque is available. The
 * real logo mark carries the brand here, so the substitution is not doing
 * heavy lifting.
 */

import sharp from 'sharp';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'og.png');

// Read the mark's path straight out of the traced asset rather than pasting a
// copy here, so `npm run logo` can never leave this image on an old mark.
const MARK = (await fs.readFile(join(ROOT, 'public', 'brand', 'mark.svg'), 'utf8')).match(
  /\sd="([^"]+)"/,
)[1];

const W = 1200;
const H = 630;

// Keep in sync with the token block in src/styles/global.css.
const STOCK = '#EFEEE7';
const INK = '#000036';
const RED = '#D8261B';
const RED_INK = '#C21B12';
const GRAPHITE = '#4E4E47';
const RULE = '#C6C5BA';

// Keep these in step with `hero` in src/data/site.js.
const LINE1 = 'A better website,';
const LINE2 = 'looked after.';
const SUBLINE = 'Free review and first design. Monthly care from $10.';
const FOOTER = 'codeviewsolutions.com   ·   Clients across the United States';

const SANS = 'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif';

// The stock's own field grid, at the same 44px pitch the site rules it to.
const grid = [];
for (let x = 44; x < W; x += 44) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
for (let y = 44; y < H; y += 44) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);

// The title block along the foot — the same fields the site's own carries.
const BLOCK = [
  ['FIRST STEP', 'A free website review'],
  ['ONGOING CARE', 'From $10 a month'],
  ['AFTER LAUNCH', '90-day warranty'],
  ['SHEET', '01 · REV A'],
];
const colW = (W - 160) / BLOCK.length;
const block = BLOCK.map(([k, v], i) => {
  const x = 80 + i * colW;
  return `
    ${i > 0 ? `<line x1="${x}" y1="${H - 118}" x2="${x}" y2="${H - 40}" stroke="${INK}" stroke-width="1"/>` : ''}
    <text x="${x + (i > 0 ? 18 : 0)}" y="${H - 88}" font-family="${SANS}" font-size="15"
          letter-spacing="1.6" fill="${GRAPHITE}">${k}</text>
    <text x="${x + (i > 0 ? 18 : 0)}" y="${H - 60}" font-family="${SANS}" font-size="21"
          font-weight="600" letter-spacing="-0.2" fill="${INK}">${v}</text>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${STOCK}"/>
  <g stroke="${RULE}" stroke-width="1" opacity="0.55">${grid.join('')}</g>

  <!-- The sheet edge, and the corner registration marks it carries. -->
  <rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="${INK}" stroke-width="3"/>
  <path d="M40 30 V40 H30" fill="none" stroke="${RED}" stroke-width="1.5"/>
  <path d="M${W - 40} ${H - 30} V${H - 40} H${W - 30}" fill="none" stroke="${RED}" stroke-width="1.5"/>

  <!-- The CodeView mark. Path traced by \`npm run logo\`; keep in sync with
       src/components/Logo.astro. 243.3x191.6 artwork scaled to 34px tall. -->
  <g transform="translate(80 74) scale(0.177)" fill="${INK}" fill-rule="evenodd">
    <path d="${MARK}"/>
  </g>
  <text x="136" y="99" font-family="${SANS}" font-size="23" font-weight="600"
        letter-spacing="-0.4" fill="${INK}">CodeView Solutions LLC</text>
  <line x1="80" y1="126" x2="${W - 80}" y2="126" stroke="${INK}" stroke-width="1"/>

  <text x="80" y="300" font-family="${SANS}" font-size="82" font-weight="800"
        letter-spacing="-3.4" fill="${INK}">${LINE1}</text>
  <text x="80" y="384" font-family="${SANS}" font-size="82" font-weight="800"
        letter-spacing="-3.4" fill="${INK}">${LINE2}</text>

  <!-- The first finding, in the margin, in revision red. -->
  <rect x="80" y="424" width="9" height="9" fill="${RED}"/>
  <text x="104" y="433" font-family="${SANS}" font-size="21"
        letter-spacing="-0.2" fill="${RED_INK}">${SUBLINE}</text>

  <line x1="80" y1="${H - 118}" x2="${W - 80}" y2="${H - 118}" stroke="${INK}" stroke-width="2"/>
  ${block}
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`Wrote ${OUT} (${W}x${H})`);
