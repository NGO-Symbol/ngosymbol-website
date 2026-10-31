<script setup lang="ts">
// Going home (logo or any link to / or /en from another page): a violet disc spreads from the click over the
// whole screen, then shrinks back into the disc of the header logo. Other page changes keep the light fade, and so
// does the language switch (/ ↔ /en is the same page in the other language, in either direction).
const state = ref<'idle' | 'cover' | 'reveal'>('idle')
const origin = ref({ x: '50%', y: '50%' })
const target = ref({ x: '40px', y: '40px', r: '0px' })
const trim = (path: string) => path.replace(/(.)\/$/, '$1')
const isHome = (path: string) => trim(path) === '/' || trim(path) === '/en'
const isLanguageSwitch = (from: string, to: string) => trim(switchLangPath(trim(from), !isEnPath(trim(from)))) === trim(to)
let pointer = { x: 0, y: 0 }

// Centre and radius of the violet disc in the header logo (the mark is 178.22 of the logo's 900.93 width).
function logoDisc() {
  const disc = document.querySelector('.header-logo .logo-disc')?.getBoundingClientRect()
  if (disc?.width) return { x: `${disc.left + disc.width / 2}px`, y: `${disc.top + disc.height / 2}px`, r: `${disc.width / 2}px` }
  const logo = document.querySelector('.header-logo')?.getBoundingClientRect()
  if (!logo) return { x: '40px', y: '40px', r: '0px' }
  const mark = logo.width * 178.22 / 900.93
  return { x: `${logo.left + mark / 2}px`, y: `${logo.top + logo.height / 2}px`, r: `${mark / 2}px` }
}

const router = useRouter()
const nuxtApp = useNuxtApp()
onMounted(() => {
  document.addEventListener('pointerdown', event => { pointer = { x: event.clientX, y: event.clientY } }, { passive: true })
  router.beforeEach((to, from) => {
    if (!from.matched.length || !isHome(to.path) || isHome(from.path) || isLanguageSwitch(from.path, to.path)) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    origin.value = { x: `${pointer.x || innerWidth / 2}px`, y: `${pointer.y || innerHeight / 2}px` }
    state.value = 'cover'
    return new Promise<void>(resolve => window.setTimeout(resolve, 450))
  })
  nuxtApp.hook('page:finish', () => {
    if (state.value !== 'cover') return
    window.scrollTo({ top: 0 })
    // The header may be hidden by the scroll: bring it back so the disc lands in the logo.
    document.querySelector('.site-header')?.classList.remove('is-hidden')
    target.value = logoDisc()
    state.value = 'reveal'
    window.setTimeout(() => (state.value = 'idle'), 750)
  })
})
</script>

<template>
  <div v-if="state !== 'idle'" class="home-wipe" :class="`is-${state}`" :style="{ '--x': origin.x, '--y': origin.y, '--tx': target.x, '--ty': target.y, '--tr': target.r }" aria-hidden="true" />
</template>

<style scoped>
.home-wipe { position: fixed; inset: 0; z-index: 70; pointer-events: none; background: var(--symbol-violet); }
.home-wipe.is-cover { animation: home-in .45s cubic-bezier(.7, 0, .3, 1) forwards; }
.home-wipe.is-reveal { animation: home-out .75s cubic-bezier(.65, 0, .25, 1) forwards; }
@keyframes home-in { from { clip-path: circle(0 at var(--x) var(--y)); } to { clip-path: circle(150vmax at var(--x) var(--y)); } }
@keyframes home-out { 0% { clip-path: circle(150vmax at var(--tx) var(--ty)); } 85% { clip-path: circle(var(--tr) at var(--tx) var(--ty)); opacity: 1; } 100% { clip-path: circle(var(--tr) at var(--tx) var(--ty)); opacity: 0; } }
</style>
