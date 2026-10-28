import { defineDs } from '../types'

export default defineDs({
  name: 'Quote',
  title: 'Цитата',
  category: 'text',
  status: 'stable',
  summary: 'Виносна цитата: серифний курсив великого розміру під акцентною лапкою, з автором і джерелом.',
  use: ['Одне справжнє висловлювання учасника, партнера чи експерта серед довгого тексту або між блоками.', 'Завжди вказуйте cite (хто) і, якщо відомо, source (де сказано).', 'Одна цитата на екран: вона працює як пауза.'],
  avoid: ['Вигадані відгуки та «цитати» без автора: у нас тільки перевірені слова (AGENTS.md).', 'Вступний абзац — SymText size="lead".', 'Цитата всередині markdown-тексту — blockquote у SymProse.'],
  examples: [
    { file: 'Basic', title: 'З автором і джерелом', description: 'Текст-приклад із позначеним місцем для імені та джерела; змініть тон угорі.' },
    { file: 'Bare', title: 'Без підпису', description: 'Тільки цитата: підходить для цитат з документів, де автор уже названий у тексті.' },
  ],
  playground: { props: { cite: { type: 'text', default: 'Ім’я Прізвище, роль' }, source: { type: 'text', default: 'Джерело, рік' } }, slot: 'Текст-приклад цитати, який замінять справжнім висловлюванням.' },
  keyboard: [],
  a11y: ['Семантика figure + blockquote + figcaption з cite.', 'Декоративна лапка має порожню альтернативу і не читається скрінрідером.', 'Текст цитати використовує великий колір тону (--sym-fg-large): розмір ≥ 24 px.'],
  motion: ['Немає. Для появи при прокрутці оберніть у SymReveal.'],
  tokens: ['--sym-text-quote', '--sym-accent', '--sym-fg-large', '--sym-fg-muted', '--sym-width-narrow'],
  related: ['Prose', 'Text', 'Heading'],
})
