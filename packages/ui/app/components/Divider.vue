<script setup lang="ts">
/**
 * A hairline that separates two groups of content. With `label` the line carries a small uppercase caption («Минулі події»).
 * Separates; it does not decorate: for decorative geometry use SymOrbit.
 */
defineProps<{
  /** Thicker line (2 px) for the main break of a page. */
  strong?: boolean
  /** Caption at the start of the line. */
  label?: string
}>()
</script>

<template>
  <div v-if="label" class="sym-divider sym-divider--label" role="separator" :data-strong="strong || undefined">
    <span class="sym-divider__label sym-t-label">{{ label }}</span>
    <span class="sym-divider__line" aria-hidden="true" />
  </div>
  <hr v-else class="sym-divider" :data-strong="strong || undefined">
</template>

<style>
@layer sym-components {
  .sym-divider { border: 0; border-top: var(--sym-rule-width) solid var(--sym-rule); margin: 0; width: 100%; }
  .sym-divider[data-strong] { border-top-width: var(--sym-rule-width-strong); }
  .sym-divider--label { display: flex; align-items: center; gap: var(--sym-space-s); border: 0; }
  .sym-divider__label { flex: none; max-width: 100%; color: var(--sym-fg-muted); overflow-wrap: anywhere; }
  .sym-divider__line { flex: 1 1 var(--sym-space-l); height: 0; border-top: var(--sym-rule-width) solid var(--sym-rule); }
  .sym-divider--label[data-strong] .sym-divider__line { border-top-width: var(--sym-rule-width-strong); }
}
</style>
