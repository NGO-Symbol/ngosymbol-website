<script setup lang="ts">
import { socials } from '~/data/social'
useSeoMeta({ title: 'Можливості', description: 'Опен-коли, резиденції та інші можливості від ГО «Символ».' })

const typeLabels: Record<string, string> = { 'open-call': 'Опен-кол', residency: 'Резиденція', vacancy: 'Вакансія', volunteering: 'Волонтерство' }
const active = activeOpportunities()
const archive = opportunities.filter(item => !isActive(item)).sort((a, b) => b.deadline.localeCompare(a.deadline))
</script>

<template>
  <section class="page container">
    <Breadcrumbs :items="[{ label: 'Можливості' }]" />
    <div class="page-title">
      <span class="eyebrow">Опен-коли · резиденції · волонтерство</span>
      <h1>Можливості</h1>
      <p>Тут з’являються відкриті конкурси для митців, набір учасників і волонтерів. Активні можливості також показуються на головній.</p>
    </div>

    <div v-if="active.length" class="open-calls__list">
      <a v-for="call in active" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
        <span class="label">{{ typeLabels[call.type] }}<template v-if="call.project"> · {{ getProject(call.project)?.title }}</template></span>
        <strong>{{ call.title }}</strong>
        <RichText :paragraphs="call.description" />
        <span>Дедлайн: {{ formatDate(call.deadline) }}</span>
        <span class="open-call__cta">Подати заявку ↗</span>
      </a>
    </div>
    <div v-else class="empty-state">
      <SymbolMark class="empty-state__mark" />
      <h2>Нові можливості вже на орбіті</h2>
      <p>Готуємо опен-коли, резиденції та набори волонтерів. Стежте за анонсами тут і в наших соцмережах — і долучайтеся першими.</p>
      <div class="button-row">
        <SocialLink v-for="(item, index) in socials" :key="item.url" class="button" :class="{ 'button--dark': index === 0 }" :url="item.url" />
      </div>
    </div>

    <section v-if="archive.length" class="events-block">
      <h2 class="block-title">Архів</h2>
      <div class="archive-calls">
        <article v-for="item in archive" :key="item.slug" class="archive-call">
          <span class="label">{{ typeLabels[item.type] }} · завершено {{ formatDate(item.deadline) }}</span>
          <h3>{{ item.title }}</h3>
          <RichText :paragraphs="item.description" />
          <NuxtLink v-if="item.project" class="text-link" :to="`/projects/${item.project}`">Проєкт «{{ getProject(item.project)?.title }}» →</NuxtLink>
        </article>
      </div>
    </section>
  </section>
</template>
