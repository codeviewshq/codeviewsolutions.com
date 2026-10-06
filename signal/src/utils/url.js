export function url(path) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}

export function contactEndpoint(configured) {
  const value = import.meta.env.PUBLIC_CONTACT_ENDPOINT || configured;
  if (!value) return null;
  try {
    const endpoint = new URL(value);
    return endpoint.protocol === 'https:' ? endpoint.href : null;
  } catch {
    return null;
  }
}
