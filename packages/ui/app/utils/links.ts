/** True for an http(s) address on another site. symbol.ngo and its subdomains (our own project sites) are not off-site: same tab, no icon. */
export function isOffSite(href?: string): boolean {
  if (!href || !/^(https?:)?\/\//i.test(href)) return false
  try {
    const host = new URL(href, 'https://symbol.ngo').hostname
    return !(host === 'symbol.ngo' || host.endsWith('.symbol.ngo'))
  } catch { return false }
}
