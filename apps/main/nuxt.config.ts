// Open to search engines since 2026-10-30 (USER_CONFIRMED); false puts `noindex, nofollow` on every page.
const indexable = true

export default defineNuxtConfig({
  extends: ['@symbol/brand'],
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  css: ['@symbol/brand/tokens.css', '~/assets/css/main.css', '~/assets/css/theme-documents.css'],
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'uk' },
      titleTemplate: '%s · ГО «Символ»',
      meta: [
        ...(indexable ? [] : [{ name: 'robots', content: 'noindex, nofollow' }]),
        { name: 'description', content: 'Незалежна українська організація, що розвиває сучасну культуру і мистецтво та сприяє уважному ставленню до психічного здоров’я.' },
        { name: 'theme-color', content: '#9280A6' }
      ]
    }
  },
  hooks: {
    // English mirror: every Ukrainian page also lives under /en/... so the UA/EN switch keeps the visitor on
    // the same page (ADR-0009). /en itself is the English home page (pages/en.vue).
    'pages:extend'(pages) {
      const mirrored = pages.filter(page => page.path !== '/' && page.path !== '/en' && !page.path.startsWith('/en/'))
      for (const page of mirrored) pages.push({ ...page, name: `en-${String(page.name)}`, path: `/en${page.path}` })
    }
  },
  // Former page: Аліна Войтюк is Ганна Франик (one person).
  routeRules: { '/people/alina-voitiuk': { redirect: '/people/hanna-franyk' } },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/events.ics', '/sitemap.xml', '/people/alina-voitiuk']
    }
  }
})
