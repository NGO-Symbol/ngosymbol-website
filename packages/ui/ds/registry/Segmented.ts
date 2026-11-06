import { defineDs } from '../types'

export default defineDs({
  name: 'Segmented',
  title: 'Перемикач',
  category: 'actions',
  status: 'stable',
  summary: 'Пілюля з рівних варіантів і бігунцем, що їде до обраного. З двома варіантами натискання будь-де перемикає на інший, цілитися не треба.',
  use: ['Мова сайту: одне посилання на іншу мову (to).', 'Вигляд однієї сторінки: список чи календар (v-model).', 'Вкладки з панелями (tabs).'],
  avoid: ['Фільтри, що поєднуються між собою: SymChip / SymFilterBar.', 'Перехід між розділами сайту: навігація шапки.', 'Більше чотирьох варіантів або довгі підписи на телефоні: SymFilterBar чи випадний список.'],
  examples: [
    { file: 'Views', title: 'Вигляд сторінки', description: 'Натисніть будь-де: варіант перемикається, бігунець їде.' },
    { file: 'Sizes', title: 'Розміри', description: 's для шапки, m поруч із кнопками й селектами, l для вибору, якому присвячено секцію.' },
  ],
  playground: { props: { size: { type: 'select', options: ['s', 'm', 'l'], default: 'm' }, tabs: { type: 'boolean' } }, fixed: { label: 'Вигляд', modelValue: 'list', options: [{ value: 'list', label: 'Список' }, { value: 'calendar', label: 'Календар' }] } },
  keyboard: [{ keys: 'Tab', action: 'Фокус на варіант (на посилання, коли задано to).' }, { keys: 'Enter / Space', action: 'Обрати варіант; на вже обраному з двох перемикає на інший.' }],
  a11y: ['Група кнопок оголошує aria-pressed; з tabs це tablist, tab і aria-selected.', 'Режим to: одне посилання, його назву задає label, підписи приховані від читача екрана.', 'Розмір s має зону натискання 44 px; обраний стан це заливка, а не лише колір тексту.'],
  motion: ['Бігунець: translate, medium (множиться на налаштування зменшеного руху). Колір тексту: fx-small.'],
  tokens: ['--sym-fg / --sym-bg (тон)', '--sym-control-s / -m / -l', '--sym-shape-chip', '--sym-size-touch', '--sym-t-medium', '--sym-t-fx-small'],
  related: ['Chip', 'FilterBar', 'Button'],
})
