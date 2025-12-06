# Visual Testing Guide

This guide explains how to work with visual regression tests in this project.

## Overview

The project uses **Vitest 4.0 browser mode** with **Playwright** for visual regression testing. All reference screenshots are generated on **Linux (ubuntu-latest)** in CI to ensure consistency across environments.

**Key Points:**
- ✅ Reference screenshots are generated on Linux
- ✅ All platforms use the same screenshot files (no `-darwin`/`-linux` suffixes)
- ✅ Automatic workflow for updating screenshots
- ✅ Cross-platform tolerance configured (8% pixel mismatch allowed)

## Running Tests Locally

### Run all visual tests
```bash
npm run test:visual:ci
```

### Update screenshots locally (for reference only)
```bash
npm run test:visual:update
```

**⚠️ IMPORTANT:** Do NOT commit screenshots generated on macOS. Always use the GitHub Actions workflow to generate production screenshots.

**Cleaning local screenshots:**
If you accidentally generated screenshots locally, use this script to remove them:
```bash
./scripts/clean-local-screenshots.sh
```

**Protection:** A pre-commit hook automatically blocks commits of new screenshots from non-Linux platforms. If you see this error:
```
❌ ERROR: Cannot commit visual test screenshots from Darwin
```
This is working as intended. Use the GitHub Actions workflow instead.

## Updating Reference Screenshots

When you modify UI components and need to update screenshots:

### Option 1: Using GitHub CLI (Recommended)
```bash
gh workflow run update-screenshots.yml
```

### Option 2: Via GitHub Web UI
1. Go to **Actions** → **Update Visual Test Screenshots**
2. Click **Run workflow**
3. Optionally provide a custom commit message
4. Click **Run workflow**

The workflow will:
1. Delete existing screenshots
2. Generate new screenshots on Linux (ubuntu-latest)
3. Commit and push changes automatically
4. Upload screenshots as artifacts

### Monitoring Workflow Progress
```bash
# Check workflow status
gh run list --workflow=update-screenshots.yml --limit 1

# View workflow logs
gh run view <run-id> --log
```

## Configuration

### Visual Test Thresholds

**File:** `vite.config.ts`

```typescript
comparatorOptions: {
  threshold: 0.05,                   // Allow 5% color difference (macOS vs Linux)
  allowedMismatchedPixelRatio: 0.08, // Allow 8% pixel mismatch
}
```

These tolerances account for:
- Font rendering differences between macOS and Linux
- Subpixel anti-aliasing variations
- Minor layout shifts (1-2px height differences)

### Screenshot Naming

Screenshots use a unified naming pattern:
```
{test-name}-{theme}-chromium.png
```

Example: `button-primary-glass-chromium.png`

**No platform suffixes** (`-darwin`, `-linux`) are added.

## Test Structure

### Visual Test Locations
```
src/components/__visual__/
├── components.visual.test.tsx       # Individual component tests
├── componentshowcase.visual.test.tsx # ComponentShowcase demo page (55 tests)
├── desktop.visual.test.tsx          # DesktopShowcase demo page (80+ tests)
├── mobileshowcase.visual.test.tsx   # MobileShowcase demo page
├── phase2-components.visual.test.tsx # Phase 2 components
├── projects-list.visual.test.tsx    # ProjectsList component
└── __screenshots__/                 # Reference screenshots (603 files)
```

### Screenshot Organization
```
src/components/__visual__/__screenshots__/
├── components.visual.test.tsx/
│   ├── alert-error-aurora-chromium.png
│   ├── alert-error-glass-chromium.png
│   ├── alert-error-light-chromium.png
│   └── ...
├── desktop.visual.test.tsx/
└── ...
```

## Git Pre-commit Hook

The repository includes a pre-commit hook that prevents accidentally committing screenshots generated on non-Linux platforms.

**Setup (Automatic):**

The hook is located at `.git/hooks/pre-commit` and should work automatically. If you encounter issues:

```bash
# Ensure Git is using the correct hooks directory
git config --unset core.hookspath

# Verify hook is executable
chmod +x .git/hooks/pre-commit
```

**How it works:**
- Blocks commits of new `.png` files in `__screenshots__/` directories
- Only allows commits from Linux (CI environment)
- Shows helpful error message with instructions

**Bypassing the hook (not recommended):**
```bash
git commit --no-verify  # Skip all git hooks
```

