// Format vocabulary. Only formats used by at least one project or event are shown in filters.
export const formats: Record<string, string> = {
  exhibition: 'Виставка',
  'online-exhibition': 'Онлайн-виставка',
  festival: 'Фестиваль',
  play: 'Вистава',
  performance: 'Перформанс',
  playback: 'Плейбек',
  residency: 'Резиденція',
  presentation: 'Презентація',
  'open-call': 'Опен-кол',
  lecture: 'Лекція',
  concert: 'Концерт',
  conference: 'Конференція',
  screening: 'Кінопоказ',
  film: 'Фільм',
  tour: 'Екскурсія',
  discussion: 'Дискусія',
  workshop: 'Воркшоп',
  training: 'Тренінг',
  auction: 'Аукціон',
  'artist-talk': 'Артісток',
  opening: 'Відкриття',
  research: 'Дослідження'
}

export const directions: Record<string, string> = {
  art: 'Сучасне мистецтво',
  culture: 'Міська культура і пам’ять',
  'mental-health': 'Психічне здоров’я'
}

export const statusLabels: Record<string, string> = {
  planned: 'Анонс',
  launching: 'Запускається',
  ongoing: 'Триває',
  completed: 'Завершено'
}
