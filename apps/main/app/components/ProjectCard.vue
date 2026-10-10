<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <NuxtLink class="project-card" :class="`tone-${project.tone}`" :to="project.href" :external="project.external">
    <div class="project-card__meta"><span>{{ project.period }}</span><span>{{ project.statusLabel }}</span></div>
    <div class="project-card__visual"><span class="orbit" /><span class="project-card__type">{{ project.external ? 'Окремий сайт ↗' : 'Сторінка проєкту →' }}</span></div>
    <div class="project-card__body"><p>{{ project.direction }}</p><h2>{{ project.title }}</h2><span>{{ project.summary }}</span></div>
  </NuxtLink>
</template>
