import { defineDs } from '../types'

export default defineDs({
  name: 'Chip',
  title: 'Чіп',
  category: 'actions',
  status: 'stable',
  summary: 'Пілюля для вибору: фільтр, перемикач чи посилання на відфільтровану сторінку. Обраний чіп залитий кольором тексту тону.',
  use: ['Окремий перемикач «показувати лише…» (toggle, aria-pressed).', 'Посилання на відфільтрований перелік (to / href): обраний позначається aria-current.', 'Складові SymFilterBar, коли обирається один варіант з кількох.'],
  avoid: ['Головна дія блоку — SymButton.', 'Статус чи мітка без дії — SymTag.', 'Перехід між розділами сайту — навігація шапки.'],
  examples: [
    { file: 'Toggle', title: 'Перемикачі', description: 'Натисніть: чіп перемикається й оголошує aria-pressed. Спробуйте тони угорі.' },
    { file: 'Links', title: 'Посилання', description: 'Чіпи-посилання: обраний позначено aria-current.' },
  ],
  playground: { props: { selected: { type: 'boolean' }, toggle: { type: 'boolean', default: true }, disabled: { type: 'boolean' } }, slot: 'Кіно' },
  states: [
    { label: 'вимкнений', props: { toggle: true }, slot: 'Кіно' }, { label: 'обраний', props: { toggle: true, selected: true }, slot: 'Театр' },
    { label: 'disabled', props: { disabled: true }, slot: 'Недоступно' }, { label: 'посилання', props: { href: '#', selected: true }, slot: 'Архів' },
  ],
  keyboard: [{ keys: 'Tab', action: 'Фокус на чіп (видиме кільце).' }, { keys: 'Enter / Space', action: 'Перемкнути (для посилання лише Enter).' }],
  a11y: ['Зона натискання ≥ 44 px при візуальній висоті 36 px.', 'Toggle оголошує aria-pressed; посилання — aria-current для обраного.', 'Обраний стан — інша заливка й вага тексту, а не лише колір.', 'У режимі forced-colors обраний використовує системні Highlight / HighlightText.'],
  motion: ['Заливка й колір: fx-small. Натискання: scale миттєво, повернення small (множиться на --sym-motion-travel).'],
  tokens: ['--sym-fg / --sym-bg (тон)', '--sym-shape-chip', '--sym-size-touch', '--sym-t-fx-small', '--sym-t-small'],
  related: ['FilterBar', 'Tag', 'Button'],
})
