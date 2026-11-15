<script setup lang="ts">
import SymPortraitArt from '@symbol/ui/app/components/PortraitArt.vue'
import { psdPeopleEn } from '~/data/psd-artists-en'
import { peopleEn } from '~/data/people-en'
import { projectsEn } from '~/data/projects-en'
import { eventsEn } from '~/data/events-en'

const route = useRoute()
const person = getPerson(String(route.params.slug))
const { isEn, localePath } = useLang()

if (!person || person.hasPage === false) {
  throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })
}

const appearances = appearancesOf(person.slug)
const personEvents = eventsOfPerson(person.slug)
const approved = computed(() => isEn.value ? psdPeopleEn[person.slug] : undefined)
const generalEn = computed(() => isEn.value ? peopleEn[person.slug] : undefined)
const displayPerson = computed(() => {
  // Approved catalogue copy: the lead comes from the short English line when there is one, so the biography keeps
  // its own section as on the Ukrainian page.
  if (approved.value) return { ...person, name: approved.value.name, shortBio: generalEn.value?.shortBio ?? (approved.value.bio.length > 1 ? approved.value.bio[0] : undefined), bio: approved.value.bio, cv: undefined, teamRole: generalEn.value?.teamRole ?? person.teamRole }
  if (generalEn.value) return { ...person, ...generalEn.value, bio: generalEn.value.bio ?? (generalEn.value.shortBio ? [generalEn.value.shortBio] : undefined), cv: generalEn.value.cv }
  return person
})
const t = (uk: string, en: string) => isEn.value ? en : uk
const tagEn: Record<string, string> = {
  'Художник': 'Artist', 'Художниця': 'Artist', 'Художник-графік': 'Graphic artist', 'Митець': 'Artist', 'Мисткиня': 'Artist',
  'Фотограф': 'Photographer', 'Дизайнер': 'Designer', 'Дизайнерка': 'Designer', 'Кураторка': 'Curator', 'Астроном': 'Astronomer',
  'Артменеджерка': 'Art manager', 'Менеджер проєктів': 'Project manager', 'Куратор': 'Curator',
  'ЄрміловЦентр': 'YermilovCentre', 'Ілюстраторка': 'Illustrator', 'Історик архітектури': 'Architectural historian',
  'Акторка плейбек-театру': 'Playback theatre actor', 'Архітектор': 'Architect', 'Звукорежисер': 'Sound engineer',
  'Каліграф': 'Calligrapher', 'Митець піксель-арту': 'Pixel artist', 'Оператор': 'Cinematographer', 'Психологиня': 'Psychologist',
  'Режисерка': 'Director', 'Типограф': 'Type designer', 'Тренер mhGAP': 'mhGAP trainer', 'Тренерка mhGAP': 'mhGAP trainer',
  'Фотографка': 'Photographer', 'Фуд-дизайнерка': 'Food designer', 'Художниця-графікиня': 'Graphic artist'
}
const roleEn: Record<string, string> = { 'Митці': 'Artists', 'Згадка': 'Mention', 'Куратори': 'Curators', 'Фотографи': 'Photographers' }
const appearanceTitle = (item: (typeof appearances)[number]) => {
  if (!isEn.value) return item.title
  const slug = item.to.match(/\/projects\/([^/]+)/)?.[1]
  return (slug && projectsEn[slug]?.title) || item.title
}
const appearanceByline = (byline: string) => {
  if (!isEn.value) return byline
  const placeMap: Record<string, string> = { 'Харків': 'Kharkiv', 'Київ': 'Kyiv', 'Київська область': 'Kyiv Region', 'Закарпаття': 'Zakarpattia', 'Мілан': 'Milan', 'Балашшадьярмат': 'Balassagyarmat' }
  const parts = byline.split(' · ')
  return `${parts[0]} · ${placeMap[parts[1] ?? ''] ?? parts[1] ?? ''}`
}

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

const pageUrl = computed(() => pageUrlOf(`/people/${person.slug}`, isEn.value))
const portraitUrl = person.photo ? `${SITE}${person.photo}` : undefined
const portraitId = `${pageUrl.value}#primary-image`
const personId = `${pageUrl.value}#person`
const tagLine = computed(() => person.tags?.map(tag => (isEn.value ? tagEn[tag] ?? tag : tag)).join(', '))

