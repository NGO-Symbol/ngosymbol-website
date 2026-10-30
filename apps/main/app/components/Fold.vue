<script setup lang="ts">
// A section that can be folded: a native <details> whose title is the section heading. The content stays in the
// page (for search engines too); only its visibility changes. `open` is how it starts on wide screens; on phones
// every fold starts closed so a long page stays short. The biography is never folded.
const props = withDefaults(defineProps<{ title: string; open?: boolean; level?: 'h2' | 'h3'; headingClass?: string }>(), { open: true, level: 'h2', headingClass: 'section-title' })
const isOpen = ref(props.open)
onMounted(() => { if (matchMedia('(max-width: 820px)').matches) isOpen.value = false })
</script>

<template>
  <details class="fold" :open="isOpen" @toggle="isOpen = ($event.target as HTMLDetailsElement).open">
    <summary class="fold__summary">
      <component :is="level" :class="headingClass">{{ title }}</component>
      <span class="fold__mark" aria-hidden="true" />
    </summary>
    <div class="fold__body"><slot /></div>
  </details>
</template>

<style scoped>
.fold__summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; cursor: pointer; list-style: none; }
.fold__summary::-webkit-details-marker { display: none; }
.fold__summary > :first-child { margin-bottom: 0; }
.fold__mark { flex: none; width: 28px; height: 28px; border: 1px solid currentColor; border-radius: 50%; position: relative; opacity: .7; transition: transform .35s cubic-bezier(.4, 0, .2, 1), opacity .2s ease; }
.fold__mark::before, .fold__mark::after { content: ''; position: absolute; left: 50%; top: 50%; width: 10px; height: 1.5px; margin: -.75px 0 0 -5px; background: currentColor; }
.fold__mark::after { transform: rotate(90deg); transition: transform .35s cubic-bezier(.4, 0, .2, 1); }
.fold[open] .fold__mark::after { transform: rotate(0deg); }
.fold__summary:hover .fold__mark { opacity: 1; }
.fold__body { padding-top: 18px; }
.fold[open] .fold__body { animation: fold-in .35s cubic-bezier(.2, .9, .3, 1); }
@keyframes fold-in { from { opacity: 0; transform: translateY(-6px); } }
@media (prefers-reduced-motion: reduce) { .fold__mark, .fold__mark::after { transition: none; } .fold[open] .fold__body { animation: none; } }
</style>
