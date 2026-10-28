<script setup lang="ts">
import { socials } from '~/data/social'
definePageMeta({ pageTransition: { name: 'fade', mode: 'out-in' } })
useSeoMeta({
  title: 'Культура в русі',
  ogTitle: 'ГО «Символ» — культура в русі',
  ogDescription: 'Незалежна українська організація: сучасне мистецтво, культура й уважне ставлення до психічного здоров’я.'
})

const openCalls = activeOpportunities()
const upcoming = eventItems.filter(isUpcoming).reverse().slice(0, 4)
const recent = eventItems.filter(item => !isUpcoming(item)).slice(0, 3)
const current = projects.filter(project => project.status !== 'completed')
const supporters = organizations.filter(org => projects.some(project => project.partners?.includes(org.slug) || project.donors?.includes(org.slug)))
</script>

<template>
  <div>
    <section class="home-hero container">
      <div class="home-hero__text">
        <div class="eyebrow">Харків · мистецтво · психічне здоров’я</div>
        <h1>Створюємо простір для уважності й сучасної культури</h1>
        <p>Незалежна українська організація. Виставки, кіно, плейбек-театр і програми психічного здоров’я — від Харкова до Закарпаття й за кордоном.</p>
        <div class="button-row">
          <NuxtLink class="button button--dark" to="/projects">Усі проєкти</NuxtLink>
          <NuxtLink class="button" to="/support">Підтримати</NuxtLink>
        </div>
      </div>
      <ProjectOrbit class="home-hero__orbit" />
    </section>

    <section v-if="openCalls.length" class="open-calls">
      <div class="container">
        <span class="label">Актуальні можливості</span>
        <div class="open-calls__list">
          <a v-for="call in openCalls" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
            <strong>{{ call.title }}</strong>
            <span>Дедлайн: {{ formatDate(call.deadline) }}</span>
            <span class="open-call__cta">Подати заявку ↗</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div><span class="label">Події</span><h2>{{ upcoming.length ? 'Найближчі події' : 'Нещодавні події' }}</h2></div>
        <p>
          <template v-if="!upcoming.length">Нові анонси готуються. </template>
          <NuxtLink class="text-link" to="/events">Календар подій →</NuxtLink>
        </p>
      </div>
      <div class="event-list">
        <EventRow v-for="item in (upcoming.length ? upcoming : recent)" :key="item.slug" :item="item" />
      </div>
    </section>

    <section class="section section--tight container">
      <div class="section-heading">
        <div><span class="label">Зараз</span><h2>Актуальні проєкти</h2></div>
        <p>Від міської пам’яті Харкова до плейбек-театру на Закарпатті. <NuxtLink class="text-link" to="/projects">Усі проєкти →</NuxtLink></p>
      </div>
      <div class="project-grid">
        <ProjectCard v-for="project in current" :key="project.slug" :project="project" />
      </div>
    </section>

    <SupportBand />

    <section v-if="supporters.length" class="section section--tight container">
      <span class="label">Партнери й донори проєктів</span>
      <ul class="logo-strip">
        <li v-for="org in supporters" :key="org.slug">{{ org.name }}</li>
      </ul>
    </section>

    <section class="subscribe">
      <div class="container subscribe__grid">
        <h2>Стежте за «Символом»</h2>
        <div class="subscribe__links">
          <a href="/events.ics">Підписатися на календар подій</a>
          <a v-for="item in socials" :key="item.label" :href="item.url" target="_blank" rel="noreferrer">{{ item.label }} ↗</a>
          <p>Розсилка запуститься згодом.</p>
        </div>
      </div>
    </section>
  </div>
</template>
