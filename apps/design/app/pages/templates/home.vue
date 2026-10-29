<script setup lang="ts">
import { projects } from '~/data/fixtures'
definePageMeta({ layout: 'site' })
useHead({ title: 'Шаблон: Головна' })
</script>
<template>
  <div>
  <!-- Hero -->
  <SymSection tone="paper" space="lg" clip>
    <template #decor><SymOrbit anchor="top-right" size="hero" :bleed="0.32" spin /></template>
    <SymStack gap="xl">
      <SymPageHeader size="xl" eyebrow="Культура · мистецтво · психічне здоров’я" title="Створюємо простір для уважності й сучасної культури" flush />
      <SymSplit ratio="7:5" align="end" gap="l">
        <template #start><SymText size="lead" measure>Незалежна українська організація. Кожен проєкт має власний голос, а разом вони формують живу історію «Символу».</SymText></template>
        <template #end><SymCluster justify="end"><SymButton to="/templates/projects" size="l" icon="arrow-right">Усі проєкти</SymButton></SymCluster></template>
      </SymSplit>
    </SymStack>
  </SymSection>

  <!-- Featured autonomous project -->
  <SymSection tone="violet" space="lg" clip>
    <template #decor><SymOrbit anchor="top-right" size="hero" :bleed="0.28" color="accent" /></template>
    <SymReveal>
      <SymCallout eyebrow="Новий автономний проєкт" title="Історія моєї вулиці" text="Окремий простір про вулиці, міську пам’ять і досвіди Харкова.">
        <template #actions><SymButton href="https://my-street.symbol.ngo">Перейти на сайт проєкту</SymButton></template>
      </SymCallout>
    </SymReveal>
  </SymSection>

  <!-- Selected projects -->
  <SymSection>
    <SymStack gap="2xl">
      <SymSectionHeading eyebrow="Вибране" title="Різні проєкти. Спільна точка уваги.">
        <template #intro>Від сучасного мистецтва й документалістики до плейбек-театру та практик психічного здоров’я.</template>
      </SymSectionHeading>
      <SymGrid :cols="3">
        <SymReveal v-for="p in projects.slice(1)" :key="p.title"><SymProjectCard v-bind="p" /></SymReveal>
      </SymGrid>
    </SymStack>
  </SymSection>

  <!-- Statement -->
  <SymSection tone="apricot">
    <SymSplit ratio="aside" gap="l">
      <template #start><SymEyebrow index="01">Місія</SymEyebrow></template>
      <template #end>
        <SymStack gap="l" align="start">
          <SymReveal><SymHeading size="display">Ми працюємо там, де культурі потрібні діалог, уява та взаємна увага.</SymHeading></SymReveal>
          <SymButton to="/templates/about" variant="text" icon="arrow-right">Хто ми</SymButton>
        </SymStack>
      </template>
    </SymSplit>
  </SymSection>
  </div>
</template>
