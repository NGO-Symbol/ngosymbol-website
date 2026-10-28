<script setup lang="ts">
/**
 * The closing «call to action» of a page: a short title, one sentence, one or two buttons. Put it in a SymSection with its own tone
 * (apricot, violet or plum are the strong ones). With `orbit` an orbit sits beside the text (above it on phones).
 */
withDefaults(defineProps<{
  /** Small label above the title. */
  eyebrow?: string
  /** The invitation, one line to two. */
  title: string
  /** Supporting sentence. */
  text?: string
  /** Show the orbit mark. */
  orbit?: boolean
  /** Outline level of the title (2–4). */
  level?: 2 | 3 | 4
}>(), { level: 2 })
defineSlots<{ actions?: () => any }>()
</script>

<template>
  <div class="sym-callout">
    <div class="sym-callout__in" :data-orbit="orbit || undefined">
    <SymOrbit v-if="orbit" class="sym-callout__orbit" size="md" />
    <div class="sym-callout__body">
      <SymEyebrow v-if="eyebrow">{{ eyebrow }}</SymEyebrow>
      <component :is="`h${level}`" class="sym-callout__title sym-t-headline">{{ title }}</component>
      <p v-if="text" class="sym-callout__text sym-t-lead">{{ text }}</p>
      <div v-if="$slots.actions" class="sym-callout__actions"><slot name="actions" /></div>
    </div>
    </div>
  </div>
</template>

<style>
@layer sym-components {
  .sym-callout { container: sym-callout / inline-size; width: 100%; min-width: 0; color: var(--sym-fg); }
  .sym-callout__in { display: grid; gap: var(--sym-space-l); align-items: center; }
  .sym-callout__body { display: flex; flex-direction: column; align-items: flex-start; gap: var(--sym-space-m); min-width: 0; max-width: 46rem; }
  .sym-callout__title, .sym-callout__text { margin: 0; }
  .sym-callout__text { max-width: var(--sym-width-prose); }
  .sym-callout__actions { display: flex; flex-wrap: wrap; gap: var(--sym-space-xs) var(--sym-space-s); margin-block-start: var(--sym-space-xs); }
  .sym-callout .sym-callout__orbit.sym-orbit { --_d: 8rem; }
  .sym-callout__in[data-orbit] .sym-callout__orbit { order: -1; }
  @container sym-callout (min-width: 560px) { .sym-callout__title { font-size: var(--sym-text-headline-lg); line-height: 1; letter-spacing: -.03em; } }
  @container sym-callout (min-width: 760px) {
    .sym-callout__in[data-orbit] { grid-template-columns: minmax(0, 1fr) auto; gap: var(--sym-space-xl); }
    .sym-callout__in[data-orbit] .sym-callout__orbit { order: 2; }
    .sym-callout .sym-callout__orbit.sym-orbit { --_d: 16rem; }
  }
}
</style>
