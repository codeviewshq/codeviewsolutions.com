/**
 * Layout regression check. Serves the built site and asserts, on every page at
 * every breakpoint, the things that have actually broken here before:
 *
 *   - no horizontal scroll
 *   - masthead and sheet heads share one content column; footer spans the sheet
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
import assert from 'node:assert/strict';
import { isPlaceholder } from '../src/utils/placeholder.js';
import { site } from '../src/data/site.js';

for (const value of ['', '<VARIABLE>', '[YOUR EMAIL]', undefined]) assert.equal(isPlaceholder(value), true);
assert.equal(isPlaceholder('hello@example.com'), false);

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
    p.on('pageerror', e => out.push(`${route}@${w} script: ${e.message}`));
    await p.setViewport({ width: w, height: 900, hasTouch: w < 800, isMobile: w < 800 });
    await p.goto(B + route, { waitUntil: 'networkidle0' });
    await new Promise((z) => setTimeout(z, 450));
    const f = await p.evaluate(() => {
      const bugs = [];
      const d = document.documentElement;
      if (d.scrollWidth > d.clientWidth + 1) bugs.push(`h-scroll +${d.scrollWidth - d.clientWidth}px`);

      // content column agreement
      const edges = [];
      for (const [n, sel] of [['mast', '.mast__id'], ['head', 'main .sh__head']]) {
        const e = document.querySelector(sel);
        if (e) edges.push([n, Math.round(e.getBoundingClientRect().left)]);
      }
      const v = edges.map((e) => e[1]);
      if (v.length > 1 && Math.max(...v) - Math.min(...v) > 1) bugs.push(`columns disagree ${JSON.stringify(edges)}`);

      document.querySelectorAll('.direct__val').forEach(link => {
        const range = document.createRange();
        range.selectNodeContents(link);
        const frame = link.closest('.direct__row').getBoundingClientRect();
        if ([...range.getClientRects()].some(r => r.right > frame.right + 1)) bugs.push('contact address extends beyond its row');
      });

      const sample = document.querySelector('.sample-review');
      if (sample) {
        const intro = document.querySelector('#sample-review .sh__lede');
        if (sample.getBoundingClientRect().top - intro.getBoundingClientRect().bottom < 16) bugs.push('sample review cards touch the introduction');
        if (innerWidth <= 960 && getComputedStyle(sample).gridTemplateColumns.split(/\s+/).length !== 1) bugs.push('sample review should stack on smaller screens');
      }

      const drawing = document.querySelector('.review-drawing');
      if (!drawing) bugs.push('missing page illustration');
      else {
        const a = drawing.getBoundingClientRect(), b = drawing.parentElement.getBoundingClientRect();
        if (a.width <= 0 || a.left < b.left - 1 || a.right > b.right + 1) bugs.push('illustration escapes its column');
      }

      const footer = document.querySelector('.foot');
      const sheet = document.querySelector('.sheet');
      if (footer && sheet) {
        const a = footer.getBoundingClientRect(), b = sheet.getBoundingClientRect();
        const style = getComputedStyle(sheet);
        if (Math.abs(a.width - (b.width - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth))) > 1) bugs.push('footer does not span the sheet');
        if (parseFloat(getComputedStyle(footer).paddingLeft) > 0) bugs.push('footer has inset cells');
      }
      for (const selector of ['.tblock', '.clauses', '.cycle__btn']) {
        document.querySelectorAll(selector).forEach((el) => {
          const style = getComputedStyle(el);
          if (parseFloat(style.borderLeftWidth) <= 0 || parseFloat(style.borderRightWidth) <= 0)
            bugs.push(`${selector}: missing side border`);
        });
      }
      const notes = [...document.querySelectorAll('.note-item')];
      if (window.innerWidth > 960 && notes.length === 6) {
        for (let i = 0; i < 3; i++) {
          if (Math.abs(notes[i].getBoundingClientRect().top - notes[i + 3].getBoundingClientRect().top) > 1)
            bugs.push(`FAQ row ${i}: misaligned`);
        }
      }
      document.querySelectorAll('.dimstring path').forEach((el) => {
        if (getComputedStyle(el).strokeDasharray !== 'none') bugs.push('dimension line is partially dashed');
      });

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
        if (R(fig).left - R(c).left < 15) bugs.push(`clause ${i}: figure touches frame`);
        if (go && fourCol && R(c).right - R(go).right < 15) bugs.push(`clause ${i}: arrow touches frame`);
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

// Reduced motion must leave the illustration complete and readable.
for (const route of PAGES) {
  const p = await br.newPage();
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto(B + route, { waitUntil: 'networkidle0' });
  const complete = await p.evaluate(() => [...document.querySelectorAll('.review-drawing [data-draw]')]
    .every(el => parseFloat(getComputedStyle(el).strokeDashoffset) === 0));
  if (!complete) out.push(`${route}: reduced-motion illustration is incomplete`);
  await p.close();
}

// Both billing states remain usable after changing the control's frame.
{
  const p = await br.newPage();
  await p.goto(B + '/', { waitUntil: 'networkidle0' });
  for (const cycle of ['annual', 'monthly']) {
    await p.click(`[data-cycle-btn="${cycle}"]`);
    const valid = await p.evaluate((cycle) => {
      const section = document.querySelector('[data-billing]');
      const button = section.querySelector(`[data-cycle-btn="${cycle}"]`);
      return section.dataset.cycle === cycle && button.getAttribute('aria-pressed') === 'true'
        && [...section.querySelectorAll(`[data-when="${cycle}"]`)].every(el => getComputedStyle(el).display !== 'none')
        && [...section.querySelectorAll('a[data-plan]')].every(link => {
          const query = new URL(link.href).searchParams;
          return query.get('cycle') === cycle && query.get('plan') === link.dataset.plan;
        });
    }, cycle);
    if (!valid) out.push(`billing: ${cycle} state is broken`);
  }
  await p.close();
}

// Enquiry context accepts only known choices and never offers a placeholder receiver.
// Exercise native validation and POST payload without sending a real enquiry.
{
  const p = await br.newPage();
  await p.goto(B + '/', { waitUntil: 'networkidle0' });
  const configured = !isPlaceholder(process.env.PUBLIC_REVIEW_ENDPOINT || site.reviewEndpoint);
  const form = await p.$('[data-form-live]');
  assert.equal(Boolean(form), configured, 'hero form must have a configured receiver');
  if (!configured) {
    assert.equal(await p.$eval('[data-form-preview]', el => el.tagName), 'DIV');
    assert.equal(await p.$eval('.form button', el => el.disabled), true);
    assert.equal(await p.$eval('.form a', el => el.href), `mailto:${site.email}`);
  }
  if (form) {
    assert.equal(await p.$eval('.form', el => el.checkValidity()), false);
    await p.type('#hero-review-name', 'Review test');
    await p.type('#hero-review-email', 'invalid-email');
    assert.equal(await p.$eval('.form', el => el.checkValidity()), false);
    await p.$eval('#hero-review-email', el => { el.value = 'review@example.com'; });
    assert.equal(await p.$eval('.form', el => el.checkValidity()), true, 'website is optional');
    assert.equal(await p.$('textarea'), null, 'hero form should stay short');
    await p.setRequestInterception(true);
    let submission;
    p.on('request', request => {
      if (request.method() === 'POST') {
        submission = { url: request.url(), data: new URLSearchParams(request.postData()) };
        return request.respond({ status: 200, contentType: 'text/html', body: '<p>Test receiver</p>' });
      }
      return request.continue();
    });
    const action = await p.$eval('.form', el => el.action);
    await Promise.all([
      p.waitForNavigation(),
      p.click('.form button[type="submit"]'),
    ]);
    assert.equal(submission.url, action);
    assert.equal(submission.data.get('name'), 'Review test');
    assert.equal(submission.data.get('email'), 'review@example.com');
    assert.equal(submission.data.get('_gotcha'), '');
  }
  await p.close();
}

{
  const p = await br.newPage();
  p.on('pageerror', e => out.push(`enquiry script: ${e.message}`));
  await p.goto(B + '/contact/?plan=improve&cycle=annual', { waitUntil: 'networkidle0' });
  const context = await p.$eval('[data-plan-context]', el => ({ hidden: el.hidden, text: el.textContent }));
  if (context.hidden || !context.text.includes('Improve: $540 per year')) out.push('enquiry: selected plan or period lost');
  const form = await p.evaluate(() => {
    const el = document.querySelector('[data-form-live]');
    return el ? { action: el.action, plan: el.elements.plan.value, cycle: el.elements.billing_period.value } : null;
  });
  if (form && (!form.action.startsWith('https:') || form.plan !== 'Improve' || form.cycle !== 'annual')) out.push('enquiry: configured form context is invalid');
  if (isPlaceholder(site.email) && await p.$('a[href^="mailto:"]')) out.push('enquiry: placeholder email is exposed');
  await p.goto(B + '/contact/?plan=%3Cscript%3E&cycle=unexpected#%25', { waitUntil: 'networkidle0' });
  if (!await p.$eval('[data-plan-context]', el => el.hidden)) out.push('enquiry: unknown plan accepted');
  await p.goto(B + '/#%', { waitUntil: 'networkidle0' });
  await p.close();
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

if (out.length) process.exitCode = 1;
