export type ProjectStatus = 'launching' | 'ongoing' | 'completed'

export interface Project {
  title: string
  slug?: string
  href: string
  external: boolean
  period: string
  status: ProjectStatus
  statusLabel: string
  direction: string
  geography: string
  summary: string
  tone: 'violet' | 'apricot' | 'cream' | 'plum'
}

export const projects: Project[] = [
  {
    title: 'Історія моєї вулиці',
    href: 'https://istoriia-vulytsi.symbol.ngo',
    external: true,
    period: '2026–2027',
    status: 'launching',
    statusLabel: 'Запускається',
    direction: 'Міська культура · пам’ять',
    geography: 'Харків',
    summary: 'Автономний проєктний сайт з окремими сторінками вулиць і сталими QR-маршрутами.',
    tone: 'violet'
  },
  {
    title: 'Голоси у русі',
    slug: 'holosy-u-rusi',
    href: '/projects/holosy-u-rusi',
    external: false,
    period: '2026',
    status: 'ongoing',
    statusLabel: 'Триває',
    direction: 'Плейбек-театр',
    geography: 'Закарпаття',
    summary: 'Проєкт про плейбек-театр і живі історії на Закарпатті.',
    tone: 'apricot'
  },
  {
    title: 'Покажіть свої документи, будь ласка',
    slug: 'pokazhit-svoi-dokumenty',
    href: '/projects/pokazhit-svoi-dokumenty',
    external: false,
    period: '2025',
    status: 'completed',
    statusLabel: 'Завершено',
    direction: 'Сучасне мистецтво',
    geography: 'Харків',
    summary: 'Мистецький проєкт, представлений у ЄрміловЦентрі.',
    tone: 'cream'
  },
  {
    title: 'Тренінги mhGAP на Київщині',
    slug: 'mhgap-kyiv-region',
    href: '/projects/mhgap-kyiv-region',
    external: false,
    period: '2025',
    status: 'completed',
    statusLabel: 'Завершено',
    direction: 'Психічне здоров’я',
    geography: 'Київська область',
    summary: 'Завершений освітній проєкт у напрямі психічного здоров’я.',
    tone: 'plum'
  }
]
