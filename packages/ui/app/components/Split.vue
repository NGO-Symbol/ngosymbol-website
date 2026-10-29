<script setup lang="ts">
type Gap = 's' | 'm' | 'l' | 'xl' | 'grid'

/**
 * Two columns that stack when the container is narrow (measured on the Split itself). Use `#start` and `#end`.
 * Page layouts like «narrow label + wide text», «text + image», «heading + intro» are all Splits.
 */
const props = withDefaults(defineProps<{
  /** Column proportions start:end — 1:1, 1:2, 2:1, 5:7, 7:5, or aside (a 260 px side column + the rest). */
  ratio?: '1:1' | '1:2' | '2:1' | '5:7' | '7:5' | 'aside'
  /** Container width below which the columns stack. */
  stackBelow?: '600' | '760' | '900'
  /** Space between columns. */
  gap?: Gap
  /** Vertical alignment of the columns when side by side. */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** When stacked, show the end column first (e.g. an image above the text). */
  reverse?: boolean
  /** Keep the start column in view while the end column scrolls (side navigation, project facts). */
  sticky?: boolean
}>(), { ratio: '1:1', stackBelow: '760', gap: 'xl', align: 'start' })
defineSlots<{ start?: () => any; end?: () => any; default?: () => any }>()
const gapVar = computed(() => (props.gap === 'grid' ? 'var(--sym-gap-grid)' : `var(--sym-space-${props.gap})`))
</script>

<template>
  <div class="sym-split" :data-ratio="ratio" :data-stack-below="stackBelow" :data-align="align" :data-reverse="reverse || undefined" :data-sticky="sticky || undefined" :style="{ '--_gap': gapVar }">
    <div class="sym-split__in">
      <div class="sym-split__start"><slot name="start"><slot /></slot></div>
      <div class="sym-split__end"><slot name="end" /></div>
    </div>
  </div>
</template>

<style>
@layer sym-components {
  .sym-split { container: sym-split / inline-size; width: 100%; min-width: 0; }
  .sym-split__in { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--_gap); align-items: start; }
  .sym-split__start, .sym-split__end { min-width: 0; }
  .sym-split[data-reverse] > .sym-split__in > .sym-split__end { order: -1; }
  .sym-split[data-align='center'] > .sym-split__in { align-items: center; } .sym-split[data-align='end'] > .sym-split__in { align-items: end; } .sym-split[data-align='stretch'] > .sym-split__in { align-items: stretch; }

  @container sym-split (min-width: 600px) { .sym-split[data-stack-below='600'] > .sym-split__in { grid-template-columns: var(--_cols); } .sym-split[data-stack-below='600'][data-reverse] > .sym-split__in > .sym-split__end { order: 0; } .sym-split[data-stack-below='600'][data-sticky] > .sym-split__in > .sym-split__start { position: sticky; top: calc(var(--sym-header-h) + var(--sym-space-m)); } }
  @container sym-split (min-width: 760px) { .sym-split[data-stack-below='760'] > .sym-split__in { grid-template-columns: var(--_cols); } .sym-split[data-stack-below='760'][data-reverse] > .sym-split__in > .sym-split__end { order: 0; } .sym-split[data-stack-below='760'][data-sticky] > .sym-split__in > .sym-split__start { position: sticky; top: calc(var(--sym-header-h) + var(--sym-space-m)); } }
  @container sym-split (min-width: 900px) { .sym-split[data-stack-below='900'] > .sym-split__in { grid-template-columns: var(--_cols); } .sym-split[data-stack-below='900'][data-reverse] > .sym-split__in > .sym-split__end { order: 0; } .sym-split[data-stack-below='900'][data-sticky] > .sym-split__in > .sym-split__start { position: sticky; top: calc(var(--sym-header-h) + var(--sym-space-m)); } }

  .sym-split { --_cols: minmax(0, 1fr) minmax(0, 1fr); }
  .sym-split[data-ratio='1:2'] { --_cols: minmax(0, 1fr) minmax(0, 2fr); } .sym-split[data-ratio='2:1'] { --_cols: minmax(0, 2fr) minmax(0, 1fr); }
  .sym-split[data-ratio='5:7'] { --_cols: minmax(0, 5fr) minmax(0, 7fr); } .sym-split[data-ratio='7:5'] { --_cols: minmax(0, 7fr) minmax(0, 5fr); }
  .sym-split[data-ratio='aside'] { --_cols: minmax(0, 260px) minmax(0, 1fr); }
}
</style>
