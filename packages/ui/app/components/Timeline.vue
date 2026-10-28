<script setup lang="ts">
interface TimelineItem {
  /** When: «2022», «Весна 2024», «Із 2025». Plain text, not a machine date. */
  date: string
  /** What happened. */
  title: string
  /** One or two sentences. */
  text?: string
}

/**
 * A history as a vertical rule with markers: dates down the side, events beside them. Fixed order as given (oldest first or newest first:
 * your choice). Never scrolls sideways; on narrow containers the date moves above the title.
 */
withDefaults(defineProps<{
  /** The events. */
  items: TimelineItem[]
  /** Outline level of the event titles (2–5); the list itself carries no heading. */
  level?: 2 | 3 | 4 | 5
}>(), { level: 3 })
</script>

<template>
  <ol class="sym-timeline" role="list">
    <li v-for="(it, i) in items" :key="i" class="sym-timeline__item">
      <span class="sym-timeline__date sym-t-label">{{ it.date }}</span>
      <span class="sym-timeline__rail" aria-hidden="true"><span class="sym-timeline__marker" /></span>
      <div class="sym-timeline__body">
        <component :is="`h${level}`" class="sym-timeline__title sym-t-title">{{ it.title }}</component>
        <p v-if="it.text" class="sym-timeline__text sym-t-body-sm">{{ it.text }}</p>
      </div>
    </li>
  </ol>
</template>

<style>
@layer sym-components {
  .sym-timeline { container: sym-timeline / inline-size; display: block; width: 100%; min-width: 0; margin: 0; padding: 0; list-style: none; color: var(--sym-fg); }
  .sym-timeline__item { --_rail: 1.75rem; display: grid; grid-template-columns: var(--_rail) minmax(0, 1fr); grid-template-areas: 'rail date' 'rail body'; column-gap: var(--sym-space-s); }
  .sym-timeline__date { grid-area: date; color: var(--sym-fg-muted); padding-block-start: var(--sym-space-3xs); }
  .sym-timeline__rail { grid-area: rail; position: relative; display: block; }
  .sym-timeline__body { grid-area: body; display: flex; flex-direction: column; gap: var(--sym-space-xs); padding-block: var(--sym-space-2xs) var(--sym-space-l); min-width: 0; }
  .sym-timeline__title, .sym-timeline__text { margin: 0; }
  .sym-timeline__text { max-width: 52ch; }
  /* vertical rule runs from the marker to the next item; the last one ends at its marker */
  .sym-timeline__rail::before { content: ''; position: absolute; inset-block: .75rem 0; inset-inline-start: calc(.4rem - var(--sym-rule-width) / 2); border-inline-start: var(--sym-rule-width) solid var(--sym-rule); }
  .sym-timeline__item:last-child .sym-timeline__rail::before { display: none; }
  /* the marker is the diamond of the brand mark; it also has a border so it survives forced colours */
  .sym-timeline__marker { position: absolute; inset-block-start: .3rem; inset-inline-start: 0; width: .8rem; height: .8rem; background: var(--sym-fg); border: var(--sym-rule-width) solid var(--sym-bg); rotate: 45deg; }
  @container sym-timeline (min-width: 640px) {
    .sym-timeline__item { --_date: 9rem; grid-template-columns: var(--_date) var(--_rail) minmax(0, 1fr); grid-template-areas: 'date rail body'; column-gap: var(--sym-space-m); }
    .sym-timeline__date { padding-block-start: var(--sym-space-xs); text-align: end; }
  }
  @media (forced-colors: active) { .sym-timeline__marker { background: CanvasText; } .sym-timeline__rail::before { border-color: CanvasText; } }
}
</style>
