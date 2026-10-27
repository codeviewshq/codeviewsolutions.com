import fs from "node:fs/promises";
import sharp from "sharp";

// Square profile images from the traced mark, sized to survive circular crops.
const mark = await fs.readFile("public/brand/mark.svg", "utf8");
const [x, y, w, h] = mark.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
const path = mark.match(/<path[^>]*\/>/)[0];
const size = 1080;
const width = size * 0.56; // keeps the mark inside the circle with breathing room
const scale = width / w;
const left = (size - width) / 2 - x * scale;
const top = (size - h * scale) / 2 - y * scale;

for (const [name, bg, ink] of [
  ["light", "#f7f8fc", "#000036"],
  ["dark", "#090d24", "#eff2ff"],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" color="${ink}"><rect width="100%" height="100%" fill="${bg}"/><g transform="translate(${left} ${top}) scale(${scale})">${path}</g></svg>`;
  const out = `public/brand/social-avatar-${name}.png`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`Wrote ${out} (${size}×${size}).`);
}
