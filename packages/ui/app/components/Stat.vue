<script setup lang="ts">
/**
 * One figure with its meaning: a big serif numeral, what it counts, and where the number comes from. `source` is required on purpose:
 * a number without a source is not published. Never invent metrics; place several in a SymGrid (phoneCols 2).
 */
withDefaults(defineProps<{
  /** The figure as text, e.g. "12" or "2020–2025". Formatting (spaces, %) is up to the caller. */
  value: string
  /** What the figure counts. */
  label: string
  /** Where the number comes from (report, year, "приклад, не реальні дані" in demos). Shown as a footnote. */
  source: string
  /** Smaller text right after the figure: «%», «тис.», «років». */
  unit?: string
  /** m = headline-lg numeral (grids of 3–4) | l = display numeral (one or two big facts). */
  size?: 'm' | 'l'
}>(), { size: 'm' })
</script>

<template>
  <figure class="sym-stat" :data-size="size">
    <div class="sym-stat__value sym-tabular" :class="size === 'l' ? 'sym-t-display' : 'sym-t-headline-lg'">{{ value }}<span v-if="unit" class="sym-stat__unit sym-t-title">{{ unit }}</span></div>
    <figcaption class="sym-stat__caption">
      <span class="sym-stat__label sym-t-body-sm">{{ label }}</span>
      <span class="sym-stat__source sym-t-caption">Джерело: {{ source }}</span>
    </figcaption>
  </figure>
</template>

<style>
@layer sym-components {
  .sym-stat { display: flex; flex-direction: column; gap: var(--sym-space-xs); min-width: 0; margin: 0; padding-block-start: var(--sym-space-s); border-top: var(--sym-rule-width) solid var(--sym-rule); }
  .sym-stat__value { margin: 0; }
  .sym-stat__unit { margin-inline-start: .2em; font-style: normal; color: var(--sym-fg); letter-spacing: 0; }
  .sym-stat__caption { display: flex; flex-direction: column; gap: var(--sym-space-3xs); }
  .sym-stat__source { color: var(--sym-fg-muted); }
}
</style>
