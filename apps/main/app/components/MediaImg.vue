<script setup lang="ts">
// A photograph shown through its light AVIF preview when one exists; the original (or `fallback`) stays as the
// <img> for browsers without AVIF. `display: contents` keeps the <picture> out of layout, so existing image styles apply.
import { previewOf } from '~/data/previews'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ src: string; alt?: string; fallback?: string }>()
const preview = computed(() => previewOf(props.src))
</script>

<template>
  <picture class="media-img">
    <source v-if="preview" :srcset="preview" type="image/avif">
    <img v-bind="$attrs" :src="fallback ?? src" :alt="alt ?? ''">
  </picture>
</template>

<style>
.media-img { display: contents; }
</style>
