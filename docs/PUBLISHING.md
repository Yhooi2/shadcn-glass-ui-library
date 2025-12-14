# Publishing Guide

Complete guide for building and publishing the shadcn-glass-ui library with TypeScript declarations.

## 📋 Table of Contents

- [Build Process](#build-process)
- [Type Declarations](#type-declarations)
- [Package Configuration](#package-configuration)
- [Publishing Checklist](#publishing-checklist)
- [NPM Publishing](#npm-publishing)

## Build Process

### 1. Build Library Bundle

Build the production JavaScript bundle:

```bash
npm run build
```

This command runs:

- TypeScript compilation (`tsc -b`)
- Vite production build
- Output: `dist/` directory with bundled JavaScript

### 2. Generate Type Declarations

Generate TypeScript declaration files (`.d.ts`):

```bash
npm run build:types
```

This command:

- Uses `tsc --project tsconfig.build.json`
- Generates `.d.ts` files for all exported types (136 files)
- Outputs to `dist/` directory alongside JavaScript files
- Preserves JSDoc comments in declarations
- Includes declaration maps for better IDE support

**Example output:**

```
dist/
├── index.js           # Main bundle
├── index.d.ts         # Main type declarations
├── components/
│   └── glass/
│       └── ui/
│           ├── button-glass.d.ts
│           └── ...
└── lib/
    ├── types.d.ts
    └── variants/
        └── ...
```

### 3. Full Production Build

For publishing, run both commands:

```bash
npm run build && npm run build:types
```

Or create a combined script in `package.json`:

```json
{
  "scripts": {
    "prepublishOnly": "npm run build && npm run build:types"
  }
}
```

## Type Declarations

### Main Entry Point

The library exports all types from a single entry point: `src/index.ts`

**Import examples:**

```typescript
// Components with types
import { ButtonGlass, type ButtonGlassProps } from 'shadcn-glass-ui';

// Variant types
import { type ButtonGlassVariant } from 'shadcn-glass-ui';

// Theme system
import { ThemeProvider, useTheme, type Theme } from 'shadcn-glass-ui';

// Utilities
import { cn } from 'shadcn-glass-ui';
```

### JSDoc Documentation

All exported types include comprehensive JSDoc comments:

````typescript
/**
 * Props for ButtonGlass component
 *
 * @description Glass-themed button with multiple variants, sizes, and states.
 * Supports polymorphic rendering via asChild prop.
 *
 * @example
 * ```tsx
 * <ButtonGlass variant="default" size="default">
 *   Click me
 * </ButtonGlass>
 *
 * // Polymorphic usage
 * <ButtonGlass asChild>
 *   <Link to="/home">Home</Link>
 * </ButtonGlass>
 * ```
 *
 * @see {@link ButtonGlassVariant} for available variants
 */
export type ButtonGlassProps = { ... }
````

**Benefits:**

- ✅ VSCode IntelliSense shows examples
- ✅ AI assistants (Copilot, Claude) get full context
- ✅ API documentation can be auto-generated
- ✅ Type safety with usage guidance

### Type Coverage

**Statistics:**

- 59 exported types
- 60 exported components/functions
- 64 JSDoc code examples
- 50+ documented components

**Categories:**

1. **Theme System** - Theme, ThemeConfig, ThemeProvider
2. **Core UI Components** - ButtonGlass, InputGlass, ModalGlass, etc.
3. **Specialized Components** - ProgressGlass, StatusIndicatorGlass, etc.
4. **Atomic Components** - ThemeToggleGlass, IconButtonGlass, etc.
5. **Composite Components** - MetricCardGlass, YearCardGlass, etc.
6. **Section Components** - HeaderNavGlass, ProfileHeaderGlass, etc.
7. **Primitive Components** - TouchTarget, FormFieldWrapper, etc.
8. **Variant Types** - All CVA variant types and enums
9. **Utilities** - `cn()`, design tokens, constants

## Package Configuration

### package.json Setup

The library is configured for proper TypeScript support:

```json
{
  "name": "shadcn-glass-ui",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist", "src"]
}
```

**Key fields:**

- **`main`** - Entry point for Node.js/CommonJS (fallback)
- **`types`** - TypeScript declaration entry point
- **`exports`** - Modern exports map (ESM + TypeScript)
  - `types` - Points to `.d.ts` files
  - `import` - Points to ESM JavaScript
- **`files`** - Which files to include in npm package
  - `dist/` - Built JavaScript + declarations
  - `src/` - Source files (optional, for source maps)

### TypeScript Configuration

The library uses strict TypeScript configuration:

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false,
    "isolatedModules": true,
    "noEmit": false
  }
}
```

**For publishing, use:**

```bash
tsc --declaration --emitDeclarationOnly --outDir dist
```

**Flags explained:**

- `--declaration` - Generate `.d.ts` files
- `--emitDeclarationOnly` - Only output declarations (no JS)
- `--outDir dist` - Output to dist directory

## Publishing Checklist

Before publishing to npm, verify:

### 1. Build Verification

```bash
# Clean previous build
rm -rf dist/

# Build JavaScript bundle
npm run build

# Build type declarations
npm run build:types

# Verify outputs
ls -la dist/
```

**Expected files:**

- ✅ `dist/index.js` - Main JavaScript bundle
- ✅ `dist/index.d.ts` - Main type declarations
- ✅ `dist/**/*.d.ts` - Component type declarations

### 2. Type Checking

Verify all types are correct:

```bash
npm run lint
tsc --noEmit
```

### 3. Test Coverage

Run all tests before publishing:

```bash
# Unit tests
npm run test:unit

# Visual regression tests
npm run test:visual:ci

# Design system compliance
npm run test:compliance:run

# All tests
npm run test:all
```

### 4. Version Bump

Update version in `package.json`:

```bash
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features)
npm version major  # 1.0.0 → 2.0.0 (breaking changes)
```

**Version Guidance:**

- **Patch (1.0.x)** - Bug fixes, documentation updates, internal refactoring
- **Minor (1.x.0)** - New components, new features, backward-compatible changes
- **Major (x.0.0)** - Breaking changes, removed APIs, renamed props

**v2.0.0 Example (Breaking Changes):**

```bash
# Version 2.0.0 introduced breaking changes:
# - Removed deprecated CSS variables (--metric-emerald-* → --metric-success-*)
# - Introduced 3-layer token architecture
# - Zero hardcoded OKLCH values

npm version major  # 1.0.11 → 2.0.0
```

**Breaking Changes Checklist:**

If releasing a major version with breaking changes:

- [ ] Update [CHANGELOG.md](../CHANGELOG.md) with "⚠️ BREAKING CHANGES" section
- [ ] Create migration guide in `docs/migration/` (e.g., CSS_VARIABLES_MIGRATION_2.0.md)
- [ ] Update [README.md](../README.md) with breaking changes warning
- [ ] Update [CLAUDE.md](../CLAUDE.md) with new patterns/APIs
- [ ] Add deprecation warnings in previous minor version (if possible)
- [ ] Test migration path with real-world projects
- [ ] Document all removed/renamed APIs with replacements
- [ ] Update Context7 rules in [context7.json](../context7.json)

### 5. Documentation Check

Ensure documentation is up to date:

- ✅ `README.md` - Updated examples and version badges
- ✅ `CHANGELOG.md` - New version entry with all changes
- ✅ `CLAUDE.md` - Architecture notes and breaking changes
- ✅ JSDoc comments - All types documented
- ✅ Migration guides - Created for breaking changes (if applicable)
- ✅ `context7.json` - Version and rules updated for AI assistants

### 6. Package Dry Run

Test package before publishing:

```bash
# Pack locally
npm pack

# This creates shadcn-glass-ui-1.0.0.tgz
# Install in test project:
cd /path/to/test-project
npm install /path/to/shadcn-glass-ui-1.0.0.tgz

# Verify imports work
import { ButtonGlass, type ButtonGlassProps } from 'shadcn-glass-ui';
```

## NPM Publishing

### First-Time Setup

1. **Create npm account** at https://www.npmjs.com/signup

2. **Login to npm:**

   ```bash
   npm login
   ```

3. **Update package.json:**
   ```json
   {
     "name": "@yourusername/shadcn-glass-ui",
     "private": false,
     "publishConfig": {
       "access": "public"
     }
   }
   ```

### Publishing Process

1. **Prepare release:**

   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install

   # Run tests
   npm run test:all

   # Build for production
   npm run build
   npm run build:types
   ```

2. **Publish to npm:**

   ```bash
   npm publish
   ```

   Or for scoped package:

   ```bash
   npm publish --access public
   ```

3. **Verify publication:**

   ```bash
   # Check on npm
   npm view @yourusername/shadcn-glass-ui

   # Install in test project
   npm install @yourusername/shadcn-glass-ui
   ```

### Automated Publishing with GitHub Actions

The repository includes automated npm publishing workflow in `.github/workflows/publish.yml`.

**Features:**

- ✅ Publishes on GitHub release creation
- ✅ Manual trigger with specific tag (workflow_dispatch)
- ✅ Version verification (tag vs package.json)
- ✅ Dry-run validation before publish
- ✅ npm provenance for supply chain security
- ✅ Automatic GitHub deployment tracking

**Setup NPM Token:**

1. **Create npm access token:**
   - Go to https://www.npmjs.com/settings/tokens
   - Click "Generate New Token" → "Classic Token"
   - Select "Automation" type (for CI/CD)
   - Copy the token

2. **Add to GitHub Secrets:**
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: paste your npm token
   - Click "Add secret"

**Publishing via GitHub Release:**

1. **Create git tag:**

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Create GitHub Release:**
   - Go to repository → Releases → "Create a new release"
   - Choose tag: `v1.0.0`
   - Fill in release notes (use CHANGELOG.md)
   - Click "Publish release"

3. **Monitor workflow:**
   ```bash
   gh run list --workflow=publish.yml --limit 1
   gh run watch
   ```

**Manual Trigger:**

Publish specific tag without creating a release:

```bash
gh workflow run publish.yml -f tag=v1.0.0
```

**Important Notes:**

- Tag version MUST match package.json version (e.g., `v1.0.0` → `1.0.0`)
- Workflow includes provenance for supply chain security
- Public access is automatic (configured in workflow)
- Build runs via `prepublishOnly` hook in package.json

## Troubleshooting

### Types Not Found

**Issue:** TypeScript can't find types after installation

**Solution:**

```json
// Verify package.json exports
{
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts"
    }
  }
}
```

### Module Resolution Errors

**Issue:** Import errors in consuming projects

**Solution:**

```json
// Consumer's tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node"
    "esModuleInterop": true
  }
}
```

### Missing JSDoc in IDE

**Issue:** JSDoc comments not showing in autocomplete

**Solution:**

- Ensure `--declaration` preserves comments
- Verify `.d.ts` files contain `/** */` comments
- Reload VSCode TypeScript server

### Build Failures

**Issue:** TypeScript compilation fails

**Solution:**

```bash
# Check for type errors
tsc --noEmit

# Clean and rebuild
rm -rf dist/ node_modules/
npm install
npm run build:types
```

## Best Practices

### 1. Semantic Versioning

Follow [semver](https://semver.org/) strictly:

- **Patch** (1.0.x) - Bug fixes, no API changes
- **Minor** (1.x.0) - New features, backward compatible
- **Major** (x.0.0) - Breaking changes

### 2. Changelog Maintenance

Update `CHANGELOG.md` for every release:

```markdown
## [1.1.0] - 2025-01-15

### Added

- New component: DatePickerGlass
- ComboBoxGlass: Multi-select support

### Fixed

- ButtonGlass: Focus ring visibility in Aurora theme

### Changed

- InputGlass: Improved error state styling
```

### 3. Type Documentation

Always include JSDoc for public APIs:

- Component props
- Variant types
- Utility functions
- Theme configuration

### 4. Testing Before Publish

Never skip tests before publishing:

```bash
npm run test:all && npm run build && npm run build:types && npm publish
```

## Resources

- **NPM Documentation**: https://docs.npmjs.com/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **Semantic Versioning**: https://semver.org/
- **JSDoc Reference**: https://jsdoc.app/

---

**Happy publishing!** 🚀
