import { defineDs } from '../types'

export default defineDs({
  name: 'Divider',
  title: 'Розділювач',
  category: 'text',
  status: 'stable',
  summary: 'Тонка лінія кольору тону між групами змісту; може мати підпис.',
  use: ['Між двома групами змісту в одному блоці: «Найближчі» і «Минулі».', 'strong для головного розриву сторінки (2 px).', 'label, коли лінія мусить назвати те, що йде далі.'],
  avoid: ['Відступ між блоками: для цього SymStack та SymSection.', 'Декоративна геометрія — SymOrbit.', 'Лінія навколо картки: SymCard має власну рамку.'],
  examples: [
    { file: 'Basic', title: 'Лінії', description: 'Звичайна, посилена й з підписом.' },
  ],
  playground: { props: { strong: { type: 'boolean' }, label: { type: 'text', default: 'Минулі події' } } },
  keyboard: [],
  a11y: ['Без підпису це hr (роздільник), з підписом — role="separator" із видимим текстом.', 'Підпис не тільки декор: його читає скрінрідер.'],
  motion: ['Немає.'],
  tokens: ['--sym-rule', '--sym-rule-width', '--sym-rule-width-strong', '--sym-fg-muted'],
  related: ['Stack', 'Section', 'Eyebrow'],
})
