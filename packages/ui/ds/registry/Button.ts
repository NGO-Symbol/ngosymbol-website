import { defineDs } from '../types'

export default defineDs({
  name: 'Button',
  title: 'Кнопка',
  category: 'actions',
  status: 'stable',
  summary: 'Головна дія блоку: перейти, написати, дізнатися більше. Три рівні акценту, колір береться з тону секції.',
  use: ['Одна solid-кнопка на блок: головна дія (Написати нам, Усі проєкти).', 'outline для другорядної дії поруч; text для третьої.', 'Посилання на іншу сторінку чи сайт, що є дією (href / to).'],
  avoid: ['Посилання всередині абзацу — SymLink.', 'Кілька solid-кнопок поруч: акцент губиться.', 'Дія лише з іконкою — SymIconButton.', 'Перемикання вибору (фільтр) — SymChip.'],
  examples: [
    { file: 'Variants', title: 'Рівні акценту', description: 'solid > outline > text. Спробуйте інші тони угорі: кнопки змінюють колір разом із тоном.' },
    { file: 'Sizes', title: 'Розміри й іконки', description: 'm — стандартна, l — героїчні дії. Іконка завжди праворуч.' },
  ],
  playground: { props: { variant: { type: 'select', options: ['solid', 'outline', 'text'], default: 'solid' }, size: { type: 'select', options: ['m', 'l'], default: 'm' }, icon: { type: 'text', default: 'arrow-right' }, block: { type: 'boolean' }, disabled: { type: 'boolean' } }, slot: 'Усі проєкти' },
  states: [
    { label: 'solid', props: { variant: 'solid' }, slot: 'Написати' }, { label: 'outline', props: { variant: 'outline' }, slot: 'Дізнатися більше' }, { label: 'text', props: { variant: 'text', icon: 'arrow-right' }, slot: 'Усі проєкти' },
    { label: 'з іконкою', props: { icon: 'arrow-right' }, slot: 'Далі' }, { label: 'зовнішнє посилання', props: { href: 'https://example.com' }, slot: 'Інстаграм' }, { label: 'disabled', props: { disabled: true }, slot: 'Недоступно' },
  ],
  keyboard: [{ keys: 'Tab', action: 'Фокус на кнопку (видиме кільце).' }, { keys: 'Enter / Space', action: 'Натиснути (для посилання лише Enter).' }],
  a11y: ['Текст кнопки — дія: «Написати нам», а не «Натисніть тут».', 'Зовнішнє посилання отримує приховане «(відкриється в новій вкладці)».', 'Зона натискання ≥ 44 px навіть для компактних кнопок.', 'Колір пари «заливка + текст» завжди береться з контрастної пари тону.'],
  motion: ['Заливка й колір: fx-small (120 мс). Стрілка: micro; натискання: scale миттєво, повернення small.'],
  tokens: ['--sym-fg / --sym-bg (тон)', '--sym-shape-control', '--sym-t-fx-small', '--sym-t-small', '--sym-size-touch'],
  related: ['Link', 'Chip'],
})
