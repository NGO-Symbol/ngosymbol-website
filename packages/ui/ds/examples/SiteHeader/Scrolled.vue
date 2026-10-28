<script setup lang="ts">
const items = [
  { label: 'Про нас', to: '?section=about' },
  { label: 'Проєкти', to: '?section=projects' },
  { label: 'Події', to: '?section=events' },
]
</script>

<template>
  <div>
    <SymSiteHeader :items="items" current="?section=about" scrolled>
      <template #logo><SymWordmark href="#" /></template>
    </SymSiteHeader>
    <SymContainer size="wide"><p class="sym-t-body-sm sym-muted" style="padding-block: var(--sym-space-m)">Вміст сторінки під шапкою. Тінь і лінія з’являються лише після прокручування; тут їх увімкнено примусово.</p></SymContainer>
  </div>
</template>
