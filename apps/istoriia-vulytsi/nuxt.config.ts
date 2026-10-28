// Set to true at launch to let search engines index the site (see open-questions.md).
const indexable = false

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  css: ['@symbol/brand/tokens.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      titleTemplate: '%s · Історія моєї вулиці',
      meta: [
        ...(indexable ? [] : [{ name: 'robots', content: 'noindex, nofollow' }]),
        { name: 'description', content: 'Проєкт ГО «Символ» про вулиці та міську пам’ять Харкова.' },
        { name: 'theme-color', content: '#FDD08F' }
      ]
    }
  },
  nitro: { prerender: { crawlLinks: true } }
})