Only bypass if you're sure you're committing Linux-generated screenshots.

## CI/CD Integration

### Automatic Testing

Visual tests run automatically on every push/PR:

**File:** `.github/workflows/ci.yml`

```yaml
- name: Run visual regression tests
  run: npm run test:visual:ci
```

### Manual Screenshot Updates

**File:** `.github/workflows/update-screenshots.yml`

Workflow features:
- ✅ Manual trigger only (`workflow_dispatch`)
- ✅ Runs on Linux (ubuntu-latest)
- ✅ Deletes old screenshots before regeneration
- ✅ Commits and pushes changes automatically
- ✅ Uploads screenshots as artifacts (30-day retention)
- ✅ Custom commit message support

## Troubleshooting

### Tests Fail After Component Changes

**Symptoms:**
- CI shows screenshot mismatches
- Error: "Screenshot does not match the stored reference"
- Pixel ratio > 0.08 or dimension differences

**Solution:**
1. Review the changes to ensure they're intentional
2. Run the screenshot update workflow:
   ```bash
   gh workflow run update-screenshots.yml -f commit_message="chore: update screenshots after [your change]"
   ```
3. Wait for the workflow to complete
4. Trigger CI with an empty commit if needed:
   ```bash
   git commit --allow-empty -m "chore: verify visual tests"
   git push
   ```

### Local Screenshots Don't Match CI

**Symptoms:**
- Tests pass locally but fail in CI
- Opposite: tests fail locally but pass in CI

**Cause:**
- Platform differences (macOS vs Linux)
- Font rendering variations
- Different screenshot generation environment

**Solution:**
- **DO NOT** commit local screenshots from macOS
- Always use the GitHub Actions workflow
- Linux screenshots are the source of truth

### Workflow Fails to Commit

**Symptoms:**
- Workflow succeeds but no new commit appears
- Error: "Updates were rejected"

**Cause:**
- Race condition: new commits pushed while workflow was running

**Solution:**
- Workflow includes `git pull --rebase` before push
- If still failing, manually re-run the workflow

## Best Practices

### When to Update Screenshots

Update screenshots when:
- ✅ Intentional UI changes (new features, design updates)
- ✅ Component refactoring that affects rendering
- ✅ Theme or styling changes
- ✅ Breaking changes in dependencies (React, Tailwind, etc.)

Do NOT update screenshots for:
- ❌ Random pixel differences without code changes
- ❌ Flaky tests (investigate root cause first)
- ❌ Local development screenshots

### Reviewing Screenshot Changes

Before approving screenshot updates:

1. **Download artifacts** from the workflow run
2. **Compare** old vs new screenshots visually
3. **Verify** changes are intentional and expected
4. **Check** that all themes (glass, light, aurora) are consistent

### Writing New Visual Tests

```typescript
import { test, expect } from '@vitest/browser/context';

test('MyComponent - default state - glass theme', async () => {
  const { page } = await import('@vitest/browser/context');

  // Render component
  const container = page.locator('[data-testid="my-component"]');

  // Take screenshot
  await expect(container).toMatchScreenshot('my-component-default-glass');
});
```

**Naming convention:**
- Use descriptive names: `{component}-{variant}-{theme}`
- Include theme: `glass`, `light`, `aurora`
- Use kebab-case

## Statistics

**Current Coverage:**
- **582 visual tests** (as of v1.0.0)
- **603 reference screenshots**
- **99.5% pass rate** in CI
- **3 themes tested:** glass, light, aurora

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Project overview and architecture
- [DEPENDENCIES.md](../DEPENDENCIES.md) - Tech stack details
- [visual-tests-audit.md](./visual-tests-audit.md) - Detailed test audit
- [Migration Guides](./migration/) - Component API changes

## Workflow Reference

### Update Screenshots Workflow

**Trigger:**
```bash
gh workflow run update-screenshots.yml
```

**With custom message:**
```bash
gh workflow run update-screenshots.yml -f commit_message="chore: update screenshots after AlertGlass refactor"
```

**Check status:**
```bash
gh run list --workflow=update-screenshots.yml --limit 1
```

**View logs:**
```bash
gh run view <run-id> --log
```

**Download artifacts:**
```bash
gh run download <run-id> -n visual-test-screenshots
```

---

**Last Updated:** 2025-12-05
**Vitest Version:** 4.0
**Playwright Version:** Latest
**Node Version:** 20.16+, 22.19+, or 24+
