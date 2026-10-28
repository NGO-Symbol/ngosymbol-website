// Calendar subscription feed (prerendered). Includes events and 'single' projects (ADR-0006).
import { eventItems, venueLine } from '../../app/utils/content'

const escape = (text: string) => text.replace(/[\\;,]/g, match => `\\${match}`).replace(/\n/g, '\\n')

// Local Kyiv time without a timezone database: floating times with TZID are understood by Google, Apple, Outlook.
const stamp = (iso: string, fallbackTime: string) => `${iso.slice(0, 10).replace(/-/g, '')}T${iso.length > 10 ? iso.slice(11, 16).replace(':', '') : fallbackTime}00`
const dateOnly = (iso: string, addDays = 0) => {
  const date = new Date(`${iso.slice(0, 10)}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + addDays)
  return date.toISOString().slice(0, 10).replace(/-/g, '')
}

export default defineEventHandler((event) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NGO Symbol//symbol.ngo//UK',
    'CALSCALE:GREGORIAN',
    'X-WR-CALNAME:Події ГО «Символ»',
    'X-WR-TIMEZONE:Europe/Kyiv'
  ]
  for (const item of eventItems) {
    const timed = item.start.length > 10
    lines.push(
      'BEGIN:VEVENT',
      `UID:${item.slug}@symbol.ngo`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
      timed ? `DTSTART;TZID=Europe/Kyiv:${stamp(item.start, '0000')}` : `DTSTART;VALUE=DATE:${dateOnly(item.start)}`,
      timed ? `DTEND;TZID=Europe/Kyiv:${stamp(item.end ?? item.start, '2359')}` : `DTEND;VALUE=DATE:${dateOnly(item.end ?? item.start, 1)}`,
      `SUMMARY:${escape(item.title)}`,
      `LOCATION:${escape(venueLine(item.venue))}`,
      `DESCRIPTION:${escape(`Проєкт «${item.project.title}»`)}`,
      `URL:https://symbol.ngo${item.to}`,
      'END:VEVENT'
    )
  }
  lines.push('END:VCALENDAR')
  setResponseHeader(event, 'content-type', 'text/calendar; charset=utf-8')
  return lines.join('\r\n')
})
