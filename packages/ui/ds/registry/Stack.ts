import { defineDs } from '../types'

export default defineDs({
  name: 'Stack', title: 'Стос', category: 'layout', status: 'stable',
  summary: 'Вертикальний потік із рівним проміжком між дітьми: ритм колонки без жодних margin.',
  use: ['Заголовок + текст + кнопка.', 'Блоки всередині секції (gap="stack").', 'Список як <ul> (as="ul").'],
  avoid: ['Кнопки й чипи безпосередньо в Stack (розтягнуться на всю ширину): обгорніть у SymCluster.', 'margin-top на дітях.'],
  examples: [{ file: 'Rhythm', title: 'Ритм', description: 'Менший gap для тісно пов’язаного, більший між блоками.' }],
  playground: { props: { gap: { type: 'select', options: ['xs', 's', 'm', 'l', 'xl', 'stack'], default: 'm' }, align: { type: 'select', options: ['stretch', 'start', 'center', 'end'], default: 'stretch' } } },
  tokens: ['--sym-space-*', '--sym-gap-stack'], related: ['Cluster', 'Grid'],
})
