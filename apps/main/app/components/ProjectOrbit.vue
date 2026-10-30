<script setup lang="ts">
// Home visual hook: project titles with years circle the spiral mark. The orbit tilts toward the pointer,
// turns further as the page scrolls, pauses on hover/focus and shows the project's line below.
// Clicking a title spins the orbit once before opening the project page.
const items = [...projects].sort((a, b) => b.yearStart - a.yearStart)

const active = ref(0)
const hovering = ref(false)
const paused = ref(false)
const launching = ref(false)
const current = computed(() => items[active.value]!)

const root = ref<HTMLElement>()

function select(index: number) {
  active.value = index
  paused.value = true
  hovering.value = true
}

// Layout along the orbit. Titles are measured, the free space is shared out as equal gaps, and the
// highlighted title (drawn larger) makes room for itself: it grows around its own centre, the gaps next to
// it widen, and every other title slides along the circle. Positions glide to their new places.
const RADIUS = 430
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ACTIVE_SCALE = 27 / 23
const YEAR_GAP = 10
const NEIGHBOUR_ROOM = 14
// Smallest clear space between two titles. When the titles do not fit round the circle with it (many projects,
// the larger phone type), all titles are set smaller together, so they never run into each other.
const MIN_GAP = 28
// Before fonts are measured: an estimate from the number of letters.
const titleLengths = ref(items.map(project => project.title.length * 11))
const yearLengths = ref(items.map(() => 40))
const measuring = ref(false)

const fit = computed(() => {
  const titles = titleLengths.value
  const longest = Math.max(...titles)
  const needed = items.reduce((sum, _, index) => sum + titles[index]! + (yearLengths.value[index]! ? YEAR_GAP + yearLengths.value[index]! : 0), 0)
    + longest * (ACTIVE_SCALE - 1) + NEIGHBOUR_ROOM * 2 + MIN_GAP * items.length
  return Math.min(1, CIRCUMFERENCE / needed)
})

const targets = computed(() => {
  const count = items.length
  const f = fit.value
  const titleLength = (index: number) => titleLengths.value[index]! * f
  const yearLength = (index: number) => yearLengths.value[index]! ? (YEAR_GAP + yearLengths.value[index]!) * f : 0
  const base = items.map((_, index) => titleLength(index) + yearLength(index))
  const gap = (CIRCUMFERENCE - base.reduce((sum, length) => sum + length, 0)) / count
  const baseStart: number[] = []
  base.reduce((position, length, index) => { baseStart[index] = position; return position + length + gap }, 0)

  const a = active.value
  const grown = base.map((length, index) => index === a ? length + titleLength(index) * (ACTIVE_SCALE - 1) : length)
  const extra = hovering.value ? NEIGHBOUR_ROOM : 0
  const shrink = grown[a]! - base[a]! + extra * 2
  const gaps = items.map((_, index) => index === a || index === (a - 1 + count) % count ? gap + extra : gap - shrink / (count - 2))

  const start: number[] = []
  start[a] = baseStart[a]! + (base[a]! - grown[a]!) / 2
  for (let step = 1; step < count; step++) {
    const index = (a + step) % count
    const previous = (index - 1 + count) % count
    start[index] = start[previous]! + grown[previous]! + gaps[previous]!
  }
  return start.map(position => ((position % CIRCUMFERENCE) + CIRCUMFERENCE) % CIRCUMFERENCE)
})

