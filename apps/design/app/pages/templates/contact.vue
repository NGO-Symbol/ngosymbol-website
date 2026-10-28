<script setup lang="ts">
definePageMeta({ layout: 'site' })
useHead({ title: 'Шаблон: Контакти' })
</script>
<template>
  <div>
  <SymSection tone="violet" space="lg" clip fill>
    <template #decor><SymOrbit anchor="top-right" size="hero" :bleed="0.3" color="accent" /></template>
    <SymStack gap="xl">
      <SymPageHeader eyebrow="Партнерство · підтримка · спільні ідеї" title="Поговорімо про майбутній проєкт" size="xl" flush />
      <SymCluster gap="l">
        <SymButton href="mailto:hello@symbol.ngo" icon="mail" size="l">hello@symbol.ngo</SymButton>
        <SymButton href="https://www.instagram.com/symbol.ngo/" variant="outline" size="l">Instagram</SymButton>
      </SymCluster>
      <SymText measure>Корпоративна пошта буде активована після налаштування Google Workspace для неприбуткових організацій.</SymText>
    </SymStack>
  </SymSection>
  </div>
</template>
