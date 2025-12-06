# Testing Publishing Configuration - Step by Step Guide

**Date:** December 6, 2025
**Package:** @yhooi2/shadcn-glass-ui
**Version:** 1.0.0

## Prerequisites

- ✅ Trusted Publisher configured on npmjs.com
- ✅ npm account with access to @yhooi2 scope
- ✅ npm CLI 11.5.1+ installed (`npm --version`)
- ✅ Local build working (`npm run build:lib`)

## Phase 1: Manual First Publish (Required)

⚠️ **CRITICAL:** OIDC Trusted Publishing CANNOT publish the initial version. You MUST publish v1.0.0 manually first.

### Step 1.1: Verify Build

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build:lib

# Verify dist/ contains built files
ls -la dist/
```

**Expected output:**
```
dist/
├── index.js
├── index.cjs
├── index.d.ts
├── components.js
├── components.cjs
├── components.d.ts
├── styles.css
└── ...
```

### Step 1.2: Verify Package Contents

```bash
# Dry run to see what will be published
npm pack --dry-run
```

**Expected output:**
```
npm notice
npm notice 📦  @yhooi2/shadcn-glass-ui@1.0.0
npm notice === Tarball Contents ===
npm notice 123B   package.json
npm notice 456B   README.md
npm notice 789KB  dist/index.js
npm notice ...
npm notice === Tarball Details ===
npm notice name:          @yhooi2/shadcn-glass-ui
npm notice version:       1.0.0
npm notice filename:      yhooi2-shadcn-glass-ui-1.0.0.tgz
npm notice package size:  XXX KB
npm notice unpacked size: XXX KB
npm notice total files:   XX
```

**Verify:**
- ✅ Package name is `@yhooi2/shadcn-glass-ui`
- ✅ Version is `1.0.0`
- ✅ dist/ files are included
- ✅ No unnecessary files (node_modules, src/, etc.)

### Step 1.3: Login to npm

```bash
npm login --registry https://registry.npmjs.org
```

**Prompts:**
- Username: `Yhooi2` (your npm username)
- Password: (your npm password or token)
- Email: (your email)
- OTP: (if 2FA enabled)

**Verify login:**
```bash
npm whoami
# Should output: Yhooi2
```

### Step 1.4: Publish Initial Version

```bash
npm publish --access public --registry https://registry.npmjs.org
```

**Expected output:**
```
npm notice
npm notice 📦  @yhooi2/shadcn-glass-ui@1.0.0
npm notice === Tarball Details ===
npm notice name:          @yhooi2/shadcn-glass-ui
npm notice version:       1.0.0
npm notice total files:   XX
npm notice
+ @yhooi2/shadcn-glass-ui@1.0.0
```

**Verify on npm:**
```bash
# Check package is visible
npm view @yhooi2/shadcn-glass-ui

# Or visit browser
open https://www.npmjs.com/package/@yhooi2/shadcn-glass-ui
```

### Step 1.5: Test Installation

```bash
# Create temp directory
mkdir -p /tmp/test-install
cd /tmp/test-install
npm init -y

# Install your package
npm install @yhooi2/shadcn-glass-ui

# Verify installation
ls node_modules/@yhooi2/shadcn-glass-ui/dist/
```

**Expected:**
- ✅ Package installs without errors
- ✅ dist/ files are present
- ✅ Can import: `const { ButtonGlass } = require('@yhooi2/shadcn-glass-ui')`

---

## Phase 2: Test Automated Publishing (OIDC)

Now that v1.0.0 exists, test OIDC Trusted Publishing with v1.0.1.

### Step 2.1: Verify Trusted Publisher Configuration

**On npmjs.com:**
1. Go to https://www.npmjs.com/package/@yhooi2/shadcn-glass-ui/access
2. Under "Trusted Publishers", verify:
   - ✅ Provider: GitHub Actions
   - ✅ Organization: `Yhooi2`
   - ✅ Repository: `shadcn-glass-ui-library`
   - ✅ Workflow: `publish.yml`
   - ✅ Environment: (empty or not set)

### Step 2.2: Verify GitHub Actions Workflow

```bash
# Check workflow file
cat .github/workflows/publish.yml | grep -A 5 "permissions:"
```

**Expected output:**
```yaml
permissions:
  contents: read
  id-token: write  # ✅ REQUIRED for OIDC
```

**Verify publish step:**
```bash
cat .github/workflows/publish.yml | grep -A 3 "Publish to npm"
```

**Expected output:**
```yaml
- name: Publish to npm (with OIDC Trusted Publishing)
  run: npm publish --access public --registry https://registry.npmjs.org
  # No NODE_AUTH_TOKEN needed when using OIDC trusted publishing
```

### Step 2.3: Create Test Release

**Option A: Manual workflow_dispatch (RECOMMENDED for testing)**

```bash
# Create v1.0.1 tag locally
npm version patch  # 1.0.0 -> 1.0.1
git push origin main
git push origin v1.0.1