// Glide each title the short way round the circle to its target. Positions are written straight to the
// <textPath> elements on each frame: kept reactive, they re-rendered the whole orbit 60 times a second.
const initialOffsets = [...targets.value]
let offsets = [...initialOffsets]
const paths: SVGTextPathElement[] = []
function place() { paths.forEach((path, index) => path.setAttribute('startOffset', String(offsets[index]))) }
let frame = 0
function glide() {
  cancelAnimationFrame(frame)
  const from = [...offsets]
  const to = targets.value.map((target, index) => {
    let delta = target - from[index]!
    if (delta > CIRCUMFERENCE / 2) delta -= CIRCUMFERENCE
    if (delta < -CIRCUMFERENCE / 2) delta += CIRCUMFERENCE
    return from[index]! + delta
  })
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { offsets = [...targets.value]; place(); return }
  const began = performance.now()
  const tick = (now: number) => {
    const t = Math.min((now - began) / 450, 1)
    const eased = 1 - (1 - t) ** 3
    offsets = from.map((value, index) => {
      const position = value + (to[index]! - value) * eased
      return ((position % CIRCUMFERENCE) + CIRCUMFERENCE) % CIRCUMFERENCE
    })
    place()
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}
watch(targets, glide)

const titleSpans: SVGTSpanElement[] = []
const yearSpans: SVGTSpanElement[] = []
async function measure() {
  measuring.value = true
  await nextTick()
  titleLengths.value = titleSpans.map(span => span.getComputedTextLength())
  yearLengths.value = yearSpans.map(span => span.getComputedTextLength())
  measuring.value = false
}

function open(slug: string) {
  if (launching.value) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return navigateTo(`/projects/${slug}`)
  launching.value = true
  window.setTimeout(() => navigateTo(`/projects/${slug}`), 260)
}

// Pointer tilt and scroll turn change on every frame, so they go to CSS variables on the root element rather
// than through Vue (a reactive value re-rendered the whole orbit at each step).
function setTilt(x: number, y: number) {
  root.value?.style.setProperty('--tilt-x', String(x))
  root.value?.style.setProperty('--tilt-y', String(y))
}
function onPointerMove(event: PointerEvent) {
  const box = root.value?.getBoundingClientRect()
  if (!box) return
  setTilt(((event.clientX - box.left) / box.width - 0.5) * 2, ((event.clientY - box.top) / box.height - 0.5) * 2)
}

function onScroll() {
  root.value?.style.setProperty('--scroll-turn', `${window.scrollY * 0.12}deg`)
}

// Phones use larger type with the years hidden, so the titles are measured again when the layout switches.
let phone: MediaQueryList | undefined
onMounted(async () => {
  await document.fonts?.ready
  await measure()
  phone = matchMedia('(max-width: 600px)')
  phone.addEventListener('change', measure)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); phone?.removeEventListener('change', measure); cancelAnimationFrame(frame) })
</script>

