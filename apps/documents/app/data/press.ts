// Media about «Покажіть свої документи…»: the main site's press list (apps/main/app/data/press.ts) is the one source,
// so the project page on symbol.ngo and this site always show the same publications.
import { press as allPress } from '#symbol/press'
import type { PressMention } from '#symbol/types'

export type PressItem = PressMention
export const press: PressItem[] = allPress.filter(item => item.projects.includes('pokazhit-svoi-dokumenty'))
