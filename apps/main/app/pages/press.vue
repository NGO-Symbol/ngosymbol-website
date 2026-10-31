<script setup lang="ts">
import { contactEmail, socials } from '~/data/social'
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk

useSeoMeta({ title: () => t('Для медіа', 'Press'), description: () => t('Логотип, опис, фото й контакти ГО «Символ» для журналістів і партнерів.', 'NGO Symbol logo, boilerplate, photographs, and contacts for journalists and partners.') })

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
    <Breadcrumbs />
    <div class="page-title">
      <span class="eyebrow">{{ t('Прес-кіт', 'Press kit') }}</span>
      <h1>{{ t('Для медіа', 'Press') }}</h1>
      <p>{{ t('Логотип, короткий опис і фото для публікацій про «Символ». Якщо потрібно більше — напишіть нам.', 'Logo files, a short description, and photographs for coverage of Symbol. Contact us if you need anything else.') }}</p>
    </div>

    <div class="press-grid">
      <article class="press-asset">
        <span class="label">{{ t('Логотип', 'Logo') }}</span>
        <div class="press-asset__preview"><SymbolLogo /></div>
        <div class="button-row">
          <a class="button button--dark" href="/press-kit/symbol-logo.svg" download>{{ t('SVG з написом', 'SVG wordmark') }}</a>
          <a class="button" href="/press-kit/symbol-mark.png" download>{{ t('PNG знак', 'PNG mark') }}</a>
        </div>
        <p class="footer-small">{{ t('Кольори: фіолетовий #9280A6, абрикосовий #FDD08F.', 'Colours: violet #9280A6 and apricot #FDD08F.') }}</p>
      </article>

      <article v-if="!isEn" class="press-asset">
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
        <span class="label">{{ t('Контакт для преси', 'Press contact') }}</span>
        <p class="selectable press-asset__email">{{ contactEmail }}</p>
        <p>{{ t('Портфоліо організації та фото у високій роздільній здатності — за запитом.', 'Our organisational portfolio and high-resolution photographs are available on request.') }}</p>
        <div class="button-row">
          <SocialLink v-for="item in socials.slice(0, 3)" :key="item.url" class="button" :url="item.url" />
        </div>
      </article>
    </div>

    <section class="section section--tight">
      <span class="label">{{ t('Фото проєктів', 'Project photographs') }}</span>
      <div class="project-grid">
        <ProjectCard v-for="project in withPhotos" :key="project.slug" :project="project" />
      </div>
      <p class="footer-small">{{ t('Під час публікації вказуйте автора фото, зазначеного в підписі.', 'When publishing, please credit the photographer named in the caption.') }}</p>
    </section>

    <section class="section section--tight">
      <span class="label">{{ t('Згадки в медіа', 'Media coverage') }}</span>
      <NuxtLink class="text-link" :to="isEn ? '/en/about#press' : '/about#press'">{{ t('Про нас пишуть', 'Coverage of our work') }} →</NuxtLink>
    </section>
  </section>
</template>
