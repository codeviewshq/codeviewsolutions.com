# CodeView Solutions LLC — website

The marketing site for CodeView Solutions LLC — custom software development,
technical consulting, and AI integration, based in Old Bridge, New Jersey.

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
| `npm run og` | Regenerates the social share image, `public/og.png` |
| `npm run check:contrast` | Verifies every text colour clears WCAG AA on the dark palette |

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
| `hero.facts` | `[X]+ years delivering software` | Your real number |
| `services[].body` | `[EDIT THIS: …]` ×3 | A sentence or two per service on the work you most want |
| `services[].meta` | `[4–12 weeks]` etc. | Your real timelines, or delete the row |
| `credibility.items` | `[EDIT THIS: …]` ×2 | Your pricing model and your post-launch support offer |
| `about.story` | `[YOUR COMPANY STORY]` ×3 | Three paragraphs — guidance is written into each placeholder |
| `about.facts` | `[YEAR]` | The year you founded the LLC |
| `about.stack` | `[TypeScript]`, `[AWS]`, … | Your actual tools. A short honest list beats a long one |

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
| Header, footer, service rows | `src/components/*.astro` |

If you change any colour, run `npm run check:contrast`. It re-checks every
foreground/background pairing against WCAG AA and tells you exactly which one
broke. Violet is bright enough to work as a border or a focus ring but not as
small body text, which is why `--violet` (graphics) and `--accent-text` (links)
are separate tokens.

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

**The whole site is one idea: refraction.** The company is called CodeView.
Light through glass splits into a spectrum, and that drives every visual
decision — so if you add something, ask whether it belongs to that idea before
adding a new one.

**The spectrum is the palette.** Violet `#A855F7` → cyan `#22D3EE` → amber
`#FBBF24`, always in that order, exposed as the `--spectrum` token. It paints
the second line of each page heading, the logo's split rays, the bullet dots,
the line across the top of the command palette, and the rule that draws under a
service row on hover. Everything else on the site is grey. All three stops are
checked by `npm run check:contrast` as *small text*, not just as decoration, so
the gradient stays legible wherever it lands.

**The hero is a live flow field**, not an image or a CSS gradient
(`src/components/LightField.astro`, ~4 KB). Particles drift through a noise
field drawing filaments, coloured by horizontal position so the field disperses
across the spectrum. Two things there are worth knowing before you touch them:

- *Trails come from an explicit ring buffer of past positions*, not from fading
  the previous frame. Fading is the usual trick and it looks simpler, but it
  couples trail length to alpha, line width, and antialiasing all at once — in
  practice it produced short dashes at every setting tried. Length is now
  exactly `TRAIL × EVERY × SPEED` pixels.
- *The angle spread in `field()` is the whole look.* Map noise across a wide
  range and neighbouring points aim in wildly different directions, so particles
  knot up and scribble. The narrow spread is what makes the flow laminar.

It pauses when scrolled out of view or when the tab is hidden, scales its
particle count to the canvas area and the machine's core count, and composes a
single dense still frame instead of animating under `prefers-reduced-motion`.

**⌘K actually works.** `src/components/CommandPalette.astro` searches every page
and service with subsequence matching (`aiint` finds "AI & AI Integration"),
runs real actions, and is fully keyboard driven. It builds its own index from
`site.js`, so adding a page or a service adds it to the palette with no extra
work. It is built on `<dialog>`, which means focus trapping, the backdrop, and
Escape-to-close come from the platform rather than from code that has to be
maintained. The email actions only appear once a real address is filled in.

**Inter, pushed hard.** One typeface doing everything: hierarchy comes from
size, weight, and colour rather than a second family. The display sizes run to
`8vw` with `-0.045em` tracking — that tightness at scale is most of what stops
it reading as a default heading. Self-hosted through `@fontsource`, so no
request to Google's servers blocks the first paint; the whole font payload is
one 48 KB file.

**Dark only, near-black.** `#0A0A0D`, never pure black. There is no light theme
and no toggle; adding one would mean a second full palette and a re-tuned field,
which is real work rather than a switch.

**Restraint everywhere else.** Hover states lighten a border or shift opacity —
nothing lifts, scales, or bounces. The bold type and the field are loud enough
on their own. Sections are `clamp(5rem, 10vw, 9rem)` apart; if the page starts
feeling dense, check that value first.

---

## Project structure

```
.
├── .github/workflows/deploy.yml   GitHub Pages CI
├── public/                        Copied to the site root as-is
│   ├── favicon.svg
│   ├── og.png                     Social share image (generated)
│   └── robots.txt
├── scripts/
│   ├── generate-og.mjs            npm run og
│   └── check-contrast.mjs         npm run check:contrast
├── src/
│   ├── components/
│   │   ├── CommandPalette.astro   The ⌘K palette (builds its index from site.js)
│   │   ├── LightField.astro       The hero's animated flow field
│   │   ├── Logo.astro             The prism mark
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
- `ProfessionalService` structured data with the New Jersey service area
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
