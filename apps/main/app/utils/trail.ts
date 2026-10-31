// The path to a page (without «Головна»), found from its address: the same items each page passes to <Breadcrumbs>.
// The phone header shows it (SiteHeader), so it has to be known before the page itself renders.
import { getEvent, getPerson, getProject, projectYears } from './content'

const sections: Record<string, string> = {
  projects: 'Проєкти', people: 'Люди', events: 'Події', news: 'Новини', support: 'Підтримати',
  press: 'Для медіа', opportunities: 'Можливості', about: 'Про нас'
}

export function trailFor(path: string): { label: string; to?: string }[] | undefined {
  const [section, slug] = path.replace(/^\/en(?=\/|$)/, '').split('/').filter(Boolean)
  if (!section || !sections[section]) return undefined
  if (!slug) return [{ label: sections[section] }]
  if (section === 'projects') {
    const project = getProject(slug)
    return project && [{ label: 'Проєкти', to: '/projects' }, { label: project.title }]
  }
  if (section === 'people') {
    const person = getPerson(slug)
    return person && [{ label: 'Люди', to: '/people' }, { label: person.name }]
  }
  if (section === 'events') {
    const event = getEvent(slug)
    const project = event && getProject(event.project)
    return event && project && [{ label: 'Проєкти', to: '/projects' }, { label: `${project.title} · ${projectYears(project)}`, to: `/projects/${project.slug}` }, { label: event.title }]
  }
  return undefined
}
