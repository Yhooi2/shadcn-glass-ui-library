# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands Cheatsheet

```bash
# Development
npm run dev                      # Vite dev server
npm run storybook               # Storybook on :6006

# Testing
npx vitest                      # All tests
npx vitest --ui                 # Vitest UI
npx vitest --project=storybook  # Component tests only
npx vitest --project=visual     # Visual regression only
npx vitest ComponentName        # Specific component
npm run test:visual:update      # ⚠️ macOS only for local preview
gh workflow run update-screenshots.yml  # ✅ Actual update (Linux)

# Building
npm run build                   # Production build
npm run build-storybook        # Static Storybook

# Linting & Fixing
npm run lint                    # Check issues
npm run lint:fix               # Auto-fix ESLint issues
npm run typecheck              # TypeScript check without build

# Git & CI
git checkout origin/main -- src/components/__visual__/__screenshots__/  # Reset screenshots
gh workflow run update-screenshots.yml  # Update visual baselines
gh run list --workflow=update-screenshots.yml --limit 1  # Check status
```

## Project Overview

A modern glassmorphism UI component library built with:
- **React 19.2** - Latest stable release with production-ready Server Components, enabling ahead-of-time rendering in separate environments for build-time or request-time execution
- **TypeScript 5.9** - Strict type checking for enhanced developer experience
- **Tailwind CSS 4.1** - CSS-first configuration with 5x faster full builds, 100x faster incremental builds (microseconds), automatic content detection, and CSS variables by default
- **Storybook 10.1** - ESM-only component workshop (29% smaller install), typesafe CSF factories, enhanced tag filtering, and native Vitest integration for testing
- **Vite 7** (rolldown-vite) - Rust-based Rolldown bundler providing 3-16x faster builds, 100x memory reduction, and unified dev/prod bundling
- **Vitest 4.0** - Stable browser mode with visual regression testing via `toMatchScreenshot`, Playwright traces for CI debugging, and first-class viewport testing

See [DEPENDENCIES.md](DEPENDENCIES.md) for detailed dependency documentation.

## Common Tasks for AI

### Adding a new Glass component
1. Create component in `src/components/glass/ui/[name]-glass.tsx`
2. Add variant definition in `src/lib/variants/[name]-glass-variants.ts`
3. Add unit tests in `src/components/glass/ui/__tests__/[name]-glass.test.tsx`
4. Add visual tests in `src/components/__visual__/[name].visual.test.tsx`
5. Add story in `src/components/glass/ui/[name]-glass.stories.tsx`
6. Update screenshots via GH workflow: `gh workflow run update-screenshots.yml`
7. Update registry: `npm run generate:registry`

### Fixing a visual regression test
- **DO NOT** update screenshots locally on macOS
- **DO** use GitHub Actions: `gh workflow run update-screenshots.yml`
- Reference screenshots are Linux-only (ubuntu-latest)
- After workflow completes: `git pull origin main`

### Migrating a component to compound API
- See [docs/migration/modal-glass-compound-api.md](docs/migration/modal-glass-compound-api.md) for pattern
- Maintain backward compatibility via Object.assign
- Add both legacy and compound examples to Storybook
- Document migration in component JSDoc

### Adding a new theme
1. Add theme name to `Theme` type in `src/lib/theme-context.tsx`
2. Add CSS variables in `src/glass-theme.css` under `[data-theme="themename"]`
3. Add theme styles in `src/lib/themeStyles.ts`
4. Test all components with new theme in Storybook
5. Add visual tests for new theme

## File Organization Map

