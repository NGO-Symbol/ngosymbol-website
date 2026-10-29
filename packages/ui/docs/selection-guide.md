# Selection guide: which component for which job

Pick by the job, not the look. Each registry entry (`ds/registry/<Name>.ts`, shown at `/components/<name>`) carries the full «use / avoid». If nothing fits: do not hand-roll markup in a page; add a component ([[component-contract]]).

## Layout (pages never write flex/grid/margin CSS)
| Job | Use | Not this |
|---|---|---|
| A full-width band with its own colours | `SymSection tone` | a `div` with a background |
| Width limit + side margins | `SymContainer` (inside Section by default) | own `max-width` |
| Vertical rhythm of blocks | `SymStack gap` | margins on children |
| Buttons / chips / tags that wrap | `SymCluster` (`scroll` on phones) | buttons directly in a Stack |
| Responsive cards, people, facts | `SymGrid min` / `cols` | own grid CSS |
| Text beside image / label beside text | `SymSplit ratio` | floats, own columns |

## Text
| Job | Use |
|---|---|
| Any heading | `SymHeading level size` (one h1 per page) |
| Section title with kicker + intro | `SymSectionHeading` |
| Page title block | `SymPageHeader` |
| Paragraph | `SymText` (`lead`, `body`, `sm`, `caption`) |
| Long rich content | `SymProse` |
| Small uppercase label | `SymEyebrow` |
| Pull quote (real quotes only) | `SymQuote` |
| Facts list (period, status, place) | `SymMetaList`; a number needs `SymStat` with a `source` |

## Actions and links
| Job | Use |
|---|---|
| Main action of a block | `SymButton` (solid, one per block) |
| Second / third action | `SymButton variant="outline" \| "text"` |
| Link in a sentence or list | `SymLink` |
| Icon-only action | `SymIconButton` with `label` |
| Filter | `SymFilterBar` (of `SymChip`) |
| Status / category label | `SymTag` |

## Content
| Job | Use |
|---|---|
| A project in a list | `SymProjectCard` |
| A person | `SymPersonCard` |
| Image / video still | `SymMedia` (always `alt`); several → `SymGallery` |
| Questions and answers, long optional detail | `SymAccordion` |
| Closing call to action | `SymCallout` inside a toned `SymSection` |
| History | `SymTimeline` |
| Partners / donors (confirmed only) | `SymLogoWall` |
| Nothing to show yet | `SymEmptyState` |
| Site-wide announcement | `SymBanner` |
| Any bordered block | `SymCard` (no card inside a card) |

## Site frame
`SymSkipLink` → `SymSiteHeader` → `<main id="main">` → `SymSiteFooter`. Autonomous project sites add `SymProjectBar` above the header. `SymBreadcrumb` on nested pages.

## Brand and motion
`SymMark` = the official logo (never recoloured). `SymOrbit` = decorative spiral geometry. `SymReveal` = appear on scroll (wrap blocks, not tiny items).
