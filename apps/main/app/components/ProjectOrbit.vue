<script setup lang="ts">
// Home visual hook: project titles with years circle the spiral mark. Hover or focus pauses the orbit
// and shows the project's line below; every title links to its project page.
import mark from '@symbol/brand/symbol-mark.png'

const items = [...projects].sort((a, b) => b.yearStart - a.yearStart)

// Space titles along the orbit in proportion to their length so long names never overlap.
const weights = items.map(project => project.title.length + 9)
const total = weights.reduce((sum, weight) => sum + weight, 0)
const offsets = weights.map((_, index) => (weights.slice(0, index).reduce((sum, weight) => sum + weight, 0) / total) * 100)
const active = ref(0)
const paused = ref(false)
const current = computed(() => items[active.value]!)

function select(index: number) {
  active.value = index
  paused.value = true
}

function open(slug: string) {
  navigateTo(`/projects/${slug}`)
}
</script>

<template>
  <div class="orbit-hook" :class="{ 'is-paused': paused }" @mouseleave="paused = false">
    <svg class="orbit-hook__svg" viewBox="0 0 1000 1000" role="group" aria-label="Проєкти «Символу» на орбіті">
      <defs>
        <path id="orbit-path" d="M 500 500 m -430 0 a 430 430 0 1 1 860 0 a 430 430 0 1 1 -860 0" />
      </defs>
      <circle cx="500" cy="500" r="470" class="orbit-hook__ring" />
      <circle cx="500" cy="500" r="390" class="orbit-hook__ring orbit-hook__ring--dashed" />
      <g class="orbit-hook__spin">
        <text v-for="(project, index) in items" :key="project.slug" class="orbit-hook__title" :class="{ 'is-active': index === active }">
          <textPath href="#orbit-path" :startOffset="`${offsets[index]}%`">
            <a
              :href="`/projects/${project.slug}`"
              @mouseenter="select(index)"
              @focus="select(index)"
              @blur="paused = false"
              @click.prevent="open(project.slug)"
            ><tspan>{{ project.title }}</tspan><tspan class="orbit-hook__year" dx="10">{{ project.yearStart }}</tspan></a>
          </textPath>
        </text>
      </g>
      <g class="orbit-hook__core">
        <image :href="mark" x="290" y="290" width="420" height="420" />
      </g>
    </svg>
    <NuxtLink class="orbit-hook__caption" :to="`/projects/${current.slug}`" aria-live="polite">
      <span class="label">{{ projectByline(current) }} · {{ statusLabels[current.status] }}</span>
      <strong>{{ current.title }}</strong>
      <span>{{ current.summary }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.orbit-hook { display: grid; gap: 18px; justify-items: center; }
.orbit-hook__svg { width: 100%; max-width: 620px; height: auto; overflow: visible; }
.orbit-hook__ring { fill: none; stroke: var(--symbol-plum); stroke-width: 1.2; opacity: .35; }
.orbit-hook__ring--dashed { stroke-dasharray: 3 9; opacity: .5; }
.orbit-hook__spin { transform-origin: 500px 500px; animation: orbit-spin 90s linear infinite; }
.orbit-hook.is-paused .orbit-hook__spin { animation-play-state: paused; }
.orbit-hook__core { transform-origin: 500px 500px; animation: orbit-breathe 9s ease-in-out infinite; }
.orbit-hook__title { font-family: 'Newsreader', Georgia, serif; font-size: 23px; fill: var(--symbol-plum); }
.orbit-hook__title a { cursor: pointer; outline: none; }
.orbit-hook__title.is-active { fill: var(--symbol-violet); text-decoration: underline; }
.orbit-hook__year { font-family: 'DM Sans', sans-serif; font-size: 15px; letter-spacing: .1em; fill: var(--symbol-violet); }
.orbit-hook__caption { width: min(100%, 460px); display: grid; gap: 6px; text-align: center; text-decoration: none; min-height: 7.5em; }
.orbit-hook__caption strong { font-family: 'Newsreader', Georgia, serif; font-weight: 400; font-size: 1.6rem; line-height: 1.1; }
.orbit-hook__caption span:last-child { font-size: .92rem; line-height: 1.5; }
.orbit-hook__caption .label { color: var(--symbol-violet); }
@keyframes orbit-spin { to { transform: rotate(360deg); } }
@keyframes orbit-breathe { 50% { transform: rotate(-8deg) scale(1.03); } }
</style>
