<script setup lang="ts">
// Project filter in the site's own look (the native <select> menu is drawn by the operating system).
// A pill button opens a list; arrows move, Enter picks, Escape closes, a click outside closes.
const props = defineProps<{ modelValue: string; options: { value: string; label: string }[]; label: string; allLabel: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const active = ref(0)
const root = ref<HTMLElement>()
const items = computed(() => [{ value: '', label: props.allLabel }, ...props.options])
const current = computed(() => items.value.find(item => item.value === props.modelValue) ?? items.value[0]!)

function toggle() {
  open.value = !open.value
  active.value = Math.max(0, items.value.findIndex(item => item.value === props.modelValue))
}
function choose(value: string) {
  emit('update:modelValue', value)
  open.value = false
}
function onKey(event: KeyboardEvent) {
  if (!open.value && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) { toggle(); event.preventDefault(); return }
  if (!open.value) return
  if (event.key === 'ArrowDown') { active.value = (active.value + 1) % items.value.length; event.preventDefault() }
  if (event.key === 'ArrowUp') { active.value = (active.value - 1 + items.value.length) % items.value.length; event.preventDefault() }
  if (event.key === 'Enter' || event.key === ' ') { choose(items.value[active.value]!.value); event.preventDefault() }
  if (event.key === 'Escape') open.value = false
}
function onOutside(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onOutside))
onBeforeUnmount(() => document.removeEventListener('click', onOutside))
</script>

<template>
  <div ref="root" class="picker" :class="{ 'is-open': open }">
    <span class="label">{{ label }}</span>
    <button type="button" class="picker__button" aria-haspopup="listbox" :aria-expanded="open" @click="toggle" @keydown="onKey">
      <span>{{ current.label }}</span>
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
    </button>
    <Transition name="picker">
      <ul v-if="open" class="picker__list" role="listbox" :aria-label="label">
        <li
          v-for="(item, index) in items"
          :key="item.value"
          role="option"
          :aria-selected="item.value === modelValue"
          :class="{ 'is-active': index === active, 'is-selected': item.value === modelValue }"
          :style="{ '--i': index }"
          @mouseenter="active = index"
          @click="choose(item.value)"
        >{{ item.label }}</li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.picker { position: relative; display: grid; gap: 6px; }
.picker__button { display: inline-flex; align-items: center; justify-content: space-between; gap: 14px; min-width: 240px; padding: 9px 16px; border: 1px solid var(--symbol-plum); border-radius: 999px; background: transparent; color: var(--symbol-plum); font: inherit; cursor: pointer; transition: background .25s ease, color .25s ease; }
.picker__button:hover, .is-open .picker__button { background: var(--symbol-plum); color: var(--symbol-cream); }
.picker__button svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s cubic-bezier(.3, 1.4, .5, 1); }
.is-open .picker__button svg { transform: rotate(180deg); }
.picker__list { position: absolute; z-index: 20; top: calc(100% + 8px); left: 0; min-width: 100%; max-height: 60vh; overflow-y: auto; margin: 0; padding: 6px; list-style: none; background: var(--symbol-cream); color: var(--symbol-plum); border: 1px solid var(--symbol-plum); box-shadow: 8px 8px 0 var(--symbol-violet); }
.picker__list li { padding: 9px 12px; cursor: pointer; white-space: nowrap; border-radius: 4px; animation: picker-row .3s cubic-bezier(.2, 1, .3, 1) both; animation-delay: calc(var(--i) * 25ms); }
.picker__list li.is-active { background: var(--symbol-lilac); }
.picker__list li.is-selected { font-weight: 600; }
.picker__list li.is-selected::before { content: '✓ '; color: var(--symbol-violet); }
.picker-enter-active, .picker-leave-active { transition: opacity .2s ease, transform .25s cubic-bezier(.2, 1.2, .3, 1); }
.picker-enter-from, .picker-leave-to { opacity: 0; transform: translateY(-6px); }
@keyframes picker-row { from { opacity: 0; transform: translateY(4px); } }
@media (prefers-reduced-motion: reduce) { .picker__list li { animation: none; } }
</style>
