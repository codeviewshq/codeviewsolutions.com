import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://codeviewsolutions.com',
  base: process.env.SITE_BASE || '/',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (url) => !url.endsWith('/404/') })],
  compressHTML: true,
});
