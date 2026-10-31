<script setup lang="ts">
import { projectsEn } from '~/data/projects-en'
import { eventsEn } from '~/data/events-en'
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
useSeoMeta({ title: () => t('Події', 'Events'), description: () => t('Події ГО «Символ»: відкриття, екскурсії, перформанси, лекції. Список і календар.', 'NGO Symbol events: openings, tours, performances, and lectures. List and calendar views.') })
const eventTitle = (item: (typeof eventItems)[number]) => isEn.value ? (item.isProject ? projectsEn[item.slug]?.title : eventsEn[item.slug]?.title) ?? item.title : item.title
const projectTitle = (project: (typeof projects)[number]) => isEn.value ? projectsEn[project.slug]?.title ?? project.title : project.title

// «Підписатися на календар подій» elsewhere on the site opens this page straight in the calendar (?view=calendar).
const route = useRoute()
const view = ref<'list' | 'calendar'>(route.query.view === 'calendar' ? 'calendar' : 'list')
const projectFilter = ref('')

const eventProjects = [...new Map(eventItems.map(item => [item.project.slug, item.project])).values()]
const filtered = computed(() => eventItems.filter(item => !projectFilter.value || item.project.slug === projectFilter.value))
const upcoming = computed(() => filtered.value.filter(isUpcoming).reverse())
const past = computed(() => filtered.value.filter(item => !isUpcoming(item)))
// The archive by year, newest first — the same card grid as the People page.
const pastYears = computed(() => {
  const groups = new Map<string, typeof eventItems>()
  for (const item of past.value) groups.set(item.start.slice(0, 4), [...(groups.get(item.start.slice(0, 4)) ?? []), item])
  return [...groups].map(([year, items]) => ({ year, items }))
})

// Calendar month: the month of the nearest upcoming event, otherwise of the latest event.
const initial = (upcoming.value[0] ?? past.value[0])?.start ?? todayIso()
const month = ref({ year: Number(initial.slice(0, 4)), month: Number(initial.slice(5, 7)) - 1 })

function shift(delta: number) {
  const date = new Date(month.value.year, month.value.month + delta, 1)
  month.value = { year: date.getFullYear(), month: date.getMonth() }
}

// A multi-day event (a festival, a tour) is marked in each of its days: start, «триває», last day.
function spanLabel(item: { start: string; end?: string }, iso: string) {
  const first = item.start.slice(0, 10)
  const last = (item.end ?? item.start).slice(0, 10)
  if (first === last) return item.start.length > 10 ? item.start.slice(11, 16) : t('увесь день', 'all day')
  if (iso === first) return item.start.length > 10 ? `${t('з', 'from')} ${item.start.slice(11, 16)} · ${t('початок', 'starts')}` : t('початок', 'starts')
  if (iso === last) return t('завершення', 'ends')
  return t('триває', 'continues')
}

const monthEvents = computed(() => {
  const { year, month: m } = month.value
  const first = `${year}-${String(m + 1).padStart(2, '0')}-01`
  const last = `${year}-${String(m + 1).padStart(2, '0')}-${String(new Date(year, m + 1, 0).getDate()).padStart(2, '0')}`
  return filtered.value.filter(item => item.start.slice(0, 10) <= last && (item.end ?? item.start).slice(0, 10) >= first).sort((a, b) => a.start.localeCompare(b.start))
})

