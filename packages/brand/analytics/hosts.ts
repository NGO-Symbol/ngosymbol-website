// Where analytics may run: real visitors of the production site only. Anything else (a developer's localhost, a
// GitHub Pages or Cloudflare preview, the /design/ gallery, a build opened from a folder) must never load a tracker,
// otherwise tests and team members' clicks land in the owner's real reports.

/** The registrable domain of ГО «Символ»; its subdomains (project sites, www) count as production too. */
export const PRODUCTION_DOMAIN = 'symbol.ngo'

/** Paths that are never measured even on a production host: the design-system gallery published at /design/. */
const EXCLUDED_PATHS = ['/design']

export function isProductionHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '')
  return host === PRODUCTION_DOMAIN || host.endsWith(`.${PRODUCTION_DOMAIN}`)
}

export function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`))
}

/** True when this page is a real production page that may be measured. */
export function isProductionPage(location: Pick<Location, 'hostname' | 'pathname'>): boolean {
  return isProductionHost(location.hostname) && !isExcludedPath(location.pathname)
}
