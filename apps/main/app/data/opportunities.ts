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
  }
]
