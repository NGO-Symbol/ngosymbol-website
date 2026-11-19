// Analytics of the exhibition site. Same code and same ids as symbol.ngo: the shared module packages/brand/analytics
// (production hosts only, no bots, Cloudflare Web Analytics without cookies, Google Analytics 4 and Microsoft Clarity
// only after the visitor accepts). The visitor's choice is the same «symbol-consent» key: at symbol.ngo/documentsart/
// someone who decided on symbol.ngo is not asked again; on documentsart.symbol.ngo (another origin) the site asks once
// for itself. The ids live in the main site's data/analytics.ts.
import { setupConsent } from '@symbol/brand/analytics'
import { analytics } from '#symbol/analytics'

export default defineNuxtPlugin(() => ({ provide: { consent: setupConsent(analytics, ref) } }))
