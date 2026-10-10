<script setup lang="ts">
import { projects } from '~/data/projects'

useSeoMeta({
  title: 'Культура в русі',
  ogTitle: 'ГО «Символ» — культура в русі',
  ogDescription: 'Незалежна українська організація, що розвиває сучасну культуру і мистецтво.'
})
</script>

<template>
  <div>
    <section class="hero container">
      <div class="eyebrow">Культура · мистецтво · психічне здоров’я</div>
      <h1>Створюємо простір для уважності й сучасної культури</h1>
      <div class="hero-bottom"><p>Незалежна українська організація. Кожен проєкт має власний голос, а разом вони формують живу історію «Символу».</p><NuxtLink class="text-link" to="/projects">Усі проєкти ↗</NuxtLink></div>
    </section>

    <section class="featured">
      <div class="featured-orbit" aria-hidden="true"><span /></div>
      <div class="featured-card"><span class="label">Новий автономний проєкт</span><h2>Історія моєї вулиці</h2><p>Окремий простір про вулиці, міську пам’ять і досвіди Харкова.</p><a href="https://istoriia-vulytsi.symbol.ngo">Перейти на сайт проєкту ↗</a></div>
    </section>

    <section class="section container">
      <div class="section-heading"><div><span class="label">Вибране</span><h2>Різні проєкти.<br>Спільна точка уваги.</h2></div><p>Від сучасного мистецтва й документалістики до плейбек-театру та практик психічного здоров’я.</p></div>
      <div class="project-grid"><ProjectCard v-for="project in projects.slice(1, 4)" :key="project.href" :project="project" /></div>
    </section>

    <section class="statement"><div class="container statement-grid"><span class="statement-index">01</span><h2>Ми працюємо там, де культурі потрібні діалог, уява та взаємна увага.</h2><NuxtLink class="text-link" to="/about">Хто ми →</NuxtLink></div></section>
  </div>
</template>
