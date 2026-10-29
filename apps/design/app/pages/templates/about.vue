<script setup lang="ts">
import { team } from '~/data/fixtures'
definePageMeta({ layout: 'site' })
useHead({ title: 'Шаблон: Про нас' })
</script>
<template>
  <div>
  <SymSection space="md">
    <SymPageHeader eyebrow="ГО «Символ»" title="Незалежна організація про культуру, мистецтво й уважність" size="lg" flush />
  </SymSection>
  <SymSection rule="top" space="md">
    <SymSplit ratio="7:5" gap="xl">
      <template #start><SymStack gap="m"><SymEyebrow>Місія</SymEyebrow><SymReveal><SymHeading size="headline-lg">Розвиваємо сучасну українську культуру і мистецтво та сприяємо уважному ставленню до психічного здоров’я.</SymHeading></SymReveal></SymStack></template>
      <template #end><SymStack gap="s"><SymEyebrow>Працюємо</SymEyebrow><SymText>Харків · Київ · Закарпаття</SymText><SymText muted>Прагнемо працювати по всій Україні та створювати проєкти за кордоном.</SymText></SymStack></template>
    </SymSplit>
  </SymSection>
  <SymSection tone="lilac">
    <SymStack gap="xl">
      <SymSectionHeading eyebrow="Постійна команда" title="Люди «Символу»"><template #intro>Команди конкретних проєктів будуть представлені у відповідних проєктних просторах.</template></SymSectionHeading>
      <SymGrid min="240"><SymReveal v-for="p in team" :key="p.name"><SymPersonCard :name="p.name" :role="p.role" /></SymReveal></SymGrid>
    </SymStack>
  </SymSection>
  <SymSection tone="plum" space="lg" clip>
    <template #decor><SymOrbit anchor="bottom-right" size="lg" :bleed="0.35" /></template>
    <SymCallout title="Хочете працювати разом?"><template #actions><SymButton to="/templates/contact" icon="arrow-right">Контакти</SymButton></template></SymCallout>
  </SymSection>
  </div>
</template>
