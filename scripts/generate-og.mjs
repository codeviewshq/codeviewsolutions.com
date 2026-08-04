/**
 * Generates public/og.png — the 1200x630 image shown when the site is shared
 * on LinkedIn, Slack, X, iMessage, and so on.
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
 * refraction spectrum and the prism mark carry the brand, so the substitution
 * is not doing heavy lifting.
 */

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og.png');

const W = 1200;
const H = 630;

// Keep in sync with the tokens in src/styles/global.css.
const BG = '#0A0A0D';
const BORDER = '#1F1F27';
const TEXT = '#F5F6F7';
const MUTED = '#9B9BA6';
const VIOLET = '#A855F7';
const CYAN = '#22D3EE';
const AMBER = '#FBBF24';

// Keep these in step with `hero` in src/data/site.js.
const LINE1 = 'Custom software,';
const LINE2 = 'delivered end to end.';
const SUBLINE = 'Application development, technical consulting, and AI integration.';
const FOOTER = 'codeviewsolutions.com   ·   Old Bridge, New Jersey';

const SANS = 'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif';

// A field of light filaments, echoing the hero — deterministic so re-running
// the script produces the same image.
let seed = 20260803;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const filaments = [];
for (let i = 0; i < 190; i++) {
  const x = rand() * W * 1.15 - 80;
  const y = rand() * H;
  const len = 70 + rand() * 230;
  const drop = len * (0.5 + rand() * 0.5);
  const hue = Math.max(0, Math.min(1, x / W));
  const color = hue < 0.5 ? VIOLET : hue < 0.8 ? CYAN : AMBER;
  const mid = hue < 0.5 ? CYAN : AMBER;
  filaments.push(
    `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q ${(len * 0.45).toFixed(1)} ${(
      drop * 0.35
    ).toFixed(1)} ${len.toFixed(1)} ${drop.toFixed(1)}" stroke="${
      rand() > 0.5 ? color : mid
    }" stroke-width="1.1" fill="none" opacity="${(0.1 + rand() * 0.3).toFixed(2)}"/>`
  );
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${VIOLET}"/>
      <stop offset="52%"  stop-color="${CYAN}"/>
      <stop offset="100%" stop-color="${AMBER}"/>
    </linearGradient>
    <clipPath id="frame"><rect width="${W}" height="${H}"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <g clip-path="url(#frame)">${filaments.join('')}</g>

  <!-- Prism mark -->
  <g stroke-linecap="round" fill="none" transform="translate(80 74) scale(1.5)">
    <path d="M14.6 6.4 6.2 23.4h5" stroke="#6B6B78" stroke-width="2" stroke-linejoin="round"/>
    <path d="M3.4 15.6h5.2" stroke="${TEXT}" stroke-width="2.2"/>
    <path d="M15.8 12.6h12.6" stroke="${VIOLET}" stroke-width="2.2"/>
    <path d="M16.4 17h12" stroke="${CYAN}" stroke-width="2.2"/>
    <path d="M17 21.4h11.4" stroke="${AMBER}" stroke-width="2.2"/>
  </g>
  <text x="136" y="113" font-family="${SANS}" font-size="26" font-weight="600"
        letter-spacing="-0.6" fill="${TEXT}">CodeView Solutions</text>

  <text x="80" y="320" font-family="${SANS}" font-size="72" font-weight="700"
        letter-spacing="-3" fill="${TEXT}">${LINE1}</text>
  <text x="80" y="402" font-family="${SANS}" font-size="72" font-weight="700"
        letter-spacing="-3" fill="url(#spectrum)">${LINE2}</text>

  <text x="80" y="462" font-family="${SANS}" font-size="25"
        letter-spacing="-0.4" fill="${MUTED}">${SUBLINE}</text>

  <line x1="80" y1="536" x2="1120" y2="536" stroke="${BORDER}" stroke-width="1"/>
  <text x="80" y="576" font-family="${SANS}" font-size="20"
        letter-spacing="-0.2" fill="${MUTED}">${FOOTER}</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`Wrote ${OUT} (${W}x${H})`);
