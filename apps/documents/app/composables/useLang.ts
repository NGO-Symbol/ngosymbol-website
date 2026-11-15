// Ukrainian is the main language; every page also lives under /en/... (mirrored routes, as on symbol.ngo).
export function useLang() {
  const route = useRoute()
  // The static 404.html is built for «/404.html» (Ukrainian) and opened at the missing address; while it hydrates the error
  // page keeps the language it was built in, then (plugins/lang-settled.client.ts) follows the address.
  const error = useError()
  const settled = useState('lang-settled', () => false)
  const isEn = computed(() => (route.path === '/en' || route.path.startsWith('/en/')) && (!error.value || settled.value))
  const localePath = (path: string) => (isEn.value ? (path === '/' ? '/en' : `/en${path}`) : path)
  /** The same page in the other language. */
  const switchPath = computed(() => {
    if (error.value) return isEn.value ? '/' : '/en'
    if (isEn.value) return route.path.replace(/^\/en/, '') || '/'
    return route.path === '/' ? '/en' : `/en${route.path}`
  })
  const t = (uk: string, en: string) => (isEn.value ? en : uk)
  return { isEn, localePath, switchPath, t }
}
