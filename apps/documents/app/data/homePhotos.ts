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
  { src: `${dir}/samoilov-03146.jpg`, alt: 'Глядач схилився над вітриною з документами інсталяції «Спільний код» Єви Фоміцкі' },
  { src: `${dir}/samoilov-02651.jpg`, alt: 'Глядачі перед стіною з фотографіями серії «Пасажири» Сергія Мельниченка' },
  { src: `${dir}/passports-wall.jpg`, alt: 'Робота «Імперія розпалася» Антона Карюка' },
  { src: `${dir}/samoilov-03121.jpg`, alt: 'Куратор Петро Чекаль і відвідувачі на відкритті виставки «Покажіть свої документи...»' },
  { src: `${dir}/osipov-128.jpg`, alt: 'Світлова інсталяція «Документ» Костянтина Гливляса в темному залі' },
  { src: `${dir}/samoilov-02645.jpg`, alt: 'Їстівна інсталяція «Паспортний стіл» Аліни Прокопенко (Apris)' },
  { src: `${dir}/osipov-032.jpg`, alt: 'Відкриття виставки: глядачі слухають промови в залі ЄрміловЦентру' },
  { src: `${dir}/samoilov-02895.jpg`, alt: 'Глядачі заповнили зал і сходи ЄрміловЦентру' },
  { src: `${dir}/osipov-104.jpg`, alt: 'Глядачка біля роботи «Сучасна мода» Kinich Azla (Вероніки Ліпатової)' },
  { src: `${dir}/samoilov-03067.jpg`, alt: 'Куратор Юрій Рассоха дає інтерв’ю на відкритті виставки «Покажіть свої документи...»' },
  { src: `${dir}/tv.jpg`, alt: 'Два телевізори з новинними сюжетами, робота «Відкритий архів – Страшний суд: Коліївщина» Володимира Кузнецова' },
  { src: `${dir}/osipov-034.jpg`, alt: 'Аліна Прокопенко (Apris) і Петро Чекаль на відкритті виставки «Покажіть свої документи...»' },
  { src: `${dir}/osipov-446.jpg`, alt: 'Глядачка серед світлових проєкцій роботи «Спільний код» Єви Фоміцкі' },
  { src: `${dir}/osipov-064.jpg`, alt: 'Глядачі колом у залі під час відкриття' },
  { src: `${dir}/osipov-230.jpg`, alt: 'Глядачі перед роботами Романа Пятковки з серії «Схеми»' }
]
