// Language comes from the URL: /en and /en/... are English, everything else Ukrainian (ADR-0009).
export const isEnPath = (path: string) => path === '/en' || path.startsWith('/en/')

/** The same page in the other language: /projects/x ↔ /en/projects/x, / ↔ /en. */
export function switchLangPath(path: string, toEn: boolean) {
  const base = isEnPath(path) ? path.replace(/^\/en(?=\/|$)/, '') || '/' : path
  if (!toEn) return base
  return base === '/' ? '/en' : `/en${base}`
}

// Set by the language switch so the middleware lets an explicit EN → UA change through.
export const langSwitch = { explicit: false }

export function useLang() {
  const route = useRoute()
  // The static 404.html is built for «/404.html» (Ukrainian) and opened at the missing address; while it hydrates the error
  // page keeps the language it was built in, then (plugins/lang-settled.client.ts) follows the address.
  const error = useError()
  const settled = useState('lang-settled', () => false)
  const isEn = computed(() => isEnPath(route.path) && (!error.value || settled.value))
  /** Prefix an internal link for the current language. */
  const localePath = (path: string) => (isEn.value ? switchLangPath(path, true) : path)
  return { isEn, localePath }
}
