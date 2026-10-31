<script setup lang="ts">
// The exhibition site's dossier-style equivalent of the main site's PhotoGallery: every thumbnail opens the original
// in a modal viewer; Esc closes it and the arrow keys move through the current gallery.
import { altIn, creditIn } from '#symbol/alt-en'

interface GalleryPhoto { src: string, alt: string, credit?: string }

defineOptions({ inheritAttrs: false })
const props = defineProps<{ photos: GalleryPhoto[] }>()
const { t, isEn } = useLang()
// Descriptions and credits in the page's language (English lines shared with symbol.ngo).
const alt = (photo: GalleryPhoto) => altIn(photo.alt, isEn.value)
const open = ref<number | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let opener: HTMLElement | null = null
const current = computed(() => open.value === null ? null : props.photos[open.value])

function openAt(index: number, event: MouseEvent) {
  opener = event.currentTarget as HTMLElement
  open.value = index
  nextTick(() => closeButton.value?.focus())
}

function close() {
  open.value = null
  nextTick(() => opener?.focus())
}

function step(delta: number) {
  if (open.value === null) return
  open.value = (open.value + delta + props.photos.length) % props.photos.length
}

function onKey(event: KeyboardEvent) {
  if (open.value === null) return
  if (['Escape', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowRight') step(1)
  if (event.key === 'ArrowLeft') step(-1)
}

watch(open, value => {
  document.documentElement.classList.toggle('has-docs-lightbox', value !== null)
})
// Capture before the artist page's ←/→ file navigation so an open photo owns the arrow keys.
onMounted(() => window.addEventListener('keydown', onKey, true))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey, true)
  document.documentElement.classList.remove('has-docs-lightbox')
})
</script>

<template>
  <ul class="docs-photos docs-gallery" v-bind="$attrs">
    <li v-for="(photo, index) in photos" :key="photo.src">
      <button type="button" class="docs-gallery__open" :aria-label="t(`Відкрити фото: ${photo.alt}`, `Open photo: ${alt(photo)}`)" @click="openAt(index, $event)">
        <figure><MediaImg :src="photo.src" :alt="alt(photo)" loading="lazy" decoding="async" /></figure>
      </button>
    </li>
  </ul>

  <Teleport to="body">
    <div v-if="current" class="docs-lightbox" role="dialog" aria-modal="true" :aria-label="alt(current)" @click.self="close">
      <p class="docs-lightbox__file" aria-live="polite">{{ t('Фотодокумент', 'Photo document') }} {{ String((open ?? 0) + 1).padStart(2, '0') }} / {{ String(photos.length).padStart(2, '0') }}</p>
      <figure>
        <img :src="current.src" :alt="alt(current)">
        <figcaption>{{ alt(current) }}<template v-if="current.credit"> · {{ t('Фото', 'Photo') }}: {{ creditIn(current.credit, isEn) }}</template></figcaption>
      </figure>
      <button ref="closeButton" type="button" class="docs-lightbox__close" :aria-label="t('Закрити', 'Close')" @click="close">×</button>
      <button v-if="photos.length > 1" type="button" class="docs-lightbox__nav docs-lightbox__nav--prev" :aria-label="t('Попереднє фото', 'Previous photo')" @click="step(-1)">←</button>
      <button v-if="photos.length > 1" type="button" class="docs-lightbox__nav docs-lightbox__nav--next" :aria-label="t('Наступне фото', 'Next photo')" @click="step(1)">→</button>
    </div>
  </Teleport>
</template>

<style scoped>
.docs-gallery__open { display: block; width: 100%; padding: 0; border: 0; background: transparent; color: inherit; cursor: zoom-in; }
.docs-gallery__open figure { overflow: hidden; outline: 1px solid color-mix(in srgb, var(--docs-ink) 20%, transparent); outline-offset: -1px; }
.docs-gallery__open img { display: block; transition: transform .35s ease, filter .25s ease; }
.docs-gallery__open:hover img, .docs-gallery__open:focus-visible img { filter: none; transform: scale(1.025); }
.docs-gallery__open:focus-visible { outline: 3px solid var(--docs-stamp); outline-offset: 3px; }
.docs-lightbox { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: max(56px, calc(20px + env(safe-area-inset-top, 0px))) clamp(50px, 7vw, 100px) max(30px, env(safe-area-inset-bottom, 0px)); background: color-mix(in srgb, var(--docs-ink) 95%, transparent); animation: docs-lightbox-in .22s ease; }
.docs-lightbox::before { content: ''; position: absolute; inset: 14px; border: 1px solid color-mix(in srgb, var(--docs-paper) 28%, transparent); pointer-events: none; }
.docs-lightbox figure { position: relative; z-index: 1; display: grid; gap: 10px; max-width: 100%; max-height: 100%; margin: 0; justify-items: center; }
.docs-lightbox img { display: block; max-width: 100%; max-height: calc(100vh - 130px); object-fit: contain; box-shadow: 8px 8px 0 color-mix(in srgb, #000 35%, transparent); animation: docs-lightbox-photo .3s cubic-bezier(.2, .9, .3, 1); }
.docs-lightbox figcaption { max-width: min(86ch, 90vw); color: var(--docs-paper); font-family: var(--docs-mono); font-size: .75rem; line-height: 1.4; text-align: center; }
.docs-lightbox__file { position: absolute; z-index: 2; top: 20px; left: 24px; margin: 0; padding: 5px 8px 3px; background: var(--docs-stamp); color: #fff; font-family: var(--docs-mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; transform: rotate(-1deg); }
.docs-lightbox button { position: absolute; z-index: 3; display: grid; place-items: center; width: 44px; height: 44px; padding: 0; border: 1px solid var(--docs-paper); border-radius: 0; background: var(--docs-paper); color: var(--docs-ink); font-family: var(--docs-mono); font-size: 1.35rem; cursor: pointer; transition: background .15s ease, color .15s ease, transform .15s ease; }
.docs-lightbox button:hover, .docs-lightbox button:focus-visible { background: var(--docs-stamp); color: #fff; transform: translate(-2px, -2px); outline: 2px solid var(--docs-paper); outline-offset: 2px; }
.docs-lightbox__close { top: calc(18px + env(safe-area-inset-top, 0px)); right: 20px; }
.docs-lightbox__nav { top: 50%; margin-top: -22px; }
.docs-lightbox__nav--prev { left: 20px; }
.docs-lightbox__nav--next { right: 20px; }
@media (max-width: 640px) {
  .docs-lightbox { padding: max(66px, calc(20px + env(safe-area-inset-top, 0px))) 12px 76px; }
  .docs-lightbox::before { inset: 8px; }
  .docs-lightbox img { max-height: calc(100vh - 165px); }
  .docs-lightbox__file { top: 16px; left: 14px; }
  .docs-lightbox__close { top: calc(12px + env(safe-area-inset-top, 0px)); right: 12px; }
  .docs-lightbox__nav { top: auto; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); margin: 0; }
  .docs-lightbox__nav--prev { left: calc(50% - 52px); }
  .docs-lightbox__nav--next { right: calc(50% - 52px); }
}
@media (prefers-reduced-motion: reduce) {
  .docs-lightbox, .docs-lightbox img { animation: none; }
  .docs-gallery__open img { transition: none; }
}
@keyframes docs-lightbox-in { from { opacity: 0; } }
@keyframes docs-lightbox-photo { from { opacity: 0; transform: scale(.97); } }
</style>

<style>
html.has-docs-lightbox { overflow: hidden; }
</style>
