/** True once the page has scrolled past `offset` px (header condenses). Uses a sentinel observer, not a scroll listener. */
export function useScrolled(offset = 8) {
  const scrolled = ref(false)
  let io: IntersectionObserver | undefined
  let sentinel: HTMLElement | undefined
  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return
    sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText = `position:absolute;top:0;left:0;width:1px;height:${offset}px;pointer-events:none;visibility:hidden`
    document.body.prepend(sentinel)
    io = new IntersectionObserver(([e]) => { scrolled.value = !e?.isIntersecting })
    io.observe(sentinel)
  })
  onBeforeUnmount(() => { io?.disconnect(); sentinel?.remove() })
  return scrolled
}
