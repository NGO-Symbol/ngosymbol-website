<script setup lang="ts">
interface AccordionItemData {
  /** Stable id; also the name of the slot `item-<id>` that holds the answer. */
  id: string
  /** Question / heading. */
  title: string
  /** Plain-text answer, used when there is no `item-<id>` slot. */
  text?: string
  /** Open on load. */
  open?: boolean
}

/**
 * A list of questions that open in place: frequently asked questions, project details. Built on native <details name="…">, so the
 * browser provides keyboard, find-in-page and «only one open» for free. Give `items` (answers as text or `#item-<id>` slots) or put
 * SymAccordionItem elements in the default slot.
 */
const props = withDefaults(defineProps<{
  /** Questions with answers. Alternative to the default slot. */
  items?: AccordionItemData[]
  /** Only one item open at a time (default true). false lets several stay open. */
  single?: boolean
  /** Outline level of the item titles (2–5). */
  level?: 2 | 3 | 4 | 5
  /** Group name shared by the <details>; generated when omitted. */
  name?: string
}>(), { single: true, level: 3 })

defineSlots<{ default?: () => any; [slot: `item-${string}`]: (() => any) | undefined }>()
const uid = useId()
const groupName = computed(() => (props.single ? (props.name ?? `sym-acc-${uid}`) : undefined))
provide('symAccordion', reactive({ name: groupName, level: toRef(props, 'level') }))
</script>

<template>
  <div class="sym-accordion">
    <slot />
    <SymAccordionItem v-for="it in items" :key="it.id" :title="it.title" :open="it.open">
      <slot :name="`item-${it.id}`"><p>{{ it.text }}</p></slot>
    </SymAccordionItem>
  </div>
</template>

<style>
@layer sym-components {
  .sym-accordion { width: 100%; min-width: 0; border-block-start: var(--sym-rule-width) solid var(--sym-rule); }
}
</style>
