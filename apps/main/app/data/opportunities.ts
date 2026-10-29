import type { Opportunity } from './types'

// Active opportunities (deadline today or later) appear on Home and at the top of /opportunities.
export const opportunities: Opportunity[] = [
  {
    slug: 'pokazhit-svoi-dokumenty-open-call',
    title: 'Опен-кол для митців: виставка «Покажіть свої документи…»',
    type: 'open-call',
    project: 'pokazhit-svoi-dokumenty',
    deadline: '2025-07-20',
    description: [
      'Відкритий конкурс для митців, які працюють із документом як матеріалом, символом, традицією чи пам’яттю. Опен-кол тривав з 19 червня до 20 липня 2025 року.',
      'Половину учасників виставки в ЄрміловЦентрі відібрали через опен-кол, іншу половину запросили куратори.'
    ]
  },
  // mhGAP registration (Google Forms of ngo.symbol / Юрій Рассоха, both closed). The forms state no deadline, so the
  // date shown is the start of the last training each form enrolled for.
  {
    slug: 'mhgap-kyiv-reiestratsiia-1',
    title: 'Реєстрація на тренінги mhGAP (частина 1) для медпрацівників Київщини',
    type: 'open-call',
    project: 'mhgap-kyiv',
    deadline: '2025-03-31',
    description: [
      'Набір на п’ятиденні тренінги за програмою ВООЗ mhGAP від ГО «Символ»; донор — проєкт «Психічне здоров’я для України». Запрошували працівників **первинної медичної допомоги** Київщини — сімейних лікарів, медсестер, педіатрів — а також психологів і соціальних працівників.',
      'Учасники обирали дати й місце: Біла Церква (10–14 і 24–28 лютого 2025) або Київ (31 березня — 4 квітня 2025); присутність обов’язкова всі п’ять днів, за потреби — поселення в готелі. Після тренінгу — онлайн-супервізії з тренерами.'
    ]
  },
  {
    slug: 'mhgap-kyiv-reiestratsiia-2',
    title: 'Реєстрація на другу частину тренінгу mhGAP',
    type: 'open-call',
    project: 'mhgap-kyiv',
    deadline: '2025-05-13',
    description: [
      'Набір на другу частину програми mhGAP — психози, епілепсія, дитячі та підліткові розлади, деменція — для тих, хто вже пройшов **очний тренінг першої частини** (до форми додавали сертифікат).',
      'Тренінг відбувся 13–16 травня 2025 року в книгарні-кав’ярні «Сенс» у Києві.'
    ]
  }
]
