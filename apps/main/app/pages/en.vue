<script setup lang="ts">
// First English page: who we are and what we did, for international donors and partners.
// The full English version (/en/... for every page) is still an open question in the knowledge base.
import { contactEmail, socials } from '~/data/social'

definePageMeta({ pageTransition: { name: 'zoom', mode: 'out-in' } })
useHead({ htmlAttrs: { lang: 'en' } })
useSeoMeta({ title: 'NGO Symbol', description: 'Independent Ukrainian NGO from Kharkiv: contemporary art, culture, and care for mental health.' })

const en: Record<string, { title: string; summary: string }> = {
  'istoriia-moiei-vulytsi': { title: 'The Story of My Street', summary: 'Plaques with QR codes on Kharkiv streets and a page for every street: the stories the city tells about itself.' },
  'holosy-u-rusi': { title: 'Voices in Motion', summary: 'Playback theatre in Zakarpattia, co-funded by Culture Helps Solidarity (European Cultural Foundation, Creative Europe).' },
  'ti-khto-pobachyly-svit': { title: 'The Ones Who Saw the World', summary: 'Photographs by Petro Chekal and Yurii Rassokha at the Festival of Ukrainian Books in Milan.' },
  'pokazhit-svoi-dokumenty': { title: 'May I See Your Documents?..', summary: 'An exhibition about the document as an art phenomenon: 20 artists at YermilovCentre, Kharkiv.' },
  'istorii-riznykh': { title: 'Stories of Different People', summary: 'A playback performance where actors played back the stories of the audience.' },
  'mhgap-kyiv': { title: 'mhGAP Trainings in Kyiv Region', summary: 'WHO mhGAP training for primary care workers: 121 certified participants.' },
  '2-10-300': { title: '2, 10, 300 Years Later', summary: 'An open-air exhibition of artists from eastern Ukraine in Balassagyarmat, Hungary.' },
  'kharkivske-more': { title: 'Kharkiv Sea', summary: 'An independent festival of local culture in Kharkiv. Symbol is a partner.' },
  'zbyrach-konvalii': { title: 'The Lily of the Valley Collector', summary: 'A documentary about Oleksandr Suprun, photographer of the Kharkiv School of Photography.' }
}
const list = [...projects].sort((a, b) => b.yearStart - a.yearStart)
</script>

<template>
  <div lang="en">
    <section class="home-hero container">
      <div class="home-hero__text">
        <div class="eyebrow">Kharkiv · art · mental health</div>
        <h1>Space for attention and contemporary culture</h1>
        <p>NGO Symbol is an independent Ukrainian non-profit founded in Kharkiv in 2023. We make exhibitions, documentary film, playback theatre and mental health programmes — from Kharkiv to Zakarpattia and abroad.</p>
        <div class="button-row">
          <a class="button button--dark" href="#projects">Our projects</a>
          <NuxtLink class="button" to="/support">Support us</NuxtLink>
        </div>
      </div>
      <ProjectOrbit class="home-hero__orbit" />
    </section>

    <StatsCounters />

    <section id="projects" class="section container">
      <div class="section-heading">
        <div><span class="label">Projects</span><h2>What we have done</h2></div>
        <p>Project pages are in Ukrainian for now; an English version is in progress.</p>
      </div>
      <ul class="en-projects">
        <li v-for="project in list" :key="project.slug">
          <NuxtLink :to="`/projects/${project.slug}`">
            <span class="en-projects__year">{{ projectYears(project) }}</span>
            <strong>{{ en[project.slug]?.title ?? project.title }}</strong>
            <span>{{ en[project.slug]?.summary ?? project.summary }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="subscribe">
      <div class="container subscribe__grid">
        <h2>Get in touch</h2>
        <div class="subscribe__links">
          <span class="selectable">{{ contactEmail }}</span>
          <a v-for="item in socials" :key="item.label" :href="item.url" target="_blank" rel="noreferrer">{{ item.label }} ↗</a>
          <p>Registration code (EDRPOU) 45221328.</p>
        </div>
      </div>
    </section>
  </div>
</template>
