# ADR-0005: Multi-app hosting platform

- Status: Proposed
- Date: 2026-10-10

## Context

One repository must deploy at least two independent static applications to `symbol.ngo` and `istoriia-vulytsi.symbol.ngo`.

## Proposal

Use separate Cloudflare Pages projects connected to the same monorepo. Each project has its own build command, output, domain, and watch paths.

## Alternative

Keep the main site on GitHub Pages and publish each autonomous site from a separate deployment repository. This preserves GitHub Pages but adds synchronization and repository overhead.

## Decision needed

Confirm the DNS provider, repository visibility/plan, and preferred hosting account before accepting this ADR.

