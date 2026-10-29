<script setup lang="ts">
// The curatorial concept of the exhibition (text of the original project site), on its own tab.
import { concept, conceptEn, conceptLead, conceptLeadEn } from '~/data/concept'

const { isEn, t } = useLang()
useSeoMeta({ title: () => t('Кураторська концепція', 'Curatorial concept'), description: () => (isEn.value ? conceptLeadEn : conceptLead) })
const blocks = computed(() => (isEn.value ? conceptEn : concept))
</script>

<template>
  <section class="docs-container docs-page concept">
    <div class="concept__head">
      <span class="docs-label">{{ t('Кураторська концепція', 'Curatorial concept') }}</span>
      <h1>{{ t('Концепція', 'Concept') }}</h1>
      <p class="docs-lead">{{ isEn ? conceptLeadEn : conceptLead }}</p>
    </div>
    <div class="docs-text">
      <template v-for="(block, index) in blocks" :key="index">
        <p v-if="block.text">{{ block.text }}</p>
        <ol v-else-if="block.list"><li v-for="item in block.list" :key="item">{{ item }}</li></ol>
      </template>
      <p class="docs-signature">{{ t('Куратори', 'Curators') }}: <a :href="symbolPersonUrl('petro-chekal')">{{ t('Петро Чекаль', 'Petro Chekal') }}</a>, <a :href="symbolPersonUrl('yurii-rassokha')">{{ t('Юрій Рассоха', 'Yurii Rassokha') }}</a></p>
    </div>
  </section>
</template>

<style scoped>
.concept { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 40px; align-items: start; }
.concept__head { position: sticky; top: 160px; display: grid; gap: 14px; justify-items: start; }
.concept__head h1 { margin: 0; font-size: clamp(2.4rem, calc(1rem + 4vw), 4.4rem); }
.concept__head .docs-lead { margin: 0; font-size: 1.05rem; }
.docs-signature { font-size: .85rem; color: var(--docs-muted); }
@media (max-width: 860px) {
  .concept { grid-template-columns: 1fr; gap: 20px; }
  .concept__head { position: static; }
}
</style>
