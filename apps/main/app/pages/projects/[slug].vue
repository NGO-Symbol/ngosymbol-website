<script setup lang="ts">
import { projectsEn } from '~/data/projects-en'

const route = useRoute()
const project = getProject(String(route.params.slug))

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Проєкт не знайдено' })
}

const { isEn } = useLang()
const text = computed(() => (isEn.value && projectsEn[project.slug]) || project)
useSeoMeta({ title: () => `${text.value.title} · ${projectYears(project)}`, description: () => text.value.summary })

// The header takes the project's colours on themed pages (html[data-page-theme], main.css).
if (project.theme) useHead({ htmlAttrs: { 'data-page-theme': project.theme } })

// Fonts of a project identity load only on that project's page.
if (project.theme === 'documents') {
  useHead({ link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap' }] })
}

const projectEvents = eventsOfProject(project.slug)
const upcomingEvents = projectEvents.filter(isUpcoming)
const pastEvents = projectEvents.filter(event => !isUpcoming(event))
const team = creditsByRole(project.people)
const toTiles = (slugs: string[] = []) => slugs.map(getOrganization).filter(org => !!org).map(org => ({ org: org!, projects: projects.filter(p => p.partners?.includes(org!.slug) || p.donors?.includes(org!.slug)) }))
const partners = toTiles([...(project.partners ?? [])].sort(bySignificance))
const donors = toTiles(project.donors)
// Newest first; mentions without a stated date after the dated ones.
const mentions = [...pressOfProject(project.slug)].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
const pressKinds = { review: 'Огляд', announcement: 'Анонс', listing: 'Добірка', 'open-call': 'Опен-кол', video: 'Відео', radio: 'Радіо', post: 'Допис' } as const
const calls = opportunitiesOfProject(project.slug)
const related = relatedProjects(project)
const others = projects.filter(other => other.slug !== project.slug && !related.includes(other)).slice(0, 3)
</script>

<template>
  <article v-if="project" class="project-page" :class="project.theme && `theme-${project.theme}`">
    <ThemesDocumentsHero v-if="project.theme === 'documents'" :project="project" />
    <header v-else class="project-hero" :class="[`tone-${project.tone}`, { 'has-backdrop': project.backdrop }]">
      <img v-if="project.backdrop" class="project-hero__backdrop" :src="project.backdrop" alt="">
      <img v-if="project.programLogo" class="project-hero__program" :src="project.programLogo.src" :alt="project.programLogo.name">
      <ProjectMotif v-else class="project-hero__motif" :motif="project.motif" live />
      <div class="container">
        <Breadcrumbs :items="[{ label: 'Проєкти', to: '/projects' }, { label: project.title }]" />
        <div class="project-kicker">
          <span>{{ projectYears(project) }}</span>
          <span>{{ projectPlace(project) }}</span>
          <span>{{ statusLabels[project.status] }}</span>
          <span v-for="format in project.formats" :key="format">{{ formats[format] }}</span>
          <span v-if="project.role === 'partner'">Символ — партнер</span>
        </div>
        <h1>{{ text.title }}</h1>
        <p>{{ text.summary }}</p>
        <a v-if="project.subsiteUrl" class="hero-site" :href="project.subsiteUrl"><span class="hero-site__dot" aria-hidden="true" />Перейти на сайт проєкту</a>
      </div>
    </header>

    <div class="container project-content">
      <aside>
        <dl class="facts">
          <div><dt>Роки</dt><dd>{{ projectYears(project) }}</dd></div>
          <div><dt>Місце</dt><dd>{{ project.venue ? venueLine(project.venue) : projectPlace(project) }}</dd></div>
          <div v-if="project.start"><dt>Дата</dt><dd>{{ formatRange(project.start, project.end) }}</dd></div>
          <div><dt>Напрям</dt><dd>{{ project.directions.map(d => directions[d]).join(', ') }}</dd></div>
          <div><dt>Роль «Символу»</dt><dd>{{ project.role === 'partner' ? 'Партнер' : 'Організатор' }}</dd></div>
        </dl>
        <NuxtLink to="/projects">← До всіх проєктів</NuxtLink>
      </aside>

      <div class="project-sections">
        <section v-if="project.gallery?.length">
          <h2 class="section-title">Фото</h2>
          <PhotoGallery :photos="project.gallery" />
        </section>

        <section v-if="project.body">
          <h2 class="section-title">Про проєкт</h2>
          <RichText class="lead-text" :paragraphs="project.body" />
        </section>

        <section v-if="project.concept">
          <h2 class="section-title">Кураторська концепція</h2>
          <RichText :paragraphs="project.concept" />
        </section>

        <section v-if="projectEvents.length">
          <h2 class="section-title">Події проєкту</h2>
          <div class="event-list">
            <NuxtLink v-for="event in [...upcomingEvents, ...pastEvents]" :key="event.slug" class="event-row" :to="`/events/${event.slug}`">
              <time class="event-row__date" :datetime="event.start">{{ formatRange(event.start, event.end) }}</time>
              <span class="event-row__title">{{ event.title }}</span>
              <span class="event-row__meta"><span>{{ formats[event.format] }}</span><span>{{ venueLine(event.venue) }}</span></span>
            </NuxtLink>
          </div>
        </section>

        <section v-if="team.length">
          <h2 class="section-title">Люди</h2>
          <div class="credits">
            <div v-for="group in team" :key="group.role" class="credits__group">
              <h3>{{ group.role }}</h3>
              <p>
                <template v-for="(person, index) in group.people" :key="person.slug">
                  <NuxtLink v-if="person.hasPage !== false" :to="`/people/${person.slug}`">{{ person.name }}</NuxtLink>
                  <template v-else>{{ person.name }}</template>
                  <template v-if="index < group.people.length - 1">, </template>
                </template>
              </p>
            </div>
          </div>
        </section>

        <section v-if="partners.length || donors.length || project.programLogo">
          <h2 class="section-title">Партнери й донори</h2>
          <div class="credits">
            <div v-if="partners.length" class="credits__group">
              <h3>Партнери</h3>
              <PartnerTiles :items="partners" />
            </div>
            <div v-if="donors.length" class="credits__group">
              <h3>За підтримки</h3>
              <PartnerTiles :items="donors" />
            </div>
          </div>
          <p v-if="project.donorCredit" class="donor-credit">{{ project.donorCredit }}</p>
          <p v-if="project.fundingNotice" class="donor-credit donor-credit--notice">{{ project.fundingNotice }}</p>
          <figure v-if="project.programLogo" class="program-logo">
            <img :src="project.programLogo.src" :alt="project.programLogo.name" loading="lazy">
            <figcaption>{{ project.programLogo.name }}</figcaption>
          </figure>
        </section>

        <section v-if="mentions.length">
          <h2 class="section-title">Преса</h2>
          <ul class="press-list">
            <li v-for="item in mentions" :key="item.url">
              <a :href="item.url" target="_blank" rel="noreferrer">
                <span class="press-list__meta"><span v-if="item.kind" class="press-list__kind">{{ pressKinds[item.kind] }}</span><strong>{{ item.outlet }}</strong><span v-if="item.author">{{ item.author }}</span><time v-if="item.date" :datetime="item.date">{{ formatDate(item.date) }}</time></span>
                <span class="press-list__title">{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </section>

        <section v-if="calls.length">
          <h2 class="section-title">Можливості</h2>
          <a v-for="call in calls" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
            <strong>{{ call.title }}</strong><span>Дедлайн: {{ formatDate(call.deadline) }}</span><span class="open-call__cta">Подати заявку</span>
          </a>
        </section>
      </div>
    </div>

    <section class="container section section--tight">
      <h2 class="section-title">{{ related.length ? 'Пов’язані проєкти' : 'Інші проєкти «Символу»' }}</h2>
      <div class="project-grid">
        <ProjectCard v-for="other in (related.length ? related : others)" :key="other.slug" :project="other" />
      </div>
    </section>
  </article>
</template>
