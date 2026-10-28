<script setup lang="ts">
// Each project moves in its own way, taken from what the project is about (design-system.md → Motion).
// Drawn in currentColor with apricot/violet accents; `live` marks the large version on the project page.
import type { Motif } from '~/data/types'

defineProps<{ motif: Motif; live?: boolean }>()
</script>

<template>
  <svg class="motif" :class="[`motif--${motif}`, { 'is-live': live }]" viewBox="0 0 200 200" aria-hidden="true">
    <!-- Історія моєї вулиці: street lines are drawn like a map, a walker moves along them -->
    <g v-if="motif === 'streets'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
      <path class="m-draw" pathLength="1" d="M10 60 H190" />
      <path class="m-draw m-d2" pathLength="1" d="M10 130 C70 120 120 150 190 125" />
      <path class="m-draw m-d3" pathLength="1" d="M60 10 V190" />
      <path class="m-draw m-d4" pathLength="1" d="M140 10 L120 190" />
      <circle class="m-walker" r="7" fill="var(--symbol-apricot)" stroke="currentColor" stroke-width="2">
        <animateMotion dur="6s" repeatCount="indefinite" path="M60 10 V60 H140 L131 130 C120 150 70 120 10 130" />
      </circle>
    </g>

    <!-- Голоси у русі: voices ripple outward like sound -->
    <g v-else-if="motif === 'voices'" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
      <path v-for="(r, i) in [28, 52, 76, 100]" :key="r" class="m-wave" :style="{ animationDelay: `${i * 0.3}s` }" :d="`M${60 + r * 0.7} ${100 - r * 0.7} A${r} ${r} 0 0 1 ${60 + r * 0.7} ${100 + r * 0.7}`" />
      <circle cx="60" cy="100" r="14" fill="var(--symbol-apricot)" stroke="currentColor" stroke-width="3" />
    </g>

    <!-- Покажіть свої документи: sheets shuffle and a stamp lands -->
    <g v-else-if="motif === 'documents'" stroke="currentColor" stroke-width="2.5">
      <rect class="m-sheet m-s1" x="45" y="40" width="90" height="120" fill="var(--symbol-white)" />
      <rect class="m-sheet m-s2" x="55" y="35" width="90" height="120" fill="var(--symbol-white)" />
      <g class="m-lines" stroke-linecap="round"><path d="M70 60 H125 M70 75 H130 M70 90 H110 M70 105 H128" /></g>
      <g class="m-stamp"><circle cx="128" cy="128" r="26" fill="none" stroke="var(--symbol-violet)" stroke-width="5" /><circle cx="128" cy="128" r="16" fill="none" stroke="var(--symbol-violet)" stroke-width="2" /></g>
    </g>

    <!-- Тренінги mhGAP: calm breathing circles -->
    <g v-else-if="motif === 'breath'" fill="none" stroke="currentColor" stroke-width="3">
      <circle class="m-breath" cx="100" cy="100" r="30" />
      <circle class="m-breath m-b2" cx="100" cy="100" r="55" />
      <circle class="m-breath m-b3" cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="10" fill="var(--symbol-apricot)" />
    </g>

    <!-- Історії різних: a playback stage — curtains open on a spotlight -->
    <g v-else-if="motif === 'curtain'">
      <circle class="m-spot" cx="100" cy="110" r="42" fill="var(--symbol-apricot)" />
      <path class="m-curtain-l" d="M0 0 H100 V200 Q70 160 0 200 Z" fill="currentColor" opacity=".85" />
      <path class="m-curtain-r" d="M200 0 H100 V200 Q130 160 200 200 Z" fill="currentColor" opacity=".85" />
    </g>

    <!-- Збирач конвалій: a film strip runs past -->
    <g v-else-if="motif === 'film'">
      <g class="m-strip">
        <rect x="-200" y="55" width="600" height="90" fill="currentColor" />
        <g fill="var(--symbol-apricot)">
          <rect v-for="i in 12" :key="i" :x="-200 + (i - 1) * 50 + 8" y="75" width="34" height="50" />
        </g>
        <g fill="var(--symbol-white)">
          <rect v-for="i in 24" :key="`h${i}`" :x="-200 + (i - 1) * 25 + 8" y="60" width="9" height="7" />
          <rect v-for="i in 24" :key="`b${i}`" :x="-200 + (i - 1) * 25 + 8" y="133" width="9" height="7" />
        </g>
      </g>
    </g>

    <!-- 2, 10, 300 років потому: three rings of time turning at different speeds -->
    <g v-else-if="motif === 'time'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
      <g class="m-ring m-r1"><circle cx="100" cy="100" r="30" stroke-dasharray="40 10" /></g>
      <g class="m-ring m-r2"><circle cx="100" cy="100" r="55" stroke-dasharray="70 16" /></g>
      <g class="m-ring m-r3"><circle cx="100" cy="100" r="82" stroke-dasharray="110 22" /><rect x="95" y="13" width="10" height="10" fill="var(--symbol-apricot)" transform="rotate(45 100 18)" /></g>
    </g>

    <!-- Харківське море: waves of a sea that does not exist -->
    <g v-else-if="motif === 'sea'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
      <path v-for="i in 4" :key="i" class="m-sea" :style="{ animationDelay: `${-i * 0.6}s` }" :d="`M-100 ${50 + i * 25} q25 -14 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0`" />
    </g>
  </svg>
