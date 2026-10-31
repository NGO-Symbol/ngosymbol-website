<script setup lang="ts">
import { opportunitiesEn } from '~/data/editorial-en'
import { projectsEn } from '~/data/projects-en'
import { eventsEn } from '~/data/events-en'
import { psdPeopleEn } from '~/data/psd-artists-en'
import { peopleEn } from '~/data/people-en'

const route = useRoute()
const project = getProject(String(route.params.slug))

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Проєкт не знайдено' })
}

const { isEn, localePath } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
const text = computed(() => (isEn.value && projectsEn[project.slug]) || project)
const programName = computed(() => isEn.value ? projectsEn[project.slug]?.programName ?? project.programLogo?.name : project.programLogo?.name)
const personName = (person: (typeof people)[number]) => isEn.value ? (psdPeopleEn[person.slug]?.name ?? peopleEn[person.slug]?.name ?? person.name) : person.name
const place = computed(() => isEn.value ? [project.venue?.nameEn ?? project.venue?.name, project.venue?.addressEn ?? project.venue?.address, project.venue?.city ?? project.city, project.venue?.country ?? project.country].map(value => translatePlace(value, true)).filter(Boolean).join(', ') : (project.venue ? venueLine(project.venue) : projectPlace(project)))
const shareImage = project.poster ?? project.gallery?.[0]?.src ?? project.backdrop
useSeoMeta({
  title: () => `${text.value.title} · ${projectYears(project)}`,
  description: () => text.value.summary,
  ogImage: shareImage ? `https://symbol.ngo${shareImage}` : undefined
})
// schema.org CreativeWork: the project with its years, place, image and the people credited in it.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.summary,
      url: `https://symbol.ngo/projects/${project.slug}/`,
      image: shareImage ? `https://symbol.ngo${shareImage}` : undefined,
      dateCreated: String(project.yearStart),
      locationCreated: project.city ? { '@type': 'Place', name: project.city } : undefined,
      creator: { '@type': 'Organization', name: 'ГО «Символ»', url: 'https://symbol.ngo/' },
      contributor: project.people?.map(credit => ({ '@type': 'Person', name: getPerson(credit.person)?.name, url: `https://symbol.ngo/people/${credit.person}/` })).filter(item => item.name)
    })
  }]
})

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
const pressKinds = { review: ['Огляд', 'Review'], announcement: ['Анонс', 'Announcement'], listing: ['Добірка', 'Listing'], 'open-call': ['Опен-кол', 'Open call'], video: ['Відео', 'Video'], radio: ['Радіо', 'Radio'], post: ['Допис', 'Post'] } as const
const calls = opportunitiesOfProject(project.slug)
const related = relatedProjects(project)
const others = projects.filter(other => other.slug !== project.slug && !related.includes(other)).slice(0, 3)
</script>

