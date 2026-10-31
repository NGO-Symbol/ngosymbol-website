// Brand layer: the icons in ./public (tab icon, home-screen icons, manifest) and their <head> links for every app that extends it.
// Apps: `extends: ['@symbol/brand']` (the design-system layer @symbol/ui extends it already). Regenerate icons: node scripts/build-icons.mjs
// It also gives every app the hover-only PostCSS step (postcss-hover-only.mjs): no hover effects on touch screens.
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  postcss: { plugins: { [fileURLToPath(new URL('./postcss-hover-only.mjs', import.meta.url))]: {} } }
})