# Trigger workflow manually
gh workflow run publish.yml -f tag=v1.0.1

# Watch workflow
gh run watch

# Or view in browser
gh workflow view publish.yml --web
```

**Option B: Create GitHub Release (production method)**

```bash
# Ensure version is updated
npm version patch
git push origin main
git push origin v1.0.1

# Create release
gh release create v1.0.1 \
  --title "v1.0.1 - Test OIDC Publishing" \
  --notes "Testing automated OIDC Trusted Publishing"

# Watch workflow
gh run watch
```

### Step 2.4: Monitor Workflow Execution

```bash
# List recent runs
gh run list --workflow=publish.yml --limit 5

# Get detailed logs
gh run view --log

# Check specific job
gh run view --job=publish
```

**What to look for in logs:**

✅ **Success indicators:**
```
Setup Node.js ✓
Install dependencies ✓
Build library ✓
Verify package contents ✓
Extract version from tag ✓
Verify package.json version matches tag ✓
Publish to npm (with OIDC Trusted Publishing) ✓  <-- KEY STEP
Create GitHub deployment ✓
Post summary ✓
```

❌ **Failure indicators:**
```
Error: Unable to obtain OIDC token
Error: 403 Forbidden - Trusted publishing not configured
Error: npm ERR! code ENEEDAUTH
Error: npm ERR! need auth This command requires you to be logged in
```

### Step 2.5: Verify Published Package

```bash
# Check npm registry
npm view @yhooi2/shadcn-glass-ui@1.0.1

# Verify provenance attestation
npm view @yhooi2/shadcn-glass-ui@1.0.1 --json | grep -A 10 "attestations"

# Or use npm audit signatures (npm 9.5+)
npm audit signatures @yhooi2/shadcn-glass-ui@1.0.1
```

**Expected provenance output:**
```json
{
  "attestations": {
    "url": "https://registry.npmjs.org/-/npm/v1/attestations/@yhooi2/shadcn-glass-ui@1.0.1",
    "provenance": {
      "predicateType": "https://slsa.dev/provenance/v1"
    }
  }
}
```

**Verify in browser:**
1. Visit https://www.npmjs.com/package/@yhooi2/shadcn-glass-ui
2. Check for "Provenance" badge (🛡️) next to version
3. Click badge to see attestation details

### Step 2.6: Test Installation of OIDC-Published Version

```bash
# Install specific version
npm install @yhooi2/shadcn-glass-ui@1.0.1

# Verify it works
node -e "console.log(require('@yhooi2/shadcn-glass-ui'))"
```

---

## Phase 3: Test GitHub Packages Publishing

### Step 3.1: Verify Workflow

```bash
cat .github/workflows/publish-github-packages.yml | grep -A 5 "permissions:"
```

**Expected:**
```yaml
permissions:
  contents: read
  packages: write  # ✅ REQUIRED
  id-token: write
```

### Step 3.2: Trigger GitHub Packages Workflow

```bash
# Use existing tag
gh workflow run publish-github-packages.yml -f tag=v1.0.1

# Watch execution
gh run watch
```

### Step 3.3: Verify Package on GitHub

**In browser:**
1. Visit https://github.com/Yhooi2/shadcn-glass-ui-library/packages
2. Verify package `@yhooi2/shadcn-glass-ui` appears
3. Check version `1.0.1` is listed

**Via API:**
```bash
# Check if package exists
gh api /users/Yhooi2/packages/npm/shadcn-glass-ui

# Or
curl -H "Authorization: Bearer $(gh auth token)" \
  https://api.github.com/users/Yhooi2/packages/npm/shadcn-glass-ui
```

### Step 3.4: Test Installation from GitHub Packages

```bash
# Create test project
mkdir -p /tmp/test-github-packages
cd /tmp/test-github-packages

# Create .npmrc
echo "@yhooi2:registry=https://npm.pkg.github.com" > .npmrc

# Login (you'll need PAT)
npm login --scope=@yhooi2 --registry=https://npm.pkg.github.com
# Username: Yhooi2
# Password: <your PAT with read:packages>

# Install
npm install @yhooi2/shadcn-glass-ui@1.0.1

# Verify
ls node_modules/@yhooi2/shadcn-glass-ui/
```

---

## Phase 4: Full Integration Test

### Step 4.1: Test Complete Release Flow

```bash
# 1. Update version
npm version patch  # 1.0.1 -> 1.0.2

# 2. Update CHANGELOG.md (optional but recommended)
echo "## [1.0.2] - $(date +%Y-%m-%d)" >> CHANGELOG.md
echo "" >> CHANGELOG.md
echo "### Fixed" >> CHANGELOG.md
echo "- Testing automated publishing" >> CHANGELOG.md

# 3. Commit changes
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release v1.0.2"

# 4. Create and push tag
git tag v1.0.2
git push origin main
git push origin v1.0.2

