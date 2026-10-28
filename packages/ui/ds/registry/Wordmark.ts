import { defineDs } from '../types'

export default defineDs({
  name: 'Wordmark',
  title: 'Логотип із назвою',
  category: 'brand',
  status: 'stable',
  summary: 'Офіційний знак ГО «Символ» і слово «СИМВОЛ» поруч. Колір тексту береться з тону.',
  use: ['Логотип у шапці (size md) та підвалі, у смузі проєкту (sm).', 'З to="/" або href: клік веде на головну.'],
  avoid: ['Декоративне коло-спіраль — SymOrbit.', 'Перемальовувати, розтягувати чи перефарбовувати знак.', 'Підміняти слово в #label для чужих організацій: лише для лого-лок-апів проєктів ГО.'],
  examples: [
    { file: 'Sizes', title: 'Розміри й посилання', description: 'md (знак 44 px) для шапки, sm (32 px) для підвалу; із href стає посиланням із прихованим «— на головну».' },
    { file: 'OnTones', title: 'На різних тонах', description: 'Слово перефарбовується разом із тоном, знак лишається оригінальним.' },
  ],
  playground: { props: { size: { type: 'select', options: ['sm', 'md'], default: 'md' } } },
  keyboard: [{ keys: 'Tab, Enter', action: 'Лише коли є to / href: посилання на головну.' }],
  a11y: ['Знак декоративний (поруч видимий текст); посилання отримує приховане «— на головну».', 'Для посилання мінімальна висота 44 px.'],
  motion: ['Без анімації.'],
  tokens: ['--sym-fg (тон)', '--sym-font-text', '--sym-text-body', '--sym-text-body-sm', '--sym-size-touch'],
  related: ['SiteHeader', 'SiteFooter', 'ProjectBar'],
})
