<script setup lang="ts">
import { socials } from '~/data/social'
import { highlights, pickHighlights } from '~/data/highlights'
import { newsEn, opportunitiesEn } from '~/data/editorial-en'
// One home page for both languages (/ and /en), so the English home always has the same sections and photos.
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
useSeoMeta({
  title: () => t('ГО «Символ»', 'NGO Symbol'),
  ogTitle: () => t('ГО «Символ» — культура в русі', 'NGO Symbol — culture in motion'),
  description: () => t('Незалежна українська організація: сучасне мистецтво, культура й уважне ставлення до психічного здоров’я.', 'Independent Ukrainian NGO from Kharkiv: contemporary art, culture, and care for mental health.'),
  ogDescription: () => t('Незалежна українська організація: сучасне мистецтво, культура й уважне ставлення до психічного здоров’я.', 'Independent Ukrainian NGO from Kharkiv: contemporary art, culture, and care for mental health.')
})
// schema.org Organization: who we are, for search engines (facts from documents/knowledge/organization.md).
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: 'ГО «Символ»',
      alternateName: ['Громадська організація «Символ»', 'NGO Symbol'],
      url: 'https://symbol.ngo/',
      logo: 'https://symbol.ngo/press-kit/symbol-mark.png',
      description: 'Незалежна українська організація, що розвиває сучасну українську культуру і мистецтво та сприяє уважному ставленню до психічного здоров’я.',
      foundingDate: '2023-10-11',
      address: { '@type': 'PostalAddress', addressLocality: 'Харків', addressCountry: 'UA' },
      areaServed: ['Харків', 'Закарпаття', 'Київ'],
      email: 'ngo.symbol@gmail.com',
      sameAs: socials.map(item => item.url)
    })
  }]
})

// A different selection from the curated pool on every visit, chosen in the browser before any photo loads.
const reel = ref<typeof highlights>([])
onMounted(() => { reel.value = pickHighlights() })

