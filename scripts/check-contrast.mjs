/**
 * Palette guard. THE REDLINE: drafting stock, the logo's navy as ink, one spot
 * revision red, one graphite. Run: npm run check:contrast
 *
 * The red is split by role on purpose — bright enough for a rule or a stroke,
 * not quite bright enough for small text — so `--red` and `--red-ink` are
 * checked separately at the thresholds each one actually has to meet.
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
  stock: '#EFEEE7',
  stock2: '#E6E5DC',
  ink: '#000036',
  red: '#D8261B',
  redInk: '#C21B12',
  graphite: '#4E4E47',
  rule: '#C6C5BA',
  // Reversed out on the one dark field: the closing "issued for review" block.
  // These are tokens in :root (--on-ink, --on-ink-dim, --red-lit), not literals.
  issueBody: '#B9B9C9',
  issueSeal: '#FF6A5E',
  signoffKey: '#9A9AB4',
};

// [foreground, background, minimum ratio, label]
// 4.5 = body text, 3.0 = large text (>=24px) and UI borders/graphics.
const CHECKS = [
  // Ink on stock — the body of every sheet.
  [T.ink, T.stock, 4.5, 'ink on drafting stock'],
  [T.ink, T.stock2, 4.5, 'ink on the tinted cell'],
  [T.graphite, T.stock, 4.5, 'secondary text on stock'],
  [T.graphite, T.stock2, 4.5, 'secondary text on the tinted cell'],

  // The revision red, split by the job it is doing.
  [T.redInk, T.stock, 4.5, 'red as small text (clause numbers, notes)'],
  [T.redInk, T.stock2, 4.5, 'red as small text on the tinted cell'],
  [T.red, T.stock, 3, 'red as a rule, stroke, or focus ring'],

  // Reversed out: stamps and the issue block.
  [T.stock, T.ink, 4.5, 'stock label on a stamped action'],
  // Red behind text is always the darker red; the bright red is stroke-only.
  [T.stock, T.redInk, 4.5, 'stock label on a red stamp'],
  [T.issueBody, T.ink, 4.5, 'body copy on the issue block'],
  [T.signoffKey, T.ink, 4.5, 'sign-off field labels on the issue block'],
  [T.issueSeal, T.ink, 4.5, 'the issued-for-review seal'],

  // Rules have to be visible without becoming decoration.
  [T.rule, T.stock, 1.15, 'hairline visible against stock'],
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
