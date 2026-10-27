import fs from "node:fs";
import assert from "node:assert/strict";

// Read the shipping palette directly, so this check cannot pass on retired tokens.
const css = fs.readFileSync("src/styles/global.css", "utf8");
const palette = (block) =>
  Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map(
      ([, name, value]) => [name, value],
    ),
  );
const light = palette(css.match(/:root\s*\{([\s\S]*?)\}/)[1]);
const dark = {
  ...light,
  ...palette(css.match(/:root\[data-theme=(["'])dark\1\]\s*\{([\s\S]*?)\}/)[2]),
};
const luminance = (hex) => {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
for (const [theme, tokens] of Object.entries({ light, dark })) {
  const checks = [];
  for (const background of ["bg", "surface", "surface-soft", "surface-blue"]) {
    for (const foreground of ["ink", "muted", "accent"])
      checks.push([foreground, background, 4.5]);
  }
  checks.push(
    ["button-ink", "button-bg", 4.5],
    ["bg", "accent", 4.5],
    ["focus", "bg", 3],
    ["closing-ink", "closing", 4.5],
    ["closing-muted", "closing", 4.5],
  );
  for (const [fg, bg, minimum] of checks) {
    assert(
      tokens[fg] && tokens[bg],
      `Missing ${theme} palette token: ${fg}/${bg}`,
    );
    const ratio = contrast(tokens[fg], tokens[bg]);
    assert(
      ratio >= minimum,
      `${theme}: ${fg} on ${bg}: ${ratio.toFixed(2)}:1, needs ${minimum}`,
    );
  }
  console.log(
    `${theme}: ${checks.length} text, action, and focus pairings pass WCAG AA.`,
  );
}
