// PostCSS plugin for every app on the brand layer: hover effects apply only where there is a real pointer to hover
// with (a mouse or trackpad). On touch screens a tap would otherwise leave a card lifted or a link highlighted until
// the next tap elsewhere; there the tap animations answer instead (plugins/tap.client.ts in the main app).
// A rule's `:hover` selectors move into `@media (hover: hover) and (pointer: fine)`; its other selectors (`:focus-visible`,
// plain ones) stay where they are, so the keyboard focus look is untouched.
const query = '(hover: hover) and (pointer: fine)'

const insideHoverQuery = (node) => {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (parent.type === 'atrule' && parent.name === 'media' && parent.params.includes('hover: hover')) return true
  }
  return false
}

const plugin = () => ({
  postcssPlugin: 'symbol-hover-only',
  Once(root, { AtRule }) {
    root.walkRules((rule) => {
      if (!rule.selector.includes(':hover') || insideHoverQuery(rule)) return
      if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return
      const hover = rule.selectors.filter(selector => selector.includes(':hover'))
      const rest = rule.selectors.filter(selector => !selector.includes(':hover'))
      const media = new AtRule({ name: 'media', params: query })
      media.append(rule.clone({ selectors: hover }))
      rule.after(media)
      if (rest.length) rule.selectors = rest
      else rule.remove()
    })
  }
})
plugin.postcss = true
export default plugin
