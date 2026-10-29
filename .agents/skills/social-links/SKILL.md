---
name: social-links
description: Add or show links to social networks and websites of the NGO, artists, team members, partners or donors («додай інстаграм», «посилання на соцмережі», «фейсбук митця», partner/donor pages). Use whenever a page would otherwise mention a social network as plain text.
---

# Social links

A social profile on the site is never written as plain text («Instagram ↗», «наш Фейсбук»). It is always a link with the network's **name and a minimal icon**, rendered by one component.

## How

1. Store only the address in data:
   - the NGO's own channels: `apps/main/app/data/social.ts` (`socials`);
   - a person: `links: [{ label, url }]` in `apps/main/app/data/people.ts`;
   - a partner or donor: `url` in `apps/main/app/data/organizations.ts`.
2. Render with `<SocialLink :url="…" />`. The network (Instagram, Telegram, Facebook, WhatsApp, LinkedIn, YouTube, TikTok, X, Behance, Vimeo, e-mail) is detected from the address by `networkOf()` in `apps/main/app/utils/social.ts`, and the icon comes from `SocialIcon.vue`. Pass `label` only for a non-social website (e.g. a personal portfolio).
3. If a new network appears, add its host pattern to `utils/social.ts` and a line icon to `SocialIcon.vue` in the same stroke style: 24-unit grid, `stroke: currentColor`, width 1.6, round caps, no fills except small dots.
4. Partner and donor tiles (`PartnerTiles.vue`) show the icon automatically when an organization's `url` is a social profile.

## Rules

- Use only addresses that belong to the person or organization: their own site, or the profile linked from their site, our posts or their posts. Check that each one opens (HTTP 200) before adding it.
- Prefer an official website. Use the main social profile only when there is no website.
- No personal contacts (phone, private e-mail) for people. Follow the CV rule: only general, non-sensitive information.
- Every partner and donor must link somewhere. If no page can be found, leave `url` out and record it in `documents/knowledge/open-questions.md`.
- Values people copy (ЄДРПОУ, full name, e-mail, bank details) use `<CopyValue :value="…" />`, which works on phones too.
