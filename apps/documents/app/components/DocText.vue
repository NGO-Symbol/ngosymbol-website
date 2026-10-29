<script setup lang="ts">
// A paragraph from the shared data with its inline references turned into links (see textParts).
const props = defineProps<{ text: string }>()
const parts = computed(() => textParts(props.text))
const { localePath } = useLang()
</script>

<template>
  <p><template v-for="(part, index) in parts" :key="index"><NuxtLink v-if="part.href && part.internal" :to="localePath(part.href)">{{ part.text }}</NuxtLink><a v-else-if="part.href" :href="part.href" target="_blank" rel="noreferrer">{{ part.text }}</a><template v-else>{{ part.text }}</template></template></p>
</template>