```
src/
├── components/
│   ├── glass/
│   │   ├── primitives/          # Reusable foundations
│   │   │   ├── style-utils.ts   # Constants (ICON_SIZES, BLUR_VALUES)
│   │   │   ├── touch-target.tsx # Touch-friendly wrapper
│   │   │   ├── form-field-wrapper.tsx
│   │   │   └── interactive-card.tsx
│   │   └── ui/                  # Glass components
│   │       ├── button-glass.tsx
│   │       ├── input-glass.tsx
│   │       └── __tests__/       # Unit tests
│   ├── __visual__/              # Visual regression tests
│   │   ├── components.visual.test.tsx
│   │   ├── componentshowcase.visual.test.tsx
│   │   ├── desktop.visual.test.tsx
│   │   └── __screenshots__/     # ⚠️ Linux-only (603 files)
│   ├── ComponentShowcase.tsx    # Core components demo
│   └── DesktopShowcase.tsx      # Full desktop analytics demo
├── lib/
│   ├── variants/                # CVA variant definitions
│   │   ├── button-glass-variants.ts
│   │   └── dropdown-content-styles.ts
│   ├── theme-context.tsx        # Theme provider
│   ├── themeStyles.ts           # Theme definitions
│   └── utils.ts                 # cn() and utilities
├── stories/                     # Storybook stories
└── glass-theme.css              # CSS variables
```

**Path resolution:**
- `@/` → `src/` (configured in tsconfig.json and vite.config.ts)
- Use absolute imports: `import { cn } from '@/lib/utils'`

## Component Anatomy Pattern

All Glass components follow this structure:

```tsx
// 1. Imports & Types
import * as React from 'react';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { componentVariants } from '@/lib/variants/component-variants';

// 2. Component Interface
interface ComponentProps
  extends React.ComponentPropsWithoutRef<'element'>,
          VariantProps<typeof componentVariants> {
  // Glass-specific props
}

// 3. Component Implementation
export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';
```

**Key patterns:**
- CVA (class-variance-authority) for variant management
- Separate variant files in `src/lib/variants/` for reusability
- `cn()` for className merging (always last parameter)
- `React.forwardRef` for ref forwarding
- TypeScript interfaces extending `React.ComponentPropsWithoutRef`
- `displayName` for better debugging

## Theme System Quick Reference

**Themes:** `glass` (dark glassmorphism) | `light` | `aurora` (gradient)

**Usage:**
```tsx
import { useTheme } from '@/lib/theme-context';

function Component() {
  const { theme, cycleTheme } = useTheme();

  return (
    <button onClick={cycleTheme}>
      Current: {theme}
    </button>
  );
}
```

**CSS Variables:**
Defined in `src/glass-theme.css`:
- `--blur-sm`, `--blur-md`, `--blur-lg` - Backdrop blur values
- `--glass-bg`, `--glass-border` - Theme-specific colors
- Theme-specific variables in `[data-theme="glass"]` blocks

**Adding theme support to new components:**
1. Use CSS variables: `bg-[var(--glass-bg)]` or Tailwind arbitrary values
2. Or use `themeStyles[theme]` from `src/lib/themeStyles.ts`
3. Test all 3 themes in Storybook
4. Add visual tests for theme switching

## Testing Strategy

### Quick Reference
```bash
npx vitest                       # All tests
npx vitest --project=storybook   # Component tests only
npx vitest --project=visual      # Visual regression only
npx vitest ComponentName         # Specific component
npm run test:visual:update       # ⚠️ DO NOT USE on macOS
```

### Test Types
| Type | Count | Location | Purpose |
|------|-------|----------|---------|
| Visual Regression | 582 | `src/components/__visual__/` | Screenshot comparison (Linux-only) |
| Unit Tests | 125 | `src/**/__tests__/` | Component logic |
| Storybook Tests | - | `src/**/*.stories.tsx` | Visual documentation + interaction tests |

### Visual Test Workflow
1. Make component changes
2. Run `npx vitest --project=visual` locally (expect failures on macOS)
3. Push changes to GitHub
4. Run `gh workflow run update-screenshots.yml`
5. Wait for workflow to update screenshots (Linux)
6. Pull changes: `git pull origin main`

**⚠️ CRITICAL:** Never commit screenshots from macOS. Reference images MUST be generated on Linux.

**Statistics:** 582 visual tests, 99.5% pass rate in CI

