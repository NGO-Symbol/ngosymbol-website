<script setup lang="ts">
// Moving between sections (Проєкти → Події → Люди…): a disc in the section's colour spreads from the click,
// the logo spiral turns in its centre, then the disc closes over the new page.
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
const origin = ref({ x: '50%', y: '50%' })
const tone = ref('var(--symbol-violet)')
let pointer = { x: 0, y: 0 }

const router = useRouter()
const nuxtApp = useNuxtApp()

onMounted(() => {
  document.addEventListener('pointerdown', (event) => { pointer = { x: event.clientX, y: event.clientY } }, { passive: true })

  router.beforeEach((to, from) => {
    if (!from.matched.length || sectionOf(to.path) === sectionOf(from.path)) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    origin.value = { x: `${pointer.x || innerWidth / 2}px`, y: `${pointer.y || innerHeight / 2}px` }
    tone.value = sectionTone[sectionOf(to.path)] ?? 'var(--symbol-violet)'
    state.value = 'cover'
    return new Promise<void>(resolve => window.setTimeout(resolve, 420))
  })

  nuxtApp.hook('page:finish', () => {
    if (state.value !== 'cover') return
    window.scrollTo({ top: 0 })
    state.value = 'reveal'
    window.setTimeout(() => (state.value = 'idle'), 520)
  })
})
</script>

<template>
  <div v-if="state !== 'idle'" class="route-wipe" :class="`is-${state}`" :style="{ '--x': origin.x, '--y': origin.y, '--tone': tone }" aria-hidden="true">
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
@keyframes wipe-spin { from { transform: rotate(-270deg) scale(.4); } to { transform: none; } }
</style>
