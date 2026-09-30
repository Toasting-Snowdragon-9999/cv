// Prefixes an absolute site path with Astro's configured `base`
// ('/' locally, '/cv' on GitHub Pages) so assets resolve on both.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
