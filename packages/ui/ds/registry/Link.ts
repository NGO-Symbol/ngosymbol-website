import { defineDs } from '../types'

export default defineDs({
  name: 'Link', title: 'Посилання', category: 'actions', status: 'stable',
  summary: 'Посилання в тексті чи списку: підкреслене, бере колір навколишнього тексту. Зовнішні сайти відкриваються в новій вкладці зі стрілкою.',
  use: ['Посилання всередині абзацу чи списку.', 'arrow="forward" для переходу на іншу сторінку.'],
  avoid: ['Самостійна дія — SymButton.', 'quiet для основного тексту: посилання має виглядати посиланням.'],
  examples: [{ file: 'InText', title: 'У тексті', description: 'Внутрішнє, на піддомен symbol.ngo (та сама вкладка) і зовнішнє (нова вкладка, стрілка).' }],
  playground: { props: { arrow: { type: 'select', options: ['none', 'forward'], default: 'none' }, quiet: { type: 'boolean' }, href: { type: 'text', default: '#' } }, slot: 'Усі проєкти' },
  a11y: ['Зовнішнє посилання отримує приховане «(відкриється в новій вкладці)».', 'Колір — завжди колір тексту тону, підкреслення — другий сигнал.'], motion: ['Товщина підкреслення: small. Стрілка: micro.'], tokens: ['--sym-link', '--sym-t-small'], related: ['Button'],
})
