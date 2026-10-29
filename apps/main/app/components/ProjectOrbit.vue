<script setup lang="ts">
// Home visual hook: project titles with years circle the spiral mark. The orbit tilts toward the pointer,
// turns further as the page scrolls, pauses on hover/focus and shows the project's line below.
// Clicking a title spins the orbit once before opening the project page.
const items = [...projects].sort((a, b) => b.yearStart - a.yearStart)

// Space titles along the orbit in proportion to their length so long names never overlap.
const weights = items.map(project => project.title.length + 9)
const total = weights.reduce((sum, weight) => sum + weight, 0)
const offsets = weights.map((_, index) => (weights.slice(0, index).reduce((sum, weight) => sum + weight, 0) / total) * 100)

// Photo ring: exhibition and event photos (never photos of people) ride the dashed inner ring, each linking
// to its project or event. A new random set on every visit (shuffled after mount, so SSR stays stable).
const ringSize = 8
const allPhotos = [
  ...projects.flatMap(project => (project.gallery ?? []).filter(photo => !photo.people).map(photo => ({ ...photo, to: `/projects/${project.slug}`, place: project.title }))),
  ...events.flatMap(event => (event.gallery ?? []).filter(photo => !photo.people).map(photo => ({ ...photo, to: `/events/${event.slug}`, place: event.title })))
]
const ringPhotos = ref(allPhotos.slice(0, ringSize))
const ringRadius = 340
const ringSlot = (index: number) => {
  const angle = (index / ringPhotos.value.length) * Math.PI * 2 - Math.PI / 2
  return { x: 500 + ringRadius * Math.cos(angle), y: 500 + ringRadius * Math.sin(angle) }
}
const hoveredPhoto = ref<number>()

const active = ref(0)
const paused = ref(false)
const launching = ref(false)
const current = computed(() => items[active.value]!)

const tilt = ref({ x: 0, y: 0 })
const scrollTurn = ref(0)
const root = ref<HTMLElement>()

function select(index: number) {
  active.value = index
  paused.value = true
}

function open(slug: string) {
  if (launching.value) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return navigateTo(`/projects/${slug}`)
  launching.value = true
  window.setTimeout(() => navigateTo(`/projects/${slug}`), 520)
}

function onPointerMove(event: PointerEvent) {
  const box = root.value?.getBoundingClientRect()
  if (!box) return
  tilt.value = {
    x: ((event.clientX - box.left) / box.width - 0.5) * 2,
    y: ((event.clientY - box.top) / box.height - 0.5) * 2
  }
}

function onScroll() {
  scrollTurn.value = window.scrollY * 0.12
}

