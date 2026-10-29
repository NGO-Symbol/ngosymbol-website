import { defineDs } from '../types'

export default defineDs({
  name: 'Icon', title: 'Іконка', category: 'actions', status: 'stable',
  summary: 'Єдине джерело іконок: намальовані вручну штрихові значки 24 px, що беруть колір тексту. Без шрифту й запитів.',
  use: ['Стрілка в кнопці чи посиланні, соцмережі, дія в шапці.', 'Передавайте label, коли іконка одна несе зміст.'],
  avoid: ['Інлайнові SVG на сторінках: нову іконку додають у Icon.vue.', 'Іконка як єдиний носій значення без тексту.'],
  examples: [{ file: 'All', title: 'Усі іконки', description: 'Ім’я — це значення name.' }],
  playground: { props: { name: { type: 'select', options: ['arrow-right', 'arrow-up-right', 'menu', 'close', 'plus', 'mail', 'instagram'], default: 'arrow-right' }, size: { type: 'number', default: 32 } } },
  a11y: ['Без label іконка прихована від скрінрідерів (aria-hidden).'], tokens: ['currentColor'], related: ['Button', 'IconButton'],
})
