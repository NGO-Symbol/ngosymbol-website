/// <reference types="node" />
import { fileURLToPath } from 'node:url'

const css = (f: string) => fileURLToPath(new URL(`./app/assets/css/${f}`, import.meta.url))
const dir = (d: string) => fileURLToPath(new URL(`./app/components/${d}`, import.meta.url))
// fonts are self-hosted from this package (no Google Fonts request: faster, no visitor data sent to a third party)
const font = (p: string) => fileURLToPath(new URL(`./node_modules/@fontsource-variable/${p}`, import.meta.url))

// NGO Symbol design system. An app uses it with `extends: ['@symbol/ui']`; components are auto-imported as <SymButton>, <SymCard>, ...
// Handbook: packages/ui/docs/CONTEXT.md
export default defineNuxtConfig({
  components: [{ path: dir(''), prefix: 'Sym', global: true, pathPrefix: false }],
  css: [fileURLToPath(new URL('../brand/tokens.css', import.meta.url)), fileURLToPath(new URL('../brand/fonts.css', import.meta.url)), font('source-serif-4/opsz.css'), font('manrope/wght.css'), css('tokens.css'), css('tones.css'), css('base.css')],
  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      // The layer order must be declared before ANY stylesheet: component styles load in separate chunks and the first @layer
      // statement the browser meets fixes the order (otherwise sym-components ends up below sym-reset and buttons lose their styles).
      style: [{ innerHTML: '@layer sym-reset, sym-tokens, sym-base, sym-components, sym-utilities, sym-project;', tagPriority: 'critical' }],
    },
    // route change = fade through (.sym-page-* in base.css, handbook «motion»)
    pageTransition: { name: 'sym-page', mode: 'out-in' },
  },
})
