import { defineDs } from '../types'

export default defineDs({
  name: 'MetaList',
  title: 'Список фактів',
  category: 'text',
  status: 'stable',
  summary: 'Факти про проєкт чи подію у вигляді переліку «назва — значення» з тонкою лінією над кожною парою.',
  use: ['Картка фактів на сторінці проєкту: період, статус, напрям, географія.', 'Деталі події: дата, місце, формат.', 'Слот value, коли значення — посилання або тег.'],
  avoid: ['Довгий опис — SymProse.', 'Таблиця з багатьма колонками.', 'Числа з джерелом — SymStat.'],
  examples: [
    { file: 'Basic', title: 'Два стовпці', description: 'На широкому контейнері факти в два стовпці, на вузькому — в один.' },
    { file: 'CustomValue', title: 'Значення з тегом і посиланням', description: 'Слот value дозволяє вставити компонент.' },
  ],
  playground: { props: { cols: { type: 'select', options: [2, 1], default: 2 } }, fixed: { items: [{ label: 'Період', value: '2024–2025 (приклад)' }, { label: 'Напрям', value: 'Мистецтво' }, { label: 'Місце', value: 'Харків' }, { label: 'Формат', value: 'Серія зустрічей' }] } },
  keyboard: [],
  a11y: ['Справжній dl/dt/dd: скрінрідер оголошує пари.', 'Порядок у DOM — «назва, значення».', 'Значення не лише в кольорі: статус поєднуйте з текстом (SymTag).'],
  motion: ['Немає.'],
  tokens: ['--sym-rule', '--sym-text-title', '--sym-text-label', '--sym-fg-muted', '--sym-space-l'],
  related: ['Tag', 'Stat', 'Split'],
})
