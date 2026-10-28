<script setup lang="ts">
useHead({ title: 'Телефон і десктоп' })
const classes = [['compact', '< 600', 'телефон: одна колонка, кнопки на всю ширину, шухляда-меню'], ['medium', '600–839', 'великий телефон, планшет: 2 колонки'], ['expanded', '840–1199', 'планшет ландшафт, малий ноутбук: повна розкладка'], ['large', '1200–1599', 'десктоп: сторінка по центру, 1180 px'], ['xlarge', '≥ 1600', 'широкий екран: медіа-смуги до 1440 px']]
</script>
<template>
  <div class="ds-page">
    <header class="ds-head"><span class="eyebrow">Основи</span><h1>Телефон і десктоп</h1>
      <p>Спершу телефон. Компоненти підлаштовуються під ширину <b>свого контейнера</b> (container queries), а не вікна, тому однаково працюють у вузькій колонці й на всю сторінку. Меню «Вигляд» → «Ширина сцени» дозволяє подивитися будь-який приклад на 390 чи 320 px прямо на десктопі.</p></header>
    <DsSection title="Класи вікна" description="Ті самі точки, що в Material, щоб розмови про «телефон/планшет/десктоп» мали один зміст. У @media їх пишуть числами (змінні там не працюють).">
      <div class="ds-api"><div class="ds-api__scroll"><table><thead><tr><th>Клас</th><th>px</th><th>Що відбувається</th></tr></thead><tbody><tr v-for="[c, w, d] in classes" :key="c"><td><code>{{ c }}</code></td><td>{{ w }}</td><td>{{ d }}</td></tr></tbody></table></div></div>
    </DsSection>
    <DsSection title="Правила для телефона"><ul style="padding-inline-start:18px;display:grid;gap:8px;max-width:72ch">
      <li><b>Ціль дотику ≥ 44 px</b>: кнопки 48/56, чипи 44 (з невидимою зоною), іконки-кнопки 44.</li>
      <li><b>Hover лише на пристроях з мишею</b> (<code class="ds-c">@media (hover: hover)</code>); натискання показує шар стану <code class="ds-c">:active</code>. Жодного синього блимання при тапі.</li>
      <li><b>Рядок чипів не переноситься</b>, а гортається вбік із затіненим краєм (<code class="ds-c">SymFilterBar</code>, <code class="ds-c">SymCluster scroll</code>).</li>
      <li><b>Меню — повноекранна шухляда</b>: великі посилання, закривається Esc / тапом / переходом, сторінка під нею нерухома.</li>
      <li><b>Горизонтального скролу сторінки немає</b> на 320 px: перевіряє <code class="ds-c">pnpm ds:crawl</code>.</li>
      <li><b>Поля ≥ 16 px</b> у формах (інакше iOS збільшує сторінку при фокусі).</li>
      <li><b>Ширина сторінки стабільна</b>: <code class="ds-c">scrollbar-gutter: stable</code> не дає контенту «стрибати».</li>
      <li><b>Зображення</b>: завжди з розмірами/співвідношенням (<code class="ds-c">SymMedia</code>), <code class="ds-c">loading="lazy"</code> нижче першого екрана.</li></ul></DsSection>
    <DsSection title="Правила для десктопа"><ul style="padding-inline-start:18px;display:grid;gap:8px;max-width:72ch">
      <li>Вміст центрований у <code class="ds-c">SymContainer</code> до 1180 px; текст ≤ 66 символів у рядку.</li>
      <li>Hover: картка піднімається на 5 px, стрілка зсувається, посилання потовщується. Лише оформлення, жодної функції лише на hover.</li>
      <li>Видимий фокус клавіатури скрізь (3 px, колір тону); «Пропустити до змісту» першим у Tab.</li></ul></DsSection>
  </div>
</template>
