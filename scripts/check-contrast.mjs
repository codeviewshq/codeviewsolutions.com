/**
 * Palette guard. The site is dark-only, so every pairing below has to clear
 * WCAG AA against the near-black surfaces. Run: npm run check:contrast
 *
 * The accent is a refraction spectrum — violet through cyan into amber. All
 * three stops are checked independently, because gradient text is only as
 * readable as its darkest stop.
 *
 * Keep these values in sync with the token block in src/styles/global.css.
 */

const HEX = (h) => {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const lum = (hex) => {
  const [r, g, b] = HEX(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const T = {
  bg: '#0A0A0D',
  surface: '#121217',
  surface2: '#17171E',
  border: '#1F1F27',
  border2: '#2E2E3A',
  text: '#F5F6F7',
  muted: '#9B9BA6',
  faint: '#82828E',
  violet: '#A855F7',
  cyan: '#22D3EE',
  amber: '#FBBF24',
};

// [foreground, background, minimum ratio, label]
// 4.5 = body text, 3.0 = large text (>=24px) and UI borders/graphics.
const CHECKS = [
  [T.text, T.bg, 4.5, 'primary text on page'],
  [T.text, T.surface, 4.5, 'primary text on panel'],
  [T.text, T.surface2, 4.5, 'primary text on raised panel'],
  [T.muted, T.bg, 4.5, 'secondary text on page'],
  [T.muted, T.surface, 4.5, 'secondary text on panel'],
  [T.faint, T.bg, 4.5, 'small meta labels on page'],
  [T.faint, T.surface, 4.5, 'small meta labels on panel'],

  // Every spectrum stop, as small text and as a graphic.
  [T.violet, T.bg, 4.5, 'spectrum stop 1 (violet) as text'],
  [T.cyan, T.bg, 4.5, 'spectrum stop 2 (cyan) as text'],
  [T.amber, T.bg, 4.5, 'spectrum stop 3 (amber) as text'],
  [T.violet, T.surface, 4.5, 'violet as text on panel'],
  [T.cyan, T.surface, 4.5, 'cyan as text on panel'],
  [T.amber, T.surface, 4.5, 'amber as text on panel'],
  [T.cyan, T.bg, 3.0, 'cyan focus ring against page'],

  [T.bg, T.text, 4.5, 'dark label on the light primary button'],
  [T.border, T.bg, 1.15, 'hairline visible against page'],
  [T.border2, T.surface, 1.15, 'stronger border visible against panel'],
];

let failed = 0;
for (const [fg, bg, min, label] of CHECKS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(6)} : 1  (needs ${min})  ${label}  ${fg} on ${bg}`
  );
}

console.log(
  failed === 0
    ? '\n  All pairings clear WCAG AA.\n'
    : `\n  ${failed} pairing(s) below target.\n`
);
process.exit(failed === 0 ? 0 : 1);
