# Deployment and one-time GitHub setup

Both sites are static Nuxt builds published by
[`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) on every push to `main`.
The decision and its alternatives are recorded in
[ADR-0005](../knowledge/decisions/ADR-0005-multi-app-hosting.md).

| Site | Built from | Published to | Pages source |
| --- | --- | --- | --- |
| `symbol.ngo` | `apps/main` | this repository | GitHub Actions |
| `my-street.symbol.ngo` | `apps/istoriia-vulytsi` | `NGO-Symbol/istoriia-vulytsi` (deploy-only) | `gh-pages` branch |
| `documentsart.symbol.ngo` | `apps/documents` | `NGO-Symbol/documentsart` (deploy-only) | `gh-pages` branch |

GitHub Pages serves one site per repository, so each autonomous project needs its own
deploy-only repository. Nobody edits those repositories by hand; the workflow overwrites them.

The repository belongs to the `NGO-Symbol` organization (free plan). Everything below requires an
organization **owner** and is done once.
Commands use the GitHub CLI (`gh`); each step also names the web UI location.

## 1. Repository settings

Before making the repository public, confirm that nothing private is committed
(`documents/knowledge` is published with the code).

```bash
gh repo edit NGO-Symbol/ngosymbol-website \
  --visibility public --accept-visibility-change-consequences \
  --enable-auto-merge --delete-branch-on-merge \
  --enable-squash-merge --enable-merge-commit=false --enable-rebase-merge=false
```

Web UI: Settings → General (visibility is under “Danger Zone”; merge options under “Pull Requests”).

## 2. Protect `main`

Changes reach `main` only through a pull request whose `validate` check (CI) passed.

```bash
gh api -X POST repos/NGO-Symbol/ngosymbol-website/rulesets --input - <<'EOF'
{
  "name": "protect-main",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request", "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false } },
    { "type": "required_status_checks", "parameters": {
        "strict_required_status_checks_policy": false,
        "required_status_checks": [{ "context": "validate" }] } }
  ]
}
EOF
```

Web UI: Settings → Rules → Rulesets. Raise `required_approving_review_count` to 1 if a
person should approve every change before it goes live.

## 3. Main site on GitHub Pages

```bash
gh api -X POST repos/NGO-Symbol/ngosymbol-website/pages -f build_type=workflow
```

Web UI: Settings → Pages → Source: **GitHub Actions**. Until the custom domain is active the
site is available at `https://ngo-symbol.github.io/ngosymbol-website/`.

## 4. Street History deploy repository

```bash
gh repo create NGO-Symbol/istoriia-vulytsi --public \
  --description "Build output of my-street.symbol.ngo. Source: NGO-Symbol/ngosymbol-website" \
  --add-readme

ssh-keygen -t ed25519 -N "" -C "street-deploy" -f street_deploy_key
gh repo deploy-key add street_deploy_key.pub -R NGO-Symbol/istoriia-vulytsi --allow-write -t "deploy from ngosymbol-website"
gh secret set STREET_DEPLOY_KEY -R NGO-Symbol/ngosymbol-website < street_deploy_key
gh variable set STREET_DEPLOY_REPO -R NGO-Symbol/ngosymbol-website -b NGO-Symbol/istoriia-vulytsi
rm street_deploy_key street_deploy_key.pub
```

Deploy keys are disabled by default in new organizations; enable them first
(Organization settings → Repository → Deploy keys, or
`gh api -X PATCH orgs/NGO-Symbol -F deploy_keys_enabled_for_repositories=true`).

Run the **Deploy** workflow once (Actions → Deploy → Run workflow) so the `gh-pages` branch exists, then:

```bash
gh api -X POST repos/NGO-Symbol/istoriia-vulytsi/pages -f "source[branch]=gh-pages" -f "source[path]=/"
```

Web UI: in `NGO-Symbol/istoriia-vulytsi` → Settings → Pages → Deploy from a branch → `gh-pages` / root.

## 4a. «Покажіть свої документи…» deploy repository (documentsart.symbol.ngo)

