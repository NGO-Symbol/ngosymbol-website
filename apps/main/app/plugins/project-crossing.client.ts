// Opening a project site (symbol.ngo/documentsart/…, {project}.symbol.ngo): the exhibition's paper rises over the page,
// then the project site opens with ?from=<this page>, so its «back to Symbol» returns exactly here (apps/documents
// utils/crossing.ts). Modified clicks and reduced motion open the link at once.
const isProjectSite = (url: URL) =>
  (url.hostname.endsWith('.symbol.ngo') && url.hostname !== 'www.symbol.ngo') ||
  (url.hostname === 'symbol.ngo' && url.pathname.startsWith('/documentsart'))

export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!link) return
    const url = new URL(link.href, location.href)
    if (!isProjectSite(url)) return
    url.searchParams.set('from', location.pathname + location.search)
    event.preventDefault()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { location.href = url.href; return }
    document.documentElement.dataset.cross = 'leave'
    // Phones: a quicker curtain (about 0.4 s in all with the arrival), USER_CONFIRMED 2026-10-30.
    setTimeout(() => { location.href = url.href }, matchMedia('(max-width: 820px)').matches ? 300 : 560)
  })
})
