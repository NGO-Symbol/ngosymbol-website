import { defineDs } from '../types'

export default defineDs({
  name: 'Eyebrow', title: 'Надзаголовок', category: 'text', status: 'stable',
  summary: 'Маленька велика-літерна мітка над заголовком чи в картці: категорія, рубрика, номер «01».',
  use: ['Одна мітка над заголовком секції чи сторінки.', 'index="01" для редакційної нумерації.'],
  avoid: ['Речення чи абзац: мітка коротка (1–4 слова).', 'Дві мітки поспіль.'],
  examples: [{ file: 'Variants', title: 'Звичайна й з номером' }],
  playground: { props: { index: { type: 'text', default: '' } }, slot: 'Культура · мистецтво' },
  tokens: ['--sym-text-label', '--sym-fg-muted'], related: ['Heading', 'SectionHeading'],
})
