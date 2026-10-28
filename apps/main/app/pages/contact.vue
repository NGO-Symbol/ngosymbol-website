<script setup lang="ts">
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
        <a href="https://www.instagram.com/symbol.ngo/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href="https://t.me/symbolngo" target="_blank" rel="noreferrer">Telegram ↗</a>
      </div>
      <p>Корпоративна пошта з’явиться після налаштування Google Workspace для неприбуткових організацій.</p>
    </div>
  </section>
</template>
