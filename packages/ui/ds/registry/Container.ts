import { defineDs } from '../types'

export default defineDs({
  name: 'Container', title: 'Контейнер', category: 'layout', status: 'stable',
  summary: 'Центрує вміст і тримає плавні бічні поля сторінки. Кожен блок сторінки лежить у контейнері.',
  use: ['Обгортка вмісту всередині SymSection (додається автоматично).', 'size="narrow" для сторінок в одну колонку, "prose" для довгого тексту, "wide" для широких медіа-смуг.'],
  avoid: ['Вкладати контейнер у контейнер.', 'Писати власний max-width чи padding на сторінці.'],
  examples: [{ file: 'Sizes', title: 'Чотири ширини', description: 'page 1180 px, wide 1440, narrow 760, prose 66 символів. На телефоні всі займають екран мінус поля.' }],
  playground: { props: { size: { type: 'select', options: ['page', 'wide', 'narrow', 'prose'], default: 'page' } } },
  a11y: ['Нейтральний контейнер без ролі: структуру задають секції й заголовки.'], tokens: ['--sym-page-margin', '--sym-width-page / -wide / -narrow / -prose'], related: ['Section', 'Stack'],
})
