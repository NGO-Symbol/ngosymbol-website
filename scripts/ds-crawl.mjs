// Crawl every gallery page (components, foundations, templates) in several set-ups and report console errors, horizontal overflow,
// failed requests and axe-core accessibility violations. `pnpm ds:crawl [baseUrl=http://localhost:3002]` → exit 1 on any issue.
// Needs the gallery running (pnpm dev:design) and Google Chrome installed.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { chromium } from 'playwright-core'

const base = process.argv[2] ?? 'http://localhost:3002'
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8')
const setups = [
  { name: 'desktop 1280', width: 1280, height: 900 },
  { name: 'tablet 768', width: 768, height: 1024 },
  { name: 'phone 390', width: 390, height: 844, touch: true },
  { name: 'small phone 320', width: 320, height: 640, touch: true },
  { name: 'desktop 1280 reduced motion', width: 1280, height: 900, reduce: true },
]

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const first = await browser.newPage()
await first.goto(base + '/', { waitUntil: 'networkidle' })
// phone width hides the nav behind the burger, but the links are in the DOM
const paths = ['/', ...new Set(await first.$$eval('.ds-nav a[href^="/"]', as => as.map(a => a.getAttribute('href'))))]
await first.close()

let failed = 0
for (const s of setups) {
  const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, hasTouch: !!s.touch, isMobile: !!s.touch, reducedMotion: s.reduce ? 'reduce' : 'no-preference' })
  const page = await ctx.newPage()
  let issues = []
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') issues.push(`${m.type()}: ${m.text().slice(0, 160)}`) })
  page.on('pageerror', e => issues.push('pageerror: ' + e.message.slice(0, 160)))
  page.on('requestfailed', r => issues.push('requestfailed: ' + r.url().slice(0, 100)))
  for (const path of paths) {
    issues = []
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.evaluate(async () => { await document.fonts.ready; for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)) } window.scrollTo(0, 0) })
    await page.waitForTimeout(250)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    if (overflow > 1) issues.push(`horizontal overflow ${overflow}px`)
    const small = await page.evaluate(() => [...document.querySelectorAll('a, button, [role="button"], summary, input, select')].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && e.closest('.ds-stage, .ds-nav, .ds-bar, .ds-main') && (r.height < 24 || r.width < 24) && !e.closest('.ds-code') && !e.classList.contains('sym-sr-only') && !e.closest('[aria-hidden="true"]') }).map(e => (e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 30)))
    if (small.length) issues.push(`touch target < 24px: ${small.slice(0, 4).join(' | ')}`)
    if (!s.reduce) {
      await page.addScriptTag({ content: axeSource })
      const axe = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'], resultTypes: ['violations'] })).violations.filter(v => ['serious', 'critical'].includes(v.impact)).map(v => `${v.id} (${v.nodes.length}): ${v.nodes[0].target.join(' ').slice(0, 70)}`))
      for (const a of axe) issues.push('a11y ' + a)
    }
    if (issues.length) { failed++; console.log(`✗ [${s.name}] ${path}\n  ${[...new Set(issues)].join('\n  ')}`) }
  }
  console.log(`[${s.name}] ${paths.length} pages checked`)
  await ctx.close()
}
await browser.close()
console.log(failed ? `${failed} page(s) with issues` : 'all clean')
process.exit(failed ? 1 : 0)
