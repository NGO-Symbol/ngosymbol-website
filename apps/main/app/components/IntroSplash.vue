<script setup lang="ts">
// Logo intro: the spiral is revealed by a circular sweep, then the overlay lifts.
// Shown once per browser session; skipped for reduced motion (see the head script in app.vue).
import mark from '@symbol/brand/symbol-mark.png'

const visible = ref(true)

function finish() {
  if (!visible.value) return
  visible.value = false
  try { sessionStorage.setItem('symbol-intro', '1') } catch {}
  document.documentElement.classList.add('intro-done')
}

onMounted(() => {
  if (document.documentElement.classList.contains('intro-done')) {
    visible.value = false
    return
  }
  const timer = window.setTimeout(finish, 1700)
  const skip = () => { window.clearTimeout(timer); finish() }
  window.addEventListener('keydown', skip, { once: true })
  onBeforeUnmount(() => { window.clearTimeout(timer); window.removeEventListener('keydown', skip) })
})
</script>

<template>
  <div v-if="visible" class="intro" role="presentation" @click="finish">
    <svg class="intro__mark" viewBox="0 0 1000 1000" aria-hidden="true">
      <defs>
        <mask id="intro-spiral" maskUnits="userSpaceOnUse">
          <circle class="intro__sweep" cx="500" cy="500" r="260" fill="none" stroke="#fff" stroke-width="520" pathLength="100" transform="rotate(-40 500 500)" />
        </mask>
      </defs>
      <circle class="intro__disc" cx="500" cy="500" r="500" fill="#9280a6" />
      <image :href="mark" width="1000" height="1000" mask="url(#intro-spiral)" />
    </svg>
    <span class="intro__skip">Натисніть, щоб пропустити</span>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  background: var(--symbol-cream);
  cursor: pointer;
  animation: intro-lift .45s ease-in 1.25s forwards;
}
.intro__mark { width: min(42vmin, 260px); height: auto; }
.intro__disc { transform-origin: 500px 500px; animation: intro-disc .5s cubic-bezier(.2, .8, .2, 1) both; }
.intro__sweep { stroke-dasharray: 100 100; stroke-dashoffset: 100; animation: intro-sweep .85s cubic-bezier(.6, 0, .2, 1) .25s forwards; }
.intro__skip { position: absolute; bottom: calc(28px + env(safe-area-inset-bottom, 0px)); font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; color: var(--symbol-violet); }
@keyframes intro-disc { from { transform: scale(.2); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes intro-sweep { to { stroke-dashoffset: 0; } }
@keyframes intro-lift { to { opacity: 0; transform: translateY(-3%); visibility: hidden; } }
</style>

<style>
/* Unscoped: hides the server-rendered overlay before hydration for returning visitors. */
.intro-done .intro { display: none; }

/* Intro variants, chosen in the head script (html[data-intro]). 0 is the default circular sweep. */
/* 1 — spin: the whole mark spirals in. */
html[data-intro="1"] .intro__sweep { animation: none; stroke-dashoffset: 0; }
html[data-intro="1"] .intro__disc { animation: none; }
html[data-intro="1"] .intro__mark { animation: intro-spin 1.05s cubic-bezier(.2, .9, .25, 1.15) both; }
@keyframes intro-spin { from { transform: rotate(-320deg) scale(.15); opacity: 0; } to { transform: none; opacity: 1; } }

/* 2 — iris: the mark opens from its centre like an aperture. */
html[data-intro="2"] .intro__sweep { animation: none; stroke-dashoffset: 0; }
html[data-intro="2"] .intro__disc { animation: none; }
html[data-intro="2"] .intro__mark { animation: intro-iris 1s cubic-bezier(.7, 0, .2, 1) both; }
@keyframes intro-iris { 0% { clip-path: circle(0% at 50% 50%); } 75% { clip-path: circle(55% at 50% 50%); transform: scale(1.06); } 100% { clip-path: circle(75% at 50% 50%); transform: scale(1); } }

/* 3 — orbit: the mark drops in while a ring spreads out behind it. */
html[data-intro="3"] .intro__sweep { animation: none; stroke-dashoffset: 0; }
html[data-intro="3"] .intro__disc { animation: none; }
html[data-intro="3"] .intro__mark { animation: intro-drop .9s cubic-bezier(.3, 1.4, .5, 1) both; }
html[data-intro="3"] .intro::before {
  content: '';
  position: absolute;
  width: min(42vmin, 260px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid var(--symbol-violet);
  animation: intro-ring 1.1s ease-out .35s both;
}
@keyframes intro-drop { from { transform: translateY(-60vh) rotate(90deg); } to { transform: none; } }
@keyframes intro-ring { from { transform: scale(1); opacity: .9; } to { transform: scale(3.2); opacity: 0; } }
</style>
