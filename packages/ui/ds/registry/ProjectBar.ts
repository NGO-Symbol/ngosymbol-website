import { defineDs } from '../types'

export default defineDs({
  name: 'ProjectBar',
  title: 'Смуга проєкту',
  category: 'site',
  status: 'stable',
  summary: 'Тонка смуга над шапкою автономного проєкту: «Проєкт ГО «Символ»» і посилання на головний сайт (ADR-0001).',
  use: ['Першим блоком на окремих сайтах проєктів (наприклад, «Історія вулиці»).', 'На сайтах з іншою темою, щоб відвідувач знав, чий це проєкт.'],
  avoid: ['На головному сайті symbol.ngo: там уже є SymSiteHeader.', 'Як банер оголошень — SymBanner.', 'Додавати інші дії й тексти: смуга не вища за 40 px.'],
  examples: [
    { file: 'Plum', title: 'Сливовий тон (типово)', description: 'Висота 40 px, знак, назва і посилання назад.', stage: false },
    { file: 'Tones', title: 'Інші тони й підпис', description: 'Тон і текст посилання задаються пропсами.', stage: false },
  ],
  playground: { props: { tone: { type: 'select', options: ['plum', 'paper', 'white', 'lilac', 'violet', 'apricot'], default: 'plum' }, href: { type: 'text', default: 'https://symbol.ngo' }, label: { type: 'text', default: 'symbol.ngo' } } },
  keyboard: [{ keys: 'Tab, Enter', action: 'Перейти на головний сайт.' }],
  a11y: ['Посилання має приховане доповнення «— на головний сайт ГО «Символ»».', 'Смуга 40 px, а зона натискання посилання сягає 44 px.', 'Текст підтримує будь-який тон: колір береться з пари тону.'],
  motion: ['Підкреслення й стрілка: small / micro; без руху при reduced motion.'],
  tokens: ['--sym-bg / --sym-fg (тон)', '--sym-width-wide', '--sym-t-small', '--sym-t-micro', '--sym-text-caption'],
  related: ['SiteHeader', 'Wordmark'],
})
