# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2025-12-06

### 🔄 Changed

**Package Name:**
- Renamed package from `@yhooi2/shadcn-glass-ui` to `shadcn-glass-ui`
- Simpler installation: `npm install shadcn-glass-ui`
- **Migration:** Update your `package.json` dependencies from `@yhooi2/shadcn-glass-ui` to `shadcn-glass-ui`

**Publishing:**
- Now publishing only to npm Registry (removed GitHub Packages)
- Simplified installation - no authentication required
- Single source of truth for package distribution

### 📚 Documentation

- Updated all documentation to reflect new package name
- Removed GitHub Packages installation instructions
- Updated README badges and links
- Simplified installation guide

### 🗑️ Removed

- GitHub Packages publishing workflow
- GitHub Packages documentation
- Removed cyclic self-dependency from package.json

### 📦 Migration Guide

If you're upgrading from `@yhooi2/shadcn-glass-ui`:

```bash
# Uninstall old package
npm uninstall @yhooi2/shadcn-glass-ui

# Install new package
npm install shadcn-glass-ui
```

Update your imports (no changes needed - imports remain the same):
```tsx
// Still works the same way
import { ButtonGlass, InputGlass } from 'shadcn-glass-ui';
```

## [1.0.5] - 2025-12-06

### ✨ Added

**Glass Variants System:**
- New comprehensive glass effect variants: `crystal`, `frosted`, `fluted`, `glass`
- Color tint modifiers: `purple`, `cyan`, `amber`, `emerald`, `rose`
- Intensity modifiers: `subtle`, `medium`, `strong`
- 72 total variant combinations (4 base × 6 tints × 3 intensities)
- New CSS utility classes in `primitives.css` for all variants

**Components:**
- `GlassVariantsDemo` - Interactive showcase of all 72 glass variant combinations
- Updated `GlassCard.stories.tsx` with variant demonstrations

**Publishing:**
- Dual registry support: npm Registry + GitHub Packages
- Automated publishing to both registries on release
- Enhanced GitHub Actions workflow with registry validation

### 📚 Documentation

- Updated `Introduction.mdx` with dual registry installation instructions
- Enhanced Storybook preview with 3-theme switcher (Glass/Light/Aurora)
- Added comprehensive glass variants documentation
- Updated installation guide with both npm and GitHub Packages options

### 🧪 Testing

- Added 27 visual regression tests for glass variants
- Full coverage across all 3 themes (glass, light, aurora)
- Visual baselines for all variant combinations
- Tests for intensity modifiers and color tints

### 🔧 Infrastructure

- GitHub Actions workflow publishes to npm + GitHub Packages
- `NODE_AUTH_TOKEN` authentication for npm
- `GITHUB_TOKEN` authentication for GitHub Packages
- Automated version verification before publish
- Enhanced CI/CD pipeline with dual-registry support

### 🗑️ Cleanup

- Removed temporary `.claude/tepm` files
- Cleaned up legacy configuration files

## [1.0.3] - 2025-12-06

### 🔧 Fixed

- Workflow authentication for dual registry publishing
- Package metadata alignment between registries

## [1.0.2] - 2025-12-06

### 📚 Documentation

- Updated Storybook documentation with LinkTo components for improved navigation
- Added comprehensive documentation for Blocks, Composite, Core, and Section components
- Implemented custom Glass UI theme for Storybook Manager
- Added Design System and Getting Started guides in Storybook

### 🔧 Maintenance

- Updated GitHub Actions workflow to use OIDC publishing (no auth token needed)
- Fixed npm publish workflow to explicitly set registry URL
- Improved package.json metadata with correct registry configuration

## [1.0.1] - 2025-12-05

### 🚀 Initial Public Release

- First public release to npm registry
- Added registry system for shadcn CLI compatibility
- Added registry submission guide and CI/CD automation
- Added git hook to prevent committing non-Linux screenshots

## [1.0.0] - 2025-12-05

