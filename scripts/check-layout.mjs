/**
 * Layout regression check. Serves the built site and asserts, on every page at
 * every breakpoint, the things that have actually broken here before:
 *
 *   - no horizontal scroll
 *   - masthead, sheet heads and footer share one content column
 *   - a clause row starts all four of its columns on one line, keeps its
 *     figure beside its heading, opens no dead channel before its parameters,
 *     and does not strand its arrow at the far edge
 *   - parameter values do not wrap where there is room for them
 *   - axe reports nothing at the widest and narrowest sizes
 *   - the revision mark still draws rather than snapping to finished
 *
 * Run with: npm run check:layout   (expects a fresh `npm run build`)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const ROOT = path.resolve('dist');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer((q, s) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { s.writeHead(404); return s.end(); }
  s.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(s);
});
await new Promise((r) => server.listen(4418, r));
const B = 'http://127.0.0.1:4418';
const AXE = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const PAGES = ['/', '/services/', '/about/', '/contact/', '/404.html'];
const WIDTHS = [2048, 1600, 1440, 1200, 1024, 900, 768, 600, 480, 390, 320];
const out = [];
const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

for (const route of PAGES) {
  for (const w of WIDTHS) {
    const p = await br.newPage();
    await p.setViewport({ width: w, height: 900, hasTouch: w < 800, isMobile: w < 800 });
    await p.goto(B + route, { waitUntil: 'networkidle0' });
    await new Promise((z) => setTimeout(z, 450));
    const f = await p.evaluate(() => {
      const bugs = [];
      const d = document.documentElement;
      if (d.scrollWidth > d.clientWidth + 1) bugs.push(`h-scroll +${d.scrollWidth - d.clientWidth}px`);

      // content column agreement
      const edges = [];
      for (const [n, sel] of [['mast', '.mast__id'], ['head', 'main .sh__head'], ['foot', '.foot > *']]) {
        const e = document.querySelector(sel);
        if (e) edges.push([n, Math.round(e.getBoundingClientRect().left)]);
      }
      const v = edges.map((e) => e[1]);
      if (v.length > 1 && Math.max(...v) - Math.min(...v) > 1) bugs.push(`columns disagree ${JSON.stringify(edges)}`);

      // clause row: one datum, no dead channels, halves in proportion
      document.querySelectorAll('.clause').forEach((c, i) => {
        const q = (s) => c.querySelector(s);
        const R = (e) => e.getBoundingClientRect();
        const fig = q('.clause__no'), nm = q('.clause__name'), desc = q('.clause__desc'), par = q('.clause__params'), go = q('.clause__go');
        if (!fig || !nm || !par) return;
        // Below 60rem the row deliberately collapses to two columns and the
        // parameters stack under the text, so they are meant to start lower.
        const fourCol = getComputedStyle(c).gridTemplateColumns.split(/\s+/).length === 4;
        if (fourCol) {
          const tops = [R(fig).top, R(nm).top, R(par).top].map((t) => Math.round(t));
          if (Math.max(...tops) - Math.min(...tops) > 1) bugs.push(`clause ${i}: columns start on different lines ${tops}`);
        }
        const gap = Math.round(R(nm).left - R(fig).right);
        void 0;
        if (gap > 60) bugs.push(`clause ${i}: ${gap}px between figure and heading`);
        if (desc && fourCol) {
          const channel = Math.round(R(par).left - R(desc).right);
          if (channel > 90) bugs.push(`clause ${i}: ${channel}px dead channel before parameters`);
        }
        if (go && fourCol && getComputedStyle(go).display !== 'none') {
          const toArrow = Math.round(R(go).left - R(par).right);
          if (toArrow > 60) bugs.push(`clause ${i}: arrow ${toArrow}px past the parameters`);
        }
        // parameter values should not wrap where there is room
        if (window.innerWidth >= 1024) {
          c.querySelectorAll('.clause__param dd').forEach((dd, j) => {
            if (dd.getClientRects().length > 1) bugs.push(`clause ${i} param ${j}: value wraps`);
          });
        }
      });
      return [...new Set(bugs)];
    });
    for (const b of f) out.push(`${route}@${w}  ${b}`);
    await p.close();
  }
}

// axe on the two extremes
for (const route of PAGES) {
  for (const w of [2048, 320]) {
    const p = await br.newPage();
    await p.setViewport({ width: w, height: 900, hasTouch: w < 800, isMobile: w < 800 });
    await p.goto(B + route, { waitUntil: 'networkidle0' });
    await p.evaluate(AXE);
    const res = await p.evaluate(async () => await window.axe.run(document, { resultTypes: ['violations'], runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } }));
    for (const x of res.violations) out.push(`${route}@${w}  axe ${x.id} (${x.impact}) x${x.nodes.length}`);
    await p.close();
  }
}

// the draw still animates
{
  const p = await br.newPage();
  await p.setViewport({ width: 1600, height: 900 });
  await p.goto(B + '/', { waitUntil: 'domcontentloaded' });
  const off = async () => p.evaluate(() => { const c = document.querySelector('.mk-cloud'); return c ? Math.round(parseFloat(getComputedStyle(c).strokeDashoffset) || 0) : null; });
  await new Promise((z) => setTimeout(z, 60)); const a = await off();
  await new Promise((z) => setTimeout(z, 420)); const b = await off();
  await new Promise((z) => setTimeout(z, 1300)); const c = await off();
  if (!(a > 100 && b < a && c === 0)) out.push(`/ draw did not animate: ${a} -> ${b} -> ${c}`);
  else console.log(`draw: ${a} -> ${b} -> ${c}`);
  await p.close();
}

await br.close();
server.close();
console.log(`\n=== ${out.length} findings ===\n`);
for (const o of out) console.log(o);
