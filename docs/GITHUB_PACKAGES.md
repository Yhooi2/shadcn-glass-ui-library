# GitHub Packages Publishing Guide

This guide explains how to publish and install the `shadcn-glass-ui` library using GitHub Packages.

## 📦 What is GitHub Packages?

GitHub Packages is a package hosting service integrated with GitHub that provides:

- **Enhanced Security** - Direct integration with GitHub's security features
- **No Separate Tokens** - Uses GitHub authentication (Personal Access Tokens)
- **Provenance** - Automatic package verification and attribution
- **Access Control** - Fine-grained permissions via GitHub
- **Integration** - Seamless workflow with GitHub Actions

## 🔒 Benefits Over npm Registry

### npm Trusted Publishing (Coming Soon)
When GitHub Packages supports npm Trusted Publishing with OIDC:
- ✅ No tokens needed - cryptographic OIDC authentication
- ✅ Automatic provenance generation
- ✅ Enhanced security with short-lived tokens
- ✅ No secret rotation required

**Current Status:** GitHub Packages uses `GITHUB_TOKEN` which is automatically available in GitHub Actions.

## 🚀 Publishing to GitHub Packages

### Prerequisites
- Package name must be scoped: `@yhooi2/shadcn-glass-ui` ✅ (already configured)
- Repository must have workflows enabled
- Version must match git tag (e.g., `v1.0.0` → version `1.0.0`)

### Publishing Steps

#### Option 1: Automated (via GitHub Release)
1. Create a new release on GitHub
2. Tag format: `v1.0.0` (must match package.json version)
3. GitHub Actions will automatically publish to GitHub Packages

#### Option 2: Manual (via workflow_dispatch)
```bash
# Trigger the workflow manually
gh workflow run publish-github-packages.yml -f tag=v1.0.0

# Check workflow status
gh run list --workflow=publish-github-packages.yml --limit 1
```

### Configuration Files

#### package.json
```json
{
  "name": "@yhooi2/shadcn-glass-ui",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

#### .npmrc (project root)
```
@yhooi2:registry=https://npm.pkg.github.com
```

## 📥 Installing from GitHub Packages

### For End Users

#### Step 1: Create `.npmrc` file
Create a `.npmrc` file in your project root:
```
@yhooi2:registry=https://npm.pkg.github.com
```

#### Step 2: Authenticate (First Time Only)
```bash
npm login --scope=@yhooi2 --registry=https://npm.pkg.github.com
```

You will be prompted for:
- **Username:** Your GitHub username
- **Password:** Your GitHub Personal Access Token (PAT)
- **Email:** Your email address

#### Step 3: Create Personal Access Token
1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Name: `npm-packages-read`
4. Expiration: Choose appropriate duration
5. Select scopes:
   - ✅ `read:packages` - Download packages from GitHub Package Registry
6. Click **"Generate token"**
7. **Copy the token** - you won't see it again!

#### Step 4: Install the Package
```bash
npm install @yhooi2/shadcn-glass-ui
```

### Alternative: Using .npmrc with Token

For CI/CD or automated setups, you can add the token directly to `.npmrc`:

```bash
# .npmrc
@yhooi2:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then set the environment variable:
```bash
export GITHUB_TOKEN=ghp_your_token_here
npm install @yhooi2/shadcn-glass-ui
```

## 🔐 GitHub Actions Authentication

In GitHub Actions, authentication is automatic:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'
    registry-url: 'https://npm.pkg.github.com'

- name: Install dependencies
  run: npm install @yhooi2/shadcn-glass-ui
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The `GITHUB_TOKEN` is automatically provided by GitHub Actions.

## 📊 Viewing Published Packages

After successful publication, your package will be visible at:
- **Repository Packages:** https://github.com/Yhooi2/shadcn-glass-ui-library/packages
- **User/Org Packages:** https://github.com/Yhooi2?tab=packages

## 🔍 Verifying Package Contents

### Before Publishing
```bash
npm pack --dry-run
```

### After Publishing
```bash
npm view @yhooi2/shadcn-glass-ui@1.0.0
```

## 🐛 Troubleshooting

### Error: 401 Unauthorized
**Cause:** Token expired or missing `read:packages` scope

**Solution:**
1. Generate a new PAT with `read:packages` scope
2. Re-authenticate: `npm login --scope=@yhooi2 --registry=https://npm.pkg.github.com`

### Error: 404 Package not found
**Cause:** Package not published or wrong scope

**Solution:**
1. Verify package exists: https://github.com/Yhooi2/shadcn-glass-ui-library/packages
2. Check `.npmrc` has correct scope: `@yhooi2:registry=https://npm.pkg.github.com`

### Error: Version mismatch
**Cause:** package.json version doesn't match git tag

**Solution:**
1. Update package.json version: `npm version 1.0.0`
2. Create matching git tag: `git tag v1.0.0`
3. Push both: `git push && git push --tags`

## 📚 Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [npm Trusted Publishing (upcoming)](https://github.blog/changelog/2025-01-15-npm-trusted-publishing-is-generally-available/)
- [Working with npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

## 🔄 Migration from npm to GitHub Packages

If you're already using `shadcn-glass-ui` from npm:

1. **Update `.npmrc`** to add GitHub Packages registry for scoped packages
2. **Authenticate** with GitHub
3. **Change import name** from `shadcn-glass-ui` to `@yhooi2/shadcn-glass-ui`
4. **Reinstall:** `npm install @yhooi2/shadcn-glass-ui`

Both registries can coexist:
```
# .npmrc
@yhooi2:registry=https://npm.pkg.github.com
# All other packages use default npm registry
```

## 🎯 Best Practices

1. **Version Management**
   - Always match package.json version with git tags
   - Use semantic versioning (MAJOR.MINOR.PATCH)

2. **Token Security**
   - Never commit tokens to git
   - Use environment variables for CI/CD
   - Set appropriate token expiration

3. **Access Control**
   - Use minimal scopes (`read:packages` for installation, `write:packages` for publishing)
   - Create separate tokens for different purposes

4. **Documentation**
   - Include installation instructions in README
   - Document all registry requirements
   - Provide troubleshooting guides