See [docs/visual-testing-guide.md](docs/visual-testing-guide.md) for complete guide.

## Architecture Decisions

### Why Vite 7 (rolldown-vite)?
- 3-16x faster builds vs traditional Rollup
- 100x memory reduction (critical for CI)
- Unified dev/prod bundling (no Webpack/Rollup split)
- Rust-based Rolldown bundler replaces esbuild + Rollup

### Why Compound Components for Modal/Tabs?
- Better composition flexibility (custom layouts)
- Improved tree-shaking (unused parts not bundled)
- More intuitive API for complex use cases
- Follows Radix UI best practices
- Easier to maintain and extend

### Why Visual Regression on Linux only?
- Pixel-perfect rendering consistency
- Font rendering differs between macOS/Linux
- GitHub Actions runs ubuntu-latest
- Prevents false positives from OS-specific rendering

### Why CVA for variants?
- Type-safe variant props
- Automatic TypeScript inference
- Better bundle size (no runtime logic)
- Consistent API across all components

### Why asChild pattern?
- Polymorphic components without wrapper divs
- Better accessibility (semantic HTML)
- Radix UI Slot integration
- No style conflicts from nested components

## AI Assistant Guidelines

### DO
✅ Read component code before suggesting changes
✅ Use `gh workflow run update-screenshots.yml` for visual updates
✅ Maintain backward compatibility for public APIs
✅ Add both unit and visual tests for new components
✅ Follow shadcn/ui naming conventions (e.g., `variant`, not `type`)
✅ Use TypeScript strict mode (no `any` types)
✅ Test all 3 themes (glass, light, aurora)
✅ Use `cn()` for className merging
✅ Add accessibility attributes (ARIA labels, roles)
✅ Document migration paths for breaking changes

### DO NOT
❌ Commit screenshots from macOS
❌ Use `variant="danger"` (removed in v1.0.0, use `destructive`)
❌ Use `type` prop on AlertGlass/NotificationGlass (use `variant`)
❌ Modify package.json overrides without understanding rolldown-vite requirements
❌ Add new dependencies without checking compatibility with Vite 7 + Storybook 10
❌ Delete "unused" CSS variables (they may be theme-specific)
❌ Create new files when editing existing ones is sufficient
❌ Use `any` types in TypeScript (strict mode enabled)
❌ Skip accessibility testing (Storybook a11y addon enforced)
❌ Hard-code colors/spacing (use Tailwind classes or CSS variables)
❌ Import from `@/components/ui` (use `@/components/glass/ui` for Glass variants)

## Troubleshooting

### Visual tests fail on macOS
**Expected behavior.** macOS font rendering differs from Linux.
**Solution:** Use GitHub Actions to update screenshots: `gh workflow run update-screenshots.yml`

### Stale visual test baselines after merge
**Cause:** Branch screenshots conflict with main
**Solution:** `git checkout origin/main -- src/components/__visual__/__screenshots__/`

### TypeScript errors after npm install
**Cause:** Stale type cache
**Solution:** `rm -rf node_modules/.vite && npm run build:types`

### Storybook fails to start
**Cause:** Node.js version < 20.16
**Solution:** Update to Node.js 20.16+, 22.19+, or 24+
**Check version:** `node --version`

### Component not appearing in Storybook
**Checklist:**
- Story file matches pattern: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Component exported as default or named export
- Meta object has `title` field
- Run `npm run storybook` (not `npm run dev`)
- Check browser console for errors

### "Module not found" errors in Storybook
**Cause:** Path alias misconfiguration
**Check:**
1. `tsconfig.json` has `"@/*": ["./src/*"]`
2. `.storybook/main.ts` has matching viteFinal config
3. Run `npm run storybook` (rebuilds aliases)

### Component variants not applying
**Checklist:**
- Variant definition uses CVA (class-variance-authority)
- className prop uses `cn(variants({ ... }), className)`
- CSS variables defined in `src/glass-theme.css`
- Theme provider wraps app in `src/main.tsx`

