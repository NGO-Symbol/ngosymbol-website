<script setup lang="ts">
// An event as a card, like a person on the People page: picture, date, short title, format and place, project.
import type { EventItem } from '~/utils/content'

defineProps<{ item: EventItem }>()
</script>

<template>
  <NuxtLink class="event-card" :to="item.to">
    <span class="event-card__media">
      <MediaImg v-if="item.cover" :src="item.cover" :alt="item.title" loading="lazy" />
    </span>
    <time class="event-card__date" :datetime="item.start">{{ formatRange(item.start, item.end) }}</time>
    <span class="event-card__title">{{ item.title }}</span>
    <span class="event-card__meta">{{ formats[item.format] }} · {{ item.venue.city }}</span>
    <span v-if="!item.isProject" class="event-card__project">{{ item.project.title }}</span>
  </NuxtLink>
</template>

<style scoped>
.event-card { height: 100%; display: grid; align-content: start; gap: 6px; padding: 10px 10px 16px; border: 1px solid var(--symbol-plum); text-decoration: none; transition: background .2s ease; }
.event-card:hover { background: var(--symbol-white); }
.event-card__media { display: block; aspect-ratio: 3 / 2; margin-bottom: 6px; overflow: hidden; background: var(--symbol-lilac); }
.event-card__media img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2, .8, .2, 1); }
.event-card:hover .event-card__media img { transform: scale(1.04); }
.event-card__date { font-size: .7rem; text-transform: uppercase; letter-spacing: .12em; color: var(--symbol-violet); }
.event-card__title { font-family: var(--font-display); font-size: 1.2rem; line-height: 1.15; }
.event-card__meta, .event-card__project { font-size: .8rem; line-height: 1.4; color: color-mix(in srgb, var(--symbol-plum) 75%, transparent); }
.event-card__project { font-style: italic; }
</style>
