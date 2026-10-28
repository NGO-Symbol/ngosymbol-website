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
    summary: 'Виставка про документ як мистецький феномен: 20 митців у ЄрміловЦентрі.',
    body: [
      'Виставка досліджує документ як мистецький феномен, що виходить за межі його функціональної ролі. Документ тут — не лише механізм бюрократичного контролю, а й естетичний, ритуальний та соціальний артефакт.',
      'Учасники працювали з фотографією, текстом, живописом, колажем та перформативними практиками. У виставці взяли участь 20 митців, серед них [[person:pavlo-makov]], [[person:oleh-tistol]] і [[person:roman-piatkovka]].',
      'ЄрміловЦентр, Харків, 17 жовтня — 7 грудня 2025 року.'
    ],
    concept: [
      'У сучасному світі неможливо обійтися без роботи з документами. Документи супроводжують людину фактично від народження і до смерті. Ми звикли сприймати їх як самоочевидну складову соціуму, але документація знаходиться в культурно-історичному контексті, і її варто розглядати як щось плинне та варте критики.',
      'Офіційні документи — це інструменти влади. Вони не просто фіксують реальність, а й конструюють її, визначаючи, хто і як може бути представленим у соціальному просторі.'
    ],
    people: [
      { person: 'yurii-rassokha', role: 'Автор концепції' },
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
      { person: 'nataliia-okhman', role: 'Митці' }
    ],
    partners: ['yermilov-centre'],
    donors: ['president-grant', 'grynyov-art-foundation'],
    donorCredit: 'Виставка відбулася за підтримки Гранту Президента України для молодих митців та Grynyov Art Foundation.'
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
    summary: 'Виставка просто неба з роботами митців зі сходу України.',
    body: ['Виставка просто неба в Балашадьярматі, Угорщина, у якій зібрані роботи митців зі сходу України.'],
    people: [{ person: 'hanna-franyk', role: 'Кураторка' }],
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
