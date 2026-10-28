import type { Ref } from 'vue'

/** True while the element is (near) the viewport. Used to pause ambient animation off screen. Starts true so SSR output is the "running" state. */
export function useInView(el: Ref<HTMLElement | null | undefined>, margin = '120px') {
  const inView = ref(true)
  let io: IntersectionObserver | undefined
  onMounted(() => {
    if (!el.value || typeof IntersectionObserver === 'undefined') return
    io = new IntersectionObserver(([e]) => { inView.value = !!e?.isIntersecting }, { rootMargin: margin })
    io.observe(el.value)
  })
  onBeforeUnmount(() => io?.disconnect())
  return inView
}
