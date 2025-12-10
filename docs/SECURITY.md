# Security Configuration

This document describes the security measures implemented in this project.

## Automated Security Checks

### 1. GitHub Dependabot

**File:** `.github/dependabot.yml`

Automatically creates PRs for:

- npm dependency updates (weekly, Monday 9:00 UTC)
- GitHub Actions updates (weekly)

Features:

- Groups related dependencies to reduce PR noise
- Cooldown periods to avoid too-frequent updates
- Ignores major version updates for critical packages (requires manual review)

### 2. Security Workflow

**File:** `.github/workflows/security.yml`

Runs on every push/PR and weekly:

| Check                 | Description                            | Fail Condition                |
| --------------------- | -------------------------------------- | ----------------------------- |
| **npm audit**         | Checks for known vulnerabilities       | Critical vulnerabilities      |
| **CodeQL**            | Static analysis for security issues    | Security alerts               |
| **License check**     | Verifies dependency licenses           | Non-approved licenses         |
| **Dependency review** | Reviews new dependencies in PRs        | High/critical vulnerabilities |
| **Secrets scan**      | Detects accidentally committed secrets | Verified secrets found        |

### 3. Pre-commit Hooks

**Files:** `.husky/pre-commit`, `.lintstagedrc.json`

Runs before every commit:

- ESLint with `--max-warnings=0`
- Prettier formatting
- Only on staged files (fast)

### 4. Bundle Size Tracking

**File:** `.github/workflows/bundle-size.yml`

Monitors bundle size on every PR:

- Reports size of ESM, CJS, and CSS bundles
- Warns if bundles exceed soft limits
- Fails if bundles exceed hard limits

## Manual Setup Required

### Socket.dev (Recommended)

Socket.dev provides advanced supply-chain attack protection. It's free for open source projects.

**To enable:**

1. Go to [GitHub Marketplace - Socket Security](https://github.com/marketplace/socket-security)
2. Click "Install it for free"
3. Select this repository
4. Socket will automatically scan all PRs for:
   - Known malware in dependencies
   - Suspicious package behavior (network access, eval, shell commands)
   - Typosquatting attacks
   - Protestware
   - Telemetry/data collection

**Why Socket.dev?**

Traditional security tools (npm audit, Snyk) only detect _known_ vulnerabilities. Socket.dev uses
static analysis to detect _suspicious behavior_ in packages, catching supply-chain attacks before
they're publicly known.

### GitHub Security Settings

Enable these in repository Settings → Security:

1. **Secret scanning** - Detects accidentally committed secrets
2. **Push protection** - Blocks pushes containing secrets
3. **Dependabot security updates** - Auto-creates PRs for security fixes
4. **Code scanning** - Already configured via CodeQL workflow

## Approved Licenses

The following licenses are allowed for dependencies:

- MIT, MIT\*, MIT-0, (MIT OR CC0-1.0)
- Apache-2.0
- BSD-2-Clause, BSD-3-Clause
- ISC, 0BSD
- CC0-1.0, CC-BY-3.0, CC-BY-4.0
- MPL-2.0
- Unlicense
- Python-2.0
- BlueOak-1.0.0

## Security Contacts

For security issues, please:

1. **DO NOT** open a public issue
2. Use GitHub's private vulnerability reporting
3. Or email the maintainers directly

## Best Practices for Contributors

1. **Never commit secrets** - Use environment variables
2. **Review dependency changes** - Check `package-lock.json` diffs carefully
3. **Avoid unnecessary dependencies** - Each dependency is a potential attack vector
4. **Keep dependencies updated** - Merge Dependabot PRs promptly
5. **Use `npm ci`** - Not `npm install` in CI (ensures lockfile integrity)
