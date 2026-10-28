<script setup lang="ts">
import type { Project } from '~/data/types'

defineProps<{ project: Project }>()
</script>

<template>
  <NuxtLink class="project-card" :class="`tone-${project.tone}`" :to="`/projects/${project.slug}`">
    <div class="project-card__meta">
      <span>{{ projectByline(project) }}</span>
      <span>{{ statusLabels[project.status] }}</span>
    </div>
    <div class="project-card__visual">
      <span class="orbit" />
      <span v-if="project.role === 'partner'" class="project-card__badge">Символ — партнер</span>
      <span v-if="project.subsiteUrl" class="project-card__badge project-card__badge--site">Є сайт проєкту ↗</span>
    </div>
    <div class="project-card__body">
      <p>{{ project.formats.map(format => formats[format]).join(' · ') }}</p>
      <h2>{{ project.title }}</h2>
      <span>{{ project.summary }}</span>
    </div>
  </NuxtLink>
</template>
