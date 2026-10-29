// Touch feedback in the Symbol identity (phones and tablets only). Every tap leaves a short mark at the finger,
// and the mark depends on what was tapped:
//   project, person, photo     → an orbit ring opens with a satellite running round it;
//   links, buttons, navigation → the «С» spiral draws itself like a stroke of the pen;
//   anywhere else              → a quiet apricot drop.
const spiral = 'm 0,0 c -3.277,-13.422 -16.78,-31.687 -42.029,-31.687 -27.447,0 -43.361,22.394 -43.361,43.36 0,25.125 16.083,39.034 31.667,41.801 14.787,2.626 23.189,-1.961 26.798,-4.015 9.184,-5.228 13.941,-15.877 12.733,-26.908 -1.119,-10.211 -6.94,-20.145 -17.607,-25.1 l -11.192,11.192 11.192,11.192 5.722,-5.701 c 3.067,1.078 5.105,2.162 5.511,3.391 2.438,7.4 -6.48,22.258 -20.278,22.258 -11.026,0 -24.954,-8.416 -24.929,-28.235 0.017,-12.91 10.864,-26.126 27.865,-25.685 22.291,0.579 39.24,25.81 29.948,52.628 0,0 13.647,-15.197 7.96,-38.491 z'
const markPath = `<path transform="matrix(1.333333 0 0 -1.333333 145.1133 104.1613)" d="${spiral}"/>`

const shapes = {
  orbit: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="tap-mark__ring" cx="50" cy="50" r="40"/><circle class="tap-mark__moon" cx="50" cy="10" r="6"/></svg>',
  spiral: `<svg viewBox="0 0 178 178" aria-hidden="true">${markPath}</svg>`,
  drop: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40"/></svg>'
}
type Kind = keyof typeof shapes

function kindOf(target: Element | null): Kind {
  if (target?.closest('.project-card, .person-card, .partner, .gallery__item, .event-row, figure, img')) return 'orbit'
  if (target?.closest('a, button, [role="button"], [role="option"], label, summary')) return 'spiral'
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
