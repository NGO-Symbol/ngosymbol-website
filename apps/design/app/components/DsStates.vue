<script setup lang="ts">
import type { DsEntry } from '../../../../packages/ui/ds/types'

const props = defineProps<{ entry: DsEntry }>()
const comp = resolveComponent(`Sym${props.entry.name}`)
</script>
<template>
  <DsStage>
    <div class="ds-states"><figure v-for="s in entry.states" :key="s.label"><component :is="comp" v-bind="{ ...(entry.playground?.fixed ?? {}), ...s.props }"><template v-if="s.slot" #default>{{ s.slot }}</template></component><figcaption>{{ s.label }}</figcaption></figure></div>
  </DsStage>
</template>
