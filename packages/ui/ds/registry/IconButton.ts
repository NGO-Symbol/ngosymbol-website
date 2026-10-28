import { defineDs } from '../types'

export default defineDs({
  name: 'IconButton',
  title: 'Кнопка-іконка',
  category: 'navigation',
  status: 'stable',
  summary: 'Кругла кнопка без тексту: меню, закрити, назад, соцмережі. Текстова назва обов’язкова.',
  use: ['Відкрити чи закрити панель (меню), «назад», закрити.', 'Ряд соцмереж: кожна з назвою в label.', 'Дія, значення якої очевидне з іконки й контексту.'],
  avoid: ['Дія зі словами («Написати нам») — SymButton.', 'Посилання в тексті — SymLink.', 'Перемикання вибору (фільтр) — SymChip.', 'Іконка без label: екранний читач нічого не скаже.'],
  examples: [
    { file: 'Variants', title: 'Варіанти й розміри', description: 'plain — лише іконка; outline — з кільцем, заливається при наведенні; l — 56 px для головних дій на телефоні.' },
    { file: 'Social', title: 'Соцмережі', description: 'Кожне посилання має назву; зовнішні відкриваються в новій вкладці.' },
  ],
  playground: { props: { icon: { type: 'select', options: ['menu', 'close', 'arrow-left', 'arrow-right', 'plus', 'download', 'instagram', 'telegram'], default: 'menu' }, label: { type: 'text', default: 'Відкрити меню' }, size: { type: 'select', options: ['m', 'l'], default: 'm' }, variant: { type: 'select', options: ['plain', 'outline'], default: 'outline' }, disabled: { type: 'boolean' } } },
  states: [
    { label: 'plain', props: { icon: 'menu', label: 'Меню' } }, { label: 'outline', props: { icon: 'menu', label: 'Меню', variant: 'outline' } },
    { label: 'розмір l', props: { icon: 'close', label: 'Закрити', variant: 'outline', size: 'l' } }, { label: 'зовнішнє посилання', props: { icon: 'telegram', label: 'Телеграм', href: 'https://t.me/', variant: 'outline' } },
    { label: 'disabled', props: { icon: 'menu', label: 'Меню', variant: 'outline', disabled: true } },
  ],
  keyboard: [{ keys: 'Tab', action: 'Фокус на кнопку (видиме кільце).' }, { keys: 'Enter / Space', action: 'Натиснути (для посилання лише Enter).' }],
  a11y: ['label обов’язковий: це aria-label і підказка (title).', 'Для зовнішнього посилання до назви додається «(відкриється в новій вкладці)».', 'Для стану (відкрито/закрито) додайте aria-expanded: атрибути проходять на кнопку.', 'Мінімум 44 px по обох осях.'],
  motion: ['Заливка й колір: fx-small. Натискання: scale миттєво, повернення small (при reduced motion без зміни розміру).'],
  tokens: ['--sym-fg / --sym-bg (тон)', '--sym-size-touch', '--sym-radius-pill', '--sym-t-fx-small', '--sym-t-small', '--sym-state-hover'],
  related: ['Button', 'Chip', 'SiteHeader'],
})