### ⚠️ BREAKING CHANGES

- **SelectGlass:** Component completely removed
  - **Migration:** Use `ComboBoxGlass` instead
  - **Rationale:** Better performance, more features, shadcn/ui compatibility

- **ModalGlass:** Legacy props API completely removed
  - **Old API:** `isOpen`, `onClose`, `title` props
  - **New API:** Compound API only (`ModalGlass.Root`, `.Overlay`, `.Content`, `.Header`, `.Body`, `.Footer`, `.Title`, `.Description`, `.Close`)
  - **Migration:** See [ModalGlass Compound API guide](docs/migration/modal-glass-compound-api.md)
  - **Key Changes:**
    - `isOpen` → `open` (on ModalGlass.Root)
    - `onClose` → `onOpenChange` with new signature: `(open: boolean) => void`
    - `title` prop removed → use `<ModalGlass.Title>` component
  - **Rationale:** Better composition, more flexible, matches modern React patterns

- **TabsGlass:** Legacy props API completely removed
  - **Old API:** `tabs`, `activeTab`, `onChange` props
  - **New API:** Compound API only (`TabsGlass.Root`, `.List`, `.Trigger`, `.Content`)
  - **Migration:** See [TabsGlass Compound API guide](docs/migration/tabs-glass-compound-api.md)
  - **Key Changes:**
    - `tabs` array prop removed → use individual `<TabsGlass.Trigger>` components
    - `activeTab` → `value` (on TabsGlass.Root)
    - `onChange` → `onValueChange`
  - **Rationale:** Better composition, explicit content control, type safety

### ✨ Added

- Compound Component APIs for ModalGlass and TabsGlass (introduced earlier, now mandatory)
- Comprehensive migration guides in `docs/migration/` directory

### 🗑️ Removed

- SelectGlass component (replaced by ComboBoxGlass)
- ModalGlass legacy props API (`isOpen`, `onClose`, `title`)
- TabsGlass legacy props API (`tabs`, `activeTab`, `onChange`)
- All backward compatibility layers for deprecated APIs

### ✅ Tests

- 1,783 tests passing (100%)
  - 29 ModalGlass unit tests (migrated)
  - 23 TabsGlass unit tests (migrated)
  - 44 ModalGlass compliance tests (migrated)
  - 6 additional compliance files (accessibility, glassmorphism, tokens)
  - 582 visual regression tests (updated screenshots)

### 📚 Documentation

- Updated README.md with v1.0.0 breaking changes
- Created migration guide for ModalGlass Compound API
- Created migration guide for TabsGlass Compound API
- Updated all examples to use new APIs

---

## [Unreleased]

### ⚠️ BREAKING CHANGES

- **ButtonGlass:** Removed `danger` variant in favor of `destructive` for shadcn/ui API compatibility
  - **Migration:** Replace `variant="danger"` with `variant="destructive"`
  - **Affected:** 3 files in library, user code may require updates
  - **Rationale:** Aligns with shadcn/ui design system standards

- **AlertGlass:** Removed deprecated `type` prop in favor of `variant` prop
  - **Migration:**
    - `type="info"` → `variant="default"`
    - `type="error"` → `variant="destructive"`
    - `type="success"` → `variant="success"`
    - `type="warning"` → `variant="warning"`
  - **Affected:** User code using `type` prop will need updates
  - **Rationale:** Consistency with shadcn/ui component APIs

- **NotificationGlass:** Removed deprecated `type` prop in favor of `variant` prop
  - **Migration:** Same as AlertGlass (see above)
  - **Affected:** User code using `type` prop will need updates
  - **Rationale:** API consistency across all Glass components

### 🔧 Refactored

- **AlertGlass:** Migrated from deprecated `type` prop to `variant` prop (57 instances across codebase)
- **NotificationGlass:** Migrated from deprecated `type` prop to `variant` prop (8 source files)
- Updated all visual regression tests to use new `variant` API (582 tests passing)
- Updated all unit tests to use new `variant` API (32 NotificationGlass tests, 32 AlertGlass tests)

