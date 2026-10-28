import type { Person } from './types'

// Team bios come from the 2024 presentation (EXTRACTED) and need confirmation before publication.
// Team titles other than the head are not confirmed yet (documents/knowledge/open-questions.md).
export const people: Person[] = [
  {
    slug: 'yurii-rassokha',
    name: 'Юрій Рассоха',
    team: true,
    teamOrder: 1,
    teamRole: 'Голова організації',
    shortBio: 'Куратор, менеджер культурних проєктів, міждисциплінарний митець і культуролог.',
    bio: [
      'Куратор, менеджер культурних проєктів, міждисциплінарний митець і культуролог. Менеджер проєкту [[project:mhgap-kyiv|тренінгів mhGAP на Київщині]].',
      'Виставка [[project:pokazhit-svoi-dokumenty]] виросла з його дослідження «Ведення документації як ритуал: культурологічний аналіз».'
    ]
  },
  {
    slug: 'petro-chekal',
    name: 'Петро Чекаль',
    team: true,
    teamOrder: 2,
    shortBio: 'Фотограф, оператор, арт-менеджер, куратор виставок.',
    bio: [
      'Фотограф, оператор, арт-менеджер. Куратор виставок «Кераміст» (2021, Харків) та «У пошуках дому» (2022, Львів), учасник понад 15 групових виставок.',
      'Продюсер та оператор фільму [[project:zbyrach-konvalii]].'
    ]
  },
  {
    slug: 'hanna-franyk',
    name: 'Ганна Франик',
    team: true,
    teamOrder: 3,
    shortBio: 'Артменеджерка, міждисциплінарна мисткиня, модераторка груп самопідтримки.',
    bio: [
      'Артменеджерка та міждисциплінарна мисткиня, модераторка психосоціальних груп самопідтримки за методом інтегративної терапії спільнот.',
      'Кураторка виставки [[project:2-10-300]].'
    ]
  },
  {
    slug: 'olena-mordyk',
    name: 'Олена Мордик',
    team: true,
    teamOrder: 4
  },

  // «Збирач конвалій» crew (presentation 2024)
  { slug: 'vero-yuzepchuk', name: 'Веро Юзепчук', hasPage: false },
  { slug: 'ivan-samoilov', name: 'Іван Самойлов', hasPage: false },
  { slug: 'maksym-koval', name: 'Максим Коваль', hasPage: false },
  { slug: 'diana-horbenko', name: 'Діана Горбенко', hasPage: false },

  // Artists of «Покажіть свої документи…» (saved project site, 2025)
  {
    slug: 'pavlo-makov',
    name: 'Павло Маков',
    shortBio: 'Український художник, лауреат Національної премії імені Тараса Шевченка (2018).',
    bio: [
      'Український художник, дійсний член Національної академії мистецтв України, лауреат Національної премії імені Тараса Шевченка (2018). Живе і працює в Харкові.',
      'У 2022 році представив Україну на Венеційській бієнале з проєктом «Фонтан виснаження. Висока вода».',
      'У виставці [[project:pokazhit-svoi-dokumenty]] показав проєкт «Утопія. Хроніки».'
    ]
  },
  { slug: 'oleh-tistol', name: 'Олег Тістол' },
  { slug: 'roman-piatkovka', name: 'Роман Пятковка' },
  { slug: 'serhii-melnychenko', name: 'Сергій Мельниченко' },
  { slug: 'oleksii-sai', name: 'Олексій Сай' },
  { slug: 'volodymyr-kuznietsov', name: 'Володимир Кузнецов' },
  { slug: 'alina-prokopenko', name: 'Аліна Прокопенко (Apris)' },
  { slug: 'andrii-skrypka', name: 'Андрій Скрипка' },
  { slug: 'anna-hareieva', name: 'Анна Гареєва' },
  { slug: 'anton-kariuk', name: 'Антон Карюк' },
  { slug: 'vira-pakosh', name: 'Віра Пакош' },
  { slug: 'dara-sholokh', name: 'Дара Шолох' },
  { slug: 'yeva-fomitski', name: 'Єва Фоміцкі' },
  { slug: 'kinich-azla', name: 'Kinich Azla (Вероніка Ліпатова)' },
  { slug: 'kostiantyn-hlyvlias', name: 'Костянтин Гливляс' },
  { slug: 'mariia-matiashova', name: 'Марія Матяшова' },
  { slug: 'mariia-prokopenko', name: 'Марія Прокопенко' },
  { slug: 'nataliia-okhman', name: 'Наталія Охман' }
]
