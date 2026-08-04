// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * `site` and `base` are read from the environment so the same source can be
 * deployed to the custom domain (root) and to GitHub Pages (a subdirectory)
 * without editing this file.
 *
 *   Vercel / Netlify / codeviewsolutions.com  ->  defaults below, base '/'
 *   GitHub Pages                              ->  set by .github/workflows/deploy.yml
 *
 * When you point codeviewsolutions.com at GitHub Pages, delete the `env:`
 * block from that workflow and the defaults here take over.
 */
const SITE = process.env.SITE_URL || 'https://codeviewsolutions.com';
const BASE = process.env.SITE_BASE || '/';

// https://astro.build/config
export default defineConfig({
  // Drives canonical URLs, absolute Open Graph image URLs, and sitemap.xml.
  site: SITE,
  base: BASE,

  integrations: [sitemap()],

  build: {
    // One stylesheet instead of many small <link>s -- fewer round trips.
    inlineStylesheets: 'auto',
  },

  compressHTML: true,
});
