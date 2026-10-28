// Screenshot a page and print console errors, horizontal overflow and failed requests. Agents run this before saying a UI change is done.
// node scripts/ds-shot.mjs <url> <out.png> [width=1280] [height=900] [full|view] [reduce]
// Needs Google Chrome installed (playwright-core drives it; no browser download).
import { chromium } from 'playwright-core'

const [url, out, width = '1280', height = '900', mode = 'full', motion = 'no-preference'] = process.argv.slice(2)
if (!url || !out) { console.error('usage: node scripts/ds-shot.mjs <url> <out.png> [width] [height] [full|view] [reduce]'); process.exit(2) }
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const ctx = await browser.newContext({ viewport: { width: Number(width), height: Number(height) }, deviceScaleFactor: Number(width) < 700 ? 2 : 1, reducedMotion: motion === 'reduce' ? 'reduce' : 'no-preference', hasTouch: Number(width) < 700, isMobile: Number(width) < 700 })
const page = await ctx.newPage()
const issues = []
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') issues.push(`${m.type()}: ${m.text().slice(0, 200)}`) })
page.on('pageerror', e => issues.push('pageerror: ' + e.message.slice(0, 200)))
page.on('requestfailed', r => issues.push('requestfailed: ' + r.url().slice(0, 120)))
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
// scroll through the page once so scroll reveals have run, then back to the top
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) } window.scrollTo(0, 0) })
await page.waitForTimeout(1400)
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
if (overflow > 1) issues.push(`horizontal overflow ${overflow}px`)
await page.screenshot({ path: out, fullPage: mode !== 'view' })
console.log(issues.length ? JSON.stringify(issues, null, 1) : 'clean')
await browser.close()
process.exit(issues.length ? 1 : 0)
