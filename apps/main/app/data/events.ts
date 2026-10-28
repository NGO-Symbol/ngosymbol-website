import type { SymbolEvent } from './types'

// Every event belongs to a project (ADR-0006). Projects of kind 'single' are listed as events automatically.
export const events: SymbolEvent[] = [
  {
    slug: 'pokazhit-svoi-dokumenty-vidkryttia',
    title: 'Відкриття виставки «Покажіть свої документи…»',
    project: 'pokazhit-svoi-dokumenty',
    format: 'opening',
    start: '2025-10-17T18:00',
    end: '2025-10-17T20:00',
    venue: { name: 'ЄрміловЦентр', address: 'майдан Свободи, 4', city: 'Харків' },
    description: [
      'Урочисте відкриття виставки: промови кураторів, менеджерки, керівниці ЄрміловЦентру, ректора ХНУ ім. В. Н. Каразіна.'
    ]
  },
  {
    slug: 'pokazhit-svoi-dokumenty-ekskursiia',
    title: 'Кураторська екскурсія',
    project: 'pokazhit-svoi-dokumenty',
    format: 'tour',
    start: '2025-10-18T12:00',
    end: '2025-10-18T14:00',
    venue: { name: 'ЄрміловЦентр', address: 'майдан Свободи, 4', city: 'Харків' }
  }
]
