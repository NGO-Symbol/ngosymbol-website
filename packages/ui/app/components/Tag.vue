<script setup lang="ts">
/**
 * A small non-interactive pill: category, direction or project status. With `status` it gets a marker shape plus a default Ukrainian word,
 * so the state is never carried by colour alone. Without `tone` it is an outline in the surrounding colours; with `tone` it is filled with
 * that tone (pick one different from the surface it sits on). For anything clickable use SymChip.
 */
const props = defineProps<{
  /** Fill the pill with a tone's colours instead of an outline. Omit (or "inherit") to keep the surface. */
  tone?: 'inherit' | 'paper' | 'white' | 'lilac' | 'violet' | 'apricot' | 'plum'
  /** Project status: launching (запуск) | ongoing (триває) | completed (завершено) | planned (заплановано). Adds a marker; text from the slot or a default. */
  status?: 'launching' | 'ongoing' | 'completed' | 'planned'
}>()
defineSlots<{ default?: () => any }>()
const labels = { launching: 'Запуск', ongoing: 'Триває', completed: 'Завершено', planned: 'Заплановано' } as const
const filled = computed(() => !!props.tone && props.tone !== 'inherit')
const fallback = computed(() => (props.status ? labels[props.status] : ''))
</script>

<template>
  <span class="sym-tag sym-t-label" :data-tone="filled ? tone : undefined" :data-status="status" :data-filled="filled ? '' : undefined">
    <SymIcon v-if="status === 'completed'" name="check" :size="14" class="sym-tag__mark" />
    <span v-else-if="status" class="sym-tag__mark sym-tag__dot" aria-hidden="true" />
    <span class="sym-tag__text"><slot>{{ fallback }}</slot></span>
  </span>
</template>

<style>
@layer sym-components {
  .sym-tag { display: inline-flex; align-items: center; gap: var(--sym-space-xs); max-width: 100%; min-height: 28px; padding: var(--sym-space-3xs) var(--sym-space-s); border: var(--sym-rule-width) solid currentColor; border-radius: var(--sym-shape-chip); letter-spacing: .1em; vertical-align: middle; } /* 28 px: pill height of a one-line label */
  .sym-tag[data-filled] { border-color: transparent; }
  .sym-tag__text { min-width: 0; overflow-wrap: anywhere; }
  .sym-tag__mark { flex: none; width: 14px; height: 14px; } /* marker geometry */
  .sym-tag__dot { box-sizing: border-box; border-radius: 50%; background: currentColor; }
  /* shapes differ, not only colours: ring = planned, dot with halo = launching, plain dot = ongoing, check = completed */
  .sym-tag[data-status='planned'] .sym-tag__dot { background: transparent; border: var(--sym-rule-width-strong) solid currentColor; }
  .sym-tag[data-status='launching'] .sym-tag__dot { background: radial-gradient(circle, currentColor 0 30%, transparent 32% 52%, currentColor 54% 100%); }
  .sym-tag[data-status='ongoing'] .sym-tag__dot { background: radial-gradient(circle, currentColor 0 62%, transparent 64%); }
}
</style>
