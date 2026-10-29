import { defineDs } from '../types'

export default defineDs({
  name: 'Callout',
  title: 'Заклик до дії',
  category: 'content',
  status: 'stable',
  summary: 'Завершальний блок сторінки: короткий заголовок, одне речення і одна-дві кнопки. Лежить у секції з власним тоном.',
  use: ['Кінець сторінки або розділу: «Напишіть нам», «Долучайтеся».', 'У SymSection з тоном apricot, violet чи plum; кнопки беруть колір із тону.', 'orbit додає орбіту поруч із текстом (на телефоні — над ним).'],
  avoid: ['Кілька закликів поспіль: один заклик на сторінку.', 'Довгий текст — SymProse.', 'Повідомлення про подію зверху сайту — SymBanner.', 'Порожній стан списку — SymEmptyState.'],
  examples: [
    { file: 'Basic', title: 'Заклик у секції', description: 'Секція apricot; головна дія solid, друга outline.' },
    { file: 'WithOrbit', title: 'З орбітою на plum', description: 'Орбіта поруч із текстом; перемкніть тон сцени вгорі.' },
  ],
  playground: { props: { eyebrow: { type: 'text', default: 'Долучайтеся' }, title: { type: 'text', default: 'Напишіть нам про свою ідею' }, text: { type: 'text', default: 'Коротко опишіть, що ви хочете зробити разом.' }, orbit: { type: 'boolean', default: true }, level: { type: 'select', options: [2, 3, 4], default: 2 } } },
  a11y: ['Заголовок — справжній h-елемент (level, за замовчуванням 2).', 'Кнопки — справжні посилання чи кнопки з текстом дії.', 'Орбіта — aria-hidden.', 'Текст і кнопки беруть пару кольорів із тону секції, контраст перевірено тоном.'],
  motion: ['Сам не рухається. Для появи при прокручуванні обгорніть блок у SymReveal.'],
  tokens: ['--sym-fg / --sym-bg', '--sym-accent (орбіта)', '--sym-space-*', '.sym-t-headline-lg', '.sym-t-lead'],
  related: ['Section', 'Button', 'Banner', 'EmptyState'],
})
