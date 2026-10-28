import { defineDs } from '../types'

export default defineDs({
  name: 'Orbit', title: 'Орбіта', category: 'brand', status: 'stable',
  summary: 'Спіраль як геометрія: відкрите кільце з ромбом для кадрування й фону. Колір береться з акценту тону. Лише декор.',
  use: ['Обрізана по кутку смуги (слот #decor у SymSection + anchor + bleed + clip).', 'За замовчуванням «м’яка» (30 %): її можна класти під текст. soft=false лише коли поверх нічого не написано.', 'Маленька (xs/sm) як маркер у плейсхолдері.', 'spin для дуже повільного обертання героя.'],
  avoid: ['Повторюваний візерунок-шпалери.', 'Яскрава (soft=false) орбіта під текстом: губиться контраст, особливо cream на apricot.', 'Замість логотипа — для логотипа SymMark.'],
  examples: [{ file: 'Anchors', title: 'Положення й виліт', description: 'anchor і bleed ховають частину кільця за край смуги.', stage: false }, { file: 'Sizes', title: 'Розміри й вага' }],
  playground: { props: { size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'hero'], default: 'md' }, weight: { type: 'select', options: ['thin', 'regular', 'heavy'], default: 'regular' }, rotate: { type: 'number', default: -28 }, color: { type: 'select', options: ['accent', 'fg', 'bg'], default: 'accent' }, spin: { type: 'boolean' }, diamond: { type: 'boolean', default: true } } },
  a11y: ['Завжди aria-hidden: нічого не повідомляє.'], motion: ['Обертання: ambient, 60 с; призупиняється поза екраном і при reduced motion.'], tokens: ['--sym-accent', '--sym-size-orbit-hero', '--sym-dur-ambient'], related: ['Mark', 'Section'],
})
