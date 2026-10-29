<script setup lang="ts">
import { socials } from '~/data/social'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <SymbolLogo class="footer-logo" label="ГО «Символ»" />
        <p>Незалежна українська організація: сучасне мистецтво, культура й уважне ставлення до психічного здоров’я.</p>
      </div>
      <div>
        <span class="label">Розділи</span>
        <NuxtLink to="/projects">Проєкти</NuxtLink>
        <NuxtLink to="/events">Події</NuxtLink>
        <NuxtLink to="/opportunities">Можливості</NuxtLink>
        <NuxtLink to="/people">Люди</NuxtLink>
        <NuxtLink to="/news">Новини</NuxtLink>
        <NuxtLink to="/press">Для медіа</NuxtLink>
        <NuxtLink to="/support">Підтримати</NuxtLink>
        <NuxtLink to="/en" lang="en">English</NuxtLink>
      </div>
      <div>
        <span class="label">Зв’язок</span>
        <span class="selectable">ngo.symbol@gmail.com</span>
        <a v-for="item in socials" :key="item.label" :href="item.url" target="_blank" rel="noreferrer">{{ item.label }} ↗</a>
        <a href="/events.ics">Підписатися на календар подій</a>
      </div>
      <div>
        <span class="label">Географія</span>
        <p>Харків · Київ · Закарпаття<br>Україна та міжнародні проєкти</p>
        <p class="footer-small">ЄДРПОУ 45221328</p>
      </div>
    </div>
  </footer>
</template>
