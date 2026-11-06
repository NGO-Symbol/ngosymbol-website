<script setup lang="ts">
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
useSeoMeta({ title: () => t('Проєкти', 'Projects'), description: () => t('Усі проєкти ГО «Символ» за роками: виставки, фільми, плейбек-театр, тренінги, фестивалі.', 'All NGO Symbol projects by year: exhibitions, films, playback theatre, training, and festivals.') })

const route = useRoute()
const router = useRouter()

type FilterKey = 'format' | 'direction' | 'status'
const selected = (key: FilterKey) => String(route.query[key] ?? '').split(',').filter(Boolean)

function toggle(key: FilterKey, value: string) {
  const values = new Set(selected(key))
  values.has(value) ? values.delete(value) : values.add(value)
  router.replace({ query: { ...route.query, [key]: values.size ? [...values].join(',') : undefined } })
}

function clear() {
  router.replace({ query: { ...route.query, format: undefined, direction: undefined, status: undefined } })
}

// Phones: the filters live behind one button in the sticky bar; the panel opens under it and leaves the page in place.
const filtersOpen = ref(false)
const bar = ref<HTMLElement>()
function openFilters() {
  filtersOpen.value = true
  // The bar may still be low on the screen: bring it up so the whole panel, with «Готово», fits.
  const chronology = bar.value?.parentElement
  if (chronology && chronology.getBoundingClientRect().top > 0) chronology.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function closeFilters() {
  if (!filtersOpen.value) return
  filtersOpen.value = false
  // The list may have changed under the panel: start reading it from the top.
  const first = document.querySelector('.year-block')
  if (first && first.getBoundingClientRect().top < 0) first.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function onOutside(event: PointerEvent) {
  if (filtersOpen.value && !bar.value?.contains(event.target as Node)) closeFilters()
}
function onFilterKey(event: KeyboardEvent) {
  if (event.key === 'Escape') closeFilters()
}
onMounted(() => { document.addEventListener('pointerdown', onOutside); document.addEventListener('keydown', onFilterKey) })
onBeforeUnmount(() => { document.removeEventListener('pointerdown', onOutside); document.removeEventListener('keydown', onFilterKey) })
watch(() => route.path, () => { filtersOpen.value = false })

// Only values that occur in projects are offered as filters.
const options = {
  format: [...new Set(projects.flatMap(project => project.formats))].map(value => ({ value, label: translate(formats[value]!, isEn.value) })),
  direction: [...new Set(projects.flatMap(project => project.directions))].map(value => ({ value, label: translate(directions[value]!, isEn.value) })),
  status: [...new Set(projects.map(project => project.status))].map(value => ({ value, label: translate(statusLabels[value]!, isEn.value) }))
}

const valuesOf: Record<FilterKey, (project: (typeof projects)[number]) => string[]> = {
  format: project => project.formats,
  direction: project => project.directions,
  status: project => [project.status]
}
const filterKeys = Object.keys(valuesOf) as FilterKey[]
// Options within a group add up, groups narrow each other down.
const matches = (project: (typeof projects)[number], skip?: FilterKey) => filterKeys.every((key) => {
  const chosen = selected(key)
  return key === skip || !chosen.length || valuesOf[key](project).some(value => chosen.includes(value))
})
const visible = computed(() => projects.filter(project => matches(project)))

const hasFilters = computed(() => filterKeys.some(key => selected(key).length))
const activeCount = computed(() => filterKeys.reduce((sum, key) => sum + selected(key).length, 0))
// How many projects an option would show next to what is already chosen; a dead end (0) cannot be picked.
const countOf = (key: FilterKey, value: string) => projects.filter(project => matches(project, key) && valuesOf[key](project).includes(value)).length
function pick(key: FilterKey, value: string) {
  if (countOf(key, value) || selected(key).includes(value)) toggle(key, value)
}

// Chronology: newest first, only years that have projects.
const years = computed(() => [...new Set(visible.value.map(project => project.yearStart))].sort((a, b) => b - a))
const byYear = (year: number) => visible.value.filter(project => project.yearStart === year)

const currentYear = ref<number>()
let observer: IntersectionObserver | undefined
// While a click scrolls the page to a year, the years passed on the way do not flicker in the rail.
let jumping = 0

function observe() {
  observer?.disconnect()
  observer = new IntersectionObserver((entries) => {
    const top = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
    if (top && Date.now() > jumping) currentYear.value = Number((top.target as HTMLElement).dataset.year)
  }, { rootMargin: '-20% 0px -60% 0px' })
  document.querySelectorAll<HTMLElement>('[data-year]').forEach(el => observer!.observe(el))
}

onMounted(() => {
  currentYear.value = years.value[0]
  observe()
})
watch(years, () => nextTick(observe))
onBeforeUnmount(() => observer?.disconnect())

function jump(year: number) {
  filtersOpen.value = false
  jumping = Date.now() + 900
  document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  currentYear.value = year
}

// One underline glides from year to year (instead of jumping), measured from the active button.
const rail = ref<HTMLElement>()
const ink = ref({ x: 0, y: 0, width: 0, ready: false })
function placeInk() {
  const button = rail.value?.querySelector<HTMLElement>('button.active')
  if (!button) return
  // The active year is drawn 8% larger from its left edge (see .year-rail button.active).
  ink.value = { x: button.offsetLeft, y: button.offsetTop + button.offsetHeight - 3, width: button.offsetWidth * 1.08, ready: true }
  // Phones: the rail scrolls sideways, so the active year is brought into view.
  if (rail.value && rail.value.scrollWidth > rail.value.clientWidth) {
    rail.value.scrollTo({ left: button.offsetLeft - rail.value.clientWidth / 2 + button.offsetWidth / 2, behavior: 'smooth' })
  }
}
watch(currentYear, () => nextTick(placeInk))
onMounted(() => { nextTick(placeInk); window.addEventListener('resize', placeInk) })
onBeforeUnmount(() => window.removeEventListener('resize', placeInk))
</script>

<template>
  <section class="page container">
    <Breadcrumbs />
    <div class="page-title">
      <span class="eyebrow">{{ t('Архів та актуальні ініціативи', 'Archive and current initiatives') }}</span>
      <h1>{{ t('Проєкти', 'Projects') }}</h1>
      <p>{{ t('Усі проєкти «Символу» за роками. Кожен має сторінку з описом, людьми, партнерами й пресою. Великі проєкти мають ще й власні сайти.', 'All Symbol projects by year. Each page includes its story, people, partners, and press coverage. Larger projects may also have dedicated websites.') }}</p>
    </div>

    <div class="chronology">
      <!-- Wide screens: its children sit straight in the .chronology grid. Phones: one sticky bar, the button and the years in a row, the panel under them. -->
      <div ref="bar" class="projects-bar">
        <button type="button" class="filters-toggle" aria-controls="project-filters" :aria-expanded="filtersOpen" :aria-label="activeCount ? `${t('Фільтри, обрано', 'Filters, selected')}: ${activeCount}` : t('Фільтри', 'Filters')" @click="filtersOpen ? closeFilters() : openFilters()">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2.2" /><circle cx="8" cy="17" r="2.2" /></svg>
          <span>{{ t('Фільтри', 'Filters') }}</span>
          <span v-if="activeCount" class="filters-toggle__badge" aria-hidden="true">{{ activeCount }}</span>
        </button>
        <div id="project-filters" class="filter-panel" :class="{ 'is-open': filtersOpen }" role="group" :aria-label="t('Фільтри проєктів', 'Project filters')">
          <div class="filter-panel__scroll">
            <div v-for="(group, key) in options" :key="key" class="filters" role="group" :aria-labelledby="`filter-${key}`">
              <span :id="`filter-${key}`" class="filters__name">{{ key === 'format' ? t('Формат', 'Format') : key === 'direction' ? t('Напрям', 'Field') : t('Статус', 'Status') }}<span class="filters__colon">:</span></span>
              <span class="filters__options">
              <button
                v-for="option in group"
                :key="option.value"
                type="button"
                :aria-pressed="selected(key as FilterKey).includes(option.value)"
                :aria-disabled="!countOf(key as FilterKey, option.value) && !selected(key as FilterKey).includes(option.value) ? 'true' : undefined"
                :class="{ active: selected(key as FilterKey).includes(option.value) }"
                @click="pick(key as FilterKey, option.value)"
              >{{ option.label }}<span class="filters__count">{{ countOf(key as FilterKey, option.value) }}</span></button>
              </span>
            </div>
          </div>
          <div class="filter-panel__result" :class="{ 'is-empty': !hasFilters }">
            <span aria-live="polite">{{ t('Знайдено', 'Found') }}: {{ visible.length }}</span>
            <button type="button" class="text-button" :tabindex="hasFilters ? undefined : -1" @click="clear">{{ t('Скинути фільтри', 'Clear filters') }}</button>
            <button type="button" class="filter-panel__done" @click="closeFilters">{{ t('Готово', 'Done') }}</button>
          </div>
        </div>
        <nav ref="rail" class="year-rail" :aria-label="t('Роки', 'Years')">
        <span class="year-rail__ink" :class="{ 'is-ready': ink.ready }" :style="{ transform: `translate(${ink.x}px, ${ink.y}px)`, width: `${ink.width}px` }" aria-hidden="true" />
        <button
          v-for="year in years"
          :key="year"
          type="button"
          :class="{ active: currentYear === year }"
          :aria-current="currentYear === year ? 'true' : undefined"
          @click="jump(year)"
        >{{ year }}</button>
        </nav>
      </div>
      <div class="chronology__years">
        <section v-for="year in years" :id="`year-${year}`" :key="year" class="year-block" :data-year="year">
          <h2 class="year-block__title">{{ year }}</h2>
          <div class="project-grid project-grid--archive">
            <ProjectCard v-for="project in byYear(year)" :key="project.slug" :project="project" />
          </div>
        </section>
        <p v-if="!visible.length" class="empty-note">{{ t('За цими фільтрами проєктів немає.', 'No projects match these filters.') }} <button type="button" class="text-button" @click="clear">{{ t('Скинути фільтри', 'Clear filters') }}</button></p>
      </div>
    </div>
  </section>
</template>
