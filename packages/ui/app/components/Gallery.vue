<script setup lang="ts">
type Tone = 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
type Ratio = '16:9' | '4:3' | '1:1' | '3:4' | '21:9' | 'auto'
interface GalleryItem {
  /** Image address; omit for a tonal placeholder. */
  src?: string
  /** Text alternative (required). */
  alt: string
  /** Caption under the picture. */
  caption?: string
  /** Shape of this picture; overrides the gallery default (useful in masonry-lite). */
  ratio?: Ratio
  /** Natural size, needed for ratio `auto`. */
  width?: number
  height?: number
  /** Placeholder tone. */
  tone?: Tone
}

/**
 * Pictures in a grid. `grid` = equal cells; `masonry-lite` = columns where every picture keeps its own shape (give items different ratios).
 * Columns come from the width of the gallery itself. No lightbox: pictures are not links. The first row loads eagerly.
 */
const props = withDefaults(defineProps<{
  /** The pictures. */
  items: GalleryItem[]
  /** grid (equal cells) | masonry-lite (columns, own ratios). */
  layout?: 'grid' | 'masonry-lite'
  /** Shape of every picture in `grid` when an item has no ratio of its own. */
  ratio?: Ratio
  /** Minimum cell width in px: the gallery fits as many columns as it can. */
  min?: '160' | '200' | '240' | '320'
  /** Accessible name of the list, e.g. «Фотографії з події». */
  label?: string
}>(), { layout: 'grid', ratio: '4:3', min: '240' })

const cycle: Tone[] = ['lilac', 'apricot', 'white', 'violet']
const tones = computed(() => props.items.map((it, i) => it.tone ?? cycle[i % cycle.length]))
</script>

<template>
  <div class="sym-gallery" :data-layout="layout" :data-min="min">
  <ul class="sym-gallery__list" role="list" :aria-label="label">
    <li v-for="(it, i) in items" :key="i" class="sym-gallery__item">
      <SymMedia :src="it.src" :alt="it.alt" :caption="it.caption" :ratio="it.ratio ?? (layout === 'grid' ? ratio : '4:3')" :width="it.width" :height="it.height" :tone="tones[i]" :loading="i < 3 ? 'eager' : 'lazy'" />
    </li>
  </ul>
  </div>
</template>

<style>
@layer sym-components {
  .sym-gallery { --_min: 15rem; --_gap: var(--sym-gap-grid); container: sym-gallery / inline-size; width: 100%; min-width: 0; }
  .sym-gallery__list { margin: 0; padding: 0; list-style: none; display: grid; gap: var(--_gap); align-items: start; grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--_min)), 1fr)); }
  .sym-gallery[data-min='160'] { --_min: 10rem; } .sym-gallery[data-min='200'] { --_min: 12.5rem; } .sym-gallery[data-min='320'] { --_min: 20rem; }
  .sym-gallery__item { min-width: 0; }
  /* masonry-lite: CSS columns (items keep their own ratio); the column count follows the gallery width */
  .sym-gallery[data-layout='masonry-lite'] .sym-gallery__list { display: block; column-count: 1; column-gap: var(--_gap); }
  .sym-gallery[data-layout='masonry-lite'] .sym-gallery__item { break-inside: avoid; margin-block-end: var(--_gap); }
  @container sym-gallery (min-width: 520px) { .sym-gallery[data-layout='masonry-lite'] .sym-gallery__list { column-count: 2; } }
  @container sym-gallery (min-width: 900px) { .sym-gallery[data-layout='masonry-lite'] .sym-gallery__list { column-count: 3; } }
}
</style>
