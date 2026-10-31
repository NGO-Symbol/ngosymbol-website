const en: Record<string, string> = {
  'Головна': 'Home',
  'Проєкти': 'Projects',
  'Події': 'Events',
  'Можливості': 'Opportunities',
  'Люди': 'People',
  'Про нас': 'About',
  'Новини': 'News',
  'Для медіа': 'Press',
  'Підтримати': 'Support',
  'Контакти': 'Contact',
  'Виставка': 'Exhibition', 'Онлайн-виставка': 'Online exhibition', 'Фестиваль': 'Festival',
  'Вистава': 'Theatre', 'Перформанс': 'Performance', 'Плейбек': 'Playback theatre', 'Резиденція': 'Residency',
  'Презентація': 'Presentation', 'Опен-кол': 'Open call', 'Лекція': 'Lecture', 'Концерт': 'Concert',
  'Конференція': 'Conference', 'Кінопоказ': 'Screening', 'Фільм': 'Film', 'Екскурсія': 'Tour',
  'Дискусія': 'Discussion', 'Воркшоп': 'Workshop', 'Тренінг': 'Training', 'Аукціон': 'Auction',
  'Артісток': 'Artist talk', 'Відкриття': 'Opening', 'Дослідження': 'Research',
  'Сучасне мистецтво': 'Contemporary art', 'Міська культура і пам’ять': 'Urban culture and memory',
  'Психічне здоров’я': 'Mental health', 'Анонс': 'Announced', 'Запускається': 'Launching',
  'Триває': 'Ongoing', 'Завершено': 'Completed',
  'Куратори': 'Curators', 'Куратор': 'Curator', 'Кураторка': 'Curator', 'Митці': 'Artists', 'Митець': 'Artist',
  'Менеджерка': 'Manager', 'Менеджерка проєкту': 'Project manager', 'Менеджер проєкту': 'Project manager',
  'Тренери': 'Trainers', 'Фотограф': 'Photographer', 'Фотографи': 'Photographers', 'Актор': 'Actor',
  'Музика': 'Music', 'Команда проєкту': 'Project team', 'Автор перформансу': 'Performance artist',
  'Автори фотографій': 'Photographers', 'Голова експертної ради': 'Chair of the expert council',
  'Головна ілюстраторка': 'Lead illustrator', 'Головний дизайнер': 'Lead designer', 'Комунікація': 'Communications',
  'Асистентка проєкту': 'Project assistant', 'Програмний менеджер, куратор': 'Programme manager and curator',
  'Менеджер проєкту, куратор': 'Project manager and curator', 'Продюсер, оператор': 'Producer and cinematographer',
  'Режисерка': 'Director', 'Оператор': 'Cinematographer', 'Звукорежисер': 'Sound engineer', 'Дизайнерка': 'Designer',
  'Співавтор проєкту': 'Project co-author', 'Асистент кураторки': 'Assistant curator',
  'Дизайн айдентики та шрифт EXDocument': 'Identity design and EXDocument typeface',
  'Координація від ЄрміловЦентру': 'YermilovCentre coordination', 'Згадка': 'Mention'
}

/** English for a known interface word, or the Ukrainian original. */
export const translate = (uk: string, toEn: boolean) => (toEn ? en[uk] ?? uk : uk)

const places: Record<string, string> = {
  'Харків': 'Kharkiv', 'Київ': 'Kyiv', 'Закарпаття': 'Zakarpattia', 'Київська область': 'Kyiv Region',
  'Мілан': 'Milan', 'Італія': 'Italy', 'Угорщина': 'Hungary', 'Балашадьярмат': 'Balassagyarmat',
  'Біла Церква': 'Bila Tserkva', 'Берегове': 'Berehove', 'Ужгород': 'Uzhhorod',
  'майдан Свободи, 4': '4 Svobody Square', 'ЄрміловЦентр': 'YermilovCentre'
}

export const translatePlace = (value: string | undefined, toEn: boolean) => value && toEn ? (places[value] ?? value) : value

const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const formatDateEn = (iso: string, withYear = true) => {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number)
  return `${day} ${monthsEn[month! - 1]}${withYear ? ` ${year}` : ''}`
}

export const formatRangeEn = (start: string, end?: string) => {
  const time = start.length > 10 ? `, ${start.slice(11, 16)}${end && end.length > 10 ? `–${end.slice(11, 16)}` : ''}` : ''
  if (!end || end.slice(0, 10) === start.slice(0, 10)) return `${formatDateEn(start)}${time}`
  const sameYear = start.slice(0, 4) === end.slice(0, 4)
  return `${formatDateEn(start, !sameYear)} — ${formatDateEn(end)}`
}
