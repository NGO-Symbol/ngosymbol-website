import type { Organization } from './types'

// Logos come from the shared Drive or the organization's own website; organizations without a file show the name only.
export const organizations: Organization[] = [
  { slug: 'yermilov-centre', name: 'ЄрміловЦентр', url: 'https://yermilovcentre.org', logo: '/media/partners/yermilov-centre.svg', motion: 'blink' },
  { slug: 'karazin-university', name: 'Харківський національний університет імені В. Н. Каразіна', url: 'https://karazin.ua', logo: '/media/partners/karazin-university.svg', motion: 'unfold' },
  { slug: 'zmina', name: 'Центр прав людини ZMINA', url: 'https://zmina.info', logo: '/media/partners/zmina.svg', motion: 'shift' },
  { slug: 'president-grant', name: 'Грант Президента України для молодих митців' },
  { slug: 'grynyov-art-foundation', name: 'Grynyov Art Collection' },
  { slug: 'mh4u', name: 'Українсько-швейцарський проєкт «Психічне здоров’я для України»', url: 'https://www.mh4u.in.ua', logo: '/media/partners/mh4u.png', motion: 'beat' },
  { slug: 'ecf', name: 'European Cultural Foundation', url: 'https://culturalfoundation.eu', logo: '/media/partners/ecf.svg', motion: 'wave' },
  { slug: 'creative-europe', name: 'Креативна Європа (ЄС)', url: 'https://culture.ec.europa.eu/creative-europe', logo: '/media/partners/creative-europe.png', motion: 'stars' },
  { slug: 'zdybanka', name: 'Молодіжний центр «Здибанка», Батьово' },
  { slug: 'khust-theatre', name: 'Хустський Закарпатський обласний театр драми та комедії' },
  { slug: 'uzh-station', name: 'Uzh Station' },
  { slug: 'ucraina-piu', name: 'Ucraina Più – Milano APS' },
  { slug: 'nema-playback', name: 'Плейбек-театр «Нема»', logo: '/media/partners/nema.png', motion: 'curtain' }
]
