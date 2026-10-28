import { defineDs } from '../types'

export default defineDs({
  name: 'EmptyState',
  title: 'Порожній стан',
  category: 'content',
  status: 'stable',
  summary: 'Спокійний блок для місця, де поки нічого немає: «Події скоро з’являться». Заголовок, речення і за потреби дія.',
  use: ['Список подій, новин чи проєктів без записів.', 'Результат фільтра без збігів: скажіть, що змінити (дія «Скинути фільтри»).', 'Коротко й доброзичливо: що тут буде й що робити далі.'],
  avoid: ['Помилка завантаження чи 404 — окрема сторінка/повідомлення про помилку.', 'Заклик до дії всієї сторінки — SymCallout.', 'Тимчасове оголошення — SymBanner.', 'Порожній блок, який просто ховається: якщо контенту не буде, не показуйте розділ.'],
  examples: [
    { file: 'Basic', title: 'Подій ще немає', description: 'Заголовок, пояснення і одна дія.' },
    { file: 'Filtered', title: 'Нічого не знайдено', description: 'Без орбіти, на lilac: компактніший варіант для фільтрів.' },
  ],
  playground: { props: { title: { type: 'text', default: 'Події скоро з’являться' }, text: { type: 'text', default: 'Ми ще готуємо розклад. Загляньте трохи згодом.' }, orbit: { type: 'boolean', default: true }, tone: { type: 'select', options: ['lilac', 'apricot', 'violet', 'plum', 'white', 'paper'], default: 'lilac' } } },
  a11y: ['Заголовок — справжній h-елемент (level).', 'Орбіта — aria-hidden; весь зміст — текст.', 'Не оголошується як помилка (немає role="alert").', 'Кнопки в слоті actions мають ≥ 44 px.'],
  motion: ['Не рухається.'],
  tokens: ['--sym-rule', '--sym-fg / --sym-fg-muted / --sym-bg', '--sym-accent (орбіта)', '--sym-space-*', '.sym-t-title-lg'],
  related: ['Callout', 'Banner', 'Button'],
})
