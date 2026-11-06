<script setup lang="ts">
// «Символ» by year, counted from the site's own records (no hand-typed numbers): each year names its projects, and one
// shared scale shows its events, so the bars compare honestly. The other totals stay as a line of links underneath.
const { isEn, localePath } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk

const artists = people.filter(person => projects.some(project => project.people?.some(credit => credit.person === person.slug && credit.role === 'Митці')))
const places = new Set([...projects.map(project => project.city), ...eventItems.map(item => item.venue.city)])
const countries = new Set(projects.map(project => project.country ?? 'Україна'))
const partners = organizations.filter(org => projects.some(project => project.partners?.includes(org.slug) || project.donors?.includes(org.slug)))

const eventsIn = (year: number) => eventItems.filter(item => item.start.startsWith(String(year))).length
const years = [...new Set(projects.map(project => project.yearStart))].sort((a, b) => a - b).map(year => ({
  year,
  projects: projects.filter(project => project.yearStart === year),
  events: eventsIn(year)
}))
const maxEvents = Math.max(...years.map(item => item.events), 1)
const hasPartnerProjects = projects.some(project => project.role === 'partner')

// Ukrainian counts: 1 подія, 2–4 події, 5+ подій (the other labels here read correctly with any number the data gives today).
function eventsWord(count: number) {
  const tens = count % 100
  const units = count % 10
  if (tens > 10 && tens < 15) return 'подій'
  return units === 1 ? 'подія' : units > 1 && units < 5 ? 'події' : 'подій'
}

const totals = computed(() => [
  { value: projects.length, label: t('проєктів', 'projects'), to: '/projects' },
  { value: eventItems.length, label: t(eventsWord(eventItems.length), 'events'), to: '/events' },
  { value: artists.length, label: t('митців', 'artists'), to: '/people' },
  { value: partners.length, label: t('партнерів і донорів', 'partners and donors'), to: '/about#partners' },
  { value: places.size, label: t(`місць у ${countries.size} країнах`, `places in ${countries.size} countries`), to: '/projects' }
])

// The event bars grow once, when the block comes into view (they are already full without JS or with reduced motion).
const root = ref<HTMLElement>()
const waiting = ref(false)
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !root.value) return
  waiting.value = true
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    waiting.value = false
    observer.disconnect()
  }, { threshold: .2 })
  observer.observe(root.value)
})
</script>

<template>
  <section ref="root" class="stats container" :class="{ 'is-waiting': waiting }" aria-labelledby="stats-title">
    <span class="label">{{ t('Хронологія', 'Chronology') }}</span>
    <h2 id="stats-title" class="stats__title">{{ t('Проєкти й події за роками', 'Projects and events by year') }}</h2>
    <ol class="stats__years">
      <li v-for="(item, index) in years" :key="item.year" class="stats__year" :style="{ '--i': index }">
        <NuxtLink class="stats__number" :to="localePath(`/projects#year-${item.year}`)">{{ item.year }}</NuxtLink>
        <ul class="stats__projects">
          <li v-for="project in item.projects" :key="project.slug" :class="{ 'is-partner': project.role === 'partner' }">
            <NuxtLink :to="localePath(`/projects/${project.slug}`)">{{ projectTitleIn(project, isEn) }}</NuxtLink>
          </li>
        </ul>
        <div class="stats__events">
          <span class="stats__events-label"><span>{{ t('Події', 'Events') }}</span><b>{{ item.events }}</b></span>
          <span class="stats__track" aria-hidden="true"><span class="stats__fill" :style="{ width: `${item.events / maxEvents * 100}%` }" /></span>
        </div>
      </li>
    </ol>
    <p v-if="hasPartnerProjects" class="stats__key"><span class="stats__mark" /> {{ t('«Символ» організатор', 'Organised by Symbol') }} <span class="stats__mark stats__mark--partner" /> {{ t('«Символ» партнер', 'Symbol as a partner') }}</p>
    <p class="stats__totals">
      <NuxtLink v-for="item in totals" :key="item.label" :to="localePath(item.to)"><b>{{ item.value }}</b> {{ item.label }}</NuxtLink>
    </p>
  </section>
</template>

