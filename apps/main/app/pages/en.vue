<script setup lang="ts">
// First English page: who we are and what we did, for international donors and partners.
// Every other page has an English mirror under /en/... (ADR-0009).
import { contactEmail, socials } from '~/data/social'
import { projectsEn as en } from '~/data/projects-en'

useHead({ htmlAttrs: { lang: 'en' } })
useSeoMeta({ title: 'NGO Symbol', description: 'Independent Ukrainian NGO from Kharkiv: contemporary art, culture, and care for mental health.' })

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
          <NuxtLink class="button" to="/en/support">Support us</NuxtLink>
        </div>
      </div>
      <ProjectOrbit class="home-hero__orbit" />
    </section>

    <StatsCounters />

    <section id="projects" class="section container">
      <div class="section-heading">
        <div><span class="label">Projects</span><h2>What we have done</h2></div>
        <p>Project titles are in English; the full project texts are being translated.</p>
      </div>
      <ul class="en-projects">
        <li v-for="project in list" :key="project.slug">
          <NuxtLink :to="`/en/projects/${project.slug}`">
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
          <CopyValue :value="contactEmail" en />
          <SocialLink v-for="item in socials" :key="item.url" :url="item.url" />
          <p>Registration code (EDRPOU) <CopyValue value="45221328" en /></p>
        </div>
      </div>
    </section>
  </div>
</template>
