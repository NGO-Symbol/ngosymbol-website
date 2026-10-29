// The router restores the address it was rendered with, so ?from= (kept by the head script in app.vue) is removed
// here once more after start-up.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const router = useRouter()
    const { from, ...query } = router.currentRoute.value.query
    if (from !== undefined) router.replace({ query, hash: router.currentRoute.value.hash })
  })
})
