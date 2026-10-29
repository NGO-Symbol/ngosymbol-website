<script setup lang="ts">
const props = defineProps<{ paragraphs?: string[] }>()
const parsed = computed(() => (props.paragraphs ?? []).map(parseRichText))
</script>

<template>
  <div class="rich-text">
    <p v-for="(segments, index) in parsed" :key="index">
      <template v-for="(segment, i) in segments" :key="i">
        <NuxtLink v-if="'to' in segment" :to="segment.to" :class="{ 'key-phrase': segment.key }">{{ segment.text }}</NuxtLink>
        <strong v-else-if="segment.key" class="key-phrase">{{ segment.text }}</strong>
        <template v-else>{{ segment.text }}</template>
      </template>
    </p>
  </div>
</template>
