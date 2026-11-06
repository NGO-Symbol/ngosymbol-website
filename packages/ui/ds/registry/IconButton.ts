import { defineDs } from '../types'

export default defineDs({
  name: 'IconButton',
  title: 'Кнопка-іконка',
  category: 'navigation',
  status: 'stable',
  summary: 'Кругла кнопка без тексту: меню, закрити, назад, соцмережі, пошук і перемикач теми. Текстова назва обов’язкова.',
  use: ['Відкрити чи закрити панель (меню), «назад», закрити.', 'Ряд соцмереж: кожна з назвою в label.', 'Дія, значення якої очевидне з іконки й контексту.'],
  avoid: ['Дія зі словами («Написати нам») — SymButton.', 'Посилання в тексті — SymLink.', 'Перемикання вибору (фільтр) — SymChip.', 'Іконка без label: екранний читач нічого не скаже.'],
  examples: [
    { file: 'Variants', title: 'Варіанти й розміри', description: 'plain — лише іконка; outline — з кільцем, заливається при наведенні; s — 36 px (з зоною натискання 44 px) для рядка керування в шапці поруч із SymSegmented s; l — 56 px для головних дій на телефоні.' },
    { file: 'Tools', title: 'Керування в шапці', description: 'Розмір s: пошук і перемикач теми (aria-pressed повертає іконку) в одному ряду з мовним перемикачем; burger — три смуги, що складаються в хрестик (open).' },
    { file: 'Social', title: 'Соцмережі', description: 'Кожне посилання має назву; зовнішні відкриваються в новій вкладці.' },
  ],
  playground: { props: { icon: { type: 'select', options: ['menu', 'close', 'arrow-left', 'arrow-right', 'plus', 'download', 'instagram', 'telegram', 'search', 'theme', 'burger'], default: 'menu' }, label: { type: 'text', default: 'Відкрити меню' }, size: { type: 'select', options: ['s', 'm', 'l'], default: 'm' }, variant: { type: 'select', options: ['plain', 'outline'], default: 'outline' }, disabled: { type: 'boolean' } } },
  states: [
    { label: 'plain', props: { icon: 'menu', label: 'Меню' } }, { label: 'outline', props: { icon: 'menu', label: 'Меню', variant: 'outline' } },
    { label: 'розмір s', props: { icon: 'search', label: 'Пошук', variant: 'outline', size: 's' } }, { label: 'burger відкритий', props: { icon: 'burger', label: 'Меню', open: true } },
    { label: 'розмір l', props: { icon: 'close', label: 'Закрити', variant: 'outline', size: 'l' } }, { label: 'зовнішнє посилання', props: { icon: 'telegram', label: 'Телеграм', href: 'https://t.me/', variant: 'outline' } },
    { label: 'disabled', props: { icon: 'menu', label: 'Меню', variant: 'outline', disabled: true } },
  ],
  keyboard: [{ keys: 'Tab', action: 'Фокус на кнопку (видиме кільце).' }, { keys: 'Enter / Space', action: 'Натиснути (для посилання лише Enter).' }],
  a11y: ['label обов’язковий: це aria-label і підказка (title).', 'Для зовнішнього посилання до назви додається «(відкриється в новій вкладці)».', 'Для стану (відкрито/закрито) додайте aria-expanded: атрибути проходять на кнопку.', 'Мінімум 44 px по обох осях: розмір s має невидиме кільце натискання 44 px навколо кола 36 px.', 'Перемикач (тема): додайте aria-pressed; назву лишайте незмінною за змістом або змінюйте разом зі станом.'],
  motion: ['Заливка й колір: fx-small. Натискання: scale миттєво, повернення small (при reduced motion без зміни розміру).'],
  tokens: ['--sym-fg / --sym-bg (тон)', '--sym-size-touch', '--sym-control-s', '--sym-radius-pill', '--sym-t-fx-small', '--sym-t-small', '--sym-state-hover'],
  related: ['Button', 'Chip', 'SiteHeader'],
})
