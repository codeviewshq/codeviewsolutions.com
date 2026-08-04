/**
 * Prefixes an internal path with the site's base path.
 *
 * GitHub Pages serves this repo from a subdirectory
 * (codeviewshq.github.io/codeviewsolutions.com/), while Vercel, Netlify, and
 * the custom domain all serve it from the root. Astro rewrites the URLs of
 * assets it bundles, but NOT plain href strings — so without this every
 * internal link would point above the base path and 404.
 *
 * Paths in src/data/site.js are written root-relative ('/services/'). This is
 * applied when they are rendered, so the data stays portable.
 *
 * When base is '/' (the default, and what the custom domain will use) this is
 * a no-op.
 */
const BASE = import.meta.env.BASE_URL || '/';

export function withBase(path) {
  if (typeof path !== 'string' || path === '') return path;

  // Leave anything that is not an internal absolute path alone.
  if (
    /^[a-z][a-z0-9+.-]*:/i.test(path) || // http:, mailto:, tel:, …
    path.startsWith('//') ||
    path.startsWith('#')
  ) {
    return path;
  }

  if (!path.startsWith('/')) return path;

  return `${BASE.replace(/\/+$/, '')}${path}`.replace(/([^:])\/{2,}/g, '$1/');
}
