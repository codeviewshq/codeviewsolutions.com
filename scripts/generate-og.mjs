import fs from "node:fs/promises";
import puppeteer from "puppeteer";
import { hero, site } from "../src/data/site.js";

// Render the share image from the same source logo, headline, and self-hosted font.
const logo = await fs.readFile("public/brand/lockup.svg", "utf8");
const font = (
  await fs.readFile(
    "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  )
).toString("base64");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
const lines = Array.from(
  { length: 28 },
  (_, i) =>
    `<path d="M${760 + i * 8} -60 C${1180 + i * 6} 120 ${800 - i * 5} 360 ${1070 + i * 10} 690"/>`,
).join("");
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><html><meta charset="utf-8"><style>@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:200 800}*{box-sizing:border-box}body{margin:0;background:#090D24;color:#EFF2FF;font-family:Manrope,sans-serif}.logo{position:absolute;left:70px;top:58px;color:#EFF2FF}.logo svg{width:200px;height:auto}.logo path{fill:currentColor}h1{position:absolute;left:70px;top:185px;font-size:88px;line-height:1.08;font-weight:500;letter-spacing:-3px;margin:0}h1 span{color:#A7B5FF}.field{position:absolute;inset:0;width:1200px;height:630px;stroke:#7388D4;stroke-width:1;fill:none;opacity:.48}p{position:absolute;left:74px;bottom:45px;font-size:17px;letter-spacing:.2px;color:#B1BCD8;margin:0}.domain{left:auto;right:70px}</style><svg class="field" viewBox="0 0 1200 630">${lines}</svg><div class="logo">${logo}</div><h1>${escape(hero.headline)}<br><span>${escape(hero.accent)}</span></h1><p>Websites, custom software & integrations.</p><p class="domain">${escape(site.domain)}</p></html>`,
    { waitUntil: "load" },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/og.png" });
  console.log("Wrote public/og.png (1200×630).");
} finally {
  await browser.close();
}
