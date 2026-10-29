// Touch feedback in the Symbol identity (phones and tablets only). Every tap leaves a short mark at the finger,
// and the mark depends on what was tapped:
//   project, person, photo     → an orbit ring opens with a satellite running round it;
//   everything else            → a quiet apricot drop.
const shapes = {
  orbit: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="tap-mark__ring" cx="50" cy="50" r="40"/><circle class="tap-mark__moon" cx="50" cy="10" r="6"/></svg>',
  drop: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40"/></svg>'
}
type Kind = keyof typeof shapes

function kindOf(target: Element | null): Kind {
  if (target?.closest('.project-card, .person-card, .partner, .gallery__item, .event-row, figure, img')) return 'orbit'
  return 'drop'
}

export default defineNuxtPlugin(() => {
  if (!matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.documentElement.classList.add('tap-marks')
  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return
    const kind = kindOf(event.target as Element)
    const mark = document.createElement('span')
    mark.className = `tap-mark tap-mark--${kind}`
    mark.style.left = `${event.clientX}px`
    mark.style.top = `${event.clientY}px`
    mark.innerHTML = shapes[kind]
    document.body.appendChild(mark)
    // The mark and its parts animate separately, so it is removed after the longest of them.
    window.setTimeout(() => mark.remove(), 1050)
  }, { passive: true })
})
