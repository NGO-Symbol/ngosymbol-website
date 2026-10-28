import { defineDs } from '../types'

export default defineDs({
  name: 'Stat',
  title: 'Показник',
  category: 'text',
  status: 'stable',
  summary: 'Одне число з поясненням: великий серифний нумерал, що він означає і звідки взято. Джерело обов’язкове.',
  use: ['Підтверджені цифри з відкритого звіту чи реєстру: у сітці по 3–4 (SymGrid, phoneCols 2).', 'size l для одного-двох ключових чисел.', 'unit для одиниці: «%», «тис.», «років».'],
  avoid: ['Будь-які цифри без перевіреного джерела: компонент нарочито вимагає source.', 'Прогрес чи графік — це окремий компонент даних.', 'Дата чи номер як ефектний елемент без змісту.'],
  examples: [
    { file: 'Row', title: 'Ряд показників', description: 'Усі значення ілюстративні, джерело в підписі: «приклад, не реальні дані».' },
    { file: 'Large', title: 'Велике число', description: 'size l для головного числа секції.' },
  ],
  playground: { props: { value: { type: 'text', default: '00' }, unit: { type: 'text', default: '' }, label: { type: 'text', default: 'Що саме порахували' }, source: { type: 'text', default: 'приклад, не реальні дані' }, size: { type: 'select', options: ['m', 'l'], default: 'm' } } },
  keyboard: [],
  a11y: ['figure + figcaption: число, потім пояснення і джерело; скрінрідер читає все разом.', 'Числа з табличними цифрами не «стрибають» при зміні.', 'Джерело видиме завжди, не лише в підказці.'],
  motion: ['Немає: числа не «накручуються». Для появи при прокрутці — SymReveal.'],
  tokens: ['--sym-text-headline-lg', '--sym-text-display', '--sym-rule', '--sym-fg-muted', '--sym-text-caption'],
  related: ['Grid', 'MetaList'],
})
