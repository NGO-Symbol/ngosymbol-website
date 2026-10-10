<script setup lang="ts">
import { projects } from '~/data/projects'

useSeoMeta({ title: 'Проєкти' })

const filters = [
  { label: 'Усі', value: 'all' },
  { label: 'Тривають', value: 'ongoing' },
  { label: 'Запускаються', value: 'launching' },
  { label: 'Завершені', value: 'completed' }
] as const

const active = ref<(typeof filters)[number]['value']>('all')
const visibleProjects = computed(() => active.value === 'all' ? projects : projects.filter(project => project.status === active.value))
</script>

<template>
  <section class="page container">
    <div class="page-title"><span class="eyebrow">Архів та актуальні ініціативи</span><h1>Проєкти</h1><p>Невеликі проєкти відкриваються всередині symbol.ngo. Великі автономні ініціативи ведуть на власні піддомени.</p></div>
    <div class="filters" aria-label="Фільтр проєктів"><button v-for="filter in filters" :key="filter.value" type="button" :class="{ active: active === filter.value }" @click="active = filter.value">{{ filter.label }}</button></div>
    <div class="project-grid project-grid--archive"><ProjectCard v-for="project in visibleProjects" :key="project.href" :project="project" /></div>
  </section>
</template>
