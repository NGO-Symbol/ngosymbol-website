// Starts the app's JavaScript after the first paint instead of racing the page's own content for the network.
//
// Why: every page is prerendered, so the text, photos and styles are all in the HTML. Nuxt still puts the entry script
// (<script type="module">) and ~10 <link rel="modulepreload"> hints in the <head>, and the browser starts downloading
// ~225 KB of framework code at the same moment as the stylesheet and the font. On a phone connection (Lighthouse's
// 4G profile) that shared bandwidth delayed the first paint of the home page to 2.6 s and its largest text to 2.9 s;
// with the scripts held back until after the first frame they are 1.2 s and 1.5 s (measured with 150 ms of server
// latency, see documents/knowledge/changes/2026-11-15-seo-release.md).
//
// How: the hints and the entry script are removed from the HTML and added by a tiny inline script after two animation
// frames (the first frame cannot run before the stylesheet has loaded, so the second one is after the first paint),
// with a timer as a safety net for background tabs. The same URLs, the same order: hydration, the logo intro and
// the menu work as before, a moment later.
export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return
  nitroApp.hooks.hook('render:html', (html) => {
    const hints: string[] = []
    let entry: string | undefined
    html.head = html.head.map(chunk => chunk
      .replace(/<link rel="modulepreload"[^>]*?href="([^"]+)"[^>]*>/g, (_, href: string) => { hints.push(href); return '' })
      .replace(/<script type="module" src="([^"]+)"[^>]*><\/script>/, (match, src: string) => { entry = src; return '' }))
    if (!entry) return
    const urls = JSON.stringify({ hints, entry }).replace(/</g, '\\u003c')
    html.head.push(`<script>(function(){var u=${urls},go=function(){if(go.done)return;go.done=1;u.hints.forEach(function(h){var l=document.createElement('link');l.rel='modulepreload';l.crossOrigin='';l.href=h;document.head.appendChild(l)});var s=document.createElement('script');s.type='module';s.crossOrigin='';s.src=u.entry;document.head.appendChild(s)},w=function(){requestAnimationFrame(function(){requestAnimationFrame(go)})};document.readyState==='loading'?addEventListener('DOMContentLoaded',w):w();setTimeout(go,2500)})()</script>`)
  })
})
