import { defineDs } from '../types'

export default defineDs({
  name: 'PersonCard',
  title: 'Картка людини',
  category: 'content',
  status: 'stable',
  summary: 'Людина з команди: фото, імʼя, роль, коротка біографія, контакти. Без фото — орбіта в тональному колі.',
  use: ['Сторінка «Про нас», блок команди.', 'Тільки підтверджені ролі й біографії: імʼя та роль приходять із даних, які дала організація.', 'У сітці SymGrid; на широкому контейнері фото стоїть ліворуч від тексту.'],
  avoid: ['Цитата людини — SymQuote.', 'Партнери й донори — SymLogoWall.', 'Вигадані ролі чи біографії: поки немає підтвердження, показуйте лише імʼя.', 'Картка з посиланням на весь профіль — SymCard.'],
  examples: [
    { file: 'Placeholder', title: 'Без фото', description: 'Орбіта в колі, поки фото немає. Імена тут — умовні.' },
    { file: 'WithLinks', title: 'З контактами', description: 'Посилання мають зону натискання 44 px; зовнішні відкриваються в новій вкладці.' },
    { file: 'Team', title: 'Команда сіткою', description: 'Три колонки на широкому, одна на телефоні.' },
  ],
  playground: { props: { name: { type: 'text', default: 'Ім’я Прізвище' }, role: { type: 'text', default: 'Роль у команді' }, bio: { type: 'text', default: 'Кілька речень про людину, яка працює в команді.' }, tone: { type: 'select', options: ['lilac', 'apricot', 'violet', 'plum', 'white', 'paper'], default: 'lilac' } } },
  a11y: ['Це <article>; імʼя — заголовок (level).', 'Фото має alt; якщо імʼя стоїть поруч і alt дублював би його, можна decorative.', 'Заглушка з орбітою — aria-hidden.', 'Контакти — список справжніх посилань із видимим текстом (не лише іконка).', 'Роль написана текстом, не залежить від кольору.'],
  motion: ['Не рухається; для появи сітки обгорніть її в SymReveal.'],
  tokens: ['--sym-fg / --sym-fg-muted', '--sym-bg', '--sym-accent (орбіта)', '--sym-space-*', '--sym-size-touch', '.sym-t-title-lg', '.sym-t-label', '.sym-t-body-sm'],
  related: ['Media', 'Card', 'Grid'],
})
