<script setup lang="ts">
// Moving between sections (Проєкти → Події → Люди…): a disc in the section's colour spreads from the click,
// the logo spiral turns in its centre, then the disc closes over the new page.
// Going home (logo click or any link to / or /en): the violet disc spreads from the click and then shrinks
// back into the disc of the header logo.
const sectionTone: Record<string, string> = {
  '': 'var(--symbol-violet)',
  projects: 'var(--symbol-apricot)',
  events: 'var(--symbol-plum)',
  opportunities: 'var(--symbol-violet)',
  people: 'var(--symbol-lilac)',
  about: 'var(--symbol-apricot)',
  support: 'var(--symbol-violet)',
  contact: 'var(--symbol-plum)'
}
const sectionOf = (path: string) => path.split('/')[1] ?? ''

const state = ref<'idle' | 'cover' | 'reveal'>('idle')
const home = ref(false)
const target = ref({ x: '50%', y: '50%', r: '0px' })
const isHome = (path: string) => path === '/' || path === '/en'

// Centre and radius of the violet disc in the header logo (the mark is 178.22 of the logo's 900.93 width).
function logoDisc() {
  const disc = document.querySelector('.header-logo .logo-disc')?.getBoundingClientRect()
  if (disc?.width) return { x: `${disc.left + disc.width / 2}px`, y: `${disc.top + disc.height / 2}px`, r: `${disc.width / 2}px` }
  const logo = document.querySelector('.header-logo')?.getBoundingClientRect()
  if (!logo) return { x: '40px', y: '40px', r: '0px' }
  const mark = logo.width * 178.22 / 900.93
  return { x: `${logo.left + mark / 2}px`, y: `${logo.top + logo.height / 2}px`, r: `${mark / 2}px` }
}
const origin = ref({ x: '50%', y: '50%' })
const tone = ref('var(--symbol-violet)')
let pointer = { x: 0, y: 0 }

const router = useRouter()
const nuxtApp = useNuxtApp()

onMounted(() => {
  document.addEventListener('pointerdown', (event) => { pointer = { x: event.clientX, y: event.clientY } }, { passive: true })

  // Logo clicked while already home: play the same circle without navigating.
  window.addEventListener('symbol:home-wipe', (event) => {
    if (state.value !== 'idle' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail
    origin.value = { x: `${x}px`, y: `${y}px` }
    tone.value = 'var(--symbol-violet)'
    home.value = true
    state.value = 'cover'
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      target.value = logoDisc()
      state.value = 'reveal'
      window.setTimeout(() => (state.value = 'idle'), 700)
    }, 420)
  })

  router.beforeEach((to, from) => {
    if (!from.matched.length) return
    home.value = isHome(to.path) && !isHome(from.path)
    if (!home.value && sectionOf(to.path) === sectionOf(from.path)) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    origin.value = { x: `${pointer.x || innerWidth / 2}px`, y: `${pointer.y || innerHeight / 2}px` }
    tone.value = home.value ? 'var(--symbol-violet)' : sectionTone[sectionOf(to.path)] ?? 'var(--symbol-violet)'
    state.value = 'cover'
    return new Promise<void>(resolve => window.setTimeout(resolve, 420))
  })

  nuxtApp.hook('page:finish', () => {
    if (state.value !== 'cover') return
    window.scrollTo({ top: 0 })
    if (home.value) target.value = logoDisc()
    state.value = 'reveal'
    window.setTimeout(() => (state.value = 'idle'), home.value ? 700 : 520)
  })
})
</script>

<template>
  <div v-if="state !== 'idle'" class="route-wipe" :class="[`is-${state}`, { 'is-home': home }]" :style="{ '--x': origin.x, '--y': origin.y, '--tone': tone, '--tx': target.x, '--ty': target.y, '--tr': target.r }" aria-hidden="true">
    <SymbolMark class="route-wipe__mark" />
  </div>
</template>

<style scoped>
.route-wipe { position: fixed; inset: 0; z-index: 80; pointer-events: none; background: var(--tone); display: grid; place-items: center; }
.route-wipe.is-cover { animation: wipe-in .42s cubic-bezier(.7, 0, .3, 1) forwards; }
.route-wipe.is-reveal { animation: wipe-out .52s cubic-bezier(.7, 0, .3, 1) forwards; }
.route-wipe__mark { width: 96px !important; height: 96px !important; animation: wipe-spin .9s cubic-bezier(.3, .8, .3, 1) forwards; }
@keyframes wipe-in { from { clip-path: circle(0 at var(--x) var(--y)); } to { clip-path: circle(150vmax at var(--x) var(--y)); } }
@keyframes wipe-out { from { clip-path: circle(150vmax at 50% 50%); } to { clip-path: circle(0 at 50% 50%); } }
.route-wipe.is-home { z-index: 70; }
.route-wipe.is-home.is-reveal { animation: wipe-home .7s cubic-bezier(.65, 0, .25, 1) forwards; }
.route-wipe.is-home .route-wipe__mark { opacity: 0; }
@keyframes wipe-home { 0% { clip-path: circle(150vmax at var(--tx) var(--ty)); } 85% { clip-path: circle(var(--tr) at var(--tx) var(--ty)); opacity: 1; } 100% { clip-path: circle(var(--tr) at var(--tx) var(--ty)); opacity: 0; } }
@keyframes wipe-spin { from { transform: rotate(-270deg) scale(.4); } to { transform: none; } }
</style>
