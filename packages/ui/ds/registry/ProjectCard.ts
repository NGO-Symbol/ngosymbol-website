import { defineDs } from '../types'

export default defineDs({
  name: 'ProjectCard',
  title: 'Картка проєкту',
  category: 'content',
  status: 'stable',
  summary: 'Проєкт у списку: період і статус зверху, тональна площина з орбітою, напрям, назва й короткий опис. Вся картка — одне посилання.',
  use: ['Список проєктів на головній і на сторінці «Проєкти».', 'Проєкт із власним сайтом: external додає «Окремий сайт ↗».', 'Сітка 2–3 колонки через SymGrid; висота карток вирівнюється сама.'],
  avoid: ['Подія чи новина — окремий компонент (не картка проєкту).', 'Усередині іншої картки: не вкладайте картку в картку.', 'Картка без посилання, яка нічого не відкриває, — SymCard.', 'Не передавайте об’єкт проєкту з даних сайту: компонент приймає поля.'],
  examples: [
    { file: 'States', title: 'Статуси', description: 'Запускається, триває, завершено: текст завжди є, форма крапки лише підказує.' },
    { file: 'Tones', title: 'Тони й окремий сайт', description: 'Картка на різних тонах; external додає підпис «Окремий сайт ↗».' },
    { file: 'List', title: 'Сітка проєктів', description: 'Три колонки на широкому контейнері, одна на вузькому.' },
  ],
  playground: { props: { tone: { type: 'select', options: ['white', 'paper', 'lilac', 'violet', 'apricot', 'plum'], default: 'violet' }, status: { type: 'select', options: ['launching', 'ongoing', 'completed'], default: 'ongoing' }, external: { type: 'boolean' }, orbit: { type: 'boolean', default: true }, title: { type: 'text', default: 'Назва проєкту' }, summary: { type: 'text', default: 'Короткий опис проєкту в одне-два речення.' }, period: { type: 'text', default: '2025 — триває' }, direction: { type: 'text', default: 'Напрям' } }, fixed: { href: '#' } },
  states: [
    { label: 'запускається', props: { title: 'Назва проєкту', period: '2026', status: 'launching', direction: 'Напрям', summary: 'Короткий опис.', href: '#', tone: 'lilac' } },
    { label: 'триває', props: { title: 'Назва проєкту', period: '2025 — триває', status: 'ongoing', direction: 'Напрям', summary: 'Короткий опис.', href: '#', tone: 'apricot' } },
    { label: 'завершено, окремий сайт', props: { title: 'Назва проєкту', period: '2023–2024', status: 'completed', direction: 'Напрям', summary: 'Короткий опис.', href: '#', external: true, tone: 'plum' } },
  ],
  keyboard: [{ keys: 'Tab', action: 'Фокус на картку (видиме кільце навколо всієї картки).' }, { keys: 'Enter', action: 'Відкрити проєкт.' }],
  a11y: ['Вся картка — один <a>; назва проєкту є заголовком (level) усередині посилання, тож читач екрана оголошує «посилання, заголовок …».', 'Статус завжди написаний словами; форма крапки (коло, кільце, ромб) лише доповнює.', 'Орбіта й підпис «Сторінка проєкту / Окремий сайт» — декоративні (aria-hidden), текст посилання — назва.', 'Зовнішній сайт отримує приховане «(відкриється в новій вкладці)».', 'Зона натискання — вся картка.'],
  motion: ['Наведення: підйом на 5 px × --sym-motion-travel (small), орбіта зсувається (medium). Зі зменшеним рухом — без зсуву.'],
  tokens: ['--sym-rule', '--sym-fg / --sym-bg', '--sym-accent', '--sym-pad-card', '--sym-shape-card', '--sym-t-small', '--sym-motion-travel', '.sym-t-title-lg'],
  related: ['Card', 'Grid', 'Orbit', 'Tag'],
})