// A short line («Митець піксель-арту.») is a poor search snippet: it is completed with the name and the projects the person took part in.
const personDescription = computed(() => {
  const lead = displayPerson.value.shortBio
  const titles = appearances.slice(0, 3).map(appearanceTitle).join(', ')
  if (lead && lead.length >= 60) return lead
  const projectsLine = titles ? t(` Проєкти ГО «Символ»: ${titles}.`, ` NGO Symbol projects: ${titles}.`) : ''
  return lead ? `${displayPerson.value.name}: ${lead}${projectsLine}` : t(`${displayPerson.value.name} у проєктах ГО «Символ».${projectsLine}`, `${displayPerson.value.name} in NGO Symbol projects.${projectsLine}`)
})
usePageSeo({
  title: () => displayPerson.value.name,
  description: () => personDescription.value,
  // The portrait is the share image, so a search or a shared link shows the person's own photo.
  image: person.photo,
  imageAlt: () => (person.photo ? displayPerson.value.name : undefined),
  type: 'profile'
})
// ProfilePage + ImageObject explicitly make the portrait the representative image of this exact profile.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => ldJson({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          '@id': pageUrl.value,
          url: pageUrl.value,
          inLanguage: isEn.value ? 'en' : 'uk',
          name: displayPerson.value.name,
          primaryImageOfPage: portraitUrl ? { '@id': portraitId } : undefined,
          mainEntity: { '@id': personId }
        },
        portraitUrl ? {
          '@type': 'ImageObject',
          '@id': portraitId,
          contentUrl: portraitUrl,
          url: portraitUrl,
          caption: displayPerson.value.name,
          representativeOfPage: true
        } : undefined,
        {
          '@type': 'Person',
          '@id': personId,
          name: displayPerson.value.name,
          description: displayPerson.value.shortBio,
          url: pageUrl.value,
          image: portraitUrl ? { '@id': portraitId } : undefined,
          jobTitle: displayPerson.value.teamRole ?? tagLine.value,
          sameAs: person.links?.map(link => link.url),
          affiliation: person.team ? orgRef(isEn.value) : undefined
        }
      ].filter(Boolean)
    })
  }]
})
</script>

<template>
  <article v-if="person" class="page container person-page">
    <div class="person-top">
      <Breadcrumbs />
      <ul v-if="person.tags?.length" class="person-tags" :aria-label="t('Хто це', 'Roles')">
        <li v-for="tag in person.tags" :key="tag">{{ isEn ? (tagEn[tag] ?? tag) : tag }}</li>
      </ul>
    </div>
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ person.team ? t('Команда «Символу»', 'NGO Symbol team') : t('Учасники проєктів', 'Project participants') }}<template v-if="displayPerson.teamRole"> · {{ displayPerson.teamRole }}</template></span>
      <h1>{{ displayPerson.name }}</h1>
      <p v-if="displayPerson.shortBio" class="person-lead">{{ displayPerson.shortBio }}</p>
    </div>
    <div class="project-content">
      <aside>
        <MediaImg v-if="person.photo" class="person-portrait" :src="person.photo" :alt="displayPerson.name" priority />
        <SymPortraitArt v-else class="person-portrait" :seed="person.slug" />
        <ul v-if="person.links?.length" class="link-list">
          <li v-for="link in person.links" :key="link.url"><SocialLink :url="link.url" :label="isSocialUrl(link.url) ? undefined : translate(link.label, isEn)" /></li>
        </ul>
      </aside>
      <div class="project-sections">
        <section v-if="bioParagraphs.length || !displayPerson.shortBio">
          <h2 class="person-section">{{ t('Біографія', 'Biography') }}</h2>
          <RichText v-if="bioParagraphs.length" class="person-bio" :paragraphs="bioParagraphs" />
          <p v-else-if="!displayPerson.shortBio" class="empty-note">{{ t('Біографія готується.', 'Biography coming soon.') }}</p>
        </section>
        <!-- Résumé blocks (education, experience…) fold everywhere; works, projects and events fold on phones only. -->
        <section v-if="displayPerson.cv?.length" class="cv">
          <h2 class="person-section">{{ t('Резюме', 'CV') }}</h2>
          <Fold v-for="section in displayPerson.cv" :key="section.title" class="cv__section" :title="section.title" level="h3" heading-class="" :open="false">
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
              <span class="appearances__role">{{ item.roles.map(role => isEn ? (roleEn[role] ?? translate(role, true)) : role).join(', ') }}</span>
            </li>
          </ul>
        </Fold>
        <Fold v-if="personEvents.length" :title="t('Події', 'Events')" heading-class="person-section">
          <ul class="appearances">
            <li v-for="{ event, roles } in personEvents" :key="event.slug">
              <NuxtLink :to="`/events/${event.slug}`">{{ isEn ? eventsEn[event.slug]?.title ?? event.title : event.title }}</NuxtLink>
              <span>{{ isEn ? formatRangeEn(event.start, event.end) : formatRange(event.start, event.end) }} · {{ venueLineIn(event.venue, isEn) }}</span>
              <span class="appearances__role">{{ roles.map(role => isEn ? translate(role, true) : role).join(', ') }}</span>
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
