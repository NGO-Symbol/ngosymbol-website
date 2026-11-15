// Analytics of symbol.ngo. All the logic is shared with the exhibition site (packages/brand/analytics): production hosts
// only, no bots, Cloudflare Web Analytics without cookies, Google Analytics 4 and Microsoft Clarity only after the visitor
// accepts in the banner (components/CookieConsent.vue), the choice in localStorage «symbol-consent».
// GA4 events sent on clicks: support, calendar, project_site, application, outbound.
import { setupConsent } from '@symbol/brand/analytics'
import { analytics } from '~/data/analytics'

export default defineNuxtPlugin(() => ({ provide: { consent: setupConsent(analytics, ref) } }))
