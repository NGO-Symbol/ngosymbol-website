<script setup lang="ts">
import { socials } from '~/data/social'
import { highlights, pickHighlights } from '~/data/highlights'
useSeoMeta({
  title: 'ГО «Символ»',
  ogTitle: 'ГО «Символ» — культура в русі',
  ogDescription: 'Незалежна українська організація: сучасне мистецтво, культура й уважне ставлення до психічного здоров’я.'
})

// A different selection from the curated pool on every visit, chosen in the browser before any photo loads.
const reel = ref<typeof highlights>([])
onMounted(() => { reel.value = pickHighlights() })

// Facts from documents/knowledge/organization.md (USER_CONFIRMED positioning, registration 2023, places).
const about = [
  'ГО «Символ» — незалежна громадська організація з Харкова, заснована 2023 року. Ми розвиваємо сучасну українську культуру й мистецтво та сприяємо уважному ставленню до психічного здоров’я.',
  'Робимо виставки сучасного мистецтва, як-от [[project:pokazhit-svoi-dokumenty]] у ЄрміловЦентрі, документальне кіно [[project:zbyrach-konvalii]], плейбек-театр [[project:holosy-u-rusi]], навчання медиків за програмою ВООЗ — [[project:mhgap-kyiv]] — і проєкт міської пам’яті [[project:istoriia-moiei-vulytsi]]. Працюємо в Харкові, на Закарпатті, в Києві та за кордоном.'
]
const openCalls = activeOpportunities()
const upcoming = eventItems.filter(isUpcoming).reverse().slice(0, 4)
const recent = eventItems.filter(item => !isUpcoming(item)).slice(0, 3)
const current = projects.filter(project => project.status !== 'completed')
const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
const supporters = organizations
  .map(org => ({ org, projects: projects.filter(project => project.partners?.includes(org.slug) || project.donors?.includes(org.slug)) }))
  .filter(item => item.projects.length)
  .sort((a, b) => bySignificance(a.org.slug, b.org.slug))
</script>

<template>
  <div>
    <section class="home-hero container">
      <div class="home-hero__text">
        <div class="eyebrow">Харків · мистецтво · психічне здоров’я</div>
        <h1>Створюємо простір для уважності й сучасної культури</h1>
        <p>Незалежна українська організація. Виставки, кіно, плейбек-театр і програми психічного здоров’я — від Харкова до Закарпаття й за кордоном.</p>
        <div class="button-row">
          <NuxtLink class="button button--dark" to="/projects">Усі проєкти</NuxtLink>
          <NuxtLink class="button" to="/support">Підтримати</NuxtLink>
        </div>
      </div>
      <ProjectOrbit class="home-hero__orbit" />
    </section>

    <!-- Who we are, in words: the home page is found in search by the organization, its projects and places. -->
    <section class="section section--tight container home-about">
      <span class="label">Про «Символ»</span>
      <RichText class="lead-text" :paragraphs="about" />
      <NuxtLink class="text-link" to="/about">Більше про організацію</NuxtLink>
    </section>

    <section class="section section--tight container home-reel">
      <div class="section-heading">
        <div><span class="label">Кадри</span><h2>Як це виглядає</h2></div>
        <p>Виставки, тренінги, перформанси й кадри з фільму. Гортайте стрічку, натисніть на фото, щоб переглянути на весь екран.</p>
      </div>
      <PhotoReel :photos="reel" :placeholders="14" />
    </section>

    <StatsCounters />

    <section v-if="openCalls.length" class="open-calls">
      <div class="container">
        <span class="label">Актуальні можливості</span>
        <div class="open-calls__list">
          <a v-for="call in openCalls" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
            <strong>{{ call.title }}</strong>
            <span>Дедлайн: {{ formatDate(call.deadline) }}</span>
            <span class="open-call__cta">Подати заявку</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div><span class="label">Події</span><h2>{{ upcoming.length ? 'Найближчі події' : 'Нещодавні події' }}</h2></div>
        <p>
          <template v-if="!upcoming.length">Нові анонси готуються. </template>
          <NuxtLink class="text-link" to="/events">Календар подій →</NuxtLink>
        </p>
      </div>
      <div class="event-list">
        <EventRow v-for="item in (upcoming.length ? upcoming : recent)" :key="item.slug" :item="item" />
      </div>
    </section>

    <section class="section section--tight container">
      <div class="section-heading">
        <div><span class="label">Зараз</span><h2>Актуальні проєкти</h2></div>
        <p>Від міської пам’яті Харкова до плейбек-театру на Закарпатті. <NuxtLink class="text-link" to="/projects">Усі проєкти →</NuxtLink></p>
      </div>
      <div class="project-grid">
        <ProjectCard v-for="project in current" :key="project.slug" :project="project" />
      </div>
    </section>

    <section class="section section--tight container">
      <div class="section-heading">
        <div><span class="label">Новини</span><h2>Що нового</h2></div>
        <p><NuxtLink class="text-link" to="/news">Усі новини →</NuxtLink></p>
      </div>
      <div class="news-list news-list--compact">
        <NuxtLink v-for="item in latestNews" :key="item.slug" class="news-item" :to="`/news#${item.slug}`">
          <time :datetime="item.date">{{ formatDate(item.date) }}</time>
          <div><h2>{{ item.title }}</h2></div>
        </NuxtLink>
      </div>
    </section>

    <SupportBand />

    <section v-if="supporters.length" class="section section--tight container">
      <span class="label">Партнери й донори проєктів</span>
      <PartnerTiles :items="supporters" compact />
    </section>

    <section class="subscribe">
      <div class="container subscribe__grid">
        <h2>Стежте за «Символом»</h2>
        <div class="subscribe__links">
          <NuxtLink :to="{ path: '/events', query: { view: 'calendar' } }">Підписатися на календар подій</NuxtLink>
          <SocialLink v-for="item in socials" :key="item.url" :url="item.url" />
          <p>Розсилка запуститься згодом.</p>
        </div>
      </div>
    </section>
  </div>
</template>
