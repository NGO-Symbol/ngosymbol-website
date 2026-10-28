<script setup lang="ts">
/**
 * A single-choice filter: a row of chips bound with v-model. On phones it is one line that scrolls sideways with a fading edge (no tall
 * wrapped block); on wide containers it wraps. Announced as a radio group: Tab enters on the chosen chip, arrows move the choice,
 * Enter / Space choose. The result list below it must be a live region or announce its count.
 */
const props = withDefaults(defineProps<{
  /** Choices in order. */
  options: { value: string; label: string }[]
  /** Accessible name of the group, e.g. «Фільтр проєктів за напрямом». */
  label: string
  /** Text of an extra first option that clears the filter (value ""), e.g. «Усі». Omit for no such option. */
  all?: string
}>(), {})
/** The chosen value; "" means «all». */
const model = defineModel<string>({ default: '' })

const row = ref<HTMLElement | null>(null)
useScrollEdges(row)
const items = computed(() => (props.all ? [{ value: '', label: props.all }, ...props.options] : props.options))
// roving tabindex: only the chosen chip (or the first, if nothing matches) is in the tab order
const tabbable = computed(() => (items.value.some(o => o.value === model.value) ? model.value : items.value[0]?.value))

function choose(value: string) { model.value = value }
function onKey(e: KeyboardEvent) {
  const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
  const list = items.value
  if (!list.length || !(e.key in keys || e.key === 'Home' || e.key === 'End')) return
  e.preventDefault()
  const current = Math.max(0, list.findIndex(o => o.value === tabbable.value))
  const next = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (current + keys[e.key]! + list.length) % list.length
  choose(list[next]!.value)
  nextTick(() => row.value?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus())
}
</script>

<template>
  <div class="sym-filter-bar">
    <div ref="row" class="sym-filter-bar__row" role="radiogroup" :aria-label="label" @keydown="onKey">
      <SymChip
        v-for="o in items" :key="o.value" role="radio" :aria-checked="String(o.value === model)" :selected="o.value === model"
        :tabindex="o.value === tabbable ? 0 : -1" @click="choose(o.value)"
      >{{ o.label }}</SymChip>
    </div>
  </div>
</template>

<style>
@layer sym-components {
  .sym-filter-bar { container: sym-filter-bar / inline-size; width: 100%; min-width: 0; }
  /* phone: one scrolling line. Same mechanics as .sym-hscroll, but the padding leaves room for the 3 px focus ring + offset, and a container query can switch it to wrapping
     (the .sym-hscroll utility sits in a later layer and could not be overridden). The fade comes from the global [data-more-*] masks set by useScrollEdges. */
  .sym-filter-bar__row {
    display: flex; flex-wrap: nowrap; gap: var(--sym-gap-inline); overflow-x: auto; overflow-y: hidden; overscroll-behavior-x: contain; scrollbar-width: none;
    padding: var(--sym-space-xs); margin: calc(-1 * var(--sym-space-xs));
  }
  .sym-filter-bar__row::-webkit-scrollbar { display: none; }
  .sym-filter-bar__row > * { flex: none; }
  @container sym-filter-bar (min-width: 760px) {
    .sym-filter-bar__row { flex-wrap: wrap; overflow: visible; padding: 0; margin: 0; }
  }
}
</style>
