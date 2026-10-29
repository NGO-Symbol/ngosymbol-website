<script setup lang="ts">
// Minimal line icons of social networks, drawn in one stroke style (24-unit grid, currentColor) so they sit with the text.
import type { Network } from '~/utils/social'

defineProps<{ network: Network }>()
</script>

<template>
  <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
    <template v-if="network === 'instagram'"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle class="dot" cx="17.2" cy="6.8" r=".9" /></template>
    <template v-else-if="network === 'telegram'"><path d="M20.5 4.5 3.5 11l5.5 2 2 6 3-4 4.5 3.5z" /><path d="m9 13 8-6" /></template>
    <template v-else-if="network === 'facebook'"><circle cx="12" cy="12" r="8.5" /><path d="M13.5 20.5V11a2 2 0 0 1 2-2H17M10.5 13.5h6" /></template>
    <template v-else-if="network === 'whatsapp'"><path d="M4 20l1.3-4A8.5 8.5 0 1 1 8.2 19z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1-.4-2-1.4-2.4-2.4l1-1-1-2z" /></template>
    <template v-else-if="network === 'linkedin'"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.8 2.2 2.6V16" /></template>
    <template v-else-if="network === 'youtube'"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 4 2.5-4 2.5z" /></template>
    <template v-else-if="network === 'tiktok'"><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.5 2.5 2.2 4 4.5 4" /></template>
    <template v-else-if="network === 'x'"><path d="m4.5 4.5 15 15M19.5 4.5l-15 15" /></template>
    <template v-else-if="network === 'behance'"><path d="M3.5 7h4.5a2.5 2.5 0 0 1 0 5H3.5zM3.5 12h5a2.5 2.5 0 0 1 0 5h-5zM14 13.5h6.5a3.2 3.2 0 1 0-1 2.6M15 8h4.5" /></template>
    <template v-else-if="network === 'vimeo'"><path d="M3.5 9c2-1.8 3.3-3 4.2-1.2.8 1.8 1.4 6.7 2.6 6.7 1.3 0 5.4-5.4 3.8-6.6-1-.7-2.2.4-2.6 1 1-4.7 8.5-5 7.6-.3-.8 4.6-6.4 11-8.5 10-2-1-2.6-9-4.4-9" /></template>
    <template v-else-if="network === 'email'"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 6.5 8 6.5 8-6.5" /></template>
    <template v-else><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17" /></template>
  </svg>
</template>

<style scoped>
.social-icon { width: 1.05em; height: 1.05em; flex: none; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.social-icon .dot { fill: currentColor; stroke: none; }
</style>
