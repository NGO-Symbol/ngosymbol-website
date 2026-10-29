// Media about «Покажіть свої документи…» (found and checked 2026-10-29: every link opens and names the exhibition).
// Keep an archived copy of each in the organization's Drive: links disappear.
export interface PressItem { outlet: string; title: string; /** Publication date, only where the page states it. */ date?: string; url: string; kind: 'review' | 'announcement' | 'open-call' | 'listing' }

export const press: PressItem[] = [
  { outlet: 'Infocity', title: 'У Харкові проходить виставка «Покажіть свої документи…» (фото)', date: '2025-11-26', url: 'https://infocity.kharkiv.ua/obshchestvo/u-kharkovi-prokhodyt-vystavka-pokazhit-svoi-dokumenty-foto/', kind: 'review' },
  { outlet: 'Люк', title: 'Куди піти на вихідні у Харкові? Дайджест подій на 7–9 листопада', date: '2025-11-07', url: 'https://lyuk.media/news/events-na-7-9-of-november/', kind: 'listing' },
  { outlet: 'Суспільне Культура', title: 'Куди піти в листопаді: 12 виставок сучасного мистецтва, які варто відвідати', date: '2025-10-31', url: 'https://suspilne.media/culture/1152088-12-vistavok-sucasnogo-mistectva-so-vidvidati-v-listopadi/', kind: 'listing' },
  { outlet: 'Support Your Art', title: 'У Харкові відкривається виставка про документи як засіб пам’яті та самоствердження', date: '2025-10-15', url: 'https://supportyourart.com/news/u-harkovi-vidkryvayetsya-vystavka-pro-dokumenty-yak-zasib-pamyati-ta-samostverdzhennya/', kind: 'announcement' },
  { outlet: 'Люк', title: 'В «ЄрміловЦентрі» відкривається виставка «Покажіть свої документи…»', date: '2025-10-13', url: 'https://lyuk.media/news/show-your-documents/', kind: 'announcement' },
  { outlet: 'ЄрміловЦентр', title: 'Покажіть свої документи… — сторінка виставки', url: 'https://yermilovcentre.org/announcements/282/', kind: 'announcement' },
  { outlet: 'Центр прав людини ZMINA', title: 'Open Call на виставку сучасного мистецтва «Покажіть свої документи…»', date: '2025-06-23', url: 'https://zmina.info/announcements/open-call-na-vystavku-suchasnogo-mystecztva-pokazhit-svoyi-dokumenty/', kind: 'open-call' },
  { outlet: 'НАОМА', title: 'Open Call на виставку сучасного мистецтва «Покажіть свої документи…»', url: 'https://naoma.edu.ua/news/vystavky/open-call-na-vystavku-suchasnogo-mystecztva-pokazhit-svoyi-dokumenty/', kind: 'open-call' }
]
