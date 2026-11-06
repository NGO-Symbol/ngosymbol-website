<script setup lang="ts">
const items = [
  { label: 'Проєкти', to: '?section=projects' },
  { label: 'Події', to: '?section=events' },
  { label: 'Люди', to: '?section=people' },
  { label: 'Про нас', to: '?section=about' },
]
const dark = ref(false)
</script>

<template>
  <div>
    <SymSiteHeader variant="dropdown" :items="items" :cta="{ label: 'Підтримати', to: '?section=support' }" current="?section=events" open-label="Меню" close-label="Закрити меню">
      <template #logo><SymWordmark href="#" /></template>
      <template #tools>
        <SymSegmented size="s" :options="[{ value: 'uk', label: 'UA' }, { value: 'en', label: 'EN' }]" model-value="uk" label="Мова" />
        <SymIconButton size="s" variant="outline" icon="search" label="Пошук по сайту" />
        <SymIconButton size="s" variant="outline" icon="theme" label="Темний режим" :aria-pressed="dark" @click="dark = !dark" />
      </template>
      <template #trail><SymText size="caption" muted>Головна › Події</SymText></template>
    </SymSiteHeader>
    <SymContainer size="wide"><p class="sym-t-body-sm sym-muted" style="padding-block: var(--sym-space-m)">Вміст сторінки під шапкою.</p></SymContainer>
  </div>
</template>