### Performance regression after adding component
**Profile:** Use React DevTools Profiler
**Check:**
1. Unnecessary re-renders (missing React.memo?)
2. Large bundle impact (check vite bundle analyzer)
3. CSS-in-JS vs Tailwind (prefer Tailwind for Glass UI)
4. Heavy computations in render (use useMemo)

### Linting errors after editing
**Quick fix:** `npm run lint:fix`
**Manual:** Check ESLint output for specific violations
**Common issues:**
- Missing dependencies in useEffect
- Unused variables
- Missing TypeScript types

## Glass Components Structure

### Core Components (16)
Basic UI primitives. See [src/components/glass/ui/](src/components/glass/ui/) for complete list:
- ButtonGlass, InputGlass, GlassCard, ProgressGlass, BadgeGlass, AlertGlass
- ToggleGlass, CheckboxGlass, TabsGlass, TooltipGlass, SliderGlass
- SkeletonGlass, ModalGlass, DropdownGlass, AvatarGlass, NotificationGlass

### Atomic Components (4)
Single-purpose components with specialized functionality:
- StatusIndicatorGlass - Status dots with glow effect
- SegmentedControlGlass - Segmented button group
- RainbowProgressGlass - Rainbow gradient progress bar
- LanguageBarGlass - Language proficiency bar with legend

### Composite Components (5)
Multi-element widgets combining core components:
- MetricCardGlass - Metric display card with progress
- ProfileAvatarGlass - Large avatar with glow animation
- FlagAlertGlass - Warning/danger flag alert
- YearCardGlass - Year card for career timeline
- AICardGlass - AI summary card with feature list

### Section Components (6)
Full-featured page sections (GitHub Analytics pattern):
- HeaderNavGlass - Navigation header with search and theme toggle
- TrustScoreCardGlass - Trust score display with metrics
- ProfileHeaderGlass - User profile header with avatar, stats, languages
- CareerStatsGlass - Career statistics with expandable year cards
- FlagsSectionGlass - Expandable flags/warnings section
- RepoCardGlass - Repository card with expandable details

### Blocks (6)
Ready-to-use demo sections (shadcn/ui pattern):
- ButtonsBlock - Button variants, sizes, and states demo
- FormElementsBlock - Input, Slider, Toggle, Checkbox demos
- ProgressBlock - Progress bars, RainbowProgress, Skeletons
- AvatarGalleryBlock - Avatar sizes and status indicators
- BadgesBlock - Badge variants and tooltips
- NotificationsBlock - Notifications and alerts

### Demo Pages
- [ComponentShowcase.tsx](src/components/ComponentShowcase.tsx) - Core components demo (uses Blocks)
- [DesktopShowcase.tsx](src/components/DesktopShowcase.tsx) - Full desktop analytics app (uses Blocks + Sections)

### Themes
- **glass** - Dark glassmorphism (default)
- **light** - Light mode with subtle glass effects
- **aurora** - Gradient theme with aurora effects

**Theme system:** `src/lib/theme-context.tsx` (ThemeProvider, useTheme, cycleTheme)
**Theme styles:** `src/lib/themeStyles.ts`
**CSS variables:** `src/glass-theme.css`

## Phase 3 Refactoring (Weeks 1-5, Complete)

### Primitives & Reusable Components
`src/components/glass/primitives/` - Foundation components:
- `style-utils.ts` - Centralized style constants (ICON_SIZES, BLUR_VALUES, TRANSITIONS)
- `touch-target.tsx` - Touch-friendly wrapper (44/48px minimum, Apple HIG compliance)
- `form-field-wrapper.tsx` - Unified form field structure (label, error, success states)
- `interactive-card.tsx` - Hover animations + glass effects for card components

**Shared utilities:**
- `src/lib/variants/dropdown-content-styles.ts` - Unified dropdown styling utilities
- Unit tests: `__tests__/` directories (125 tests, 100% pass rate)

