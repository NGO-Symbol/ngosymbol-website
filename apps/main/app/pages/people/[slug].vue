<script setup lang="ts">
import { psdPeopleEn } from '~/data/psd-artists-en'
import { projectsEn } from '~/data/projects-en'

const route = useRoute()
const person = getPerson(String(route.params.slug))
const { isEn, localePath } = useLang()

if (!person || person.hasPage === false) {
  throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })
}

const appearances = appearancesOf(person.slug)
const personEvents = eventsOfPerson(person.slug)
const approved = computed(() => isEn.value ? psdPeopleEn[person.slug] : undefined)
const displayPerson = computed(() => approved.value ? {
  ...person,
  name: approved.value.name,
  shortBio: approved.value.bio[0],
  bio: approved.value.bio
} : person)
const t = (uk: string, en: string) => isEn.value ? en : uk
const tagEn: Record<string, string> = {
  'Художник': 'Artist', 'Художниця': 'Artist', 'Художник-графік': 'Graphic artist', 'Митець': 'Artist', 'Мисткиня': 'Artist',
  'Фотограф': 'Photographer', 'Дизайнер': 'Designer', 'Дизайнерка': 'Designer', 'Кураторка': 'Curator', 'Астроном': 'Astronomer',
  'Артменеджерка': 'Art manager'
}
const roleEn: Record<string, string> = { 'Митці': 'Artists', 'Згадка': 'Mention', 'Куратори': 'Curators', 'Фотографи': 'Photographers' }
const appearanceTitle = (item: (typeof appearances)[number]) => {
  if (!isEn.value) return item.title
  const slug = item.to.match(/\/projects\/([^/]+)/)?.[1]
  return (slug && projectsEn[slug]?.title) || item.title
}
const appearanceByline = (byline: string) => isEn.value
  ? byline.replace('Харків', 'Kharkiv').replace('Київ', 'Kyiv').replace('Закарпаття', 'Zakarpattia')
  : byline

// The short bio is shown as the lead under the name; when the biography opens with the same sentence, it is not repeated.
const bioParagraphs = computed(() => {
  const paragraphs = [...(displayPerson.value.bio ?? [])]
  const lead = displayPerson.value.shortBio?.trim()
  if (lead && paragraphs[0]?.startsWith(lead)) {
    const rest = paragraphs[0].slice(lead.length).trim()
    if (rest) paragraphs[0] = rest
    else paragraphs.shift()
  }
  return paragraphs
})

useSeoMeta({
  title: () => displayPerson.value.name,
  description: () => displayPerson.value.shortBio ?? t(`${displayPerson.value.name} у проєктах ГО «Символ».`, `${displayPerson.value.name} in NGO Symbol projects.`),
  // The portrait is the share image, so a search or a shared link shows the person's own photo.
  ogImage: person.photo ? `https://symbol.ngo${person.photo}` : undefined,
  ogImageAlt: () => person.photo ? displayPerson.value.name : undefined
})
// schema.org Person: name, portrait, links, role in the team — helps search engines match the person and the photo.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: displayPerson.value.name,
      description: displayPerson.value.shortBio,
      url: `https://symbol.ngo/people/${person.slug}/`,
      image: person.photo ? `https://symbol.ngo${person.photo}` : undefined,
      jobTitle: person.teamRole ?? person.tags?.join(', '),
      sameAs: person.links?.map(link => link.url),
      affiliation: person.team ? { '@type': 'Organization', name: isEn.value ? 'NGO Symbol' : 'ГО «Символ»', url: 'https://symbol.ngo/' } : undefined
    })
  }]
})
</script>

