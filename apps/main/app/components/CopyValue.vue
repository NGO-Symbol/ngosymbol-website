<script setup lang="ts">
// A value people often need to paste somewhere (ЄДРПОУ, name, e-mail) with a small copy button next to it.
// Works on phones too: falls back to a hidden textarea where the Clipboard API is unavailable.
const props = defineProps<{ value: string; en?: boolean }>()
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value)
  } catch {
    const area = document.createElement('textarea')
    area.value = props.value
    area.setAttribute('readonly', '')
    area.style.position = 'absolute'
    area.style.left = '-9999px'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <span class="copy-value">
    <span class="selectable"><slot>{{ value }}</slot></span>
    <button type="button" class="copy-value__button" :class="{ 'is-copied': copied }" :aria-label="(en ? 'Copy ' : 'Скопіювати ') + value" @click="copy">
      <svg v-if="!copied" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
      <span>{{ copied ? (en ? 'Copied' : 'Скопійовано') : (en ? 'Copy' : 'Скопіювати') }}</span>
    </button>
  </span>
</template>

<style scoped>
.copy-value { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; }
.copy-value__button { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 4px 10px; border: 1px solid currentColor; border-radius: 999px; background: transparent; color: inherit; font: inherit; font-size: .78rem; line-height: 1; opacity: .7; cursor: pointer; transition: opacity .2s ease, background .2s ease; }
.copy-value__button:hover, .copy-value__button:focus-visible { opacity: 1; }
.copy-value__button.is-copied { opacity: 1; }
.copy-value__button svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
</style>
