# Synchronization checklist

## Determine the delta

- What is genuinely new since the current `Last consolidated` date?
- Is it a fact, correction, decision, proposal, or open question?
- Which existing statement does it supersede?
- Does it affect public copy, code configuration, routes, or deployment?

## Update the smallest canonical set

- Identity/team/capabilities → `organization.md`
- Project facts/routes/status → `project-registry.md`
- Goals/audiences/MVP/content workflow → `website-strategy.md`
- Navigation/page or subdomain model → `information-architecture.md`
- Palette/type/layout direction → `design-system.md`
- Stack/repository/hosting/DNS → `technical-architecture.md`
- Unresolved decisions → `open-questions.md`
- Evidence → `sources.md`

Update the graph only for durable entities or relations that help future discovery. Update code only when a confirmed decision makes an existing registry or configuration inaccurate.

## Decision record

Create or supersede an ADR if reversing the choice later would require a migration, change public URLs, alter repository boundaries, affect hosting, or materially change the design system.

## Finish

- Add `changes/YYYY-MM-DD-topic.md`.
- Update the `Last consolidated` date in `INDEX.md` when facts or decisions changed.
- Run `pnpm kb:validate`.
- Review `git diff` for contradictions and accidental private data.
