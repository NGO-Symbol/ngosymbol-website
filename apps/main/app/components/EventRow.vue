<script setup lang="ts">
import type { EventItem } from '~/utils/content'
import { eventsEn } from '~/data/events-en'
import { projectsEn } from '~/data/projects-en'

const props = defineProps<{ item: EventItem }>()
const { isEn, localePath } = useLang()
const title = computed(() => isEn.value ? (props.item.isProject ? projectsEn[props.item.slug]?.title : eventsEn[props.item.slug]?.title) ?? props.item.title : props.item.title)
const projectTitle = computed(() => isEn.value ? projectsEn[props.item.project.slug]?.title ?? props.item.project.title : props.item.project.title)
const place = computed(() => venueLineIn(props.item.venue, isEn.value))
</script>

<template>
  <NuxtLink class="event-row" :to="localePath(item.to)">
    <time class="event-row__date" :datetime="item.start">{{ isEn ? formatRangeEn(item.start, item.end) : formatRange(item.start, item.end) }}</time>
    <span class="event-row__title">{{ title }}</span>
    <span class="event-row__meta">
      <span class="event-row__format">{{ translate(formats[item.format]!, isEn) }}</span>
      <span class="event-row__place">{{ place }}</span>
      <span v-if="!item.isProject" class="event-row__project">{{ isEn ? 'Project' : 'Проєкт' }} «{{ projectTitle }}»</span>
    </span>
  </NuxtLink>
</template>
