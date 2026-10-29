<script setup lang="ts">
// Media about the exhibition, newest first; items without a stated date come last.
import { press } from '~/data/press'

const { t, isEn } = useLang()
useSeoMeta({ title: () => t('Преса', 'Press'), description: () => t('Публікації в медіа про виставку «Покажіть свої документи…».', 'Media coverage of the exhibition «May I See Your Documents…».') })
const items = [...press].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
const kinds = { review: ['Огляд', 'Review'], announcement: ['Анонс', 'Announcement'], 'open-call': ['Опен-кол', 'Open call'], listing: ['Добірка', 'Listing'], video: ['Відео', 'Video'], radio: ['Радіо', 'Radio'], post: ['Допис', 'Post'] } as const
const formatDate = (iso: string) => new Date(iso).toLocaleDateString(isEn.value ? 'en-GB' : 'uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <section class="docs-container docs-page">
    <div class="docs-page-title">
      <span class="docs-label">{{ t('Медіа про виставку', 'In the media') }} · {{ press.length }}</span>
      <h1>{{ t('Преса', 'Press') }}</h1>
      <p>{{ t('Огляди, анонси, радіо, відео й добірки, у яких згадано виставку. Публікації українською.', 'Reviews, announcements, radio, video and listings that mention the exhibition. In Ukrainian.') }}</p>
    </div>
    <ol class="press">
      <li v-for="item in items" :key="item.url">
        <a class="press-item" :href="item.url" target="_blank" rel="noreferrer">
          <span class="press-item__meta">
            <span v-if="item.kind" class="docs-label">{{ kinds[item.kind][isEn ? 1 : 0] }}</span>
            <span>{{ item.outlet }}</span>
            <span v-if="item.author">{{ item.author }}</span>
            <time v-if="item.date" :datetime="item.date">{{ formatDate(item.date) }}</time>
          </span>
          <span class="press-item__title">{{ item.title }}</span>
        </a>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.press { list-style: none; margin: 0; padding: 0; }
.press-item { display: grid; gap: 8px; padding: 20px 0; border-top: 2px dashed var(--docs-ink); text-decoration: none; }
.press-item__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; font-size: .82rem; color: var(--docs-muted); }
.press-item__title { font-family: var(--docs-display); text-transform: uppercase; font-size: clamp(1.15rem, calc(.9rem + 1vw), 1.7rem); line-height: 1.1; }
.press-item:hover .press-item__title { text-decoration: underline; text-decoration-thickness: 2px; }
</style>
