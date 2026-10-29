<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'blur', mode: 'out-in' } })
const route = useRoute()
const person = getPerson(String(route.params.slug))

if (!person || person.hasPage === false) {
  throw createError({ statusCode: 404, statusMessage: 'Сторінку не знайдено' })
}

const appearances = appearancesOf(person.slug)

useSeoMeta({ title: person.name, description: person.shortBio ?? `${person.name} у проєктах ГО «Символ».` })
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: person.name, description: person.shortBio })
  }]
})
</script>

<template>
  <article v-if="person" class="page container">
    <Breadcrumbs :items="[{ label: 'Люди', to: '/people' }, { label: person.name }]" />
    <div class="page-title page-title--wide">
      <span class="eyebrow">{{ person.team ? 'Команда «Символу»' : 'Учасники проєктів' }}<template v-if="person.teamRole"> · {{ person.teamRole }}</template></span>
      <h1>{{ person.name }}</h1>
    </div>
    <div class="project-content">
      <aside>
        <img v-if="person.photo" class="person-portrait" :src="person.photo" :alt="person.name">
        <ul v-if="person.links?.length" class="link-list">
          <li v-for="link in person.links" :key="link.url"><a :href="link.url" target="_blank" rel="noreferrer">{{ link.label }} ↗</a></li>
        </ul>
      </aside>
      <div class="project-sections">
        <section>
          <span class="label">Біографія</span>
          <RichText v-if="person.bio" class="lead-text" :paragraphs="person.bio" />
          <p v-else class="empty-note">Біографія готується.</p>
        </section>
        <section v-if="person.cv?.length" class="cv">
          <span class="label">CV</span>
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
          <span class="label">У проєктах «Символу»</span>
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
