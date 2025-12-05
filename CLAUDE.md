# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern glassmorphism UI component library built with:
- **React 19.2** - Latest stable release with production-ready Server Components, enabling ahead-of-time rendering in separate environments for build-time or request-time execution
- **TypeScript 5.9** - Strict type checking for enhanced developer experience
- **Tailwind CSS 4.1** - CSS-first configuration with 5x faster full builds, 100x faster incremental builds (microseconds), automatic content detection, and CSS variables by default
- **Storybook 10.1** - ESM-only component workshop (29% smaller install), typesafe CSF factories, enhanced tag filtering, and native Vitest integration for testing
- **Vite 7** (rolldown-vite) - Rust-based Rolldown bundler providing 3-16x faster builds, 100x memory reduction, and unified dev/prod bundling
- **Vitest 4.0** - Stable browser mode with visual regression testing via `toMatchScreenshot`, Playwright traces for CI debugging, and first-class viewport testing

See [DEPENDENCIES.md](DEPENDENCIES.md) for detailed dependency documentation.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint
npm run storybook    # Start Storybook on port 6006
npm run build-storybook  # Build static Storybook
```

### Testing

Tests run via Vitest with Storybook integration using Playwright browser:

```bash
npx vitest                       # Run all tests
npx vitest --project=storybook   # Run Storybook component tests only
npx vitest --project=visual      # Run visual regression tests only
npx vitest ComponentName         # Run specific test
npm run test:visual:update       # Update visual test baselines
```

### Visual Regression Tests

Visual tests are located in `src/components/__visual__/`:
- `components.visual.test.tsx` - Individual component visual tests
- `showcase.visual.test.tsx` - ComponentShowcase demo page tests (55 tests)
- `desktop.visual.test.tsx` - DesktopShowcase demo page tests (80+ tests)

Screenshots are stored in `__screenshots__/` directories. Tests run on:
- Full page screenshots for glass/light/aurora themes
- Section-by-section tests (Buttons, Inputs, Toggles, etc.)
- Interactive component states (Modal, Dropdown, Tabs, Toggle, Checkbox, etc.)
- Theme switching cycle

GitHub Actions runs visual tests on every push/PR to main.

## Architecture

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)

### shadcn/ui Configuration

- Style: `new-york`
- Components: `@/components/ui`
- Utilities: `@/lib/utils` (contains `cn()` function for class merging)
- Icons: `lucide-react`
- CSS variables enabled with `neutral` base color

### Adding Components

```bash
npx shadcn add <component-name>
```

### Storybook

- Stories location: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Docs: `src/**/*.mdx`
- Addons: a11y, docs, vitest, chromatic
- A11y tests configured as `'todo'` (show violations but don't fail CI)

### Glass Components

Glassmorphism UI components with multi-theme support:

**Core Components** (16):
- ButtonGlass, InputGlass, GlassCard, ProgressGlass, BadgeGlass, AlertGlass
- ToggleGlass, CheckboxGlass, TabsGlass, TooltipGlass, SliderGlass
- SkeletonGlass, ModalGlass, DropdownGlass, AvatarGlass, NotificationGlass

**Atomic Components** (4):
- StatusIndicatorGlass - Status dots with glow effect
- SegmentedControlGlass - Segmented button group
- RainbowProgressGlass - Rainbow gradient progress bar
- LanguageBarGlass - Language proficiency bar with legend

**Composite Components** (5):
- MetricCardGlass - Metric display card with progress
- ProfileAvatarGlass - Large avatar with glow animation
- FlagAlertGlass - Warning/danger flag alert
- YearCardGlass - Year card for career timeline
- AICardGlass - AI summary card with feature list

**Section Components** (6):
- HeaderNavGlass - Navigation header with search and theme toggle
- TrustScoreCardGlass - Trust score display with metrics
- ProfileHeaderGlass - User profile header with avatar, stats, languages
- CareerStatsGlass - Career statistics with expandable year cards
- FlagsSectionGlass - Expandable flags/warnings section
- RepoCardGlass - Repository card with expandable details

**Blocks** (6) - Ready-to-use sections (shadcn/ui pattern):
- ButtonsBlock - Button variants, sizes, and states demo
- FormElementsBlock - Input, Slider, Toggle, Checkbox demos
- ProgressBlock - Progress bars, RainbowProgress, Skeletons
- AvatarGalleryBlock - Avatar sizes and status indicators
- BadgesBlock - Badge variants and tooltips
- NotificationsBlock - Notifications and alerts

**Demo Pages**:
- `src/components/ComponentShowcase.tsx` - Core components demo (uses Blocks)
- `src/components/DesktopShowcase.tsx` - GitHub Analytics desktop demo (uses Blocks + Sections)

**Themes**: glass (dark glassmorphism), light, aurora (gradient)
**Theme system**: `src/lib/theme-context.tsx` (ThemeProvider, useTheme, cycleTheme)
**Theme styles**: `src/lib/themeStyles.ts`
**CSS variables**: `src/glass-theme.css`

### Phase 3 Refactoring (Weeks 1-5, Complete)

**Primitives & Reusable Components:**
- `src/components/glass/primitives/` - Foundation components:
  - `style-utils.ts` - Centralized style constants (ICON_SIZES, BLUR_VALUES, TRANSITIONS)
  - `touch-target.tsx` - Touch-friendly wrapper (44/48px minimum, Apple HIG compliance)
  - `form-field-wrapper.tsx` - Unified form field structure (label, error, success states)
  - `interactive-card.tsx` - Hover animations + glass effects for card components
- `src/lib/variants/dropdown-content-styles.ts` - Unified dropdown styling utilities
- Unit tests: `__tests__/` directories (125 tests, 100% pass rate)

**asChild Pattern (Week 4):**
- ButtonGlass, AvatarGlass, GlassCard - Support polymorphic rendering via Radix UI Slot
- Usage: `<ButtonGlass asChild><Link href="/">Home</Link></ButtonGlass>`

**Compound Components (Week 4):**
- **ModalGlass** - 9 sub-components:
  - `ModalGlass.Root` - Context provider with open/close state
  - `ModalGlass.Overlay` - Backdrop with blur and click-to-close
  - `ModalGlass.Content` - Main content container
  - `ModalGlass.Header`, `Body`, `Footer` - Layout components
  - `ModalGlass.Title`, `Description`, `Close` - Content components
  - Legacy API preserved via Object.assign for backward compatibility

- **TabsGlass** - 4 sub-components:
  - `TabsGlass.Root` - Context provider with value/onValueChange
  - `TabsGlass.List` - Visual container for tab triggers
  - `TabsGlass.Trigger` - Individual tab button with active state
  - `TabsGlass.Content` - Content panel that shows when tab is active
  - Legacy API preserved for backward compatibility

**Testing (Week 5):**
- Visual regression: 579/582 passing (99.5%) - See `docs/visual-tests-audit.md`
- Unit tests: 125 tests across primitives and utilities
- Storybook: 8 new compound component stories demonstrating advanced usage

**API Compatibility:**
- 100% backward compatibility maintained
- Both legacy and compound APIs available simultaneously
- Migration path documented in component JSDoc

### Key Files

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
