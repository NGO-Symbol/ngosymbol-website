<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'blur', mode: 'out-in' } })
const route = useRoute()
const person = getPerson(String(route.params.slug))

if (!person || person.hasPage === false) {
  throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })
}

const appearances = appearancesOf(person.slug)

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

useSeoMeta({ title: person.name, description: person.shortBio ?? `${person.name} у проєктах ГО «Символ».` })
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: person.name, description: person.shortBio })
  }]
})
</script>

<template>
  <article v-if="person" class="page container person-page">
    <Breadcrumbs :items="[{ label: 'Люди', to: '/people' }, { label: person.name }]" />
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ person.team ? 'Команда «Символу»' : 'Учасники проєктів' }}<template v-if="person.teamRole"> · {{ person.teamRole }}</template></span>
      <h1>{{ person.name }}</h1>
      <p v-if="person.shortBio" class="person-lead">{{ person.shortBio }}</p>
    </div>
    <div class="project-content">
      <aside>
        <img v-if="person.photo" class="person-portrait" :src="person.photo" :alt="person.name">
        <ul v-if="person.links?.length" class="link-list">
          <li v-for="link in person.links" :key="link.url"><a :href="link.url" target="_blank" rel="noreferrer">{{ link.label }} ↗</a></li>
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
      </div>
    </div>
  </article>
</template>