// Facts from documents/knowledge/organization.md (USER_CONFIRMED positioning, registration 2023, places).
const aboutUk = [
  'ГО «Символ» — незалежна громадська організація з Харкова, заснована 2023 року. Ми розвиваємо сучасну українську культуру й мистецтво та сприяємо уважному ставленню до психічного здоров’я.',
  'Робимо виставки сучасного мистецтва, як-от [[project:pokazhit-svoi-dokumenty]] у ЄрміловЦентрі, документальне кіно [[project:zbyrach-konvalii]], плейбек-театр [[project:holosy-u-rusi]], навчання медиків за програмою ВООЗ — [[project:mhgap-kyiv]] — і проєкт міської пам’яті [[project:istoriia-moiei-vulytsi]]. Працюємо в Харкові, на Закарпатті, в Києві та за кордоном.'
]
const aboutEn = [
  'NGO Symbol is an independent non-governmental organisation from Kharkiv, founded in 2023. We develop contemporary Ukrainian culture and art and promote attentive care for mental health.',
  'We make contemporary art exhibitions such as [[project:pokazhit-svoi-dokumenty]] at YermilovCentre, the documentary film [[project:zbyrach-konvalii]], the playback theatre project [[project:holosy-u-rusi]], WHO programme training for health workers — [[project:mhgap-kyiv]] — and the urban memory project [[project:istoriia-moiei-vulytsi]]. We work in Kharkiv, Zakarpattia, Kyiv, and abroad.'
]
const about = computed(() => isEn.value ? aboutEn : aboutUk)
const date = (iso: string) => isEn.value ? formatDateEn(iso) : formatDate(iso)
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
        <div class="eyebrow">{{ t('Харків · мистецтво · психічне здоров’я', 'Kharkiv · art · mental health') }}</div>
        <h1>{{ t('Створюємо простір для уважності й сучасної культури', 'Space for attention and contemporary culture') }}</h1>
        <p>{{ t('Незалежна українська організація. Виставки, кіно, плейбек-театр і програми психічного здоров’я — від Харкова до Закарпаття й за кордоном.', 'An independent Ukrainian non-profit. Exhibitions, documentary film, playback theatre and mental health programmes — from Kharkiv to Zakarpattia and abroad.') }}</p>
        <div class="button-row">
          <NuxtLink class="button button--dark" to="/projects">{{ t('Усі проєкти', 'All projects') }}</NuxtLink>
          <NuxtLink class="button" to="/support">{{ t('Підтримати', 'Support us') }}</NuxtLink>
        </div>
      </div>
      <ProjectOrbit class="home-hero__orbit" />
    </section>

    <!-- Who we are, in words: the home page is found in search by the organization, its projects and places. -->
    <section class="section section--tight container home-about">
      <span class="label">{{ t('Про «Символ»', 'About Symbol') }}</span>
      <RichText class="lead-text" :paragraphs="about" />
      <NuxtLink class="text-link" to="/about">{{ t('Більше про організацію', 'More about the organisation') }}</NuxtLink>
    </section>

    <section class="section section--tight container home-reel">
      <div class="section-heading">
        <div><span class="label">{{ t('Кадри', 'Frames') }}</span><h2>{{ t('Як це виглядає', 'What it looks like') }}</h2></div>
        <p>{{ t('Виставки, тренінги, перформанси й кадри з фільму. Гортайте стрічку, натисніть на фото, щоб переглянути на весь екран.', 'Exhibitions, trainings, performances and film stills. Scroll the strip; tap a photo to see it full screen.') }}</p>
      </div>
      <PhotoReel :photos="reel" :placeholders="14" />
    </section>

    <StatsCounters />

    <section v-if="openCalls.length" class="open-calls">
      <div class="container">
        <span class="label">{{ t('Актуальні можливості', 'Open opportunities') }}</span>
        <div class="open-calls__list">
          <a v-for="call in openCalls" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
            <strong>{{ isEn ? opportunitiesEn[call.slug]?.title ?? call.title : call.title }}</strong>
            <span>{{ t('Дедлайн', 'Deadline') }}: {{ date(call.deadline) }}</span>
            <span class="open-call__cta">{{ t('Подати заявку', 'Apply') }}</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div><span class="label">{{ t('Події', 'Events') }}</span><h2>{{ upcoming.length ? t('Найближчі події', 'Upcoming events') : t('Нещодавні події', 'Recent events') }}</h2></div>
        <p>
          <template v-if="!upcoming.length">{{ t('Нові анонси готуються.', 'New announcements are on their way.') }}&#32;</template>
          <NuxtLink class="text-link" to="/events">{{ t('Календар подій', 'Event calendar') }}</NuxtLink>
        </p>
      </div>
      <div class="event-list">
        <EventRow v-for="item in (upcoming.length ? upcoming : recent)" :key="item.slug" :item="item" />
      </div>
    </section>

    <section class="section section--tight container">
      <div class="section-heading">
        <div><span class="label">{{ t('Зараз', 'Now') }}</span><h2>{{ t('Актуальні проєкти', 'Current projects') }}</h2></div>
        <p>{{ t('Від міської пам’яті Харкова до плейбек-театру на Закарпатті.', 'From Kharkiv’s urban memory to playback theatre in Zakarpattia.') }} <NuxtLink class="text-link" to="/projects">{{ t('Усі проєкти', 'All projects') }}</NuxtLink></p>
      </div>
      <div class="project-grid">
        <ProjectCard v-for="project in current" :key="project.slug" :project="project" />
      </div>
    </section>

    <section class="section section--tight container">
      <div class="section-heading">
        <div><span class="label">{{ t('Новини', 'News') }}</span><h2>{{ t('Що нового', 'What’s new') }}</h2></div>
        <p><NuxtLink class="text-link" to="/news">{{ t('Усі новини', 'All news') }}</NuxtLink></p>
      </div>
      <div class="news-list news-list--compact">
        <NuxtLink v-for="item in latestNews" :key="item.slug" class="news-item" :to="`/news#${item.slug}`">
          <time :datetime="item.date">{{ date(item.date) }}</time>
          <div><h2>{{ isEn ? newsEn[item.slug]?.title ?? item.title : item.title }}</h2></div>
        </NuxtLink>
      </div>
    </section>

    <SupportBand />

    <section v-if="supporters.length" class="section section--tight container">
      <span class="label">{{ t('Партнери й донори проєктів', 'Project partners and donors') }}</span>
      <PartnerTiles :items="supporters" compact />
    </section>

  </div>
</template>
