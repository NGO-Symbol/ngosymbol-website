// Safe Git workflow for people and coding agents.
// Usage: node scripts/task.mjs <status|new|save|ship> [args]
// Wrapped by `pnpm task:status`, `pnpm task:new`, `pnpm task:save`, `pnpm task:ship`.
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const MAIN = 'main'
const BRANCH_PREFIX = 'task/'
const isWindows = process.platform === 'win32'

function run(cmd, args, { allowFail = false, quiet = false, inherit = false } = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: inherit ? 'inherit' : 'pipe',
    shell: isWindows && cmd !== 'git'
  })
  const out = (result.stdout || '').trim()
  const err = (result.stderr || '').trim()
  if (result.status !== 0 && !allowFail) {
    if (!quiet && !inherit) console.error(err || out)
    fail(`Command failed: ${cmd} ${args.join(' ')}`)
  }
  return { ok: result.status === 0, out, err }
}

const git = (...args) => run('git', args).out
const gitTry = (...args) => run('git', args, { allowFail: true })

function fail(message, hint) {
  console.error(`\n✖ ${message}`)
  if (hint) console.error(`→ ${hint}`)
  process.exit(1)
}

function currentBranch() {
  return git('rev-parse', '--abbrev-ref', 'HEAD')
}

function changedFiles() {
  const out = git('status', '--porcelain')
  return out ? out.split('\n') : []
}

function hasGh() {
  return run('gh', ['auth', 'status'], { allowFail: true }).ok
}

function fetchOrigin() {
  const result = gitTry('fetch', '--prune', 'origin')
  if (!result.ok) console.warn('⚠ Could not reach GitHub (offline?). Showing local state only.')
  return result.ok
}

