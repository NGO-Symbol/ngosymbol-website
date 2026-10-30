<script setup lang="ts">
useSeoMeta({ title: 'Події', description: 'Події ГО «Символ»: відкриття, екскурсії, перформанси, лекції. Список і календар.' })

const view = ref<'list' | 'calendar'>('list')
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
  if (first === last) return item.start.length > 10 ? item.start.slice(11, 16) : 'увесь день'
  if (iso === first) return item.start.length > 10 ? `з ${item.start.slice(11, 16)} · початок` : 'початок'
  if (iso === last) return 'завершення'
  return 'триває'
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
    <Breadcrumbs :items="[{ label: 'Події' }]" />
    <div class="page-title">
      <span class="eyebrow">Календар</span>
      <h1>Події</h1>
      <p>Відкриття, екскурсії, перформанси й лекції. Кожна подія належить проєкту «Символу».</p>
    </div>

    <div class="events-toolbar">
      <div class="segmented" role="group" aria-label="Вигляд">
        <button type="button" :class="{ active: view === 'list' }" :aria-pressed="view === 'list'" @click="view = 'list'">Список</button>
        <button type="button" :class="{ active: view === 'calendar' }" :aria-pressed="view === 'calendar'" @click="view = 'calendar'">Календар</button>
      </div>
      <ProjectPicker v-model="projectFilter" label="Проєкт" all-label="Усі проєкти" :options="eventProjects.map(project => ({ value: project.slug, label: project.title }))" />
      <CalendarSubscribe />
    </div>

    <template v-if="view === 'list'">
      <section class="events-block">
        <h2 class="block-title">Майбутні</h2>
        <ul v-if="upcoming.length" class="people-grid"><li v-for="item in upcoming" :key="item.slug"><EventCard :item="item" /></li></ul>
        <p v-else class="empty-note">Нові анонси готуються. Підпишіться на календар, щоб не пропустити.</p>
      </section>
      <section v-for="year in pastYears" :key="year.year" class="events-block">
        <h2 class="block-title">{{ year.year }}</h2>
        <ul class="people-grid"><li v-for="item in year.items" :key="item.slug"><EventCard :item="item" /></li></ul>
      </section>
    </template>

    <section v-else class="calendar">
      <div class="calendar__head">
        <button type="button" aria-label="Попередній місяць" @click="shift(-1)">←</button>
        <h2>{{ monthNames[month.month] }} {{ month.year }}</h2>
        <button type="button" aria-label="Наступний місяць" @click="shift(1)">→</button>
      </div>
      <div class="calendar__grid">
        <span v-for="weekday in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']" :key="weekday" class="calendar__weekday">{{ weekday }}</span>
        <div v-for="(cell, index) in days" :key="index" class="calendar__cell" :class="{ 'has-events': cell.items.length, 'is-today': cell.iso === todayIso() }">
          <span v-if="cell.day" class="calendar__day">{{ cell.day }}</span>
          <NuxtLink v-for="item in cell.items" :key="item.slug" class="calendar__event" :class="[`tone-${item.project.tone}`, { 'is-past': !isUpcoming(item), 'is-continued': cell.iso !== item.start.slice(0, 10) }]" :to="item.to" :title="item.title">
            <MediaImg v-if="item.cover && cell.iso === item.start.slice(0, 10)" class="calendar__thumb" :src="item.cover" loading="lazy" />
            <span class="calendar__when">{{ spanLabel(item, cell.iso!) }}</span>
            <span class="calendar__title">{{ item.title }}</span>
            <span class="calendar__format">{{ formats[item.format] }}</span>
          </NuxtLink>
        </div>
      </div>
      <!-- On phones the cells only carry coloured marks; the month's events are listed here in full. -->
      <ul v-if="monthEvents.length" class="calendar__list">
        <li v-for="item in monthEvents" :key="item.slug">
          <NuxtLink class="calendar__event" :class="[`tone-${item.project.tone}`, { 'is-past': !isUpcoming(item) }]" :to="item.to">
            <span class="calendar__when">{{ formatRange(item.start, item.end) }}</span>
            <span class="calendar__title">{{ item.title }}</span>
            <span class="calendar__format">{{ formats[item.format] }} · {{ item.project.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </section>
</template>
