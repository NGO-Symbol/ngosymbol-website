<script setup lang="ts">
// A link to a social profile (ours, an artist's, a partner's): a minimal network icon and the network's name.
// The network is read from the address, so data only stores { url } (an optional label overrides the name).
import { networkOf } from '~/utils/social'

const props = defineProps<{ url: string; label?: string }>()
const info = computed(() => networkOf(props.url))
const external = computed(() => /^https?:/.test(props.url))
</script>

<template>
  <a class="social-link" :href="url" :target="external ? '_blank' : undefined" :rel="external ? 'noreferrer' : undefined">
    <SocialIcon :network="info.network" />
    <span>{{ label ?? info.name }}</span>
  </a>
</template>

<style scoped>
.social-link { display: inline-flex; align-items: center; gap: .45em; }
</style>
