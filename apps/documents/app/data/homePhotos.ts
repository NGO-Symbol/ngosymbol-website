// The exhibition on the home page of the project site: general, varied views by three photographers, no subject twice.
// The dossier photo above (the carpet installation) is not repeated here. Credits are listed once under the photographs. Sources: Олександр Осіпов and Іван Самойлов — the ЄрміловЦентр Drive
// folders «Фото_Саша Осіпов» and «Фото_Іван Самойлов»; Петро Чекаль — the original site's images.
const dir = '/media/projects/pokazhit-svoi-dokumenty'

export const photographers = [
  { slug: 'oleksandr-osipov', name: 'Олександр Осіпов', nameEn: 'Oleksandr Osipov' },
  { slug: 'ivan-samoilov', name: 'Іван Самойлов', nameEn: 'Ivan Samoilov' },
  { slug: 'petro-chekal', name: 'Петро Чекаль', nameEn: 'Petro Chekal' }
]

export const homePhotos = [
  { src: `${dir}/osipov-176.jpg`, alt: 'Виставка в ЄрміловЦентрі — вигляд згори' },
  { src: `${dir}/samoilov-03146.jpg`, alt: 'Глядач схилився над вітриною з документами' },
  { src: `${dir}/samoilov-02651.jpg`, alt: 'Глядачі перед стіною з чорно-білими фотографіями' },
  { src: `${dir}/passports-wall.jpg`, alt: 'Ряди червоних паспортів на стіні' },
  { src: `${dir}/samoilov-03121.jpg`, alt: 'Глядачки з собакою на відкритті виставки' },
  { src: `${dir}/osipov-128.jpg`, alt: 'Світлова інсталяція «Документ» Костянтина Гливляса в темному залі' },
  { src: `${dir}/samoilov-02645.jpg`, alt: 'Паспорти на тарілках уздовж довгого столу' },
  { src: `${dir}/osipov-032.jpg`, alt: 'Відкриття виставки: глядачі слухають промови в залі ЄрміловЦентру' },
  { src: `${dir}/samoilov-02895.jpg`, alt: 'Глядачі заповнили зал і сходи ЄрміловЦентру' },
  { src: `${dir}/osipov-104.jpg`, alt: 'Глядачка біля манекена в сукні з проєкту «Сучасна мода»' },
  { src: `${dir}/samoilov-03067.jpg`, alt: 'Інтерв’ю на відкритті серед робіт виставки' },
  { src: `${dir}/tv.jpg`, alt: 'Два телевізори з відеороботами' }
]
