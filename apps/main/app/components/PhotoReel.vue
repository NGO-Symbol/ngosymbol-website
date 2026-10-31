<script setup lang="ts">
// A strip of photographs that scrolls sideways (swipe, trackpad, arrows), with a full-screen view:
// swipe or ← → to go through, Esc or a tap outside to close. Each photo links to its project.
import { highlightCaption, thumbOf, type Highlight } from '~/data/highlights'

// placeholders: empty frames shown until the selection is made (keeps the layout still while it loads).
const props = defineProps<{ photos: Highlight[]; placeholders?: number }>()
const { isEn } = useLang()
const altOf = (photo: Highlight) => isEn.value ? photo.altEn : photo.alt
const track = ref<HTMLElement>()
const atStart = ref(true)
const atEnd = ref(false)
const open = ref<number | null>(null)
const current = computed(() => (open.value === null ? null : props.photos[open.value]))

function updateEnds() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft < 8
  atEnd.value = el.scrollLeft + el.clientWidth > el.scrollWidth - 8
}
function scrollBy(direction: number) {
  const el = track.value
  if (el) el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
}

function step(delta: number) {
  if (open.value === null) return
  open.value = (open.value + delta + props.photos.length) % props.photos.length
}
function close() {
  const last = open.value
  open.value = null
  // Keep the strip where the viewer stopped.
  nextTick(() => track.value?.children[last ?? 0]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }))
}

// Swipe in the full-screen view.
let touchX = 0
function onTouchStart(event: TouchEvent) { touchX = event.touches[0]?.clientX ?? 0 }
function onTouchEnd(event: TouchEvent) {
  const dx = (event.changedTouches[0]?.clientX ?? 0) - touchX
  if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
}

function onKey(event: KeyboardEvent) {
  if (open.value === null) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowRight') step(1)
  if (event.key === 'ArrowLeft') step(-1)
}
watch(open, value => { document.documentElement.style.overflow = value === null ? '' : 'hidden' })
onMounted(() => { window.addEventListener('keydown', onKey); updateEnds() })
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' })
</script>

<template>
  <div class="reel">
    <ul ref="track" class="reel__track" @scroll.passive="updateEnds">
      <li v-for="n in (photos.length ? 0 : placeholders ?? 0)" :key="`p${n}`" class="reel__item" aria-hidden="true"><span class="reel__photo reel__photo--empty" /></li>
      <li v-for="(photo, index) in photos" :key="photo.src" class="reel__item">
        <button type="button" class="reel__photo" :aria-label="`${isEn ? 'Open photo' : 'Відкрити фото'}: ${altOf(photo)}`" @click="open = index">
          <MediaImg :src="photo.src" :fallback="thumbOf(photo.src)" :alt="altOf(photo)" :loading="index < 4 ? 'eager' : 'lazy'" decoding="async" @load="($event.target as HTMLImageElement).classList.add('is-loaded')" />
        </button>
        <p class="reel__meta"><span class="reel__index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><NuxtLink class="reel__caption" :to="photo.to">{{ highlightCaption(photo, isEn) }}</NuxtLink></p>
      </li>
    </ul>
    <div class="reel__controls">
      <button type="button" class="reel__arrow" :aria-label="isEn ? 'Previous photos' : 'Попередні фото'" :disabled="atStart" @click="scrollBy(-1)">←</button>
      <button type="button" class="reel__arrow" :aria-label="isEn ? 'Next photos' : 'Наступні фото'" :disabled="atEnd" @click="scrollBy(1)">→</button>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="reel-view">
      <div v-if="current" class="reel-view" role="dialog" aria-modal="true" :aria-label="altOf(current)" @click.self="close" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
        <figure>
          <Transition name="reel-photo" mode="out-in">
            <img :key="current.src" :src="current.src" :alt="altOf(current)">
          </Transition>
          <figcaption>
            <span class="reel-view__count">{{ (open ?? 0) + 1 }} / {{ photos.length }}</span>
            <span>{{ altOf(current) }}<template v-if="current.credit"> · {{ isEn ? 'Photo' : 'Фото' }}: {{ creditIn(current.credit, isEn) }}</template></span>
            <NuxtLink :to="current.to" @click="open = null">{{ highlightCaption(current, isEn) }}</NuxtLink>
          </figcaption>
        </figure>
        <button type="button" class="reel-view__close" :aria-label="isEn ? 'Close' : 'Закрити'" @click="close">×</button>
        <button type="button" class="reel-view__nav reel-view__nav--prev" :aria-label="isEn ? 'Previous photo' : 'Попереднє фото'" @click="step(-1)">←</button>
        <button type="button" class="reel-view__nav reel-view__nav--next" :aria-label="isEn ? 'Next photo' : 'Наступне фото'" @click="step(1)">→</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.reel { display: grid; gap: 14px; }
