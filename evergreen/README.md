# CodeView Solutions — Evergreen

A complete, standalone Astro website in the approved Evergreen direction: forest green, ivory, clay, welcoming typography, and a flowing CV mark.

## Run locally

Requires Node.js 22.12 or newer and npm.

```powershell
cd C:\Users\viral\projects\codeviewsolutionsllc\evergreen
npm install
npm run dev
```

Open **http://localhost:4323/**. For production output, run `npm run build`, then `npm run preview`. The finished static website is in `dist/`.

This folder is independent: copy it to its own repository or deploy it with this folder as the project root. It does not import source files or assets from the original website or the Signal version.

## Pages

Home, Services, Software Development, Technical Consulting, AI Integration, Website Care (with monthly/yearly pricing), About, Contact, and 404. A sitemap, robots file, canonical metadata, social image, and organization structured data are included.

## Content and contact

Edit `src/data/site.js` for the service descriptions, phone, plans, and company information. Website-care pricing is separate from custom software, consulting, and AI engagements.

The published phone number works immediately. No email or submission endpoint was supplied, so the default Contact page offers a phone call and a browser-only project-brief composer. It never claims to send an enquiry.

To activate enquiry delivery, copy `.env.example` to `.env` and set `PUBLIC_CONTACT_ENDPOINT` to your real HTTPS form endpoint, or set `site.contactEndpoint` in `src/data/site.js`. It must accept an ordinary multipart HTML POST and return a successful HTTP status. For the enhanced form, allow cross-origin requests and JSON responses. A configured endpoint receives name, email, company, service, message, optional plan, and a honeypot field. Rebuild after changing the configuration.

Do not put API secrets in `PUBLIC_` variables. Endpoint delivery must be verified against the chosen service before launch.

## Branding

The live header uses an inline SVG mark and self-hosted variable-font wordmark. `public/brand/` includes standalone SVG and transparent PNG mark and logo variants for light, dark, and single-color use. These are vector interpretations of the selected concept.

`npm run brand` regenerates the export assets, favicon, and social image. Exported SVG wordmarks use an Arial fallback for portable rendering; the website uses Schibsted Grotesk. The hero image is a generated illustrative asset, not a client project.

## Deploy

Vercel and Netlify configuration is included. Deploy this folder as the project root, build with `npm run build`, and publish `dist/`. Set `SITE_URL` to the final domain; use `SITE_BASE` for subdirectory hosting. No database or application server is required.
