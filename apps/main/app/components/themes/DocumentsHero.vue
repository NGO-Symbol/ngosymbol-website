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
          <svg class="docs-stamp" viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="docs-stamp-path" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" /></defs>
            <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" stroke-width="5" />
            <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" stroke-width="3" />
            <text font-size="21" fill="currentColor" font-family="EXDocument, monospace"><textPath href="#docs-stamp-path" textLength="458" lengthAdjust="spacingAndGlyphs">ПОКАЖІТЬ СВОЇ ДОКУМЕНТИ… ✦ </textPath></text>
            <g fill="currentColor">
              <rect x="78" y="78" width="14" height="14" /><rect x="108" y="78" width="14" height="14" /><rect x="78" y="108" width="14" height="14" />
              <rect x="96" y="96" width="8" height="8" /><rect x="110" y="110" width="6" height="6" /><rect x="116" y="100" width="6" height="6" /><rect x="100" y="116" width="6" height="6" />
            </g>
          </svg>
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
.docs-stamp { width: min(100%, 230px); color: var(--docs-stamp); mix-blend-mode: multiply; animation: docs-stamp-land 1.2s cubic-bezier(.5, 0, .3, 1.6) 1s both; }
.docs-meta { width: 100%; margin: 0; display: grid; gap: 10px; font-family: var(--docs-mono); font-size: .88rem; }
.docs-meta dt { display: inline-block; background: var(--docs-ink); color: var(--docs-paper); padding: 1px 6px; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 3px; }
.docs-meta dd { margin: 0; }
.docs-site { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 18px 20px 14px; background: var(--docs-ink); color: var(--docs-paper); text-decoration: none; font-family: var(--docs-display); font-size: 1.5rem; text-transform: uppercase; line-height: 1; border: 3px solid var(--docs-ink); box-shadow: 6px 6px 0 var(--docs-stamp); transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease; animation: docs-pop .6s cubic-bezier(.3, 1.6, .5, 1) 1.3s both; }
.docs-site:hover { transform: translate(-3px, -3px); box-shadow: 10px 10px 0 var(--docs-stamp); background: var(--docs-paper); color: var(--docs-ink); }
@keyframes docs-rule { from { transform: scaleX(0); } }
@keyframes docs-tape { from { transform: scaleX(0) rotate(-3deg); } }
@keyframes docs-type { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes docs-pop { from { transform: scale(1.5); opacity: 0; } }
@keyframes docs-stamp-land { 0% { transform: translateY(-80px) scale(1.8) rotate(-30deg); opacity: 0; } 55% { transform: scale(.94) rotate(-14deg); opacity: 1; } 100% { transform: rotate(-12deg); opacity: .92; } }
@media (max-width: 820px) {
  .docs-hero__grid { grid-template-columns: 1fr; }
  .docs-hero__side { grid-template-columns: 120px 1fr; align-items: center; justify-items: stretch; }
  .docs-site { grid-column: 1 / -1; }
}
</style>
