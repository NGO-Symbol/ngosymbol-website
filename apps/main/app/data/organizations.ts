import type { Organization } from './types'

// Every partner links to its own site or, where it has none, its main social profile (checked 2026-10-29).
// Logos come from the shared Drive or the organization's own website; organizations without a file show the name only.
export const organizations: Organization[] = [
  { slug: 'yermilov-centre', name: 'ЄрміловЦентр', url: 'https://yermilovcentre.org', logo: '/media/partners/yermilov-centre.svg', motion: 'blink' },
  { slug: 'karazin-university', name: 'Харківський національний університет імені В. Н. Каразіна', url: 'https://karazin.ua', logo: '/media/partners/karazin-university.svg', motion: 'unfold' },
  { slug: 'zmina', name: 'Центр прав людини ZMINA', url: 'https://zmina.info', logo: '/media/partners/zmina.svg', motion: 'shift' },
  { slug: 'mincult', name: 'Міністерство культури України', url: 'https://mincult.gov.ua', logo: '/media/partners/mincult.svg', motion: 'unfold' },
  { slug: 'grynyov-art-foundation', name: 'Grynyov Art Collection', url: 'https://grynyov.art', logo: '/media/partners/grynyov-art-collection.png', motion: 'wipe' },
  { slug: 'mh4u', name: 'Українсько-швейцарський проєкт «Психічне здоров’я для України»', url: 'https://www.mh4u.in.ua', logo: '/media/partners/mh4u.svg', motion: 'bloom' },
  { slug: 'ecf', name: 'European Cultural Foundation', url: 'https://culturalfoundation.eu', logo: '/media/partners/ecf.svg', motion: 'wave' },
  { slug: 'creative-europe', name: 'Креативна Європа (ЄС)', url: 'https://culture.ec.europa.eu/creative-europe', logo: '/media/partners/creative-europe.png', motion: 'stars' },
  { slug: 'zdybanka', name: 'Молодіжний центр «Здибанка», Батьово', url: 'https://www.facebook.com/mc.zdybanka' },
  { slug: 'khust-theatre', name: 'Хустський Закарпатський обласний театр драми та комедії', url: 'https://teatr-khust.com.ua' },
  { slug: 'uzh-station', name: 'Uzh Station' },
  { slug: 'ucraina-piu', name: 'Ucraina Più – Milano APS', url: 'https://www.instagram.com/ucrainapiu_milano_aps/' },
  { slug: 'bila-tserkva-library', name: 'Центральна міська бібліотека м. Біла Церква', url: 'https://biblioteka.com.ua' },
  { slug: 'nema-playback', name: 'Плейбек-театр «Нема»', url: 'https://www.instagram.com/nema_pbt/', logo: '/media/partners/nema.png', motion: 'curtain' }
]
