import { defineDs } from '../types'

export default defineDs({
  name: 'Section', title: 'Секція', category: 'layout', status: 'stable',
  summary: 'Смуга сторінки на всю ширину з власним тоном: фон, текст, лінії, посилання й кнопки всередині підлаштовуються самі.',
  use: ['Кожен змістовний блок сторінки: герой, добірка, заява, футер-заклик.', 'Чергувати тони (paper → violet → paper → plum), щоб задати ритм сторінки.', 'Орбіти кладіть у слот #decor разом із clip: вони прив’язані до смуги й лежать позаду вмісту.'],
  avoid: ['Писати фон чи колір на сторінці: тільки tone.', 'Секція в секції: для групи всередині користуйтеся SymStack/SymCard.'],
  examples: [{ file: 'Tones', title: 'Шість тонів', description: 'Один і той самий вміст на кожному тоні: контраст, кнопки й лінії змінюються разом.', stage: false }, { file: 'OrbitBand', title: 'Смуга з орбітою', description: 'clip обрізає орбіту по краю смуги.', stage: false }],
  playground: { props: { tone: { type: 'select', options: ['paper', 'white', 'lilac', 'violet', 'apricot', 'plum'], default: 'violet' }, space: { type: 'select', options: ['none', 'sm', 'md', 'lg'], default: 'md' }, rule: { type: 'select', options: ['top', 'bottom', 'both'] }, clip: { type: 'boolean' } } },
  a11y: ['Рендерить <section>; дайте aria-labelledby, якщо в ній є заголовок.'], motion: ['Власного руху немає: вміст з’являється через SymReveal.'], tokens: ['--sym-section-y', '--sym-bg / --sym-fg …', '--sym-rule'], related: ['Container', 'Card', 'Orbit'],
})
