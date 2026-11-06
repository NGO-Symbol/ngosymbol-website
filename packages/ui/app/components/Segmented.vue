<script setup lang="ts" generic="T extends string">
import { computed } from 'vue'
import { NuxtLink } from '#components'

/**
 * A pill of 2+ equal options with a thumb that glides to the chosen one: language, list / calendar, tabs. With two options a tap anywhere
 * on the control goes to the other one, so nobody has to aim. Renders one link when `to` is set (the target is the other option, e.g. the
 * language switch), otherwise a group of buttons bound with v-model, or a tablist with `tabs`. Not for filters that combine (SymChip).
 */
const props = withDefaults(defineProps<{
  /** The options, each with a value, a label and an optional id (a tab's id for aria-labelledby). */
  options: { value: T; label: string; id?: string }[]
  /** The chosen value. */
  modelValue: T
  /** Accessible name: of the group, or of the link when `to` is set. */
  label: string
  /** Control height: s 36 px (header), m 44 px (toolbars, beside buttons), l 52 px (the choice a section is about). */
  size?: 's' | 'm' | 'l'
  /** Announce as tabs (role tablist / tab). The panel still sets its own role and aria-labelledby. */
  tabs?: boolean
  /** Makes the whole control one link to this target. Two options only. */
  to?: string | object
}>(), { size: 'm' })

const emit = defineEmits<{ 'update:modelValue': [value: T] }>()

const activeIndex = computed(() => Math.max(props.options.findIndex(option => option.value === props.modelValue), 0))
const rootAttrs = computed(() => (props.to ? { to: props.to, 'aria-label': props.label } : { role: props.tabs ? 'tablist' : 'group', 'aria-label': props.label }))
const isActive = (value: T) => value === props.modelValue

function pick(value: T) {
  if (!isActive(value)) emit('update:modelValue', value)
  else if (props.options.length === 2) toggle()
}
function toggle() {
  const other = props.options.find(option => !isActive(option.value))
  if (other) emit('update:modelValue', other.value)
}
// the thin ring around the options belongs to the control too
function onRootClick(event: MouseEvent) {
  if (!props.to && props.options.length === 2 && event.target === event.currentTarget) toggle()
}
</script>

<template>
  <component :is="to ? NuxtLink : 'div'" v-bind="rootAttrs" class="sym-segmented" :data-size="size" :style="{ '--_n': options.length, '--_i': activeIndex }" @click="onRootClick">
    <span class="sym-segmented__thumb" aria-hidden="true" />
    <template v-for="option in options" :key="option.value">
      <span v-if="to" class="sym-segmented__option" :data-active="isActive(option.value) || undefined" aria-hidden="true">{{ option.label }}</span>
      <button
        v-else
        :id="option.id"
        type="button"
        class="sym-segmented__option"
        :data-active="isActive(option.value) || undefined"
        :role="tabs ? 'tab' : undefined"
        :aria-selected="tabs ? isActive(option.value) : undefined"
        :aria-pressed="tabs ? undefined : isActive(option.value)"
        @click="pick(option.value)"
      >{{ option.label }}</button>
    </template>
  </component>
</template>

<style>
@layer sym-components {
  .sym-segmented {
    --_pad: 3px; --_h: var(--sym-control-m); --_px: 16px; --_fs: var(--sym-text-body-sm);
    position: relative; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; align-items: stretch; box-sizing: border-box; max-width: 100%;
    min-height: var(--_h); padding: var(--_pad); border: var(--sym-rule-width) solid var(--sym-fg); border-radius: var(--sym-shape-chip);
    color: var(--sym-fg); font-size: var(--_fs); line-height: 1.2; text-decoration: none; cursor: pointer; -webkit-tap-highlight-color: transparent;
  }
  .sym-segmented[data-size='s'] { --_h: var(--sym-control-s); --_px: 9px; --_fs: var(--sym-text-caption); }
  .sym-segmented[data-size='l'] { --_h: var(--sym-control-l); --_px: 22px; --_fs: var(--sym-text-body); }
  /* the small size keeps a full touch target past its edges */
  .sym-segmented[data-size='s']::after { content: ''; position: absolute; inset: calc((var(--sym-control-s) - var(--sym-size-touch)) / 2) 0; }
  .sym-segmented__thumb {
    position: absolute; top: var(--_pad); bottom: var(--_pad); left: var(--_pad); width: calc((100% - 2 * var(--_pad)) / var(--_n));
    border-radius: var(--sym-shape-chip); background: var(--sym-fg); translate: calc(var(--_i) * 100%) 0; transition: translate var(--sym-t-medium);
  }
  .sym-segmented__option {
    position: relative; z-index: 1; display: grid; place-items: center; min-width: 0; margin: 0; padding: .25em var(--_px); border: 0; border-radius: var(--sym-shape-chip);
    background: transparent; color: var(--sym-fg); font: inherit; text-align: center; cursor: pointer; transition: color var(--sym-t-fx-small);
  }
  .sym-segmented__option[data-active] { color: var(--sym-bg); }
  .sym-segmented:focus-visible, button.sym-segmented__option:focus-visible { outline: 2px solid var(--sym-fg); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { .sym-segmented__thumb, .sym-segmented__option { transition: none; } }
  @media (forced-colors: active) {
    .sym-segmented { border-color: ButtonText; }
    .sym-segmented__thumb { forced-color-adjust: none; background: Highlight; }
    .sym-segmented__option[data-active] { forced-color-adjust: none; color: HighlightText; }
  }
}
</style>
