// Which clicks are sent to GA4 as events, and with which parameters. Pure functions, so the rules are easy to test.
// Event names are the ones the owner marks as key events (documents/operations/analytics.md):
//   support       any link to /support (a donation or support page of Symbol)
//   calendar      subscribing to or opening the events calendar (.ics, webcal:, ?view=calendar)
//   project_site  crossing between Symbol sites (main site ↔ a project site such as /documentsart or *.symbol.ngo)
//   application   a link out of an opportunity page (a call, a form, an organiser's site)
//   outbound      any other link to another website
// mailto:, tel: and other non-web links are not sent: an e-mail address or a phone number is personal data.
// Parameter names (target_*, click_*, page_lang) are deliberately not GA4's own link_url / page_path, so they never clash
// with built-in or reserved names; the owner registers them as event-scoped custom dimensions (analytics.md).
import { PRODUCTION_DOMAIN } from './hosts'

export type LinkEventName = 'support' | 'calendar' | 'project_site' | 'application' | 'outbound'

export interface LinkEvent {
  name: LinkEventName
  params: {
    /** The target without query string and fragment (they can carry names, tokens or the ?from= page memory). */
    target_url: string
    target_domain: string
    /** Where on the page the link was: header | footer | main | other. */
    click_area: string
    /** The page the click happened on, without the language prefix, query string and fragment. */
    click_page: string
    page_lang: 'uk' | 'en'
  }
}

const stripLang = (path: string) => path.replace(/^\/en(?=\/|$)/, '') || '/'
const isSymbolHost = (host: string) => host === PRODUCTION_DOMAIN || host.endsWith(`.${PRODUCTION_DOMAIN}`)

/** The event for a click on `target` made on page `here`, or null when the link is not tracked. */
export function classifyLink(target: URL, here: Pick<URL, 'origin' | 'host' | 'pathname'>, location = 'other'): LinkEvent | null {
  if (!/^(https?:|webcal:)$/.test(target.protocol)) return null
  const sameOrigin = target.origin === here.origin
  const targetPath = stripLang(target.pathname)
  const herePath = stripLang(here.pathname)
  const otherSymbolSite = isSymbolHost(target.hostname) && target.hostname !== `www.${PRODUCTION_DOMAIN}` && target.host !== here.host
  const intoExhibition = sameOrigin && target.pathname.startsWith('/documentsart') && !here.pathname.startsWith('/documentsart')

  let name: LinkEventName | null = null
  if (isSymbolHost(target.hostname) && targetPath.startsWith('/support')) name = 'support'
  else if (target.pathname.endsWith('.ics') || target.searchParams.get('view') === 'calendar' || target.protocol === 'webcal:') name = 'calendar'
  else if (otherSymbolSite || intoExhibition) name = 'project_site'
  else if (!sameOrigin && herePath.startsWith('/opportunities')) name = 'application'
  else if (!sameOrigin) name = 'outbound'
  if (!name) return null

  return {
    name,
    params: {
      target_url: `${target.protocol}//${target.host}${target.pathname}`,
      target_domain: target.hostname,
      click_area: location,
      click_page: herePath,
      page_lang: /^\/en(\/|$)/.test(here.pathname) ? 'en' : 'uk'
    }
  }
}

/** header | footer | main | other: the landmark that holds the clicked link. */
export function linkLocation(link: Element): string {
  if (link.closest('header')) return 'header'
  if (link.closest('footer')) return 'footer'
  if (link.closest('main')) return 'main'
  return 'other'
}
