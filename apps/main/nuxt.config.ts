export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  css: ['@symbol/brand/tokens.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      titleTemplate: '%s · ГО «Символ»',
      meta: [
        { name: 'description', content: 'Незалежна українська організація, що розвиває сучасну культуру і мистецтво та сприяє уважному ставленню до психічного здоров’я.' },
        { name: 'theme-color', content: '#9280A6' }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/events.ics']
    }
  }
})
