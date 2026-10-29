import type { Project } from './types'

// Facts come from documents/knowledge/project-registry.md (portfolio 2026, presentation 2024, grant files).
// Donor names and credit lines still need publication approval (documents/knowledge/open-questions.md).
export const projects: Project[] = [
  {
    slug: 'istoriia-moiei-vulytsi',
    title: 'Історія моєї вулиці',
    yearStart: 2026,
    yearEnd: 2027,
    city: 'Харків',
    kind: 'long',
    status: 'launching',
    role: 'organizer',
    formats: ['research'],
    directions: ['culture'],
    tone: 'violet',
    motif: 'streets',
    summary: 'Таблички з QR-кодами на вулицях Харкова й окремі сторінки вулиць: історії, які місто розповідає про себе.',
    body: [
      'Проєкт збирає історії харківських вулиць. На вулицях з’являться таблички з QR-кодами, які ведуть на сторінки вулиць на сайті проєкту.',
      'Тексти перевіряє експертна рада. Сайт проєкту — окремий простір зі своєю структурою й дизайном.'
    ],
    people: [
      { person: 'yurii-rassokha', role: 'Команда проєкту' },
      { person: 'petro-chekal', role: 'Команда проєкту' }
    ],
    subsiteUrl: 'https://istoriia-vulytsi.symbol.ngo'
  },
  {
    slug: 'holosy-u-rusi',
    title: 'Голоси у русі',
    yearStart: 2026,
    city: 'Закарпаття',
    kind: 'long',
    status: 'ongoing',
    role: 'organizer',
    formats: ['playback', 'performance'],
    directions: ['art', 'mental-health'],
    tone: 'apricot',
    motif: 'voices',
    summary: 'Плейбек-театр на Закарпатті: живі історії людей, зіграні тут і зараз.',
    body: [
      'Voices in Motion — проєкт про плейбек-театр і живі історії на Закарпатті. Плейбек-театр — інтерактивний театр імпровізації, у якому актори відіграють історії, розказані глядачами під час перформансу.',
      'Проєкт продовжує роботу «Символу» з плейбек-театром після перформансу [[project:istorii-riznykh]].'
    ],
    partners: ['zdybanka', 'khust-theatre', 'uzh-station'],
    donors: ['ecf', 'creative-europe'],
    donorCredit: 'Проєкт співфінансується в межах програми «Культура допомагає: Солідарність» (Culture Helps Solidarity), яку реалізує консорціум на чолі з European Cultural Foundation за підтримки програми ЄС «Креативна Європа».',
    related: ['istorii-riznykh']
  },
  {
    slug: 'pokazhit-svoi-dokumenty',
    title: 'Покажіть свої документи…',
    yearStart: 2025,
    city: 'Харків',
    kind: 'long',
    status: 'completed',
    role: 'organizer',
    formats: ['exhibition', 'tour', 'discussion'],
    directions: ['art'],
    tone: 'cream',
    motif: 'documents',
    theme: 'documents',
    poster: '/media/projects/pokazhit-svoi-dokumenty/poster.jpg',
    subsiteUrl: 'https://pokazhit-dokumenty.symbol.ngo',
    summary: 'Виставка про документ як мистецький феномен: 20 митців у ЄрміловЦентрі.',
    body: [
      'Виставка досліджує документ як мистецький феномен, що виходить за межі його функціональної ролі. Документ тут — не лише механізм бюрократичного контролю, а й естетичний, ритуальний та соціальний артефакт.',
      'Учасники працювали з фотографією, текстом, живописом, колажем та перформативними практиками. У виставці взяли участь 20 митців, серед них [[person:pavlo-makov]], [[person:oleh-tistol]] і [[person:roman-piatkovka]].',
      'Це перший проєкт молодих кураторів [[person:petro-chekal]] і [[person:yurii-rassokha]] у ЄрміловЦентрі. Виставку супроводжувала програма подій: екскурсії, лекція та дискусії з Центром прав людини ZMINA, артісток і плейбек-перформанс.',
      'ЄрміловЦентр, Харків, 17 жовтня — 7 грудня 2025 року.'
    ],
    concept: [
      'У сучасному світі неможливо обійтися без роботи з документами. Документи супроводжують людину фактично від народження і до смерті. Ми звикли сприймати їх як самоочевидну складову соціуму, але документація знаходиться в культурно-історичному контексті, і її варто розглядати як щось плинне та варте критики.',
      'Офіційні документи — це інструменти влади. Вони не просто фіксують реальність, а й конструюють її, визначаючи, хто і як може бути представленим у соціальному просторі.'
    ],
    people: [
      { person: 'petro-chekal', role: 'Куратори' },
      { person: 'yurii-rassokha', role: 'Куратори' },
      { person: 'hanna-franyk', role: 'Менеджерка проєкту' },
      { person: 'oleksii-chekal', role: 'Дизайн айдентики та шрифт EXDocument' },
      { person: 'nataliia-ivanova', role: 'Координація від ЄрміловЦентру' },
      { person: 'sofiia-hurilova', role: 'Координація від ЄрміловЦентру' },
      { person: 'pavlo-makov', role: 'Митці' },
      { person: 'oleh-tistol', role: 'Митці' },
      { person: 'roman-piatkovka', role: 'Митці' },
      { person: 'serhii-melnychenko', role: 'Митці' },
      { person: 'oleksii-sai', role: 'Митці' },
      { person: 'volodymyr-kuznietsov', role: 'Митці' },
      { person: 'alina-prokopenko', role: 'Митці' },
      { person: 'andrii-skrypka', role: 'Митці' },
      { person: 'anna-hareieva', role: 'Митці' },
      { person: 'anton-kariuk', role: 'Митці' },
      { person: 'vira-pakosh', role: 'Митці' },
      { person: 'dara-sholokh', role: 'Митці' },
      { person: 'hanna-franyk', role: 'Митці' },
      { person: 'yeva-fomitski', role: 'Митці' },
      { person: 'kinich-azla', role: 'Митці' },
      { person: 'kostiantyn-hlyvlias', role: 'Митці' },
      { person: 'mariia-matiashova', role: 'Митці' },
      { person: 'mariia-prokopenko', role: 'Митці' },
      { person: 'nataliia-okhman', role: 'Митці' },
      { person: 'senora-serpiente', role: 'Митці' }
    ],
    partners: ['yermilov-centre', 'karazin-university', 'zmina'],
    donors: ['president-grant', 'grynyov-art-foundation'],
    donorCredit: 'Організатори: ГО «Символ», ЄрміловЦентр і Харківський національний університет імені В. Н. Каразіна. Виставка відбулася за підтримки Гранту Президента України для молодих митців та Grynyov Art Collection.',
    gallery: [
      { src: '/media/projects/pokazhit-svoi-dokumenty/carpet.jpg', alt: 'Інсталяція: килим на стіні, крісло й розлітні аркуші документів', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/plates.jpg', alt: 'Паспорти на тарілках уздовж довгого столу' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/light.jpg', alt: 'Світлова інсталяція в темному залі', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/viewers.jpg', alt: 'Глядачі перед стіною з чорно-білими фотографіями' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/passports-wall.jpg', alt: 'Ряди червоних паспортів на стіні', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/sealed.jpg', alt: 'Бетонний блок із замурованими документами' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/strips.jpg', alt: 'Підвішені прозорі смуги зі світлом і тінями', credit: 'Петро Чекаль' },
      { src: '/media/projects/pokazhit-svoi-dokumenty/tv.jpg', alt: 'Два телевізори з відеороботами', credit: 'Петро Чекаль' }
    ]
  },
  {
    slug: 'istorii-riznykh',
    title: 'Історії різних',
    yearStart: 2025,
    city: 'Київ',
    kind: 'single',
    status: 'completed',
    role: 'organizer',
    formats: ['playback', 'performance'],
    directions: ['art', 'mental-health'],
    tone: 'plum',
    motif: 'curtain',
    summary: 'Плейбек-перформанс, у якому актори відіграли історії глядачів.',
    body: [
      'Плейбек-перформанс в Арсеналі ідей. Плейбек-театр з 2014 року активно застосовується в Україні як інструмент психосоціальної підтримки.',
      'Роботу з плейбек-театром продовжує проєкт [[project:holosy-u-rusi]].'
    ],
    start: '2025-09-20',
    venue: { name: 'Арсенал ідей', city: 'Київ' },
    related: ['holosy-u-rusi']
  },
  {
    slug: 'mhgap-kyiv',
    title: 'Тренінги mhGAP на Київщині',
    yearStart: 2025,
    city: 'Київська область',
    kind: 'long',
    status: 'completed',
    role: 'organizer',
    formats: ['training'],
    directions: ['mental-health'],
    tone: 'lilac',
    motif: 'breath',
    summary: 'Навчання медпрацівників первинної ланки за програмою ВООЗ з психічного здоров’я.',
    body: [
      'mhGAP — програма дій ВООЗ з подолання прогалин у галузі психічного здоров’я на первинній ланці охорони здоров’я.',
      'З лютого по травень 2025 року «Символ» провів три п’ятиденні й один чотириденний тренінг для медпрацівників первинної ланки Київщини, з проживанням, харчуванням і посібниками для учасників. Після навчання учасники отримували онлайн-супервізію від кваліфікованих спеціалістів.'
    ],
    people: [{ person: 'yurii-rassokha', role: 'Менеджер проєкту' }],
    donors: ['mh4u'],
    donorCredit: 'Проєкт реалізовано за донорської підтримки українсько-швейцарського проєкту «Психічне здоров’я для України».'
  },
  {
    slug: 'ti-khto-pobachyly-svit',
    title: 'Ті, хто побачили світ',
    yearStart: 2026,
    city: 'Мілан',
    country: 'Італія',
    kind: 'single',
    status: 'completed',
    role: 'organizer',
    formats: ['exhibition'],
    directions: ['art'],
    tone: 'apricot',
    motif: 'aperture',
    summary: 'Фотовиставка Петра Чекаля та Юрія Рассохи на Фестивалі української книги в Мілані.',
    body: [
      'The Ones Who Saw the World / Coloro che hanno visto il mondo — довге й уважне спостереження за Україною в часі змін. Світлини зроблені майже в усіх регіонах країни: у містах, селах, на околицях, у просторах повсякдення й у місцях, позначених війною. Разом вони складають не географічну мапу, а внутрішній портрет країни.',
      'Проєкт водночас досліджує саму фотографію: колір, ритм, фактуру й композицію — як фотографічна мова може не лише фіксувати реальність, а й інтерпретувати її. На фестивалі показали 20 робіт.',
      'Фестиваль української книги в Мілані, Villa Scheibler, 30–31 травня 2026 року, на запрошення асоціації Ucraina Più – Milano APS.'
    ],
    people: [
      { person: 'petro-chekal', role: 'Автори фотографій' },
      { person: 'yurii-rassokha', role: 'Автори фотографій' }
    ],
    partners: ['ucraina-piu'],
    start: '2026-05-30',
    end: '2026-05-31',
    venue: { name: 'Villa Scheibler', city: 'Мілан', country: 'Італія' }
  },
  {
    slug: '2-10-300',
    title: '2, 10, 300 років потому',
    yearStart: 2024,
    city: 'Балашадьярмат',
    country: 'Угорщина',
    kind: 'single',
    status: 'completed',
    role: 'organizer',
    formats: ['exhibition'],
    directions: ['art'],
    tone: 'apricot',
    motif: 'time',
    summary: 'Виставка просто неба з роботами митців зі сходу України.',
    body: [
      'Виставка просто неба в Балашшадьярматі, Угорщина, у якій зібрані роботи митців зі сходу України. Проєкт представляв мистецький контекст Східної України європейській аудиторії й розповідав, як люди проживають війну через мистецтво.',
      'Виставка відбулася в межах волонтерства Європейського корпусу солідарності у співпраці з ГО «Символ».'
    ],
    people: [
      { person: 'hanna-franyk', role: 'Кураторка' },
      { person: 'petro-chekal', role: 'Співавтор проєкту' },
      { person: 'yurii-rassokha', role: 'Учасник, асистент кураторки' }
    ],
    start: '2024-04-26',
    end: '2024-04-28',
    venue: { city: 'Балашадьярмат', country: 'Угорщина' }
  },
  {
    slug: 'kharkivske-more',
    title: 'Харківське море',
    yearStart: 2024,
    yearEnd: 2026,
    city: 'Харків',
    kind: 'long',
    status: 'completed',
    role: 'partner',
    formats: ['festival'],
    directions: ['culture', 'art'],
    tone: 'violet',
    motif: 'sea',
    summary: 'Незалежний мультидисциплінарний фестиваль локальної культури. «Символ» — партнер фестивалю.',
    body: [
      'Фестиваль досліджує ідентичність Харкова в умовах війни й працює з темами міської ідентичності, пам’яті та досвіду через мистецькі практики.',
      '«Символ» — партнер фестивалю, не організатор.'
    ]
  },
  {
    slug: 'zbyrach-konvalii',
    title: 'Збирач конвалій',
    yearStart: 2023,
    city: 'Харків',
    kind: 'long',
    status: 'completed',
    role: 'organizer',
    formats: ['film'],
    directions: ['art'],
    tone: 'plum',
    motif: 'film',
    summary: 'Документальний фільм про фотографа Харківської школи фотографії Олександра Супруна.',
    body: [
      'Фільм розповідає про художника Харківської школи фотографії Олександра Супруна.',
      'Нагорода: найкраща операторська робота від Media Development Foundation.'
    ],
    people: [
      { person: 'petro-chekal', role: 'Продюсер, оператор' },
      { person: 'vero-yuzepchuk', role: 'Режисерка' },
      { person: 'ivan-samoilov', role: 'Оператор' },
      { person: 'maksym-koval', role: 'Звукорежисер' },
      { person: 'diana-horbenko', role: 'Дизайнерка' }
    ]
  }
]
