# Installation Guide

The `@yhooi2/shadcn-glass-ui` package is published to **two registries**, giving you flexibility in how you install it.

## 📦 Available Registries

| Registry | URL | Recommended |
|----------|-----|-------------|
| **npm** | https://www.npmjs.com/package/@yhooi2/shadcn-glass-ui | ✅ Yes (Public, faster) |
| **GitHub Packages** | https://github.com/Yhooi2/shadcn-glass-ui-library/packages | ⚙️ Alternative |

---

## 🚀 Quick Install (npm - Recommended)

```bash
npm install @yhooi2/shadcn-glass-ui
```

This is the simplest and recommended method for most users.

---

## 🔧 Install from GitHub Packages

### Option 1: One-time install with flag

```bash
npm install @yhooi2/shadcn-glass-ui --registry=https://npm.pkg.github.com
```

### Option 2: Configure .npmrc (for multiple installs)

Create `.npmrc` in your project root:

```
@yhooi2:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**Note:** You need a GitHub Personal Access Token with `read:packages` permission.

**Create token:**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scope: `read:packages`
4. Copy token

**Set environment variable:**
```bash
export GITHUB_TOKEN=your_github_token
```

Then install normally:
```bash
npm install @yhooi2/shadcn-glass-ui
```

---

## 📥 Complete Setup

After installation from either registry:

### 1. Install peer dependencies

```bash
npm install react react-dom tailwindcss
```

### 2. Import styles

In your main app file (e.g., `src/main.tsx`):

```tsx
import '@yhooi2/shadcn-glass-ui/dist/styles.css';
```

### 3. Use components

```tsx
import { ButtonGlass, ThemeProvider } from '@yhooi2/shadcn-glass-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <ButtonGlass variant="primary">Click me</ButtonGlass>
    </ThemeProvider>
  );
}
```

---

## 🎯 Which Registry Should I Use?

### Use **npm** if:
- ✅ You want the simplest setup
- ✅ You don't need GitHub authentication
- ✅ You want faster installs (npm CDN)
- ✅ You're building a public project

### Use **GitHub Packages** if:
- ⚙️ You're in a GitHub Enterprise environment
- ⚙️ Your organization requires GitHub Packages
- ⚙️ You want to audit package sources via GitHub
- ⚙️ You already have GitHub authentication set up

**Recommendation:** Use npm unless you have a specific reason to use GitHub Packages.

---

## 🔍 Verify Installation

Check installed version:

```bash
npm list @yhooi2/shadcn-glass-ui
```

Check registry source:

```bash
npm view @yhooi2/shadcn-glass-ui dist.tarball
```

**npm registry:**
```
https://registry.npmjs.org/@yhooi2/shadcn-glass-ui/-/shadcn-glass-ui-1.0.2.tgz
```

**GitHub Packages:**
```
https://npm.pkg.github.com/download/@yhooi2/shadcn-glass-ui/1.0.2/...
```

---

## 🚨 Troubleshooting

### Error: "404 Not Found - GET https://npm.pkg.github.com/@yhooi2%2fshadcn-glass-ui"

**Solution:** You need authentication for GitHub Packages. See [Option 2](#option-2-configure-npmrc-for-multiple-installs) above.

### Error: "Unable to authenticate need: Basic realm="GitHub Package Registry""

**Solution:** Your GITHUB_TOKEN is invalid or expired. Generate a new token with `read:packages` permission.

### Package installed but imports fail

**Solution:** Make sure you imported the CSS:
```tsx
import '@yhooi2/shadcn-glass-ui/dist/styles.css';
```

---

## 📚 Next Steps

- [Getting Started Guide](./GETTING_STARTED.md)
- [Component Documentation](../README.md#component-categories)
- [Migration Guide](../MIGRATION_GUIDE.md)

---

**Happy coding!** 🎉
