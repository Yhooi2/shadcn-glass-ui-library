# Publishing Guide - Quick Reference

Quick reference for maintainers to publish new versions.

## 🚀 Standard Publishing Flow

### 1. Prepare Release

```bash
# Ensure you're on main branch and up to date
git checkout main
git pull upstream main

# Run tests
npm test
npm run lint
npm run build:lib

# Update version (choose one)
npm version patch   # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.0 → 1.1.0 (new features)
npm version major   # 1.0.0 → 2.0.0 (breaking changes)
```

### 2. Update Changelog

Edit `CHANGELOG.md` to document changes in the new version:

```markdown
## [1.0.1] - 2025-01-15

### Added
- New feature X

### Fixed
- Bug fix Y

### Changed
- Improvement Z
```

### 3. Create Git Tag

```bash
# Commit version changes
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release v1.0.1"

# Create and push tag
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

### 4. Create GitHub Release

**Option A: GitHub UI**
1. Go to https://github.com/Yhooi2/shadcn-glass-ui-library/releases
2. Click "Draft a new release"
3. Choose tag: `v1.0.1`
4. Release title: `v1.0.1`
5. Copy relevant section from CHANGELOG.md to release notes
6. Click "Publish release"

**Option B: GitHub CLI**
```bash
gh release create v1.0.1 \
  --title "v1.0.1" \
  --notes-file RELEASE_NOTES.md
```

### 5. Automated Publishing

Once the release is published:
- ✅ **GitHub Actions** triggers automatically
- ✅ **npm Registry** - Published via OIDC Trusted Publishing (no tokens needed)
- ✅ **GitHub Packages** - Published as `@yhooi2/shadcn-glass-ui`

Monitor progress:
```bash
# View workflow runs
gh run list --workflow=publish.yml --limit 5
gh run list --workflow=publish-github-packages.yml --limit 5

# Watch specific run
gh run watch
```

## 📦 Published Packages

After successful publication, packages are available at:

### npm Registry
- **URL:** https://www.npmjs.com/package/shadcn-glass-ui
- **Installation:** `npm install shadcn-glass-ui`

### GitHub Packages
- **URL:** https://github.com/Yhooi2/shadcn-glass-ui-library/packages
- **Installation:** `npm install @yhooi2/shadcn-glass-ui` (requires auth)

## 🔧 Manual Publishing (Emergency Only)

If automated publishing fails:

### npm Registry
```bash
npm run build:lib
npm publish --access public
```

### GitHub Packages
```bash
npm run build:lib
npm publish --registry=https://npm.pkg.github.com
```

## ✅ Post-Publication Checklist

After publishing:

- [ ] Verify package on npm: `npm view shadcn-glass-ui@1.0.1`
- [ ] Verify package on GitHub Packages
- [ ] Test installation: `npm install shadcn-glass-ui@1.0.1`
- [ ] Check Storybook deployed: https://yhooi2.github.io/shadcn-glass-ui-library/
- [ ] Update documentation if needed
- [ ] Announce release (optional):
  - GitHub Discussions
  - Twitter/X
  - Discord/Community channels

## 🐛 Troubleshooting

### Version Already Exists
```bash
# You cannot unpublish and republish same version
# Increment version and try again
npm version patch
git tag v1.0.2
git push && git push --tags
```

### Build Fails
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build:lib
```

### GitHub Actions Fails
```bash
# View error logs
gh run view --log

# Re-run failed jobs
gh run rerun
```

### Package Not Appearing in GitHub Packages
- Verify `publishConfig` in package.json
- Check workflow permissions include `packages: write`
- Ensure `GITHUB_TOKEN` has correct scopes

## 📚 Related Documentation

- [CHANGELOG.md](../CHANGELOG.md) - Version history
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [GitHub Packages Guide](GITHUB_PACKAGES.md) - Detailed GitHub Packages instructions
- [npm Trusted Publishing](https://github.blog/changelog/2025-01-15-npm-trusted-publishing-is-generally-available/)

## 🔐 Security Notes

### npm Trusted Publishing
- ✅ **No tokens stored** - Uses OIDC cryptographic authentication
- ✅ **Automatic provenance** - npm CLI 11.5.1+ generates attestations
- ✅ **Enhanced security** - Short-lived tokens, no rotation needed

### GitHub Packages
- ✅ **Uses GITHUB_TOKEN** - Automatically available in Actions
- ✅ **Scoped access** - Limited to repository
- ✅ **No manual tokens** - No secrets to manage

## 📞 Support

If you encounter issues:
1. Check [GitHub Actions logs](https://github.com/Yhooi2/shadcn-glass-ui-library/actions)
2. Review [npm publish logs](https://www.npmjs.com/package/shadcn-glass-ui)
3. Open an issue with error details
