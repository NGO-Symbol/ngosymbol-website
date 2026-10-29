<script setup lang="ts">
import { socials } from '~/data/social'
useSeoMeta({ title: 'Контакти' })
</script>

<template>
  <section class="contact-page">
    <div class="container">
      <span class="eyebrow">Партнерство · підтримка · спільні ідеї</span>
      <h1>Поговорімо про майбутній проєкт</h1>
      <div class="contact-links">
        <CopyValue value="ngo.symbol@gmail.com" />
        <SocialLink v-for="item in socials" :key="item.url" :url="item.url" />
      </div>
      <p>Корпоративна пошта з’явиться після налаштування Google Workspace для неприбуткових організацій.</p>
    </div>
  </section>
</template>
