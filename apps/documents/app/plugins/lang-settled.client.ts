// Once the page has hydrated, the error page may switch to the language of the address (see composables/useLang.ts).
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => { nuxtApp.runWithContext(() => { useState('lang-settled').value = true }) })
})
