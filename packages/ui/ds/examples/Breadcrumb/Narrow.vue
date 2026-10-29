<script setup lang="ts">
const items = [
  { label: 'Головна', to: '/' },
  { label: 'Проєкти', to: '/components/card' },
  { label: 'Історія вулиці' },
]
</script>

<template>
  <SymStack>
    <p class="sym-t-body-sm sym-muted">У вузькому контейнері (до ~34 rem) ланцюжок згортається до одного посилання «← батьківська сторінка».</p>
    <div style="max-width: 300px"><SymBreadcrumb :items="items" /></div>
    <div style="max-width: 300px"><SymBreadcrumb :items="[{ label: 'Головна' }, { label: 'Про нас' }]" /></div>
  </SymStack>
</template>
