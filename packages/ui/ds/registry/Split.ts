import { defineDs } from '../types'

export default defineDs({
  name: 'Split', title: 'Дві колонки', category: 'layout', status: 'stable',
  summary: 'Дві колонки, що складаються в одну, коли контейнер вузький. Основа розкладок «підпис + текст», «текст + зображення», «заголовок + вступ».',
  use: ['Текст поруч із фото чи орбітою.', 'ratio="aside" для бокового підпису (факти проєкту) з sticky.', 'reverse, щоб на телефоні зображення було над текстом.'],
  avoid: ['Більше двох колонок — SymGrid.', 'Вкладати Split у Split без потреби.'],
  examples: [{ file: 'Ratios', title: 'Пропорції', description: '1:1, 5:7 і aside. Зменшіть ширину сцени: колонки складаються.' }],
  playground: { props: { ratio: { type: 'select', options: ['1:1', '1:2', '2:1', '5:7', '7:5', 'aside'], default: '5:7' }, stackBelow: { type: 'select', options: ['600', '760', '900'], default: '760' }, gap: { type: 'select', options: ['s', 'm', 'l', 'xl'], default: 'xl' }, align: { type: 'select', options: ['start', 'center', 'end'], default: 'start' }, reverse: { type: 'boolean' }, sticky: { type: 'boolean' } } },
  tokens: ['--sym-space-*'], related: ['Grid', 'Stack'],
})
