<script setup lang="ts">
useHead({ title: 'Рух' })
const ladder = [['instant', '80', 'колір посилання, шар стану'], ['micro', '120', 'зсув стрілки, зміна іконки'], ['small', '180', 'заливка кнопки, чип, підкреслення, підйом картки'], ['medium', '250', 'акордеон, банер, вкладки'], ['large', '350', 'перехід сторінки, шухляда, поява тексту'], ['xlarge', '500', 'повноекранне меню'], ['hero', '700', 'поява великих медіа й героя (лише цей сайт)'], ['ambient', '60 000', 'обертання орбіти']]
const play = ref(0)
const tier = ref('large')
const tiers = ['instant', 'micro', 'small', 'medium', 'large', 'xlarge', 'hero']
</script>
<template>
  <div class="ds-page">
    <header class="ds-head"><span class="eyebrow">Основи</span><h1>Рух</h1>
      <p>Одна драбина тривалостей і кілька кривих. Вибір рівня залежить від того, що рухається: чим більше й далі, тим повільніше. Вихід на крок коротший за вхід, колір і прозорість на крок швидші за рух, частини одного об’єкта ходять в одному темпі.</p></header>
    <DsSection title="Драбина" description="Кнопка «Вигляд» → «Рух: Без руху» вимикає зсуви: усе стає плавною появою.">
      <div class="ds-api"><div class="ds-api__scroll"><table><thead><tr><th>Рівень</th><th>мс</th><th>Що рухається</th></tr></thead><tbody><tr v-for="[n, ms, what] in ladder" :key="n"><td><code>{{ n }}</code></td><td>{{ ms }}</td><td>{{ what }}</td></tr></tbody></table></div></div>
    </DsSection>
    <DsSection title="Спробувати рівень" description="Однаковий об’єкт на різних рівнях: вхід (enter) і вихід (на крок швидший).">
      <div class="ds-seg" style="margin-bottom:8px"><button v-for="t in tiers" :key="t" type="button" :aria-pressed="tier === t" @click="tier = t; play++">{{ t }}</button></div>
      <DsStage><div style="height:96px;display:flex;align-items:center;gap:16px"><span :key="play" class="mo-box" :style="{ animationDuration: `var(--sym-dur-${tier})` }" /><button type="button" class="ds-ex__tools" style="min-height:44px;padding-inline:16px;border:1px solid currentColor;border-radius:999px" @click="play++">Повторити</button></div></DsStage>
    </DsSection>
    <DsSection title="Поява при прокрутці" description="Блоки видно без JavaScript. Те, що нижче першого екрана, ховається й з’являється один раз; що з’явилося одночасно — йде по черзі (60 мс, до 6).">
      <DsStage><SymGrid min="200"><SymReveal v-for="n in 6" :key="n"><SymCard><SymText size="sm" muted>0{{ n }}</SymText><SymHeading :level="3" size="title">Блок {{ n }}</SymHeading></SymCard></SymReveal></SymGrid></DsStage>
    </DsSection>
    <DsSection title="Правила"><ul style="padding-inline-start:18px;display:grid;gap:8px;max-width:72ch">
      <li><b>Рівень = більше з розміру й відстані.</b> Текст і картки — large, великі зображення й герой — hero, дрібна взаємодія — instant…small.</li>
      <li><b>Анімуємо лише transform, opacity і clip-path.</b> Висоту — тільки в малих блоках (акордеон).</li>
      <li><b>Токени:</b> <code class="ds-c">transition: translate var(--sym-t-small), color var(--sym-t-fx-small)</code>; зсув множиться на <code class="ds-c">--sym-motion-travel</code> (0 при reduced motion).</li>
      <li><b>Крива пружини</b> — для того, що рухається; для кольору й прозорості лише стандартна (без перескоку).</li>
      <li><b>Натискання миттєве</b>, відпускання повертається пружиною.</li>
      <li><b>Затримка між сусідами</b> 60 мс, не більше 6 кроків; у таблицях і списках дій без неї.</li>
      <li><b>Орбіта обертається</b> 60 с на оберт, лише в полі зору й коли рух дозволено.</li>
      <li><b>prefers-reduced-motion</b> шанується автоматично: зсуви → поява, орбіта нерухома.</li></ul></DsSection>
  </div>
</template>
<style>
.mo-box { width: 64px; height: 64px; background: var(--sym-accent); animation: mo-in var(--sym-dur-large) var(--sym-ease-emph-enter) both; }
@keyframes mo-in { from { opacity: 0; translate: calc(-40px * var(--sym-motion-travel)) 0; } }
</style>
