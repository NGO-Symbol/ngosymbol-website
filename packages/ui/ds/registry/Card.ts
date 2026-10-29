import { defineDs } from '../types'

export default defineDs({
  name: 'Card', title: 'Картка', category: 'content', status: 'stable',
  summary: 'Блок із власним тоном і тонкою рамкою: проєкт, факт, посилання. З to/href уся картка — одне посилання й підіймається при наведенні.',
  use: ['Групувати пов’язане на фоні сторінки.', 'Клікабельна картка-посилання (to / href).'],
  avoid: ['Картка в картці.', 'Клікабельна картка з кількома окремими посиланнями всередині.', 'Для проєкту краще SymProjectCard.'],
  examples: [{ file: 'Tones', title: 'Тони й посилання', description: 'Картка на різних тонах; друга — посилання.' }],
  playground: { props: { tone: { type: 'select', options: ['white', 'paper', 'lilac', 'violet', 'apricot', 'plum'], default: 'white' }, pad: { type: 'select', options: ['none', 'md', 'lg'], default: 'md' }, outline: { type: 'boolean', default: true }, href: { type: 'text', default: '' } } },
  states: [{ label: 'white', props: { tone: 'white' } }, { label: 'lilac', props: { tone: 'lilac' } }, { label: 'plum', props: { tone: 'plum' } }, { label: 'без рамки', props: { outline: false, tone: 'lilac' } }, { label: 'посилання', props: { href: '#' }, slot: 'Картка-посилання' }],
  a11y: ['Картка-посилання — один <a>: заголовок має бути змістовним текстом посилання.', 'Зовнішня — з прихованим «відкриється в новій вкладці».'], motion: ['Підйом 5 px: small; повернення при натисканні миттєве. Лише на пристроях з hover.'], tokens: ['--sym-shape-card', '--sym-pad-card', '--sym-rule'], related: ['Section', 'ProjectCard'],
})
