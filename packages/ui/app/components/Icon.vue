<script setup lang="ts">
/**
 * The only icon source: hand-drawn 24 px stroke icons (1.5 px, round caps) that inherit the text colour. No icon font, no
 * network request. A missing icon is added here (and to the registry), never inlined in a page. Decorative by default
 * (aria-hidden); pass `label` when the icon alone carries meaning.
 */
const props = withDefaults(defineProps<{
  /** Icon name. */
  name: 'arrow-right' | 'arrow-left' | 'arrow-up-right' | 'arrow-down' | 'menu' | 'close' | 'plus' | 'minus' | 'chevron-down' | 'chevron-right'
    | 'check' | 'mail' | 'phone' | 'map-pin' | 'calendar' | 'download' | 'link' | 'globe' | 'play' | 'instagram' | 'facebook' | 'telegram' | 'youtube'
  /** Size in px (default follows the surrounding text: 1.25em). */
  size?: number
  /** Accessible name when the icon is the only content; otherwise leave empty. */
  label?: string
}>(), {})

const paths: Record<string, string> = {
  'arrow-right': 'M4 12h15M13 6l6 6-6 6',
  'arrow-left': 'M20 12H5M11 6l-6 6 6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'arrow-down': 'M12 4v15M6 13l6 6 6-6',
  menu: 'M4 8h16M4 16h11',
  close: 'M6 6l12 12M18 6 6 18',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  'chevron-down': 'm6 9 6 6 6-6',
  'chevron-right': 'm9 6 6 6-6 6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  phone: 'M7 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 5 6a2 2 0 0 1 2-2z',
  'map-pin': 'M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10zM12 8.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z',
  play: 'M8 5v14l11-7z',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.2 6.8h.01',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z',
  telegram: 'm21 4-3 16-6-4-3 3v-5L21 4zM9 14l12-10',
  youtube: 'M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10 9v6l5-3z',
}
const d = computed(() => paths[props.name] ?? '')
</script>

<template>
  <svg class="sym-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
    :style="size ? { '--_s': `${size}px` } : undefined" :role="label ? 'img' : undefined" :aria-label="label || undefined" :aria-hidden="label ? undefined : 'true'" focusable="false">
    <path :d="d" />
  </svg>
</template>

<style>
@layer sym-components {
  .sym-icon { --_s: 1.25em; width: var(--_s); height: var(--_s); flex: none; }
}
</style>
