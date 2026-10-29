import { defineDs } from '../types'

export default defineDs({
  name: 'Tag',
  title: 'Тег',
  category: 'text',
  status: 'stable',
  summary: 'Неінтерактивна «пілюля» для категорії, напряму чи статусу проєкту. Статус завжди має маркер і слово.',
  use: ['Статус проєкту: Запуск, Триває, Завершено, Заплановано.', 'Напрям чи формат у ряду фактів або на картці.', 'tone, щоб виділити тег заливкою (тон має відрізнятися від тла секції).'],
  avoid: ['Клікабельний фільтр — SymChip.', 'Колір як єдина ознака: слово завжди видиме.', 'Довгі фрази: тег — одне-два слова.'],
  examples: [
    { file: 'Statuses', title: 'Статуси', description: 'Маркери різняться формою: кільце, крапка з обідком, крапка, галочка.' },
    { file: 'Tones', title: 'Теги із заливкою', description: 'tone заповнює тег кольорами тону; працює на будь-якому тлі, якщо тон інший.' },
  ],
  playground: { props: { status: { type: 'select', options: ['launching', 'ongoing', 'completed', 'planned'], default: 'ongoing' }, tone: { type: 'select', options: ['inherit', 'paper', 'white', 'lilac', 'violet', 'apricot', 'plum'], default: 'inherit' } } },
  states: [
    { label: 'launching', props: { status: 'launching' } }, { label: 'ongoing', props: { status: 'ongoing' } }, { label: 'completed', props: { status: 'completed' } }, { label: 'planned', props: { status: 'planned' } },
    { label: 'без статусу', props: {}, slot: 'Кіно' }, { label: 'tone plum', props: { tone: 'plum' }, slot: 'Мистецтво' },
  ],
  keyboard: [],
  a11y: ['Не в порядку табуляції: тег лише інформує.', 'Статус = маркер певної форми + слово, а не тільки колір.', 'Контраст пари тло/текст береться з тону.'],
  motion: ['Немає.'],
  tokens: ['--sym-shape-chip', '--sym-rule-width', '--sym-text-label', '--sym-fg / --sym-bg'],
  related: ['Chip', 'MetaList'],
})
