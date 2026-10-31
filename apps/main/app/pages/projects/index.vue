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
  router.replace({ query: {} })
}

// Only values that occur in projects are offered as filters.
const options = {
  format: [...new Set(projects.flatMap(project => project.formats))].map(value => ({ value, label: translate(formats[value]!, isEn.value) })),
  direction: [...new Set(projects.flatMap(project => project.directions))].map(value => ({ value, label: translate(directions[value]!, isEn.value) })),
  status: [...new Set(projects.map(project => project.status))].map(value => ({ value, label: translate(statusLabels[value]!, isEn.value) }))
}

const visible = computed(() => projects.filter((project) => {
  const formatsSel = selected('format')
  const directionsSel = selected('direction')
  const statusSel = selected('status')
  return (!formatsSel.length || project.formats.some(f => formatsSel.includes(f)))
    && (!directionsSel.length || project.directions.some(d => directionsSel.includes(d)))
    && (!statusSel.length || statusSel.includes(project.status))
}))

const hasFilters = computed(() => (['format', 'direction', 'status'] as FilterKey[]).some(key => selected(key).length))

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

    <div class="filter-panel" :aria-label="t('Фільтри проєктів', 'Project filters')">
      <div v-for="(group, key) in options" :key="key" class="filters">
        <span class="filters__name">{{ key === 'format' ? t('Формат', 'Format') : key === 'direction' ? t('Напрям', 'Field') : t('Статус', 'Status') }}:</span>
        <span class="filters__options">
        <button
          v-for="option in group"
          :key="option.value"
          type="button"
          :aria-pressed="selected(key as FilterKey).includes(option.value)"
          :class="{ active: selected(key as FilterKey).includes(option.value) }"
          @click="toggle(key as FilterKey, option.value)"
        >{{ option.label }}</button>
        </span>
      </div>
      <div class="filter-panel__result" :class="{ 'is-empty': !hasFilters }" :aria-hidden="!hasFilters">
        <span aria-live="polite">{{ t('Знайдено', 'Found') }}: {{ visible.length }}</span>
        <button type="button" class="text-button" :tabindex="hasFilters ? undefined : -1" @click="clear">{{ t('Скинути фільтри', 'Clear filters') }}</button>
      </div>
    </div>

    <div class="chronology">
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
