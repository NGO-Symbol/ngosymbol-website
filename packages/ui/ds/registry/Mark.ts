import { defineDs } from '../types'

export default defineDs({
  name: 'Mark', title: 'Знак', category: 'brand', status: 'stable',
  summary: 'Офіційний знак «Символу» (оригінальне зображення логотипа). Ніколи не перефарбовуємо й не розтягуємо.',
  use: ['У шапці, футері й панелі проєкту поруч із назвою.'],
  avoid: ['Декор — SymOrbit.', 'Перефарбовувати, обрізати, змінювати пропорції.'],
  examples: [{ file: 'Sizes', title: 'Розміри' }],
  playground: { props: { size: { type: 'number', default: 64 }, label: { type: 'text', default: '' } } },
  a11y: ['Поруч із видимою назвою — порожній alt; сам по собі — label.'], tokens: ['@symbol/brand/symbol-mark.png'], related: ['Orbit', 'Wordmark'],
})