# 5. Create GitHub Release (triggers BOTH workflows)
gh release create v1.0.2 \
  --title "v1.0.2" \
  --notes "## Changes\n- Testing automated publishing to both registries"

# 6. Monitor both workflows
gh run list --limit 5
gh run watch
```

### Step 4.2: Verify Both Registries

**npm Registry:**
```bash
npm view @yhooi2/shadcn-glass-ui@1.0.2
npm install @yhooi2/shadcn-glass-ui@1.0.2
```

**GitHub Packages:**
```bash
# With .npmrc configured
npm install @yhooi2/shadcn-glass-ui@1.0.2
```

### Step 4.3: Compare Packages

```bash
# Install from both sources
mkdir -p /tmp/compare-packages
cd /tmp/compare-packages

# From npm
mkdir npm-version
cd npm-version
npm install @yhooi2/shadcn-glass-ui@1.0.2
cd ..

# From GitHub Packages
mkdir github-version
cd github-version
echo "@yhooi2:registry=https://npm.pkg.github.com" > .npmrc
npm login --scope=@yhooi2 --registry=https://npm.pkg.github.com
npm install @yhooi2/shadcn-glass-ui@1.0.2
cd ..

# Compare
diff -r npm-version/node_modules/@yhooi2/shadcn-glass-ui \
        github-version/node_modules/@yhooi2/shadcn-glass-ui
```

**Expected:** No differences (packages should be identical)

---

## Troubleshooting

### Issue: "Unable to obtain OIDC token"

**Cause:** Trusted publisher not configured or workflow filename mismatch

**Fix:**
1. Verify trusted publisher config on npmjs.com
2. Ensure workflow filename is EXACTLY `publish.yml` (case-sensitive)
3. Check `id-token: write` permission is set

### Issue: "403 Forbidden - Trusted publishing not configured"

**Cause:** Package exists but trusted publisher not added

**Fix:**
1. Go to https://www.npmjs.com/package/@yhooi2/shadcn-glass-ui/access
2. Click "Add Trusted Publisher"
3. Add GitHub Actions configuration

### Issue: "npm ERR! code ENEEDAUTH"

**Cause:** Trying to use OIDC for non-existent package

**Fix:**
1. Publish v1.0.0 manually first (see Phase 1)
2. Then OIDC will work for subsequent versions

### Issue: "GitHub Packages 401 Unauthorized"

**Cause:** Missing or invalid GITHUB_TOKEN

**Fix:**
1. Verify `packages: write` permission in workflow
2. Check GITHUB_TOKEN is used: `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`

### Issue: "Registry conflict - publishing to wrong registry"

**Cause:** publishConfig in package.json or .npmrc in repo

**Fix:**
1. Remove `publishConfig` from package.json ✓ (already done)
2. Remove .npmrc from repo ✓ (already done)
3. Use explicit `--registry` flag in workflows ✓ (already done)

---

## Success Criteria

✅ **Phase 1 (Manual):**
- [ ] v1.0.0 published manually to npm
- [ ] Package visible on npmjs.com
- [ ] Can install: `npm install @yhooi2/shadcn-glass-ui`

✅ **Phase 2 (OIDC):**
- [ ] v1.0.1 published via OIDC (no token needed)
- [ ] Workflow shows "Publish to npm" step succeeded
- [ ] Provenance attestation visible on npmjs.com
- [ ] Can install: `npm install @yhooi2/shadcn-glass-ui@1.0.1`

✅ **Phase 3 (GitHub Packages):**
- [ ] v1.0.1 published to GitHub Packages
- [ ] Package visible at github.com/Yhooi2/.../packages
- [ ] Can install with auth: `npm install @yhooi2/shadcn-glass-ui@1.0.1`

✅ **Phase 4 (Integration):**
- [ ] v1.0.2 published to BOTH registries
- [ ] Both workflows triggered by single release
- [ ] Packages identical in both registries
- [ ] All installations work

---

## Monitoring Commands

```bash
# Quick status check
gh run list --workflow=publish.yml --limit 1
gh run list --workflow=publish-github-packages.yml --limit 1

# View latest run details
gh run view

# Check npm package
npm view @yhooi2/shadcn-glass-ui --json | jq '.versions'

# Check GitHub package
gh api /users/Yhooi2/packages/npm/shadcn-glass-ui/versions

# Test installations
npm install @yhooi2/shadcn-glass-ui@latest --dry-run
```

---

## Next Steps After Successful Testing

1. **Document workflow** in CONTRIBUTING.md
2. **Add provenance badge** to README.md
3. **Create release checklist** for future versions
4. **Set up notifications** for failed publishes
5. **Monitor package downloads** on npmjs.com

---

## References

- [npm Trusted Publishing Setup](https://docs.npmjs.com/trusted-publishers/)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Verifying npm Provenance](https://docs.npmjs.com/generating-provenance-statements#verifying-provenance-attestations)
- [GitHub Packages npm Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
