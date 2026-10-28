import { defineDs } from '../types'

export default defineDs({
  name: 'Grid', title: 'Сітка', category: 'layout', status: 'stable',
  summary: 'Сітка рівних комірок. Сама добирає кількість колонок за мінімальною шириною або тримає фіксовані колонки, що згортаються за шириною контейнера.',
  use: ['Картки проєктів, команда, факти (min="280").', 'cols="3" з phoneCols, коли потрібна передбачувана кількість колонок.'],
  avoid: ['Діти зі своєю шириною чи margin.', 'Двоколонкова розкладка «текст + фото» — SymSplit.'],
  examples: [{ file: 'AutoFit', title: 'Самонастройна сітка', description: 'Скільки колонок влізе при мінімальній ширині комірки.' }, { file: 'Fixed', title: 'Фіксовані колонки', description: '3 колонки ≥ 840 px, 2 колонки 600–839, 1 нижче. Вимірюється за самою сіткою.' }],
  playground: { props: { min: { type: 'select', options: ['160', '200', '240', '280', '320', '400'], default: '240' }, gap: { type: 'select', options: ['s', 'm', 'grid', 'l'], default: 'grid' } } },
  tokens: ['--sym-gap-grid'], related: ['Stack', 'Split'],
})
