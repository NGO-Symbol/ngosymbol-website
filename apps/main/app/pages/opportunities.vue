<script setup lang="ts">
import { socials } from '~/data/social'
import { opportunitiesEn } from '~/data/editorial-en'
import { projectsEn } from '~/data/projects-en'
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
useSeoMeta({ title: () => t('Можливості', 'Opportunities'), description: () => t('Опен-коли, резиденції та інші можливості від ГО «Символ».', 'Open calls, residencies, and other opportunities from NGO Symbol.') })

const typeLabels: Record<string, string> = { 'open-call': 'Опен-кол', residency: 'Резиденція', vacancy: 'Вакансія', volunteering: 'Волонтерство' }
const active = activeOpportunities()
const archive = opportunities.filter(item => !isActive(item)).sort((a, b) => b.deadline.localeCompare(a.deadline))
const display = (item: (typeof opportunities)[number]) => isEn.value ? opportunitiesEn[item.slug] ?? item : item
const projectTitle = (slug: string) => isEn.value ? projectsEn[slug]?.title ?? getProject(slug)?.title : getProject(slug)?.title
</script>

<template>
  <section class="page container">
    <Breadcrumbs />
    <div class="page-title">
      <span class="eyebrow">{{ t('Опен-коли · резиденції · волонтерство', 'Open calls · residencies · volunteering') }}</span>
      <h1>{{ t('Можливості', 'Opportunities') }}</h1>
      <p>{{ t('Тут з’являються відкриті конкурси для митців, набір учасників і волонтерів. Активні можливості також показуються на головній.', 'Open calls for artists, participant recruitment, and volunteering opportunities appear here and on the home page while active.') }}</p>
    </div>

    <div v-if="active.length" class="open-calls__list">
      <a v-for="call in active" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
        <span class="label">{{ translate(typeLabels[call.type]!, isEn) }}<template v-if="call.project"> · {{ projectTitle(call.project) }}</template></span>
        <strong>{{ display(call).title }}</strong>
        <RichText :paragraphs="display(call).description" />
        <span>{{ t('Дедлайн', 'Deadline') }}: {{ isEn ? formatDateEn(call.deadline) : formatDate(call.deadline) }}</span>
        <span class="open-call__cta">{{ t('Подати заявку', 'Apply') }}</span>
      </a>
    </div>
    <div v-else class="empty-state">
      <SymbolMark class="empty-state__mark" />
      <h2>{{ t('Нові можливості вже на орбіті', 'New opportunities are already in orbit') }}</h2>
      <p>{{ t('Готуємо опен-коли, резиденції та набори волонтерів. Стежте за анонсами тут і в наших соцмережах — і долучайтеся першими.', 'We are preparing open calls, residencies, and volunteer recruitment. Follow announcements here and on our social channels.') }}</p>
      <div class="button-row">
        <SocialLink v-for="(item, index) in socials" :key="item.url" class="button" :class="{ 'button--dark': index === 0 }" :url="item.url" />
      </div>
    </div>

    <section v-if="archive.length" class="events-block">
      <h2 class="block-title">{{ t('Архів', 'Archive') }}</h2>
      <div class="archive-calls">
        <article v-for="item in archive" :key="item.slug" class="archive-call">
          <span class="label">{{ translate(typeLabels[item.type]!, isEn) }} · {{ t('завершено', 'closed') }} {{ isEn ? formatDateEn(item.deadline) : formatDate(item.deadline) }}</span>
          <h3>{{ display(item).title }}</h3>
          <RichText :paragraphs="display(item).description" />
          <NuxtLink v-if="item.project" class="text-link" :to="`/projects/${item.project}`">{{ t('Проєкт', 'Project') }} «{{ projectTitle(item.project) }}» →</NuxtLink>
        </article>
      </div>
    </section>
  </section>
</template>
