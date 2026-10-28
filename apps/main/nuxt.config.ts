// Set to true at launch to let search engines index the site (see open-questions.md).
const indexable = false

export default defineNuxtConfig({
  extends: ['@symbol/brand'],
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  css: ['@symbol/brand/tokens.css', '~/assets/css/main.css'],
  app: {
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
  nitro: {
    prerender: {
      crawlLinks: true
    }
  }
})