onMounted(() => {
  ringPhotos.value = [...allPhotos].sort(() => Math.random() - 0.5).slice(0, ringSize)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div
    ref="root"
    class="orbit-hook"
    :class="{ 'is-paused': paused, 'is-launching': launching }"
    @pointermove="onPointerMove"
    @mouseleave="paused = false; tilt = { x: 0, y: 0 }"
  >
    <svg
      class="orbit-hook__svg"
      viewBox="0 0 1000 1000"
      role="group"
      aria-label="Проєкти «Символу» на орбіті"
      :style="{ transform: `perspective(1400px) rotateY(${tilt.x * 10}deg) rotateX(${-tilt.y * 10}deg)` }"
    >
      <defs>
        <path id="orbit-path" d="M 500 500 m -430 0 a 430 430 0 1 1 860 0 a 430 430 0 1 1 -860 0" />
      </defs>
      <circle cx="500" cy="500" r="470" class="orbit-hook__ring" />
      <circle cx="500" cy="500" r="340" class="orbit-hook__ring orbit-hook__ring--dashed" />
      <g v-if="ringPhotos.length" class="orbit-hook__photos" :class="{ 'is-hovered': hoveredPhoto !== undefined }">
        <g v-for="(photo, index) in ringPhotos" :key="photo.src" :transform="`translate(${ringSlot(index).x} ${ringSlot(index).y})`">
          <g class="orbit-hook__photo" :class="{ 'is-hovered': hoveredPhoto === index }" :style="{ '--i': index }">
            <a :href="photo.to" :aria-label="`${photo.place}: ${photo.alt}`" @click.prevent="navigateTo(photo.to)" @mouseenter="hoveredPhoto = index; paused = true" @mouseleave="hoveredPhoto = undefined" @focus="hoveredPhoto = index" @blur="hoveredPhoto = undefined">
              <title>{{ photo.place }} — {{ photo.alt }}</title>
              <clipPath :id="`orbit-photo-${index}`"><circle r="50" /></clipPath>
              <image :href="photo.src" x="-50" y="-50" width="100" height="100" preserveAspectRatio="xMidYMid slice" :clip-path="`url(#orbit-photo-${index})`" />
              <circle r="50" class="orbit-hook__photo-rim" />
            </a>
          </g>
        </g>
      </g>
      <g :transform="`rotate(${scrollTurn} 500 500)`">
        <g class="orbit-hook__spin">
          <text v-for="(project, index) in items" :key="project.slug" class="orbit-hook__title" :class="{ 'is-active': index === active }">
            <textPath href="#orbit-path" :startOffset="`${offsets[index]}%`">
              <a
                :href="`/projects/${project.slug}`"
                @mouseenter="select(index)"
                @focus="select(index)"
                @blur="paused = false"
                @click.prevent="open(project.slug)"
              ><tspan>{{ project.title }}</tspan><tspan class="orbit-hook__year" dx="10">{{ project.yearStart }}</tspan></a>
            </textPath>
          </text>
        </g>
      </g>
      <g class="orbit-hook__satellite"><rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" /></g>
      <g :style="{ transform: `translate(${tilt.x * -18}px, ${tilt.y * -18}px)` }" class="orbit-hook__parallax">
        <g class="orbit-hook__core">
          <SymbolLogo part="mark" x="290" y="290" width="420" height="420" />
        </g>
      </g>
    </svg>
    <NuxtLink :key="current.slug" class="orbit-hook__caption" :to="`/projects/${current.slug}`" aria-live="polite">
      <span class="label">{{ projectByline(current) }} · {{ statusLabels[current.status] }}</span>
      <strong>{{ current.title }}</strong>
      <span>{{ current.summary }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.orbit-hook { display: grid; gap: 18px; justify-items: center; }
.orbit-hook__svg { width: 100%; max-width: 640px; height: auto; overflow: visible; transition: transform .25s ease-out; }
.orbit-hook__ring { fill: none; stroke: var(--symbol-plum); stroke-width: 1.2; opacity: .35; }
.orbit-hook__ring--dashed { stroke-dasharray: 3 9; opacity: .5; transform-origin: 500px 500px; animation: orbit-spin 60s linear infinite reverse; }
.orbit-hook__spin { transform-origin: 500px 500px; animation: orbit-spin 45s linear infinite; }
.orbit-hook.is-paused .orbit-hook__spin { animation-play-state: paused; }
.orbit-hook.is-launching .orbit-hook__spin { animation: orbit-launch .55s cubic-bezier(.6, 0, .3, 1) forwards; }
.orbit-hook.is-launching .orbit-hook__core { animation: orbit-core-launch .55s cubic-bezier(.6, 0, .3, 1) forwards; }
.orbit-hook__core { transform-origin: 500px 500px; animation: orbit-breathe 7s ease-in-out infinite; }
.orbit-hook__parallax { transition: transform .3s ease-out; }
.orbit-hook__satellite { transform-origin: 500px 500px; animation: orbit-satellite 12s linear infinite; }
.orbit-hook__satellite rect { fill: var(--symbol-apricot); stroke: var(--symbol-plum); stroke-width: 1.5; transform: translate(500px, 30px) rotate(45deg); transform-box: fill-box; transform-origin: center; }
.orbit-hook__title { font-family: var(--font-display); font-size: 23px; fill: var(--symbol-plum); transition: font-size .25s ease, fill .25s ease; }
.orbit-hook__title a { cursor: pointer; outline: none; }
.orbit-hook__title.is-active { fill: var(--symbol-violet); font-size: 27px; text-decoration: underline; }
.orbit-hook__year { font-family: var(--font-body); font-size: 15px; letter-spacing: .1em; fill: var(--symbol-violet); }
.orbit-hook__caption { width: min(100%, 460px); display: grid; gap: 6px; text-align: center; text-decoration: none; min-height: 7.5em; animation: caption-in .45s cubic-bezier(.2, 1.2, .4, 1); }
.orbit-hook__caption strong { font-family: var(--font-display); font-weight: 400; font-size: 1.6rem; line-height: 1.1; }
.orbit-hook__caption span:last-child { font-size: .92rem; line-height: 1.5; }
.orbit-hook__caption .label { color: var(--symbol-violet); }
/* Photos turn with the dashed ring, each counter-rotating to stay upright; hover lifts one and dims the rest. */
.orbit-hook__photos { transform-origin: 500px 500px; animation: orbit-spin 60s linear infinite reverse; }
.orbit-hook.is-paused .orbit-hook__photos, .orbit-hook.is-paused .orbit-hook__photo { animation-play-state: paused; }
.orbit-hook__photo { transform-box: fill-box; transform-origin: center; animation: orbit-spin 60s linear infinite; }
.orbit-hook__photo a { cursor: pointer; outline: none; }
.orbit-hook__photo image, .orbit-hook__photo-rim { transform-box: fill-box; transform-origin: center; transition: transform .45s cubic-bezier(.3, 1.5, .5, 1), opacity .3s ease, filter .3s ease; }
.orbit-hook__photo image { animation: orbit-photo-in .8s cubic-bezier(.3, 1.4, .5, 1) both; animation-delay: calc(.4s + var(--i) * 90ms); }
.orbit-hook__photo-rim { fill: none; stroke: var(--symbol-cream); stroke-width: 4; }
.orbit-hook__photos.is-hovered .orbit-hook__photo:not(.is-hovered) image { opacity: .45; filter: grayscale(1); }
.orbit-hook__photo.is-hovered image, .orbit-hook__photo.is-hovered .orbit-hook__photo-rim { transform: scale(1.4); }
.orbit-hook__photo.is-hovered .orbit-hook__photo-rim { stroke: var(--symbol-apricot); }
.orbit-hook__photo a:focus-visible .orbit-hook__photo-rim { stroke: var(--symbol-violet); stroke-width: 6; }
@keyframes orbit-photo-in { from { transform: scale(0) rotate(-120deg); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .orbit-hook__photos, .orbit-hook__photo, .orbit-hook__photo image { animation: none; } }
@keyframes orbit-spin { to { transform: rotate(360deg); } }
@keyframes orbit-breathe { 0%, 100% { transform: rotate(0) scale(1); } 50% { transform: rotate(-14deg) scale(1.06); } }
@keyframes orbit-satellite { to { transform: rotate(-360deg); } }
@keyframes orbit-launch { to { transform: rotate(540deg) scale(.6); opacity: 0; } }
@keyframes orbit-core-launch { 40% { transform: scale(.85); } to { transform: scale(2.4) rotate(-90deg); opacity: 0; } }
@keyframes caption-in { from { opacity: 0; transform: translateY(14px) scale(.97); } }
</style>
