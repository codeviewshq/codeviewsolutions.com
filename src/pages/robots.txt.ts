import type { APIRoute } from 'astro';
import { withBase } from '../utils/url.js';

/**
 * robots.txt is generated rather than kept in /public so the sitemap URL
 * always matches wherever the site is actually deployed. A hardcoded file
 * would point GitHub Pages builds at the custom domain's sitemap.
 *
 * `site` is the origin only and never includes the base path, so that has to
 * be added explicitly — otherwise this points at a sitemap that 404s.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site).href;

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
