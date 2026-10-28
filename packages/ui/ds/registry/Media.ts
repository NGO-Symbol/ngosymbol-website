import { defineDs } from '../types'

export default defineDs({
  name: 'Media',
  title: 'Зображення',
  category: 'content',
  status: 'stable',
  summary: 'Фото чи ілюстрація із заданою пропорцією, підписом і джерелом. Без файлу показує тональну заглушку з орбітою.',
  use: ['Будь-яке зображення в тексті, на сторінці проєкту, у стрічці подій.', 'Місце під фото, якого ще немає: заглушка зберігає розкладку й каже, що має бути на знімку.', 'Підпис і автор знімка (credit) — вони обовʼязкові для чужих фото.'],
  avoid: ['Декоративна форма без змісту — SymOrbit.', 'Кілька знімків разом — SymGallery.', 'Фото людини з іменем і роллю — SymPersonCard.', 'Фон секції на всю ширину — Section з тоном.'],
  examples: [
    { file: 'Ratios', title: 'Пропорції', description: 'Рамка завжди займає своє місце ще до завантаження файлу, тож сторінка не стрибає.' },
    { file: 'Caption', title: 'Підпис і автор', description: 'Підпис ліворуч, автор праворуч на широкій колонці; на телефоні один під одним.' },
    { file: 'Reveal', title: 'Поява при прокручуванні', description: 'reveal відкриває зображення зверху вниз; зі зменшеним рухом — просто з’являється.' },
  ],
  playground: { props: { ratio: { type: 'select', options: ['16:9', '4:3', '1:1', '3:4', '21:9'], default: '16:9' }, fit: { type: 'select', options: ['cover', 'contain'], default: 'cover' }, alt: { type: 'text', default: 'Учасники зустрічі за столом' }, caption: { type: 'text', default: 'Підпис до знімка' }, credit: { type: 'text', default: 'Фото: Ім’я Прізвище' }, decorative: { type: 'boolean' }, reveal: { type: 'boolean' } } },
  states: [
    { label: '16:9', props: { alt: 'Учасники зустрічі', ratio: '16:9' } }, { label: '1:1', props: { alt: 'Квадратний знімок', ratio: '1:1' } }, { label: '3:4', props: { alt: 'Портретний знімок', ratio: '3:4' } },
    { label: 'з підписом', props: { alt: 'Знімок з підписом', caption: 'Підпис', credit: 'Фото: Ім’я Прізвище' } }, { label: 'lilac', props: { alt: 'Заглушка на lilac', tone: 'lilac' } }, { label: 'plum', props: { alt: 'Заглушка на plum', tone: 'plum' } },
  ],
  a11y: ['alt обовʼязковий: опишіть, що на знімку, а не «фото». Порожній alt дозволений лише разом з decorative.', 'Заглушка без файлу має role="img" і читається як alt.', 'Підпис — справжній figcaption, звʼязаний з figure.', 'Зображення завжди має співвідношення сторін (CSS aspect-ratio) або width/height: немає стрибка розкладки.', 'Якщо файл не завантажився, показується заглушка.'],
  motion: ['reveal: wipe, великий (hero) рівень, 700 мс; зі зменшеним рухом — fade.', 'Без reveal нічого не рухається.'],
  tokens: ['--sym-shape-media', '--sym-fg / --sym-bg (заглушка)', '--sym-accent (орбіта)', '--sym-space-*', '.sym-t-caption'],
  related: ['Gallery', 'PersonCard', 'Orbit', 'Reveal'],
})
