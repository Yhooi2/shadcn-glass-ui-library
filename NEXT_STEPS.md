# Next Steps for Publishing shadcn-glass-ui

## ✅ Completed (Этап 1-2)

- [x] Build configuration (vite.config.lib.ts, tsconfig.build.json)
- [x] Entry points created (index.ts, components.ts, hooks.ts, utils.ts, themes.ts)
- [x] package.json configured for npm publication
- [x] Test build successful (dist/ generated)
- [x] GitHub Actions workflow created (.github/workflows/publish.yml)
- [x] Documentation updated (PUBLISHING.md, PUBLICATION_PLAN.md, AI_USAGE.md)

## 📋 TODO: Configure npm Trusted Publishing (OIDC - Recommended)

**🆕 Modern approach - No tokens needed!**

### Step 1: Configure on npmjs.com

1. Visit: https://www.npmjs.com/settings/YOUR_USERNAME/packages
2. Click "Add Package" or go to existing package settings
3. Scroll to **"Trusted Publishers"** section
4. Click **"Add Trusted Publisher"**
5. Select **"GitHub Actions"**
6. Fill in:
   - Organization/User: `Yhooi2`
   - Repository: `shadcn-glass-ui-library`
   - Workflow filename: `publish.yml`
   - Environment: `npm` (or leave empty)
7. Click "Add Publisher"

### Step 2: First Publish (Manual, one-time only)

**Important:** First version must be published manually to create the package:

```bash
npm run build:lib
npm login
npm publish --access public
```

**After first publish, all future versions use OIDC automatically!**

---

## 🔧 Alternative: Token-based Publishing (Legacy)

<details>
<summary>Click to expand if you prefer using npm tokens instead of OIDC</summary>

### 1. Create Granular Access Token

Visit: https://www.npmjs.com/settings/tokens

1. Click "Generate New Token" → **"Granular Access Token"**
2. Token name: `GitHub Actions - shadcn-glass-ui`
3. Expiration: 1 year
4. Packages: Select `shadcn-glass-ui` (Read and write)
5. Copy token

### 2. Add to GitHub Secrets

Visit: https://github.com/Yhooi2/shadcn-glass-ui-library/settings/secrets/actions

1. New repository secret
2. Name: `NPM_TOKEN`
3. Value: paste token

### 3. Update workflow

Uncomment the `NODE_AUTH_TOKEN` line in `.github/workflows/publish.yml`

</details>

## 🚀 Publishing the Package

### Option A: Automated Publishing (Recommended)

Create a GitHub Release to trigger automatic publishing:

```bash
# 1. Ensure all changes are committed
git status

# 2. Create and push git tag
git tag v1.0.0
git push origin v1.0.0

# 3. Create GitHub Release
# Visit: https://github.com/Yhooi2/shadcn-glass-ui-library/releases/new
# - Choose tag: v1.0.0
# - Release title: "v1.0.0 - Initial Release"
# - Description: Copy from CHANGELOG.md
# - Click "Publish release"

# 4. Monitor workflow
gh run list --workflow=publish.yml --limit 1
gh run watch
```

**What happens:**
1. GitHub Actions workflow triggers on release
2. Builds library (`npm run build:lib`)
3. Publishes to npm with provenance
4. Creates GitHub deployment

### Option B: Manual Publishing

If you prefer manual control:

```bash
# 1. Build library
npm run build:lib

# 2. Verify package contents
npm publish --dry-run

# 3. Publish to npm
npm publish --provenance --access public

# 4. Verify on npm
npm view shadcn-glass-ui
```

## 📝 After Publishing

### 1. Update README Badges

The following badges will work after publication:

```markdown
[![npm version](https://badge.fury.io/js/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![npm downloads](https://img.shields.io/npm/dm/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/shadcn-glass-ui)](https://bundlephobia.com/package/shadcn-glass-ui)
```

### 2. Test Installation

```bash
# In a test project
npm install shadcn-glass-ui
```

### 3. Announce Release

- Create announcement on GitHub Discussions
- Share on social media (Twitter, Reddit, Dev.to)
- Update project homepage

## 🔍 Verification Checklist

Before publishing, verify:

- [ ] NPM_TOKEN is set in GitHub Secrets
- [ ] All tests pass (`npm run test:all`)
- [ ] Build succeeds (`npm run build:lib`)
- [ ] package.json version is `1.0.0`
- [ ] CHANGELOG.md is updated
- [ ] README.md has correct links

## 📚 Reference Documentation

- [Publishing Guide](docs/PUBLISHING.md) - Complete publishing documentation
- [Publication Plan](docs/PUBLICATION_PLAN.md) - Detailed step-by-step plan
- [AI Usage](docs/AI_USAGE.md) - AI assistance transparency

## 🆘 Troubleshooting

### Workflow fails with "ENEEDAUTH"
→ NPM_TOKEN not set or expired. Regenerate token and update GitHub Secret.

### Version mismatch error
→ Ensure tag version (v1.0.0) matches package.json (1.0.0).

### Build fails in CI
→ Check GitHub Actions logs: https://github.com/Yhooi2/shadcn-glass-ui-library/actions

## 🎯 Current Status

**Ready to publish!** 🎉

All configuration is complete. Only need to:
1. Add NPM_TOKEN to GitHub Secrets
2. Create v1.0.0 tag and GitHub Release
3. Monitor automatic publishing workflow

---

**Questions?** Open an issue: https://github.com/Yhooi2/shadcn-glass-ui-library/issues