.reel__track { display: flex; gap: 14px; margin: 0; padding: 0 8px 6px 0; list-style: none; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: 0; overscroll-behavior-x: contain; scrollbar-width: none; }
.reel__track::-webkit-scrollbar { display: none; }
/* Every frame has the same height (wide 3:2 and upright 4:5 alike), so all captions sit on one line. */
.reel { --reel-h: clamp(200px, 21vw, 300px); }
.reel__item { flex: none; width: calc(var(--reel-h) * 1.5); display: grid; gap: 8px; scroll-snap-align: start; }
.reel__item:nth-child(3n + 2) { width: calc(var(--reel-h) * .8); }
.reel__item { padding-top: 6px; align-content: start; }
/* A printed photograph in a passe-partout: a light mat with a hairline edge; on hover it lifts off an apricot shadow. */
.reel__photo { padding: 7px; border: 1px solid color-mix(in srgb, var(--symbol-plum) 16%, transparent); background: var(--symbol-white); overflow: hidden; cursor: zoom-in; aspect-ratio: 3 / 2; box-shadow: 0 0 0 0 var(--symbol-apricot); transition: transform .45s cubic-bezier(.2, .8, .2, 1), box-shadow .45s cubic-bezier(.2, .8, .2, 1); }
.reel__photo:hover, .reel__photo:focus-visible { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 0 var(--symbol-apricot); }
.reel__photo--empty { background: color-mix(in srgb, var(--symbol-lilac) 40%, var(--symbol-white)); }
.reel__item:nth-child(3n + 2) .reel__photo { aspect-ratio: 4 / 5; }
.reel__photo img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0; background: var(--symbol-lilac); transition: transform .6s cubic-bezier(.2, .8, .2, 1), opacity .4s ease; }
.reel__photo img.is-loaded { opacity: 1; }
.reel__photo--empty { display: block; height: 100%; }
.reel__photo:hover img { transform: scale(1.03); }
.reel__meta { margin: 0; display: flex; gap: 10px; align-items: baseline; }
.reel__index { font-size: .7rem; letter-spacing: .12em; font-variant-numeric: tabular-nums; color: var(--symbol-violet); flex: none; }
.reel__caption { font-size: .8rem; line-height: 1.3; color: color-mix(in srgb, var(--symbol-plum) 75%, transparent); text-decoration: none; width: fit-content; }
.reel__caption:hover { color: var(--symbol-plum); text-decoration: underline; }
.reel__controls { display: flex; gap: 8px; justify-content: flex-end; }
.reel__arrow { width: 44px; height: 44px; border: 1px solid var(--symbol-plum); border-radius: 50%; background: transparent; color: var(--symbol-plum); font: inherit; font-size: 1.1rem; cursor: pointer; transition: background .2s ease, color .2s ease, opacity .2s ease; }
.reel__arrow:hover:not(:disabled) { background: var(--symbol-plum); color: var(--symbol-cream); }
.reel__arrow:disabled { opacity: .3; cursor: default; }

.reel-view { position: fixed; inset: 0; z-index: 95; display: grid; place-items: center; padding: max(16px, env(safe-area-inset-top)) 64px max(16px, env(safe-area-inset-bottom)); background: color-mix(in srgb, #120f17 97%, transparent); color: #f6efe6; touch-action: pan-y; }
.reel-view figure { margin: 0; display: grid; gap: 12px; justify-items: center; max-width: 100%; }
.reel-view img { max-width: min(100%, 1400px); max-height: calc(100dvh - 140px); object-fit: contain; display: block; }
.reel-view figcaption { display: flex; flex-wrap: wrap; gap: 4px 16px; justify-content: center; max-width: 72ch; font-size: .85rem; line-height: 1.4; text-align: center; opacity: .9; }
.reel-view figcaption a { color: inherit; }
.reel-view__count { font-variant-numeric: tabular-nums; opacity: .7; }
.reel-view__close, .reel-view__nav { position: absolute; width: 48px; height: 48px; border: 1px solid color-mix(in srgb, #f6efe6 40%, transparent); border-radius: 50%; background: transparent; color: inherit; font: inherit; font-size: 1.3rem; cursor: pointer; }
.reel-view__close { top: max(16px, env(safe-area-inset-top)); right: 16px; }
.reel-view__nav { top: 50%; margin-top: -24px; }
.reel-view__nav--prev { left: 8px; }
.reel-view__nav--next { right: 8px; }
.reel-view__close:hover, .reel-view__nav:hover { background: #f6efe6; color: #120f17; }
.reel-view-enter-active, .reel-view-leave-active { transition: opacity .25s ease; }
.reel-view-enter-from, .reel-view-leave-to { opacity: 0; }
.reel-photo-enter-active, .reel-photo-leave-active { transition: opacity .18s ease; }
.reel-photo-enter-from, .reel-photo-leave-to { opacity: 0; }
@media (max-width: 640px) {
  .reel { --reel-h: 50vw; }
  .reel-view { padding-inline: 8px; }
  .reel-view__nav { top: auto; bottom: max(16px, env(safe-area-inset-bottom)); margin-top: 0; }
  .reel-view img { max-height: calc(100dvh - 190px); }
}
@media (prefers-reduced-motion: reduce) { .reel__photo img { transition: none; } }
</style>
