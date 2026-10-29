<script setup lang="ts">
import { contactEmail, socials } from '~/data/social'

definePageMeta({ pageTransition: { name: 'curtain', mode: 'out-in' } })
useSeoMeta({ title: 'Для медіа', description: 'Логотип, опис, фото й контакти ГО «Символ» для журналістів і партнерів.' })

const boilerplateUk = 'ГО «Символ» — незалежна громадська організація з Харкова, заснована 2023 року. Розвиває сучасну українську культуру й мистецтво та сприяє уважному ставленню до психічного здоров’я: виставки, документальне кіно, плейбек-театр, програми психічного здоров’я.'
const boilerplateEn = 'NGO Symbol is an independent Ukrainian non-profit founded in Kharkiv in 2023. It develops contemporary Ukrainian culture and art and promotes care for mental health through exhibitions, documentary film, playback theatre, and mental health programmes.'
const withPhotos = projects.filter(project => project.gallery?.length || project.poster)

const copied = ref('')
async function copy(text: string, key: string) {
  try { await navigator.clipboard.writeText(text); copied.value = key; setTimeout(() => (copied.value = ''), 1600) } catch {}
}
</script>

<template>
  <section class="page container">
    <Breadcrumbs :items="[{ label: 'Для медіа' }]" />
    <div class="page-title">
      <span class="eyebrow">Прес-кіт</span>
      <h1>Для медіа</h1>
      <p>Логотип, короткий опис і фото для публікацій про «Символ». Якщо потрібно більше — напишіть нам.</p>
    </div>

    <div class="press-grid">
      <article class="press-asset">
        <span class="label">Логотип</span>
        <div class="press-asset__preview"><SymbolLogo /></div>
        <div class="button-row">
          <a class="button button--dark" href="/press/symbol-logo.svg" download>SVG з написом</a>
          <a class="button" href="/press/symbol-mark.png" download>PNG знак</a>
        </div>
        <p class="footer-small">Кольори: фіолетовий #9280A6, абрикосовий #FDD08F.</p>
      </article>

      <article class="press-asset">
        <span class="label">Коротко про нас · UA</span>
        <p>{{ boilerplateUk }}</p>
        <button type="button" class="text-button" @click="copy(boilerplateUk, 'uk')">{{ copied === 'uk' ? 'Скопійовано' : 'Скопіювати текст' }}</button>
      </article>

      <article class="press-asset">
        <span class="label">About · EN</span>
        <p>{{ boilerplateEn }}</p>
        <button type="button" class="text-button" @click="copy(boilerplateEn, 'en')">{{ copied === 'en' ? 'Copied' : 'Copy text' }}</button>
      </article>

      <article class="press-asset">
        <span class="label">Контакт для преси</span>
        <p class="selectable press-asset__email">{{ contactEmail }}</p>
        <p>Портфоліо організації та фото у високій роздільній здатності — за запитом.</p>
        <div class="button-row">
          <a v-for="item in socials.slice(0, 3)" :key="item.label" class="button" :href="item.url" target="_blank" rel="noreferrer">{{ item.label }} ↗</a>
        </div>
      </article>
    </div>

    <section class="section section--tight">
      <span class="label">Фото проєктів</span>
      <div class="project-grid">
        <ProjectCard v-for="project in withPhotos" :key="project.slug" :project="project" />
      </div>
      <p class="footer-small">Під час публікації вказуйте автора фото, зазначеного в підписі.</p>
    </section>

    <section class="section section--tight">
      <span class="label">Згадки в медіа</span>
      <NuxtLink class="text-link" to="/about#press">Про нас пишуть →</NuxtLink>
    </section>
  </section>
</template>
