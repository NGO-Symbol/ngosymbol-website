// Brand layer: the icons in ./public (tab icon, home-screen icons, manifest) and their <head> links for every app that extends it.
// Apps: `extends: ['@symbol/brand']` (the design-system layer @symbol/ui extends it already). Regenerate icons: node scripts/build-icons.mjs
// It also gives every app the hover-only PostCSS step (postcss-hover-only.mjs): no hover effects on touch screens.
// And the address of the exhibition site as __DOCS_SITE__ (apps/main/app/data/docs-site.ts): DOCS_SITE_URL at build
// time, else symbol.ngo/documentsart. One value for the browser code (vite define) and the prerendered server routes
// (nitro replace), so canonicals, sitemaps and links never disagree.
import { fileURLToPath } from 'node:url'

const docsSite = JSON.stringify((process.env.DOCS_SITE_URL || 'https://symbol.ngo/documentsart').replace(/\/+$/, ''))

export default defineNuxtConfig({
  postcss: { plugins: { [fileURLToPath(new URL('./postcss-hover-only.mjs', import.meta.url))]: {} } },
  vite: { define: { __DOCS_SITE__: docsSite } },
  nitro: { replace: { __DOCS_SITE__: docsSite } }
})
