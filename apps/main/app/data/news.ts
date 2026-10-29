import type { NewsItem } from './types'

// Short news, newest first. Only facts confirmed by documents (see documents/knowledge/project-registry.md).
export const news: NewsItem[] = [
  {
    slug: 'holosy-u-rusi-culture-helps-solidarity',
    date: '2026-07-09',
    title: '«Голоси у русі» отримали підтримку програми «Культура допомагає: Солідарність»',
    body: ['Проєкт плейбек-театру на Закарпатті співфінансується в межах програми Culture Helps Solidarity, яку реалізує консорціум на чолі з European Cultural Foundation за підтримки «Креативної Європи». [[project:holosy-u-rusi]]'],
    project: 'holosy-u-rusi'
  },
  {
    slug: 'milan-ti-khto-pobachyly-svit',
    date: '2026-05-30',
    title: 'Фотовиставка «Ті, хто побачили світ» у Мілані',
    body: ['На Фестивалі української книги в Мілані (Villa Scheibler) показали 20 фотографій Петра Чекаля та Юрія Рассохи. [[project:ti-khto-pobachyly-svit]]'],
    project: 'ti-khto-pobachyly-svit'
  },
  {
    slug: 'pokazhit-svoi-dokumenty-vidkryttia',
    date: '2025-10-17',
    title: 'У ЄрміловЦентрі відкрилася виставка «Покажіть свої документи…»',
    body: ['20 митців, 21 робота, програма подій до 7 грудня: екскурсії, лекція й дискусії з Центром прав людини ZMINA, артісток і плейбек-перформанс. [[project:pokazhit-svoi-dokumenty]]'],
    project: 'pokazhit-svoi-dokumenty'
  },
  {
    slug: 'istorii-riznykh-arsenal',
    date: '2025-09-20',
    title: 'Плейбек-перформанс «Історії різних» в Арсеналі ідей',
    body: ['Актори відіграли історії, розказані глядачами. [[project:istorii-riznykh]]'],
    project: 'istorii-riznykh'
  },
  {
    slug: 'mhgap-kyiv-zaversheno',
    date: '2025-05-31',
    title: 'Завершилися тренінги mhGAP на Київщині',
    body: ['121 медпрацівник первинної ланки пройшов навчання за програмою ВООЗ і отримав сертифікати; онлайн-супервізії тривали до вересня. [[project:mhgap-kyiv]]'],
    project: 'mhgap-kyiv'
  }
]
