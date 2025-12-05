# npm Trusted Publishing Setup Guide

## Overview

**npm Trusted Publishing** (OIDC-based) is the most secure way to publish npm packages from GitHub Actions **without using npm tokens**.

✅ **Benefits:**
- No long-lived npm tokens to manage
- No secrets to rotate or expose
- Automatic provenance generation
- Enhanced supply chain security

**Requirements:**
- npm CLI **v11.5.1+** (included in Node.js 24+)
- Public GitHub repository (for provenance)
- GitHub Actions workflow with `id-token: write` permission

---

## Step 1: Configure Trusted Publisher on npmjs.com

### 1.1 Log in to npmjs.com

Visit: https://www.npmjs.com/

### 1.2 Navigate to Package Settings

**For new package (not yet published):**
1. Go to: https://www.npmjs.com/settings/USERNAME/packages
2. Click "Add Package"
3. Enter package name: `shadcn-glass-ui`

**For existing package:**
1. Go to: https://www.npmjs.com/package/shadcn-glass-ui
2. Click "Settings" tab

### 1.3 Add Trusted Publisher

1. Scroll to **"Trusted Publishers"** section
2. Click **"Add Trusted Publisher"**
3. Select **"GitHub Actions"** as CI/CD provider
4. Fill in the form:

```
Organization/User: Yhooi2
Repository: shadcn-glass-ui-library
Workflow filename: publish.yml
Environment name: npm (or leave empty if not using environments)
```

5. Click **"Add Publisher"**

### 1.4 Verify Configuration

You should see:

```
✅ Trusted Publisher Added
CI/CD Provider: GitHub Actions
Organization: Yhooi2
Repository: shadcn-glass-ui-library
Workflow: publish.yml
Environment: npm
```

---

## Step 2: Verify GitHub Actions Workflow

The workflow is already configured in `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [published]
  workflow_dispatch:
    inputs:
      tag:
        description: 'Git tag to publish (e.g., v1.0.0)'
        required: true
        type: string

permissions:
  contents: read
  id-token: write  # ← Required for OIDC trusted publishing

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22'  # npm 11.5.1+ included
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build:lib
      
      - name: Publish to npm
        run: npm publish --access public
        # No NODE_AUTH_TOKEN needed!
        # Provenance is automatic with npm 11.5.1+
```

**Key points:**
- ✅ `id-token: write` permission is set
- ✅ No `NODE_AUTH_TOKEN` environment variable
- ✅ No npm token secret needed
- ✅ `--provenance` flag is automatic

---

## Step 3: Test the Setup

### 3.1 First Publication (Manual)

If package doesn't exist yet, you need to publish v0.0.1 manually first:

```bash
# Build locally
npm run build:lib

# Publish first version manually (one-time only)
npm publish --access public

# This will prompt for npm login
npm login
# Then publish
npm publish --access public
```

**After first manual publish, all future versions use OIDC!**

### 3.2 Create GitHub Release

```bash
# Commit all changes
git add .
git commit -m "chore: prepare v1.0.0 release"
git push

# Create and push tag
git tag v1.0.0
git push origin v1.0.0

# Create GitHub Release via web UI
# Visit: https://github.com/Yhooi2/shadcn-glass-ui-library/releases/new
# - Choose tag: v1.0.0
# - Title: "v1.0.0 - Initial Release"
# - Description: (copy from CHANGELOG.md)
# - Click "Publish release"
```

### 3.3 Monitor Workflow

```bash
gh run list --workflow=publish.yml --limit 1
gh run watch
```

**Expected output:**
```
✅ Checkout repository
✅ Setup Node.js
✅ Install dependencies
✅ Build library
✅ Verify package contents
✅ Extract version from tag
✅ Verify version matches
✅ Publish to npm (with OIDC) ← Should succeed without token!
✅ Create GitHub deployment
✅ Post summary
```

---

## Step 4: Verify Provenance

After successful publish, verify provenance:

```bash
npm view shadcn-glass-ui
```

Look for:
```json
{
  "dist": {
    "attestations": {
      "url": "https://registry.npmjs.org/-/npm/v1/attestations/...",
      "provenance": {
        "predicateType": "https://slsa.dev/provenance/v1"
      }
    }
  }
}
```

Visit npm package page:
```
https://www.npmjs.com/package/shadcn-glass-ui
```

You should see **"Published with provenance from GitHub Actions"** badge!

---

## Troubleshooting

### Error: "This package is not configured for trusted publishing"

**Solution:** Complete Step 1 - add trusted publisher on npmjs.com

### Error: "OIDC token validation failed"

**Possible causes:**
1. Workflow filename doesn't match (`publish.yml`)
2. Repository name doesn't match (`shadcn-glass-ui-library`)
3. Organization/user doesn't match (`Yhooi2`)
4. Environment name doesn't match (if specified)

**Solution:** Double-check configuration on npmjs.com matches workflow exactly

### Error: "npm version too old"

**Solution:** Update Node.js version in workflow:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '24'  # or '22' (both have npm 11.5.1+)
```

### Error: "Package not found" on first publish

**Solution:** First version must be published manually:
```bash
npm login
npm publish --access public
```

After that, OIDC works for all future versions.

### Provenance not showing

**Causes:**
- Private repository (provenance only works for public repos)
- npm CLI version < 11.5.1
- Missing `id-token: write` permission

**Solution:** Ensure:
1. Repository is public
2. Using Node.js 22+ or 24+ (includes npm 11.5.1+)
3. Workflow has `id-token: write` permission

---

## Security Comparison

| Method | Security | Token Management | Provenance |
|--------|----------|-----------------|------------|
| **Classic Token** | ⚠️ Medium | Manual rotation | Optional (--provenance) |
| **Granular Token** | ✅ Good | Limited scope | Optional (--provenance) |
| **OIDC Trusted Publishing** | 🔒 **Excellent** | None needed | **Automatic** |

**Recommendation:** Use OIDC Trusted Publishing for maximum security.

---

## Migration from Token-based Publishing

If you have existing `NPM_TOKEN` secret:

1. Set up trusted publishing (Steps 1-2)
2. Test with a patch release (e.g., v1.0.1)
3. Once confirmed working, delete `NPM_TOKEN` secret:
   ```
   Settings → Secrets and variables → Actions → NPM_TOKEN → Delete
   ```

---

## Resources

- [npm Trusted Publishers Docs](https://docs.npmjs.com/trusted-publishers/)
- [GitHub Changelog Announcement](https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/)
- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements/)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

---

**Last Updated:** 2025-12-05
**Status:** ✅ Workflow configured, ready for trusted publishing
