// The path to a page (without «Головна»), found from its address, in the page's language. <Breadcrumbs> on every
// page and the phone header (SiteHeader) both use it, so the two languages and the two places always agree; it is
// known before the page itself renders. Section names go through the interface dictionary (utils/i18n.ts).
import { getEvent, getPerson, getProject, projectYears } from './content'

const sections: Record<string, string> = {
  projects: 'Проєкти', people: 'Люди', events: 'Події', news: 'Новини', support: 'Підтримати',
  press: 'Для медіа', opportunities: 'Можливості', about: 'Про нас', contact: 'Контакти'
}

export function trailFor(path: string, toEn = isEnPath(path)): { label: string; to?: string }[] | undefined {
  const [section, slug] = path.replace(/^\/en(?=\/|$)/, '').split('/').filter(Boolean)
  if (!section || !sections[section]) return undefined
  if (!slug) return [{ label: sections[section] }]
  if (section === 'projects') {
    const project = getProject(slug)
    return project && [{ label: 'Проєкти', to: '/projects' }, { label: projectTitleIn(project, toEn) }]
  }
  if (section === 'people') {
    const person = getPerson(slug)
    return person && [{ label: 'Люди', to: '/people' }, { label: personNameIn(person, toEn) }]
  }
  if (section === 'events') {
    const event = getEvent(slug)
    const project = event && getProject(event.project)
    return event && project && [{ label: 'Проєкти', to: '/projects' }, { label: `${projectTitleIn(project, toEn)} · ${projectYears(project)}`, to: `/projects/${project.slug}` }, { label: eventTitleIn(event, toEn) }]
  }
  return undefined
}
