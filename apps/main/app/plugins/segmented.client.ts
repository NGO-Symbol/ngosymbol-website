// Every segmented switch (.segmented: «Стати меценатом / Доєднатися до спільноти», «Список / Календар»…) gets a
// thumb that glides under the active button instead of the colour jumping from one button to the other.
function attach(group: HTMLElement) {
  if (group.querySelector(':scope > .segmented__thumb')) return
  const thumb = document.createElement('span')
  thumb.className = 'segmented__thumb'
  thumb.setAttribute('aria-hidden', 'true')
  group.prepend(thumb)
  group.classList.add('has-thumb')
  const place = () => {
    const active = group.querySelector<HTMLElement>('button.active')
    if (!active) { thumb.style.opacity = '0'; return }
    thumb.style.opacity = '1'
    thumb.style.width = `${active.offsetWidth}px`
    thumb.style.height = `${active.offsetHeight}px`
    thumb.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`
  }
  place()
  new MutationObserver(place).observe(group, { subtree: true, attributes: true, attributeFilter: ['class'] })
  new ResizeObserver(place).observe(group)
}

export default defineNuxtPlugin((nuxtApp) => {
  const scan = () => document.querySelectorAll<HTMLElement>('.segmented').forEach(attach)
  nuxtApp.hook('app:mounted', () => {
    scan()
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true })
  })
  nuxtApp.hook('page:finish', scan)
})
