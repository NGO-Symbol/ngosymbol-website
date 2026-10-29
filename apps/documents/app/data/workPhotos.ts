// Photographs of the works from the original project site (saved Wix pages, converted to public/works/{slug}/n.jpg).
export const workPhotoCount: Record<string, number> = {
  'alina-prokopenko': 1, 'anna-hareieva': 3, 'kostiantyn-hlyvlias': 2, 'anton-kariuk': 3, 'volodymyr-kuznietsov': 4,
  'mariia-matiashova': 2, 'serhii-melnychenko': 2, 'nataliia-okhman': 1, 'vira-pakosh': 2, 'mariia-prokopenko': 10,
  'andrii-skrypka': 1, 'oleh-tistol': 1, 'yeva-fomitski': 2
}

export function workPhotos(slug: string) {
  return Array.from({ length: workPhotoCount[slug] ?? 0 }, (_, i) => `/works/${slug}/${i + 1}.jpg`)
}
