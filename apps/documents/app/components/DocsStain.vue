<script setup lang="ts">
// A mark left on a case file: the ring of a coffee cup or a pale tea splash, with an uneven, soaked-in edge.
// Purely decorative; the position and turn come from the page so every file gets its own.
const props = defineProps<{ kind: 'coffee' | 'tea'; seed?: number }>()
const id = `docs-stain-${props.kind}-${props.seed ?? 0}`
</script>

<template>
  <svg class="docs-stain" :class="`docs-stain--${kind}`" viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <filter :id="id" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" :seed="seed ?? 1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
        <feGaussianBlur stdDeviation="0.8" />
      </filter>
    </defs>
    <g :filter="`url(#${id})`">
      <template v-if="kind === 'coffee'">
        <circle cx="100" cy="100" r="74" fill="currentColor" opacity=".08" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" stroke-width="7" opacity=".42" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" stroke-width="2" opacity=".25" />
        <path d="M162 138 q14 10 10 24" fill="none" stroke="currentColor" stroke-width="5" opacity=".3" stroke-linecap="round" />
      </template>
      <template v-else>
        <path d="M60 70 C90 30 150 40 158 90 C166 140 120 170 80 152 C46 138 36 100 60 70 Z" fill="currentColor" opacity=".16" />
        <path d="M60 70 C90 30 150 40 158 90 C166 140 120 170 80 152 C46 138 36 100 60 70 Z" fill="none" stroke="currentColor" stroke-width="3" opacity=".3" />
        <circle cx="168" cy="52" r="7" fill="currentColor" opacity=".18" />
      </template>
    </g>
  </svg>
</template>

<style scoped>
.docs-stain { position: absolute; pointer-events: none; mix-blend-mode: multiply; }
.docs-stain--coffee { color: #6b3f1d; }
.docs-stain--tea { color: #a77a2c; }
:root[data-theme="dark"] .docs-stain { mix-blend-mode: screen; opacity: .5; }
</style>
