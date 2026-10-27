import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import puppeteer from "puppeteer";
import { site, services } from "../src/data/site.js";

const root = path.resolve("dist");
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
const server = http.createServer((request, response) => {
  let file = path.join(root, decodeURIComponent(request.url.split("?")[0]));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory())
    file = path.join(file, "index.html");
  if (!file.startsWith(root + "/") || !fs.existsSync(file)) {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200, {
    "Content-Type": mime[path.extname(file)] || "application/octet-stream",
  });
  fs.createReadStream(file).pipe(response);
});
await new Promise((resolve) => server.listen(4418, "127.0.0.1", resolve));
const base = "http://127.0.0.1:4418";
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const axe = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const routes = [
  "/",
  "/services/",
  "/work/",
  "/about/",
  "/contact/",
  "/404.html",
];
const widths = [320, 390, 768, 1280, 1440, 1920];
const themes = ["light", "dark"];
const findings = [];
const capture = process.argv.includes("--capture");
if (capture) fs.mkdirSync(".impeccable/review", { recursive: true });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ready = async (page) => {
  await page.waitForSelector('html[data-js="ready"]');
  await page.evaluate(() => document.fonts.ready);
};

try {
  for (const route of routes)
    for (const theme of themes) {
      const page = await browser.newPage();
      page.on("pageerror", (error) =>
        findings.push(`${route}/${theme}: ${error.message}`),
      );
      await page.emulateMediaFeatures([
        { name: "prefers-reduced-motion", value: "reduce" },
      ]);
      await page.evaluateOnNewDocument((theme) => {
        try {
          localStorage.setItem("codeview-theme", theme);
        } catch {}
      }, theme);
      for (const width of widths) {
        await page.setViewport({ width, height: 900, hasTouch: width < 800 });
        await page.goto(base + route, { waitUntil: "networkidle0" });
        await ready(page);
        const errors = await page.evaluate((theme) => {
          const errors = [];
          if (document.documentElement.scrollWidth > innerWidth + 1)
            errors.push("horizontal overflow");
          if (document.querySelectorAll("h1").length !== 1)
            errors.push("expected one primary heading");
          if (document.documentElement.dataset.theme !== theme)
            errors.push("theme preference lost");
          if (document.querySelector('form[action*="VARIABLE"]'))
            errors.push("unconfigured form exposed");
          if (
            /\$\d|per month|pay yearly|free website review/i.test(
              document.body.innerText,
            )
          )
            errors.push("retired pricing or offer exposed");
          if (document.querySelector("[data-billing]"))
            errors.push("retired billing control exposed");
          for (const link of document.querySelectorAll(".contact-methods a")) {
            if (link.getBoundingClientRect().right > innerWidth + 1)
              errors.push("contact link escapes viewport");
          }
          for (const el of document.querySelectorAll("h1,h2,.button")) {
            const box = el.getBoundingClientRect();
            if (box.width && (box.left < -1 || box.right > innerWidth + 1))
              errors.push(`clipped ${el.tagName}`);
          }
          for (const connector of document.querySelectorAll(".journey__connector")) {
            const node = connector.closest(".journey__node");
            const start = node.querySelector(".journey__symbol").getBoundingClientRect();
            const end = node.nextElementSibling.querySelector(".journey__symbol").getBoundingClientRect();
            const line = connector.getBoundingClientRect();
            if (line.width <= 0 || Math.abs(line.left - start.right - 12) > 1 || Math.abs(end.left - line.right - 12) > 1 || Math.abs(line.top - start.top - start.height / 2) > 1)
              errors.push("journey connector is not anchored between symbols");
          }
          return errors;
        }, theme);
        findings.push(
          ...errors.map((error) => `${route}@${width}/${theme}: ${error}`),
        );
        if ([390, 1440].includes(width)) {
          await page.evaluate(axe);
          const result = await page.evaluate(async () =>
            window.axe.run(document, {
              runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"],
              },
            }),
          );
          for (const violation of result.violations)
            findings.push(
              `${route}@${width}/${theme}: axe ${violation.id} ${violation.nodes.map((n) => n.target.join(" ")).join(", ")}`,
            );
          if (capture) {
            const slug =
              route === "/"
                ? "home"
                : route.replaceAll("/", "").replace(".html", "");
            await page.evaluate(() => scrollTo(0, 0));
            await page.screenshot({
              path: `.impeccable/review/${slug}-${width === 390 ? "mobile" : "desktop"}-${theme}.png`,
              fullPage: true,
            });
            if (route === "/")
              await page.screenshot({
                path: `.impeccable/review/hero-${width === 390 ? "mobile" : "desktop"}-${theme}.png`,
              });
          }
        }
      }
      await page.close();
    }

  const page = await browser.newPage();
  page.on("pageerror", (error) =>
    findings.push(`interaction: ${error.message}`),
  );
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  for (const [width, height] of [[1101, 720], [1280, 720], [1280, 800], [1440, 900], [1920, 1080], [2000, 994], [2560, 1440]]) {
    await page.setViewport({ width, height });
    await page.goto(base, { waitUntil: "networkidle0" });
    await ready(page);
    const composition = await page.evaluate(() => {
      const box = (selector) => document.querySelector(selector).getBoundingClientRect();
      const icon = box(".hero .journey__symbol");
      const actions = box(".hero .actions");
      const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      return {
        offset: icon.top + icon.height / 2 - actions.top - actions.height / 2,
        footerGap: box(".hero__bottom").top - box(".hero__journey").bottom,
        overlap: [...document.querySelectorAll(".hero .journey__symbol")].some((symbol) =>
          [...document.querySelectorAll(".hero .actions a")].some((link) => intersects(symbol.getBoundingClientRect(), link.getBoundingClientRect())),
        ),
      };
    });
    assert(Math.abs(composition.offset) <= 48, `${width}×${height}: hero diagram drifts away from the consultation actions`);
    assert(composition.footerGap >= 16 && !composition.overlap, `${width}×${height}: hero content overlaps`);
  }
  await page.emulateMediaFeatures([]);
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await ready(page);
  const initialTheme = await page.$eval("html", (el) => el.dataset.theme);
  await page.click("[data-theme-toggle]");
  assert.notEqual(
    await page.$eval("html", (el) => el.dataset.theme),
    initialTheme,
    "theme control changes appearance",
  );
  await page.reload({ waitUntil: "networkidle0" });
  await ready(page);
  assert.notEqual(
    await page.$eval("html", (el) => el.dataset.theme),
    initialTheme,
    "theme persists across reload",
  );

  // Check the ring on its actual section ground, not only the page palette.
  for (const theme of ["light", "dark"]) {
    if ((await page.$eval("html", (el) => el.dataset.theme)) !== theme)
      await page.click("[data-theme-toggle]");
    await page.keyboard.press("Tab");
    await page.$eval(".closing .button", (el) => el.focus({ preventScroll: true }));
    const ring = await page.$eval(".closing .button", (el) => {
      const style = getComputedStyle(el);
      const ground = getComputedStyle(el.closest(".closing")).backgroundColor;
      const luminance = (color) => {
        const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => {
          const s = v / 255;
          return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
      };
      const [hi, lo] = [luminance(style.outlineColor), luminance(ground)].sort((a, b) => b - a);
      return { ratio: (hi + 0.05) / (lo + 0.05), visible: style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2 };
    });
    assert(ring.visible && ring.ratio >= 3, `${theme}: closing action needs a visible 3:1 focus ring`);
  }

  await page.$eval("[data-connections]", (el) => el.scrollIntoView({ block: "center" }));
  await page.waitForSelector('[data-connections-state="playing"]');
  for (const choice of ["workflow", "systems", "experience"]) {
    await page.click(`[data-connection="${choice}"]`);
    // The selected route must visibly draw in, then stay fully drawn and opaque.
    const trace = await page.$eval(`.connection-signal--${choice}`, async (el) => {
      const run = el.getAnimations().find((a) => a.animationName === "connection-trace");
      if (!run) return null;
      run.pause();
      run.currentTime = 0;
      const start = parseFloat(getComputedStyle(el).strokeDashoffset);
      run.finish();
      await new Promise((r) => setTimeout(r, 450));
      return { start, end: parseFloat(getComputedStyle(el).strokeDashoffset), opacity: getComputedStyle(el).opacity };
    });
    assert.deepEqual(trace, { start: 100, end: 0, opacity: "1" }, `${choice} route traces in and stays drawn`);
    assert.equal(
      await page.$eval("[data-connections]", (el) => el.dataset.active),
      choice,
    );
    assert.equal(
      await page.$eval(`[data-connection="${choice}"]`, (el) =>
        el.getAttribute("aria-pressed"),
      ),
      "true",
    );
  }
  assert.match(
    await page.$eval("[data-connection-caption]", (el) => el.textContent),
    /people/,
  );
  const details = await page.$("details");
  await details.$eval("summary", (el) => el.click());
  assert.equal(await details.evaluate((el) => el.open), true, "FAQ opens");
  await details.$eval("summary", (el) => el.click());
  assert.equal(await details.evaluate((el) => el.open), false, "FAQ closes");

  await page.evaluate(() => scrollTo(0, 0));
  await page.click("[data-cmdk-open]");
  assert.equal(await page.$eval("[data-cmdk-input]", (el) => getComputedStyle(el).outlineStyle), "solid", "search input keeps a visible focus ring");
  await page.type("[data-cmdk-input]", "integration");
  assert.match(
    await page.$eval("[data-cmdk-list]", (el) => el.textContent),
    /integration/i,
  );
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => location.pathname === "/services/");
  await ready(page);
  assert.equal(
    new URL(page.url()).hash,
    "#connected-systems",
    "search navigates to the matching capability",
  );
  await page.click("[data-cmdk-open]");
  await page.type("[data-cmdk-input]", "zzzz-no-such-page");
  assert.equal(
    await page.$eval("[data-cmdk-empty]", (el) => el.hidden),
    false,
    "empty search state is visible",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.$eval("[data-cmdk]", (el) => el.open),
    false,
    "Escape closes search",
  );
  assert.equal(
    await page.evaluate(() =>
      document.activeElement.hasAttribute("data-cmdk-open"),
    ),
    true,
    "search restores focus",
  );

  await page.setViewport({ width: 390, height: 844, hasTouch: true });
  await page.click("[data-menu-toggle]");
  assert.equal(
    await page.$eval("[data-menu-toggle]", (el) =>
      el.getAttribute("aria-expanded"),
    ),
    "true",
  );
  assert.equal(
    await page.$eval(".mobile-nav", (el) => getComputedStyle(el).display),
    "block",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.$eval("[data-menu-toggle]", (el) =>
      el.getAttribute("aria-expanded"),
    ),
    "false",
  );
  await page.goto(base + "/contact/", { waitUntil: "networkidle0" });
  await ready(page);
  assert(
    await page.$(`a[href^="mailto:${site.email}"]`),
    "consultation has a real email destination",
  );
  // The enquiry form only submits when a real HTTPS receiver was configured at build.
  const form = await page.$eval(".contact-form", (el) => ({
    action: el.getAttribute("action"),
    disabled: el.querySelector("fieldset").disabled,
    fields: [...el.querySelectorAll("input:not([type=hidden]), textarea")].map((f) => f.name),
  }));
  assert.deepEqual(form.fields, ["name", "email", "company", "message", "_gotcha"]);
  if (form.action) assert(form.action.startsWith("https://") && !form.disabled, "configured form submits over HTTPS");
  else assert(form.disabled && (await page.$(".contact-form__status a[href^='mailto:']")), "unconfigured form is disabled and offers email");
  await page.goto(base + "/work/", { waitUntil: "networkidle0" });
  await ready(page);
  assert.equal(
    await page.$$eval(".work-placeholder", (els) => els.length),
    3,
    "work and demo placeholders exist",
  );
  assert.equal(
    await page.$(".work-placeholder a, .work-placeholder button"),
    null,
    "placeholders do not pretend to be live demos",
  );

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await ready(page);
  await wait(200);
  const frameA = await page.$eval("canvas", (el) => el.toDataURL());
  await wait(200);
  assert.notEqual(
    await page.$eval("canvas", (el) => el.toDataURL()),
    frameA,
    "background actually animates",
  );
  await page.click(".hero [data-motion-toggle]");
  await wait(100);
  const paused = await page.$eval("canvas", (el) => el.toDataURL());
  await wait(200);
  assert.equal(
    await page.$eval("canvas", (el) => el.toDataURL()),
    paused,
    "pause stops the background",
  );
  await page.click(".hero [data-motion-toggle]");
  await wait(200);
  assert.notEqual(
    await page.$eval("canvas", (el) => el.toDataURL()),
    paused,
    "resume restarts the background",
  );
  const journeyTiming = await page.$eval(".hero .journey", (el) =>
    el.getAnimations({ subtree: true }).map((a) => ({
      duration: a.effect.getTiming().duration,
      delay: a.effect.getTiming().delay,
      iterations: a.effect.getTiming().iterations,
      state: a.playState,
    })),
  );
  assert.equal(journeyTiming.length, 2, "journey traces exactly two connectors");
  assert.deepEqual(journeyTiming.map((a) => a.delay), [0, 650], "journey traces in reading order");
  assert(journeyTiming.every((a) => a.iterations === 1 && a.duration === 750), "journey never loops");
  await wait(1500);
  assert(await page.$eval(".hero .journey", (el) => el.getAnimations({ subtree: true }).every((a) => a.playState === "finished")), "journey settles after its short sequence");
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await wait(150);
  assert.equal(await page.$eval("html", (el) => el.dataset.motion), "paused");
  const still = await page.$eval("canvas", (el) => el.toDataURL());
  await wait(150);
  assert.equal(
    await page.$eval("canvas", (el) => el.toDataURL()),
    still,
    "reduced motion freezes the background",
  );
  assert.equal(
    await page.$eval("[data-motion-toggle]", (el) => el.disabled),
    true,
  );

  await page.setJavaScriptEnabled(false);
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle0" });
  assert.equal(
    await page.$eval(".mobile-nav", (el) => getComputedStyle(el).display),
    "block",
    "navigation works without JS",
  );
  assert.match(await page.$eval("h1", (el) => el.textContent), /Tell us what’s/);
  assert.equal(
    await page.$eval(
      ".flow-field__fallback",
      (el) => getComputedStyle(el).opacity,
    ),
    "0.17",
    "static background survives without JS",
  );
  await page.close();
  console.log(
    `${routes.length} routes × ${widths.length} widths × ${themes.length} themes checked. Accessibility, contact, navigation, search, diagrams, theme persistence, live motion, pause/resume, reduced motion, and no-JS checks complete.`,
  );
} finally {
  await browser.close();
  server.close();
}
if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else console.log("No layout or accessibility findings.");
