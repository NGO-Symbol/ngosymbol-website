// Analytics of ГО «Символ», shared by symbol.ngo (apps/main) and the exhibition site (apps/documents).
// Each app has a thin client plugin that calls setupConsent() with its config (apps/main/app/data/analytics.ts is the
// single source of the ids) and its own cookie banner in its own visual style.
//
// Rules (documents/operations/analytics.md has the long version):
//  1. Real visitors only: a production host (symbol.ngo and subdomains, never the /design/ gallery) and not a bot.
//     Anywhere else nothing loads and no banner is shown.
//  2. Cloudflare Web Analytics (cookieless) loads for every such visitor without consent, when its token is set.
//  3. Google Analytics 4 and Microsoft Clarity load only after the visitor accepts in the banner. A refusal or a later
//     withdrawal removes their cookies and stops them on the next page.
//  4. Consent is kept in localStorage «symbol-consent» (granted | denied). While the exhibition site is a folder of
//     symbol.ngo (/documentsart/) both sites share it and the visitor decides once; on its own address
//     (documentsart.symbol.ngo) the exhibition site is another origin and asks once for itself.
import { isLikelyBot } from './bot'
import { isProductionPage } from './hosts'
import { classifyLink, linkLocation } from './links'

export { isLikelyBot } from './bot'
export { isProductionHost, isProductionPage, PRODUCTION_DOMAIN } from './hosts'
export { classifyLink } from './links'

export interface AnalyticsConfig {
  /** Google Analytics 4 measurement id (G-XXXXXXXXXX); empty = off. */
  ga4: string
  /** Microsoft Clarity project id. */
  clarity: string
  /** Clarity runs only when this is true: switched on after the team approves the privacy page. */
  clarityEnabled: boolean
  /** Cloudflare Web Analytics token; empty = off. */
  cloudflareToken: string
}

export type Consent = 'granted' | 'denied' | null
export type ToolName = 'Google Analytics' | 'Microsoft Clarity'

export const CONSENT_KEY = 'symbol-consent'

type Gtag = (...args: unknown[]) => void
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] }
interface AnalyticsWindow extends Window {
  dataLayer?: unknown[]
  gtag?: Gtag
  clarity?: ClarityFn
  [key: `ga-disable-${string}`]: boolean | undefined
}

/** Tools that need the visitor's consent and are configured, in the order the banner names them. */
export function consentTools(config: AnalyticsConfig): ToolName[] {
  const tools: ToolName[] = []
  if (config.ga4) tools.push('Google Analytics')
  if (config.clarity && config.clarityEnabled) tools.push('Microsoft Clarity')
  return tools
}

function addScript(src: string, attributes: Record<string, string> = {}) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  for (const [key, value] of Object.entries(attributes)) script.setAttribute(key, value)
  document.head.appendChild(script)
}

/** Removes the first-party cookies of GA4 and Clarity from this host and its parent domains. */
function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map(part => part.split('=')[0]!.trim()).filter(name => /^(_ga|_ga_.+|_gid|_gat.*|_clck|_clsk)$/.test(name))
  if (!names.length) return
  const labels = location.hostname.split('.')
  const domains = ['', ...labels.slice(0, -1).map((_, index) => `.${labels.slice(index).join('.')}`)]
  for (const name of names) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
  }
}

export function createAnalytics(config: AnalyticsConfig) {
  const w = window as unknown as AnalyticsWindow
  const measurable = isProductionPage(location) && !isLikelyBot()
  const tools = consentTools(config)
  const enabled = measurable && tools.length > 0
  const clarityId = config.clarity && config.clarityEnabled ? config.clarity : ''
  let started = false
  let cloudflareStarted = false

  let consent: Consent = null
  try { const saved = localStorage.getItem(CONSENT_KEY); if (saved === 'granted' || saved === 'denied') consent = saved } catch {}

  function track(event: MouseEvent) {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!w.gtag || !link) return
    const hit = classifyLink(new URL(link.href, location.href), location, linkLocation(link))
    if (hit) w.gtag('event', hit.name, hit.params)
  }

  /** Cookieless Cloudflare Web Analytics: no consent needed, production visitors only. */
  function startCloudflare() {
    if (cloudflareStarted || !measurable || !config.cloudflareToken) return
    cloudflareStarted = true
    const script = document.createElement('script')
    script.defer = true
    script.type = 'module'
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: config.cloudflareToken }))
    document.head.appendChild(script)
  }

  function startGa4() {
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag() { w.dataLayer!.push(arguments) } as Gtag
    // Consent Mode: advertising storage stays denied for good; analytics storage is granted only because the visitor accepted.
    w.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' })
    w.gtag('js', new Date())
    w.gtag('consent', 'update', { analytics_storage: 'granted' })
    w.gtag('config', config.ga4, { allow_google_signals: false, allow_ad_personalization_signals: false })
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4)}`)
    document.addEventListener('click', track, { capture: true, passive: true })
  }

  function startClarity() {
    w.clarity = w.clarity || (function clarity(...args: unknown[]) { (w.clarity!.q = w.clarity!.q || []).push(args) } as ClarityFn)
    // Consent API v2 (Microsoft Learn: Clarity Cookie Consent API - ConsentV2): sent before the tag runs, so no cookie is set earlier.
    w.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' })
    addScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`)
  }

  /** Starts the tools that need consent. Called after «Прийняти» and on later visits with a saved acceptance. */
  function start() {
    if (started || !enabled || consent !== 'granted') return
    started = true
    if (config.ga4) startGa4()
    if (clarityId) startClarity()
  }

  /** Stops what already ran in this visit and removes the cookies. */
  function stop() {
    if (config.ga4) w[`ga-disable-${config.ga4}`] = true
    if (started) {
      w.gtag?.('consent', 'update', { analytics_storage: 'denied' })
      if (clarityId) {
        w.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' })
        w.clarity?.('consent', false) // erases Clarity's cookies and ends the session
      }
    }
    clearAnalyticsCookies()
  }

  /**
   * Saves the visitor's choice. Returns true when a tool already ran in this visit and the page must be reloaded
   * to stop it (the reloaded page loads nothing).
   */
  function choose(value: 'granted' | 'denied'): boolean {
    consent = value
    try { localStorage.setItem(CONSENT_KEY, value) } catch {}
    if (value === 'granted') { start(); return false }
    const wasRunning = started
    stop()
    return wasRunning
  }

  startCloudflare()
  if (consent === 'denied') clearAnalyticsCookies()
  start()

  return { enabled, measurable, tools, get consent() { return consent }, get started() { return started }, choose, start }
}

/** What the apps provide as `$consent`: the banner and the footer control read and change it. */
export function setupConsent(config: AnalyticsConfig, makeRef: <T>(value: T) => { value: T }) {
  const analytics = createAnalytics(config)
  const state = makeRef<Consent>(analytics.consent)
  function choose(value: 'granted' | 'denied') {
    const reload = analytics.choose(value)
    state.value = value
    if (reload) location.reload()
  }
  return { state, choose, enabled: analytics.enabled, tools: analytics.tools }
}