<template>
  <article v-if="project" class="project-page" :class="project.theme && `theme-${project.theme}`">
    <ThemesDocumentsHero v-if="project.theme === 'documents'" :project="project" />
    <header v-else class="project-hero" :class="[`tone-${project.tone}`, { 'has-backdrop': project.backdrop }]">
      <MediaImg v-if="project.backdrop" class="project-hero__backdrop" :src="project.backdrop" :alt="projectTitleIn(project, isEn)" />
      <img v-if="project.programLogo" class="project-hero__program" :src="project.programLogo.src" :alt="programName">
      <ProjectMotif v-else class="project-hero__motif" :motif="project.motif" live />
      <div class="container">
        <Breadcrumbs />
        <div class="project-kicker">
          <span>{{ projectYears(project) }}</span>
          <span>{{ place }}</span>
          <span>{{ translate(statusLabels[project.status]!, isEn) }}</span>
          <span v-for="format in project.formats" :key="format">{{ translate(formats[format]!, isEn) }}</span>
          <span v-if="project.role === 'partner'">{{ t('Символ — партнер', 'Symbol is a partner') }}</span>
        </div>
        <h1>{{ text.title }}</h1>
        <p>{{ text.summary }}</p>
        <a v-if="project.subsiteUrl" class="hero-site" :href="project.subsiteUrl"><span class="hero-site__dot" aria-hidden="true" />{{ t('Перейти на сайт проєкту', 'Visit project website') }}</a>
      </div>
    </header>

    <div class="container project-content">
      <aside>
        <dl class="facts">
          <div><dt>{{ t('Роки', 'Years') }}</dt><dd>{{ projectYears(project) }}</dd></div>
          <div><dt>{{ t('Місце', 'Place') }}</dt><dd>{{ place }}</dd></div>
          <div v-if="project.start"><dt>{{ t('Дата', 'Date') }}</dt><dd>{{ isEn ? formatRangeEn(project.start, project.end) : formatRange(project.start, project.end) }}</dd></div>
          <div><dt>{{ t('Напрям', 'Field') }}</dt><dd>{{ project.directions.map(d => translate(directions[d]!, isEn)).join(', ') }}</dd></div>
          <div><dt>{{ t('Роль «Символу»', 'Symbol’s role') }}</dt><dd>{{ project.role === 'partner' ? t('Партнер', 'Partner') : t('Організатор', 'Organiser') }}</dd></div>
        </dl>
        <NuxtLink :to="isEn ? '/en/projects' : '/projects'">← {{ t('До всіх проєктів', 'All projects') }}</NuxtLink>
      </aside>

      <div class="project-sections">
        <section v-if="text.body">
          <h2 class="section-title">{{ t('Про проєкт', 'About the project') }}</h2>
          <RichText class="lead-text" :paragraphs="text.body" />
        </section>

        <section v-if="text.concept">
          <h2 class="section-title">{{ t('Кураторська концепція', 'Curatorial concept') }}</h2>
          <RichText :paragraphs="text.concept" />
        </section>

        <section v-if="project.gallery?.length">
          <h2 class="section-title">{{ t('Фото', 'Photos') }}</h2>
          <PhotoGallery :photos="project.gallery" />
        </section>

        <Fold v-if="projectEvents.length" :title="t('Події проєкту', 'Project events')">
          <div class="event-list">
            <NuxtLink v-for="event in [...upcomingEvents, ...pastEvents]" :key="event.slug" class="event-row" :to="localePath(`/events/${event.slug}`)">
              <time class="event-row__date" :datetime="event.start">{{ isEn ? formatRangeEn(event.start, event.end) : formatRange(event.start, event.end) }}</time>
              <span class="event-row__title">{{ isEn ? eventsEn[event.slug]?.title ?? event.title : event.title }}</span>
              <span class="event-row__meta"><span>{{ translate(formats[event.format]!, isEn) }}</span><span>{{ venueLineIn(event.venue, isEn) }}</span></span>
            </NuxtLink>
          </div>
        </Fold>

        <Fold v-if="team.length" :title="t('Люди', 'People')">
          <div class="credits">
            <div v-for="group in team" :key="group.role" class="credits__group">
              <h3>{{ translate(group.role, isEn) }}</h3>
              <ul class="project-people">
                <li v-for="person in group.people" :key="person.slug">
                  <NuxtLink v-if="person.hasPage !== false" class="project-person" :to="localePath(`/people/${person.slug}`)">
                    <MediaImg v-if="person.photo" :src="person.photo" :alt="personName(person)" loading="lazy" />
                    <span>{{ personName(person) }}</span>
                  </NuxtLink>
                  <span v-else class="project-person">
                    <MediaImg v-if="person.photo" :src="person.photo" :alt="personName(person)" loading="lazy" />
                    <span>{{ personName(person) }}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Fold>

        <Fold v-if="partners.length || donors.length || project.programLogo" :title="t('Партнери й донори', 'Partners and donors')">
          <div class="credits">
            <div v-if="partners.length" class="credits__group">
              <h3>{{ t('Партнери', 'Partners') }}</h3>
              <PartnerTiles :items="partners" />
            </div>
            <div v-if="donors.length" class="credits__group">
              <h3>{{ t('Донори', 'Donors') }}</h3>
              <PartnerTiles :items="donors" />
            </div>
          </div>
          <p v-if="text.donorCredit" class="donor-credit">{{ text.donorCredit }}</p>
          <p v-if="text.fundingNotice" class="donor-credit donor-credit--notice">{{ text.fundingNotice }}</p>
          <figure v-if="project.programLogo" class="program-logo">
            <img :src="project.programLogo.src" :alt="programName" loading="lazy">
            <figcaption>{{ programName }}</figcaption>
          </figure>
        </Fold>

        <Fold v-if="mentions.length" :title="t('Преса', 'Press')">
          <ul class="press-list">
            <li v-for="item in mentions" :key="item.url">
              <a :href="item.url" target="_blank" rel="noreferrer" :lang="originalLang(item.outlet + item.title, isEn)">
                <span class="press-list__meta"><span v-if="item.kind" class="press-list__kind">{{ pressKinds[item.kind][isEn ? 1 : 0] }}</span><strong>{{ item.outlet }}</strong><span v-if="item.author">{{ item.author }}</span><time v-if="item.date" :datetime="item.date">{{ isEn ? formatDateEn(item.date) : formatDate(item.date) }}</time></span>
                <span class="press-list__title">{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </Fold>

        <Fold v-if="calls.length" :title="t('Можливості', 'Opportunities')">
          <a v-for="call in calls" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
            <strong>{{ isEn ? opportunitiesEn[call.slug]?.title ?? call.title : call.title }}</strong><span>{{ t('Дедлайн', 'Deadline') }}: {{ isEn ? formatDateEn(call.deadline) : formatDate(call.deadline) }}</span><span class="open-call__cta">{{ t('Подати заявку', 'Apply') }}</span>
          </a>
        </Fold>
      </div>
    </div>

    <section class="container section section--tight">
      <h2 class="section-title">{{ related.length ? t('Пов’язані проєкти', 'Related projects') : t('Інші проєкти «Символу»', 'Other Symbol projects') }}</h2>
      <div class="project-grid">
        <ProjectCard v-for="other in (related.length ? related : others)" :key="other.slug" :project="other" />
      </div>
    </section>
  </article>
</template>
