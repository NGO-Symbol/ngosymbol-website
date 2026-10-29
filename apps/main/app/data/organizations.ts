import type { Organization } from './types'

// Every partner links to its own site or, where it has none, its main social profile (checked 2026-10-29).
// Logos come from the shared Drive or the organization's own website; organizations without a file show the name only.
export const organizations: Organization[] = [
  { slug: 'yermilov-centre', name: 'ЄрміловЦентр', url: 'https://yermilovcentre.org', logo: '/media/partners/yermilov-centre.svg', motion: 'blink' },
  { slug: 'karazin-university', name: 'Харківський національний університет імені В. Н. Каразіна', url: 'https://karazin.ua', logo: '/media/partners/karazin-university.svg', motion: 'unfold' },
  { slug: 'zmina', name: 'Центр прав людини ZMINA', url: 'https://zmina.info', logo: '/media/partners/zmina.svg', motion: 'shift' },
  { slug: 'mincult', name: 'Міністерство культури України', url: 'https://mincult.gov.ua', logo: '/media/partners/mincult.svg', motion: 'rise' },
  { slug: 'grynyov-art-foundation', name: 'Grynyov Art Collection', url: 'https://grynyov.art', logo: '/media/partners/grynyov-art-collection.png', motion: 'wipe' },
  { slug: 'mh4u', name: 'Українсько-швейцарський проєкт «Психічне здоров’я для України»', url: 'https://www.mh4u.in.ua', logo: '/media/partners/mh4u.svg', motion: 'bloom' },
  { slug: 'eu', name: 'Співфінансовано Європейським Союзом', url: 'https://european-union.europa.eu', logo: '/media/partners/eu-cofunded.png', logoDark: '/media/partners/eu-cofunded-white.png', motion: 'fade' },
  { slug: 'culture-helps-solidarity', name: 'Культура допомагає: Солідарність (Culture Helps Solidarity)', url: 'https://culturehelpssolidarity.eu', logo: '/media/partners/culture-helps-solidarity.png', motion: 'flip' },
  { slug: 'insha-osvita', name: 'Інша Освіта', url: 'https://insha-osvita.org', logo: '/media/partners/insha-osvita.png', motion: 'spin' },
  { slug: 'zusa', name: 'zusa (Берлін)', url: 'https://zusaculture.org', logo: '/media/partners/zusa.png', motion: 'brush' },
  { slug: 'veteranka', name: 'Жіночий ветеранський рух VETERANKA', url: 'https://veteranka.org.ua', logo: '/media/partners/veteranka.png', motion: 'stamp' },
  { slug: 'serdenky-playback', name: 'Плейбек-театр «Серденьки»', url: 'https://www.instagram.com/serdenky.playback/' },
  // «2, 10, 300 років потому» partners (Drive «exhibition/Partners logo» and the anniversary post of 06.09.2026).
  { slug: 'egyesek', name: 'Egyesek', url: 'https://egyesek.hu', logo: '/media/partners/egyesek.svg', motion: 'orbit' },
  { slug: 'arteria', name: 'Галерея Artéria, Балашшадьярмат', url: 'https://www.programturizmus.hu/ajanlat-arteria-galeria-programok-balassagyarmat.html', logo: '/media/partners/arteria.png', motion: 'pulse' },
  { slug: 'union-forum', name: 'Union Forum', logo: '/media/partners/union-forum.png', motion: 'flag' },
  { slug: 'sens', name: 'Книгарня «Сенс» на Хрещатику', url: 'https://sens.in.ua', logo: '/media/partners/sens.png', motion: 'unveil' },
  // «Збирач конвалій» supporters (Drive «Опис проєкту Збирач конвалій», 2024).
  { slug: 'gwara-media', name: 'Gwara Media', url: 'https://gwaramedia.com', logo: '/media/partners/gwara-media.svg', motion: 'type' },
  { slug: 'media-development-foundation', name: 'Media Development Foundation', url: 'https://www.mediadevelopmentfoundation.org', logo: '/media/partners/media-development-foundation.svg', motion: 'focus' },
  { slug: 'moksop', name: 'MOKSOP — Музей Харківської школи фотографії', url: 'https://moksop.org', logo: '/media/partners/moksop.svg', motion: 'shutter' },
  { slug: 'ecf', name: 'European Cultural Foundation', url: 'https://culturalfoundation.eu', logo: '/media/partners/ecf.svg', motion: 'wave' },
  { slug: 'zdybanka', name: 'Молодіжний центр «Здибанка», Батьово', url: 'https://www.facebook.com/mc.zdybanka' },
  { slug: 'khust-theatre', name: 'Хустський Закарпатський обласний театр драми та комедії', url: 'https://teatr-khust.com.ua' },
  { slug: 'uzh-station', name: 'Арт-простір «Станція Уж», Ужгород', url: 'https://www.instagram.com/stantsiia.uzh/' },
  { slug: 'ucraina-piu', name: 'Ucraina Più – Milano APS', url: 'https://www.instagram.com/ucrainapiu_milano_aps/' },
  { slug: 'bila-tserkva-library', name: 'Білоцерківська централізована бібліотечна система імені П. Красножона', url: 'https://biblioteka.com.ua', logo: '/media/partners/bila-tserkva-library.png', motion: 'shoot' },
  { slug: 'nema-playback', name: 'Плейбек-театр «Нема»', url: 'https://www.instagram.com/nema_pbt/', logo: '/media/partners/nema.png', motion: 'curtain' }
]

// Order of logos wherever several organizations are shown together (home, «Про нас», partner tiles, the exhibition
// site): funders first — international and state, then foundations and donors — then co-organizing institutions,
// then venues, partner organizations and companies. By status, as the amounts are not part of the site
// (USER_CONFIRMED 2026-10-29). Donor lists that a funder's guideline orders (Culture Helps Solidarity) keep their own order.
export const significance = [
  'eu', 'culture-helps-solidarity', 'ecf', 'mincult', 'mh4u', 'media-development-foundation', 'grynyov-art-foundation',
  'insha-osvita', 'zusa', 'veteranka',
  'yermilov-centre', 'karazin-university', 'moksop', 'zmina', 'gwara-media', 'ucraina-piu', 'egyesek', 'arteria', 'union-forum',
  'khust-theatre', 'uzh-station', 'zdybanka', 'bila-tserkva-library', 'sens', 'serdenky-playback', 'nema-playback'
]
export const bySignificance = (a: string, b: string) => {
  const rank = (slug: string) => (significance.includes(slug) ? significance.indexOf(slug) : significance.length)
  return rank(a) - rank(b)
}
