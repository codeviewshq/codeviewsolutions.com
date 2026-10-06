# CodeView Solutions LLC — website

The marketing site for CodeView Solutions LLC — custom software development,
monthly care, and reliable growth infrastructure for businesses across the US.

> **On voice:** the copy is written in the first person plural ("we") and is
> deliberately **size-neutral** — it describes what the company delivers, never
> how many people deliver it. Keep it that way when you edit. Avoid adding
> claims about team size in either direction.

Built with [Astro](https://astro.build). It compiles to plain static HTML and CSS
with roughly 2 KB of JavaScript, so it will run on any static host.

---

## Quick start

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install     # once
npm run dev     # http://localhost:4321
```

The dev server reloads as you edit. When you are happy:

```bash
npm run build   # writes the finished site to dist/
npm run preview # serve dist/ locally to check the real output
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with live reload |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves `dist/` so you can check the production build |
| `npm run logo` | Rebuilds the logo assets in `public/brand/` from `first.jpg` |
| `npm run og` | Regenerates the social share image, `public/og.png` |
| `npm run check:contrast` | Verifies every text colour clears WCAG AA on the sheet palette |

---

## Where to edit your content

**Almost everything you want to change lives in one file: [`src/data/site.js`](src/data/site.js).**

Copy, services, contact details, navigation, and the per-page SEO titles are all
there. You should not need to open the `.astro` files to update wording.

Anything wrapped in `[SQUARE BRACKETS]` is a placeholder waiting for your real
information. To find every one of them:

```bash
npm run dev          # then search src/data/site.js for the "[" character
```

### The checklist

Work down this list and the site is finished.

| Where in `site.js` | Placeholder | What to put there |
| --- | --- | --- |
| `site.email` | `[YOUR EMAIL]` | The address you actually monitor |
| `site.phone` | `[YOUR PHONE]` | Your number, or `''` to hide the row entirely |
| `site.formspreeId` | `[YOUR_FORM_ID]` | Turns the contact form on — see below |
| `site.links` | `[YOUR GITHUB URL]`, `[YOUR LINKEDIN URL]` | Delete any you do not want in the footer |
| `services[].body` | `[EDIT THIS: …]` ×3 | A sentence or two per service on the work you most want |
| `services[].meta` | `[4–12 weeks]` etc. | Your real timelines, or delete the row |
| `about.story` | `[YOUR COMPANY STORY]` ×3 | Three paragraphs — guidance is written into each placeholder |
| `about.stack` | `[TypeScript]`, `[AWS]`, … | Your actual tools. A short honest list beats a long one |

**Two things are deliberately not on that list.** There is no years-of-experience
fact and no founded-in year anywhere on the site — nothing dates the company in
either direction, by decision. And pricing carries no numbers: the copy commits
to per-project scoping and a fixed agreed figure without publishing a rate. Both
are recorded in [`PRODUCT.md`](PRODUCT.md); treat them as settled rather than as
gaps to fill.

Section headings, the calls to action, and the SEO titles live further down the
same file under `sections`, `ctas`, and `meta`.

Until you replace them, placeholder email and phone values render as plain text
rather than as `mailto:` and `tel:` links — a link to `[YOUR EMAIL]` would look
finished but be broken, which is worse.

### Changing more than the words

| To change | Edit |
| --- | --- |
| Page titles, meta descriptions | `meta` at the bottom of `src/data/site.js` |
| Navigation links | `nav` in `src/data/site.js` |
| Colours, type, spacing | The token block at the top of `src/styles/global.css` |
| Page structure | `src/pages/*.astro` |
| Plans and prices | `plans` in `src/data/site.js` |
| Footer, closing block, service clauses | `src/components/*.astro` |

If you change any colour, run `npm run check:contrast`. It re-checks every
foreground/background pairing against WCAG AA and tells you exactly which one
broke. The revision red is bright enough for a rule or a stroke but not quite
for small text, which is why `--red` (strokes, large type) and `--red-ink`
(small text) are separate tokens.

---

## Turning on the contact form

The form is built, styled, and validated, but it is not connected to anything
yet. Right now it shows a visible "not connected" notice and refuses to submit,
so nobody's enquiry disappears silently.

To make it live:

1. Create a free form at [formspree.io](https://formspree.io).
2. They give you an endpoint like `https://formspree.io/f/xldbqwer`.
3. Copy the ID from the end of it — `xldbqwer` in that example.
4. Paste it into `site.formspreeId` in `src/data/site.js`, replacing `[YOUR_FORM_ID]`.

That is the only change needed. The notice disappears, the endpoint wires itself
up, and the honeypot spam trap is already in place.

**One thing to know:** by default Formspree sends the visitor to its own thank-you
page after they submit. To keep them on your site instead, add a hidden field to
the form in `src/pages/contact.astro` pointing at a page you create:

```html
<input type="hidden" name="_next" value="https://codeviewsolutions.com/thanks/" />
```

Formspree's free tier caps monthly submissions. Any service that accepts a plain
`POST` works the same way — Netlify Forms, Getform, Basin — just point
`formspreeId` at the equivalent value, or edit the `action` in
`src/pages/contact.astro` directly.

---

## Deploying

The build output is a folder of static files. Any of these work; pick one.

### Vercel (easiest)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import it.
3. Vercel detects Astro and fills in the build settings itself. Click **Deploy**.

`vercel.json` is already here with sensible cache and security headers.

### Netlify

1. Push this repo to GitHub.
2. [app.netlify.com/start](https://app.netlify.com/start) → pick the repo.
3. `netlify.toml` supplies the build command and publish directory. Click **Deploy**.

### GitHub Pages

> **Not available for this repository as it stands.** GitHub Pages cannot serve
> from a **private** repo on a **free** organisation plan, and `codeviewshq` is
> on the free plan. To use Pages you would have to either make the repo public
> or upgrade the org to Team. Vercel and Netlify both deploy private repos on
> their free tiers, so either of those is the simpler path. The workflow below
> is committed and ready if that changes.

`.github/workflows/deploy.yml` is set up to build and publish on every push to
`main`. One thing to do first:

- In your repo, go to **Settings → Pages → Build and deployment** and set
  **Source** to **GitHub Actions**.

**If you use the custom domain** (codeviewsolutions.com), you are done — leave
`astro.config.mjs` exactly as it is.

**If you do not**, and the site will live at `https://<user>.github.io/<repo>/`,
you must also uncomment the `base` line in `astro.config.mjs`:

```js
base: '/codeviewsolutions',   // must match your repository name
```

Without it every stylesheet, font, and link resolves to the wrong path and the
site loads unstyled.

### Pointing the domain at it

Whichever host you choose, add `codeviewsolutions.com` in its dashboard, then set
the DNS records it gives you at your registrar. Then confirm
`site: 'https://codeviewsolutions.com'` in `astro.config.mjs` still matches —
that one value drives canonical URLs, the sitemap, and the absolute Open Graph
image URL that social previews depend on.

For GitHub Pages with a custom domain, also add a file called `CNAME` in
`public/` containing just `codeviewsolutions.com`.

---

## The logo

`first.jpg` is the supplied artwork and the source of truth. It is a raster JPG
on an off-white field, which cannot go on a near-black page as-is, so
`npm run logo` derives everything the site actually uses:

```bash
npm run logo     # rewrites public/brand/
```

Two steps run in sequence. `build-logo.mjs` reads the JPG, converts luminance
into an alpha mask (the artwork is two-tone, so how far a pixel travelled from
the background toward the ink *is* its coverage), trims to the ink, splits the
mark from the wordmark at the widest empty column, and writes transparent PNGs
in both white and navy. `trace-logo.mjs` then vectorises them with marching
squares plus Douglas–Peucker simplification, emitting one `fill-rule="evenodd"`
path so the counters inside the circuit nodes fall out of the winding.

The result is `public/brand/mark.svg` — 1.4 KB, inherits `currentColor`, sharp
at 22 px and at any size. That path is inlined in three places, and they must
stay in step: `src/components/Logo.astro` (header and footer),
`public/favicon.svg`, and the share image, which reads the path out of
`mark.svg` at build time so it cannot drift.

**If you replace `first.jpg`,** run `npm run logo`, then paste the new `d`
attribute from `public/brand/mark.svg` into `Logo.astro` and `favicon.svg`, then
`npm run og`. The mark is **1.27:1, not square** — size it on one axis and leave
the other `auto`, or it distorts.

---

## The social share image

`public/og.png` is what appears when the site is linked on LinkedIn, Slack, X, or
iMessage. It is committed as a static file, so deploys never depend on the build
machine's fonts.

If you change the tagline, edit the constants at the top of
`scripts/generate-og.mjs`, then:

```bash
npm run og      # rewrites public/og.png
```

and commit the new PNG. Test how it looks with LinkedIn's
[Post Inspector](https://www.linkedin.com/post-inspector/) once the site is live.

---

## Notes on the design

**The site is a specification sheet.** That is the whole idea, and every visual
decision follows from it: a website that somebody looked at, wrote down, ruled,
and signed. If you add something, ask whether it belongs on a drawing before
adding a new idea. The direction is recorded in full in [`DESIGN.md`](DESIGN.md)
and as an HTML comment at the top of `<body>` in `src/layouts/BaseLayout.astro`
— that comment survives the production build on purpose, so the intent ships
with the artifact.

**Four inks, declared and never exceeded.** Drafting stock `#EFEEE7`, the
logo's own navy `#000036` (sampled from `first.jpg`), one spot revision red
`#D8261B`, and graphite `#4E4E47`. `--red-ink` is the same red darkened for
small text; `--rule` and `--stock-2` are working tints, not new colours. There
is no fifth hue anywhere. `npm run check:contrast` validates the pairings.

**Line weight carries every division.** The ISO drafting hierarchy, translated
to screen: `--w-hair` (field grid), `--w-key` (unit keyline), `--w-div` (section
division), `--w-edge` (sheet border). A border on this site picks one of those
four — it never invents a thickness. There are no shadows, no corner radii, and
no gradients; their absence is a rule, not an oversight.

**The redline is real, and it is measured.** The free website review is
performed on the page: a revision cloud is drawn around "an asset" in the
headline and a leader line runs from the first-finding note back to it. Both are
generated in `BaseLayout.astro` from the *live* bounding boxes of those
elements and redrawn on resize and after fonts settle — so the cloud fits the
phrase at any width instead of being a fixed path that drifts. The cloud walks
the perimeter in outward arcs, which is how a real revision cloud is drawn.

**Motion is mechanical: things draw, rule, and stamp.** Nothing fades in and
nothing drifts. Markup reveals by running its own stroke length
(`stroke-dashoffset`), the sheet number in the margin stamps as you move down
the page, and hover states snap on an ease that is nearly a step. Under
`prefers-reduced-motion` every stroke is simply already drawn.

**The sheet is live under the pointer.** On a fine pointer, two hairlines track
the cursor across the title sheet and the title block reads out the position in
sheet units. On touch that readout is hidden — it would be meaningless.

**⌘K is the drawing index.** `src/components/CommandPalette.astro` searches
every page and service with subsequence matching, runs real actions, and is
fully keyboard driven. It builds its index from `site.js`, so adding a page adds
it to the palette. Built on `<dialog>`, so focus trapping, the backdrop, and
Escape-to-close come from the platform.

**Archivo and Martian Mono, each with a job.** Archivo sets the sheet lettering,
running to `8vw` at `-0.045em` — that tightness at scale is most of what stops
it reading as a default heading. Martian Mono is reserved for title-block
fields, clause numbers, figures, and dimensions: it is measurement, not a
costume for "technical". Both self-hosted through `@fontsource`.

**Light, because a drawing is.** Drafting stock, not a dark theme. There is no
toggle.

**Prices live in one place.** The `plans` export in `src/data/site.js` is the
only place a figure appears. Both the monthly and yearly figures render, and CSS
shows one based on a `data-cycle` attribute — so the monthly column is still
correct with JavaScript disabled. `src/scripts/billing.js` only flips the
attribute.

**Other directions were considered.** Six other complete visual worlds were
built and judged before this one was chosen; they are kept in
[`archive/worlds/`](archive/worlds/) with restore notes.

---

## Project structure

```
.
├── .github/workflows/deploy.yml   GitHub Pages CI
├── first.jpg                      The supplied logo artwork (source of truth)
├── public/                        Copied to the site root as-is
│   ├── brand/                     Logo assets (generated — npm run logo)
│   │   ├── mark.svg               Traced mark, inherits currentColor
│   │   ├── lockup.svg             Traced mark + wordmark
│   │   └── logo-{lockup,mark}-{dark,light}.png
│   ├── favicon.svg
│   ├── og.png                     Social share image (generated)
│   └── robots.txt
├── scripts/
│   ├── build-logo.mjs             npm run logo — JPG to transparent PNGs
│   ├── trace-logo.mjs             npm run logo — PNG to SVG
│   ├── generate-og.mjs            npm run og
│   └── check-contrast.mjs         npm run check:contrast
├── src/
│   ├── components/
│   │   ├── CommandPalette.astro   The ⌘K palette (builds its index from site.js)
│   │   ├── LightField.astro       The hero's animated flow field
│   │   ├── Logo.astro             The mark (traced — do not hand-edit the path)
│   │   └── Header, Footer, ServiceDetail, Cta
│   ├── data/site.js               ← ALL YOUR CONTENT LIVES HERE
│   ├── layouts/BaseLayout.astro   <head>, meta tags, page shell
│   ├── pages/                     index, services, about, contact, 404
│   ├── styles/global.css          Design tokens and every style
│   └── utils/placeholder.js       Detects un-filled [PLACEHOLDERS]
├── astro.config.mjs               Set `site` here; `base` only for GH Pages
├── netlify.toml
└── vercel.json
```

## What is already handled

- Semantic HTML, one `<h1>` per page, skip-to-content link
- Per-page `<title>`, meta description, canonical URL, Open Graph and Twitter
  card tags with **absolute** image URLs
- `ProfessionalService` structured data with a US-wide service area
- `sitemap-index.xml` generated on every build, referenced from `robots.txt`
- A styled 404 page
- Keyboard focus visible on every interactive element
- Responsive from 320 px upward

One small thing: the footer's copyright year is worked out when the site is
**built**, not when it is viewed. If you deploy from GitHub and it rebuilds on
every push, this takes care of itself. If you go a long time without deploying,
the year will lag until the next build — rebuilding is all it takes to fix.

## Repository

This project lives at **`codeviewshq/codeviewsolutions.com`** (private).

```bash
git clone git@github.com:codeviewshq/codeviewsolutions.com.git
cd codeviewsolutions.com
npm install
npm run dev
```
