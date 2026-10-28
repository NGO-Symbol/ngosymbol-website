<script setup lang="ts">
const list = ['top-right', 'bottom-left'] as const
</script>

<template>
  <div style="display:grid;gap:16px">
    <SymSection v-for="a in list" :key="a" tone="paper" space="lg" clip rule="both"><template #decor><SymOrbit :anchor="a" size="lg" :bleed="0.35" :soft="false" /></template><SymText>anchor="{{ a }}" bleed 0.35</SymText></SymSection>
  </div>
</template>
