// Photographs of the works from the original project site (saved Wix pages, converted to public/works/{slug}/n.jpg).
export const workPhotoCount: Record<string, number> = {
  'alina-prokopenko': 1, 'anna-hareieva': 3, 'kostiantyn-hlyvlias': 2, 'anton-kariuk': 3, 'volodymyr-kuznietsov': 4,
  'mariia-matiashova': 2, 'serhii-melnychenko': 2, 'nataliia-okhman': 1, 'vira-pakosh': 2, 'mariia-prokopenko': 10,
  'andrii-skrypka': 1, 'oleh-tistol': 1, 'yeva-fomitski': 2
}

export function workPhotos(slug: string) {
  return Array.from({ length: workPhotoCount[slug] ?? 0 }, (_, i) => `/works/${slug}/${i + 1}.jpg`)
}

// Photographs of the works at the exhibition by Петро Чекаль (the original site's image folder «Роботи», matched to the
// artists by their works), in /media/projects/pokazhit-svoi-dokumenty/works/{slug}-n.jpg. Where an artist has these,
// they replace the smaller pictures from the saved pages, which are mostly the same shots.
export const chekalPhotoCount: Record<string, number> = {
  'alina-prokopenko': 2, 'andrii-skrypka': 3, 'anna-hareieva': 4, 'anton-kariuk': 5, 'kostiantyn-hlyvlias': 7,
  'dara-sholokh': 9, 'kinich-azla': 4,
  'mariia-matiashova': 3, 'mariia-prokopenko': 12, 'nataliia-okhman': 2, 'oleh-tistol': 2, 'pavlo-makov': 7,
  'oleksii-sai': 3, 'roman-piatkovka': 6, 'senora-serpiente': 3,
  'serhii-melnychenko': 4, 'vira-pakosh': 4, 'volodymyr-kuznietsov': 5, 'yeva-fomitski': 3
}

export function chekalPhotos(slug: string) {
  return Array.from({ length: chekalPhotoCount[slug] ?? 0 }, (_, i) => `/media/projects/pokazhit-svoi-dokumenty/works/${slug}-${i + 1}.jpg`)
}

export interface WorkPhoto { src: string, credit?: string }
export interface WorkPhotoGroup { title: string, photos: WorkPhoto[] }

// Artists with several works need an explicit per-work split rather than one mixed appendix.
export const workPhotoGroups: Record<string, WorkPhotoGroup[]> = {
  'kinich-azla': [
    {
      title: 'Мімік',
      photos: [
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-1.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-2.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-mimik-3.jpg' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-mimik-4.jpg' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-mimik-5.jpg' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-mimik-6.jpg' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-mimik-7.jpg', credit: 'Петро Чекаль' }
      ]
    },
    {
      title: 'Сучасна мода',
      photos: [
        { src: '/media/projects/pokazhit-svoi-dokumenty/osipov-104.jpg', credit: 'Олександр Осіпов' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-3.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-4.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-fashion-3.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-fashion-4.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-fashion-5.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-fashion-6.jpg' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/kinich-azla-fashion-7.jpg' }
      ]
    }
  ],
  'oleksii-sai': [
    {
      title: 'Заяви',
      photos: [
        { src: '/works/oleksii-sai/1.jpg' },
        { src: '/works/oleksii-sai/2.jpg' },
        { src: '/works/oleksii-sai/3.jpg' }
      ]
    },
    {
      title: 'Excel-art',
      photos: [
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/oleksii-sai-1.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/oleksii-sai-2.jpg', credit: 'Петро Чекаль' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/oleksii-sai-3.jpg' },
        { src: '/media/projects/pokazhit-svoi-dokumenty/works/oleksii-sai-excel-4.jpg' }
      ]
    }
  ]
}

// Exhibition photographs by Олександр Осіпов (ЄрміловЦентр Drive «Фото_Саша Осіпов») that show a work, by artist
// (Маков, Апріс and Пятковка identified by the team; «Блокпост» — the block with tea cups and visitors' notes; the photo on the wall of A4 sheets is not Сай's work).
export const osipovPhotos: Record<string, string[]> = {
  'yeva-fomitski': ['/media/projects/pokazhit-svoi-dokumenty/osipov-446.jpg', '/media/projects/pokazhit-svoi-dokumenty/osipov-430.jpg'],
  'pavlo-makov': ['/media/projects/pokazhit-svoi-dokumenty/osipov-211.jpg'],
  'alina-prokopenko': ['/media/projects/pokazhit-svoi-dokumenty/osipov-048.jpg', '/media/projects/pokazhit-svoi-dokumenty/osipov-034.jpg'],
  'dara-sholokh': ['/media/projects/pokazhit-svoi-dokumenty/osipov-552.jpg', '/media/projects/pokazhit-svoi-dokumenty/osipov-493.jpg', '/media/projects/pokazhit-svoi-dokumenty/osipov-554.jpg'],
  'andrii-skrypka': ['/media/projects/pokazhit-svoi-dokumenty/osipov-464.jpg', '/media/projects/pokazhit-svoi-dokumenty/osipov-459.jpg'],
  'roman-piatkovka': ['/media/projects/pokazhit-svoi-dokumenty/osipov-230.jpg']
}

// One photograph per artist for the hover on the artists page, chosen to show at once what the work is.
const chekal = (slug: string, n: number) => `/media/projects/pokazhit-svoi-dokumenty/works/${slug}-${n}.jpg`
export const coverPhoto: Record<string, string> = {
  'alina-prokopenko': chekal('alina-prokopenko', 2),
  'andrii-skrypka': '/media/projects/pokazhit-svoi-dokumenty/artist-works/andrii-skrypka/work/003.jpg',
  'anna-hareieva': chekal('anna-hareieva', 2),
  'anton-kariuk': '/media/projects/pokazhit-svoi-dokumenty/artist-works/anton-kariuk/work/004.jpg',
  'kostiantyn-hlyvlias': chekal('kostiantyn-hlyvlias', 1),
  'mariia-matiashova': chekal('mariia-matiashova', 2),
  'mariia-prokopenko': '/media/projects/pokazhit-svoi-dokumenty/artist-works/mariia-prokopenko/work/018.jpg',
  'nataliia-okhman': chekal('nataliia-okhman', 2),
  'oleh-tistol': chekal('oleh-tistol', 2),
  'pavlo-makov': '/media/projects/pokazhit-svoi-dokumenty/artist-works/pavlo-makov/work/005.jpg',
  'oleksii-sai': chekal('oleksii-sai', 1),
  'senora-serpiente': chekal('senora-serpiente', 1),
  'serhii-melnychenko': '/media/projects/pokazhit-svoi-dokumenty/artist-works/serhii-melnychenko/work/006.jpg',
  'vira-pakosh': chekal('vira-pakosh', 2),
  'volodymyr-kuznietsov': chekal('volodymyr-kuznietsov', 1),
  'yeva-fomitski': '/media/projects/pokazhit-svoi-dokumenty/osipov-446.jpg',
  'kinich-azla': '/media/projects/pokazhit-svoi-dokumenty/artist-works/kinich-azla/suchasna-moda/007.jpg',
  'roman-piatkovka': '/media/projects/pokazhit-svoi-dokumenty/artist-works/roman-piatkovka/work/004.jpg',
  'dara-sholokh': '/media/projects/pokazhit-svoi-dokumenty/hover-covers/dara-sholokh-hanna-franyk.jpg'
}
