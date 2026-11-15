// Search-engine helpers shared by every app (auto-imported through the brand layer): one way to write JSON-LD,
// Kyiv-time dates for structured data, and descriptions that fit a search result.

/** JSON for a <script type="application/ld+json"> block. `<` is escaped (<) so text can never close the tag. */
export const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

const lastSunday = (year: number, month: number) => {
  const last = new Date(Date.UTC(year, month + 1, 0))
  return last.getUTCDate() - last.getUTCDay()
}

/**
 * Europe/Kyiv offset of a local date/time (`2025-10-17` or `2025-10-17T18:00`): +03:00 from the last Sunday of March
 * 03:00 to the last Sunday of October 04:00, otherwise +02:00. Plain arithmetic, so it gives the same answer on every
 * build machine (no time-zone database needed).
 */
export function kyivOffset(local: string) {
  const [year, month, day] = local.slice(0, 10).split('-').map(Number) as [number, number, number]
  const hour = local.length > 10 ? Number(local.slice(11, 13)) : 12
  const key = (m: number, d: number, h: number) => ((m * 100 + d) * 100) + h
  const now = key(month, day, hour)
  const summer = now >= key(3, lastSunday(year, 2), 3) && now < key(10, lastSunday(year, 9), 4)
  return summer ? '+03:00' : '+02:00'
}

/** ISO 8601 with the Kyiv offset for structured data: `2025-10-17T18:00` → `2025-10-17T18:00:00+03:00`. A date stays a date. */
export function kyivDateTime(local: string) {
  if (local.length <= 10) return local
  return `${local.slice(0, 16)}:00${kyivOffset(local)}`
}

/**
 * A description that fits a search result (≤ 160 characters): the text itself, otherwise its first sentence, cut at a
 * sentence end. A full stop ends a sentence only when a capital letter or an opening quote follows (or the text ends)
 * and the word before it is not a single capital letter, so initials, «(нар. 1995)» and «ім. Бойчука» do not cut the
 * text. A first sentence that is still too long is cut at the last whole word before the limit.
 */
export function fitDescription(text: string, max = 160) {
  const plain = text.replace(/\s+/g, ' ').trim()
  if (plain.length <= max) return plain
  for (const match of plain.matchAll(/[.!?…]+(?=\s|$)/g)) {
    const end = match.index! + match[0].length
    const before = plain.slice(0, match.index!).split(' ').pop() ?? ''
    if (/^[A-ZА-ЯЄІЇҐ]$/.test(before)) continue
    if (/^[(«"“]?(ім|нар|рр?|ст|вул|просп|пл|обл|проф|доц|див|напр|тис|млн|грн|св|Dr|Mr|Mrs|Ms|St|vs)$/i.test(before)) continue
    if (end < plain.length && !/^\s+[«"“„A-ZА-ЯЄІЇҐ]/.test(plain.slice(end))) continue
    if (end <= max) return plain.slice(0, end)
    break
  }
  const cut = plain.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

// Identity of the organisation in structured data, shared by symbol.ngo and its project sites.
export const SITE = 'https://symbol.ngo'

export const brandOf = (toEn: boolean) => (toEn ? 'NGO Symbol' : 'ГО «Символ»')

/** Canonical address of a main-site page: always the trailing slash GitHub Pages serves, `/en` for English. */
export const pageUrlOf = (path: string, toEn = false) => {
  const base = path === '/' ? '' : path.replace(/\/+$/, '')
  return `${SITE}${toEn ? '/en' : ''}${base}/`
}

/** Stable ids of the organisation and the website in structured data, one pair per language of the page. */
export const orgId = (toEn: boolean) => `${SITE}${toEn ? '/en' : ''}/#org`
export const websiteId = (toEn: boolean) => `${SITE}${toEn ? '/en' : ''}/#website`

/** The organisation as other structured-data blocks mention it (the full node is on the home page of symbol.ngo). */
export const orgRef = (toEn: boolean) => ({ '@type': 'NGO', '@id': orgId(toEn), name: brandOf(toEn), url: pageUrlOf('/', toEn) })
