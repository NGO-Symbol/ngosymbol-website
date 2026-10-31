import type { Photo } from './types'
import { events } from './events'
import { eventTitleIn, projectTitleIn } from '~/utils/l10n'

// «Кадри»: a curated pool of the strongest photographs of Symbol's work for the home page (chosen 2026-10-29 at the
// team's request): by Петро Чекаль and Іван Самойлов (Kyiv mhGAP trainings; Bila Tserkva ones by Юрій Рассоха; «Покажіть свої документи…», stills of
// «Збирач конвалій») and performances. Each visit shows a different random selection from this pool, so only
// photos good enough to stand alone belong here. A credit is shown only where the author is recorded.
// Every caption names what the frame shows first and then the project it belongs to (USER_CONFIRMED 2026-10-29/30):
// an event by its slug in `event` (title taken from the events), otherwise a `label`: the artist and work for
// exhibition views (matched against the artist archive of the exhibition site), «Кадр із фільму» for film stills.
// Every frame also carries its English alt text and label (`altEn`, `labelEn`); the project and event titles come
// from the English data (utils/l10n.ts).
export interface Highlight extends Photo { to: string; project: string; event?: string; label?: string; altEn: string; labelEn?: string }

/** Caption under a frame: «Event or work · Project», in Ukrainian or English. */
export const highlightCaption = (photo: Highlight, toEn = false) => {
  const event = photo.event ? events.find(item => item.slug === photo.event) : undefined
  const what = (event && eventTitleIn(event, toEn)) || (toEn ? photo.labelEn : photo.label)
  const slug = event?.project ?? photo.to.match(/^\/projects\/([^/]+)/)?.[1]
  const project = toEn && slug ? projectTitleIn({ slug, title: photo.project }, true) : photo.project
  return what ? `${what} · ${project}` : project
}