<style scoped>
.stats { padding-block: clamp(40px, 6vw, 80px); }
.stats__title { margin: 6px 0 0; font-size: clamp(1.8rem, calc(1rem + 2.4vw), 3rem); line-height: 1.08; }
.stats__years { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); list-style: none; margin: 30px 0 0; padding: 0; border-top: 1px solid var(--symbol-plum); }
.stats__year { display: flex; flex-direction: column; gap: 12px; min-width: 0; padding: 18px 20px 20px; }
.stats__year:first-child { padding-left: 0; }
.stats__year + .stats__year { border-left: 1px solid color-mix(in srgb, var(--symbol-plum) 30%, transparent); }
.stats__number { width: fit-content; font-family: var(--font-display); font-size: clamp(2.2rem, calc(1.2rem + 2.2vw), 3.2rem); line-height: 1; text-decoration: none; font-variant-numeric: tabular-nums; }
.stats__projects { display: grid; gap: 7px; list-style: none; margin: 0; padding: 0; font-size: .98rem; line-height: 1.3; }
.stats__projects li { display: grid; grid-template-columns: 10px minmax(0, 1fr); gap: 9px; }
.stats__projects li::before { content: ''; width: 10px; height: 10px; margin-top: .36em; background: var(--symbol-violet); }
.stats__projects li.is-partner::before { background: var(--symbol-apricot); box-shadow: inset 0 0 0 1px var(--symbol-plum); }
.stats__projects a { text-decoration: none; background-image: linear-gradient(currentColor, currentColor); background-size: 0 1px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size .3s ease; }
.stats__projects a:hover { background-size: 100% 1px; }
.stats__events { margin-top: auto; padding-top: 12px; }
.stats__events-label { display: flex; justify-content: space-between; align-items: baseline; font-size: .88rem; }
.stats__events-label b { font-family: var(--font-display); font-size: 1.7rem; font-weight: 400; line-height: 1; font-variant-numeric: tabular-nums; }
.stats__track { display: block; height: 8px; margin-top: 6px; background: color-mix(in srgb, var(--symbol-lilac) 60%, transparent); }
.stats__fill { display: block; height: 100%; background: var(--symbol-violet); transform-origin: left; transition: transform .9s cubic-bezier(.2, .9, .3, 1) calc(var(--i) * 90ms); }
.is-waiting .stats__fill { transform: scaleX(0); }
.stats__key { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; margin: 14px 0 0; font-size: .82rem; color: color-mix(in srgb, var(--symbol-plum) 78%, transparent); }
.stats__mark { width: 10px; height: 10px; background: var(--symbol-violet); }
.stats__mark--partner { margin-left: 10px; background: var(--symbol-apricot); box-shadow: inset 0 0 0 1px var(--symbol-plum); }
.stats__totals { display: flex; flex-wrap: wrap; gap: 6px 22px; margin: 18px 0 0; font-size: .98rem; }
.stats__totals a { text-decoration: none; border-bottom: 1px solid color-mix(in srgb, var(--symbol-plum) 40%, transparent); }
.stats__totals a:hover { border-bottom-color: var(--symbol-plum); }
.stats__totals b { font-weight: 400; font-family: var(--font-display); font-size: 1.15rem; font-variant-numeric: tabular-nums; }
/* Tablets: two by two. Phones: each year is a row, its number on the left. */
@media (max-width: 960px) {
  .stats__years { grid-auto-flow: row; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stats__year:nth-child(odd) { padding-left: 0; border-left: 0; }
  .stats__year:nth-child(n+3) { border-top: 1px solid color-mix(in srgb, var(--symbol-plum) 30%, transparent); }
}
@media (max-width: 620px) {
  .stats { padding-block: 32px; }
  .stats__years { grid-template-columns: minmax(0, 1fr); margin-top: 20px; }
  .stats__year, .stats__year + .stats__year { display: grid; grid-template-columns: 72px minmax(0, 1fr); gap: 8px 12px; padding: 14px 0; border-left: 0; }
  .stats__year + .stats__year { border-top: 1px solid color-mix(in srgb, var(--symbol-plum) 30%, transparent); }
  .stats__number { grid-row: span 2; font-size: 1.7rem; }
  .stats__events { grid-column: 2; padding-top: 2px; }
}
@media (prefers-reduced-motion: reduce) { .stats__fill { transition: none; } }
</style>
