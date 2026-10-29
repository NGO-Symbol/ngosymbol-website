<script setup lang="ts">
// A value people often need to paste somewhere (ЄДРПОУ, name, e-mail) with a small copy button next to it.
// Works on phones too: falls back to a hidden textarea where the Clipboard API is unavailable.
// plain: a text-style button with the same thin icon as the links around it (footer), instead of the outlined pill.
// buttonOnly: just the button, when the value is already shown next to it (e.g. as a mailto link).
const props = defineProps<{ value: string; en?: boolean; plain?: boolean; buttonOnly?: boolean }>()
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
  <span class="copy-value" :class="{ 'copy-value--plain': plain }">
    <span v-if="!buttonOnly" class="selectable"><slot>{{ value }}</slot></span>
    <button type="button" class="copy-value__button" :class="{ 'is-copied': copied }" :aria-label="(en ? 'Copy ' : 'Скопіювати ') + value" @click="copy">
      <SocialIcon :network="copied ? 'check' : 'copy'" />
      <span>{{ copied ? (en ? 'Copied' : 'Скопійовано') : (en ? 'Copy' : 'Скопіювати') }}</span>
    </button>
  </span>
</template>

<style scoped>
.copy-value { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; }
.copy-value__button { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 4px 10px; border: 1px solid currentColor; border-radius: 999px; background: transparent; color: inherit; font: inherit; font-size: .78rem; line-height: 1; opacity: .7; cursor: pointer; transition: opacity .2s ease, background .2s ease; }
.copy-value__button:hover, .copy-value__button:focus-visible { opacity: 1; }
.copy-value__button.is-copied { opacity: 1; }
.copy-value--plain { display: grid; gap: 6px; justify-items: start; }
.copy-value--plain .copy-value__button { min-height: 0; padding: 0; border: 0; border-radius: 0; font-size: inherit; opacity: .75; gap: .45em; }
</style>
