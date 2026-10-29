<script setup lang="ts">
import type { EventItem } from '~/utils/content'

defineProps<{ item: EventItem }>()
</script>

<template>
  <NuxtLink class="event-row" :to="item.to">
    <time class="event-row__date" :datetime="item.start">{{ formatRange(item.start, item.end) }}</time>
    <span class="event-row__title">{{ item.title }}</span>
    <span class="event-row__meta">
      <span>{{ formats[item.format] }}</span>
      <span>{{ venueLine(item.venue) }}</span>
      <span v-if="!item.isProject">Проєкт «{{ item.project.title }}»</span>
    </span>
  </NuxtLink>
</template>
