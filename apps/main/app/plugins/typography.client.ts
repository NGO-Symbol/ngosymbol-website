// Ukrainian typography: short words (prepositions, conjunctions, particles — «і», «й», «в», «з», «до», «від», «для»…)
// never hang at the end of a line; a non-breaking space ties them to the word they belong to. A dash or an arrow never starts a
// line either. Applied to rendered text (not to SVG, code or form fields), again after every page change and update.
const NBSP = '\u00A0'
const shortWord = /(^|[\s(«„"“\u2014\u2013/])([A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії’'ʼ]{1,3}) (?=\S)/g
const beforeDash = / (?=[\u2014\u2013] )/g
const beforeArrow = / (?=[→↗←↑↓](?:\s|$))/g
const skip = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE', 'svg'])

function fix(text: string) {
  // Twice, so that runs of short words («і в до») are all tied.
  return text.replace(shortWord, `$1$2${NBSP}`).replace(shortWord, `$1$2${NBSP}`).replace(beforeDash, NBSP).replace(beforeArrow, NBSP)
}

function apply(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      for (let el = node.parentElement; el; el = el.parentElement) {
        if (skip.has(el.tagName) || el.isContentEditable) return NodeFilter.FILTER_REJECT
      }
      return node.nodeValue && / /.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    }
  })
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const next = fix(node.nodeValue!)
    if (next !== node.nodeValue) node.nodeValue = next
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  let queued = false
  const run = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => { queued = false; apply(document.body) })
  }
  nuxtApp.hook('app:mounted', () => {
    run()
    new MutationObserver(run).observe(document.body, { childList: true, subtree: true, characterData: true })
  })
  nuxtApp.hook('page:finish', run)
})
