<script setup lang="ts">
import { dsByName } from '~/ds/registry'
import { DS_CATEGORIES } from '../../../../../packages/ui/ds/types'

const route = useRoute()
const entry = computed(() => dsByName(String(route.params.name)))
useHead({ title: () => entry.value?.title ?? 'Компонент' })
const cat = computed(() => DS_CATEGORIES.find(c => c.id === entry.value?.category)?.title)
const sections = computed(() => [
  entry.value?.playground && { id: 'playground', t: 'Пісочниця' }, { id: 'examples', t: 'Приклади' }, entry.value?.states?.length && { id: 'states', t: 'Стани' },
  { id: 'usage', t: 'Коли' }, { id: 'api', t: 'API' }, { id: 'a11y', t: 'Доступність' },
].filter(Boolean) as { id: string; t: string }[])
</script>
<template>
  <div>
  <div v-if="entry" class="ds-page">
    <header class="ds-head">
      <span class="eyebrow">{{ cat }}</span>
      <h1>{{ entry.title }}</h1>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><code class="ds-tag">&lt;Sym{{ entry.name }}&gt;</code><span class="ds-status">{{ entry.status }}</span></div>
      <p>{{ entry.summary }}</p>
      <nav class="ds-toc" aria-label="Розділи"><a v-for="s in sections" :key="s.id" :href="`#${s.id}`">{{ s.t }}</a></nav>
    </header>
    <DsSection v-if="entry.playground" id="playground" title="Пісочниця" description="Змінюйте властивості й дивіться результат та код."><DsPlayground :key="entry.name" :entry="entry" /></DsSection>
    <DsSection id="examples" title="Приклади" description="Тон, ширину сцени й рух змінює кнопка «Вигляд» угорі."><div style="display:grid;gap:40px"><DsExample v-for="ex in entry.examples" :key="ex.file" :name="entry.name" :file="ex.file" :title="ex.title" :description="ex.description" :stage="ex.stage" /></div></DsSection>
    <DsSection v-if="entry.states?.length" id="states" title="Стани"><DsStates :entry="entry" /></DsSection>
    <DsSection id="usage" title="Коли використовувати">
      <div class="ds-do"><div data-kind="do"><h3>Використовуйте</h3><ul><li v-for="u in entry.use" :key="u">{{ u }}</li></ul></div><div data-kind="dont"><h3>Не використовуйте</h3><ul><li v-for="u in entry.avoid" :key="u">{{ u }}</li></ul></div></div>
      <p v-if="entry.related?.length" class="ds-muted">Пов’язані: <template v-for="(r, i) in entry.related" :key="r"><NuxtLink :to="`/components/${r.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`">Sym{{ r }}</NuxtLink>{{ i < entry.related.length - 1 ? ', ' : '' }}</template></p>
    </DsSection>
    <DsSection id="api" title="API" description="Згенеровано з коду компонента.">
      <DsPropsTable :key="entry.name" :component="`Sym${entry.name}`" />
      <div v-if="entry.motion?.length || entry.tokens?.length" class="ds-meta">
        <div v-if="entry.motion?.length"><h3>Рух</h3><ul><li v-for="m in entry.motion" :key="m">{{ m }}</li></ul></div>
        <div v-if="entry.tokens?.length"><h3>Токени</h3><p class="ds-tokens"><code v-for="t in entry.tokens" :key="t">{{ t }}</code></p></div>
      </div>
    </DsSection>
    <DsSection id="a11y" title="Доступність">
      <div v-if="entry.keyboard?.length" class="ds-kbd"><table><thead><tr><th>Клавіші</th><th>Дія</th></tr></thead><tbody><tr v-for="k in entry.keyboard" :key="k.keys"><td><kbd>{{ k.keys }}</kbd></td><td>{{ k.action }}</td></tr></tbody></table></div>
      <ul v-if="entry.a11y?.length" style="padding-inline-start:18px;display:grid;gap:6px"><li v-for="a in entry.a11y" :key="a">{{ a }}</li></ul>
    </DsSection>
  </div>
  <div v-else class="ds-page"><h1>Компонент не знайдено</h1><NuxtLink to="/">До огляду</NuxtLink></div>
  </div>
</template>
