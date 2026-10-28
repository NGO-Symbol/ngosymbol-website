import { defineDs } from '../types'

export default defineDs({
  name: 'Heading', title: 'Заголовок', category: 'text', status: 'stable',
  summary: 'Заголовок: рівень (h1–h6) задає структуру, size — вигляд. Дисплейні розміри — серифні, балансуються й не переносять слів.',
  use: ['Один h1 на сторінку; решта за структурою.', 'size="display" для заголовків секцій, "title-lg" для карток.'],
  avoid: ['Обирати h-рівень за розміром: структура й вигляд незалежні.', 'font-size на сторінці.'],
  examples: [{ file: 'Sizes', title: 'Шість розмірів', description: 'Від герой-заголовка до малого. Розмір плавно росте з шириною вікна.' }, { file: 'LongWords', title: 'Довгі слова', description: 'На 320 px довгі українські слова не виходять за екран.' }],
  playground: { props: { level: { type: 'select', options: [1, 2, 3, 4, 5, 6], default: 2 }, size: { type: 'select', options: ['display-xl', 'display', 'headline-lg', 'headline', 'title-lg', 'title'], default: 'headline-lg' }, muted: { type: 'boolean' } }, slot: 'Культура в русі' },
  a11y: ['Не пропускайте рівні (h2 → h4).', 'text-wrap: balance робить рядки рівними.'], tokens: ['--sym-text-*', '--sym-font-display', '--sym-fg-large'], related: ['Text', 'Eyebrow', 'SectionHeading'],
})
