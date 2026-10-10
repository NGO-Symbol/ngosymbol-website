# ADR-0003: Nuxt 4 static-first monorepo

- Status: Accepted
- Date: 2026-10-10

## Context

The organization prefers Vue, needs independently designed project sites, wants one GitHub repository, and aims for a low-cost launch.

## Decision

Use Nuxt 4 / Vue 3 in a pnpm monorepo. Each autonomous hostname is an independent app. Begin with static generation; introduce Nitro runtime features only when a concrete requirement needs a server.

## Consequences

Apps can deploy independently while sharing selected assets. Multiple subdomains require multiple deployment targets even though the source remains in one repository.

