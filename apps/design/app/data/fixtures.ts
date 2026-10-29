// Content for the page templates: the copy already public on symbol.ngo (organization.md / project registry). Nothing invented.
export const navItems = [
  { label: 'Проєкти', to: '/templates/projects' }, { label: 'Події', to: '/templates/projects' },
  { label: 'Про нас', to: '/templates/about' }, { label: 'Контакти', to: '/templates/contact' },
]
export const projects = [
  { title: 'Історія моєї вулиці', href: 'https://my-street.symbol.ngo', external: true, period: '2026–2027', status: 'launching', statusLabel: 'Запускається', direction: 'Міська культура · пам’ять', summary: 'Автономний проєктний сайт з окремими сторінками вулиць і сталими QR-маршрутами.', tone: 'violet' },
  { title: 'Голоси у русі', to: '/templates/project', period: '2026', status: 'ongoing', statusLabel: 'Триває', direction: 'Плейбек-театр', summary: 'Проєкт про плейбек-театр і живі історії на Закарпатті.', tone: 'apricot' },
  { title: 'Покажіть свої документи, будь ласка', to: '/templates/project', period: '2025', status: 'completed', statusLabel: 'Завершено', direction: 'Сучасне мистецтво', summary: 'Мистецький проєкт, представлений у ЄрміловЦентрі.', tone: 'white' },
  { title: 'Тренінги mhGAP на Київщині', to: '/templates/project', period: '2025', status: 'completed', statusLabel: 'Завершено', direction: 'Психічне здоров’я', summary: 'Завершений освітній проєкт у напрямі психічного здоров’я.', tone: 'plum' },
] as const
export const team = [{ name: 'Юрій Рассоха', role: 'Голова ГО' }, { name: 'Петро Чекаль', role: 'Роль уточнюється' }, { name: 'Ганна Франик', role: 'Роль уточнюється' }, { name: 'Олена Мордик', role: 'Роль уточнюється' }]
export const directions = ['Міська культура', 'Плейбек-театр', 'Сучасне мистецтво', 'Психічне здоров’я']