const days = computed(() => {
  const { year, month: m } = month.value
  const first = new Date(year, m, 1)
  const offset = (first.getDay() + 6) % 7 // weeks start on Monday
  const count = new Date(year, m + 1, 0).getDate()
  const cells: { day?: number; iso?: string; items: typeof eventItems }[] = Array.from({ length: offset }, () => ({ items: [] }))
  for (let day = 1; day <= count; day++) {
    const iso = `${year}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const items = filtered.value.filter(item => iso >= item.start.slice(0, 10) && iso <= (item.end ?? item.start).slice(0, 10))
    cells.push({ day, iso, items })
  }
  return cells
})
</script>

<template>
  <section class="page container">
    <Breadcrumbs />
    <div class="page-title">
      <span class="eyebrow">{{ t('Календар', 'Calendar') }}</span>
      <h1>{{ t('Події', 'Events') }}</h1>
      <p>{{ t('Відкриття, екскурсії, перформанси й лекції. Кожна подія належить проєкту «Символу».', 'Openings, tours, performances, and lectures. Every event belongs to a Symbol project.') }}</p>
    </div>

    <div class="events-toolbar">
      <div class="segmented" role="group" :aria-label="t('Вигляд', 'View')">
        <button type="button" :class="{ active: view === 'list' }" :aria-pressed="view === 'list'" @click="view = 'list'">{{ t('Список', 'List') }}</button>
        <button type="button" :class="{ active: view === 'calendar' }" :aria-pressed="view === 'calendar'" @click="view = 'calendar'">{{ t('Календар', 'Calendar') }}</button>
      </div>
      <ProjectPicker v-model="projectFilter" :label="t('Проєкт', 'Project')" :all-label="t('Усі проєкти', 'All projects')" :options="eventProjects.map(project => ({ value: project.slug, label: projectTitle(project) }))" />
      <CalendarSubscribe :en="isEn" />
    </div>

    <template v-if="view === 'list'">
      <section class="events-block">
        <h2 class="block-title">{{ t('Майбутні', 'Upcoming') }}</h2>
        <ul v-if="upcoming.length" class="people-grid"><li v-for="item in upcoming" :key="item.slug"><EventCard :item="item" /></li></ul>
        <p v-else class="empty-note">{{ t('Нові анонси готуються. Підпишіться на календар, щоб не пропустити.', 'New announcements are on the way. Subscribe to the calendar so you do not miss them.') }}</p>
      </section>
      <section v-for="year in pastYears" :key="year.year" class="events-block">
        <h2 class="block-title">{{ year.year }}</h2>
        <ul class="people-grid"><li v-for="item in year.items" :key="item.slug"><EventCard :item="item" /></li></ul>
      </section>
    </template>

    <section v-else class="calendar">
      <div class="calendar__head">
        <button type="button" :aria-label="t('Попередній місяць', 'Previous month')" @click="shift(-1)">←</button>
        <h2>{{ isEn ? ['January','February','March','April','May','June','July','August','September','October','November','December'][month.month] : monthNames[month.month] }} {{ month.year }}</h2>
        <button type="button" :aria-label="t('Наступний місяць', 'Next month')" @click="shift(1)">→</button>
      </div>
      <div class="calendar__grid">
        <span v-for="weekday in (isEn ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'])" :key="weekday" class="calendar__weekday">{{ weekday }}</span>
        <div v-for="(cell, index) in days" :key="index" class="calendar__cell" :class="{ 'has-events': cell.items.length, 'is-today': cell.iso === todayIso() }">
          <span v-if="cell.day" class="calendar__day">{{ cell.day }}</span>
          <NuxtLink v-for="item in cell.items" :key="item.slug" class="calendar__event" :class="[`tone-${item.project.tone}`, { 'is-past': !isUpcoming(item), 'is-continued': cell.iso !== item.start.slice(0, 10) }]" :to="item.to" :title="eventTitle(item)">
            <MediaImg v-if="item.cover && cell.iso === item.start.slice(0, 10)" class="calendar__thumb" :src="item.cover" :alt="eventTitle(item)" loading="lazy" />
            <span class="calendar__when">{{ spanLabel(item, cell.iso!) }}</span>
            <span class="calendar__title">{{ eventTitle(item) }}</span>
            <span class="calendar__format">{{ translate(formats[item.format]!, isEn) }}</span>
          </NuxtLink>
        </div>
      </div>
      <!-- On phones the cells only carry coloured marks; the month's events are listed here in full. -->
      <ul v-if="monthEvents.length" class="calendar__list">
        <li v-for="item in monthEvents" :key="item.slug">
          <NuxtLink class="calendar__event" :class="[`tone-${item.project.tone}`, { 'is-past': !isUpcoming(item) }]" :to="item.to">
            <span class="calendar__when">{{ isEn ? formatRangeEn(item.start, item.end) : formatRange(item.start, item.end) }}</span>
            <span class="calendar__title">{{ eventTitle(item) }}</span>
            <span class="calendar__format">{{ translate(formats[item.format]!, isEn) }} · {{ projectTitle(item.project) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </section>
</template>
