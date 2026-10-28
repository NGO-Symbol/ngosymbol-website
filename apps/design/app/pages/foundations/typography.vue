<script setup lang="ts">
useHead({ title: 'Типографіка' })
const roles = [
  ['display-xl', 'Герой сторінки', 'Створюємо простір для уважності'], ['display', 'Заголовок секції', 'Різні проєкти. Спільна точка уваги.'], ['headline-lg', 'Великий заголовок', 'Історія моєї вулиці'],
  ['headline', 'Заголовок', 'Тренінги mhGAP на Київщині'], ['title-lg', 'Заголовок картки', 'Голоси у русі'], ['title', 'Малий заголовок', 'Команда проєкту'],
] as const
const text = [['lead', 'Вступний абзац: незалежна українська організація, що розвиває сучасну культуру і мистецтво.'], ['body', 'Основний текст: кожен проєкт має власний голос, а разом вони формують живу історію «Символу».'], ['body-sm', 'Другорядний текст: допоміжні пояснення й підписи.'], ['caption', 'Підпис: фото — автор, 2026'], ['label', 'Категорія · 2026–2027']] as const
const longWords = 'Взаємодопомога, психосоціальна, багатопрофільний, інституціоналізація, нерівноправність, міжособистісний'
</script>
<template>
  <div class="ds-page">
    <header class="ds-head"><span class="eyebrow">Основи</span><h1>Типографіка</h1>
      <p>Два шрифти: серифний для заголовків (<code class="ds-c">--sym-font-display</code>) і гротеск для тексту й інтерфейсу (<code class="ds-c">--sym-font-text</code>). Розміри плавно ростуть від 390 до 1440 px. Пара тимчасова: обидва шрифти мають кирилицю, а Newsreader і DM Sans, що були раніше, — ні.</p></header>
    <DsSection title="Ролі заголовків" description="Розмір обирає компонент SymHeading за роллю, а не сторінка.">
      <div style="display:grid;gap:28px"><div v-for="[r, label, sample] in roles" :key="r"><span class="ds-muted" style="font:.72rem var(--sym-font-mono)">{{ r }} · {{ label }}</span><div :class="`sym-t-${r}`" style="margin-top:6px">{{ sample }}</div></div></div>
    </DsSection>
    <DsSection title="Текст">
      <div style="display:grid;gap:18px;max-width:70ch"><div v-for="[r, sample] in text" :key="r"><span class="ds-muted" style="font:.72rem var(--sym-font-mono)">{{ r }}</span><div :class="`sym-t-${r}`">{{ sample }}</div></div>
        <div><span class="ds-muted" style="font:.72rem var(--sym-font-mono)">quote</span><blockquote class="sym-t-quote" style="margin:6px 0 0">Культурі потрібні діалог, уява та взаємна увага.</blockquote></div></div>
    </DsSection>
    <DsSection title="Довгі українські слова" description="Заголовки не переносять слова, але ламають їх у крайньому разі (overflow-wrap: anywhere); текст переносить за правилами мови (lang=uk). Перевірте на 320 px.">
      <div class="sym-t-headline">{{ longWords }}</div>
      <p class="sym-t-body" style="max-width:34ch">{{ longWords }}. Дуже довгі слова в вузькій колонці переносяться автоматично, не виходячи за межі екрана.</p>
    </DsSection>
    <DsSection title="Правила"><ul style="padding-inline-start:18px;display:grid;gap:8px;max-width:70ch">
      <li>Один <code class="ds-c">h1</code> на сторінку; рівень (h1–h6) задає структуру, <code class="ds-c">size</code> — вигляд.</li>
      <li>Сторінка не задає <code class="ds-c">font-size</code>: тільки <code class="ds-c">SymHeading</code>, <code class="ds-c">SymText</code>, <code class="ds-c">SymEyebrow</code>.</li>
      <li>Довжина рядка ≤ 66 символів (<code class="ds-c">measure</code>). Заголовки балансуються (<code class="ds-c">text-wrap: balance</code>).</li>
      <li>Українські рядки на 15–30 % довші за англійські: лишайте місце в кнопках і чипах.</li>
      <li>Шрифти самохостяться з пакета: жодного запиту до Google Fonts.</li></ul></DsSection>
  </div>
</template>
