<script setup lang="ts">
import { team } from '~/data/fixtures'
definePageMeta({ layout: 'site' })
useHead({ title: 'Шаблон: Сторінка проєкту' })
const facts = [{ label: 'Період', value: '2026' }, { label: 'Статус', value: 'Триває' }, { label: 'Напрям', value: 'Плейбек-театр' }, { label: 'Географія', value: 'Закарпаття' }]
</script>
<template>
  <div>
  <SymSection tone="apricot" space="lg" clip>
    <template #decor><SymOrbit anchor="bottom-right" size="lg" :bleed="0.3" /></template>
    <SymStack gap="m">
      <SymBreadcrumb :items="[{ label: 'Проєкти', to: '/templates/projects' }, { label: 'Голоси у русі' }]" />
      <SymPageHeader eyebrow="Плейбек-театр · 2026" title="Голоси у русі" lead="Проєкт про плейбек-театр і живі історії на Закарпатті." size="lg" flush />
    </SymStack>
  </SymSection>

  <SymSection>
    <SymSplit ratio="aside" gap="xl" sticky>
      <template #start><SymMetaList :items="facts" :cols="1" /></template>
      <template #end>
        <SymStack gap="2xl">
          <SymStack gap="m">
            <SymSectionHeading title="Про проєкт" :level="2" />
            <SymProse>
              <p>Сторінка готується до наповнення. Перед публікацією сюди будуть додані підтверджений опис, команда, партнери, результати та медіа.</p>
              <p>Структура невеликого проєкту гнучка: розділи, що не стосуються проєкту, просто не додаємо.</p>
            </SymProse>
          </SymStack>
          <SymReveal kind="wipe"><SymMedia alt="Фото чи відео проєкту (місце під матеріали)" ratio="16:9" caption="Місце під фото, відео або документальні матеріали проєкту" /></SymReveal>
        </SymStack>
      </template>
    </SymSplit>
  </SymSection>

  <SymSection tone="lilac">
    <SymStack gap="xl">
      <SymSectionHeading title="Команда проєкту"><template #intro>Лише підтверджені ролі й біографії.</template></SymSectionHeading>
      <SymGrid min="240"><SymPersonCard v-for="p in team.slice(0, 3)" :key="p.name" :name="p.name" :role="p.role" /></SymGrid>
    </SymStack>
  </SymSection>

  <SymSection tone="plum" space="lg" clip>
    <template #decor><SymOrbit anchor="top-left" size="lg" :bleed="0.4" /></template>
    <SymCallout eyebrow="Далі" title="Є ідея для спільного проєкту?">
      <template #actions><SymButton to="/templates/contact" icon="arrow-right">Написати нам</SymButton><SymButton to="/templates/projects" variant="outline">Усі проєкти</SymButton></template>
    </SymCallout>
  </SymSection>
  </div>
</template>
