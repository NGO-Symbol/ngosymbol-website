<script setup lang="ts">
// The curatorial concept as the general dossier of the exhibition: a cover sheet with the case fields and the summary,
// then the text typed over two sheets, closed with the curators' signatures and the stamp.
import { concept, conceptEn, conceptLead, conceptLeadEn } from '~/data/concept'

const { isEn, t } = useLang()
useSeoMeta({ title: () => t('Кураторська концепція', 'Curatorial concept'), description: () => (isEn.value ? conceptLeadEn : conceptLead) })
const blocks = computed(() => (isEn.value ? conceptEn : concept))
// The text is split where the concept turns from «what a document is» to documents as instruments of power.
const split = computed(() => Math.max(1, blocks.value.findIndex(block => /інструменти влади|instruments of power/i.test(block.text ?? ''))))
const sheets = computed(() => [blocks.value.slice(0, split.value), blocks.value.slice(split.value)])
const caseNo = computed(() => t('Справа № ПСД-2025', 'Case No. PSD-2025'))

const fields = computed(() => [
  { label: t('Документ', 'Document'), value: t('Кураторська концепція', 'Curatorial concept') },
  { label: t('Виставка', 'Exhibition'), value: t('«Покажіть свої документи…»', '«May I See Your Documents…»') },
  { label: t('Укладачі', 'Compiled by'), value: t('Петро Чекаль, Юрій Рассоха', 'Petro Chekal, Yurii Rassokha') },
  { label: t('Місце', 'Place'), value: t('ЄрміловЦентр, Харків', 'YermilovCentre, Kharkiv') },
  { label: t('Рік', 'Year'), value: '2025' },
  { label: t('Аркушів', 'Sheets'), value: '3' }
])
</script>

<template>
  <section class="docs-container docs-page dossier">
    <div class="dossier__title">
      <span class="docs-label">{{ t('Досьє виставки', 'Exhibition dossier') }}</span>
      <h1>{{ t('Концепція', 'Concept') }}</h1>
    </div>

    <DocsSheet :case-no="caseNo" :doc-no="t('Документ 01', 'Document 01')" :kind="t('Титульний аркуш', 'Cover sheet')" :sheet="1" :tilt="-0.4">
      <dl class="dossier__fields">
        <div v-for="field in fields" :key="field.label"><dt>{{ field.label }}</dt><dd>{{ field.value }}</dd></div>
      </dl>
      <p class="dossier__summary-label">{{ t('Короткий зміст', 'Summary') }}</p>
      <p class="dossier__summary">{{ isEn ? conceptLeadEn : conceptLead }}</p>
    </DocsSheet>

    <DocsSheet v-for="(part, index) in sheets" :key="index" :case-no="caseNo" :doc-no="t('Документ 01', 'Document 01')" :kind="t('Кураторська концепція', 'Curatorial concept')" :sheet="index + 2" :tilt="index ? 0.3 : -0.2">
      <div class="docs-text dossier__text">
        <template v-for="(block, blockIndex) in part" :key="blockIndex">
          <p v-if="block.text">{{ block.text }}</p>
          <ol v-else-if="block.list"><li v-for="item in block.list" :key="item">{{ item }}</li></ol>
        </template>
      </div>
      <div v-if="index === sheets.length - 1" class="dossier__signatures">
        <p>{{ t('Куратори', 'Curators') }}</p>
        <div class="dossier__sign"><span class="dossier__line"><a :href="symbolPersonUrl('petro-chekal')">{{ t('П. Чекаль', 'P. Chekal') }}</a></span><span>{{ t('Петро Чекаль', 'Petro Chekal') }}</span></div>
        <div class="dossier__sign"><span class="dossier__line"><a :href="symbolPersonUrl('yurii-rassokha')">{{ t('Ю. Рассоха', 'Yu. Rassokha') }}</a></span><span>{{ t('Юрій Рассоха', 'Yurii Rassokha') }}</span></div>
        <DocsStamp class="dossier__stamp" />
      </div>
    </DocsSheet>
  </section>
</template>

<style scoped>
.dossier { max-width: 940px; }
.dossier__title { display: grid; gap: 12px; justify-items: start; margin-bottom: 28px; }
.dossier__title h1 { margin: 0; font-size: clamp(2.4rem, calc(1rem + 5vw), 4.8rem); }
.dossier__fields { margin: 0 0 24px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 28px; }
.dossier__fields div { display: grid; gap: 2px; padding: 8px 0; border-bottom: 1px dashed color-mix(in srgb, var(--docs-ink) 40%, transparent); }
.dossier__fields dt { font-family: var(--docs-mono); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--docs-muted); }
.dossier__fields dd { margin: 0; font-family: var(--docs-mono); font-size: 1rem; }
.dossier__summary-label { margin: 0 0 6px; font-family: var(--docs-mono); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--docs-muted); }
.dossier__summary { margin: 0; font-family: var(--docs-mono); font-size: clamp(1rem, calc(.9rem + .4vw), 1.2rem); line-height: 1.6; }
.dossier__text { max-width: none; }
.dossier__signatures { position: relative; display: grid; gap: 14px; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--docs-ink); font-family: var(--docs-mono); font-size: .85rem; }
.dossier__signatures p { margin: 0; text-transform: uppercase; letter-spacing: .1em; font-size: .7rem; color: var(--docs-muted); }
.dossier__sign { display: grid; grid-template-columns: minmax(0, 220px) auto; gap: 16px; align-items: end; }
.dossier__line { border-bottom: 1px solid var(--docs-ink); padding-bottom: 2px; font-family: var(--docs-display); font-size: 1.5rem; text-transform: uppercase; transform: rotate(-2deg); }
.dossier__line a { color: inherit; text-decoration: none; }
.dossier__stamp { position: absolute; right: 4%; bottom: -10px; width: clamp(110px, 18vw, 170px); color: var(--docs-stamp); mix-blend-mode: var(--docs-stamp-blend, multiply); transform: rotate(-14deg); opacity: .9; }
@media (max-width: 640px) {
  .dossier__fields { grid-template-columns: 1fr; }
  .dossier__sign { grid-template-columns: 1fr; gap: 4px; }
  .dossier__stamp { right: -4px; bottom: -6px; width: 92px; }
}
</style>
