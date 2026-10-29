// Ukrainian is the main language; every page also lives under /en/... (mirrored routes, as on symbol.ngo).
export function useLang() {
  const route = useRoute()
  const isEn = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
  const localePath = (path: string) => (isEn.value ? (path === '/' ? '/en' : `/en${path}`) : path)
  /** The same page in the other language. */
  const switchPath = computed(() => {
    if (isEn.value) return route.path.replace(/^\/en/, '') || '/'
    return route.path === '/' ? '/en' : `/en${route.path}`
  })
  const t = (uk: string, en: string) => (isEn.value ? en : uk)
  return { isEn, localePath, switchPath, t }
}