<template>
  <article v-if="person" class="page container person-page">
    <div class="person-top">
      <Breadcrumbs :items="[{ label: t('Люди', 'People'), to: '/people' }, { label: displayPerson.name }]" />
      <ul v-if="person.tags?.length" class="person-tags" :aria-label="t('Хто це', 'Roles')">
        <li v-for="tag in person.tags" :key="tag">{{ isEn ? (tagEn[tag] ?? tag) : tag }}</li>
      </ul>
    </div>
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ person.team ? t('Команда «Символу»', 'NGO Symbol team') : t('Учасники проєктів', 'Project participants') }}<template v-if="person.teamRole"> · {{ person.teamRole }}</template></span>
      <h1>{{ displayPerson.name }}</h1>
      <p v-if="displayPerson.shortBio" class="person-lead">{{ displayPerson.shortBio }}</p>
    </div>
    <div class="project-content">
      <aside>
        <MediaImg v-if="person.photo" class="person-portrait" :src="person.photo" :alt="displayPerson.name" />
        <ul v-if="person.links?.length" class="link-list">
          <li v-for="link in person.links" :key="link.url"><SocialLink :url="link.url" :label="isSocialUrl(link.url) ? undefined : (isEn && link.label === 'Сайт' ? 'Website' : link.label)" /></li>
        </ul>
      </aside>
      <div class="project-sections">
        <section v-if="bioParagraphs.length || !displayPerson.shortBio">
          <h2 class="person-section">{{ t('Біографія', 'Biography') }}</h2>
          <RichText v-if="bioParagraphs.length" class="person-bio" :paragraphs="bioParagraphs" />
          <p v-else-if="!displayPerson.shortBio" class="empty-note">{{ t('Біографія готується.', 'Biography coming soon.') }}</p>
        </section>
        <!-- Résumé blocks (education, experience…) fold everywhere; works, projects and events fold on phones only. -->
        <section v-if="person.cv?.length" class="cv">
          <h2 class="person-section">{{ t('Резюме', 'CV') }}</h2>
          <Fold v-for="section in person.cv" :key="section.title" class="cv__section" :title="section.title" level="h3" heading-class="" :open="false">
            <ul>
              <li v-for="(item, index) in section.items" :key="index">
                <span class="cv__period">{{ item.period ?? '' }}</span>
                <span>{{ item.text }}</span>
              </li>
            </ul>
          </Fold>
        </section>
        <Fold v-if="person.works?.length" :title="isEn ? 'Works shown in NGO Symbol exhibitions' : (person.worksTitle ?? 'Роботи на виставках «Символу»')" heading-class="person-section">
          <PhotoGallery :photos="person.works" />
        </Fold>
        <Fold v-if="appearances.length" :title="t('У проєктах «Символу»', 'In NGO Symbol projects')" heading-class="person-section">
          <ul class="appearances">
            <li v-for="item in appearances" :key="item.to">
              <NuxtLink :to="localePath(item.to)">{{ appearanceTitle(item) }}</NuxtLink>
              <span>{{ appearanceByline(item.byline) }}</span>
              <span class="appearances__role">{{ item.roles.map(role => isEn ? (roleEn[role] ?? role) : role).join(', ') }}</span>
            </li>
          </ul>
        </Fold>
        <Fold v-if="personEvents.length" :title="t('Події', 'Events')" heading-class="person-section">
          <ul class="appearances">
            <li v-for="{ event, roles } in personEvents" :key="event.slug">
              <NuxtLink :to="`/events/${event.slug}`">{{ event.title }}</NuxtLink>
              <span>{{ formatRange(event.start, event.end) }} · {{ venueLine(event.venue) }}</span>
              <span class="appearances__role">{{ roles.join(', ') }}</span>
            </li>
          </ul>
        </Fold>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Who the person is: small outline labels at the top right, on the breadcrumbs line (they wrap under it on phones). */
.person-top { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 10px 24px; }
.person-tags { list-style: none; margin: 0 0 18px; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
.person-tags li { padding: 4px 12px; border: 1px solid currentColor; border-radius: 999px; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--symbol-violet); white-space: nowrap; }
@media (max-width: 720px) { .person-tags { justify-content: flex-start; } }
</style>