</template>

<style scoped>
.motif { width: 100%; height: 100%; overflow: visible; }

.m-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: m-draw 2.4s ease-in-out infinite alternate; }
.m-d2 { animation-delay: .3s; } .m-d3 { animation-delay: .6s; } .m-d4 { animation-delay: .9s; }
@keyframes m-draw { to { stroke-dashoffset: 0; } }

.m-wave { opacity: 0; transform-origin: 60px 100px; animation: m-wave 2s ease-out infinite; }
@keyframes m-wave { 0% { opacity: 0; transform: scale(.6); } 25% { opacity: 1; } 100% { opacity: 0; transform: scale(1.15); } }

.m-sheet { transform-box: fill-box; transform-origin: 50% 100%; animation: m-shuffle 3s ease-in-out infinite; }
.m-s1 { animation-direction: reverse; }
@keyframes m-shuffle { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(5deg) translateX(6px); } }
.m-stamp { transform-box: fill-box; transform-origin: center; animation: m-stamp 3s cubic-bezier(.5, 0, .3, 1.6) infinite; }
@keyframes m-stamp { 0%, 35% { transform: translateY(-60px) scale(1.6); opacity: 0; } 55% { transform: none; opacity: 1; } 56% { transform: scale(.92); } 70%, 100% { transform: rotate(-12deg); opacity: 1; } }

.m-breath { transform-box: fill-box; transform-origin: center; animation: m-breath 4.5s ease-in-out infinite; }
.m-b2 { animation-delay: .4s; opacity: .7; } .m-b3 { animation-delay: .8s; opacity: .45; }
@keyframes m-breath { 0%, 100% { transform: scale(.85); } 50% { transform: scale(1.08); } }

.m-curtain-l, .m-curtain-r { animation: m-curtain 3.6s ease-in-out infinite; }
.m-curtain-r { animation-name: m-curtain-r; }
@keyframes m-curtain { 0%, 15%, 100% { transform: none; } 45%, 75% { transform: translateX(-62px) scaleX(.6); } }
@keyframes m-curtain-r { 0%, 15%, 100% { transform: none; } 45%, 75% { transform: translateX(62px) scaleX(.6); } }
.m-curtain-r { transform-origin: 200px 0; }
.m-spot { transform-box: fill-box; transform-origin: center; animation: m-spot 3.6s ease-in-out infinite; }
@keyframes m-spot { 0%, 20%, 100% { transform: scale(.6); } 50%, 75% { transform: scale(1.1); } }

.m-strip { animation: m-strip 2.4s linear infinite; }
@keyframes m-strip { to { transform: translateX(100px); } }

.m-ring { transform-origin: 100px 100px; animation: m-turn 18s linear infinite; }
.m-r1 { animation-duration: 2.4s; } .m-r2 { animation-duration: 8s; animation-direction: reverse; } .m-r3 { animation-duration: 30s; }
@keyframes m-turn { to { transform: rotate(360deg); } }

.m-sea { animation: m-sea 2.6s linear infinite; }
@keyframes m-sea { to { transform: translateX(100px); } }

@media (prefers-reduced-motion: reduce) { .motif * { animation: none !important; } .m-draw { stroke-dashoffset: 0; } .m-wave { opacity: 1; } }
</style>
