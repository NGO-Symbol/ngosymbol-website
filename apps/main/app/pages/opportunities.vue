<script setup lang="ts">
import { socials } from '~/data/social'
definePageMeta({ pageTransition: { name: 'curtain', mode: 'out-in' } })
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
        <a v-for="(item, index) in socials" :key="item.label" class="button" :class="{ 'button--dark': index === 0 }" :href="item.url" target="_blank" rel="noreferrer">{{ item.label }} ↗</a>
      </div>
    </div>

    <section v-if="archive.length" class="events-block">
      <h2 class="block-title">Архів</h2>
      <ul class="press-list">
        <li v-for="item in archive" :key="item.slug"><strong>{{ item.title }}</strong><span>до {{ formatDate(item.deadline) }}</span></li>
      </ul>
    </section>
  </section>
</template>
