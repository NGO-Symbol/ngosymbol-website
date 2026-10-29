import type { SymbolEvent } from './types'

// Every event belongs to a project (ADR-0008). Projects of kind 'single' are listed as events automatically.
// «Покажіть свої документи…»: dates and times checked against the Instagram posts of @symbol.ngo, @yermilovcentre
// and @nema_pbt (2026-10-29). The ZMINA lecture (08.11) and the «Бюрократія» discussion (29.11) come only from the
// planned programme «Розклад Листопад» (Drive) and are not confirmed by any post.
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
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-curators.jpg', alt: 'Куратори виставки виступають на відкритті', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-performance.jpg', alt: 'Перформанс на відкритті: художник друкує напис на довгому аркуші' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-performance-banner.jpg', alt: 'Учасники перформансу піднімають надрукований банер' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/opening-team.jpg', alt: 'Спільне фото команди, митців і гостей на відкритті', people: true }
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
    description: [
      'Перша подія паралельної програми. Куратори розповіли про ідеї, що лягли в основу проєкту, і про представлені роботи. До екскурсії долучилися митці [[person:hanna-franyk]] та [[person:andrii-skrypka]], які презентували свої твори.'
    ],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' }
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-ekskursiia-zhovten',
    title: 'Кураторська екскурсія',
    project: 'pokazhit-svoi-dokumenty',
    format: 'tour',
    start: '2025-10-28',
    venue: yermilov,
    description: ['Друга кураторська екскурсія виставкою.'],
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
    start: '2025-11-01T17:00',
    venue: yermilov,
    description: ['Кураторська екскурсія від співкуратора Юрія Рассохи.'],
    people: [{ person: 'yurii-rassokha', role: 'Куратор' }]
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
    slug: 'pokazhit-svoi-dokumenty-makov',
    title: 'Розмова з Павлом Маковим про документ і пам’ять',
    project: 'pokazhit-svoi-dokumenty',
    format: 'artist-talk',
    start: '2025-11-14T18:00',
    venue: yermilov,
    description: [
      'На виставці представлено проєкт [[person:pavlo-makov]] «Утопія. Хроніки», що досліджує документування мистецтва. Документ тут — не папір і не архів, а форма пам’яті, жест, який промовляє: «Ми тут були».',
      'Розмова про те, як зберігати пам’ять про сучасне українське мистецтво і як документувати не події, а стан присутності.'
    ],
    people: [{ person: 'pavlo-makov', role: 'Митець' }]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-artist-talk',
    title: 'Розмова з Андрієм Скрипкою про «Квитки Харкова»',
    project: 'pokazhit-svoi-dokumenty',
    format: 'artist-talk',
    start: '2025-11-21T18:00',
    venue: yermilov,
    description: [
      '[[person:andrii-skrypka]] розповів історію проєкту «Квитки Харкова» — від перших ідей до фінальної реалізації: ліногравюрні відбитки квитків від 1 до 6 гривень, робота з дощечками, з яких друкувалися квитки, і власний тираж квитків для Харкова.'
    ],
    people: [{ person: 'andrii-skrypka', role: 'Митець' }]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-zmina-dyskusiia',
    title: 'Панельна дискусія «Правозахисна спільнота в Україні під час війни: як ми змінюємось?»',
    project: 'pokazhit-svoi-dokumenty',
    format: 'discussion',
    start: '2025-11-15T16:00',
    end: '2025-11-15T17:30',
    venue: yermilov,
    description: [
      'Під час повномасштабного вторгнення правозахисна діяльність стала частиною щоденного виживання, документування війни, захисту цивільних, допомоги переселеним і мобілізованим. Розмова про ціну активізму, моральну стійкість, репрезентацію в медіа й спільну мову між правозахисними, культурними та академічними середовищами.',
      'Спікери: Максим Потапович, Анна Шаригіна, Ірина Юзик. Модераторка — Інна Ільченко, менеджерка проєктів Центру прав людини ZMINA.'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-pleibek',
    title: 'Плейбек-перформанс',
    project: 'pokazhit-svoi-dokumenty',
    format: 'playback',
    start: '2025-11-23T18:00',
    venue: yermilov,
    description: [
      'Перформанс плейбек-театру «Нема» (Харків). Глядачі розповідають історії, актори тут і зараз відтворюють їх на сцені під живу музику. Тема — ідентичність: що б ви розповіли, якби замість документів вас попросили надати історію?',
      'За вечір прозвучало й було відіграно 9 історій для понад 50 глядачів. Третину зібраних на перформансі коштів театр передав на збір на дві машини для 47 ОМБр і НГУ «Спартан».',
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
  },
  {
    slug: 'pokazhit-svoi-dokumenty-kvero',
    title: 'Перформанс KVERO contemporary music ensemble «In C»',
    project: 'pokazhit-svoi-dokumenty',
    format: 'performance',
    start: '2025-12-05T17:00',
    venue: yermilov,
    description: [
      'Музично-просторовий перформанс: годинне виконання In C Террі Райлі — твору, з якого почався музичний мінімалізм. 53 мелодичні патерни переплітаються й нашаровуються в медитативний звуковий ландшафт; слухачі могли долучитися й задавати ритм.',
      'Чи може партитура бути документом? Перформанс досліджує свободу виконавців усередині чітко заданої структури.'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-finisazh',
    title: 'Фінальна кураторська екскурсія',
    project: 'pokazhit-svoi-dokumenty',
    format: 'tour',
    start: '2025-12-07T14:00',
    venue: yermilov,
    description: ['Остання подія паралельної програми в день завершення виставки: кураторська концепція, роботи митців та інтерактиви з інсталяціями, серед них — «Їстівний паспорт».'],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' }
    ]
  },
  // Тренінги mhGAP на Київщині: dates from the @symbol.ngo posts of 28.02, 28.04, 02.05 and 25.06.2025.
  {
    slug: 'mhgap-kyiv-trening-1',
    title: 'Тренінг mhGAP у Білій Церкві',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-02-10',
    end: '2025-02-14',
    venue: { name: 'Центральна міська бібліотека', city: 'Біла Церква' },
    description: ['Перший тренінг «Символу» за програмою ВООЗ mhGAP (частина 1) для медпрацівників первинної ланки. Програма включала й модулі допомоги за гуманітарних надзвичайних станів: горе, гострий стрес, посттравматичний стресовий розлад.']
  },
  {
    slug: 'mhgap-kyiv-trening-2',
    title: 'Тренінг mhGAP у Білій Церкві',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-02-24',
    end: '2025-02-28',
    venue: { name: 'Центральна міська бібліотека', city: 'Біла Церква' },
    description: ['Другий тренінг mhGAP (частина 1) для працівників первинної ланки охорони здоров’я.']
  },
  {
    slug: 'mhgap-kyiv-trening-3',
    title: 'Тренінг mhGAP',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-03-31',
    end: '2025-04-04',
    venue: { city: 'Київська область' },
    description: ['Тренінг mhGAP (частина 1) для 33 учасників — переважно медичних працівників, а також кількох соціальних працівників. Усі учасники отримали посібники mhGAP.']
  },
  {
    slug: 'mhgap-kyiv-trening-4',
    title: 'Тренінг mhGAP, частина 2',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-05-13',
    end: '2025-05-16',
    venue: { name: 'Книгарня-кав’ярня «Сенс»', address: 'Хрещатик', city: 'Київ' },
    description: [
      'Останній тренінг проєкту — програма другої частини mhGAP: психози, епілепсія, дитячі та підліткові психічні й поведінкові розлади, деменція. Спочатку планували лише першу частину, але учасники просили продовження, і всі місця в залі були зайняті.',
      'Тренери приїхали із Закарпаття. Після тренінгу учасники продовжили онлайн-супервізії зі спеціалістами з психічного здоров’я та сімейної медицини.'
    ]
  },
  // Голоси у русі: playback performances of the theatre «Серденьки» (posts of @serdenky.playback, 2026).
  {
    slug: 'holosy-u-rusi-uzhhorod',
    title: 'Плейбек-перформанс в Ужгороді',
    project: 'holosy-u-rusi',
    format: 'playback',
    start: '2026-08-22T18:00',
    venue: { name: 'Арт-простір «Станція Уж»', address: 'вул. Новака, 20', city: 'Ужгород' },
    description: ['Перформанс плейбек-театру «Серденьки», що відкрив тур Закарпатською областю. Глядачі розповідали історії, актори миттєво їх відтворювали; більшість історій були про дітей і батьків.']
  },
  {
    slug: 'holosy-u-rusi-berehove',
    title: 'Плейбек-перформанс у Береговому',
    project: 'holosy-u-rusi',
    format: 'playback',
    start: '2026-10-13T11:00',
    venue: { city: 'Берегове' },
    description: ['Зупинка туру плейбек-театру «Серденьки» Закарпаттям. Вхід вільний за реєстрацією, пріоритет — студентам навчальних закладів.']
  },
  {
    slug: 'kharkivske-more-2026',
    title: 'Фестиваль «Харківське море» 2026',
    project: 'kharkivske-more',
    format: 'festival',
    start: '2026-08-14',
    end: '2026-08-23',
    venue: { city: 'Харків' },
    description: [
      'Незалежний фестиваль локальної культури: виставки, артістоки, воркшопи, вистави, плейбек-перформанси, лекції, концерти. «Символ» — партнер фестивалю.',
      'Дати — за фотоархівом фестивалю; програму варто уточнити в організаторів.'
    ]
  }
]
