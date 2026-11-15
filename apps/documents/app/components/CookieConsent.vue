<script setup lang="ts">
// Cookie banner of the exhibition site, in its own style (ink and paper, mono type). Same rules as symbol.ngo: shown only on
// the production site when a tool that needs consent is configured and the visitor has not chosen yet; the footer control
// «Налаштування кукі» reopens it. The ids come from the main site (#symbol/analytics).
const { $consent } = useNuxtApp()
const { isEn } = useLang()
const reopened = useState('consent-reopened', () => false)
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const visible = computed(() => mounted.value && !!$consent?.enabled && ($consent.state.value === null || reopened.value))
const tools = computed(() => ($consent?.tools ?? []).join(', '))
const privacyHref = computed(() => `${SYMBOL}${isEn.value ? '/en' : ''}/privacy/`)
function choose(value: 'granted' | 'denied') {
  $consent?.choose(value)
  reopened.value = false
}
</script>

<template>
  <Transition name="consent">
    <div v-if="visible" class="docs-consent" role="dialog" :aria-label="isEn ? 'Cookies' : 'Кукі'">
      <p v-if="isEn">We would like to use cookies for anonymous visit statistics ({{ tools }}) to make the site better. Nothing is collected until you agree. <a :href="privacyHref">Privacy and cookies</a></p>
      <p v-else>Ми хотіли б використовувати кукі для анонімної статистики відвідувань ({{ tools }}), щоб робити сайт кращим. Нічого не збирається, доки ви не погодитеся. <a :href="privacyHref">Конфіденційність і кукі</a></p>
      <div class="docs-consent__buttons">
        <button type="button" class="docs-button" @click="choose('granted')">{{ isEn ? 'Accept' : 'Прийняти' }}</button>
        <button type="button" class="docs-button" @click="choose('denied')">{{ isEn ? 'Decline' : 'Відхилити' }}</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.docs-consent { position: fixed; z-index: 80; left: 16px; right: 16px; bottom: max(16px, env(safe-area-inset-bottom)); max-width: 560px; margin-inline: auto; display: grid; gap: 14px; padding: 16px 18px; background: var(--docs-sheet); color: var(--docs-ink); border: 2px solid var(--docs-ink); box-shadow: 6px 6px 0 var(--docs-stamp); font-family: var(--docs-mono); font-size: .85rem; line-height: 1.55; }
.docs-consent p { margin: 0; }
.docs-consent a { color: inherit; text-underline-offset: 3px; }
.docs-consent__buttons { display: flex; flex-wrap: wrap; gap: 12px; }
.docs-consent__buttons .docs-button { flex: 1 1 130px; justify-content: center; border: 0; cursor: pointer; font-size: 1.05rem; }
/* On phones the folder tabs fill the bottom edge: the banner sits above them. */
@media (max-width: 640px) { .docs-consent { bottom: calc(64px + env(safe-area-inset-bottom)); } }
.consent-enter-active, .consent-leave-active { transition: opacity .25s ease, transform .3s ease; }
.consent-enter-from, .consent-leave-to { opacity: 0; transform: translateY(14px); }
</style>
