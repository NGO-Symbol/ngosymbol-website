<script setup lang="ts">
/**
 * A full-width band of a page with its own tone (background + text + rules + buttons all follow it). Stack sections one after
 * another; put SymOrbit shapes in the `#decor` slot; each one holds a SymContainer (added unless `width="full"`). `clip` lets decorative SymOrbit shapes bleed out of the band.
 */
withDefaults(defineProps<{
  /** Colour set of the band: paper (page default, cream) | white | lilac | violet | apricot | plum. Inherits the page tone when omitted. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Vertical padding: none | sm | md (default) | lg. */
  space?: 'none' | 'sm' | 'md' | 'lg'
  /** Inner width: page | wide | narrow | prose, or full (no inner container: the content spans the band). */
  width?: 'page' | 'wide' | 'narrow' | 'prose' | 'full'
  /** Hairline rule on the top and/or bottom edge of the band. */
  rule?: 'top' | 'bottom' | 'both'
  /** Cut off decorative shapes at the band edge (set when the band contains a bleeding SymOrbit). */
  clip?: boolean
  /** Fill most of the screen height and centre the content vertically (contact / closing screens). */
  fill?: boolean
  /** HTML element to render. */
  as?: string
}>(), { space: 'md', width: 'page', as: 'section' })
defineSlots<{ default?: () => any; /** Decorative shapes (SymOrbit) anchored to the band, painted behind the content. */ decor?: () => any }>()
</script>

<template>
  <component :is="as" class="sym-section" :data-tone="tone" :data-space="space" :data-rule="rule" :data-clip="clip || undefined" :data-fill="fill || undefined">
    <div v-if="$slots.decor" class="sym-section__decor" aria-hidden="true"><slot name="decor" /></div>
    <slot v-if="width === 'full'" />
    <SymContainer v-else :size="width"><slot /></SymContainer>
  </component>
</template>

<style>
@layer sym-components {
  .sym-section { --_py: var(--sym-section-y); position: relative; padding-block: var(--_py); }
  .sym-section[data-space='none'] { --_py: 0px; }
  .sym-section[data-space='sm'] { --_py: var(--sym-section-y-sm); }
  .sym-section[data-space='lg'] { --_py: var(--sym-space-4xl); }
  .sym-section[data-clip] { overflow: clip; }
  .sym-section[data-fill] { min-height: 70svh; display: flex; align-items: center; }
  .sym-section[data-fill] > .sym-container { width: min(var(--sym-width-page), 100% - 2 * var(--sym-page-margin)); }
  .sym-section[data-rule='top'], .sym-section[data-rule='both'] { border-top: var(--sym-rule-width) solid var(--sym-rule); }
  .sym-section[data-rule='bottom'], .sym-section[data-rule='both'] { border-bottom: var(--sym-rule-width) solid var(--sym-rule); }
  /* decorative shapes are anchored to the band (not to the content) and painted behind it */
  .sym-section__decor { position: absolute; inset: 0; z-index: var(--sym-z-base); pointer-events: none; }
  /* content sits above any decorative orbit */
  .sym-section > .sym-container { position: relative; z-index: var(--sym-z-raised); }
}
</style>
