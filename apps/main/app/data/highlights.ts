import type { Photo } from './types'

// «Кадри»: the strongest photographs of Symbol's work for the home page, chosen 2026-10-29 at the team's request —
// by Петро Чекаль and Іван Самойлов (mhGAP trainings, «Покажіть свої документи…», stills of «Збирач конвалій»)
// plus performances. A credit is shown only where the author is recorded (content-inventory.md); `to` is the project.
export interface Highlight extends Photo { to: string; project: string }

export const highlights: Highlight[] = [
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
  { src: '/media/events/mhgap-kyiv-trening-1/group.jpg', alt: 'Учасники першого тренінгу mhGAP у Білій Церкві', credit: 'Петро Чекаль', to: '/projects/mhgap-kyiv', project: 'Тренінги mhGAP' }
]
