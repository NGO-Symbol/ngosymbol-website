<script setup lang="ts">
useSeoMeta({ title: 'Люди', description: 'Митці, куратори, лектори й команда проєктів ГО «Символ».' })

const query = ref('')
const listed = people
  .filter(person => person.hasPage !== false)
  .map(person => ({ person, appearances: appearancesOf(person.slug) }))
  .sort((a, b) => a.person.name.localeCompare(b.person.name, 'uk'))

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? listed.filter(({ person }) => person.name.toLowerCase().includes(q)) : listed
})

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')
</script>

<template>
  <section class="page container">
    <div class="page-title">
      <span class="eyebrow">Автори · митці · команда</span>
      <h1>Люди</h1>
      <p>Усі, хто створював проєкти «Символу». На сторінці кожної людини — проєкти й події, у яких вона брала участь.</p>
    </div>
    <label class="search">
      <span class="label">Пошук за ім’ям</span>
      <input id="people-search" v-model="query" type="search" placeholder="Наприклад, Маков">
    </label>
    <ul class="people-grid">
      <li v-for="{ person, appearances } in visible" :key="person.slug">
        <NuxtLink class="person-card" :to="`/people/${person.slug}`">
          <span class="person-card__avatar" aria-hidden="true">{{ initials(person.name) }}</span>
          <span class="person-card__name">{{ person.name }}</span>
          <span v-if="person.team" class="person-card__team">Команда «Символу»</span>
          <span class="person-card__projects">{{ appearances.map(item => item.title).join(' · ') }}</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
