import { env as buildEnv } from 'node:process';
import { site } from '../data/site.js';
import { isPlaceholder } from './placeholder.js';

// Both forms use the same receiver; unconfigured builds keep direct contact links.
const endpoint = buildEnv.PUBLIC_REVIEW_ENDPOINT || site.reviewEndpoint;
export const formAction = isPlaceholder(endpoint) ? undefined : endpoint.trim();
if (formAction && new URL(formAction).protocol !== 'https:') {
  throw new Error('site.reviewEndpoint must be a working HTTPS form endpoint');
}
