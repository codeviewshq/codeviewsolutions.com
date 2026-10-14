// Unconfigured content must never become a broken link or form action.
export function isPlaceholder(value) {
  return typeof value !== 'string' || value.trim() === '' || value.trim().startsWith('[') || value.trim().startsWith('<');
}
