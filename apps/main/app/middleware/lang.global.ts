// Keeps English sticky: from an English page, internal links (written as Ukrainian paths) open the English
// mirror, unless the visitor chose Ukrainian in the language switch.
export default defineNuxtRouteMiddleware((to, from) => {
  const explicit = langSwitch.explicit
  langSwitch.explicit = false
  if (explicit || !isEnPath(from.path) || isEnPath(to.path)) return
  if (to.path.startsWith('/events.ics') || to.path.startsWith('/press-kit') || to.path.startsWith('/media')) return
  return navigateTo({ path: switchLangPath(to.path, true), query: to.query, hash: to.hash })
})
