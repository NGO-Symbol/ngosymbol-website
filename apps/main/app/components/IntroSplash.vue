<script setup lang="ts">
// Logo intro: the mark appears with one of four variants (html[data-intro], chosen in app.vue), the official
// inscription is revealed, then the circle spirals — turning twice along a curved path — straight into the mark
// of the header logo, which takes over seamlessly. Shown once per browser session; skipped for reduced motion.
const visible = ref(true)
const root = ref<HTMLElement>()
const mark = ref<SVGSVGElement>()
let flying = false

function finish() {
  if (!visible.value) return
  visible.value = false
  try { sessionStorage.setItem('symbol-intro', '1') } catch {}
  document.documentElement.classList.remove('intro-playing')
  document.documentElement.classList.add('intro-done')
}

function spiralIntoHeader() {
  if (flying || !mark.value || !root.value) return finish()
  flying = true
  const header = document.querySelector<SVGSVGElement>('.header-logo')
  if (!header) return finish()
  const from = mark.value.getBoundingClientRect()
  const to = header.getBoundingClientRect()
  // The round mark is the first 178.22 of the logo's 900.93-unit width.
  const size = to.width * (178.22 / 900.93)
  const dx = to.left + size / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)
  const scale = size / from.width
  const duration = 950
  mark.value.animate([
    { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
    { transform: `translate(${dx * 0.25 + dy * 0.18}px, ${dy * 0.35 - dx * 0.12}px) rotate(260deg) scale(${0.62 + scale * 0.38})`, offset: 0.4 },
    { transform: `translate(${dx * 0.7}px, ${dy * 0.85}px) rotate(560deg) scale(${scale * 1.25})`, offset: 0.78 },
    { transform: `translate(${dx}px, ${dy}px) rotate(720deg) scale(${scale})` }
  ], { duration, easing: 'cubic-bezier(.6, 0, .25, 1)', fill: 'forwards' })
  root.value.animate([{ backgroundColor: getComputedStyle(root.value).backgroundColor }, { backgroundColor: 'transparent' }], { duration: duration * 0.8, delay: duration * 0.2, easing: 'ease-in', fill: 'forwards' })
  root.value.querySelectorAll<HTMLElement>('.intro__word, .intro__skip').forEach(el => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }))
  window.setTimeout(finish, duration)
}

onMounted(() => {
  if (document.documentElement.classList.contains('intro-done')) {
    visible.value = false
    return
  }
  document.documentElement.classList.add('intro-playing')
  const timer = window.setTimeout(spiralIntoHeader, 1450)
  const skip = () => { window.clearTimeout(timer); finish() }
  window.addEventListener('keydown', skip, { once: true })
  onBeforeUnmount(() => { window.clearTimeout(timer); window.removeEventListener('keydown', skip) })
})
</script>

<template>
  <div v-if="visible" ref="root" class="intro" role="presentation" @click="finish">
    <div class="intro__stage">
      <svg ref="mark" class="intro__mark" viewBox="0 0 1000 1000" aria-hidden="true">
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
}
.intro__stage { display: grid; justify-items: center; gap: 28px; }
.intro__mark { width: min(52vmin, 340px); height: auto; overflow: visible; }
.intro__disc { transform-origin: 500px 500px; animation: intro-disc .6s cubic-bezier(.2, 1.3, .4, 1) both; }
.intro__sweep { stroke-dasharray: 100 100; stroke-dashoffset: 100; animation: intro-sweep .9s cubic-bezier(.6, 0, .2, 1) .3s forwards; }
.intro__word { width: min(70vw, 420px); color: var(--symbol-ink); clip-path: inset(0 100% 0 0); animation: intro-word .7s cubic-bezier(.6, 0, .2, 1) .6s forwards; }
.intro__skip { position: absolute; bottom: calc(28px + env(safe-area-inset-bottom, 0px)); font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; color: var(--symbol-violet); }
@keyframes intro-disc { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes intro-sweep { to { stroke-dashoffset: 0; } }
@keyframes intro-word { to { clip-path: inset(0 0 0 0); } }
</style>

<style>
/* Unscoped: hides the server-rendered overlay before hydration for returning visitors. */
.intro-done .intro { display: none; }
/* While the intro plays, the header mark waits for the flying circle to land in its place. */
.intro-playing .header-logo .logo-disc, .intro-playing .header-logo .logo-spiral { opacity: 0; }

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
