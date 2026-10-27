# CodeView Solutions LLC

A static Astro website for CodeView’s digital consulting and development work. The “Quiet momentum” design uses the supplied logo, self-hosted Manrope, light and dark themes, a live canvas background, and animated system diagrams.

## Run locally

Use Node.js 22 and npm.

```bash
npm ci
npm run dev -- --host 0.0.0.0
```

Open `http://localhost:4321`.

```bash
npm run build
npm run check:contrast
npm run check:layout
npm run preview
```

The layout check serves the built site on port 4418. It checks all six pages at six widths in both themes, accessibility, navigation, search, consultation links, theme persistence, animated diagrams, the live background, pause/resume, reduced motion, and the no-JavaScript fallback. It sends no enquiries. Chrome’s system libraries are required; CI installs them. Add `-- --capture` to save review screenshots under `.impeccable/review/`.

## Content and design

- `src/data/site.js`: company facts, contact channels, positioning, capabilities, process, FAQs, and metadata.
- `src/pages/`: Home, Services, Work, About, Contact, and 404.
- `src/layouts/BaseLayout.astro`: shared header, metadata, theme initialization, search, and footer.
- `src/styles/global.css`: both palettes, typography, layout, components, and responsive rules.
- `src/scripts/site.ts`: preferences, navigation, connection-diagram state, Motion orchestration, and the canvas field.
- `src/components/`: shared diagram, background, placeholder, and layout components.
- `PRODUCT.md`: confirmed offer and product constraints.
- `DESIGN.md` and `.impeccable/design.json`: the implemented design system.

The primary action is a free consultation. Email and phone come from `site`. The Contact form posts natively to `site.contactEndpoint` (or the `PUBLIC_CONTACT_ENDPOINT` build variable), which must be HTTPS; until it is set, the form renders disabled and email is the working route. There are no subscriptions or published prices. Keep contact routes real and hide unconfigured profile links. Do not invent client names, results, testimonials, commercial terms, or company size. Work and product demos are explicitly labeled placeholders until publishable material is supplied.

The theme follows the device until the visitor chooses a preference. Theme and motion choices persist locally when browser storage is available. Motion pauses when the field leaves the viewport or the document is hidden. A global pause control and reduced-motion mode preserve the complete content and a static composition. Core content and navigation work without JavaScript.

## Brand assets

The supplied logo is `first.jpg`; the site renders the traced SVG lockup and mark. `npm run logo` regenerates the derived assets. `npm run og` regenerates the 1200×630 social image from the logo, current headline, and Manrope font. These generated assets are committed separately from a site build.

`npm run social` regenerates the 1080×1080 profile images (`public/brand/social-avatar-light.png` and `-dark.png`) from the traced mark.

## Deployment

The current Cloudflare Pages project is `codeviewsolutions`, serving `https://codeviewsolutions.pages.dev`. The custom domain `codeviewsolutions.com` serves the site over HTTPS using a proxied apex CNAME to `codeviewsolutions.pages.dev`. Wrangler OAuth does not include DNS-edit permission; future DNS changes need the dashboard or a separately authorized DNS credential.

For Cloudflare Pages, upload the contents of `dist/` after building. `public/_headers` preserves the security and asset-cache headers in the Pages build. Authenticate the CLI using `npx wrangler login`, then create a Pages project and upload with `npx wrangler pages deploy dist --project-name <project-name> --branch main`. Add `codeviewsolutions.com` under that project's Custom domains. A new Direct Upload project cannot later be converted to Cloudflare's Git integration; use a Git-integrated project instead if automatic Git deployments are required.


`npm run build` writes static files to `dist/`. Vercel and Netlify configuration is included. The GitHub Actions workflow checks pull requests and main pushes before its Pages build/deploy jobs run. Configure Pages to use GitHub Actions if that is the chosen host.

`astro.config.mjs` defaults to `https://codeviewsolutions.com` at `/`. The Pages workflow currently builds for `https://codeviewshq.github.io/codeviewsolutions.com/` using `SITE_URL` and `SITE_BASE`. For a custom domain on Pages, remove those workflow overrides, configure the domain in Pages, and add `public/CNAME`. Keep canonical URLs, sitemap, and robots aligned with the deployment origin.

Changes are local until committed and pushed. Deploy only after checks pass and contact configuration matches the intended published experience.
