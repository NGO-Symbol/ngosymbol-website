// Analytics accounts of ГО «Символ»: the single place for every id. Both sites read it (the exhibition site through the
// #symbol alias). The code that uses it is packages/brand/analytics; the long version is documents/operations/analytics.md.
//
// How each tool behaves (nothing at all loads on localhost, previews, /design/ or for bots):
//  - ga4         Google Analytics 4: loads only after the visitor accepts in the cookie banner.
//  - clarity     Microsoft Clarity: same, and only while `clarityEnabled` is true.
//  - cloudflareToken  Cloudflare Web Analytics: no cookies, loads for every visitor without the banner.
// An empty id means «off». With neither GA4 nor Clarity on, no cookie banner is shown.
export const analytics = {
  /** Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. Empty until the owner creates the property (documents/operations/owner-ga4.md). */
  ga4: '',
  /** Microsoft Clarity project ID (clarity.microsoft.com → Settings → Overview). */
  clarity: 'z5y92kh1wr',
  /**
   * SWITCH FOR MICROSOFT CLARITY. Leave `false` until the privacy page (/privacy) is approved by Юрій Рассоха and
   * Петро Чекаль. To switch it on: set `true`, run `pnpm check`, open a pull request; after the merge the banner names
   * Clarity and it loads for visitors who accept. To switch it off again: set `false`.
   */
  clarityEnabled: false,
  /** Cloudflare Web Analytics token (Cloudflare → Analytics & logs → Web analytics → the site → Manage site). Empty until the owner creates it (documents/operations/owner-cloudflare-web-analytics.md). */
  cloudflareToken: ''
}

/** Whether a tool that needs consent is configured (the cookie banner and the footer control appear only then). */
export const analyticsEnabled = Boolean(analytics.ga4 || (analytics.clarity && analytics.clarityEnabled))
