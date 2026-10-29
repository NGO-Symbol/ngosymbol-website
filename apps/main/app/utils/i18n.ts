// English for shared interface words (ADR-0009). Page texts are translated page by page; until a page is,
// the English mirror shows the Ukrainian text with a note (EnNotice).
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
  'Контакти': 'Contact'
}

/** English for a known interface word, or the Ukrainian original. */
export const translate = (uk: string, toEn: boolean) => (toEn ? en[uk] ?? uk : uk)
