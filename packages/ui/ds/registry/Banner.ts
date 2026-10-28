import { defineDs } from '../types'

export default defineDs({
  name: 'Banner',
  title: 'Оголошення',
  category: 'site',
  status: 'stable',
  summary: 'Тонка смуга над шапкою з одним реченням: новий проєкт, подія, зміна графіка. За потреби — посилання й кнопка закриття.',
  use: ['Коротке тимчасове оголошення на всіх сторінках.', 'href або to роблять речення посиланням зі стрілкою.', 'dismissible, коли оголошення може заважати; запам’ятовування вибору — справа сторінки (подія dismiss).'],
  avoid: ['Постійна навігація чи реклама — SiteHeader / SymCallout.', 'Помилки й попередження про дані — окремі повідомлення про помилку.', 'Кілька смуг одна під одною: лише одна.', 'Довгий текст: одне речення.'],
  examples: [
    { file: 'Link', title: 'З посиланням', description: 'Речення стає посиланням зі стрілкою.' },
    { file: 'Dismissible', title: 'Із закриттям', description: 'Кнопка закриття згортає смугу (medium); зі зменшеним рухом — лише згасає.' },
    { file: 'Tones', title: 'Тони', description: 'Apricot — основний, violet і plum — для сильніших повідомлень.' },
  ],
  playground: { props: { tone: { type: 'select', options: ['apricot', 'violet', 'plum', 'lilac', 'white', 'paper'], default: 'apricot' }, dismissible: { type: 'boolean' }, href: { type: 'text', default: '' } }, slot: 'Новий проєкт уже запускається: дізнайтеся більше.' },
  keyboard: [{ keys: 'Tab', action: 'Фокус на посилання, потім на кнопку закриття.' }, { keys: 'Enter / Space', action: 'Перейти за посиланням / закрити оголошення.' }],
  a11y: ['role="status": сучасні читачі екрана оголошують зміст ввічливо, без переривання.', 'Кнопка закриття має aria-label «Закрити оголошення» (dismissLabel) та зону 44 px.', 'Колір пари «тло + текст» береться з тону.', 'Зовнішнє посилання оголошується прихованим «(відкриється в новій вкладці)».', 'Смуга не перекриває контент: вона звичайна частина потоку.'],
  motion: ['Закриття: medium-out (висота згортається + прозорість); зі зменшеним рухом — лише прозорість.', 'Стрілка посилання зсувається на 3 px (micro).'],
  tokens: ['--sym-fg / --sym-bg (тон)', '--sym-page-margin', '--sym-size-touch', '--sym-t-medium-out', '--sym-t-fx-medium', '.sym-t-body-sm'],
  related: ['Callout', 'EmptyState', 'Button'],
})
