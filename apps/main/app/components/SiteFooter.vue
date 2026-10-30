<script setup lang="ts">
import { contactEmail, socials } from '~/data/social'

const { isEn, localePath } = useLang()
const sections = ['/projects', '/events', '/opportunities', '/people', '/news', '/press', '/support']
const labels: Record<string, [string, string]> = {
  '/projects': ['Проєкти', 'Projects'], '/events': ['Події', 'Events'], '/opportunities': ['Можливості', 'Opportunities'], '/people': ['Люди', 'People'],
  '/news': ['Новини', 'News'], '/press': ['Для медіа', 'Press'], '/support': ['Підтримати', 'Support']
}
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <SymbolLogo class="footer-logo" :label="isEn ? 'NGO Symbol' : 'ГО «Символ»'" />
        <p v-if="isEn">An independent Ukrainian non-profit: contemporary art, culture and care for mental health.</p>
        <p v-else>Незалежна українська організація: сучасне мистецтво, культура й уважне ставлення до психічного здоров’я.</p>
      </div>
      <div>
        <span class="label">{{ isEn ? 'Sections' : 'Розділи' }}</span>
        <NuxtLink v-for="path in sections" :key="path" :to="localePath(path)">{{ labels[path]![isEn ? 1 : 0] }}</NuxtLink>
      </div>
      <div>
        <span class="label">{{ isEn ? 'Contact' : 'Зв’язок' }}</span>
        <a class="footer-icon-link" :href="`mailto:${contactEmail}`"><SocialIcon network="email" /><span>{{ contactEmail }}</span></a>
        <CopyValue :value="contactEmail" :en="isEn" plain button-only />
        <div class="footer-socials"><SocialLink v-for="item in socials" :key="item.url" :url="item.url" /></div>
        <NuxtLink class="footer-icon-link" :to="isEn ? '/en/events' : '/events'"><SocialIcon network="calendar" /><span>{{ isEn ? 'Events calendar' : 'Календар подій' }}</span></NuxtLink>
      </div>
      <div>
        <span class="label">{{ isEn ? 'Where we work' : 'Географія' }}</span>
        <p v-if="isEn">Kharkiv · Kyiv · Zakarpattia<br>Ukraine and international projects</p>
        <p v-else>Харків · Київ · Закарпаття<br>Україна та міжнародні проєкти</p>
        <p class="footer-small">{{ isEn ? 'Registration code (EDRPOU)' : 'ЄДРПОУ' }} <CopyValue value="45221328" :en="isEn" plain /></p>
      </div>
    </div>
  </footer>
</template>
