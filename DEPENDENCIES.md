# Dependencies Documentation

This document provides comprehensive information about the key dependencies used in the shadcn-glass-ui-library project.

## Core Framework & Build Tools

### React 19.2
**Version:** 19.2.0
**Purpose:** UI library foundation
**Official Docs:** [react.dev](https://react.dev/)

**Key Features:**
- **React Server Components** - Production-ready and stable in React 19. Render components ahead of time before bundling in a separate environment from client app or SSR server. Can run once at build time on CI server or per-request using a web server. Libraries can now target React 19 with `react-server` export condition for Full-stack React Architecture support.
- **Server Actions** - Stable feature for replacing traditional REST/GraphQL APIs in frameworks like Next.js and Remix. Note: `"use server"` directive is for Server Actions, not Server Components (which have no directive).
- **React Compiler** - Production-ready compiler automating performance optimizations, eliminating manual memoization with `useMemo` and `useCallback`
- **`use()` API** - Read resources in render, allowing promise reading with automatic Suspense integration
- **Document Metadata Support** - Native support for rendering `<title>`, `<link>`, and `<meta>` tags with automatic hoisting to `<head>`
- **Framework Integration** - Server Components stable for use in frameworks but bundler/framework APIs don't follow semver and may break between React 19.x minors

**References:**
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [React Server Components Reference](https://react.dev/reference/rsc/server-components)

### Vite 7 (rolldown-vite)
**Version:** 7.2.5 (rolldown-vite)
**Purpose:** Build tool and development server
**Official Docs:** [vite.dev](https://vite.dev/)

**About Rolldown:**
- **Rust-based Next-Gen Bundler** - High-performance JavaScript bundler developed by VoidZero as part of Vite's modernization strategy
- **Drop-in Replacement** - Available today via `rolldown-vite` package with Rollup-compatible API
- **Unification** - Replaces both esbuild (dependency pre-bundling) and Rollup (production builds) with single bundler
- **Performance Gains:**
  - **3-16x faster** production builds vs JavaScript bundlers
  - **100x reduction** in memory usage
  - GitLab: 2.5 minutes → 40 seconds (100x less memory)
  - Excalidraw: 22.9 seconds → 1.4 seconds (16x faster)
- **Future Default** - Will eventually become default bundler for Vite, particularly beneficial for larger projects
- **Dev/Build Consistency** - Eliminates inconsistencies between development and production by using same bundler

**Vite Evolution:**
- Vite 4.3: Significant dev server performance improvements
- Vite 5.1: 8s → 5.35s load time for 10K modules (bundle-less approach)
- Vite 7: Rolldown integration for unified, high-performance bundling

**References:**
- [Vite Rolldown Integration Guide](https://vite.dev/guide/rolldown)
- [Announcing Rolldown-Vite](https://voidzero.dev/posts/announcing-rolldown-vite)
- [Report Issues](https://github.com/vitejs/rolldown-vite)

### TypeScript 5.9
**Version:** ~5.9.3
**Purpose:** Type safety and developer experience
**Configuration:** Strict mode enabled

## Styling Framework

### Tailwind CSS 4.1
**Version:** 4.1.17
**Purpose:** Utility-first CSS framework
**Official Docs:** [tailwindcss.com](https://tailwindcss.com/)

**Major v4 Features:**
- **Performance Breakthrough:**
  - **5x faster** full builds vs v3
  - **100x faster** incremental builds (measured in microseconds, not seconds)
  - Significant reduction in build time impact for CSS modules
- **CSS-First Configuration:**
  - No more `tailwind.config.js` - all customizations in CSS using `@import`
  - Use `@reference` to import theme definitions into CSS modules without duplication
  - Migration: Replace `@tailwind` directives with standard CSS `@import` statements
- **Automatic Content Detection** - Zero configuration, automatic template file discovery
- **CSS Variables by Default** - All design tokens available as CSS variables for runtime access
- **Modern Web Platform:**
  - Built on cascade layers, `@property`, and `color-mix()`
  - Browser targets: Safari 16.4+, Chrome 111+, Firefox 128+ (March 2023+)
  - Native support for container queries, `@starting-style`, popovers
  - Wide-gamut color space support
- **First-Party Vite Plugin** - Tight integration via `@tailwindcss/vite` for optimal performance

**Breaking Changes from v3:**
- CSS modules require explicit `@reference` imports for theme access
- Preflight updates: placeholder color, button cursor, dialog centering, `hidden` attribute priority
- No `@tailwind` directives - use standard CSS imports

**Packages:**
- `tailwindcss@4.1.17` - Core framework
- `@tailwindcss/vite@4.1.17` - Vite integration plugin
- `@tailwindcss/postcss@4.1.17` - PostCSS plugin

**References:**
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

## Development Tools

### Storybook 10.1
**Version:** 10.1.0
**Purpose:** Component development workshop
**Official Docs:** [storybook.js.org](https://storybook.js.org/)

**Key Features:**
- **ESM-only Distribution** - 29% smaller install size (on top of 50% savings from v9), all packages use ESM-only format
- **Module Automocking** - Automatic mocking of API calls and services for easier component testing in isolation
- **Typesafe CSF Factories** - Enhanced type safety and autocompletion for React component stories
- **Enhanced Tag Filtering** - Improved sidebar organization with tag-based filtering, exclusion, and configuration
- **Vitest Integration** - Native Vitest addon transforms stories into Vitest tests, run with browser mode
- **Framework Support** - Next 16 and Vitest 4 support, Svelte async components
- **Ecosystem** - Extensible through presets and addons for documentation, a11y testing, design tools, test runners

**Testing Capabilities:**
- **Storybook Test** - Real-time testing via Vitest addon with automatic story-to-test transformation
- **composeStories API** - Reuse development stories as test fixtures, eliminating duplication
- **Unified Workflow** - Same component examples for development, testing, and documentation

**Breaking Changes (v9 → v10):**
- Main configuration (`.storybook/main.js|ts`) must be valid ESM
- Node 20.19+ or 22.12+ now required (was 20.16+ or 22.19+)
- Vitest setup file (`.storybook/vitest.setup.ts`) can be removed with CSF Next upgrade

**Installed Addons:**
- `@storybook/addon-a11y@10.1.0` - Accessibility testing with Axe
- `@storybook/addon-docs@10.1.0` - Documentation generation
- `@storybook/addon-vitest@10.1.0` - Vitest integration for component testing
- `@storybook/addon-mcp@0.1.3` - MCP integration
- `@chromatic-com/storybook@4.1.3` - Visual regression testing

**Node Requirements:** Node 20.19+, 22.12+, or 24+

**References:**
- [Storybook 10 Release](https://storybook.js.org/blog/storybook-10/)
- [Migration Guide](https://storybook.js.org/docs/releases/migration-guide)

### Vitest 4.0
**Version:** 4.0.14
**Purpose:** Testing framework
**Official Docs:** [vitest.dev](https://vitest.dev/)

**Key Features:**
- **Stable Browser Mode** - Test UI components in real browsers (Playwright/WebDriver/Preview). Removed `experimental` tag. Separate provider packages: `@vitest/browser-playwright`, `@vitest/browser-webdriverio`, `@vitest/browser-preview`
- **Visual Regression Testing:**
  - `toMatchScreenshot` assertion for screenshot comparison
  - `toBeInViewport` matcher using IntersectionObserver API
  - Screenshot storage in `__screenshots__/` directories
  - Update baselines with `--update` flag
- **Playwright Traces Integration:**
  - First-class trace support via `trace` config option
  - Trace modes: `off`, `on`, `on-first-retry`, `on-all-retries`, `retain-on-failure`
  - Traces available as annotations in reporters (e.g., HTML reporter)
  - View traces with Playwright Trace Viewer for CI debugging
- **Enhanced Debugging:**
  - "Debug Test" button in VSCode extension for browser tests
  - `--inspect` flag support (playwright/webdriverio)
  - Automatic `trackUnhandledErrors` disable during debugging
- **Architecture:** Tests run natively in browser (vs Playwright component tests running in Node.js with remote browser control)

**CI Configuration:**
- **Playwright:** Use `npx playwright install --with-deps --only-shell`
- **WebdriverIO:** Use browser setup actions (e.g., `@browser-actions/setup-chrome`)

**Installed Packages:**
- `vitest@4.0.14` - Core testing framework
- `@vitest/browser-playwright@4.0.14` - Browser testing with Playwright
- `@vitest/coverage-v8@4.0.14` - Code coverage with V8
- `@testing-library/react@16.3.0` - React testing utilities

**Breaking Changes:**
- Browser mode providers now require separate packages
- See [Migration Guide](https://vitest.dev/guide/migration.html) for detailed changes

**References:**
- [Vitest 4.0 Release](https://vitest.dev/blog/vitest-4)
- [Visual Regression Testing Guide](https://vitest.dev/guide/browser/visual-regression-testing)
- [Announcing Vitest 4.0](https://voidzero.dev/posts/announcing-vitest-4)

## UI Component Libraries

### shadcn/ui
**Version:** 3.5.0
**Purpose:** Accessible component primitives
**Official Docs:** [ui.shadcn.com](https://ui.shadcn.com/)

**Configuration:**
- Style: `new-york`
- Components path: `@/components/ui`
- Utils path: `@/lib/utils`
- Icon library: `lucide-react@0.555.0`
- CSS variables: Enabled with `neutral` base color

### Lucide React
**Version:** 0.555.0
**Purpose:** Icon library
**Official Docs:** [lucide.dev](https://lucide.dev/)

## Utility Libraries

### Class Utilities
- `clsx@2.1.1` - Conditional className construction
- `tailwind-merge@3.4.0` - Tailwind class merging without conflicts
- `class-variance-authority@0.7.1` - CVA for variant-based styling

**Combined Usage:** The `cn()` utility in [src/lib/utils.ts](src/lib/utils.ts) combines `clsx` and `tailwind-merge` for optimal className handling.

## Code Quality & Linting

### ESLint 9.39
**Configuration:** Flat config format
**Plugins:**
- `@eslint/js@9.39.1` - Core ESLint rules
- `typescript-eslint@8.46.4` - TypeScript linting
- `eslint-plugin-react-hooks@7.0.1` - React hooks rules
- `eslint-plugin-react-refresh@0.4.24` - React refresh rules
- `eslint-plugin-storybook@10.1.0` - Storybook-specific rules

### Prettier
**Version:** 3.7.1
**Purpose:** Code formatting

## Development Dependencies

### Build & Dev Tools
- `@vitejs/plugin-react@5.1.1` - Vite React plugin with Fast Refresh
- `postcss@8.5.6` - CSS transformations
- `sass@1.94.2` - Sass preprocessing

### Testing Infrastructure
- `playwright@1.57.0` - End-to-end browser testing
- `@testing-library/react@16.3.0` - React component testing utilities

### Type Definitions
- `@types/react@19.2.5` - React type definitions
- `@types/react-dom@19.2.3` - React DOM type definitions
- `@types/node@24.10.1` - Node.js type definitions

## Version Requirements

**Node.js:** 20.16+, 22.19+, or 24+ (required for Storybook 10 ESM-only)
**npm:** Latest stable version recommended

## Package Manager Configuration

The project uses npm with package overrides to ensure `rolldown-vite` is used consistently:

```json
"overrides": {
  "vite": "npm:rolldown-vite@7.2.5"
}
```

## Dependency Management Best Practices

1. **Version Pinning:** All dependencies use specific versions (with `^` for minor updates)
2. **Regular Updates:** Review dependency updates monthly, test thoroughly
3. **Security:** Run `npm audit` regularly to check for vulnerabilities
4. **Bundle Size:** Monitor bundle size impact when adding new dependencies
5. **Tree Shaking:** Prefer ESM packages for better tree shaking

## Performance Metrics

Based on the current dependency stack:
- **Build Time:** 3-16x faster production builds with Rolldown vs traditional Rollup/JavaScript bundlers
- **Memory Usage:** 100x reduction vs traditional bundlers (real-world examples: GitLab 2.5min → 40sec)
- **CSS Build Performance:**
  - Full builds: 5x faster than Tailwind v3
  - Incremental builds: 100x faster (measured in microseconds)
- **Dev Server:** Near-instant start with Vite's on-demand compilation
- **Install Size:** 29% smaller with Storybook 10 ESM-only distribution
- **Bundle Size:** Optimized through automatic tree shaking and unified Rolldown bundling

## Future Considerations

- **React 19.x:** Monitor patch releases for bug fixes. Note that Server Components bundler/framework APIs may break between minors (19.x) - pin version if building framework support
- **Vite/Rolldown:** Rolldown will eventually become default bundler for Vite. Track development for further performance optimizations and ecosystem compatibility
- **Tailwind CSS 4.x:** Watch for updates to modern CSS features, browser support expansion, and performance improvements
- **Storybook 10.x:** Follow releases for experimental features (new test syntax, RSC testing) and ecosystem improvements
- **Vitest 4.x:** Monitor updates for browser mode enhancements, visual regression testing improvements, and new assertion helpers
- **Browser Support:** Current stack requires modern browsers (Chrome 111+, Safari 16.4+, Firefox 128+). Consider compatibility mode if older browser support needed

## Migration Notes

### Key Breaking Changes to Be Aware Of:
1. **Storybook 10:** Requires Node 20.19+/22.12+/24+, ESM-only main configuration
2. **Tailwind v4:** No `@tailwind` directives (use `@import`), CSS modules need `@reference` imports
3. **Vitest 4:** Browser mode providers require separate packages
4. **React 19:** Server Components stable, but bundler APIs may break between minors

---

**Last Updated:** 2025-11-28
**Document Version:** 2.0.0
**Data Sources:** Official documentation via Context7 MCP
