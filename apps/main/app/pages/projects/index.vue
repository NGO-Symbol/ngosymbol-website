<script setup lang="ts">
useSeoMeta({ title: 'Проєкти', description: 'Усі проєкти ГО «Символ» за роками: виставки, фільми, плейбек-театр, тренінги, фестивалі.' })

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
  format: [...new Set(projects.flatMap(project => project.formats))].map(value => ({ value, label: formats[value]! })),
  direction: [...new Set(projects.flatMap(project => project.directions))].map(value => ({ value, label: directions[value]! })),
  status: [...new Set(projects.map(project => project.status))].map(value => ({ value, label: statusLabels[value]! }))
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

function observe() {
  observer?.disconnect()
  observer = new IntersectionObserver((entries) => {
    const top = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
    if (top) currentYear.value = Number((top.target as HTMLElement).dataset.year)
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
  document.getElementById(`year-${year}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  currentYear.value = year
}
</script>

<template>
  <section class="page container">
    <Breadcrumbs :items="[{ label: 'Проєкти' }]" />
    <div class="page-title">
      <span class="eyebrow">Архів та актуальні ініціативи</span>
      <h1>Проєкти</h1>
      <p>Усі проєкти «Символу» за роками. Кожен має сторінку з описом, людьми, партнерами й пресою. Великі проєкти мають ще й власні сайти.</p>
    </div>

    <div class="filter-panel" aria-label="Фільтри проєктів">
      <div v-for="(group, key) in options" :key="key" class="filters">
        <span class="filters__name">{{ key === 'format' ? 'Формат' : key === 'direction' ? 'Напрям' : 'Статус' }}:</span>
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
      <div v-if="hasFilters" class="filter-panel__result">
        <span>Знайдено: {{ visible.length }}</span>
        <button type="button" class="text-button" @click="clear">Скинути фільтри</button>
      </div>
    </div>

    <div class="chronology">
      <nav class="year-rail" aria-label="Роки">
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
        <p v-if="!visible.length" class="empty-note">За цими фільтрами проєктів немає. <button type="button" class="text-button" @click="clear">Скинути фільтри</button></p>
      </div>
    </div>
  </section>
</template>
