<script setup lang="ts">
// One sheet of a case file: a typed page with its form line on top (case, document number, kind), the content, and
// the sheet number at the foot. Sheets of one page stack with a slight offset, like papers in a folder.
defineProps<{ caseNo: string; docNo?: string; kind: string; sheet: number; tilt?: number }>()
const { t } = useLang()
</script>

<template>
  <section class="docs-sheet" :style="{ '--tilt': `${tilt ?? 0}deg` }">
    <header class="docs-sheet__form">
      <span>{{ caseNo }}</span>
      <span v-if="docNo">{{ docNo }}</span>
      <span class="docs-sheet__kind">{{ kind }}</span>
    </header>
    <div class="docs-sheet__body"><slot /></div>
    <footer class="docs-sheet__foot">{{ t('Аркуш', 'Sheet') }} {{ sheet }}</footer>
  </section>
</template>

<style scoped>
.docs-sheet { position: relative; padding: clamp(18px, 3.4vw, 44px) clamp(18px, 4vw, 56px) 18px; background: var(--docs-sheet); border: 1px solid color-mix(in srgb, var(--docs-ink) 45%, transparent); box-shadow: 0 1px 0 color-mix(in srgb, var(--docs-ink) 10%, transparent), 8px 10px 0 -2px color-mix(in srgb, var(--docs-ink) 10%, transparent); transform: rotate(var(--tilt)); animation: docs-sheet-in .6s cubic-bezier(.2, .8, .2, 1) both; }
.docs-sheet + .docs-sheet { margin-top: 28px; }
/* Punched holes along the left edge, as in a filed sheet. */
.docs-sheet::before { content: ''; position: absolute; left: 10px; top: 50%; width: 9px; height: 90px; transform: translateY(-50%); background: radial-gradient(circle, var(--docs-paper) 0 3.5px, color-mix(in srgb, var(--docs-ink) 40%, transparent) 3.5px 4.5px, transparent 4.6px) center top / 9px 9px no-repeat, radial-gradient(circle, var(--docs-paper) 0 3.5px, color-mix(in srgb, var(--docs-ink) 40%, transparent) 3.5px 4.5px, transparent 4.6px) center bottom / 9px 9px no-repeat; }
.docs-sheet__form { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 18px; padding-bottom: 10px; margin-bottom: 22px; border-bottom: 1px solid var(--docs-ink); font-family: var(--docs-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; }
.docs-sheet__kind { color: var(--docs-stamp); }
.docs-sheet__foot { margin-top: 24px; padding-top: 8px; border-top: 1px dashed color-mix(in srgb, var(--docs-ink) 40%, transparent); text-align: right; font-family: var(--docs-mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--docs-muted); }
@keyframes docs-sheet-in { from { opacity: 0; transform: translateY(18px) rotate(calc(var(--tilt) - .8deg)); } }
@media (prefers-reduced-motion: reduce) { .docs-sheet { animation: none; } }
</style>
