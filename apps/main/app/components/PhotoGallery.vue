<script setup lang="ts">
// Selected photos in a loose grid; click opens a full-screen view (Esc, ← → to browse).
import type { Photo } from '~/data/types'

const props = defineProps<{ photos: Photo[] }>()
const open = ref<number | null>(null)
const current = computed(() => (open.value === null ? null : props.photos[open.value]))

function step(delta: number) {
  if (open.value === null) return
  open.value = (open.value + delta + props.photos.length) % props.photos.length
}

function onKey(event: KeyboardEvent) {
  if (open.value === null) return
  if (event.key === 'Escape') open.value = null
  if (event.key === 'ArrowRight') step(1)
  if (event.key === 'ArrowLeft') step(-1)
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="gallery" :class="`gallery--${Math.min(photos.length, 6)}`">
    <button v-for="(photo, index) in photos" :key="photo.src" type="button" class="gallery__item" :aria-label="`Відкрити фото: ${photo.alt}`" @click="open = index">
      <MediaImg :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
    </button>
  </div>
  <Teleport to="body">
    <div v-if="current" class="lightbox" role="dialog" aria-modal="true" :aria-label="current.alt" @click.self="open = null">
      <figure>
        <img :src="current.src" :alt="current.alt">
        <figcaption>{{ current.alt }}<template v-if="current.credit"> · Фото: {{ current.credit }}</template></figcaption>
      </figure>
      <button type="button" class="lightbox__close" aria-label="Закрити" @click="open = null">×</button>
      <button v-if="photos.length > 1" type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Попереднє фото" @click="step(-1)">←</button>
      <button v-if="photos.length > 1" type="button" class="lightbox__nav lightbox__nav--next" aria-label="Наступне фото" @click="step(1)">→</button>
    </div>
  </Teleport>
</template>

<style scoped>
.gallery { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-auto-rows: 120px; gap: 8px; }
.gallery__item { padding: 0; border: 0; background: var(--symbol-lilac); overflow: hidden; cursor: zoom-in; grid-column: span 2; grid-row: span 2; }
.gallery__item:first-child { grid-column: span 4; grid-row: span 3; }
.gallery--2 .gallery__item, .gallery--1 .gallery__item { grid-column: span 3; grid-row: span 3; }
.gallery__item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s cubic-bezier(.2, .8, .2, 1), filter .4s ease; }
.gallery__item:hover img { transform: scale(1.06) rotate(-.5deg); }
@media (max-width: 640px) {
  .gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 140px; }
  .gallery__item, .gallery__item:first-child { grid-column: span 1; grid-row: span 1; }
  .gallery__item:first-child { grid-column: span 2; grid-row: span 2; }
}
.lightbox { position: fixed; inset: 0; z-index: 95; display: grid; place-items: center; padding: max(20px, env(safe-area-inset-top, 0px)) 64px; background: color-mix(in srgb, var(--symbol-ink) 92%, transparent); animation: lightbox-in .3s ease; }
.lightbox figure { margin: 0; display: grid; gap: 12px; max-width: 100%; }
.lightbox img { max-width: 100%; max-height: 82vh; object-fit: contain; animation: lightbox-img .4s cubic-bezier(.2, 1.2, .4, 1); }
.lightbox figcaption { color: var(--symbol-lilac); font-size: .85rem; text-align: center; }
.lightbox button { position: absolute; border: 0; background: var(--symbol-cream); color: var(--symbol-ink); width: 44px; height: 44px; border-radius: 50%; font-size: 1.3rem; cursor: pointer; }
.lightbox__close { top: calc(16px + env(safe-area-inset-top, 0px)); right: 16px; }
.lightbox__nav--prev { left: 12px; top: 50%; }
.lightbox__nav--next { right: 12px; top: 50%; }
@keyframes lightbox-in { from { opacity: 0; } }
@keyframes lightbox-img { from { transform: scale(.94); opacity: 0; } }
</style>
