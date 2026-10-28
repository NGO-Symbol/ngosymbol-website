<script setup lang="ts">
/**
 * Project facts as a definition list: label above, value in serif below, a hairline over each pair. One column on narrow containers,
 * two on wide ones. Facts come from the caller (period, status, direction, geography); nothing is hard-coded here.
 */
withDefaults(defineProps<{
  /** Pairs to show, in order. */
  items: { label: string; value: string }[]
  /** Columns on wide containers (≥ 600 px): 2 (default) or 1. */
  cols?: 1 | 2
}>(), { cols: 2 })
defineSlots<{ value?: (p: { item: { label: string; value: string }; index: number }) => any }>()
</script>

<template>
  <div class="sym-meta-list" :data-cols="cols">
    <dl class="sym-meta-list__in">
      <div v-for="(item, i) in items" :key="item.label + i" class="sym-meta-list__row">
        <dt class="sym-meta-list__label sym-t-label">{{ item.label }}</dt>
        <dd class="sym-meta-list__value sym-t-title"><slot name="value" :item="item" :index="i">{{ item.value }}</slot></dd>
      </div>
    </dl>
  </div>
</template>

<style>
@layer sym-components {
  .sym-meta-list { container: sym-meta-list / inline-size; width: 100%; min-width: 0; }
  .sym-meta-list__in { display: grid; grid-template-columns: minmax(0, 1fr); column-gap: var(--sym-space-l); margin: 0; }
  .sym-meta-list__row { display: flex; flex-direction: column; gap: var(--sym-space-2xs); min-width: 0; padding-block: var(--sym-space-s); border-top: var(--sym-rule-width) solid var(--sym-rule); }
  .sym-meta-list__label { color: var(--sym-fg-muted); margin: 0; }
  .sym-meta-list__value { margin: 0; }
  @container sym-meta-list (min-width: 600px) { .sym-meta-list[data-cols='2'] > .sym-meta-list__in { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
}
</style>
