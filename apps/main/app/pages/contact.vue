<script setup lang="ts">
import { socials } from '~/data/social'
definePageMeta({ pageTransition: { name: 'fade', mode: 'out-in' } })
useSeoMeta({ title: 'Контакти' })
</script>

<template>
  <section class="contact-page">
    <div class="container">
      <span class="eyebrow">Партнерство · підтримка · спільні ідеї</span>
      <h1>Поговорімо про майбутній проєкт</h1>
      <div class="contact-links">
        <span class="selectable">ngo.symbol@gmail.com</span>
        <a v-for="item in socials" :key="item.label" :href="item.url" target="_blank" rel="noreferrer">{{ item.label }} ↗</a>
      </div>
      <p>Корпоративна пошта з’явиться після налаштування Google Workspace для неприбуткових організацій.</p>
    </div>
  </section>
</template>
