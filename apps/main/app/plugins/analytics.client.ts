// Analytics after consent only. The visitor's choice is kept in localStorage («symbol-consent»: granted | denied);
// the banner (components/CookieConsent.vue) asks when nothing is chosen yet. Once granted: Google Analytics 4 and
// Microsoft Clarity load, and the actions that matter to Symbol are sent as GA4 events:
// support (any link to /support), calendar (subscribe or calendar view), project_site (crossing to a project site),
// application (links out of an opportunity), outbound (other external links).
import { analytics, analyticsEnabled } from '~/data/analytics'

type Gtag = (...args: unknown[]) => void
const KEY = 'symbol-consent'

export default defineNuxtPlugin(() => {
  const consent = ref<'granted' | 'denied' | null>(null)
  try { const saved = localStorage.getItem(KEY); if (saved === 'granted' || saved === 'denied') consent.value = saved } catch {}
  let started = false

  function addScript(src: string) {
    const script = document.createElement('script')
    script.async = true
    script.src = src
    document.head.appendChild(script)
  }

  function start() {
    if (started || !analyticsEnabled) return
    started = true
    const w = window as unknown as { dataLayer: unknown[]; gtag?: Gtag; clarity?: Gtag & { q?: unknown[] } }
    if (analytics.ga4) {
      w.dataLayer = w.dataLayer || []
      w.gtag = function gtag() { w.dataLayer.push(arguments) } as Gtag
      w.gtag('js', new Date())
      w.gtag('config', analytics.ga4, { anonymize_ip: true })
      addScript(`https://www.googletagmanager.com/gtag/js?id=${analytics.ga4}`)
    }
    if (analytics.clarity) {
      w.clarity = w.clarity || (function clarity(...args: unknown[]) { (w.clarity!.q = w.clarity!.q || []).push(args) } as Gtag & { q?: unknown[] })
      addScript(`https://www.clarity.ms/tag/${analytics.clarity}`)
    }
    document.addEventListener('click', track, { capture: true, passive: true })
  }

  function track(event: MouseEvent) {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!gtag || !link) return
    const url = new URL(link.href, location.href)
    const path = url.pathname.replace(/^\/en(?=\/)/, '')
    const name = url.origin === location.origin && path.startsWith('/support') ? 'support'
      : url.pathname.endsWith('.ics') || url.searchParams.get('view') === 'calendar' || url.protocol === 'webcal:' ? 'calendar'
      : url.pathname.startsWith('/documentsart') || (url.hostname.endsWith('.symbol.ngo') && url.hostname !== 'www.symbol.ngo') ? 'project_site'
      : url.origin !== location.origin && location.pathname.replace(/^\/en(?=\/)/, '').startsWith('/opportunities') ? 'application'
      : url.origin !== location.origin ? 'outbound' : ''
    if (name) gtag('event', name, { link_url: url.href, page_path: location.pathname })
  }

  function choose(value: 'granted' | 'denied') {
    consent.value = value
    try { localStorage.setItem(KEY, value) } catch {}
    if (value === 'granted') start()
    else if (started) location.reload() // stop analytics that already ran in this visit
  }

  if (consent.value === 'granted') start()
  return { provide: { consent: { state: consent, choose, enabled: analyticsEnabled } } }
})
