<script setup lang="ts">
/**
 * One question and its answer: a native <details>. Use it inside SymAccordion (the group makes only one open at a time).
 * Title is a real heading inside the summary; the answer is the default slot.
 */
const props = defineProps<{
  /** Question / heading of the item. */
  title: string
  /** Open on load. */
  open?: boolean
  /** Group name: items with the same name close each other. Set automatically by SymAccordion. */
  name?: string
  /** Outline level of the title (2–5). Set automatically by SymAccordion. */
  level?: 2 | 3 | 4 | 5
}>()
defineSlots<{ default?: () => any }>()
const group = inject<{ name?: string; level: number } | null>('symAccordion', null)
const groupName = computed(() => props.name ?? group?.name)
const lvl = computed(() => props.level ?? group?.level ?? 3)
</script>

<template>
  <details class="sym-accordion-item" :name="groupName" :open="open || undefined">
    <summary class="sym-accordion-item__summary sym-state">
      <component :is="`h${lvl}`" class="sym-accordion-item__title sym-t-title">{{ title }}</component>
      <span class="sym-accordion-item__icon" aria-hidden="true"><SymIcon class="sym-accordion-item__plus" name="plus" /><SymIcon class="sym-accordion-item__minus" name="minus" /></span>
    </summary>
    <div class="sym-accordion-item__panel sym-t-body"><slot /></div>
  </details>
</template>

<style>
@layer sym-components {
  .sym-accordion-item { border-block-end: var(--sym-rule-width) solid var(--sym-rule); color: var(--sym-fg); interpolate-size: allow-keywords; }
  .sym-accordion-item__summary { display: flex; align-items: center; justify-content: space-between; gap: var(--sym-space-m); min-height: var(--sym-size-touch); padding-block: var(--sym-space-s); cursor: pointer; list-style: none; }
  .sym-accordion-item__summary::-webkit-details-marker { display: none; }
  .sym-accordion-item__summary::marker { content: ''; }
  .sym-accordion-item__title { margin: 0; min-width: 0; }
  .sym-accordion-item__icon { display: grid; place-items: center; flex: none; width: var(--sym-size-touch); height: var(--sym-size-touch); margin-inline-end: calc(-1 * var(--sym-space-xs)); }
  .sym-accordion-item__minus, .sym-accordion-item[open] .sym-accordion-item__plus { display: none; }
  .sym-accordion-item[open] .sym-accordion-item__minus { display: block; }
  .sym-accordion-item__panel { max-width: var(--sym-width-prose); padding-block: var(--sym-space-2xs) var(--sym-space-m); }
  .sym-accordion-item__panel > :first-child { margin-block-start: 0; }
  .sym-accordion-item__panel > :last-child { margin-block-end: 0; }
  @media (hover: hover) { .sym-accordion-item__summary:hover .sym-accordion-item__title { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: .2em; } }

  /* open / close: medium tier (height + opacity). Browsers without ::details-content simply switch instantly. */
  @supports selector(::details-content) {
    .sym-accordion-item { --_size-t: block-size var(--sym-t-medium-out); }
    .sym-accordion-item[open] { --_size-t: block-size var(--sym-t-medium-in); }
    .sym-accordion-item::details-content { block-size: 0; opacity: 0; overflow: clip; transition: var(--_size-t), opacity var(--sym-t-fx-medium), content-visibility var(--sym-dur-medium) allow-discrete; }
    .sym-accordion-item[open]::details-content { block-size: auto; opacity: 1; }
    /* reduced motion: no height movement, only the fade */
    :root[data-motion='reduce'] .sym-accordion-item { --_size-t: block-size 0s; }
    @media (prefers-reduced-motion: reduce) { :root:not([data-motion='full']) .sym-accordion-item { --_size-t: block-size 0s; } }
  }
}
</style>
