import type { SymbolEvent } from './types'

// Every event belongs to a project (ADR-0008). Projects of kind 'single' are listed as events automatically.
// «Покажіть свої документи…»: dates and times checked against the Instagram posts of @symbol.ngo, @yermilovcentre
// and @nema_pbt (2026-10-29). The ZMINA lecture (08.11) and the «Бюрократія» discussion (29.11) have no post, but the
// team confirmed they took place (USER_CONFIRMED 2026-10-29).
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
    partners: ['yermilov-centre'],
    description: [
      '**Урочисте відкриття виставки**: промови кураторів, менеджерки, керівниці ЄрміловЦентру, ректора ХНУ ім. В. Н. Каразіна та перформанс [[person:oleksii-chekal]].'
    ],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' },
      { person: 'hanna-franyk', role: 'Менеджерка' }
    ],
    gallery: [
      // Opening photos by Олександр Осіпов (ЄрміловЦентр Drive «Фото_Саша Осіпов»).
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-032.jpg', alt: 'Відкриття виставки: глядачі слухають промови в залі ЄрміловЦентру', credit: 'Олександр Осіпов', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-064.jpg', alt: 'Глядачі колом у залі під час відкриття', credit: 'Олександр Осіпов', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-104.jpg', alt: 'Глядачка біля манекена в сукні з проєкту «Сучасна мода»', credit: 'Олександр Осіпов', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-128.jpg', alt: 'Світлова інсталяція «Документ» Костянтина Гливляса в темному залі', credit: 'Олександр Осіпов' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-176.jpg', alt: 'Виставка в ЄрміловЦентрі — вигляд згори', credit: 'Олександр Осіпов', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-140.jpg', alt: 'Синє світло інсталяції в темряві', credit: 'Олександр Осіпов' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-052.jpg', alt: 'Глядачка біля килима з прикріпленими документами', credit: 'Олександр Осіпов', people: true },
      { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-024.jpg', alt: 'Інсталяція: розлітні аркуші документів над кріслом і килимом', credit: 'Олександр Осіпов' },
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
    gallery: [
      { src: '/media/events/pokazhit-svoi-dokumenty-ekskursiia/curator.jpg', alt: 'Куратор розповідає про роботи на екскурсії' },
      { src: '/media/events/pokazhit-svoi-dokumenty-ekskursiia/group.jpg', alt: 'Учасники екскурсії в залі виставки' },
      { src: '/media/events/pokazhit-svoi-dokumenty-ekskursiia/hall.jpg', alt: 'Екскурсія біля інсталяцій' },
      { src: '/media/events/pokazhit-svoi-dokumenty-ekskursiia/walk.jpg', alt: 'Глядачі йдуть експозицією разом із кураторами' },
      { src: '/media/events/pokazhit-svoi-dokumenty-ekskursiia/interactive.jpg', alt: 'Інтерактив із роботою на екскурсії' }
    ],
    partners: ['yermilov-centre'],
    description: [
      '**Перша подія паралельної програми.** Куратори розповіли про ідеї, що лягли в основу проєкту, і про представлені роботи. До екскурсії долучилися митці [[person:hanna-franyk]] та [[person:andrii-skrypka]], які презентували свої твори.'
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
    partners: ['yermilov-centre'],
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
    partners: ['yermilov-centre'],
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
    partners: ['yermilov-centre', 'zmina'],
    description: [
      'Робота з **мешканцями окупованих територій та внутрішньо переміщеними особами** у правовому полі з 2014 року до сьогодні; висвітлення діяльності правозахисників.'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-makov',
    title: 'Розмова з Павлом Маковим про документ і пам’ять',
    project: 'pokazhit-svoi-dokumenty',
    format: 'artist-talk',
    start: '2025-11-14T18:00',
    venue: yermilov,
    gallery: [
      { src: '/media/events/pokazhit-svoi-dokumenty-makov/stage.jpg', alt: 'Павло Маков і модератори розмови', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-makov/talk.jpg', alt: 'Розмова про документ і пам’ять', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-makov/makov.jpg', alt: 'Павло Маков відповідає на запитання', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-makov/listeners.jpg', alt: 'Слухачі розмови', people: true }
    ],
    partners: ['yermilov-centre'],
    description: [
      'На виставці представлено проєкт [[person:pavlo-makov]] **«Утопія. Хроніки»**, що досліджує **документування мистецтва**. Документ тут — не папір і не архів, а форма пам’яті, жест, який промовляє: «Ми тут були».',
      'Розмова про те, як зберігати пам’ять про сучасне українське мистецтво і як документувати **не події, а стан присутності**.'
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
    gallery: [
      { src: '/media/events/pokazhit-svoi-dokumenty-artist-talk/artist.jpg', alt: 'Андрій Скрипка показує ліногравюру квитка', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-artist-talk/prints.jpg', alt: 'Гості розглядають відбитки «Квитків Харкова»', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-artist-talk/ticket.jpg', alt: 'Відбиток квитка з серії «Квитки Харкова»' },
      { src: '/media/events/pokazhit-svoi-dokumenty-artist-talk/talk.jpg', alt: 'Андрій Скрипка розповідає про проєкт', people: true }
    ],
    partners: ['yermilov-centre'],
    description: [
      '[[person:andrii-skrypka]] розповів історію проєкту **«Квитки Харкова»** — від перших ідей до фінальної реалізації: ліногравюрні відбитки квитків від 1 до 6 гривень, робота з дощечками, з яких друкувалися квитки, і власний тираж квитків для Харкова.'
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
    gallery: [
      { src: '/media/events/pokazhit-svoi-dokumenty-zmina-dyskusiia/panel.jpg', alt: 'Спікери панельної дискусії', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-zmina-dyskusiia/speaker.jpg', alt: 'Модераторка й спікери дискусії', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-zmina-dyskusiia/hall.jpg', alt: 'Зала ЄрміловЦентру під час дискусії' },
      { src: '/media/events/pokazhit-svoi-dokumenty-zmina-dyskusiia/audience.jpg', alt: 'Глядачі дискусії', people: true }
    ],
    partners: ['yermilov-centre', 'zmina'],
    description: [
      'Під час повномасштабного вторгнення правозахисна діяльність стала **частиною щоденного виживання**, документування війни, захисту цивільних, допомоги переселеним і мобілізованим. Розмова про **ціну активізму, моральну стійкість**, репрезентацію в медіа й спільну мову між правозахисними, культурними та академічними середовищами.',
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
    gallery: [
      { src: '/media/events/pokazhit-svoi-dokumenty-pleibek/actors.jpg', alt: 'Актори плейбек-театру «Нема» на сцені', people: true },
      { src: '/media/events/pokazhit-svoi-dokumenty-pleibek/scene.jpg', alt: 'Актори відіграють історію глядача' },
      { src: '/media/events/pokazhit-svoi-dokumenty-pleibek/gesture.jpg', alt: 'Сцена перформансу' },
      { src: '/media/events/pokazhit-svoi-dokumenty-pleibek/story.jpg', alt: 'Оповідачка розповідає історію', people: true }
    ],
    partners: ['yermilov-centre', 'nema-playback'],
    description: [
      'Перформанс плейбек-театру «Нема» (Харків). Глядачі розповідають історії, актори тут і зараз відтворюють їх на сцені під живу музику. Тема — **ідентичність**: що б ви розповіли, якби замість документів вас попросили надати історію?',
      'За вечір прозвучало й було відіграно **9 історій для понад 50 глядачів**. **Третину зібраних коштів** театр передав на збір на дві машини для 47 ОМБр і НГУ «Спартан».',
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
    partners: ['yermilov-centre'],
    description: [
      'Розмова з митцями виставки та культурними менеджерами. Перша частина — **документ як матеріал, символ, традиція, пам’ять**.',
      'Друга — **практичне «буття митцем»**: сайт і портфоліо, мистецька діяльність через ФОП, подача на опен-коли й гранти, комунікація з кураторами та інституціями. Питання з залу, вільна дискусія.'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-kvero',
    title: 'Перформанс KVERO contemporary music ensemble «In C»',
    project: 'pokazhit-svoi-dokumenty',
    format: 'performance',
    start: '2025-12-05T17:00',
    venue: yermilov,
    gallery: [
      { src: '/media/events/pokazhit-svoi-dokumenty-kvero/violin.jpg', alt: 'Скрипалька серед паперових аркушів — вигляд згори' },
      { src: '/media/events/pokazhit-svoi-dokumenty-kvero/flute.jpg', alt: 'Флейтистка під час виконання In C' },
      { src: '/media/events/pokazhit-svoi-dokumenty-kvero/double-bass.jpg', alt: 'Контрабасист на тлі робіт виставки' },
      { src: '/media/events/pokazhit-svoi-dokumenty-kvero/audience.jpg', alt: 'Слухачки з бумвекерами долучаються до ритму', people: true }
    ],
    partners: ['yermilov-centre'],
    description: [
      'Музично-просторовий перформанс: годинне виконання **In C Террі Райлі** — твору, з якого почався **музичний мінімалізм**. 53 мелодичні патерни переплітаються й нашаровуються в медитативний звуковий ландшафт; **слухачі могли долучитися й задавати ритм**.',
      '**Чи може партитура бути документом?** Перформанс досліджує свободу виконавців усередині чітко заданої структури.'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-finisazh',
    title: 'Фінальна кураторська екскурсія',
    project: 'pokazhit-svoi-dokumenty',
    format: 'tour',
    start: '2025-12-07T14:00',
    venue: yermilov,
    partners: ['yermilov-centre'],
    description: ['**Остання подія паралельної програми** в день завершення виставки: кураторська концепція, роботи митців та інтерактиви з інсталяціями, серед них — «Їстівний паспорт».'],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' }
    ]
  },
  // Тренінги mhGAP на Київщині: dates from the @symbol.ngo posts of 28.02, 28.04, 02.05 and 25.06.2025; trainers from the service acts.
  {
    slug: 'mhgap-kyiv-trening-1',
    title: 'Тренінг mhGAP у Білій Церкві',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-02-10',
    end: '2025-02-14',
    venue: { name: 'Центральна міська бібліотека', city: 'Біла Церква' },
    gallery: [
      { src: '/media/events/mhgap-kyiv-trening-1/group.jpg', alt: 'Учасники першого тренінгу mhGAP у Білій Церкві', people: true },
      { src: '/media/events/mhgap-kyiv-trening-1/hall.jpg', alt: 'Зала тренінгу в Центральній міській бібліотеці' },
      { src: '/media/events/mhgap-kyiv-trening-1/trainer.jpg', alt: 'Тренерка пояснює матеріал учасникам' },
      { src: '/media/events/mhgap-kyiv-trening-1/practice.jpg', alt: 'Практична вправа в парах', people: true }
    ],
    people: [
      { person: 'olena-lemeshko', role: 'Тренери' },
      { person: 'nataliia-opryshko', role: 'Тренери' }
    ],
    partners: ['bila-tserkva-library'],
    description: ['**Перший тренінг «Символу»** за програмою ВООЗ mhGAP (частина 1) для медпрацівників первинної ланки **Білоцерківського району** — переважно сімейних лікарів, медсестер і педіатрів міського центру первинної медико-санітарної допомоги Білої Церкви. П’ять днів навчання: депресія, суїцид, уживання психоактивних речовин, інші скарги щодо психічного здоров’я, а також **модулі допомоги за гуманітарних надзвичайних станів** — горе, гострий стрес, посттравматичний стресовий розлад.', 'Вели тренінг [[person:olena-lemeshko]], лікарка загальної практики — сімейної медицини, та [[person:nataliia-opryshko]]. Після навчання учасники мали **щомісячні онлайн-супервізії** з тренерками.']
  },
  {
    slug: 'mhgap-kyiv-trening-2',
    title: 'Тренінг mhGAP у Білій Церкві',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-02-24',
    end: '2025-02-28',
    venue: { name: 'Центральна міська бібліотека', city: 'Біла Церква' },
    gallery: [
      { src: '/media/events/mhgap-kyiv-trening-2/group.jpg', alt: 'Учасники другого тренінгу з посібниками mhGAP', people: true },
      { src: '/media/events/mhgap-kyiv-trening-2/session.jpg', alt: 'Робота учасників у залі' },
      { src: '/media/events/mhgap-kyiv-trening-2/flipchart.jpg', alt: 'Робота з фліпчартом' }
    ],
    people: [
      { person: 'yurii-sich', role: 'Тренери' },
      { person: 'viktoriia-myroniuk-danko', role: 'Тренери' }
    ],
    partners: ['bila-tserkva-library'],
    description: ['Другий тренінг mhGAP (частина 1) для працівників первинної ланки охорони здоров’я **Білої Церкви та району**: сімейних лікарів, педіатрів, медсестер.', 'Вели тренінг [[person:yurii-sich]] та [[person:viktoriia-myroniuk-danko]], які потім проводили для учасників онлайн-супервізії.']
  },
  {
    slug: 'mhgap-kyiv-trening-3',
    title: 'Тренінг mhGAP у Києві',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-03-31',
    end: '2025-04-04',
    venue: { name: 'Готель «Україна»', city: 'Київ' },
    gallery: [
      { src: '/media/events/mhgap-kyiv-trening-3/group.jpg', alt: 'Спільне фото учасників тренінгу з посібниками', people: true },
      { src: '/media/events/mhgap-kyiv-trening-3/hall.jpg', alt: 'Тренер веде заняття для повної зали' },
      { src: '/media/events/mhgap-kyiv-trening-3/trainer.jpg', alt: 'Тренер біля презентації' },
      { src: '/media/events/mhgap-kyiv-trening-3/manual.jpg', alt: 'Посібник mhGAP' }
    ],
    people: [
      { person: 'alesia-lysenko', role: 'Тренери' },
      { person: 'ivan-kutchak', role: 'Тренери' }
    ],
    description: ['Тренінг mhGAP (частина 1) у **готелі «Україна» в Києві** для **33 учасників** — переважно медичних працівників, а також кількох соціальних працівників. На навчання зголосилися медики з **громад усієї Київщини**: Ірпеня, Вишневого, Переяслава, Березані, Калитянської громади та інших. Усі учасники отримали **посібники mhGAP**.', 'Вели тренінг [[person:alesia-lysenko]] та [[person:ivan-kutchak]], які потім проводили для учасників онлайн-супервізії.']
  },
  {
    slug: 'mhgap-kyiv-trening-4',
    title: 'Тренінг mhGAP, частина 2',
    project: 'mhgap-kyiv',
    format: 'training',
    start: '2025-05-13',
    end: '2025-05-16',
    venue: { name: 'Книгарня-кав’ярня «Сенс»', address: 'Хрещатик', city: 'Київ' },
    gallery: [
      { src: '/media/events/mhgap-kyiv-trening-4/trainer.jpg', alt: 'Тренерка веде другу частину тренінгу mhGAP' },
      { src: '/media/events/mhgap-kyiv-trening-4/lecture.jpg', alt: 'Тренер пояснює модуль біля презентації' },
      { src: '/media/events/mhgap-kyiv-trening-4/questions.jpg', alt: 'Учасники ставлять запитання', people: true },
      { src: '/media/events/mhgap-kyiv-trening-4/group.jpg', alt: 'Учасники останнього тренінгу проєкту', people: true }
    ],
    people: [
      { person: 'ivan-kutchak', role: 'Тренери' },
      { person: 'olha-klymovska', role: 'Тренери' }
    ],
    partners: ['sens'],
    description: [
      '**Останній тренінг проєкту** — програма **другої частини mhGAP**: психози, епілепсія, дитячі та підліткові психічні й поведінкові розлади, деменція. Спочатку планували лише першу частину, але учасники просили продовження, і **всі місця в залі були зайняті**.',
      'Тренінг вели [[person:ivan-kutchak]] та [[person:olha-klymovska]]; учасники отримали сертифікати ВООЗ на 20 годин навчання. Після тренінгу учасники продовжили онлайн-супервізії зі спеціалістами з психічного здоров’я та сімейної медицини.'
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
    gallery: [
      { src: '/media/events/holosy-u-rusi-uzhhorod/ensemble.jpg', alt: 'Актори театру «Серденьки» після перформансу в Ужгороді', people: true },
      { src: '/media/events/holosy-u-rusi-uzhhorod/scene.jpg', alt: 'Сцена плейбек-перформансу' },
      { src: '/media/events/holosy-u-rusi-uzhhorod/audience.jpg', alt: 'Глядачі перформансу на «Станції Уж»', people: true }
    ],
    partners: ['serdenky-playback', 'uzh-station'],
    description: ['Перформанс плейбек-театру «Серденьки», що **відкрив тур Закарпатською областю**. Глядачі розповідали історії, актори миттєво їх відтворювали; більшість історій були **про дітей і батьків**.']
  },
  {
    slug: 'holosy-u-rusi-berehove',
    title: 'Плейбек-перформанс у Береговому',
    project: 'holosy-u-rusi',
    format: 'playback',
    start: '2026-10-13T11:00',
    venue: { city: 'Берегове' },
    partners: ['serdenky-playback'],
    description: ['Зупинка туру плейбек-театру «Серденьки» Закарпаттям. **Вхід вільний за реєстрацією**, пріоритет — студентам навчальних закладів.']
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
      '**Незалежний фестиваль локальної культури**: виставки, артістоки, воркшопи, вистави, плейбек-перформанси, лекції, концерти. «Символ» — партнер фестивалю.',
      'Дати — за фотоархівом фестивалю; програму варто уточнити в організаторів.'
    ]
  }
]
