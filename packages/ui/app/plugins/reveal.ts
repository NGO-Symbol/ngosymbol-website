// v-reveal: content is visible in the HTML (no JS, crawlers, print); on the client, what is below the fold is hidden and then
// revealed once when it scrolls into view. Elements revealed in the same frame stagger by --sym-i (max 6 steps in CSS).
// Safety net: an element that a fast scroll jumped past (the observer never saw it) is revealed by a position check, so nothing stays hidden.
// Handbook «motion» → Scroll reveal. Directive value: { kind?: 'rise' | 'fade' | 'wipe' } or a kind string.
type Kind = 'rise' | 'fade' | 'wipe'
const pending = new Set<HTMLElement>()
let io: IntersectionObserver | undefined
let ticking = false

function show(el: HTMLElement, i: number) {
  el.style.setProperty('--sym-i', String(i))
  el.setAttribute('data-reveal', 'shown')
  pending.delete(el)
  io?.unobserve(el)
}

function sweep() {
  ticking = false
  const batch = new Map<Element | null, number>()
  for (const el of [...pending]) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
      const parent = el.parentElement
      const i = batch.get(parent) ?? 0
      batch.set(parent, i + 1)
      show(el, i)
    }
  }
}
function onScroll() { if (!ticking && pending.size) { ticking = true; requestAnimationFrame(sweep) } }

function observer() {
  if (io) return io
  io = new IntersectionObserver((entries) => {
    const batch = new Map<Element | null, number>()
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const parent = e.target.parentElement
      const i = batch.get(parent) ?? 0
      batch.set(parent, i + 1)
      show(e.target as HTMLElement, i)
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  return io
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      const v = binding.value
      const kind: Kind = typeof v === 'string' ? v as Kind : v?.kind ?? 'rise'
      el.setAttribute('data-reveal-kind', kind)
      const r = el.getBoundingClientRect()
      // already on screen (or above it) when the page appears: leave it alone (no flash, no delay of the first paint)
      if (r.top < window.innerHeight * 0.94) { el.setAttribute('data-reveal', 'shown'); return }
      el.setAttribute('data-reveal', 'hidden')
      pending.add(el)
      observer().observe(el)
    },
    unmounted(el: HTMLElement) { pending.delete(el); io?.unobserve(el) },
  })
})
