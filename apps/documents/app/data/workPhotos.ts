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
