<script setup lang="ts">
// Media about the exhibition as a register of the case: who wrote is what matters (most titles only repeat the
// exhibition's name), so the outlet is marked like a name in a file and the title is a small line under it. An
// interview with the team keeps its title large. Newest first; items without a stated date come last.
import { press } from '~/data/press'

const { t, isEn } = useLang()
useSeoMeta({ title: () => t('Преса', 'Press'), description: () => t('Публікації в медіа про виставку «Покажіть свої документи…».', 'Media coverage of the exhibition «May I See Your Documents…».') })
const items = [...press].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
const kinds = { review: ['Огляд', 'Review'], announcement: ['Анонс', 'Announcement'], 'open-call': ['Опен-кол', 'Open call'], listing: ['Добірка', 'Listing'], video: ['Відео', 'Video'], radio: ['Радіо', 'Radio'], post: ['Допис', 'Post'] } as const
const formatDate = (iso: string) => new Date(iso).toLocaleDateString(isEn.value ? 'en-GB' : 'uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">{{ t('Медіа про виставку', 'In the media') }} · {{ press.length }}</span>
      <h1>{{ t('Преса', 'Press') }}</h1>
      <p>{{ t('Огляди, анонси, радіо, відео й добірки, у яких згадано виставку. Публікації українською.', 'Reviews, announcements, radio, video and listings that mention the exhibition. In Ukrainian.') }}</p>
    </div>

    <DocsSheet :case-no="t('Справа № ПСД-2025', 'Case No. PSD-2025')" :kind="t('Реєстр згадок у медіа', 'Register of media mentions')" :sheet="1">
      <ol class="register">
        <li v-for="(item, index) in items" :key="item.url" :class="{ 'is-interview': item.interview }">
          <a class="entry" :href="item.url" target="_blank" rel="noreferrer">
            <span class="entry__no">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="entry__body">
              <span class="entry__outlet"><mark>{{ item.outlet }}</mark></span>
              <span v-if="item.interview" class="entry__title entry__title--big">{{ item.title }}</span>
              <span v-else class="entry__title">{{ item.title }}</span>
            </span>
            <span class="entry__meta">
              <span v-if="item.interview" class="entry__stamp">{{ t('Інтерв’ю з командою', 'Interview with the team') }}</span>
              <span v-else-if="item.kind" class="docs-label">{{ kinds[item.kind][isEn ? 1 : 0] }}</span>
              <time v-if="item.date" :datetime="item.date">{{ formatDate(item.date) }}</time>
              <span v-if="item.author">{{ item.author }}</span>
            </span>
          </a>
        </li>
      </ol>
    </DocsSheet>
  </section>
</template>

<style scoped>
.register { list-style: none; margin: 0; padding: 0; }
.entry { display: grid; grid-template-columns: 2.4em minmax(0, 1fr) auto; gap: 6px 18px; align-items: baseline; padding: 16px 0 14px; border-bottom: 1px dashed color-mix(in srgb, var(--docs-ink) 40%, transparent); color: var(--docs-ink); text-decoration: none; }
.register li:first-child .entry { padding-top: 4px; }
.entry__no { font-family: var(--docs-mono); font-size: .72rem; color: var(--docs-muted); }
.entry__body { display: grid; gap: 6px; justify-items: start; }
/* The outlet, marked with a highlighter stroke like a name picked out in a file. */
.entry__outlet { font-family: var(--docs-display); text-transform: uppercase; font-size: clamp(1.35rem, calc(1rem + 1.4vw), 2.2rem); line-height: 1; }
.entry__outlet mark { color: inherit; padding: 0 .12em; background: linear-gradient(transparent 52%, color-mix(in srgb, var(--docs-stamp) 34%, transparent) 52%, color-mix(in srgb, var(--docs-stamp) 34%, transparent) 92%, transparent 92%); box-decoration-break: clone; -webkit-box-decoration-break: clone; transition: background-size .3s ease; }
.entry:hover .entry__outlet mark { background: linear-gradient(transparent 20%, color-mix(in srgb, var(--docs-stamp) 34%, transparent) 20%, color-mix(in srgb, var(--docs-stamp) 34%, transparent) 92%, transparent 92%); }
.entry__title { font-family: var(--docs-mono); font-size: .8rem; color: var(--docs-muted); line-height: 1.45; }
.entry__title--big { font-family: var(--docs-display); text-transform: uppercase; font-size: clamp(1.1rem, calc(.9rem + .9vw), 1.6rem); color: var(--docs-ink); line-height: 1.1; }
.entry__meta { display: grid; gap: 6px; justify-items: end; text-align: right; font-family: var(--docs-mono); font-size: .72rem; color: var(--docs-muted); }
/* The interview gets the blue stamp instead of a label. */
.entry__stamp { padding: 3px 8px 2px; border: 2px solid var(--docs-stamp); color: var(--docs-stamp); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; transform: rotate(-4deg); }
.is-interview .entry { padding-block: 22px 20px; }
@media (max-width: 640px) {
  .entry { grid-template-columns: 1.8em minmax(0, 1fr); }
  .entry__meta { grid-column: 2; justify-items: start; text-align: left; grid-auto-flow: column; justify-content: start; align-items: center; }
}
</style>
