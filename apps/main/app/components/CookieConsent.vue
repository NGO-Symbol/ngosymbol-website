<script setup lang="ts">
// Cookie banner, shown only when analytics is configured (data/analytics.ts) and the visitor has not chosen yet.
// «Відхилити» is as visible as «Прийняти»; the choice can be changed later from the footer («Налаштування кукі»).
const { $consent } = useNuxtApp()
const { isEn } = useLang()
const reopened = useState('consent-reopened', () => false)
// The consent plugin runs in the browser only; while the page is built on the server there is nothing to show.
const visible = computed(() => !!$consent?.enabled && ($consent.state.value === null || reopened.value))
function choose(value: 'granted' | 'denied') {
  $consent?.choose(value)
  reopened.value = false
}
</script>

<template>
  <Transition name="consent">
    <div v-if="visible" class="consent" role="dialog" :aria-label="isEn ? 'Cookies' : 'Кукі'">
      <p v-if="isEn">We would like to use cookies for anonymous visit statistics (Google Analytics, Microsoft Clarity) to make the site better. Nothing is collected until you agree.</p>
      <p v-else>Ми хотіли б використовувати кукі для анонімної статистики відвідувань (Google Analytics, Microsoft Clarity), щоб робити сайт кращим. Нічого не збирається, доки ви не погодитеся.</p>
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
.consent__buttons { display: flex; flex-wrap: wrap; gap: 10px; }
.consent__buttons .button { flex: 1 1 140px; justify-content: center; }
.consent-enter-active, .consent-leave-active { transition: opacity .3s ease, transform .35s cubic-bezier(.2, .9, .3, 1); }
.consent-enter-from, .consent-leave-to { opacity: 0; transform: translateY(16px); }
</style>
