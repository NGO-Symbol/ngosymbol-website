<script setup lang="ts">
import { newsEn } from '~/data/editorial-en'
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
useSeoMeta({ title: () => t('Новини', 'News'), description: () => t('Новини ГО «Символ»: виставки, гранти, події.', 'NGO Symbol news: exhibitions, grants, and events.') })
const items = [...news].sort((a, b) => b.date.localeCompare(a.date))
const display = (item: (typeof news)[number]) => isEn.value ? newsEn[item.slug] ?? item : item
</script>

<template>
  <section class="page container">
    <Breadcrumbs />
    <div class="page-title">
      <span class="eyebrow">{{ t('Що відбувається', 'What is happening') }}</span>
      <h1>{{ t('Новини', 'News') }}</h1>
      <p>{{ t('Коротко про виставки, гранти й події «Символу». Докладніше — на сторінках проєктів.', 'Short updates on Symbol exhibitions, grants, and events. Find the full stories on the project pages.') }}</p>
    </div>
    <div class="news-list">
      <article v-for="item in items" :id="item.slug" :key="item.slug" class="news-item">
        <time :datetime="item.date">{{ isEn ? formatDateEn(item.date) : formatDate(item.date) }}</time>
        <div>
          <h2>{{ display(item).title }}</h2>
          <RichText :paragraphs="display(item).body" />
        </div>
      </article>
    </div>
  </section>
</template>
