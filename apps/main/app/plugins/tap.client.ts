// Phones: a short, element-specific animation answers every tap (styles: `.is-tapped` in assets/css/main.css).
// `:active` alone is too brief to see on a quick tap, so the class stays until the animation has played.
const TAPPABLE = [
  '.button', '.project-card', '.event-row', '.news-item', '.person-card', '.partner', '.reel__photo',
  '.reel__arrow', '.theme-toggle', '.search-toggle', '.to-top', '.site-header nav a', '.nav-support',
  '.text-link', '.social-link', '.footer-icon-link', '.subscribe__links a', '.segmented button'
].join(', ')

export default defineNuxtPlugin(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') return
    const el = (event.target as Element | null)?.closest<HTMLElement>(TAPPABLE)
    if (!el) return
    el.classList.remove('is-tapped')
    void el.offsetWidth
    el.classList.add('is-tapped')
    window.setTimeout(() => el.classList.remove('is-tapped'), 700)
  }, { passive: true })
})
