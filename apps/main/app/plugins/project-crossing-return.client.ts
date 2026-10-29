// The router restores the address it was rendered with, so ?via=project (handled by the head script in app.vue) is
// removed here once more after start-up.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const router = useRouter()
    const { via, ...query } = router.currentRoute.value.query
    if (via !== undefined) router.replace({ query, hash: router.currentRoute.value.hash })
  })
})
