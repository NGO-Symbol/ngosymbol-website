<script setup lang="ts">
useSeoMeta({ title: 'Новини', description: 'Новини ГО «Символ»: виставки, гранти, події.' })
const items = [...news].sort((a, b) => b.date.localeCompare(a.date))
</script>

<template>
  <section class="page container">
    <Breadcrumbs :items="[{ label: 'Новини' }]" />
    <div class="page-title">
      <span class="eyebrow">Що відбувається</span>
      <h1>Новини</h1>
      <p>Коротко про виставки, гранти й події «Символу». Докладніше — на сторінках проєктів.</p>
    </div>
    <div class="news-list">
      <article v-for="item in items" :id="item.slug" :key="item.slug" class="news-item">
        <time :datetime="item.date">{{ formatDate(item.date) }}</time>
        <div>
          <h2>{{ item.title }}</h2>
          <RichText :paragraphs="item.body" />
        </div>
      </article>
    </div>
  </section>
</template>
