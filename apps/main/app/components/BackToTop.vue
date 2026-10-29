<script setup lang="ts">
// A small side button back to the top: appears after the first screen; its ring fills with reading progress
// and the arrow rides the logo spiral on the way up.
const { isEn } = useLang()
const visible = ref(false)
const progress = ref(0)
const flying = ref(false)

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight
  visible.value = scrollY > innerHeight * 0.8
  progress.value = max > 0 ? Math.min(scrollY / max, 1) : 0
}
function toTop() {
  flying.value = true
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  window.setTimeout(() => (flying.value = false), 700)
}
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <button type="button" class="to-top" :class="{ 'is-visible': visible, 'is-flying': flying }" :aria-label="isEn ? 'Back to top' : 'Нагору'" :tabindex="visible ? 0 : -1" @click="toTop">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g transform="rotate(-90 24 24)">
        <circle class="to-top__track" cx="24" cy="24" r="21" />
        <circle class="to-top__ring" cx="24" cy="24" r="21" pathLength="1" :style="{ strokeDashoffset: 1 - progress }" />
      </g>
      <path class="to-top__arrow" d="M24 32V16m-7 7 7-7 7 7" />
    </svg>
  </button>
</template>

<style scoped>
.to-top { position: fixed; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom)); z-index: 55; width: 48px; height: 48px; padding: 0; border: 0; border-radius: 50%; background: var(--symbol-cream); color: var(--symbol-plum); cursor: pointer; box-shadow: 0 6px 18px -8px color-mix(in srgb, var(--symbol-plum) 60%, transparent); opacity: 0; transform: translateY(16px) scale(.8); pointer-events: none; transition: opacity .3s ease, transform .45s cubic-bezier(.3, 1.5, .5, 1); }
.to-top.is-visible { opacity: 1; transform: none; pointer-events: auto; }
.to-top svg { width: 100%; height: 100%; }
.to-top circle { fill: none; stroke-width: 3; }
.to-top__track { stroke: color-mix(in srgb, var(--symbol-plum) 18%, transparent); }
.to-top__ring { stroke: var(--symbol-violet); stroke-dasharray: 1; stroke-linecap: round; transition: stroke-dashoffset .15s linear; }
.to-top__arrow { fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.to-top:hover { background: var(--symbol-apricot); color: #211b28; }
.to-top:hover .to-top__arrow { animation: to-top-nudge .6s ease infinite alternate; }
.to-top.is-flying .to-top__arrow { animation: to-top-fly .7s cubic-bezier(.5, 0, .3, 1); }
@keyframes to-top-nudge { to { transform: translateY(-3px); } }
@keyframes to-top-fly { 50% { transform: translateY(-14px); opacity: 0; } 51% { transform: translateY(14px); opacity: 0; } 100% { transform: none; opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .to-top, .to-top__ring { transition: none; } .to-top__arrow { animation: none !important; } }
</style>
