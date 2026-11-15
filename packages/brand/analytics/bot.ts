// Lightweight bot heuristic: synthetic traffic (Lighthouse, headless Chrome, Selenium, crawlers) is not counted and
// is never shown the consent banner. Same rule as on the WBM band site.
const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|mediapartners|bingpreview|headless|phantom|lighthouse|HeadlessChrome|GoogleOther|AdsBot|GPTBot|ClaudeBot|PerplexityBot|Bytespider/i

export function isLikelyBot(): boolean {
  if (typeof navigator === 'undefined') return false
  if (navigator.webdriver === true) return true
  const ua = navigator.userAgent ?? ''
  if (!ua) return true
  return BOT_UA_PATTERN.test(ua)
}
