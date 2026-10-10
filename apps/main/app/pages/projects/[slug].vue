<script setup lang="ts">
import { projects } from '~/data/projects'

const route = useRoute()
const project = projects.find(item => item.slug === route.params.slug && !item.external)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Проєкт не знайдено' })
}

useSeoMeta({ title: project.title, description: project.summary })
</script>

<template>
  <article v-if="project" class="project-page">
    <header class="project-hero" :class="`tone-${project.tone}`"><div class="container"><div class="project-kicker"><span>{{ project.period }}</span><span>{{ project.statusLabel }}</span><span>{{ project.geography }}</span></div><h1>{{ project.title }}</h1><p>{{ project.summary }}</p></div></header>
    <div class="container project-content"><aside><span class="label">Напрям</span><p>{{ project.direction }}</p><NuxtLink to="/projects">← До всіх проєктів</NuxtLink></aside><div><section><span class="label">Про проєкт</span><h2>Сторінка готується до наповнення</h2><p>Це стартова структура невеликого проєкту. Перед публікацією сюди будуть додані підтверджений опис, команда, партнери, результати та медіа.</p></section><section class="content-placeholder"><span>Фото, відео або документальні матеріали проєкту</span></section></div></div>
  </article>
</template>
