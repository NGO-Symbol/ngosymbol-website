# ADR-0002: Code-authored content without a CMS

- Status: Accepted
- Date: 2026-10-10

## Context

Projects can have substantially different structures, components, and interactions. A schema-first CMS would either constrain them or require costly custom modeling.

## Decision

Do not introduce a CMS for the initial system. Content and pages are edited in the repository, supported by pull requests and coding agents.

## Consequences

The organization receives maximum implementation flexibility but content updates require Git-capable contributors or agent assistance. Structured registries remain small and are used only where consistency creates real value.

