<script setup lang="ts">
const { isEn } = useLang()
const t = (uk: string, en: string) => isEn.value ? en : uk
</script>

<template>
  <section class="support-band">
    <div class="container support-band__grid">
      <div>
        <span class="label">{{ t('Доєднатися і підтримати', 'Join and support') }}</span>
        <h2>{{ t('Мистецтво, яке підтримує людей, тримається на спільноті.', 'Art that supports people is held up by its community.') }}</h2>
      </div>
      <div class="support-band__side">
        <p>{{ t('Ваша підтримка допомагає робити виставки, фільми й плейбек-перформанси та проводити програми психічного здоров’я в Харкові й по всій Україні.', 'Your support helps us make exhibitions, films and playback performances and run mental health programmes in Kharkiv and across Ukraine.') }}</p>
        <div class="button-row">
          <NuxtLink class="button button--dark" to="/support">{{ t('Підтримати «Символ»', 'Support Symbol') }}</NuxtLink>
          <NuxtLink class="button" to="/support#community">{{ t('Доєднатися до спільноти', 'Join the community') }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
