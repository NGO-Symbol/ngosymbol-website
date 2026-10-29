import type { SymbolEvent } from './types'

// Every event belongs to a project (ADR-0006). Projects of kind 'single' are listed as events automatically.
// «Покажіть свої документи…»: October events come from the project site; November events from the programme
// «Розклад Листопад» (Drive). Photo folders on the Drive confirm the ZMINA event, the artist talk with
// Андрій Скрипка and the playback performance. Exact times of the November events still need confirmation.
const yermilov = { name: 'ЄрміловЦентр', address: 'майдан Свободи, 4', city: 'Харків' }

export const events: SymbolEvent[] = [
  {
    slug: 'pokazhit-svoi-dokumenty-vidkryttia',
    title: 'Відкриття виставки «Покажіть свої документи…»',
    project: 'pokazhit-svoi-dokumenty',
    format: 'opening',
    start: '2025-10-17T18:00',
    end: '2025-10-17T20:00',
    venue: yermilov,
    description: [
      'Урочисте відкриття виставки: промови кураторів, менеджерки, керівниці ЄрміловЦентру, ректора ХНУ ім. В. Н. Каразіна та перформанс [[person:oleksii-chekal]].'
    ],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' },
      { person: 'hanna-franyk', role: 'Менеджерка' }
    ],
    gallery: [
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-hall.jpg', alt: 'Глядачі заповнили зал ЄрміловЦентру на відкритті виставки' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-curators.jpg', alt: 'Куратори виставки виступають на відкритті' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-performance.jpg', alt: 'Перформанс на відкритті: художник друкує напис на довгому аркуші' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-performance-banner.jpg', alt: 'Учасники перформансу піднімають надрукований банер' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-team.jpg', alt: 'Спільне фото команди, митців і гостей на відкритті' }
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-ekskursiia',
    title: 'Кураторська екскурсія',
    project: 'pokazhit-svoi-dokumenty',
    format: 'tour',
    start: '2025-10-18T12:00',
    end: '2025-10-18T14:00',
    venue: yermilov,
    description: ['Дискусія про документи як мистецтво під час прогулянки виставкою з кураторами.'],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' }
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-ekskursiia-lystopad',
    title: 'Кураторська екскурсія',
    project: 'pokazhit-svoi-dokumenty',
    format: 'tour',
    start: '2025-11-02',
    venue: yermilov,
    description: ['Друга кураторська екскурсія виставкою.'],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' }
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-zmina-lektsiia',
    title: 'Лекція Центру прав людини ZMINA',
    project: 'pokazhit-svoi-dokumenty',
    format: 'lecture',
    start: '2025-11-08',
    venue: yermilov,
    description: [
      'Робота з мешканцями окупованих територій та внутрішньо переміщеними особами у правовому полі з 2014 року до сьогодні; висвітлення діяльності правозахисників.'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-artist-talk',
    title: 'Артісток з Андрієм Скрипкою',
    project: 'pokazhit-svoi-dokumenty',
    format: 'artist-talk',
    start: '2025-11-09',
    venue: yermilov,
    description: ['Розмова з митцем, роботи якого представлені на виставці.'],
    people: [{ person: 'andrii-skrypka', role: 'Митець' }]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-zmina-dyskusiia',
    title: 'Панельна дискусія за участю Центру прав людини ZMINA',
    project: 'pokazhit-svoi-dokumenty',
    format: 'discussion',
    start: '2025-11-15',
    venue: yermilov,
    description: ['Робота з мешканцями окупованих територій та внутрішньо переміщеними особами у правовому полі з 2014 року до сьогодні; висвітлення діяльності правозахисників. Розмова з представниками Центру прав людини ZMINA.']
  },
  {
    slug: 'pokazhit-svoi-dokumenty-pleibek',
    title: 'Плейбек-перформанс',
    project: 'pokazhit-svoi-dokumenty',
    format: 'playback',
    start: '2025-11-23',
    venue: yermilov,
    description: [
      'Перформанс плейбек-театру «Нема» (Харків). Глядачі розповідають історії, актори тут і зараз відтворюють їх на сцені. Тема — ідентичність: як інші визначають нас і як ми визначаємо себе, що стає «доказом» нашого існування.',
      'Плейбек-театр — напрям, який «Символ» розвиває й далі в проєктах [[project:istorii-riznykh]] та [[project:holosy-u-rusi]].'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-biurokratiia',
    title: 'Панельна дискусія «Бюрократія в мистецьких практиках»',
    project: 'pokazhit-svoi-dokumenty',
    format: 'discussion',
    start: '2025-11-29',
    venue: yermilov,
    description: [
      'Розмова з митцями виставки та культурними менеджерами. Перша частина — документ як матеріал, символ, традиція, пам’ять.',
      'Друга — практичне «буття митцем»: сайт і портфоліо, мистецька діяльність через ФОП, подача на опен-коли й гранти, комунікація з кураторами та інституціями. Питання з залу, вільна дискусія.'
    ]
  }
]
