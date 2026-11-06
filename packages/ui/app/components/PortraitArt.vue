<script setup lang="ts">
import { computed, h, type FunctionalComponent } from 'vue'
import { portraitArt, type ArtShape } from '../utils/portrait-art'

/**
 * A round picture that stands in for a missing portrait, generated from the logo's spiral, rings and colours. It is random per seed: one
 * person always gets the same picture, and two people get different ones. Decorative, the name beside it says who it is. Never use it in
 * place of a real photo of a person, and never as a project image (SymMedia).
 */
const props = defineProps<{
  /** What the picture depends on: a stable id such as the person's slug. */
  seed: string
}>()

const art = computed(() => portraitArt(props.seed))
const Shape: FunctionalComponent<{ shape: ArtShape }> = ({ shape }) => h(shape.tag, shape.attrs, shape.children?.map(child => h(Shape, { shape: child })))
</script>

<template>
  <svg class="sym-portrait-art" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <rect width="100" height="100" :fill="art.background" />
    <g class="sym-portrait-art__shapes"><Shape v-for="(shape, index) in art.shapes" :key="index" :shape="shape" /></g>
  </svg>
</template>

<style>
@layer sym-components {
  .sym-portrait-art { display: block; aspect-ratio: 1; border-radius: 50%; overflow: hidden; }
  .sym-portrait-art__shapes { transform-origin: 50% 50%; transition: rotate 1.2s cubic-bezier(.2, .8, .2, 1); }
  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    .sym-portrait-art:hover .sym-portrait-art__shapes, a:hover .sym-portrait-art .sym-portrait-art__shapes { rotate: 24deg; }
  }
}
</style>
