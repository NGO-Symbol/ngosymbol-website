// Scroll reveal: blocks rise into place as they enter the viewport, siblings one after another.
// Content stays visible without JavaScript (the hidden state needs html.reveal-ready).
const selector = [
  '.section-heading',
  '.project-card',
  '.event-row',
  '.person-card',
  '.values > div',
  '.support-option',
  '.year-block__title',
  '.credits__group',
  '.program-logo',
  '.press-list li',
  '.appearances li',
  '.logo-strip li',
  '.team-list > *',
  '.news-item',
  '.archive-call',
  '.press-asset',
  '.en-projects li',
  '.partners li',
  '.stat',
  '.gallery__item',
  '.cv__section',
  '.facts > div',
  '.label'
].join(',')

export default defineNuxtPlugin((nuxtApp) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.documentElement.classList.add('reveal-ready')

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -8% 0px' })

  const scan = () => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if ('reveal' in el.dataset) return
      el.dataset.reveal = ''
      const siblings = el.parentElement ? [...el.parentElement.children] : []
      el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 6) * 70}ms`)
      observer.observe(el)
    })
  }

  nuxtApp.hook('app:mounted', () => { requestAnimationFrame(scan) })
  nuxtApp.hook('page:finish', () => { requestAnimationFrame(scan) })
})
