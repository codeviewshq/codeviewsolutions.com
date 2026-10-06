import fs from 'node:fs/promises';
import sharp from 'sharp';
import { site } from '../src/data/site.js';

const evergreen = site.theme === 'evergreen';
const ink = evergreen ? '#193D32' : '#10202E';
const paper = evergreen ? '#F7F4EB' : '#F4F7F8';
const accent = evergreen ? '#C96C45' : '#D6F05A';
const mark = (color, mono = false) => evergreen
  ? `<path d="M49 17C42 3 24 0 12 8-7 19-2 50 15 57c16 8 30-2 37-13L41 29c-5 8-9 13-18 11-13-3-12-22 0-23 8-1 13 3 18 11l19 26c4 6 14 7 20-2l19-34H78L67 39 49 17Z" fill="${color}"/><path d="M85 2h14c3 0 3 3 1 6l-4 7H76l6-10c1-2 2-3 3-3Z" fill="${mono ? color : accent}"/>`
  : `<path d="M24 2H47L22 28l25 26H24L0 28 24 2Z" fill="${color}"/><path d="M28 21h19l13 15 17-19h23L60 56 28 21Z" fill="${mono ? color : accent}"/>`;
const symbol = (color, mono = false) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 64">${mark(color, mono)}</svg>`;
const lockup = (color, mono = false) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100"><g transform="translate(8 20)">${mark(color, mono)}</g><text x="127" y="53" font-family="Arial,sans-serif" font-size="43" font-weight="700" letter-spacing="-1.5" fill="${color}">CodeView</text><text x="129" y="83" font-family="Arial,sans-serif" font-size="${evergreen ? 26 : 20}" ${evergreen ? '' : 'letter-spacing="5"'} fill="${color}">Solutions</text></svg>`;
await fs.mkdir('public/brand', { recursive: true });
for (const [name, svg] of Object.entries({
  'mark-dark': symbol(ink), 'mark-light': symbol(paper), 'mark-mono': symbol(ink, true),
  'logo-dark': lockup(ink), 'logo-light': lockup(paper), 'logo-mono': lockup(ink, true),
})) {
  await fs.writeFile(`public/brand/${name}.svg`, svg);
  await sharp(Buffer.from(svg)).resize(name.startsWith('mark') ? 400 : 1260).png().toFile(`public/brand/${name}.png`);
}
await fs.writeFile('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="${evergreen ? 24 : 14}" fill="${ink}"/><g transform="translate(14 32)">${mark(paper)}</g></svg>`);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${evergreen ? paper : ink}"/><g transform="translate(64 54)">${mark(evergreen ? ink : paper)}</g><text x="185" y="100" font-family="Arial,sans-serif" font-size="38" font-weight="700" fill="${evergreen ? ink : paper}">CodeView Solutions</text><text x="64" y="292" font-family="Arial,sans-serif" font-size="81" font-weight="700" letter-spacing="-3" fill="${evergreen ? ink : paper}">Better software.</text><text x="64" y="386" font-family="Arial,sans-serif" font-size="81" font-weight="700" letter-spacing="-3" fill="${evergreen ? ink : paper}">Stronger business.</text><text x="66" y="475" font-family="Arial,sans-serif" font-size="27" fill="${evergreen ? ink : paper}">Software development · Technical consulting · AI integration</text><rect x="64" y="537" width="1072" height="4" fill="${accent}"/></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log(`Exported ${site.theme} logo assets, favicon, and social image.`);
