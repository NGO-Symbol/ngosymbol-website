<script setup lang="ts">
const route = useRoute()
const person = getPerson(String(route.params.slug))

if (!person || person.hasPage === false) {
  throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })
}

const appearances = appearancesOf(person.slug)
const personEvents = eventsOfPerson(person.slug)

// The short bio is shown as the lead under the name; when the biography opens with the same sentence, it is not repeated.
const bioParagraphs = computed(() => {
  const paragraphs = [...(person.bio ?? [])]
  const lead = person.shortBio?.trim()
  if (lead && paragraphs[0]?.startsWith(lead)) {
    const rest = paragraphs[0].slice(lead.length).trim()
    if (rest) paragraphs[0] = rest
    else paragraphs.shift()
  }
  return paragraphs
})

useSeoMeta({
  title: person.name,
  description: person.shortBio ?? `${person.name} у проєктах ГО «Символ».`,
  // The portrait is the share image, so a search or a shared link shows the person's own photo.
  ogImage: person.photo ? `https://symbol.ngo${person.photo}` : undefined,
  ogImageAlt: person.photo ? person.name : undefined
})
// schema.org Person: name, portrait, links, role in the team — helps search engines match the person and the photo.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.name,
      description: person.shortBio,
      url: `https://symbol.ngo/people/${person.slug}/`,
      image: person.photo ? `https://symbol.ngo${person.photo}` : undefined,
      jobTitle: person.teamRole ?? person.tags?.join(', '),
      sameAs: person.links?.map(link => link.url),
      affiliation: person.team ? { '@type': 'Organization', name: 'ГО «Символ»', url: 'https://symbol.ngo/' } : undefined
    })
  }]
})
</script>

<template>
  <article v-if="person" class="page container person-page">
    <div class="person-top">
      <Breadcrumbs :items="[{ label: 'Люди', to: '/people' }, { label: person.name }]" />
      <ul v-if="person.tags?.length" class="person-tags" aria-label="Хто це">
        <li v-for="tag in person.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ person.team ? 'Команда «Символу»' : 'Учасники проєктів' }}<template v-if="person.teamRole"> · {{ person.teamRole }}</template></span>
      <h1>{{ person.name }}</h1>
      <p v-if="person.shortBio" class="person-lead">{{ person.shortBio }}</p>
    </div>
    <div class="project-content">
      <aside>
        <MediaImg v-if="person.photo" class="person-portrait" :src="person.photo" :alt="person.name" />
        <ul v-if="person.links?.length" class="link-list">
          <li v-for="link in person.links" :key="link.url"><SocialLink :url="link.url" :label="isSocialUrl(link.url) ? undefined : link.label" /></li>
        </ul>
      </aside>
      <div class="project-sections">
        <section v-if="bioParagraphs.length || !person.shortBio">
          <h2 class="person-section">Біографія</h2>
          <RichText v-if="bioParagraphs.length" class="person-bio" :paragraphs="bioParagraphs" />
          <p v-else-if="!person.shortBio" class="empty-note">Біографія готується.</p>
        </section>
        <section v-if="person.cv?.length" class="cv">
          <h2 class="person-section">Резюме</h2>
          <div v-for="section in person.cv" :key="section.title" class="cv__section">
            <h3>{{ section.title }}</h3>
            <ul>
              <li v-for="(item, index) in section.items" :key="index">
                <span class="cv__period">{{ item.period ?? '' }}</span>
                <span>{{ item.text }}</span>
              </li>
            </ul>
          </div>
        </section>
        <section v-if="person.works?.length">
          <h2 class="person-section">{{ person.worksTitle ?? 'Роботи на виставках «Символу»' }}</h2>
          <PhotoGallery :photos="person.works" />
        </section>
        <section v-if="appearances.length">
          <h2 class="person-section">У проєктах «Символу»</h2>
          <ul class="appearances">
            <li v-for="item in appearances" :key="item.to">
              <NuxtLink :to="item.to">{{ item.title }}</NuxtLink>
              <span>{{ item.byline }}</span>
              <span class="appearances__role">{{ item.roles.join(', ') }}</span>
            </li>
          </ul>
        </section>
        <section v-if="personEvents.length">
          <h2 class="person-section">Події</h2>
          <ul class="appearances">
            <li v-for="{ event, roles } in personEvents" :key="event.slug">
              <NuxtLink :to="`/events/${event.slug}`">{{ event.title }}</NuxtLink>
              <span>{{ formatRange(event.start, event.end) }} · {{ venueLine(event.venue) }}</span>
              <span class="appearances__role">{{ roles.join(', ') }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Who the person is: small outline labels at the top right, on the breadcrumbs line (they wrap under it on phones). */
.person-top { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 10px 24px; }
.person-tags { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
.person-tags li { padding: 4px 12px; border: 1px solid currentColor; border-radius: 999px; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--symbol-violet); white-space: nowrap; }
@media (max-width: 720px) { .person-tags { justify-content: flex-start; } }
</style>
