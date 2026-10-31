<script setup lang="ts">
import type { Segment } from '~/utils/content'
import { projectsEn } from '~/data/projects-en'
import { eventsEn } from '~/data/events-en'
import { psdPeopleEn } from '~/data/psd-artists-en'
import { peopleEn } from '~/data/people-en'

const props = defineProps<{ paragraphs?: string[] }>()
const { isEn, localePath } = useLang()

function localizeSegment(segment: Segment): Segment {
  if (!('to' in segment)) return segment
  const match = segment.to.match(/^\/(projects|events|people)\/([^/]+)$/)
  if (!match) return { ...segment, to: localePath(segment.to) }
  const [, type, slug] = match
  let text = segment.text
  if (isEn.value && type === 'projects') text = `«${projectsEn[slug!]?.title ?? text.replace(/[«»]/g, '')}»`
  if (isEn.value && type === 'events') text = eventsEn[slug!]?.title ?? text
  if (isEn.value && type === 'people') text = psdPeopleEn[slug!]?.name ?? peopleEn[slug!]?.name ?? text
  return { ...segment, text, to: localePath(segment.to) }
}

const parsed = computed(() => (props.paragraphs ?? []).map(paragraph => parseRichText(paragraph).map(localizeSegment)))
</script>

<template>
  <div class="rich-text">
    <p v-for="(segments, index) in parsed" :key="index">
      <template v-for="(segment, i) in segments" :key="i">
        <NuxtLink v-if="'to' in segment" :to="segment.to" :class="{ 'key-phrase': segment.key }">{{ segment.text }}</NuxtLink>
        <a v-else-if="'href' in segment" :href="segment.href" target="_blank" rel="noreferrer" class="rich-text__source">{{ segment.text }}</a>
        <strong v-else-if="segment.key" class="key-phrase">{{ segment.text }}</strong>
        <template v-else>{{ segment.text }}</template>
      </template>
    </p>
  </div>
</template>
