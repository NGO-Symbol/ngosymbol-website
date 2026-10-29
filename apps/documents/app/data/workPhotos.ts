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
  'alina-prokopenko': 2, 'andrii-skrypka': 3, 'anna-hareieva': 4, 'anton-kariuk': 5, 'kostiantyn-hlyvlias': 3,
  'mariia-matiashova': 3, 'mariia-prokopenko': 12, 'nataliia-okhman': 2, 'oleh-tistol': 2, 'pavlo-makov': 1,
  'serhii-melnychenko': 4, 'vira-pakosh': 3, 'volodymyr-kuznietsov': 5, 'yeva-fomitski': 3
}

export function chekalPhotos(slug: string) {
  return Array.from({ length: chekalPhotoCount[slug] ?? 0 }, (_, i) => `/media/projects/pokazhit-svoi-dokumenty/works/${slug}-${i + 1}.jpg`)
}

// Exhibition photographs by Олександр Осіпов (ЄрміловЦентр Drive «Фото_Саша Осіпов») that show a work, by artist
// (Маков, Апріс and Пятковка identified by the team; «Блокпост» — the block with tea cups and visitors' notes).
export const osipovPhotos: Record<string, string[]> = {
  'yeva-fomitski': ['/media/projects/pokazhit-svoi-dokumenty/osipov-446.jpg'],
  'oleksii-sai': ['/media/projects/pokazhit-svoi-dokumenty/osipov-264.jpg'],
  'pavlo-makov': ['/media/projects/pokazhit-svoi-dokumenty/osipov-211.jpg'],
  'alina-prokopenko': ['/media/projects/pokazhit-svoi-dokumenty/osipov-048.jpg', '/media/projects/pokazhit-svoi-dokumenty/osipov-034.jpg'],
  'dara-sholokh': ['/media/projects/pokazhit-svoi-dokumenty/osipov-552.jpg', '/media/projects/pokazhit-svoi-dokumenty/osipov-554.jpg'],
  'roman-piatkovka': ['/media/projects/pokazhit-svoi-dokumenty/osipov-230.jpg']
}

// One photograph per artist for the hover on the artists page, chosen to show at once what the work is.
const chekal = (slug: string, n: number) => `/media/projects/pokazhit-svoi-dokumenty/works/${slug}-${n}.jpg`
export const coverPhoto: Record<string, string> = {
  'alina-prokopenko': chekal('alina-prokopenko', 2),
  'andrii-skrypka': chekal('andrii-skrypka', 1),
  'anna-hareieva': chekal('anna-hareieva', 2),
  'anton-kariuk': chekal('anton-kariuk', 1),
  'kostiantyn-hlyvlias': chekal('kostiantyn-hlyvlias', 2),
  'mariia-matiashova': chekal('mariia-matiashova', 2),
  'mariia-prokopenko': chekal('mariia-prokopenko', 3),
  'nataliia-okhman': chekal('nataliia-okhman', 2),
  'oleh-tistol': chekal('oleh-tistol', 2),
  'pavlo-makov': '/media/projects/pokazhit-svoi-dokumenty/osipov-211.jpg',
  'serhii-melnychenko': chekal('serhii-melnychenko', 1),
  'vira-pakosh': chekal('vira-pakosh', 1),
  'volodymyr-kuznietsov': chekal('volodymyr-kuznietsov', 1),
  'yeva-fomitski': '/media/projects/pokazhit-svoi-dokumenty/osipov-446.jpg',
  'kinich-azla': '/media/projects/pokazhit-svoi-dokumenty/osipov-104.jpg',
  'oleksii-sai': '/media/projects/pokazhit-svoi-dokumenty/osipov-264.jpg',
  'roman-piatkovka': '/media/projects/pokazhit-svoi-dokumenty/osipov-230.jpg',
  'dara-sholokh': '/media/projects/pokazhit-svoi-dokumenty/osipov-552.jpg'
}
