<script setup lang="ts">
import { dsGrouped, dsSlug } from '~/ds/registry'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
const groups = dsGrouped()
const foundations = [
  { to: '/foundations/colors', t: 'Кольори й тони' }, { to: '/foundations/typography', t: 'Типографіка' }, { to: '/foundations/spacing', t: 'Відступи й сітка' },
  { to: '/foundations/motion', t: 'Рух' }, { to: '/foundations/responsive', t: 'Телефон і десктоп' },
]
const templates = [{ to: '/templates/home', t: 'Головна' }, { to: '/templates/projects', t: 'Проєкти' }, { to: '/templates/project', t: 'Сторінка проєкту' }, { to: '/templates/about', t: 'Про нас' }, { to: '/templates/contact', t: 'Контакти' }]

// stage controls shared by every example: tone, stage width, motion
const tone = useState<string>('ds-tone', () => 'paper')
const width = useState<string>('ds-width', () => 'full')
const motion = useState<string>('ds-motion', () => 'auto')
const tones = ['paper', 'white', 'lilac', 'violet', 'apricot', 'plum']
const widths: [string, string][] = [['full', 'Повна'], ['768', '768'], ['390', '390'], ['320', '320']]
const motions: [string, string][] = [['auto', 'Авто'], ['full', 'Рух'], ['reduce', 'Без руху']]
function applyMotion() { if (import.meta.client) { if (motion.value === 'auto') document.documentElement.removeAttribute('data-motion'); else document.documentElement.dataset.motion = motion.value } }
watch(motion, applyMotion); onMounted(applyMotion)
</script>

<template>
  <div class="ds-shell">
    <a class="ds-skip" href="#ds-main">До змісту</a>
    <header class="ds-bar">
      <button class="ds-burger" type="button" :aria-expanded="open" aria-controls="ds-nav" @click="open = !open"><SymIcon :name="open ? 'close' : 'menu'" :size="26" label="Меню" /></button>
      <NuxtLink to="/" class="ds-brand"><SymMark :size="28" /><span>Дизайн-система</span></NuxtLink>
      <details class="ds-tools">
        <summary>Вигляд</summary>
        <div class="ds-tools__panel">
          <fieldset><legend>Тон сцени</legend><div class="ds-seg"><button v-for="t in tones" :key="t" type="button" :aria-pressed="tone === t" :data-tone="t" @click="tone = t"><span class="ds-dot" :data-tone="t" />{{ t }}</button></div></fieldset>
          <fieldset><legend>Ширина сцени, px</legend><div class="ds-seg"><button v-for="[v, l] in widths" :key="v" type="button" :aria-pressed="width === v" @click="width = v">{{ l }}</button></div></fieldset>
          <fieldset><legend>Рух</legend><div class="ds-seg"><button v-for="[v, l] in motions" :key="v" type="button" :aria-pressed="motion === v" @click="motion = v">{{ l }}</button></div></fieldset>
        </div>
      </details>
    </header>
    <div class="ds-body">
      <nav id="ds-nav" class="ds-nav" :data-open="open || undefined" aria-label="Дизайн-система">
        <NuxtLink to="/" class="ds-nav__top">Огляд</NuxtLink>
        <h2>Основи</h2>
        <NuxtLink v-for="f in foundations" :key="f.to" :to="f.to">{{ f.t }}</NuxtLink>
        <h2>Шаблони сторінок</h2>
        <NuxtLink v-for="f in templates" :key="f.to" :to="f.to">{{ f.t }}</NuxtLink>
        <template v-for="g in groups" :key="g.id"><h2>{{ g.title }}</h2><NuxtLink v-for="e in g.items" :key="e.name" :to="`/components/${dsSlug(e)}`">{{ e.title }}<small v-if="e.status !== 'stable'">{{ e.status }}</small></NuxtLink></template>
      </nav>
      <div v-if="open" class="ds-scrim" @click="open = false" />
      <main id="ds-main" class="ds-main"><slot /></main>
    </div>
  </div>
</template>
