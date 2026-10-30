// Crossing between symbol.ngo and the project site. symbol.ngo opens the project site with ?from=<its page>; the head
// script in app.vue keeps that page for the session, so «back to Symbol» returns exactly where the visitor left.
// Leaving plays the violet curtain, then symbol.ngo opens with ?via=project and lifts the curtain on its side.

const fromKey = 'docs-from'

/** The symbol.ngo page to return to: the one the visitor came from, else the home page in the current language. */
export function returnUrl(isEn: boolean) {
  let from: string | null = null
  try { from = sessionStorage.getItem(fromKey) } catch {}
  const url = new URL(from && /^\/(?!\/)/.test(from) ? from : isEn ? '/en' : '/', SYMBOL)
  url.searchParams.set('via', 'project')
  return url.href
}

/** Plays the leaving curtain before going back to symbol.ngo; a plain click without it when motion is reduced. */
export function leaveTo(event: MouseEvent, href: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  event.preventDefault()
  document.documentElement.dataset.cross = 'leave'
  setTimeout(() => { location.href = href }, matchMedia('(max-width: 820px)').matches ? 300 : 560)
}
