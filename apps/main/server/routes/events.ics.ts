// Calendar subscription feed (prerendered). Includes events and 'single' projects (ADR-0008).
import { eventItems, venueLine } from '../../app/utils/content'

const escape = (text: string) => text.replace(/[\\;,]/g, match => `\\${match}`).replace(/\n/g, '\\n')

// RFC 5545: content lines longer than 75 octets are folded (CRLF + space). Folding counts bytes, so Cyrillic
// (two bytes per letter) is split without breaking a character.
const fold = (line: string) => {
  const bytes = new TextEncoder()
  const parts: string[] = []
  let current = ''
  for (const char of line) {
    if (bytes.encode(current + char).length > (parts.length ? 74 : 75)) { parts.push(current); current = '' }
    current += char
  }
  parts.push(current)
  return parts.join('\r\n ')
}

// Kyiv time zone, so times with TZID=Europe/Kyiv are understood everywhere (Google drops an unknown TZID otherwise).
const kyivTimezone = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/Kyiv',
  'BEGIN:STANDARD',
  'DTSTART:19701025T040000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'TZOFFSETFROM:+0300',
  'TZOFFSETTO:+0200',
  'TZNAME:EET',
  'END:STANDARD',
  'BEGIN:DAYLIGHT',
  'DTSTART:19700329T030000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'TZOFFSETFROM:+0200',
  'TZOFFSETTO:+0300',
  'TZNAME:EEST',
  'END:DAYLIGHT',
  'END:VTIMEZONE'
]

// Local Kyiv time without a timezone database: floating times with TZID are understood by Google, Apple, Outlook.
const stamp = (iso: string, fallbackTime: string) => `${iso.slice(0, 10).replace(/-/g, '')}T${iso.length > 10 ? iso.slice(11, 16).replace(':', '') : fallbackTime}00`
const dateOnly = (iso: string, addDays = 0) => {
  const date = new Date(`${iso.slice(0, 10)}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + addDays)
  return date.toISOString().slice(0, 10).replace(/-/g, '')
}

// A timed event without an end lasts this long in the calendar (the programme's shortest listed events run 1.5–2 hours).
const DEFAULT_MINUTES = 120
/** Local time `minutes` later, as an ICS local date-time (no time zone: TZID=Europe/Kyiv is applied by the caller). */
const plusMinutes = (iso: string, minutes: number) => {
  const date = new Date(`${iso.slice(0, 16)}:00Z`)
  date.setUTCMinutes(date.getUTCMinutes() + minutes)
  return date.toISOString().slice(0, 16).replace(/[-:]/g, '') + '00'
}
// DTSTAMP is a content date, never the build time: the day the event takes place (the feed then stays the same between builds).
const contentStamp = (iso: string) => `${iso.slice(0, 10).replace(/-/g, '')}T000000Z`

export default defineEventHandler((event) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NGO Symbol//symbol.ngo//UK',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Події ГО «Символ»',
    'X-WR-CALDESC:Відкриття\\, екскурсії\\, перформанси й лекції ГО «Символ». https://symbol.ngo/events',
    'X-WR-TIMEZONE:Europe/Kyiv',
    // Subscribed calendars re-read the feed about twice a day.
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
    ...kyivTimezone
  ]
  for (const item of eventItems) {
    const timed = item.start.length > 10
    lines.push(
      'BEGIN:VEVENT',
      `UID:${item.slug}@symbol.ngo`,
      `DTSTAMP:${contentStamp(item.start)}`,
      timed ? `DTSTART;TZID=Europe/Kyiv:${stamp(item.start, '0000')}` : `DTSTART;VALUE=DATE:${dateOnly(item.start)}`,
      timed ? `DTEND;TZID=Europe/Kyiv:${item.end && item.end.length > 10 ? stamp(item.end, '2359') : plusMinutes(item.start, DEFAULT_MINUTES)}` : `DTEND;VALUE=DATE:${dateOnly(item.end ?? item.start, 1)}`,
      `SUMMARY:${escape(item.title)}`,
      `LOCATION:${escape(venueLine(item.venue))}`,
      `DESCRIPTION:${escape(`Проєкт «${item.project.title}». https://symbol.ngo${item.to}`)}`,
      `URL:https://symbol.ngo${item.to}`,
      'END:VEVENT'
    )
  }
  lines.push('END:VCALENDAR')
  setResponseHeader(event, 'content-type', 'text/calendar; charset=utf-8')
  return lines.map(fold).join('\r\n') + '\r\n'
})
