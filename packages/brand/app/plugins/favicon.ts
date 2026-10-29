// Tab icon and home-screen icons, linked with the app's base path (the gallery lives under /design/).
export default defineNuxtPlugin(() => {
  const base = useRuntimeConfig().app.baseURL.replace(/\/?$/, '/')
  useHead({
    link: [
      { rel: 'icon', href: `${base}favicon.ico`, sizes: '32x32' },
      { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` },
      { rel: 'manifest', href: `${base}site.webmanifest` },
    ],
    meta: [{ name: 'theme-color', content: '#9280a6' }],
  })
})
