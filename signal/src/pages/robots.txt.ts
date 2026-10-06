import { url } from '../utils/url.js';
export const GET = ({ site }) => new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(url('/sitemap-index.xml'), site).href}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
