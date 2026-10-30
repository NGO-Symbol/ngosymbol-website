// Analytics accounts of ГО «Символ». Fill in the IDs when the accounts are ready (stage «Аналітика» of the site plan,
// documents/knowledge/changes/2026-10-30-site-improvement-plan.md). While both are empty nothing is loaded and no
// cookie banner is shown. With an ID, the banner asks first; analytics start only after «Прийняти».
export const analytics = {
  /** Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. */
  ga4: '',
  /** Microsoft Clarity project ID (clarity.microsoft.com → Settings → Overview), e.g. 'abcd1234ef'. */
  clarity: ''
}

/** Whether any analytics is configured (the consent banner appears only then). */
export const analyticsEnabled = Boolean(analytics.ga4 || analytics.clarity)
