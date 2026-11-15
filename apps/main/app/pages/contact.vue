<script setup lang="ts">
import { contactEmail, socials } from '~/data/social'
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
usePageSeo({ title: () => t('Контакти: партнерство, проєкти, преса', 'Contact: partnerships, projects, press'), description: () => t('Напишіть ГО «Символ» (Харків) про партнерство, спільний проєкт чи матеріали для преси: ngo.symbol@gmail.com, Instagram, Telegram, Facebook, LinkedIn.', 'Write to NGO Symbol (Kharkiv) about a partnership, a joint project or press materials: ngo.symbol@gmail.com, Instagram, Telegram, Facebook, LinkedIn.') })
// schema.org ContactPage: the organisation (same id as on the home page) with its e-mail and official channels.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: () => ldJson({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${pageUrlOf('/contact', isEn.value)}#contact`,
      url: pageUrlOf('/contact', isEn.value),
      name: t('Контакти', 'Contact'),
      inLanguage: isEn.value ? 'en' : 'uk',
      isPartOf: { '@id': websiteId(isEn.value) },
      mainEntity: {
        ...orgRef(isEn.value),
        email: contactEmail,
        sameAs: socials.map(item => item.url),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: t('партнерство, проєкти, преса', 'partnerships, projects, press'),
          email: contactEmail,
          availableLanguage: ['uk', 'en']
        }
      }
    })
  }]
})
</script>

<template>
  <section class="contact-page">
    <div class="container">
      <span class="eyebrow">{{ t('Партнерство · підтримка · спільні ідеї', 'Partnerships · support · shared ideas') }}</span>
      <h1>{{ t('Поговорімо про майбутній проєкт', 'Let’s talk about a future project') }}</h1>
      <p class="contact-lead">{{ t('ГО «Символ» — громадська організація з Харкова. Напишіть нам про партнерство, спільний проєкт, волонтерство чи матеріали для преси.', 'NGO Symbol is a non-profit from Kharkiv. Write to us about partnership, a joint project, volunteering or press materials.') }}</p>
      <div class="contact-links">
        <CopyValue :value="contactEmail" :en="isEn"><a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a></CopyValue>
        <SocialLink v-for="item in socials" :key="item.url" :url="item.url" />
      </div>
      <p>{{ t('Корпоративна пошта з’явиться після налаштування Google Workspace для неприбуткових організацій.', 'An organisation email address will be added after Google Workspace for Nonprofits is configured.') }}</p>
    </div>
  </section>
</template>
