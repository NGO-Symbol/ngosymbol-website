import { defineDs } from '../types'

export default defineDs({
  name: 'Text', title: 'Текст', category: 'text', status: 'stable',
  summary: 'Абзац звичайного тексту: вступний, основний, другорядний, підпис. Гротеск, довжина рядка до 66 символів.',
  use: ['Кожен абзац поза SymProse.', 'measure для абзаців ширших за колонку.', 'muted для вторинних пояснень.'],
  avoid: ['Заголовки (SymHeading) і мітки (SymEyebrow).', 'Дрібний текст для важливого (caption — лише підписи).'],
  examples: [{ file: 'Sizes', title: 'Розміри', description: 'lead, body, sm, caption.' }],
  playground: { props: { size: { type: 'select', options: ['lead', 'body', 'sm', 'caption'], default: 'body' }, muted: { type: 'boolean' }, measure: { type: 'boolean' } }, slot: 'Незалежна українська організація, що розвиває сучасну культуру і мистецтво.' },
  a11y: ['Контраст приглушеного тексту перевірено для кожного тону (≥ 4,5:1).'], tokens: ['--sym-text-lead / -body / -body-sm / -caption', '--sym-fg-muted', '--sym-width-prose'], related: ['Heading', 'Prose'],
})
