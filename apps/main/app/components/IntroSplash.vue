<script setup lang="ts">
// Logo intro: the mark appears with one of four variants (html[data-intro], chosen in app.vue),
// the wordmark letters rise, then the mark flies into the header logo and the overlay lifts.
// Shown once per browser session; skipped for reduced motion.
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
  const timer = window.setTimeout(finish, 2150)
  const skip = () => { window.clearTimeout(timer); finish() }
  window.addEventListener('keydown', skip, { once: true })
  onBeforeUnmount(() => { window.clearTimeout(timer); window.removeEventListener('keydown', skip) })
})
</script>

<template>
  <div v-if="visible" class="intro" role="presentation" @click="finish">
    <div class="intro__stage">
      <svg class="intro__mark" viewBox="0 0 1000 1000" aria-hidden="true">
        <defs>
          <mask id="intro-spiral" maskUnits="userSpaceOnUse">
            <circle class="intro__sweep" cx="500" cy="500" r="260" fill="none" stroke="#fff" stroke-width="520" pathLength="100" transform="rotate(-40 500 500)" />
          </mask>
        </defs>
        <circle class="intro__disc" cx="500" cy="500" r="500" fill="#9280a6" />
        <g mask="url(#intro-spiral)">
          <SymbolLogo part="mark" x="0" y="0" width="1000" height="1000" />
        </g>
      </svg>
      <SymbolLogo class="intro__word" part="wordmark" />
    </div>
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
  animation: intro-lift .5s cubic-bezier(.7, 0, .3, 1) 1.65s forwards;
}
.intro__stage { display: grid; justify-items: center; gap: 28px; animation: intro-fly .55s cubic-bezier(.7, 0, .3, 1) 1.55s forwards; }
.intro__mark { width: min(52vmin, 340px); height: auto; overflow: visible; }
.intro__disc { transform-origin: 500px 500px; animation: intro-disc .6s cubic-bezier(.2, 1.3, .4, 1) both; }
.intro__sweep { stroke-dasharray: 100 100; stroke-dashoffset: 100; animation: intro-sweep .9s cubic-bezier(.6, 0, .2, 1) .3s forwards; }
.intro__word { width: min(70vw, 420px); color: var(--symbol-ink); clip-path: inset(0 100% 0 0); animation: intro-word .7s cubic-bezier(.6, 0, .2, 1) .6s forwards; }
.intro__skip { position: absolute; bottom: calc(28px + env(safe-area-inset-bottom, 0px)); font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; color: var(--symbol-violet); }
@keyframes intro-disc { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes intro-sweep { to { stroke-dashoffset: 0; } }
@keyframes intro-word { to { clip-path: inset(0 0 0 0); } }
@keyframes intro-fly { to { transform: translate(calc(-50vw + 60px), calc(-50vh + 42px)) scale(.12); opacity: .4; } }
@keyframes intro-lift { to { opacity: 0; visibility: hidden; } }
</style>

<style>
/* Unscoped: hides the server-rendered overlay before hydration for returning visitors. */
.intro-done .intro { display: none; }

/* Intro variants, chosen in the head script (html[data-intro]). 0 is the default circular sweep. */
html[data-intro="1"] .intro__sweep, html[data-intro="2"] .intro__sweep, html[data-intro="3"] .intro__sweep { animation: none; stroke-dashoffset: 0; }
html[data-intro="1"] .intro__disc, html[data-intro="2"] .intro__disc, html[data-intro="3"] .intro__disc { animation: none; }

/* 1 — spin: the whole mark spirals in from far away. */
html[data-intro="1"] .intro__mark { animation: intro-spin 1.2s cubic-bezier(.2, .9, .25, 1.2) both; }
@keyframes intro-spin { from { transform: rotate(-540deg) scale(.05); opacity: 0; } 60% { opacity: 1; } to { transform: none; } }

/* 2 — iris: the mark opens from its centre like an aperture, with an overshoot. */
html[data-intro="2"] .intro__mark { animation: intro-iris 1.1s cubic-bezier(.7, 0, .2, 1) both; }
@keyframes intro-iris { 0% { clip-path: circle(0% at 50% 50%); transform: scale(.8) rotate(-30deg); } 70% { clip-path: circle(60% at 50% 50%); transform: scale(1.12) rotate(6deg); } 100% { clip-path: circle(75% at 50% 50%); transform: none; } }

/* 3 — orbit: the mark drops in with a bounce while rings spread out behind it. */
html[data-intro="3"] .intro__mark { animation: intro-drop 1s cubic-bezier(.3, 1.5, .5, 1) both; }
html[data-intro="3"] .intro::before, html[data-intro="3"] .intro::after {
  content: '';
  position: absolute;
  width: min(52vmin, 340px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid var(--symbol-violet);
  animation: intro-ring 1.2s ease-out .45s both;
}
html[data-intro="3"] .intro::after { border-color: var(--symbol-apricot); animation-delay: .65s; }
@keyframes intro-drop { from { transform: translateY(-70vh) rotate(160deg); } to { transform: none; } }
@keyframes intro-ring { from { transform: scale(.9); opacity: 1; } to { transform: scale(4); opacity: 0; } }
</style>
