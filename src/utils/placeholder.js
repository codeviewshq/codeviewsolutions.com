/**
 * Content in src/data/site.js that still needs the owner's real information is
 * written as [SOMETHING IN SQUARE BRACKETS].
 *
 * Anywhere a value would become a link, we check for that shape first — a
 * `mailto:[YOUR EMAIL]` link looks finished but is broken, which is worse than
 * plainly showing the placeholder text.
 */
export function isPlaceholder(value) {
  return typeof value === 'string' && value.trim().startsWith('[');
}
