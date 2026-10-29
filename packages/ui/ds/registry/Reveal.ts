import { defineDs } from '../types'

export default defineDs({
  name: 'Reveal', title: 'Поява при прокрутці', category: 'motion', status: 'stable',
  summary: 'Блок з’являється один раз, коли досягає екрана: трохи підіймається й проявляється. Без JavaScript усе видно одразу.',
  use: ['Обгорнути блок (картку, зображення, абзац), що з’являється нижче першого екрана.', 'kind="wipe" для зображень, "fade" коли зсув недоречний.'],
  avoid: ['Обгортати кожен дрібний елемент окремо.', 'Анімувати те, що вже на першому екрані: воно й так пропускається.', 'Приховувати важливий зміст: пошуковики й друк бачать його завжди.'],
  examples: [{ file: 'Kinds', title: 'Три види', description: 'Прокрутіть: rise, fade і wipe. Ті, що з’явилися разом, йдуть по черзі.', stage: false }],
  a11y: ['Контент у HTML видимий без JS; анімація не блокує читання.', 'Reduced motion: зсув → просте проявлення; wipe → fade.'], motion: ['rise: large-in (350 мс) + fx-hero; wipe: hero (700 мс).', 'Черга між сусідами: 60 мс, не більше 6 кроків.'], tokens: ['--sym-reveal-distance', '--sym-stagger', '--sym-motion-travel'], related: ['Section'],
})
