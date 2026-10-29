<script setup lang="ts">
// Interactive indicators counted from the site's own records (no hand-typed numbers): they count up when
// they scroll into view, each links to the list it counts, and the ring shows the share of the largest value.
const artists = people.filter(person => projects.some(project => project.people?.some(credit => credit.person === person.slug && credit.role === 'Митці')))
const places = new Set([...projects.map(project => project.city), ...eventItems.map(item => item.venue.city)])
const countries = new Set(projects.map(project => project.country ?? 'Україна'))
const partners = organizations.filter(org => projects.some(project => project.partners?.includes(org.slug) || project.donors?.includes(org.slug)))

const stats = [
  { value: projects.length, label: 'проєктів', hint: 'виставки, фільми, плейбек, тренінги, фестивалі', to: '/projects' },
  { value: eventItems.length, label: 'подій', hint: 'відкриття, екскурсії, лекції, перформанси', to: '/events' },
  { value: artists.length, label: 'митців у наших виставках', hint: 'від Павла Макова до дебютантів', to: '/people' },
  { value: partners.length, label: 'партнерів і донорів', hint: 'інституції, фонди, програми', to: '/about#partners' },
  { value: places.size, label: 'міст', hint: `${countries.size} країни`, to: '/projects' }
]
const max = Math.max(...stats.map(stat => stat.value))

const root = ref<HTMLElement>()
const shown = ref(stats.map(stat => stat.value))
const started = ref(false)

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shown.value = stats.map(() => 0)
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting || started.value) return
    started.value = true
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1400, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      shown.value = stats.map(stat => Math.round(stat.value * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    observer.disconnect()
  }, { threshold: .35 })
  if (root.value) observer.observe(root.value)
})
</script>

<template>
  <section ref="root" class="stats container" aria-label="«Символ» у цифрах">
    <NuxtLink v-for="(stat, index) in stats" :key="stat.label" class="stat" :to="stat.to">
      <svg class="stat__ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="52" class="stat__track" />
        <circle cx="60" cy="60" r="52" class="stat__arc" pathLength="100" :style="{ strokeDashoffset: 100 - (shown[index]! / max) * 100 }" />
      </svg>
      <strong class="stat__value">{{ shown[index] }}</strong>
      <span class="stat__label">{{ stat.label }}</span>
      <span class="stat__hint">{{ stat.hint }} →</span>
    </NuxtLink>
  </section>
</template>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; padding-block: clamp(40px, 6vw, 80px); }
.stat { position: relative; display: grid; justify-items: center; align-content: start; gap: 6px; padding: 26px 14px; text-align: center; text-decoration: none; border: 1px solid color-mix(in srgb, var(--symbol-plum) 30%, transparent); transition: background .3s ease, transform .35s cubic-bezier(.2, 1.3, .4, 1); }
.stat:hover { background: var(--symbol-white); transform: translateY(-6px); }
.stat__ring { width: 120px; height: 120px; transform: rotate(-90deg); transition: transform .8s cubic-bezier(.2, 1, .3, 1); }
.stat:hover .stat__ring { transform: rotate(270deg); }
.stat__track { fill: none; stroke: var(--symbol-lilac); stroke-width: 6; }
.stat__arc { fill: none; stroke: var(--symbol-violet); stroke-width: 10; stroke-linecap: round; stroke-dasharray: 100; }
.stat:nth-child(even) .stat__arc { stroke: var(--symbol-apricot); }
.stat__value { position: absolute; top: 26px; width: 120px; height: 120px; display: grid; place-items: center; font-family: 'Newsreader', Georgia, serif; font-weight: 400; font-size: 2.8rem; font-variant-numeric: tabular-nums; }
.stat__label { font-weight: 500; margin-top: 8px; }
.stat__hint { font-size: .8rem; color: color-mix(in srgb, var(--symbol-plum) 70%, transparent); opacity: 0; transform: translateY(6px); transition: opacity .3s ease, transform .3s ease; }
.stat:hover .stat__hint, .stat:focus-visible .stat__hint { opacity: 1; transform: none; }
@media (hover: none) { .stat__hint { opacity: 1; transform: none; } }
</style>
