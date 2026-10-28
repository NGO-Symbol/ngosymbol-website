<script setup lang="ts">
useHead({ title: 'Кольори й тони' })
const tones = ['paper', 'white', 'lilac', 'violet', 'apricot', 'plum']
type Pair = { label: string; ratio: number; need: number; ok: boolean }
const results = ref<Record<string, Pair[]>>({})
const lum = (rgb: number[]) => { const c = rgb.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }); return .2126 * c[0]! + .7152 * c[1]! + .0722 * c[2]! }
const ratio = (a: number[], b: number[]) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x! + .05) / (y! + .05) }
function parse(s: string) { const m = s.match(/[\d.]+/g)!.map(Number); return m.slice(0, 3) }
onMounted(() => {
  for (const t of tones) {
    const host = document.createElement('div'); host.dataset.tone = t; host.style.cssText = 'position:absolute;visibility:hidden'; document.body.append(host)
    const read = (v: string, prop: 'color' | 'backgroundColor' = 'color') => { const p = document.createElement('span'); p.style[prop] = `var(${v})`; host.append(p); const c = getComputedStyle(p)[prop]; p.remove(); return parse(c) }
    const bg = read('--sym-bg', 'backgroundColor')
    results.value[t] = [
      { label: 'текст', rgb: read('--sym-fg'), need: 4.5 }, { label: 'приглушений', rgb: read('--sym-fg-muted'), need: 4.5 }, { label: 'великий текст', rgb: read('--sym-fg-large'), need: 3 },
      { label: 'лінія', rgb: read('--sym-rule'), need: 3 }, { label: 'акцент (декор)', rgb: read('--sym-accent'), need: 0 }, { label: 'фокус', rgb: read('--sym-focus'), need: 3 },
    ].map(p => { const r = ratio(p.rgb, bg); return { label: p.label, ratio: r, need: p.need, ok: r >= p.need } })
    host.remove()
  }
})
</script>
<template>
  <div class="ds-page">
    <header class="ds-head"><span class="eyebrow">Основи</span><h1>Кольори й тони</h1>
      <p>Тон — повний набір кольорів поверхні: фон, текст, лінії, акцент, фокус і кнопки. <code class="ds-c">data-tone="plum"</code> на секції чи картці перефарбовує все всередині. Компоненти не вибирають кольори бренду самі. Сирі значення лежать у <code class="ds-c">tones.css</code>; контраст перевіряє <code class="ds-c">pnpm ds:contrast</code>.</p></header>
    <DsSection title="Шість тонів" description="Числа — реальний контраст WCAG, виміряний у цьому браузері. Потрібно ≥ 4,5 для тексту, ≥ 3 для великого тексту, ліній і форм.">
      <div class="ds-swatches">
        <div v-for="t in tones" :key="t" class="ds-swatch" :data-tone="t">
          <strong style="font:400 2rem var(--sym-font-display)">{{ t }}</strong>
          <span style="color:var(--sym-fg-muted)">Приглушений текст на цьому тоні</span>
          <span class="sym-t-headline" style="color:var(--sym-fg-large)">Великий заголовок</span>
          <div style="display:flex;gap:8px;align-items:center"><SymOrbit size="xs" :rotate="-28" /><SymButton size="m">Дія</SymButton><SymButton variant="outline">Інша</SymButton></div>
          <div class="ds-pairs"><div v-for="p in results[t] ?? []" :key="p.label"><span>{{ p.label }}</span><span><span class="ds-pass">{{ p.ratio.toFixed(2) }}</span> {{ p.need ? `/ ${p.need} ${p.ok ? '✓' : '✗'}` : '· лише геометрія' }}</span></div></div>
        </div>
      </div>
    </DsSection>
    <DsSection title="Правила" description="Що це означає для сторінок.">
      <ul style="padding-inline-start:18px;display:grid;gap:8px;max-width:70ch">
        <li>Колір — це <b>роль</b>, не hex: на сторінках лише <code class="ds-c">var(--sym-fg)</code>, <code class="ds-c">--sym-bg</code>, <code class="ds-c">--sym-accent</code> тощо, а тон вибирає секція.</li>
        <li><b>Violet</b> середній за яскравістю: ink на ньому 4,68:1 (текст ок), cream лише 3,37:1, тому cream дозволений тільки для великого тексту (<code class="ds-c">--sym-fg-large</code>), а приглушеного рівня на violet немає.</li>
        <li><b>Акцент</b> (<code class="ds-c">--sym-accent</code>) — для орбіт, марок і великої геометрії. Не для тексту.</li>
        <li>Колір ніколи не єдиний носій змісту: статус завжди має текст чи значок.</li>
        <li>Темної теми поки немає (див. «Відкриті питання»): токени тонів — єдине місце, де її додавати.</li>
      </ul>
    </DsSection>
  </div>
</template>
