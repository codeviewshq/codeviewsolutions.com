# CodeView Solutions LLC

Astro 5 static marketing website using the Redline design. Five pages share one layout, stylesheet, navigation, and search dialog. Native SVG illustrations keep the drafting style consistent without paid generation services or external image requests.

## Run locally

Use Node.js 22 LTS and npm.

```bash
npm ci
npm run dev -- --host 0.0.0.0
```

Open `http://localhost:4321`. From another device, use this machine's LAN address instead of localhost.

```bash
npm run build
npm run check:contrast
npm run check:layout
npm run preview
```

The layout check serves `dist/` temporarily on port 4418 and uses Puppeteer to check five pages at eleven widths, accessibility, reduced motion, pricing, and enquiry context. Chrome must have its system libraries installed. CI installs the browser dependencies. No enquiries are submitted by these checks.

## Content and configuration

Edit `src/data/site.js` for shared copy, services, contact details, pricing, and metadata. `<VARIABLE>`, square-bracket placeholders, and empty values are unconfigured; they never become live email links or form actions.

- `site.email`: public email address. Currently `hello@codeviewsolutions.com`.
- `site.reviewEndpoint`: working HTTPS endpoint accepting a native form POST. Currently `<VARIABLE>`. Alternatively set `PUBLIC_REVIEW_ENDPOINT` when building.
- `site.phone`: currently the published contact route.
- `site.links`: replace profile URLs or remove unused entries.
- `plans`: the single source for monthly and annual prices. Plan and billing choices are passed to Contact.
- `hero.headlineBefore`, `headlineMarked`, `headlineAfter`: editable headline with the marked phrase specified explicitly.
- `sampleReview`: a labeled illustrative review, not a client case study.

The homepage hero collects name, email, and an optional website address; the Contact page also collects company, project, message, and optional selected plan/billing period. Both use `ReviewForm.astro` and the same receiver. Until the custom form service is connected, both render as a preview with submission disabled and a direct email link. Set `site.reviewEndpoint` or `PUBLIC_REVIEW_ENDPOINT` to a working HTTPS endpoint accepting a native form POST to enable delivery. The endpoint must validate submissions, handle spam, and provide its own success/error response. Test actual delivery after configuring it. The site never claims a request was sent without a receiver.

The free first design, revision limits, monthly update allowance, hosting and third-party costs, and cancellation terms are agreed before work starts. Keep the published prices; do not invent quantities or contractual terms. One business day is an initial reply standard, not a resolution deadline. No fabricated client work, testimonials, metrics, or claims about company size.

## Files

| Change | File |
| --- | --- |
| Shared content and offers | `src/data/site.js` |
| Page structure | `src/pages/*.astro` |
| Navigation, metadata, revision geometry | `src/layouts/BaseLayout.astro` |
| Palette, spacing, responsive rules | `src/styles/global.css`, `src/styles/inner.css` |
| Native illustrations | `src/components/ReviewDrawing.astro` |
| Billing behaviour | `src/scripts/billing.js` |
| Browser regression checks | `scripts/check-layout.mjs` |

The supplied logo is `first.jpg`. `npm run logo` regenerates derived brand assets; keep the mark in `Logo.astro` and `public/favicon.svg` synchronized when replacing it. `npm run og` regenerates `public/og.png`.

## Deployment

The current Cloudflare Pages project is `codeviewsolutions`, serving `https://codeviewsolutions.pages.dev`. The custom domain `codeviewsolutions.com` serves the site over HTTPS using a proxied apex CNAME to `codeviewsolutions.pages.dev`. Wrangler OAuth does not include DNS-edit permission; future DNS changes need the dashboard or a separately authorized DNS credential.

For Cloudflare Pages, upload the contents of `dist/` after building. `public/_headers` preserves the security and asset-cache headers in the Pages build. Authenticate the CLI using `npx wrangler login`, then create a Pages project and upload with `npx wrangler pages deploy dist --project-name <project-name> --branch main`. Add `codeviewsolutions.com` under that project's Custom domains. A new Direct Upload project cannot later be converted to Cloudflare's Git integration; use a Git-integrated project instead if automatic Git deployments are required.


`npm run build` writes static files to `dist/`. Vercel and Netlify configuration is included. The GitHub Actions workflow checks pull requests and main pushes before its Pages build/deploy jobs run. Configure Pages to use GitHub Actions if that is the chosen host.

`astro.config.mjs` defaults to `https://codeviewsolutions.com` at `/`. The Pages workflow currently builds for `https://codeviewshq.github.io/codeviewsolutions.com/` using `SITE_URL` and `SITE_BASE`. For a custom domain on Pages, remove those workflow overrides, configure the domain in Pages, and add `public/CNAME`. Keep canonical URLs, sitemap, and robots aligned with the deployment origin.

Changes are local until committed and pushed. Deploy only after checks pass and contact configuration matches the intended published experience.
