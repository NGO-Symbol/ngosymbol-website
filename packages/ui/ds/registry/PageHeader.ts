import { defineDs } from '../types'

export default defineDs({
  name: 'PageHeader',
  title: 'Заголовок сторінки',
  category: 'text',
  status: 'stable',
  summary: 'Верхній блок сторінки: мітка, єдиний h1 у display-кеглі, вступ, головні дії та ряд фактів.',
  use: ['Початок кожної сторінки одразу під шапкою сайту: головна, «Проєкти», «Про нас».', 'size xl для головної та великих розділів, lg для внутрішніх сторінок.', 'Слот actions для головної дії сторінки, meta для ряду фактів чи тегів.'],
  avoid: ['Заголовок секції в середині сторінки — SymSectionHeading (не другий h1).', 'Герой із зображенням на весь екран: збирайте зі SymSection, SymMedia та SymHeading.', 'Кілька solid-кнопок у actions: одна головна дія.'],
  examples: [
    { file: 'Hero', title: 'Великий (xl)', description: 'display-xl, вступ ліворуч і дії праворуч, вирівняні за низом.' },
    { file: 'Inner', title: 'Внутрішня сторінка (lg)', description: 'Менший заголовок і ряд фактів у meta.' },
  ],
  playground: { props: { eyebrow: { type: 'text', default: 'Культура · мистецтво' }, title: { type: 'text', default: 'Простір для уважності' }, lead: { type: 'text', default: 'Один-два речення про те, що це за сторінка.' }, size: { type: 'select', options: ['xl', 'lg'], default: 'xl' }, flush: { type: 'boolean' } } },
  keyboard: [],
  a11y: ['Рендерить єдиний h1 сторінки. Не використовуйте його двічі.', 'Вступ у власному елементі, не частина заголовка.', 'Довгі слова не переносяться дефісом, але ламаються у крайньому разі: переповнення на 320 px немає.'],
  motion: ['Немає власного руху; для вступної появи заголовка оберніть у SymReveal.'],
  tokens: ['--sym-text-display-xl', '--sym-text-display', '--sym-space-2xl', '--sym-space-xl', '--sym-text-lead'],
  related: ['SectionHeading', 'Heading', 'Text', 'Button'],
})
