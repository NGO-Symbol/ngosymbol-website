import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Project site of the exhibition «Покажіть свої документи…» (documentsart.symbol.ngo), in the project's own identity.
// Texts, people, events and photographs come from the main site's data and media (one source of truth), so the
// project site and symbol.ngo never disagree. Only the curatorial concept and the work descriptions of the original
// site live here (app/data).
const main = (path: string) => fileURLToPath(new URL(`../main/${path}`, import.meta.url))
const eventMedia = readdirSync(main('public/media/events'))
  .filter(dir => dir.startsWith('pokazhit-svoi-dokumenty'))
  .map(dir => ({ dir: main(`public/media/events/${dir}`), baseURL: `/media/events/${dir}` }))

// Set to true at launch to let search engines index the site (see open-questions.md).
const indexable = false

export default defineNuxtConfig({
  extends: ['@symbol/brand'],
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  alias: { '#symbol': main('app/data') },
  css: ['@symbol/brand/tokens.css', '~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'uk' },
      meta: [
        ...(indexable ? [] : [{ name: 'robots', content: 'noindex, nofollow' }]),
        { name: 'description', content: 'Виставка «Покажіть свої документи…»: документ як мистецький феномен. 20 митців, ЄрміловЦентр, Харків, 17.10–07.12.2025. Проєкт ГО «Символ».' },
        { name: 'theme-color', content: '#e8e8e5' }
      ]
    }
  },
  nitro: {
    publicAssets: [
      { dir: main('public/fonts'), baseURL: '/fonts' },
      { dir: main('public/media/people'), baseURL: '/media/people' },
      { dir: main('public/media/projects/pokazhit-svoi-dokumenty'), baseURL: '/media/projects/pokazhit-svoi-dokumenty' },
      ...eventMedia
    ],
    prerender: { crawlLinks: true }
  }
})
