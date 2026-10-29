import type { Organization } from './types'

// Logos come from the shared Drive or the organization's own website; organizations without a file show the name only.
export const organizations: Organization[] = [
  { slug: 'yermilov-centre', name: 'ЄрміловЦентр', url: 'https://yermilovcentre.org', logo: '/media/partners/yermilov-centre.svg', motion: 'blink' },
  { slug: 'karazin-university', name: 'Харківський національний університет імені В. Н. Каразіна', url: 'https://karazin.ua', logo: '/media/partners/karazin-university.svg', motion: 'unfold' },
  { slug: 'zmina', name: 'Центр прав людини ZMINA', url: 'https://zmina.info', logo: '/media/partners/zmina.svg', motion: 'shift' },
  { slug: 'mincult', name: 'Міністерство культури України', url: 'https://mincult.gov.ua', logo: '/media/partners/mincult.svg', motion: 'unfold' },
  { slug: 'grynyov-art-foundation', name: 'Grynyov Art Collection', logo: '/media/partners/grynyov-art-collection.png', motion: 'wipe' },
  { slug: 'mh4u', name: 'Українсько-швейцарський проєкт «Психічне здоров’я для України»', url: 'https://www.mh4u.in.ua', logo: '/media/partners/mh4u.svg', motion: 'bloom' },
  { slug: 'eu', name: 'Європейський Союз', url: 'https://european-union.europa.eu' },
  { slug: 'culture-helps-solidarity', name: 'Культура допомагає: Солідарність (Culture Helps Solidarity)', url: 'https://insha-osvita.org/culture-helps-solidarity-kultura-dopomahaie-solidarnist/' },
  { slug: 'insha-osvita', name: 'Інша Освіта', url: 'https://insha-osvita.org' },
  { slug: 'zusa', name: 'zusa (Берлін)', url: 'https://zusaculture.org' },
  { slug: 'veteranka', name: 'Жіночий ветеранський рух «Ветеранка»', url: 'https://veteranka.org.ua' },
  { slug: 'serdenky-playback', name: 'Плейбек-театр «Серденьки»', url: 'https://www.instagram.com/serdenky.playback/' },
  { slug: 'ecf', name: 'European Cultural Foundation', url: 'https://culturalfoundation.eu', logo: '/media/partners/ecf.svg', motion: 'wave' },
  { slug: 'zdybanka', name: 'Молодіжний центр «Здибанка», Батьово' },
  { slug: 'khust-theatre', name: 'Хустський Закарпатський обласний театр драми та комедії' },
  { slug: 'uzh-station', name: 'Арт-простір «Станція Уж», Ужгород', url: 'https://www.instagram.com/stantsiia.uzh/' },
  { slug: 'ucraina-piu', name: 'Ucraina Più – Milano APS' },
  { slug: 'bila-tserkva-library', name: 'Центральна міська бібліотека м. Біла Церква' },
  { slug: 'nema-playback', name: 'Плейбек-театр «Нема»', logo: '/media/partners/nema.png', motion: 'curtain' }
]
