/**
 * Content in src/data/site.js that still needs the owner's real information is
 * written as [SOMETHING IN SQUARE BRACKETS].
 *
 * Anywhere a value would become a link, we check for that shape first — a
 * `mailto:[YOUR EMAIL]` link looks finished but is broken, which is worse than
 * plainly showing the placeholder text.
 *
 * An empty string counts too: `mailto:` with nothing after it is the same
 * broken link wearing a different disguise. A value has to be real to be used.
 */
export function isPlaceholder(value) {
  return typeof value !== 'string' || value.trim() === '' || value.trim().startsWith('[');
}