### asChild Pattern (Week 4)
ButtonGlass, AvatarGlass, GlassCard support polymorphic rendering via Radix UI Slot:
```tsx
<ButtonGlass asChild>
  <Link href="/">Home</Link>
</ButtonGlass>
```

### Compound Components (Week 4)

#### ModalGlass (9 sub-components)
- `ModalGlass.Root` - Context provider with open/close state
- `ModalGlass.Overlay` - Backdrop with blur and click-to-close
- `ModalGlass.Content` - Main content container
- `ModalGlass.Header`, `Body`, `Footer` - Layout components
- `ModalGlass.Title`, `Description`, `Close` - Content components
- Legacy API preserved via Object.assign for backward compatibility

#### TabsGlass (4 sub-components)
- `TabsGlass.Root` - Context provider with value/onValueChange
- `TabsGlass.List` - Visual container for tab triggers
- `TabsGlass.Trigger` - Individual tab button with active state
- `TabsGlass.Content` - Content panel that shows when tab is active
- Legacy API preserved for backward compatibility

### Testing (Week 5)
- Visual regression: 579/582 passing (99.5%) - See `docs/visual-tests-audit.md`
- Unit tests: 125 tests across primitives and utilities
- Storybook: 8 new compound component stories demonstrating advanced usage

### API Compatibility
- 100% backward compatibility maintained
- Both legacy and compound APIs available simultaneously
- Migration path documented in component JSDoc

## shadcn/ui API Compatibility

The library maintains full compatibility with shadcn/ui component APIs while providing extended Glass UI variants.

### ⚠️ Breaking Changes (v1.0.0)

**IMPORTANT:** The following legacy APIs have been removed in v1.0.0. Update your code before upgrading.

#### 1. ButtonGlass
- **Removed:** `variant="danger"`
- **Replaced with:** `variant="destructive"` (shadcn/ui standard)
- **Migration:** Replace all `danger` → `destructive`

```tsx
// ❌ Removed in v1.0.0
<ButtonGlass variant="danger">Delete</ButtonGlass>

// ✅ Current API
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

#### 2. AlertGlass
- **Removed:** `type` prop
- **Replaced with:** `variant` prop
- **Migration:**
  - `type="info"` → `variant="default"`
  - `type="error"` → `variant="destructive"`
  - `type="success"` → `variant="success"`
  - `type="warning"` → `variant="warning"`

```tsx
// ❌ Removed in v1.0.0
<AlertGlass type="error" title="Error">Message</AlertGlass>

// ✅ Current API
<AlertGlass variant="destructive" title="Error">Message</AlertGlass>
```

#### 3. NotificationGlass
- **Removed:** `type` prop
- **Replaced with:** `variant` prop
- **Same mapping as AlertGlass** (see above)

```tsx
// ❌ Removed in v1.0.0
<NotificationGlass type="info" title="Info" message="..." onClose={() => {}} />

// ✅ Current API
<NotificationGlass variant="default" title="Info" message="..." onClose={() => {}} />
```

#### 4. SelectGlass (Removed)
- **Status:** Removed in v1.0.0
- **Migration:** Use `ComboBoxGlass` instead

```tsx
// ❌ Removed in v1.0.0
<SelectGlass options={...} value={...} onChange={...} />

// ✅ Use ComboBoxGlass
<ComboBoxGlass options={...} value={...} onChange={...} />
```

**Migration Guide:** [docs/migration/select-to-combobox.md](docs/migration/select-to-combobox.md)

### Current Component APIs

#### BadgeGlass
- **shadcn/ui variants:** `default`, `secondary`, `destructive`, `outline`
- **Extended variants:** `success`, `warning`, `info`

```tsx
// shadcn/ui compatible
<BadgeGlass variant="destructive">Error</BadgeGlass>
<BadgeGlass variant="outline">Outlined</BadgeGlass>

