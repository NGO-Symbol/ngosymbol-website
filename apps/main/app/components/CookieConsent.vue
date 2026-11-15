<script setup lang="ts">
// Cookie banner, shown only to real visitors of the production site (packages/brand/analytics) when a tool that needs
// consent is configured (data/analytics.ts) and the visitor has not chosen yet. «Відхилити» is as visible as
// «Прийняти»; the choice can be changed later from the footer («Налаштування кукі»), which reopens this banner.
const { $consent } = useNuxtApp()
const { isEn, localePath } = useLang()
const reopened = useState('consent-reopened', () => false)
// The consent plugin runs in the browser only; the banner is drawn after hydration so server and browser agree.
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const visible = computed(() => mounted.value && !!$consent?.enabled && ($consent.state.value === null || reopened.value))
const tools = computed(() => ($consent?.tools ?? []).join(', '))
function choose(value: 'granted' | 'denied') {
  $consent?.choose(value)
  reopened.value = false
}
</script>

<template>
  <Transition name="consent">
    <div v-if="visible" class="consent" role="dialog" :aria-label="isEn ? 'Cookies' : 'Кукі'">
      <p v-if="isEn">We would like to use cookies for anonymous visit statistics ({{ tools }}) to make the site better. Nothing is collected until you agree. <NuxtLink :to="localePath('/privacy')">Privacy and cookies</NuxtLink></p>
      <p v-else>Ми хотіли б використовувати кукі для анонімної статистики відвідувань ({{ tools }}), щоб робити сайт кращим. Нічого не збирається, доки ви не погодитеся. <NuxtLink :to="localePath('/privacy')">Конфіденційність і кукі</NuxtLink></p>
      <div class="consent__buttons">
        <button type="button" class="button button--dark" @click="choose('granted')">{{ isEn ? 'Accept' : 'Прийняти' }}</button>
        <button type="button" class="button button--dark" @click="choose('denied')">{{ isEn ? 'Decline' : 'Відхилити' }}</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.consent { position: fixed; z-index: 80; left: 16px; right: 16px; bottom: max(16px, env(safe-area-inset-bottom)); max-width: 560px; margin-inline: auto; display: grid; gap: 12px; padding: 16px 18px; background: var(--symbol-cream); color: var(--symbol-plum); border: 1px solid var(--symbol-plum); box-shadow: 8px 8px 0 var(--symbol-violet); font-size: .9rem; line-height: 1.5; }
.consent p { margin: 0; }
.consent a { text-underline-offset: 4px; text-decoration-color: var(--symbol-violet); }
.consent__buttons { display: flex; flex-wrap: wrap; gap: 10px; }
.consent__buttons .button { flex: 1 1 140px; justify-content: center; }
.consent-enter-active, .consent-leave-active { transition: opacity .3s ease, transform .35s cubic-bezier(.2, .9, .3, 1); }
.consent-enter-from, .consent-leave-to { opacity: 0; transform: translateY(16px); }
</style>
