import { defineDs } from '../types'

export default defineDs({
  name: 'SkipLink',
  title: 'Перейти до змісту',
  category: 'site',
  status: 'stable',
  summary: 'Перший елемент у порядку табуляції: невидиме, поки не отримає фокус, і дозволяє клавіатурі оминути шапку.',
  use: ['Один на застосунок, першим дочірнім елементом, до SymSiteHeader.', 'Цільовий <main id="main"> на кожній сторінці.'],
  avoid: ['Робити його постійно видимим (лише для демонстрації з visible).', 'Ховати через display: none: тоді воно недоступне з клавіатури.'],
  examples: [{ file: 'Demo', title: 'Вигляд посилання', description: 'У документації показано постійно (visible); на сайті воно з’являється лише при фокусі з клавіатури.' }],
  keyboard: [{ keys: 'Tab', action: 'Перший Tab на сторінці: посилання з’являється.' }, { keys: 'Enter', action: 'Фокус переходить у <main>, наступний Tab іде вже по змісту.' }],
  a11y: ['Це справжнє <a href="#main">; цільовий елемент отримує tabindex="-1" і фокус, щоб наступний Tab починався зі змісту.', 'З’являється з видимим кільцем фокусу та контрастною парою кольорів.', 'Над усім іншим (--sym-z-skip).'],
  motion: ['Виїзд зверху: small; при reduced motion лише без зсуву (посилання просто опиняється на місці).'],
  tokens: ['--sym-fg / --sym-bg (тон)', '--sym-z-skip', '--sym-shadow-float', '--sym-t-small-out', '--sym-size-touch'],
  related: ['SiteHeader'],
})