Same steps as section 4, with its own names. The `documents-site` job stays skipped until `DOCS_DEPLOY_REPO` is set.

```bash
gh repo create NGO-Symbol/documentsart --public \
  --description "Build output of documentsart.symbol.ngo. Source: NGO-Symbol/ngosymbol-website" \
  --add-readme

ssh-keygen -t ed25519 -N "" -C "docs-deploy" -f docs_deploy_key
gh repo deploy-key add docs_deploy_key.pub -R NGO-Symbol/documentsart --allow-write -t "deploy from ngosymbol-website"
gh secret set DOCS_DEPLOY_KEY -R NGO-Symbol/ngosymbol-website < docs_deploy_key
gh variable set DOCS_DEPLOY_REPO -R NGO-Symbol/ngosymbol-website -b NGO-Symbol/documentsart
gh variable set DOCS_DOMAIN -R NGO-Symbol/ngosymbol-website -b documentsart.symbol.ngo
rm docs_deploy_key docs_deploy_key.pub
```

Run the Deploy workflow once, then turn on Pages for `NGO-Symbol/documentsart` (branch `gh-pages`, root), and add in
Cloudflare: `CNAME` `documentsart` → `ngo-symbol.github.io` (DNS only). Until then the site is built inside the main site at `symbol.ngo/documentsart/`; once the subdomain works, point
`subsiteUrl` (projects.ts) and the stamp QR code in `DocumentsHero.vue` to `https://documentsart.symbol.ngo/`.

## 5. Domain (DNS is managed in Cloudflare)

`symbol.ngo` is registered at Cloudflare and its DNS lives there. Google Workspace mail uses the
existing `MX` and `TXT` records — **do not delete or edit them**.

1. Verify the domain for the organization (prevents takeover): github.com/organizations/NGO-Symbol/settings/pages →
   Add a domain → `symbol.ngo`. Add the shown `TXT` record (`_github-pages-challenge-NGO-Symbol`)
   in Cloudflare, then press Verify.
2. In Cloudflare → `symbol.ngo` → DNS → Records, add (Proxy status: **DNS only**, grey cloud —
   GitHub cannot issue the HTTPS certificate through the Cloudflare proxy):

   | Type | Name | Content |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `ngo-symbol.github.io` |
   | CNAME | `istoriia-vulytsi` | `ngo-symbol.github.io` |
   | CNAME | `documentsart` | `ngo-symbol.github.io` |

   Never add a wildcard (`*`) record.
3. Attach the domains:

   ```bash
   gh api -X PUT repos/NGO-Symbol/ngosymbol-website/pages -f cname=symbol.ngo
   gh variable set STREET_DOMAIN -R NGO-Symbol/ngosymbol-website -b my-street.symbol.ngo
   gh workflow run deploy.yml -R NGO-Symbol/ngosymbol-website
   ```

   The workflow switches both builds from the temporary `github.io/<repo>/` path to the root
   path and writes the `CNAME` file into the Street History deploy repository.
4. After the certificate is issued (minutes to a few hours), enable **Enforce HTTPS** in
   Settings → Pages of both repositories.

## 6. Collaborators

Invite each editor with **Write** access (Settings → Collaborators). Each computer needs Git,
Node 22, pnpm (`corepack enable`), and an authenticated GitHub CLI (`gh auth login`); the daily
workflow is in [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

## Adding another autonomous project

Create `apps/{project}`, then copy the `street-site` job in `deploy.yml` with its own
deploy repository, key, and domain variables, and add one `CNAME` record for the subdomain.

## Troubleshooting

- Deploy job fails at “configure-pages”: step 3 was not done.
- `street-site` job is skipped: `STREET_DEPLOY_REPO` variable is missing.
- Site loads without styles: the custom-domain setting and the `STREET_DOMAIN` variable or
  Pages custom domain disagree; rerun the Deploy workflow after fixing.
- Certificate stays pending: a record is proxied (orange cloud) in Cloudflare.
