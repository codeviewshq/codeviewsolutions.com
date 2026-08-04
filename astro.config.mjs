// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, absolute Open Graph image URLs, and sitemap.xml.
  // If you deploy to a different domain, change this one value.
  site: 'https://codeviewsolutions.com',

  // Leave `base` alone for a custom domain (Vercel/Netlify/GitHub Pages + CNAME).
  // ONLY set it if you deploy to https://<user>.github.io/<repo>/ without a
  // custom domain -- see "GitHub Pages" in README.md.
  // base: '/codeviewsolutions',

  integrations: [sitemap()],

  build: {
    // One stylesheet instead of many small <link>s -- fewer round trips.
    inlineStylesheets: 'auto',
  },

  compressHTML: true,
});
