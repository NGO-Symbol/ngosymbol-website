<script setup lang="ts">
// Hero in the identity of «Покажіть свої документи…» (logo, banner, invitation): the project font EXDocument
// by Олексій Чекаль, words on grey tape strips between barcode rules, mono captions, the round blue stamp.
import type { Project } from '~/data/types'

defineProps<{ project: Project }>()
</script>

<template>
  <header class="docs-hero">
    <div class="container docs-hero__inner">
      <Breadcrumbs :items="[{ label: 'Проєкти', to: '/projects' }, { label: project.title }]" />
      <div class="docs-rule" aria-hidden="true"><span /><span /></div>

      <div class="docs-hero__grid">
        <div class="docs-hero__main">
          <p class="docs-kicker"><span>Виставка</span><span>сучасного</span><span>мистецтва</span></p>
          <h1 class="docs-title" :aria-label="project.title">
            <span class="docs-word docs-word--1" aria-hidden="true">Покажіть</span>
            <span class="docs-word docs-word--2" aria-hidden="true">свої</span>
            <span class="docs-word docs-word--3" aria-hidden="true">документи…</span>
          </h1>
        </div>

        <aside class="docs-hero__side">
          <!-- The exhibition stamp, redrawn after the original identity by Олексій Чекаль: thick outer ring, the title
               running clockwise with «СВОЇ» at the top, a double inner ring and a QR code to the project site; rings and words carry ink grain. -->
          <a class="docs-stamp-link" href="https://symbol.ngo/documentsart/" aria-label="Сайт проєкту «Покажіть свої документи…»">
          <svg class="docs-stamp" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="docs-stamp-path" d="M100 100 m0 75 a75 75 0 1 1 0.01 0" />
              <filter id="docs-stamp-ink" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="3" result="grain" />
                <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.45" result="mask" />
                <feComposite in="SourceGraphic" in2="mask" operator="in" />
              </filter>
            </defs>
            <g filter="url(#docs-stamp-ink)" fill="currentColor">
              <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" stroke-width="6" />
              <circle cx="100" cy="100" r="59" fill="none" stroke="currentColor" stroke-width="3" />
              <circle cx="100" cy="100" r="53.5" fill="none" stroke="currentColor" stroke-width="2" />
              <text font-size="23" font-family="EXDocument, monospace" text-anchor="middle"><textPath href="#docs-stamp-path" startOffset="50%" textLength="392" lengthAdjust="spacingAndGlyphs">ПОКАЖІТЬ СВОЇ ДОКУМЕНТИ…</textPath></text>
            </g>
            <!-- A working QR code to the project site (generated for https://symbol.ngo/documentsart/; regenerate for documentsart.symbol.ngo once the subdomain works), printed without grain so phones can read it. -->
            <path class="docs-stamp__qr" fill="currentColor" d="M66.65 66.65h16.10v2.3h-16.10zM89.65 66.65h9.20v2.3h-9.20zM103.45 66.65h2.30v2.3h-2.30zM110.35 66.65h2.30v2.3h-2.30zM117.25 66.65h16.10v2.3h-16.10zM66.65 68.95h2.30v2.3h-2.30zM80.45 68.95h2.30v2.3h-2.30zM85.05 68.95h2.30v2.3h-2.30zM89.65 68.95h2.30v2.3h-2.30zM94.25 68.95h2.30v2.3h-2.30zM98.85 68.95h16.10v2.3h-16.10zM117.25 68.95h2.30v2.3h-2.30zM131.05 68.95h2.30v2.3h-2.30zM66.65 71.25h2.30v2.3h-2.30zM71.25 71.25h6.90v2.3h-6.90zM80.45 71.25h2.30v2.3h-2.30zM96.55 71.25h4.60v2.3h-4.60zM103.45 71.25h2.30v2.3h-2.30zM110.35 71.25h4.60v2.3h-4.60zM117.25 71.25h2.30v2.3h-2.30zM121.85 71.25h6.90v2.3h-6.90zM131.05 71.25h2.30v2.3h-2.30zM66.65 73.55h2.30v2.3h-2.30zM71.25 73.55h6.90v2.3h-6.90zM80.45 73.55h2.30v2.3h-2.30zM87.35 73.55h6.90v2.3h-6.90zM96.55 73.55h6.90v2.3h-6.90zM108.05 73.55h4.60v2.3h-4.60zM117.25 73.55h2.30v2.3h-2.30zM121.85 73.55h6.90v2.3h-6.90zM131.05 73.55h2.30v2.3h-2.30zM66.65 75.85h2.30v2.3h-2.30zM71.25 75.85h6.90v2.3h-6.90zM80.45 75.85h2.30v2.3h-2.30zM85.05 75.85h4.60v2.3h-4.60zM94.25 75.85h2.30v2.3h-2.30zM98.85 75.85h2.30v2.3h-2.30zM105.75 75.85h6.90v2.3h-6.90zM117.25 75.85h2.30v2.3h-2.30zM121.85 75.85h6.90v2.3h-6.90zM131.05 75.85h2.30v2.3h-2.30zM66.65 78.15h2.30v2.3h-2.30zM80.45 78.15h2.30v2.3h-2.30zM87.35 78.15h2.30v2.3h-2.30zM91.95 78.15h2.30v2.3h-2.30zM96.55 78.15h2.30v2.3h-2.30zM105.75 78.15h9.20v2.3h-9.20zM117.25 78.15h2.30v2.3h-2.30zM131.05 78.15h2.30v2.3h-2.30zM66.65 80.45h16.10v2.3h-16.10zM85.05 80.45h2.30v2.3h-2.30zM89.65 80.45h2.30v2.3h-2.30zM94.25 80.45h2.30v2.3h-2.30zM98.85 80.45h2.30v2.3h-2.30zM103.45 80.45h2.30v2.3h-2.30zM108.05 80.45h2.30v2.3h-2.30zM112.65 80.45h2.30v2.3h-2.30zM117.25 80.45h16.10v2.3h-16.10zM91.95 82.75h9.20v2.3h-9.20zM103.45 82.75h6.90v2.3h-6.90zM112.65 82.75h2.30v2.3h-2.30zM66.65 85.05h2.30v2.3h-2.30zM71.25 85.05h2.30v2.3h-2.30zM75.85 85.05h2.30v2.3h-2.30zM80.45 85.05h2.30v2.3h-2.30zM89.65 85.05h4.60v2.3h-4.60zM98.85 85.05h4.60v2.3h-4.60zM105.75 85.05h2.30v2.3h-2.30zM110.35 85.05h4.60v2.3h-4.60zM121.85 85.05h2.30v2.3h-2.30zM128.75 85.05h2.30v2.3h-2.30zM75.85 87.35h4.60v2.3h-4.60zM82.75 87.35h2.30v2.3h-2.30zM91.95 87.35h2.30v2.3h-2.30zM98.85 87.35h4.60v2.3h-4.60zM105.75 87.35h2.30v2.3h-2.30zM112.65 87.35h6.90v2.3h-6.90zM124.15 87.35h2.30v2.3h-2.30zM131.05 87.35h2.30v2.3h-2.30zM66.65 89.65h4.60v2.3h-4.60zM78.15 89.65h9.20v2.3h-9.20zM94.25 89.65h4.60v2.3h-4.60zM112.65 89.65h4.60v2.3h-4.60zM126.45 89.65h6.90v2.3h-6.90zM66.65 91.95h2.30v2.3h-2.30zM73.55 91.95h2.30v2.3h-2.30zM82.75 91.95h4.60v2.3h-4.60zM101.15 91.95h2.30v2.3h-2.30zM105.75 91.95h9.20v2.3h-9.20zM117.25 91.95h4.60v2.3h-4.60zM128.75 91.95h2.30v2.3h-2.30zM73.55 94.25h16.10v2.3h-16.10zM91.95 94.25h4.60v2.3h-4.60zM103.45 94.25h4.60v2.3h-4.60zM112.65 94.25h6.90v2.3h-6.90zM124.15 94.25h2.30v2.3h-2.30zM128.75 94.25h4.60v2.3h-4.60zM66.65 96.55h2.30v2.3h-2.30zM71.25 96.55h6.90v2.3h-6.90zM87.35 96.55h6.90v2.3h-6.90zM96.55 96.55h2.30v2.3h-2.30zM101.15 96.55h4.60v2.3h-4.60zM112.65 96.55h6.90v2.3h-6.90zM124.15 96.55h2.30v2.3h-2.30zM131.05 96.55h2.30v2.3h-2.30zM66.65 98.85h6.90v2.3h-6.90zM75.85 98.85h2.30v2.3h-2.30zM80.45 98.85h2.30v2.3h-2.30zM85.05 98.85h6.90v2.3h-6.90zM94.25 98.85h2.30v2.3h-2.30zM98.85 98.85h9.20v2.3h-9.20zM114.95 98.85h2.30v2.3h-2.30zM119.55 98.85h6.90v2.3h-6.90zM128.75 98.85h4.60v2.3h-4.60zM68.95 101.15h6.90v2.3h-6.90zM82.75 101.15h2.30v2.3h-2.30zM89.65 101.15h11.50v2.3h-11.50zM103.45 101.15h4.60v2.3h-4.60zM112.65 101.15h4.60v2.3h-4.60zM121.85 101.15h4.60v2.3h-4.60zM128.75 101.15h2.30v2.3h-2.30zM71.25 103.45h4.60v2.3h-4.60zM78.15 103.45h4.60v2.3h-4.60zM85.05 103.45h4.60v2.3h-4.60zM94.25 103.45h2.30v2.3h-2.30zM98.85 103.45h9.20v2.3h-9.20zM110.35 103.45h4.60v2.3h-4.60zM117.25 103.45h2.30v2.3h-2.30zM124.15 103.45h2.30v2.3h-2.30zM128.75 103.45h4.60v2.3h-4.60zM68.95 105.75h4.60v2.3h-4.60zM75.85 105.75h2.30v2.3h-2.30zM82.75 105.75h2.30v2.3h-2.30zM89.65 105.75h2.30v2.3h-2.30zM94.25 105.75h2.30v2.3h-2.30zM98.85 105.75h4.60v2.3h-4.60zM105.75 105.75h4.60v2.3h-4.60zM114.95 105.75h4.60v2.3h-4.60zM124.15 105.75h4.60v2.3h-4.60zM131.05 105.75h2.30v2.3h-2.30zM66.65 108.05h2.30v2.3h-2.30zM71.25 108.05h2.30v2.3h-2.30zM75.85 108.05h6.90v2.3h-6.90zM96.55 108.05h2.30v2.3h-2.30zM114.95 108.05h2.30v2.3h-2.30zM119.55 108.05h4.60v2.3h-4.60zM128.75 108.05h4.60v2.3h-4.60zM68.95 110.35h2.30v2.3h-2.30zM73.55 110.35h2.30v2.3h-2.30zM78.15 110.35h2.30v2.3h-2.30zM85.05 110.35h2.30v2.3h-2.30zM91.95 110.35h4.60v2.3h-4.60zM103.45 110.35h4.60v2.3h-4.60zM112.65 110.35h13.80v2.3h-13.80zM128.75 110.35h2.30v2.3h-2.30zM66.65 112.65h2.30v2.3h-2.30zM80.45 112.65h9.20v2.3h-9.20zM101.15 112.65h6.90v2.3h-6.90zM110.35 112.65h13.80v2.3h-13.80zM85.05 114.95h2.30v2.3h-2.30zM89.65 114.95h4.60v2.3h-4.60zM96.55 114.95h2.30v2.3h-2.30zM105.75 114.95h9.20v2.3h-9.20zM121.85 114.95h2.30v2.3h-2.30zM126.45 114.95h6.90v2.3h-6.90zM66.65 117.25h16.10v2.3h-16.10zM87.35 117.25h4.60v2.3h-4.60zM98.85 117.25h2.30v2.3h-2.30zM103.45 117.25h11.50v2.3h-11.50zM117.25 117.25h2.30v2.3h-2.30zM121.85 117.25h4.60v2.3h-4.60zM128.75 117.25h4.60v2.3h-4.60zM66.65 119.55h2.30v2.3h-2.30zM80.45 119.55h2.30v2.3h-2.30zM87.35 119.55h6.90v2.3h-6.90zM96.55 119.55h13.80v2.3h-13.80zM112.65 119.55h2.30v2.3h-2.30zM121.85 119.55h4.60v2.3h-4.60zM128.75 119.55h2.30v2.3h-2.30zM66.65 121.85h2.30v2.3h-2.30zM71.25 121.85h6.90v2.3h-6.90zM80.45 121.85h2.30v2.3h-2.30zM85.05 121.85h4.60v2.3h-4.60zM91.95 121.85h4.60v2.3h-4.60zM98.85 121.85h2.30v2.3h-2.30zM105.75 121.85h2.30v2.3h-2.30zM112.65 121.85h11.50v2.3h-11.50zM131.05 121.85h2.30v2.3h-2.30zM66.65 124.15h2.30v2.3h-2.30zM71.25 124.15h6.90v2.3h-6.90zM80.45 124.15h2.30v2.3h-2.30zM87.35 124.15h4.60v2.3h-4.60zM94.25 124.15h2.30v2.3h-2.30zM98.85 124.15h2.30v2.3h-2.30zM103.45 124.15h4.60v2.3h-4.60zM112.65 124.15h2.30v2.3h-2.30zM121.85 124.15h2.30v2.3h-2.30zM126.45 124.15h6.90v2.3h-6.90zM66.65 126.45h2.30v2.3h-2.30zM71.25 126.45h6.90v2.3h-6.90zM80.45 126.45h2.30v2.3h-2.30zM85.05 126.45h2.30v2.3h-2.30zM94.25 126.45h4.60v2.3h-4.60zM103.45 126.45h2.30v2.3h-2.30zM108.05 126.45h6.90v2.3h-6.90zM119.55 126.45h6.90v2.3h-6.90zM131.05 126.45h2.30v2.3h-2.30zM66.65 128.75h2.30v2.3h-2.30zM80.45 128.75h2.30v2.3h-2.30zM96.55 128.75h4.60v2.3h-4.60zM105.75 128.75h9.20v2.3h-9.20zM117.25 128.75h2.30v2.3h-2.30zM121.85 128.75h2.30v2.3h-2.30zM128.75 128.75h2.30v2.3h-2.30zM66.65 131.05h16.10v2.3h-16.10zM85.05 131.05h4.60v2.3h-4.60zM91.95 131.05h4.60v2.3h-4.60zM105.75 131.05h2.30v2.3h-2.30zM110.35 131.05h4.60v2.3h-4.60zM121.85 131.05h4.60v2.3h-4.60zM128.75 131.05h4.60v2.3h-4.60z" />
          </svg>
          </a>
          <dl class="docs-meta">
            <div><dt>Куратори</dt><dd>Петро Чекаль, Юрій Рассоха</dd></div>
            <div><dt>Дати</dt><dd>17.10.2025 — 07.12.2025</dd></div>
            <div><dt>Місце</dt><dd>ЄрміловЦентр, Харків</dd></div>
          </dl>
          <a v-if="project.subsiteUrl" class="docs-site" :href="project.subsiteUrl" target="_blank" rel="noreferrer">
            <span>Перейти на сайт проєкту</span>
            <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>

      <div class="docs-rule docs-rule--bottom" aria-hidden="true"><span /><span /></div>
    </div>
  </header>
</template>

<style scoped>
.docs-hero { background: var(--docs-paper); color: var(--docs-ink); overflow: hidden; padding: 36px 0 56px; }
.docs-rule { display: grid; gap: 6px; margin: 16px 0 40px; }
.docs-rule span { height: 12px; background: repeating-linear-gradient(90deg, var(--docs-ink) 0 2px, transparent 2px 6px); opacity: .5; transform-origin: left; animation: docs-rule .9s cubic-bezier(.6, 0, .2, 1) both; }
.docs-rule span + span { animation-delay: .15s; }
.docs-rule--bottom { margin: 48px 0 0; }
.docs-hero__grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, 300px); gap: clamp(24px, 4vw, 64px); align-items: center; }
.docs-kicker { display: grid; gap: 4px; margin: 0 0 28px; font-family: var(--docs-display); text-transform: uppercase; font-size: clamp(1.1rem, 2vw, 1.5rem); line-height: 1; }
.docs-kicker span { background: var(--docs-ink); color: var(--docs-paper); padding: 5px 10px 3px; width: fit-content; animation: docs-pop .5s cubic-bezier(.3, 1.6, .5, 1) both; }
.docs-kicker span:nth-child(2) { animation-delay: .1s; } .docs-kicker span:nth-child(3) { animation-delay: .2s; }
.docs-title { margin: 0; display: grid; font-family: var(--docs-display); font-weight: 400; text-transform: uppercase; line-height: .9; font-size: clamp(3.4rem, 10.5vw, 9.5rem); }
.docs-word { position: relative; display: block; width: fit-content; padding: 0 .12em; isolation: isolate; animation: docs-type .7s steps(9, end) both; }
.docs-word::before { content: ''; position: absolute; z-index: -1; inset: 18% -6% 8% -4%; background: color-mix(in srgb, var(--docs-ink) 24%, transparent); transform: rotate(-1.5deg); transform-origin: left; animation: docs-tape .7s cubic-bezier(.6, 0, .2, 1) both; animation-delay: inherit; }
.docs-word--1 { animation-delay: .2s; }
.docs-word--2 { justify-self: center; margin-top: -.06em; font-size: 1.12em; animation-delay: .45s; }
.docs-word--2::before { transform: rotate(-5deg); inset: 22% -10% 10% -10%; }
.docs-word--3 { margin-top: .04em; margin-left: 4%; font-size: .6em; animation-delay: .7s; }
.docs-word--3::before { transform: rotate(2deg); inset: 12% -8% 4% -6%; }
.docs-hero__side { display: grid; gap: 24px; justify-items: center; }
.docs-stamp { width: min(100%, 230px); color: var(--docs-stamp); mix-blend-mode: var(--docs-stamp-blend, multiply); animation: docs-stamp-land 1.2s cubic-bezier(.5, 0, .3, 1.6) 1s both; }
.docs-meta { width: 100%; margin: 0; display: grid; gap: 10px; font-family: var(--docs-mono); font-size: .88rem; }
.docs-meta dt { display: inline-block; background: var(--docs-ink); color: var(--docs-paper); padding: 1px 6px; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 3px; }
.docs-meta dd { margin: 0; }
.docs-site { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 18px 20px 14px; background: var(--docs-ink); color: var(--docs-paper); text-decoration: none; font-family: var(--docs-display); font-size: 1.5rem; text-transform: uppercase; line-height: 1; border: 3px solid var(--docs-ink); box-shadow: 6px 6px 0 var(--docs-stamp); transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease; animation: docs-pop .6s cubic-bezier(.3, 1.6, .5, 1) 1.3s both; }
.docs-site:hover { transform: translate(-3px, -3px); box-shadow: 10px 10px 0 var(--docs-stamp); background: var(--docs-paper); color: var(--docs-ink); }
@keyframes docs-rule { from { transform: scaleX(0); } }
@keyframes docs-tape { from { transform: scaleX(0) rotate(-3deg); } }
@keyframes docs-type { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes docs-pop { from { transform: scale(1.5); opacity: 0; } }
/* The stamp is pressed onto the page: it comes down from above, hits, squeezes the ink out, and settles at a tilt. */
@keyframes docs-stamp-land { 0% { transform: translateY(-40px) scale(1.6) rotate(-24deg); opacity: 0; filter: blur(3px); } 45% { transform: translateY(0) scale(.92) rotate(-12deg); opacity: 1; filter: blur(0); } 55% { transform: scale(.97) rotate(-12deg); } 62% { transform: scale(1.01) rotate(-12deg); } 100% { transform: rotate(-12deg); opacity: .94; } }
.docs-stamp-link { display: inline-block; border-radius: 50%; }
.docs-stamp-link:hover .docs-stamp { transform: rotate(-8deg) scale(1.03); transition: transform .3s ease; }
.docs-stamp-link:focus-visible { outline: 3px solid var(--docs-stamp); outline-offset: 6px; }
@media (max-width: 820px) {
  .docs-hero__grid { grid-template-columns: 1fr; }
  .docs-hero__side { grid-template-columns: 120px 1fr; align-items: center; justify-items: stretch; }
  .docs-site { grid-column: 1 / -1; }
}
</style>
