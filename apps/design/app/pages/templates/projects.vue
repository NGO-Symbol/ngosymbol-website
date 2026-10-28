<script setup lang="ts">
import { projects, directions } from '~/data/fixtures'
definePageMeta({ layout: 'site' })
useHead({ title: 'Шаблон: Проєкти' })
const filter = ref('')
const shown = computed(() => projects.filter(p => !filter.value || p.direction.startsWith(filter.value)))
</script>
<template>
  <div>
  <SymSection space="md">
    <SymStack gap="xl">
      <SymPageHeader eyebrow="Архів і поточне" title="Проєкти" lead="Невеликі проєкти мають сторінки на нашому сайті, великі — власні простори." flush />
      <SymFilterBar v-model="filter" label="Напрям проєкту" all="Усі" :options="directions.map(d => ({ value: d, label: d }))" />
      <SymGrid v-if="shown.length" :cols="3">
        <SymProjectCard v-for="p in shown" :key="p.title" v-bind="p" />
      </SymGrid>
      <SymEmptyState v-else title="Поки немає проєктів у цьому напрямі" text="Спробуйте інший напрям або скиньте фільтр.">
        <template #actions><SymButton variant="outline" @click="filter = ''">Показати всі</SymButton></template>
      </SymEmptyState>
    </SymStack>
  </SymSection>
  </div>
</template>
