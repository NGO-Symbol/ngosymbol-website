import type { Photo } from './types'

// «Кадри»: a curated pool of the strongest photographs of Symbol's work for the home page (chosen 2026-10-29 at the
// team's request): by Петро Чекаль and Іван Самойлов (mhGAP trainings, «Покажіть свої документи…», stills of
// «Збирач конвалій») and performances. Each visit shows a different random selection from this pool, so only
// photos good enough to stand alone belong here. A credit is shown only where the author is recorded.
export interface Highlight extends Photo { to: string; project: string }

export const highlights: Highlight[] = [
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-024.jpg', alt: 'Інсталяція: розлітні аркуші документів над кріслом і килимом', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-128.jpg', alt: 'Світлова інсталяція «Документ» Костянтина Гливляса в темному залі', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-104.jpg', alt: 'Глядачка біля манекена в сукні з проєкту «Сучасна мода»', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-176.jpg', alt: 'Виставка в ЄрміловЦентрі — вигляд згори', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/light.jpg', alt: 'Світлова інсталяція в темному залі', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/projects/zbyrach-konvalii/archive.jpg', alt: 'Фотограф гортає свої знімки', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', project: 'Збирач конвалій' },
  { src: '/media/events/mhgap-kyiv-trening-1/practice.jpg', alt: 'Практична вправа в парах на тренінгу mhGAP', credit: 'Петро Чекаль', to: '/projects/mhgap-kyiv', project: 'Тренінги mhGAP' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/passports-wall.jpg', alt: 'Ряди червоних паспортів на стіні', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/events/pokazhit-svoi-dokumenty-kvero/violin.jpg', alt: 'Скрипалька серед паперових аркушів під час перформансу In C', to: '/events/pokazhit-svoi-dokumenty-kvero', project: 'Перформанс KVERO «In C»' },
  { src: '/media/projects/zbyrach-konvalii/silhouette.jpg', alt: 'Силует у кімнаті з червоним світлом', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', project: 'Збирач конвалій' },
  { src: '/media/events/mhgap-kyiv-trening-4/lecture.jpg', alt: 'Тренер пояснює модуль mhGAP біля презентації', credit: 'Петро Чекаль', to: '/projects/mhgap-kyiv', project: 'Тренінги mhGAP' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/strips.jpg', alt: 'Підвішені прозорі смуги зі світлом і тінями', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/events/pokazhit-svoi-dokumenty-pleibek/actors.jpg', alt: 'Актори плейбек-театру «Нема» відіграють історію глядача', to: '/events/pokazhit-svoi-dokumenty-pleibek', project: 'Плейбек-перформанс' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/carpet.jpg', alt: 'Інсталяція: килим на стіні, крісло й розлітні аркуші документів', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/events/mhgap-kyiv-trening-3/trainer.jpg', alt: 'Тренер mhGAP біля презентації', credit: 'Петро Чекаль', to: '/projects/mhgap-kyiv', project: 'Тренінги mhGAP' },
  { src: '/media/projects/zbyrach-konvalii/room.jpg', alt: 'Стіна з фотографіями й предметами в квартирі фотографа', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', project: 'Збирач конвалій' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/tv.jpg', alt: 'Два телевізори з відеороботами', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/events/mhgap-kyiv-trening-1/group.jpg', alt: 'Учасники першого тренінгу mhGAP у Білій Церкві', credit: 'Петро Чекаль', to: '/projects/mhgap-kyiv', project: 'Тренінги mhGAP' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/plates.jpg', alt: 'Паспорти на тарілках уздовж довгого столу', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/sealed.jpg', alt: 'Бетонний блок із замурованими документами', to: '/projects/pokazhit-svoi-dokumenty', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/opening-performance.jpg', alt: 'Перформанс на відкритті виставки «Покажіть свої документи…»', to: '/events/pokazhit-svoi-dokumenty-vidkryttia', project: 'Відкриття виставки' },
  { src: '/media/projects/istorii-riznykh/reach.jpg', alt: 'Акторки тягнуться одна до одної в сцені', to: '/projects/istorii-riznykh', project: 'Історії різних' },
  { src: '/media/projects/istorii-riznykh/performance.jpg', alt: 'Плейбек-перформанс «Історії різних»: акторка відіграє історію глядача', to: '/projects/istorii-riznykh', project: 'Історії різних' },
  { src: '/media/projects/istorii-riznykh/care.jpg', alt: 'Сцена турботи між акторами', to: '/projects/istorii-riznykh', project: 'Історії різних' },
  { src: '/media/events/pokazhit-svoi-dokumenty-kvero/flute.jpg', alt: 'Флейтистка під час виконання In C', to: '/events/pokazhit-svoi-dokumenty-kvero', project: 'Перформанс KVERO «In C»' },
  { src: '/media/events/pokazhit-svoi-dokumenty-kvero/double-bass.jpg', alt: 'Контрабасист на тлі робіт виставки', to: '/events/pokazhit-svoi-dokumenty-kvero', project: 'Перформанс KVERO «In C»' },
  { src: '/media/projects/zbyrach-konvalii/newspapers.jpg', alt: 'Газети й знімки з архіву фотографа', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', project: 'Збирач конвалій' }
]

/** How many photos the home page shows at once. */
export const highlightsShown = 14

/** Light preview for the strip (public/media/thumbs, 720 px); the full photo opens only in the viewer. */
export const thumbOf = (src: string) => src.replace(/^\/media\//, '/media/thumbs/')

/**
 * A fresh selection for each visit that mixes projects: photos are shuffled within each project, then taken from
 * the projects in turn, so neighbouring frames never come from the same project.
 */
export function pickHighlights(pool: Highlight[] = highlights, count = highlightsShown) {
  const shuffle = <T>(list: T[]) => { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j]!, a[i]!] } return a }
  const groups = shuffle([...new Set(pool.map(photo => photo.project))]).map(project => shuffle(pool.filter(photo => photo.project === project)))
  const picked: Highlight[] = []
  while (picked.length < count && groups.some(group => group.length)) for (const group of groups) if (group.length && picked.length < count) picked.push(group.shift()!)
  return picked
}