### 🧹 Cleanup

- Removed 9 empty directories from `src/` for cleaner project structure
- Removed console.log from production code (career-stats-glass.tsx)
- Updated 20+ files with legacy API usage

### 📚 Documentation

- Completed comprehensive legacy API audit and cleanup
- Added Phase 1 and Phase 2 migration completion reports
- Updated migration guides in [docs/migration/](docs/migration/)

### ✅ Tests

- All 582 visual regression tests passing
- All 64 unit tests passing (NotificationGlass + AlertGlass)
- TypeScript compilation successful
- ESLint passing

---

## Migration Guide

### For Library Users

If you're using this library and have code that breaks after updating, here's how to migrate:

#### ButtonGlass

```tsx
// Before (breaks in new version)
<ButtonGlass variant="danger">Delete</ButtonGlass>

// After (works in new version)
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

#### AlertGlass

```tsx
// Before (breaks in new version)
<AlertGlass type="info" title="Info">Message</AlertGlass>
<AlertGlass type="error" title="Error">Message</AlertGlass>
<AlertGlass type="success" title="Success">Message</AlertGlass>
<AlertGlass type="warning" title="Warning">Message</AlertGlass>

// After (works in new version)
<AlertGlass variant="default" title="Info">Message</AlertGlass>
<AlertGlass variant="destructive" title="Error">Message</AlertGlass>
<AlertGlass variant="success" title="Success">Message</AlertGlass>
<AlertGlass variant="warning" title="Warning">Message</AlertGlass>
```

#### NotificationGlass

```tsx
// Before (breaks in new version)
<NotificationGlass
  type="info"
  title="Update available"
  message="Version 2.0 is ready"
  onClose={() => {}}
/>

// After (works in new version)
<NotificationGlass
  variant="default"
  title="Update available"
  message="Version 2.0 is ready"
  onClose={() => {}}
/>
```

---

## Why These Changes?

### shadcn/ui API Compatibility

All changes align the library with shadcn/ui design system standards:

1. **Consistent Naming**: `variant` is the standard prop name across shadcn/ui components (Button, Badge, Alert, etc.)
2. **Semantic Correctness**: `variant` describes visual style variations, while `type` describes data types
3. **Better DX**: Consistent APIs across all Glass components improve developer experience
4. **Design System Compliance**: Makes the library easier to integrate with shadcn/ui projects

### Variant Mapping Rationale

- `info` → `default`: shadcn/ui uses "default" for neutral/informational variants
- `error` → `destructive`: shadcn/ui standard naming for error/danger states
- `success` / `warning`: Unchanged (already shadcn/ui compatible)

---

## Project Statistics

### Changes Summary

| Category           | Count |
|--------------------|-------|
| Breaking changes   | 3 (ButtonGlass, AlertGlass, NotificationGlass) |
| Files modified     | 20+ |
| Empty dirs removed | 9 |
| Tests updated      | 582 visual + 64 unit |
| Documentation      | 5 new files (1,967 lines) |

### Quality Metrics

- ✅ **Test Coverage**: 100% (582/582 visual, 64/64 unit)
- ✅ **TypeScript**: Strict mode, no errors
- ✅ **ESLint**: All rules passing
- ✅ **Build**: Successful compilation

---

## Timeline

- **2025-12-04**: Legacy API audit completed
- **2025-12-05**: Phase 1 (ButtonGlass) completed
- **2025-12-05**: Phase 2 (AlertGlass + NotificationGlass) completed
- **2025-12-05**: Console cleanup and documentation completed

---

## Contributors

- Claude Code AI Assistant (migration implementation)
- Project maintainers (review and approval)

---

**Note**: This changelog documents the breaking changes and migrations performed during the legacy code cleanup initiative. For future releases, this file will continue to track all notable changes to the project.
