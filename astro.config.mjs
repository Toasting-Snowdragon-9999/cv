// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL / SITE_BASE are set by the GitHub Pages workflow
// (https://<user>.github.io + /cv). Locally they default to '/'.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.SITE_BASE ?? '/',
  build: { inlineStylesheets: 'always' },
});
