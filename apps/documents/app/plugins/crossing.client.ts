// The router restores the address it was rendered with, so ?from= (kept by the head script in app.vue) is removed
// here once more after start-up.
// Every link from the project site to a page of symbol.ngo (team, curators, artists' profiles) crosses with the same
// violet curtain as «back to Symbol», and symbol.ngo lifts it on arrival (?via=project, utils/crossing.ts).
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const router = useRouter()
    const { from, ...query } = router.currentRoute.value.query
    if (from !== undefined) router.replace({ query, hash: router.currentRoute.value.hash })
  })

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!link || link.target === '_blank') return
    const url = new URL(link.href, location.href)
    if (url.origin !== new URL(SYMBOL).origin || url.pathname.startsWith('/documentsart')) return
    url.searchParams.set('via', 'project')
    leaveTo(event, url.href)
  })
})
