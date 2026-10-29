<script setup lang="ts">
import type { Project } from '~/data/types'
import { projectsEn } from '~/data/projects-en'

const props = defineProps<{ project: Project }>()
const cover = computed(() => props.project.poster ?? props.project.gallery?.[0]?.src)
const { isEn } = useLang()
const text = computed(() => (isEn.value && projectsEn[props.project.slug]) || props.project)
</script>

<template>
  <NuxtLink class="project-card" :class="`tone-${project.tone}`" :to="`/projects/${project.slug}`">
    <div class="project-card__meta">
      <span>{{ projectByline(project) }}</span>
      <span>{{ statusLabels[project.status] }}</span>
    </div>
    <div class="project-card__visual" :class="{ 'has-cover': cover }">
      <img v-if="cover" class="project-card__cover" :src="cover" alt="" loading="lazy">
      <img v-if="project.programLogo" class="project-card__program" :src="project.programLogo.src" :alt="project.programLogo.name" loading="lazy">
      <ProjectMotif v-else class="project-card__motif" :motif="project.motif" />
      <span v-if="project.role === 'partner'" class="project-card__badge">{{ isEn ? 'Symbol is a partner' : 'Символ — партнер' }}</span>
      <span v-if="project.subsiteUrl" class="project-card__badge project-card__badge--site">{{ isEn ? 'Project website ↗' : 'Є сайт проєкту ↗' }}</span>
    </div>
    <div class="project-card__body">
      <p>{{ project.formats.map(format => formats[format]).join(' · ') }}</p>
      <h2>{{ text.title }}</h2>
      <span>{{ text.summary }}</span>
    </div>
  </NuxtLink>
</template>
