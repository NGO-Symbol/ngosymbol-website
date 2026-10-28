// Design-system gallery: published next to the main site at symbol.ngo/design/ (see .github/workflows/deploy.yml) so it can be
// opened on a phone. Always noindex, independent of the main site's `indexable` flag. Run locally: pnpm dev:design (port 3002).
export default defineNuxtConfig({
  extends: ['@symbol/ui'],
  compatibilityDate: '2026-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/gallery.css'],
  vite: { server: { fs: { strict: false } } },
  app: {
    head: {
      titleTemplate: '%s · Дизайн-система Символ',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }, { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
    },
  },
  nitro: { prerender: { crawlLinks: true, routes: ['/'] } },
})
