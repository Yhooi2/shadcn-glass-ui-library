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
