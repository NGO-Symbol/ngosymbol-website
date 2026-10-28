import type { Ref } from 'vue'

/**
 * Marks a horizontally scrolling row with `data-more-start` / `data-more-end` while content hides past that edge, so the
 * `.sym-hscroll` utility (base.css) fades that edge: the hint that the row scrolls (phones: filter chips, tabs).
 */
export function useScrollEdges(el: Ref<HTMLElement | null | undefined>) {
  let ro: ResizeObserver | undefined
  function update() {
    const e = el.value
    if (!e) return
    const max = e.scrollWidth - e.clientWidth
    const x = Math.abs(e.scrollLeft) // RTL scrolls negative
    e.toggleAttribute('data-more-start', max > 1 && x > 1)
    e.toggleAttribute('data-more-end', max > 1 && x < max - 1)
  }
  onMounted(() => {
    const e = el.value
    if (!e) return
    e.addEventListener('scroll', update, { passive: true })
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(update); ro.observe(e); for (const c of e.children) ro.observe(c) }
    update()
  })
  onBeforeUnmount(() => { el.value?.removeEventListener('scroll', update); ro?.disconnect() })
  return { update }
}
