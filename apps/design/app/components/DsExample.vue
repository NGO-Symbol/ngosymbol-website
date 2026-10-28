<script setup lang="ts">
import { loadExample, loadExampleSource } from '~/ds/registry'

const props = defineProps<{ name: string; file: string; title: string; description?: string; stage?: boolean }>()
const loader = loadExample(props.name, props.file)
const Comp = loader ? defineAsyncComponent(loader as any) : null
const showCode = ref(false)
const source = ref('')
watch(showCode, async (v) => { if (v && !source.value) source.value = (await loadExampleSource(props.name, props.file)?.()) ?? '// не знайдено' })
const replay = ref(0)
</script>
<template>
  <article class="ds-ex">
    <header>
      <div><h3>{{ title }}</h3><p v-if="description">{{ description }}</p></div>
      <div class="ds-ex__tools"><button type="button" @click="replay++">Повторити</button><button type="button" :aria-pressed="showCode" @click="showCode = !showCode">Код</button></div>
    </header>
    <DsStage :bare="stage === false"><component :is="Comp" v-if="Comp" :key="replay" /><p v-else>Приклад не знайдено: {{ name }}/{{ file }}</p></DsStage>
    <DsCode v-if="showCode" :code="source" />
  </article>
</template>
