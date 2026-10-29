<script setup lang="ts">
import type { DsEntry } from '../../../../packages/ui/ds/types'

const props = defineProps<{ entry: DsEntry }>()
const pg = props.entry.playground!
const values = reactive<Record<string, any>>(Object.fromEntries(Object.entries(pg.props).map(([k, c]) => [k, c.default ?? (c.type === 'boolean' ? false : c.type === 'select' ? c.options[0] : c.type === 'number' ? 0 : '')])))
const slotText = ref(pg.slot ?? '')
const tag = `Sym${props.entry.name}`
const comp = resolveComponent(tag)
const bound = computed(() => ({ ...(pg.fixed ?? {}), ...Object.fromEntries(Object.entries(values).filter(([, v]) => v !== '')) }))
const code = computed(() => {
  const attrs = Object.entries(values).filter(([, v]) => v !== false && v !== '' && v != null).map(([k, v]) => (typeof v === 'boolean' ? k : typeof v === 'number' ? `:${k}="${v}"` : `${k}="${v}"`))
  const fixed = Object.entries(pg.fixed ?? {}).map(([k, v]) => (typeof v === 'string' ? `${k}="${v}"` : `:${k}='${JSON.stringify(v)}'`))
  const all = [...fixed, ...attrs]
  const open = `<${tag}${all.length ? ' ' + all.join(' ') : ''}`
  return slotText.value ? `${open}>${slotText.value}</${tag}>` : `${open} />`
})
</script>
<template>
  <div class="ds-pg">
    <DsStage><component :is="comp" v-bind="bound"><template v-if="slotText" #default>{{ slotText }}</template></component></DsStage>
    <div class="ds-pg__controls">
      <template v-for="(c, k) in pg.props" :key="k">
        <div v-if="c.type === 'select'" class="ds-pg__row"><span>{{ k }}</span><div class="ds-seg"><button v-for="o in c.options" :key="o" type="button" :aria-pressed="values[k] === o" @click="values[k] = o">{{ o }}</button></div></div>
        <label v-else-if="c.type === 'boolean'" class="ds-pg__check"><input v-model="values[k]" type="checkbox"> {{ k }}</label>
        <label v-else-if="c.type === 'text'" class="ds-pg__row"><span>{{ k }}</span><input v-model="values[k]" type="text"></label>
        <label v-else class="ds-pg__row"><span>{{ k }}</span><input v-model.number="values[k]" type="number"></label>
      </template>
      <label v-if="pg.slot !== undefined" class="ds-pg__row"><span>текст (слот)</span><input v-model="slotText" type="text"></label>
    </div>
    <DsCode class="ds-pg__code" :code="code" />
  </div>
</template>
