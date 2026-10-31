<script setup lang="ts">
import { socials } from '~/data/social'
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
useSeoMeta({ title: () => t('Контакти', 'Contact') })
</script>

<template>
  <section class="contact-page">
    <div class="container">
      <span class="eyebrow">{{ t('Партнерство · підтримка · спільні ідеї', 'Partnerships · support · shared ideas') }}</span>
      <h1>{{ t('Поговорімо про майбутній проєкт', 'Let’s talk about a future project') }}</h1>
      <div class="contact-links">
        <CopyValue value="ngo.symbol@gmail.com" :en="isEn" />
        <SocialLink v-for="item in socials" :key="item.url" :url="item.url" />
      </div>
      <p>{{ t('Корпоративна пошта з’явиться після налаштування Google Workspace для неприбуткових організацій.', 'An organisation email address will be added after Google Workspace for Nonprofits is configured.') }}</p>
    </div>
  </section>
</template>