// Glass UI extended
<BadgeGlass variant="success">Success</BadgeGlass>
```

#### AlertGlass (Updated in v1.0.0)
- **shadcn/ui variants:** `default`, `destructive`
- **Extended variants:** `success`, `warning`
- **Prop name:** `variant` (not `type`)

```tsx
// shadcn/ui compatible
<AlertGlass variant="destructive" title="Error">Something went wrong</AlertGlass>

// Glass UI extended
<AlertGlass variant="success" title="Success">Operation completed</AlertGlass>
```

#### NotificationGlass (Updated in v1.0.0)
- **shadcn/ui variants:** `default`, `destructive`
- **Extended variants:** `success`, `warning`
- **Prop name:** `variant` (not `type`)

```tsx
<NotificationGlass
  variant="destructive"
  title="Error"
  message="Operation failed"
  onClose={() => {}}
/>
```

### Migration Resources

- **[CHANGELOG.md](CHANGELOG.md)** - Complete version history
- **[docs/migration/select-to-combobox.md](docs/migration/select-to-combobox.md)** - SelectGlass → ComboBoxGlass
- **[docs/migration/modal-glass-compound-api.md](docs/migration/modal-glass-compound-api.md)** - ModalGlass compound API
- **[docs/migration/tabs-glass-compound-api.md](docs/migration/tabs-glass-compound-api.md)** - TabsGlass compound API

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)

## shadcn/ui Configuration

- Style: `new-york`
- Components: `@/components/ui` (standard shadcn/ui)
- Glass Components: `@/components/glass/ui` (Glass UI variants)
- Utilities: `@/lib/utils` (contains `cn()` function for class merging)
- Icons: `lucide-react`
- CSS variables enabled with `neutral` base color

### Adding shadcn/ui Components

```bash
npx shadcn add <component-name>
```

Components will be added to `src/components/ui/`. To create Glass variants, copy to `src/components/glass/ui/` and apply glass styling.

## Storybook

- Stories location: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Docs: `src/**/*.mdx`
- Addons: a11y, docs, vitest, chromatic
- A11y tests configured as `'todo'` (show violations but don't fail CI)
- Port: 6006 (default)

## Key Files

- `src/lib/utils.ts` - Utility functions (`cn` for className merging with clsx + tailwind-merge)
- `src/lib/theme-context.tsx` - Theme provider and hooks
- `src/lib/themeStyles.ts` - Theme-specific style definitions
- `src/glass-theme.css` - CSS variables and animations
- `components.json` - shadcn/ui configuration (new-york style, neutral base)
- `.storybook/` - Storybook configuration with a11y, docs, vitest addons
- `vite.config.ts` - Vite + Vitest configuration with rolldown-vite
- `package.json` - Dependencies and scripts (see DEPENDENCIES.md for details)

## Technical Requirements

- **Node.js:** 20.16+, 22.19+, or 24+ (required for Storybook 10 ESM-only)
- **Package Manager:** npm (with overrides for rolldown-vite)

## Performance Characteristics

Thanks to the modern stack:
- **Build Speed:** 3-16x faster production builds with Rolldown vs traditional Rollup
- **Memory Usage:** 100x reduction vs traditional JavaScript bundlers (e.g., GitLab: 2.5min → 40sec)
- **Dev Server:** Near-instant start with Vite's on-demand compilation
- **CSS Performance:**
  - Full builds: 5x faster than Tailwind v3
  - Incremental builds: 100x faster (measured in microseconds)
- **Bundle Unification:** Single Rolldown bundler for both dev prebundling and production builds
- **Install Size:** 29% smaller Storybook 10 install vs v9 (on top of 50% savings from v9)

## Code Quality Standards

- **TypeScript:** Strict mode enabled, no `any` types
- **Accessibility:** WCAG 2.1 AA compliance (enforced via Storybook a11y addon)
- **Testing:** Minimum 90% coverage target
- **Linting:** ESLint with React hooks, TypeScript, and Storybook rules
- **Formatting:** Prettier 3.7.1
