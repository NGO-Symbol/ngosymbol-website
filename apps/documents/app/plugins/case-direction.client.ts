// Leafing between artists' files: remember whether the next file lies forward or back in the drawer, so the page
// transition (main.css, .case-turn-*) slides the right way.
export default defineNuxtPlugin(() => {
  const router = useRouter()
  const slugOf = (path: string) => path.match(/\/mytsi\/([^/]+)/)?.[1]
  router.beforeEach((to, from) => {
    const a = slugOf(from.path)
    const b = slugOf(to.path)
    if (!a || !b) return
    const order = exhibitionArtists.map(artist => artist.slug)
    document.documentElement.dataset.caseDir = order.indexOf(b) < order.indexOf(a) ? 'back' : 'forward'
  })
})
