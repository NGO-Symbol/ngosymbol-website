import { defineDs } from '../types'

export default defineDs({
  name: 'Cluster', title: 'Кластер', category: 'layout', status: 'stable',
  summary: 'Рядок елементів, що переноситься: кнопки, чипи, теги, мета-інформація. На телефоні може гортатися вбік.',
  use: ['Група кнопок (головна + друга).', 'Теги й мета-рядок картки.', 'scroll — один рядок чипів, що гортається на телефоні.'],
  avoid: ['Складна двоколонкова розкладка — SymSplit чи SymGrid.'],
  examples: [{ file: 'Wrap', title: 'Переніс і гортання', description: 'Звужуйте ширину сцени: перший рядок переноситься, другий (scroll) на телефоні гортається вбік із затіненим краєм.' }],
  playground: { props: { gap: { type: 'select', options: ['xs', 'inline', 's', 'm'], default: 'inline' }, justify: { type: 'select', options: ['start', 'center', 'end', 'between'], default: 'start' }, align: { type: 'select', options: ['center', 'start', 'end', 'baseline'], default: 'center' } } },
  tokens: ['--sym-gap-inline'], related: ['Stack', 'FilterBar'],
})
