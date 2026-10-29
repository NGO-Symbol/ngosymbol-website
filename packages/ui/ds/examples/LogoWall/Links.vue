<script setup lang="ts">
// A generated SVG mark stands in for a real logo file; it is painted in the tone's text colour.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><circle cx="40" cy="40" r="26" fill="none" stroke="black" stroke-width="12"/><rect x="92" y="22" width="130" height="14" fill="black"/><rect x="92" y="46" width="90" height="14" fill="black"/></svg>`
const src = `data:image/svg+xml,${encodeURIComponent(svg)}`
const items = [
  { name: 'Партнер 1', src, href: '#' },
  { name: 'Партнер 2', src, href: 'https://example.com' },
  { name: 'Партнер 3', href: '#' },
  { name: 'Партнер 4', src },
  { name: 'Партнер 5' },
  { name: 'Партнер 6', src, href: '#' },
]
</script>

<template>
  <SymLogoWall :items="items" :cols="3" label="Партнери й підтримувачі" />
</template>
