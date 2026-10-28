<script setup lang="ts">
type Gap = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'stack' | 'inline' | 'grid'

/**
 * Grid of equal cells. Self-sizing by default: as many columns as fit, each at least `min` wide (no breakpoints needed).
 * With `cols` it is a fixed grid that collapses by the width of the grid itself (container query), not the window:
 * N columns ≥ 840 px, 2 at 600–839, 1 below (or `phoneCols`). Children never set their own widths.
 */
const props = withDefaults(defineProps<{
  /** Minimum cell width in px for the self-sizing grid (ignored when `cols` is set). */
  min?: '160' | '200' | '240' | '280' | '320' | '400'
  /** Fixed number of columns on wide containers; collapses on narrow ones. */
  cols?: 2 | 3 | 4
  /** Space between cells (default grid = 16 → 24 px fluid). */
  gap?: Gap
  /** Vertical alignment of cells in a row (default stretch = equal heights). */
  align?: 'stretch' | 'start' | 'center'
  /** Columns when the grid is narrower than 600 px: 2 for small tiles (stats), default 1. */
  phoneCols?: 1 | 2
  /** HTML element of the grid itself, e.g. 'ul' (children must then be <li>). */
  as?: string
}>(), { min: '280', gap: 'grid', align: 'stretch', as: 'div' })
defineSlots<{ default?: () => any }>()
const gapVar = computed(() => (['stack', 'inline', 'grid'].includes(props.gap) ? `var(--sym-gap-${props.gap})` : `var(--sym-space-${props.gap})`))
</script>

<template>
  <div class="sym-grid" :data-min="min" :data-cols="cols" :data-align="align" :data-phone-cols="phoneCols" :style="{ '--_gap': gapVar }">
    <component :is="as" class="sym-grid__in"><slot /></component>
  </div>
</template>

<style>
@layer sym-components {
  /* the root is the query container (only with `cols`); the inner element is the grid. Size containers take the full width themselves or a shrink-to-fit parent collapses them. */
  .sym-grid { --_min: 280px; display: block; min-width: 0; }
  .sym-grid[data-cols] { container: sym-grid / inline-size; width: 100%; }
  .sym-grid[data-min='160'] { --_min: 160px; } .sym-grid[data-min='200'] { --_min: 200px; } .sym-grid[data-min='240'] { --_min: 240px; }
  .sym-grid[data-min='320'] { --_min: 320px; } .sym-grid[data-min='400'] { --_min: 400px; }
  .sym-grid__in { display: grid; gap: var(--_gap); align-items: stretch; grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--_min)), 1fr)); }
  .sym-grid[data-align='start'] > .sym-grid__in { align-items: start; }
  .sym-grid[data-align='center'] > .sym-grid__in { align-items: center; }
  .sym-grid__in > * { min-width: 0; }
  .sym-grid__in:is(ul, ol) { list-style: none; padding: 0; margin: 0; }
  .sym-grid[data-cols] > .sym-grid__in { grid-template-columns: minmax(0, 1fr); }
  .sym-grid[data-cols][data-phone-cols='2'] > .sym-grid__in { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @container sym-grid (min-width: 600px) { .sym-grid[data-cols] > .sym-grid__in { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @container sym-grid (min-width: 840px) {
    .sym-grid[data-cols='3'] > .sym-grid__in { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .sym-grid[data-cols='4'] > .sym-grid__in { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
}
</style>
