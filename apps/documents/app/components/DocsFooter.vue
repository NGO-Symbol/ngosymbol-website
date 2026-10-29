<template>
  <footer class="docs-footer">
    <div class="docs-container docs-footer__inner">
      <div>
        <p class="docs-footer__title">Покажіть свої документи…</p>
        <p>Виставка сучасного мистецтва · ЄрміловЦентр, Харків · 17.10–07.12.2025</p>
      </div>
      <div class="docs-footer__links">
        <a :href="`${SYMBOL}/projects/pokazhit-svoi-dokumenty`">Проєкт на symbol.ngo</a>
        <a :href="SYMBOL">ГО «Символ»</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.docs-footer { margin-top: 96px; background: var(--docs-ink); color: var(--docs-paper); font-family: var(--docs-mono); font-size: .85rem; }
.docs-footer__inner { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 24px; padding-block: 40px; }
.docs-footer p { margin: 0 0 6px; }
.docs-footer__title { font-family: var(--docs-display); text-transform: uppercase; font-size: 1.6rem; line-height: 1; }
.docs-footer__links { display: grid; gap: 8px; align-content: start; }
.docs-footer a { color: inherit; }
</style>