export const highlights: Highlight[] = [
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-024.jpg', alt: 'Інсталяція «Житлово-комунальна вічність» Анни Гареєвої на виставці «Покажіть свої документи…»', altEn: 'Anny Gareeva’s installation Housing and Communal Eternity at the exhibition May I See Your Documents?..', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', label: 'Анна Гареєва, «Житлово-комунальна вічність»', labelEn: 'Anny Gareeva, Housing and Communal Eternity', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-128.jpg', alt: 'Світлова інсталяція «Документ» Костянтина Гливляса в темному залі', altEn: 'Kostiantyn Hlyvlias’s light installation Document in a dark hall', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', label: 'Костянтин Гливляс, «Документ»', labelEn: 'Kostiantyn Hlyvlias, Document', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-104.jpg', alt: 'Глядачка біля роботи «Сучасна мода» Kinich Azla (Вероніки Ліпатової)', altEn: 'A visitor by Modern Fashion, a work by Kinich Azla (Veronika Lipatova)', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', label: 'Kinich Azla, «Сучасна мода»', labelEn: 'Kinich Azla, Modern Fashion', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-176.jpg', alt: 'Виставка в ЄрміловЦентрі — вигляд згори', altEn: 'The exhibition at YermilovCentre seen from above', credit: 'Олександр Осіпов', to: '/projects/pokazhit-svoi-dokumenty', label: 'Експозиція в ЄрміловЦентрі', labelEn: 'The exhibition at YermilovCentre', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/light.jpg', alt: 'Світлова інсталяція в темному залі', altEn: 'A light installation in a dark hall', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', label: 'Костянтин Гливляс, «Документ»', labelEn: 'Kostiantyn Hlyvlias, Document', project: 'Покажіть свої документи…' },
  { src: '/media/projects/zbyrach-konvalii/archive.jpg', alt: 'Фотограф гортає свої знімки', altEn: 'The photographer leafs through his pictures', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', label: 'Кадр із фільму', labelEn: 'Film still', project: 'Збирач конвалій' },
  { src: '/media/events/mhgap-kyiv-trening-1/practice.jpg', alt: 'Практична вправа в парах на тренінгу mhGAP', altEn: 'A practice exercise in pairs at an mhGAP training', credit: 'Юрій Рассоха', to: '/events/mhgap-kyiv-trening-1', event: 'mhgap-kyiv-trening-1', project: 'Тренінги mhGAP' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/passports-wall.jpg', alt: 'Робота «Імперія розпалася» Антона Карюка', altEn: 'Anton Karyuk’s work Empire Collapsed', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', label: 'Антон Карюк, «Імперія розпалася»', labelEn: 'Anton Karyuk, Empire Collapsed', project: 'Покажіть свої документи…' },
  { src: '/media/events/pokazhit-svoi-dokumenty-kvero/violin.jpg', alt: 'Скрипалька серед паперових аркушів під час перформансу In C', altEn: 'A violinist among sheets of paper during the In C performance', to: '/events/pokazhit-svoi-dokumenty-kvero', event: 'pokazhit-svoi-dokumenty-kvero', project: 'Покажіть свої документи…' },
  { src: '/media/projects/zbyrach-konvalii/silhouette.jpg', alt: 'Силует у кімнаті з червоним світлом', altEn: 'A silhouette in a room lit red', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', label: 'Кадр із фільму', labelEn: 'Film still', project: 'Збирач конвалій' },
  { src: '/media/events/mhgap-kyiv-trening-4/lecture.jpg', alt: 'Тренер пояснює модуль mhGAP біля презентації', altEn: 'A trainer explains an mhGAP module by the slides', credit: 'Петро Чекаль', to: '/events/mhgap-kyiv-trening-4', event: 'mhgap-kyiv-trening-4', project: 'Тренінги mhGAP' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/strips.jpg', alt: 'Підвішені прозорі смуги зі світлом і тінями', altEn: 'Suspended transparent strips with light and shadows', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', label: 'Єва Фоміцкі, «Спільний код»', labelEn: 'Eva Fomitski, Common Code', project: 'Покажіть свої документи…' },
  { src: '/media/events/pokazhit-svoi-dokumenty-pleibek/actors.jpg', alt: 'Актори плейбек-театру «Нема» відіграють історію глядача', altEn: 'Actors of the Nema playback theatre play back a story from the audience', to: '/events/pokazhit-svoi-dokumenty-pleibek', event: 'pokazhit-svoi-dokumenty-pleibek', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/carpet.jpg', alt: 'Інсталяція «Житлово-комунальна вічність» Анни Гареєвої', altEn: 'Anny Gareeva’s installation Housing and Communal Eternity', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', label: 'Анна Гареєва, «Житлово-комунальна вічність»', labelEn: 'Anny Gareeva, Housing and Communal Eternity', project: 'Покажіть свої документи…' },
  { src: '/media/events/mhgap-kyiv-trening-3/trainer.jpg', alt: 'Тренер mhGAP біля презентації', altEn: 'An mhGAP trainer by the slides', credit: 'Петро Чекаль', to: '/events/mhgap-kyiv-trening-3', event: 'mhgap-kyiv-trening-3', project: 'Тренінги mhGAP' },
  { src: '/media/projects/zbyrach-konvalii/room.jpg', alt: 'Стіна з фотографіями й предметами в квартирі фотографа', altEn: 'A wall of photographs and objects in the photographer’s flat', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', label: 'Кадр із фільму', labelEn: 'Film still', project: 'Збирач конвалій' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/tv.jpg', alt: 'Робота Володимира Кузнецова «Відкритий архів — Страшний суд: Коліївщина»', altEn: 'Volodymyr Kuznetsov’s work Koliivshchyna: The Last Judgment. Open Archive', credit: 'Петро Чекаль', to: '/projects/pokazhit-svoi-dokumenty', label: 'Володимир Кузнецов, «Відкритий архів: „Коліївщина: Страшний суд“»', labelEn: 'Volodymyr Kuznetsov, Koliivshchyna: The Last Judgment. Open Archive', project: 'Покажіть свої документи…' },
  { src: '/media/events/mhgap-kyiv-trening-1/group.jpg', alt: 'Тренерки Олена Лемешко та Наталія Опришко з учасниками першого тренінгу mhGAP у Білій Церкві', altEn: 'Trainers Olena Lemeshko and Nataliia Opryshko with participants of the first mhGAP training in Bila Tserkva', credit: 'Юрій Рассоха', to: '/events/mhgap-kyiv-trening-1', event: 'mhgap-kyiv-trening-1', project: 'Тренінги mhGAP' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/plates.jpg', alt: 'Їстівна інсталяція «Паспортний стіл» Аліни Прокопенко (Apris)', altEn: 'Passport Table, an edible installation by Alina Prokopenko (Apris)', to: '/projects/pokazhit-svoi-dokumenty', label: 'Аліна Прокопенко (Apris), «Паспортний стіл»', labelEn: 'Alina Prokopenko (Apris), Passport Table', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/sealed.jpg', alt: 'Бетонний блок із замурованими документами', altEn: 'A concrete block with documents walled up inside', to: '/projects/pokazhit-svoi-dokumenty', label: 'Наталія Охман, «Закрита справа»', labelEn: 'Nataliia Okhman, Closed Case', project: 'Покажіть свої документи…' },
  { src: '/media/projects/pokazhit-svoi-dokumenty/opening-performance.jpg', alt: 'Олексій Чекаль друкує напис під час перформансу «Шредер Шредінґера» на відкритті виставки', altEn: 'Oleksii Chekal types an inscription during the performance Schrödinger’s Shredder at the exhibition opening', to: '/events/pokazhit-svoi-dokumenty-vidkryttia', event: 'pokazhit-svoi-dokumenty-vidkryttia', project: 'Покажіть свої документи…' },
  { src: '/media/projects/istorii-riznykh/reach.jpg', alt: 'Акторки тягнуться одна до одної в сцені', altEn: 'Actresses reach for each other in a scene', to: '/projects/istorii-riznykh', label: 'Плейбек-перформанс', labelEn: 'Playback performance', project: 'Історії різних' },
  { src: '/media/projects/istorii-riznykh/performance.jpg', alt: 'Плейбек-перформанс «Історії різних»: акторка відіграє історію глядача', altEn: 'Stories of the Different playback performance: an actress plays back a story from the audience', to: '/projects/istorii-riznykh', label: 'Плейбек-перформанс', labelEn: 'Playback performance', project: 'Історії різних' },
  { src: '/media/projects/istorii-riznykh/care.jpg', alt: 'Сцена турботи між акторами', altEn: 'A scene of care between the actors', to: '/projects/istorii-riznykh', label: 'Плейбек-перформанс', labelEn: 'Playback performance', project: 'Історії різних' },
  { src: '/media/events/pokazhit-svoi-dokumenty-kvero/flute.jpg', alt: 'Учасниця KVERO contemporary music ensemble виконує «In C» Террі Райлі', altEn: 'A member of the KVERO contemporary music ensemble performs Terry Riley’s In C', to: '/events/pokazhit-svoi-dokumenty-kvero', event: 'pokazhit-svoi-dokumenty-kvero', project: 'Покажіть свої документи…' },
  { src: '/media/events/pokazhit-svoi-dokumenty-kvero/double-bass.jpg', alt: 'Контрабасист на тлі робіт виставки', altEn: 'A double bass player against the works of the exhibition', to: '/events/pokazhit-svoi-dokumenty-kvero', event: 'pokazhit-svoi-dokumenty-kvero', project: 'Покажіть свої документи…' },
  { src: '/media/projects/zbyrach-konvalii/newspapers.jpg', alt: 'Газети й знімки з архіву фотографа', altEn: 'Newspapers and pictures from the photographer’s archive', credit: 'кадр із фільму, оператор Іван Самойлов', to: '/projects/zbyrach-konvalii', label: 'Кадр із фільму', labelEn: 'Film still', project: 'Збирач конвалій' }
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
