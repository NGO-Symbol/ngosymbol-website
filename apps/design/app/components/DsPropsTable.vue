<script setup lang="ts">
import { dsMeta } from '~/ds/registry'

const props = defineProps<{ component: string }>()
const m = computed(() => dsMeta[props.component])
</script>
<template>
  <div v-if="m && !m.error" class="ds-api">
    <div v-if="m.props?.length" class="ds-api__scroll" tabindex="0" role="region" aria-label="Таблиця властивостей"><table><thead><tr><th>Властивість</th><th>Тип</th><th>За замовчуванням</th><th>Опис</th></tr></thead>
      <tbody><tr v-for="p in m.props" :key="p.name"><td><code>{{ p.name }}</code><b v-if="p.required"> *</b></td><td><code>{{ p.type }}</code></td><td><code v-if="p.default">{{ p.default }}</code></td><td>{{ p.description }}</td></tr></tbody></table></div>
    <p v-else class="ds-muted">Немає властивостей.</p>
    <div v-if="m.slots?.length"><h3>Слоти</h3><ul><li v-for="s in m.slots" :key="s.name"><code>{{ s.name }}</code> {{ s.description }}</li></ul></div>
    <div v-if="m.events?.length"><h3>Події</h3><ul><li v-for="e in m.events" :key="e.name"><code>{{ e.name }}</code> {{ e.description }}</li></ul></div>
  </div>
  <p v-else class="ds-muted">Таблицю API ще не згенеровано: <code>pnpm ds:meta</code>.</p>
</template>