<template>
  <div
    ref="root"
    class="orbit-hook"
    :class="{ 'is-paused': paused, 'is-launching': launching, 'is-measuring': measuring }"
    @pointermove="onPointerMove"
    @mouseleave="paused = false; hovering = false; setTilt(0, 0)"
  >
    <svg
      class="orbit-hook__svg"
      viewBox="0 0 1000 1000"
      role="group"
      aria-label="Проєкти «Символу» на орбіті"
      :style="{ '--orbit-fit': measuring ? 1 : fit }"
    >
      <defs>
        <!-- The circle is traced twice so a title that starts near the end of the loop continues instead of being cut. -->
        <path id="orbit-path" d="M 500 500 m -430 0 a 430 430 0 1 1 860 0 a 430 430 0 1 1 -860 0 a 430 430 0 1 1 860 0 a 430 430 0 1 1 -860 0" />
      </defs>
      <circle cx="500" cy="500" r="470" class="orbit-hook__ring" />
      <circle cx="500" cy="500" r="390" class="orbit-hook__ring orbit-hook__ring--dashed" />
      <g class="orbit-hook__turn">
        <g class="orbit-hook__spin">
          <text v-for="(project, index) in items" :key="project.slug" class="orbit-hook__title" :class="{ 'is-active': index === active && !measuring }">
            <textPath :ref="el => { if (el) paths[index] = el as SVGTextPathElement }" href="#orbit-path" :startOffset="initialOffsets[index]">
              <a
                :href="`/projects/${project.slug}/`"
                @mouseenter="select(index)"
                @focus="select(index)"
                @blur="paused = false; hovering = false"
                @click.prevent="open(project.slug)"
              ><tspan :ref="el => { if (el) titleSpans[index] = el as SVGTSpanElement }">{{ project.title }}</tspan><tspan :ref="el => { if (el) yearSpans[index] = el as SVGTSpanElement }" class="orbit-hook__year" :dx="YEAR_GAP">{{ project.yearStart }}</tspan></a>
            </textPath>
          </text>
        </g>
      </g>
      <g class="orbit-hook__satellite"><rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" /></g>
      <g class="orbit-hook__parallax">
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
.orbit-hook__svg { width: 100%; max-width: 640px; height: auto; overflow: visible; transform: perspective(1400px) rotateY(calc(var(--tilt-x, 0) * 10deg)) rotateX(calc(var(--tilt-y, 0) * -10deg)); transition: transform .25s ease-out; }
.orbit-hook__turn { transform-origin: 500px 500px; transform: rotate(var(--scroll-turn, 0deg)); }
.orbit-hook__ring { fill: none; stroke: var(--symbol-plum); stroke-width: 1.2; opacity: .35; }
.orbit-hook__ring--dashed { stroke-dasharray: 3 9; opacity: .5; transform-origin: 500px 500px; animation: orbit-spin 60s linear infinite reverse; }
.orbit-hook__spin { transform-origin: 500px 500px; animation: orbit-spin 45s linear infinite; }
.orbit-hook.is-paused .orbit-hook__spin { animation-play-state: paused; }
.orbit-hook.is-launching .orbit-hook__spin { animation: orbit-launch .3s ease-in forwards; }
.orbit-hook.is-launching .orbit-hook__core { animation: orbit-core-launch .3s ease-in forwards; }
.orbit-hook__core { transform-origin: 500px 500px; animation: orbit-breathe 7s ease-in-out infinite; }
.orbit-hook__parallax { transform: translate(calc(var(--tilt-x, 0) * -18px), calc(var(--tilt-y, 0) * -18px)); transition: transform .3s ease-out; }
.orbit-hook__satellite { transform-origin: 500px 500px; animation: orbit-satellite 12s linear infinite; }
.orbit-hook__satellite rect { fill: var(--symbol-apricot); stroke: var(--symbol-plum); stroke-width: 1.5; transform: translate(500px, 30px) rotate(45deg); transform-box: fill-box; transform-origin: center; }
.orbit-hook__title { font-family: var(--font-display); font-size: calc(23px * var(--orbit-fit, 1)); fill: var(--symbol-plum); transition: font-size .45s cubic-bezier(.2, 1, .3, 1), fill .25s ease; }
.orbit-hook.is-measuring .orbit-hook__title { transition: none; }
.orbit-hook__title a { cursor: pointer; outline: none; }
.orbit-hook__title.is-active { fill: var(--symbol-violet); font-size: calc(27px * var(--orbit-fit, 1)); text-decoration: underline; }
.orbit-hook__year { font-family: var(--font-body); font-size: calc(15px * var(--orbit-fit, 1)); letter-spacing: .1em; fill: var(--symbol-violet); }
/* Phones: the orbit is drawn small, so titles get larger type and the years step aside to make room. */
@media (max-width: 600px) {
  .orbit-hook__title { font-size: calc(30px * var(--orbit-fit, 1)); }
  .orbit-hook__title.is-active { font-size: calc(33px * var(--orbit-fit, 1)); }
  .orbit-hook__year { display: none; }
}
.orbit-hook__caption { width: min(100%, 460px); display: grid; gap: 6px; text-align: center; text-decoration: none; min-height: 7.5em; animation: caption-in .45s cubic-bezier(.2, 1.2, .4, 1); }
.orbit-hook__caption strong { font-family: var(--font-display); font-weight: 400; font-size: 1.6rem; line-height: 1.1; }
.orbit-hook__caption span:last-child { font-size: .92rem; line-height: 1.5; }
.orbit-hook__caption .label { color: var(--symbol-violet); }
@keyframes orbit-spin { to { transform: rotate(360deg); } }
@keyframes orbit-breathe { 0%, 100% { transform: rotate(0) scale(1); } 50% { transform: rotate(-14deg) scale(1.06); } }
@keyframes orbit-satellite { to { transform: rotate(-360deg); } }
@keyframes orbit-launch { to { transform: rotate(60deg); opacity: 0; } }
@keyframes orbit-core-launch { to { transform: scale(.92); opacity: 0; } }
@keyframes caption-in { from { opacity: 0; transform: translateY(14px) scale(.97); } }
</style>
