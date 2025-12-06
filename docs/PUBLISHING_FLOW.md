# Publishing Flow Diagram

Visual guide to the automated publishing process.

## 📊 Publishing Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Developer Workflow                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ npm version X   │
                    │ Update CHANGELOG│
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  git tag vX.Y.Z │
                    │  git push --tags│
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Create GitHub   │
                    │    Release      │
                    └─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions Trigger                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│   publish.yml             │   │ publish-github-packages.yml│
│   (npm Registry)          │   │   (GitHub Packages)       │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│ Setup Node.js 22          │   │ Setup Node.js 22          │
│ registry: npmjs.org       │   │ registry: pkg.github.com  │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│ npm ci                    │   │ npm ci                    │
│ npm run build:lib         │   │ npm run build:lib         │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│ Verify package contents   │   │ Verify package contents   │
│ npm pack --dry-run        │   │ npm pack --dry-run        │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│ Verify version matches tag│  │ Verify version matches tag│
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│ 🔒 npm publish            │   │ 🔒 npm publish            │
│ --access public           │   │ (to pkg.github.com)       │
│                           │   │                           │
│ Auth: OIDC (no tokens!)   │   │ Auth: GITHUB_TOKEN        │
│ ✅ Trusted Publishing     │   │ ✅ Auto-provided          │
│ ✅ Automatic provenance   │   │ ✅ Scoped access          │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│ 📦 Published to npm       │   │ 📦 Published to GitHub    │
│                           │   │                           │
│ shadcn-glass-ui@X.Y.Z     │   │ @yhooi2/shadcn-glass-ui   │
│                           │   │        @X.Y.Z             │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│ 📊 Post Summary           │   │ 📊 Post Summary           │
│ - Package name            │   │ - Package name            │
│ - Version                 │   │ - Version                 │
│ - Registry URL            │   │ - Registry URL            │
│ - Installation command    │   │ - Installation command    │
└───────────────────────────┘   └───────────────────────────┘
```

## 🔐 Security Model

### npm Registry (OIDC Trusted Publishing)
```
GitHub Actions
      │
      │ 1. Request OIDC token
      ▼
GitHub OIDC Provider
      │
      │ 2. Issue short-lived token
      ▼
npm Registry
      │
      │ 3. Verify token cryptographically
      │ 4. Allow publish
      ▼
Package Published
      │
      │ 5. Generate attestations
      ▼
Provenance Available
```

**Benefits:**
- ✅ No long-lived tokens
- ✅ Cryptographic verification
- ✅ Automatic attestations
- ✅ Zero secret management

### GitHub Packages (GITHUB_TOKEN)
```
GitHub Actions
      │
      │ 1. Use GITHUB_TOKEN
      ▼
GitHub API
      │
      │ 2. Verify token scope
      │ 3. Check permissions
      ▼
GitHub Package Registry
      │
      │ 4. Allow publish
      ▼
Package Published
```

**Benefits:**
- ✅ Automatically available
- ✅ Scoped to repository
- ✅ No manual configuration
- ✅ Integrated with GitHub

## 📦 Package Distribution

After publishing, packages are available through two registries:

### npm Registry (Public)
```
Developer Machine
      │
      │ npm install shadcn-glass-ui
      ▼
npmjs.com
      │
      │ Download package
      ▼
node_modules/shadcn-glass-ui
```

**Use Cases:**
- Public projects
- Quick installation
- No authentication needed

### GitHub Packages (Scoped)
```
Developer Machine
      │
      │ 1. Configure .npmrc
      │    @yhooi2:registry=https://npm.pkg.github.com
      ▼
      │ 2. Authenticate (one-time)
      │    npm login --scope=@yhooi2
      ▼
      │ 3. npm install @yhooi2/shadcn-glass-ui
      ▼
npm.pkg.github.com
      │
      │ 4. Verify PAT (read:packages)
      │ 5. Download package
      ▼
node_modules/@yhooi2/shadcn-glass-ui
```

**Use Cases:**
- Private/internal projects
- Enhanced security requirements
- GitHub-integrated workflows
- Organizational packages

## 🔄 Version Lifecycle

```
Development
    │
    │ Feature/Bug Fix
    ▼
Testing
    │
    │ npm test, lint, build
    ▼
Version Bump
    │
    │ npm version patch/minor/major
    ▼
Changelog Update
    │
    │ Document changes
    ▼
Git Tag
    │
    │ git tag vX.Y.Z
    ▼
GitHub Release
    │
    │ Create release from tag
    ▼
Automated Publishing
    │
    ├─→ npm Registry (public)
    └─→ GitHub Packages (scoped)
    │
    ▼
Verification
    │
    ├─→ npm view shadcn-glass-ui@X.Y.Z
    └─→ GitHub Packages page
    │
    ▼
Announcement
    │
    ├─→ GitHub Discussions
    ├─→ Social media
    └─→ Release notes
```

## 🎯 Key Differences: npm vs GitHub Packages

| Feature | npm Registry | GitHub Packages |
|---------|-------------|-----------------|
| **Package Name** | `shadcn-glass-ui` | `@yhooi2/shadcn-glass-ui` |
| **Authentication** | OIDC (publish)<br>None (install) | `GITHUB_TOKEN` (publish)<br>PAT (install) |
| **Access** | Public | Public with auth |
| **Scope** | Unscoped | `@yhooi2` scoped |
| **Registry** | registry.npmjs.org | npm.pkg.github.com |
| **Installation** | `npm install shadcn-glass-ui` | `npm install @yhooi2/shadcn-glass-ui` |
| **Setup Required** | None | `.npmrc` + authentication |
| **Security** | Trusted Publishing (OIDC) | GitHub token |
| **Provenance** | Automatic | Manual (via workflow) |
| **Use Case** | Public distribution | GitHub-integrated projects |

## 🚀 Quick Commands

### For Maintainers
```bash
# Full release cycle
npm version patch && \
git push && git push --tags && \
gh release create $(git describe --tags --abbrev=0)

# Monitor publishing
gh run watch
```

### For End Users

**npm Registry:**
```bash
npm install shadcn-glass-ui
```

**GitHub Packages:**
```bash
# Setup (first time)
echo "@yhooi2:registry=https://npm.pkg.github.com" >> .npmrc
npm login --scope=@yhooi2 --registry=https://npm.pkg.github.com

# Install
npm install @yhooi2/shadcn-glass-ui
```

## 📚 Resources

- [npm Trusted Publishing Announcement](https://github.blog/changelog/2025-01-15-npm-trusted-publishing-is-generally-available/)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [OIDC in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Publishing Guide](PUBLISHING_GUIDE.md)
- [GitHub Packages Guide](GITHUB_PACKAGES.md)
