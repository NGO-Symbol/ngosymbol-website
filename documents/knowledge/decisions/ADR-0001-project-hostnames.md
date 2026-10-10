# ADR-0001: Internal routes for small projects and subdomains for autonomous projects

- Status: Accepted
- Date: 2026-10-10

## Context

Projects range from small initiatives needing one concise page to large experiences with independent navigation, page trees, visual identity, and release cycles.

## Decision

Small projects live at `symbol.ngo/projects/{slug}`. Large autonomous projects deploy to `{project}.symbol.ngo`. The main project gallery links directly to the correct destination and does not insert an unnecessary intermediate case page.

## Alternatives

- Put every project under `/projects/{slug}`.
- Give every project its own subdomain.
- Use unrelated external domains.

## Consequences

The repository and deployment pipeline must support multiple applications and hostnames. Shared institutional metadata remains centralized, while large projects receive genuine technical and visual autonomy.

