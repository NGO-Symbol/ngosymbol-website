<script setup lang="ts">
/**
 * What the page says when there is nothing to show yet: «Події скоро з’являться». A calm tonal block with an orbit, a title, one
 * sentence and (optionally) a way forward. Never an error: errors get their own page.
 */
withDefaults(defineProps<{
  /** What is missing, in plain words. */
  title: string
  /** Why, or what to do next. */
  text?: string
  /** Show the orbit mark (default true). */
  orbit?: boolean
  /** Tone of the block; omitted: a light tint of the surrounding tone. */
  tone?: 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Outline level of the title (2–4). */
  level?: 2 | 3 | 4
}>(), { orbit: true, level: 2 })
defineSlots<{ actions?: () => any }>()
</script>

<template>
  <div class="sym-empty-state">
    <div class="sym-empty-state__in" :data-tone="tone">
    <SymOrbit v-if="orbit" class="sym-empty-state__orbit" size="sm" />
    <component :is="`h${level}`" class="sym-empty-state__title sym-t-title-lg">{{ title }}</component>
    <p v-if="text" class="sym-empty-state__text sym-t-body">{{ text }}</p>
    <div v-if="$slots.actions" class="sym-empty-state__actions"><slot name="actions" /></div>
    </div>
  </div>
</template>

<style>
@layer sym-components {
  .sym-empty-state { container: sym-empty-state / inline-size; width: 100%; min-width: 0; }
  .sym-empty-state__in { display: flex; flex-direction: column; align-items: center; gap: var(--sym-space-s); width: 100%; min-width: 0; padding: var(--sym-space-xl) var(--sym-space-m); text-align: center; color: var(--sym-fg); background: color-mix(in srgb, var(--sym-fg) 5%, var(--sym-bg)); border: var(--sym-rule-width) dashed var(--sym-rule); border-radius: var(--sym-shape-card); }
  .sym-empty-state__in[data-tone] { background: var(--sym-bg); }
  .sym-empty-state .sym-empty-state__orbit.sym-orbit { --_d: 5.5rem; margin-block-end: var(--sym-space-xs); }
  .sym-empty-state__title, .sym-empty-state__text { margin: 0; }
  .sym-empty-state__text { max-width: 44ch; color: var(--sym-fg-muted); }
  .sym-empty-state__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--sym-space-xs) var(--sym-space-s); margin-block-start: var(--sym-space-xs); }
  @container sym-empty-state (min-width: 600px) { .sym-empty-state__in { padding-block: var(--sym-space-2xl); } .sym-empty-state .sym-empty-state__orbit.sym-orbit { --_d: 7.5rem; } }
}
</style>
