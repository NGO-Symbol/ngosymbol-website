<script setup lang="ts">
useHead({ title: 'Відступи й сітка' })
const steps = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl']
const widths = [['page', '1180 px', 'звичайний вміст'], ['wide', '1440 px', 'широкі медіа-смуги'], ['narrow', '760 px', 'сторінки в одну колонку'], ['prose', '66ch', 'довгий текст']]
const sizes = ref<Record<string, string>>({})
onMounted(() => { for (const s of steps) { const p = document.createElement('div'); p.style.cssText = `position:absolute;visibility:hidden;width:var(--sym-space-${s})`; document.body.append(p); sizes.value[s] = Math.round(p.getBoundingClientRect().width) + ' px'; p.remove() } })
</script>
<template>
  <div class="ds-page">
    <header class="ds-head"><span class="eyebrow">Основи</span><h1>Відступи й сітка</h1>
      <p>Кроки відступів плавні: на телефоні вони тісніші, на десктопі просторіші (значення нижче — для поточної ширини вікна). Сторінки не пишуть <code class="ds-c">margin</code> чи <code class="ds-c">padding</code>: ритм дають Stack, Cluster, Grid, Split і Section.</p></header>
    <DsSection title="Кроки" description="3xs…4xl. Змініть ширину вікна — числа й смуги змінюються."><div class="ds-scale"><div v-for="s in steps" :key="s"><span>space-{{ s }}</span><span class="ds-bar2" :style="{ width: `var(--sym-space-${s})`, maxWidth: '100%' }" /><span>{{ sizes[s] }}</span></div></div></DsSection>
    <DsSection title="Семантичні відступи"><ul style="padding-inline-start:18px;display:grid;gap:6px;max-width:70ch">
      <li><code class="ds-c">--sym-gap-stack</code> — між блоками всередині секції (SymStack за замовчуванням).</li>
      <li><code class="ds-c">--sym-gap-inline</code> — між кнопками, чипами, тегами (SymCluster).</li>
      <li><code class="ds-c">--sym-gap-grid</code> — між картками (SymGrid).</li>
      <li><code class="ds-c">--sym-section-y</code> — вертикальні поля смуги (SymSection <code class="ds-c">space</code>).</li>
      <li><code class="ds-c">--sym-page-margin</code> — бічні поля сторінки (SymContainer).</li></ul></DsSection>
    <DsSection title="Ширини"><div class="ds-cards"><div v-for="[n, w, u] in widths" :key="n" style="padding:14px 16px;border:1px solid var(--sym-rule)"><b>{{ n }}</b> · {{ w }}<br><span class="ds-muted" style="font-size:.85rem">{{ u }}</span></div></div></DsSection>
  </div>
</template>