function repoWebUrl() {
  const url = git('remote', 'get-url', 'origin')
  const match = url.match(/github\.com[:/](.+?)(\.git)?$/)
  return match ? `https://github.com/${match[1]}` : null
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

function status() {
  fetchOrigin()
  const branch = currentBranch()
  const files = changedFiles()
  console.log(`Branch: ${branch}${branch === MAIN ? ' (read-only: start a task before editing)' : ''}`)

  if (files.length) {
    console.log(`\nUnsaved changes (${files.length}):`)
    for (const line of files.slice(0, 20)) console.log(`  ${line}`)
    if (files.length > 20) console.log('  …')
  } else {
    console.log('\nNo unsaved changes.')
  }

  if (branch !== MAIN) {
    const unpushed = gitTry('rev-list', '--count', `origin/${branch}..HEAD`)
    const local = unpushed.ok ? unpushed.out : git('rev-list', '--count', `origin/${MAIN}..HEAD`)
    const behind = git('rev-list', '--count', `HEAD..origin/${MAIN}`)
    console.log(`Saved but not published commits: ${local}`)
    if (Number(behind) > 0) console.log(`main has ${behind} newer commit(s); \`pnpm task:ship\` will merge them in.`)
  } else {
    const behind = git('rev-list', '--count', `HEAD..origin/${MAIN}`)
    if (Number(behind) > 0) console.log(`Local main is ${behind} commit(s) behind GitHub; \`pnpm task:new\` updates it.`)
  }

  console.log('\nRecent published changes (origin/main):')
  console.log(git('log', `origin/${MAIN}`, '-n', '10', '--date=short', '--format=%ad  %s  (%an)').replace(/^/gm, '  '))

  if (hasGh()) {
    const prs = run('gh', ['pr', 'list', '--state', 'open', '--limit', '10'], { allowFail: true })
    console.log('\nOpen pull requests:')
    console.log(prs.ok && prs.out ? prs.out.replace(/^/gm, '  ') : '  none')
  }
}

function newTask(name) {
  if (!name) fail('Task name is required.', 'pnpm task:new "short-english-name"')
  const slug = slugify(name)
  if (!slug) fail('Use Latin letters or digits in the task name.', 'pnpm task:new "about-page-text"')
  const branch = `${BRANCH_PREFIX}${slug}`

  if (changedFiles().length) {
    fail('There are unsaved changes.', 'Save them first: pnpm task:save "what changed"')
  }

  fetchOrigin()
  if (gitTry('rev-parse', '--verify', '--quiet', branch).ok) {
    git('checkout', branch)
    console.log(`✔ Continuing existing task branch ${branch}`)
    return
  }

  git('checkout', MAIN)
  const pull = gitTry('pull', '--ff-only', 'origin', MAIN)
  if (!pull.ok) {
    fail('Local main differs from GitHub.', 'Ask a maintainer; do not commit on main directly.')
  }
  git('checkout', '-b', branch)
  console.log(`✔ Started ${branch} from the latest main`)
}

function save(message) {
  const branch = currentBranch()
  if (branch === MAIN) {
    fail('Changes are never saved directly on main.', 'Start a task first: pnpm task:new "short-name"')
  }
  if (!message) fail('A commit message is required.', 'pnpm task:save "Add project photos to About page"')
  if (git('diff', '--name-only', '--diff-filter=U')) {
    fail('Merge conflicts are still unresolved.', 'Fix the conflicted files listed by `git status`, then save again.')
  }
  git('add', '--all')
  if (!git('diff', '--cached', '--name-only')) {
    console.log('Nothing new to save.')
    return
  }
  run('git', ['commit', '--quiet', '-m', message])
  console.log(`✔ Saved: ${message}`)
}

function ship(title) {
  const branch = currentBranch()
  if (branch === MAIN) fail('Nothing to publish from main.', 'Start a task first: pnpm task:new "short-name"')
  if (changedFiles().length) fail('There are unsaved changes.', 'pnpm task:save "what changed"')
  if (!fetchOrigin()) fail('GitHub is unreachable; publishing needs a connection.')

  const merge = gitTry('merge', '--no-edit', `origin/${MAIN}`)
  if (!merge.ok) {
    const conflicts = git('diff', '--name-only', '--diff-filter=U')
    fail(
      `Newer changes on main conflict with this task in:\n${conflicts.replace(/^/gm, '  ')}`,
      'Resolve each file (keep both intents), then `pnpm task:save "Merge latest main"` and `pnpm task:ship` again.'
    )
  }

  console.log('Running checks (knowledge base, types, build)…')
  if (!run('pnpm', ['check'], { allowFail: true, inherit: true }).ok) {
    fail('Checks failed; nothing was published.', 'Fix the errors above, save, and ship again.')
  }

  run('git', ['push', '--quiet', '-u', 'origin', branch])
  console.log(`✔ Pushed ${branch}`)

  const web = repoWebUrl()
  if (!hasGh()) {
    console.log(`\nOpen a pull request in the browser:\n  ${web}/compare/${MAIN}...${branch}?expand=1`)
    return
  }

  const existing = run('gh', ['pr', 'view', branch, '--json', 'url', '--jq', '.url'], { allowFail: true })
  let url = existing.ok ? existing.out : ''
  if (!url) {
    const commits = git('log', `origin/${MAIN}..HEAD`, '--no-merges', '--reverse', '--format=- %s')
    const prTitle = title || git('log', `origin/${MAIN}..HEAD`, '--no-merges', '--reverse', '--format=%s').split('\n')[0]
    const body = `## Changes\n\n${commits}\n\n## Checklist\n\n- [x] \`pnpm check\` passed locally\n- [ ] Knowledge base updated if a durable decision changed\n`
    url = run('gh', ['pr', 'create', '--base', MAIN, '--head', branch, '--title', prTitle, '--body', body]).out
    console.log(`✔ Pull request created: ${url}`)
  } else {
    console.log(`✔ Pull request updated: ${url}`)
  }

  // Without a required check, `gh pr merge --auto` merges immediately, before CI runs.
  if (!mainRequiresChecks()) {
    console.log('main has no required checks yet; merge the pull request on GitHub after checks pass.')
    return
  }
  const auto = run('gh', ['pr', 'merge', branch, '--auto', '--squash', '--delete-branch'], { allowFail: true, quiet: true })
  console.log(
    auto.ok
      ? 'It will merge and deploy automatically once GitHub checks pass.'
      : 'Auto-merge is unavailable; merge the pull request on GitHub after checks pass.'
  )
}

function mainRequiresChecks() {
  const rules = run('gh', ['api', `repos/{owner}/{repo}/rules/branches/${MAIN}`, '--jq', '[.[] | select(.type == "required_status_checks")] | length'], { allowFail: true })
  if (rules.ok && Number(rules.out) > 0) return true
  const classic = run('gh', ['api', `repos/{owner}/{repo}/branches/${MAIN}`, '--jq', '.protection.required_status_checks.contexts + .protection.required_status_checks.checks | length'], { allowFail: true })
  return classic.ok && Number(classic.out) > 0
}

const [command, ...rest] = process.argv.slice(2)
const arg = rest.join(' ').trim()

switch (command) {
  case 'status':
    status()
    break
  case 'new':
    newTask(arg)
    break
  case 'save':
    save(arg)
    break
  case 'ship':
    ship(arg)
    break
  default:
    fail(`Unknown command: ${command ?? '(none)'}`, 'Use status, new, save, or ship.')
}
