<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'zoom', mode: 'out-in' } })
const route = useRoute()
const project = getProject(String(route.params.slug))

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Проєкт не знайдено' })
}

useSeoMeta({ title: `${project.title} · ${projectYears(project)}`, description: project.summary })

const projectEvents = eventsOfProject(project.slug)
const upcomingEvents = projectEvents.filter(isUpcoming)
const pastEvents = projectEvents.filter(event => !isUpcoming(event)).reverse()
const team = creditsByRole(project.people)
const partners = (project.partners ?? []).map(getOrganization).filter(Boolean)
const donors = (project.donors ?? []).map(getOrganization).filter(Boolean)
const mentions = pressOfProject(project.slug)
const calls = opportunitiesOfProject(project.slug)
const related = relatedProjects(project)
const others = projects.filter(other => other.slug !== project.slug && !related.includes(other)).slice(0, 3)
</script>

<template>
  <article v-if="project" class="project-page">
    <header class="project-hero" :class="`tone-${project.tone}`">
      <ProjectMotif class="project-hero__motif" :motif="project.motif" live />
      <div class="container">
        <Breadcrumbs :items="[{ label: 'Проєкти', to: '/projects' }, { label: project.title }]" />
        <div class="project-kicker">
          <span>{{ projectYears(project) }}</span>
          <span>{{ projectPlace(project) }}</span>
          <span>{{ statusLabels[project.status] }}</span>
          <span v-for="format in project.formats" :key="format">{{ formats[format] }}</span>
          <span v-if="project.role === 'partner'">Символ — партнер</span>
        </div>
        <h1>{{ project.title }}</h1>
        <p>{{ project.summary }}</p>
        <a v-if="project.subsiteUrl" class="button button--dark" :href="project.subsiteUrl" target="_blank" rel="noreferrer">Сайт проєкту ↗</a>
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
        <section v-if="project.body">
          <span class="label">Про проєкт</span>
          <RichText class="lead-text" :paragraphs="project.body" />
        </section>

        <section v-if="project.concept">
          <span class="label">Кураторська концепція</span>
          <RichText :paragraphs="project.concept" />
        </section>

        <section class="content-placeholder"><span>Фото та відео проєкту з’являться після відбору матеріалів</span></section>

        <section v-if="projectEvents.length">
          <span class="label">Події проєкту</span>
          <div class="event-list">
            <NuxtLink v-for="event in [...upcomingEvents, ...pastEvents]" :key="event.slug" class="event-row" :to="`/events/${event.slug}`">
              <time class="event-row__date" :datetime="event.start">{{ formatRange(event.start, event.end) }}</time>
              <span class="event-row__title">{{ event.title }}</span>
              <span class="event-row__meta"><span>{{ formats[event.format] }}</span><span>{{ venueLine(event.venue) }}</span></span>
            </NuxtLink>
          </div>
        </section>

        <section v-if="team.length">
          <span class="label">Люди</span>
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

        <section v-if="partners.length || donors.length">
          <span class="label">Партнери й донори</span>
          <div class="credits">
            <div v-if="partners.length" class="credits__group">
              <h3>Партнери</h3>
              <p>{{ partners.map(org => org!.name).join(', ') }}</p>
            </div>
            <div v-if="donors.length" class="credits__group">
              <h3>За підтримки</h3>
              <p>{{ donors.map(org => org!.name).join(', ') }}</p>
            </div>
          </div>
          <p v-if="project.donorCredit" class="donor-credit">{{ project.donorCredit }}</p>
        </section>

        <section v-if="mentions.length">
          <span class="label">Преса</span>
          <ul class="press-list">
            <li v-for="item in mentions" :key="item.url">
              <a :href="item.url" target="_blank" rel="noreferrer"><strong>{{ item.outlet }}</strong> — {{ item.title }} ↗</a>
              <span v-if="item.date">{{ formatDate(item.date) }}</span>
            </li>
          </ul>
        </section>

        <section v-if="calls.length">
          <span class="label">Можливості</span>
          <a v-for="call in calls" :key="call.slug" class="open-call" :href="call.applyUrl" target="_blank" rel="noreferrer">
            <strong>{{ call.title }}</strong><span>Дедлайн: {{ formatDate(call.deadline) }}</span><span class="open-call__cta">Подати заявку ↗</span>
          </a>
        </section>
      </div>
    </div>

    <section class="container section section--tight">
      <span class="label">{{ related.length ? 'Пов’язані проєкти' : 'Інші проєкти «Символу»' }}</span>
      <div class="project-grid">
        <ProjectCard v-for="other in (related.length ? related : others)" :key="other.slug" :project="other" />
      </div>
    </section>
  </article>
</template>
