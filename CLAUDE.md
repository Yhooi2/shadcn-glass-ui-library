# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

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
./scripts/clean-local-screenshots.sh  # Clean local screenshots (macOS/Windows)
git checkout origin/main -- src/components/__visual__/__screenshots__/  # Reset screenshots
gh workflow run update-screenshots.yml  # Update visual baselines
gh run list --workflow=update-screenshots.yml --limit 1  # Check status

# Committing (pre-commit hooks run automatically)
git add .                        # Stage changes
git commit -m "feat: message"    # Husky runs lint-staged + screenshot check
# Pre-commit hooks:
#   1. Blocks screenshot commits (use GitHub Actions instead)
#   2. Runs ESLint --max-warnings=0 on staged TS/TSX files
#   3. Runs Prettier on all staged files
# Commit message triggers auto-release:
#   feat: -> minor version bump (1.0.0 -> 1.1.0)
#   fix:  -> patch version bump (1.0.0 -> 1.0.1)
#   BREAKING CHANGE or !: -> major version bump (1.0.0 -> 2.0.0)

# Token System (v2.0.0+)
npm run test:compliance:run      # Verify token usage
grep -r "oklch(" src/styles/themes/  # Find hardcoded OKLCH (should be 0)
```

## Project Overview

A modern glassmorphism UI component library built with:

- **React 19.2** - Latest stable release with production-ready Server Components, enabling
  ahead-of-time rendering in separate environments for build-time or request-time execution
- **TypeScript 5.9** - Strict type checking for enhanced developer experience
- **Tailwind CSS 4.1** - CSS-first configuration with 5x faster full builds, 100x faster incremental
  builds (microseconds), automatic content detection, and CSS variables by default
- **Storybook 10.1** - ESM-only component workshop (29% smaller install), typesafe CSF factories,
  enhanced tag filtering, and native Vitest integration for testing
- **Vite 7** (rolldown-vite) - Rust-based Rolldown bundler providing 3-16x faster builds, 100x
  memory reduction, and unified dev/prod bundling
- **Vitest 4.0** - Stable browser mode with visual regression testing via `toMatchScreenshot`,
  Playwright traces for CI debugging, and first-class viewport testing

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

- See [docs/migration/modal-glass-compound-api.md](docs/migration/modal-glass-compound-api.md) for
  pattern
- Maintain backward compatibility via Object.assign
- Add both legacy and compound examples to Storybook
- Document migration in component JSDoc

### Adding a new dropdown component

- **Read first:** [docs/DROPDOWN_ARCHITECTURE.md](docs/DROPDOWN_ARCHITECTURE.md)
- Use Radix UI primitives (`DropdownMenu` or `Popover`)
- Import utilities from `src/lib/variants/dropdown-content-styles.ts`:
  - `getDropdownContentStyles()` - Glass surface styling
  - `dropdownContentClasses` - Container classes
  - `getDropdownItemClasses()` - Menu item classes
- Use CSS variables: `--dropdown-bg`, `--dropdown-border`, `--dropdown-glow`
- Test component-specific logic, NOT Radix UI behavior

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
│   ├── demos/                   # Demo pages + stories (colocated)
│   │   ├── ComponentShowcase.tsx
│   │   ├── DesktopShowcase.tsx
│   │   ├── MobileShowcase.tsx
│   │   ├── AnimatedBackground.tsx
│   │   └── *.stories.tsx
│   ├── glass/
│   │   ├── primitives/          # Reusable foundations (no stories)
│   │   │   ├── style-utils.ts   # Constants (ICON_SIZES, BLUR_VALUES)
│   │   │   ├── touch-target.tsx
│   │   │   └── form-field-wrapper.tsx
│   │   ├── ui/                  # Core components + stories (colocated)
│   │   │   ├── button-glass.tsx + button-glass.stories.tsx
│   │   │   ├── input-glass.tsx + input-glass.stories.tsx
│   │   │   └── __tests__/       # Unit tests
│   │   ├── atomic/              # Atomic components + stories
│   │   ├── composite/           # Composite components + stories
│   │   ├── specialized/         # Specialized components + stories
│   │   └── sections/            # Section components + stories
│   ├── blocks/                  # Ready-to-use blocks + stories
│   └── __visual__/              # Visual regression tests
│       └── __screenshots__/     # ⚠️ Linux-only (603 files)
├── lib/
│   ├── variants/                # CVA variant definitions
│   │   ├── button-glass-variants.ts
│   │   └── dropdown-content-styles.ts
│   ├── theme-context.tsx        # Theme provider
│   ├── themeStyles.ts           # Theme definitions
│   └── utils.ts                 # cn() and utilities
├── stories/use-cases/           # Real-world example stories
└── glass-theme.css              # CSS variables
```

### Storybook Categories

```
Docs/
  Introduction, Getting Started, Design System

Components/
  Core/           # ButtonGlass, InputGlass, GlassCard, AvatarGlass, etc.
  Feedback/       # AlertGlass, NotificationGlass, TooltipGlass, ProgressGlass
  Navigation/     # TabsGlass, StepperGlass, DropdownGlass
  Overlay/        # ModalGlass, PopoverGlass, ComboBoxGlass
  Composite/      # MetricCardGlass, AICardGlass, TrustScoreCardGlass
  Atomic/         # InsightCardGlass, SortDropdownGlass
  Sections/       # HeaderNavGlass, ProfileHeaderGlass, CareerStatsGlass
  Visualization/  # SparklineGlass
  Blocks/         # FormElements, Progress, AvatarGallery, Badges

Examples/
  Demos/          # ComponentShowcase, DesktopShowcase, MobileShowcase
  Use Cases/      # Dashboard, UserProfile, DataTable, FormWizard

Hooks/            # useWallpaperTint
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
  extends React.ComponentPropsWithoutRef<'element'>, VariantProps<typeof componentVariants> {
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

  return <button onClick={cycleTheme}>Current: {theme}</button>;
}
```

**CSS Variables:** Defined in `src/glass-theme.css`:

- `--blur-sm`, `--blur-md`, `--blur-lg` - Backdrop blur values
- `--glass-bg`, `--glass-border` - Theme-specific colors
- Theme-specific variables in `[data-theme="glass"]` blocks

**Adding theme support to new components:**

1. Use CSS variables: `bg-[var(--glass-bg)]` or Tailwind arbitrary values
2. Or use `themeStyles[theme]` from `src/lib/themeStyles.ts`
3. Test all 3 themes in Storybook
4. Add visual tests for theme switching

### Tailwind CSS v4: CSS Variable Pattern

**IMPORTANT:** In Tailwind v4, ALL values (base AND derived) must be in `:root`.

```css
/* ❌ WRONG: Tailwind's @layer theme overwrites @theme values */
@theme {
  --radius: 0.75rem;
  --radius-xl: calc(var(--radius) + 4px);
}

/* ✅ CORRECT: ALL values in :root, @theme only references */
:root {
  --radius: 1rem; /* Base */
  --radius-xl: calc(var(--radius) + 4px); /* Derived - ALSO in :root */
}

@theme {
  --radius-xl: var(--radius-xl); /* Registration only */
}
```

**Why:** `:root` has higher specificity than Tailwind's `@layer theme`, which generates defaults
like `--radius-xl: 0.75rem`. Putting derived values in `@theme` gets overwritten.

See [docs/TOKEN_ARCHITECTURE.md](docs/TOKEN_ARCHITECTURE.md#tailwind-css-v4-base-vs-derived-values)
for details.

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

| Type              | Count | Location                     | Purpose                                  |
| ----------------- | ----- | ---------------------------- | ---------------------------------------- |
| Visual Regression | 582   | `src/components/__visual__/` | Screenshot comparison (Linux-only)       |
| Unit Tests        | 125   | `src/**/__tests__/`          | Component logic                          |
| Storybook Tests   | -     | `src/**/*.stories.tsx`       | Visual documentation + interaction tests |

### Visual Test Workflow

1. Make component changes
2. Run `npx vitest --project=visual` locally (expect failures on macOS)
3. Push changes to GitHub
4. Run `gh workflow run update-screenshots.yml`
5. Wait for workflow to update screenshots (Linux)
6. Pull changes: `git pull origin main`

**⚠️ CRITICAL:** Never commit screenshots from macOS. Reference images MUST be generated on Linux.

**Statistics:** 802 visual tests, 99.5% pass rate in CI

See [docs/visual-testing-guide.md](docs/visual-testing-guide.md) for complete guide.

## Token System (v2.0.0+)

### 3-Layer Architecture

```
Layer 3: Component Tokens  (--btn-primary-bg, --input-border, --modal-bg)
             ↓ references
Layer 2: Semantic Tokens   (--semantic-primary, --semantic-surface, --semantic-text)
             ↓ references
Layer 1: Primitive Tokens  (--oklch-purple-500, --oklch-white-8, --oklch-slate-800)
```

**Purpose:**

- **Layer 1 (Primitives)**: Single source of truth for all OKLCH colors (207 tokens)
- **Layer 2 (Semantic)**: Role-based tokens that describe usage, not appearance
- **Layer 3 (Component)**: Component-specific tokens that reference semantic tokens

### Quick Reference

- **207 primitive tokens** in `src/styles/tokens/oklch-primitives.css`
- **Zero hardcoded OKLCH** in theme files (glass.css, light.css, aurora.css)
- **15-minute theme creation** (was 2-3 hours before refactor)
- **296+ CSS variables per theme** with complete semantic coverage

### Usage Examples

```css
/* ✅ DO: Use semantic tokens in components */
.my-component {
  background: var(--semantic-surface);
  color: var(--semantic-text);
  border: 1px solid var(--semantic-border);
}

.my-component:hover {
  background: var(--semantic-surface-elevated);
  border-color: var(--semantic-primary);
}

/* ✅ DO: Use primitive tokens for specific effects */
.my-component-glow {
  box-shadow: 0 0 20px var(--oklch-purple-500-40);
}

/* ❌ DON'T: Hardcode OKLCH values */
.my-component {
  background: oklch(66.6% 0.159 303); /* NEVER do this */
}
```

### Breaking Changes (v2.0.0)

**Removed CSS Variables:**

| Removed (v1.x)       | Replacement (v2.0+)      | Semantic Meaning |
| -------------------- | ------------------------ | ---------------- |
| `--metric-emerald-*` | `--metric-success-*`     | Success states   |
| `--metric-amber-*`   | `--metric-warning-*`     | Warning states   |
| `--metric-blue-*`    | `--metric-default-*`     | Neutral/default  |
| `--metric-red-*`     | `--metric-destructive-*` | Error/danger     |

**Total removed:** 16 variables (4 color families × 4 properties: -bg, -text, -border, -glow)

**Why this change?**

- Aligns with shadcn/ui naming conventions (success, warning, destructive)
- Improves semantic clarity (color names → semantic roles)
- Consistent with component variant props (AlertGlass, BadgeGlass, ButtonGlass)
- Part of 3-layer token architecture migration

**Migration Guide:**
[docs/migration/CSS_VARIABLES_MIGRATION_2.0.md](docs/migration/CSS_VARIABLES_MIGRATION_2.0.md)

**Automated Migration:**

```bash
# macOS/Linux
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +
```

### Creating New Themes

**Before (v1.x):** 2-3 hours, 500+ lines of hardcoded OKLCH values **After (v2.0.0):** 10-15
minutes, ~50 lines of semantic mappings

```css
/* Example: Creating "neon" theme */
[data-theme='neon'] {
  /* Define ~15 semantic tokens */
  --semantic-primary: var(--oklch-cyan-400);
  --semantic-surface: var(--oklch-black-90);
  --semantic-text: var(--oklch-white-95);
  /* ... ~12 more tokens */

  /* Component tokens inherited automatically! */
}
```

See [THEME_CREATION_GUIDE.md](docs/THEME_CREATION_GUIDE.md) for step-by-step tutorial.

### Documentation

- [TOKEN_ARCHITECTURE.md](docs/TOKEN_ARCHITECTURE.md) - Complete 3-layer system guide (365 lines)
- [THEME_CREATION_GUIDE.md](docs/THEME_CREATION_GUIDE.md) - Create themes in 15 minutes (455 lines)
- [CSS_VARIABLES_AUDIT.md](docs/CSS_VARIABLES_AUDIT.md) - Complete audit of 296+ variables per theme
- [PRIMITIVE_MAPPING.md](docs/PRIMITIVE_MAPPING.md) - OKLCH primitive reference

### Benefits

1. **Single Source of Truth**: Change a color once in primitives, affects all themes
2. **Rapid Theme Creation**: 90% faster (2-3 hours → 10-15 minutes)
3. **Type Safety**: Semantic names prevent confusion
4. **Maintainability**: Zero hardcoded values, 100% CSS variable coverage
5. **Consistency**: All components using `--semantic-primary` stay in sync

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

✅ Read component code before suggesting changes ✅ Use `gh workflow run update-screenshots.yml` for
visual updates ✅ Maintain backward compatibility for public APIs ✅ Add both unit and visual tests
for new components ✅ Follow shadcn/ui naming conventions (e.g., `variant`, not `type`) ✅ Use
TypeScript strict mode (no `any` types) ✅ Test all 3 themes (glass, light, aurora) ✅ Use `cn()`
for className merging ✅ Add accessibility attributes (ARIA labels, roles) ✅ Document migration
paths for breaking changes

### DO NOT

❌ Commit screenshots from macOS ❌ Use `variant="danger"` (removed in v1.0.0, use `destructive`) ❌
Use `type` prop on AlertGlass/NotificationGlass (use `variant`) ❌ Modify package.json overrides
without understanding rolldown-vite requirements ❌ Add new dependencies without checking
compatibility with Vite 7 + Storybook 10 ❌ Delete "unused" CSS variables (they may be
theme-specific) ❌ Create new files when editing existing ones is sufficient ❌ Use `any` types in
TypeScript (strict mode enabled) ❌ Skip accessibility testing (Storybook a11y addon enforced) ❌
Hard-code colors/spacing (use Tailwind classes or CSS variables) ❌ Import from `@/components/ui`
(use `@/components/glass/ui` for Glass variants)

## Troubleshooting

### Visual tests fail on macOS

**Expected behavior.** macOS font rendering differs from Linux. **Solution:** Use GitHub Actions to
update screenshots: `gh workflow run update-screenshots.yml`

### Stale visual test baselines after merge

**Cause:** Branch screenshots conflict with main **Solution:**
`git checkout origin/main -- src/components/__visual__/__screenshots__/`

### TypeScript errors after npm install

**Cause:** Stale type cache **Solution:** `rm -rf node_modules/.vite && npm run build:types`

### Storybook fails to start

**Cause:** Node.js version < 20.16 **Solution:** Update to Node.js 20.16+, 22.19+, or 24+ **Check
version:** `node --version`

### Component not appearing in Storybook

**Checklist:**

- Story file matches pattern: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Component exported as default or named export
- Meta object has `title` field
- Run `npm run storybook` (not `npm run dev`)
- Check browser console for errors

### "Module not found" errors in Storybook

**Cause:** Path alias misconfiguration **Check:**

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

**Profile:** Use React DevTools Profiler **Check:**

1. Unnecessary re-renders (missing React.memo?)
2. Large bundle impact (check vite bundle analyzer)
3. CSS-in-JS vs Tailwind (prefer Tailwind for Glass UI)
4. Heavy computations in render (use useMemo)

### Linting errors after editing

**Quick fix:** `npm run lint:fix` **Manual:** Check ESLint output for specific violations **Common
issues:**

- Missing dependencies in useEffect
- Unused variables
- Missing TypeScript types

## Glass Components Structure

### Core Components (16)

Basic UI primitives. See [src/components/glass/ui/](src/components/glass/ui/) for complete list:

- ButtonGlass, InputGlass, GlassCard, ProgressGlass, BadgeGlass, AlertGlass
- ToggleGlass, CheckboxGlass, TabsGlass, TooltipGlass, SliderGlass
- SkeletonGlass, ModalGlass, DropdownGlass/DropdownMenuGlass, AvatarGlass, NotificationGlass

**Dropdown Components:**

- `DropdownGlass` - Simple API with items prop (quick setup)
- `DropdownMenuGlass` - Compound component API (shadcn/ui pattern, full control)
  - Sub-components: Trigger, Content, Item, Label, Separator, Group, CheckboxItem, RadioGroup, Sub,
    etc.

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

Located in `src/components/demos/`:

- [ComponentShowcase.tsx](src/components/demos/ComponentShowcase.tsx) - Core components demo (uses
  Blocks)
- [DesktopShowcase.tsx](src/components/demos/DesktopShowcase.tsx) - Full desktop analytics app (uses
  Blocks + Sections)
- [MobileShowcase.tsx](src/components/demos/MobileShowcase.tsx) - Mobile-optimized showcase
- [AnimatedBackground.tsx](src/components/demos/AnimatedBackground.tsx) - Animated gradient
  background

### Themes

- **glass** - Dark glassmorphism (default)
- **light** - Light mode with subtle glass effects
- **aurora** - Gradient theme with aurora effects

**Theme system:** `src/lib/theme-context.tsx` (ThemeProvider, useTheme, cycleTheme) **Theme
styles:** `src/lib/themeStyles.ts` **CSS variables:** `src/glass-theme.css`

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

The library maintains full compatibility with shadcn/ui component APIs while providing extended
Glass UI variants.

### ⚠️ Breaking Changes (v1.0.0)

**IMPORTANT:** The following legacy APIs have been removed in v1.0.0. Update your code before
upgrading.

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

- **Changed:** Migrated to compound component API (v2.0+)
- **Old API:** Single component with `title` prop
- **New API:** Compound components (AlertGlassTitle, AlertGlassDescription)

```tsx
// ❌ Old API (v1.x)
<AlertGlass variant="destructive" title="Error">Message</AlertGlass>

// ✅ Current API (v2.0+)
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Something went wrong</AlertGlassDescription>
</AlertGlass>
```

**Legacy migrations:**

- v1.0.0: `type` prop → `variant` prop
- v2.0.0: `title` prop → `<AlertGlassTitle>` subcomponent

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

#### AlertGlass (Compound Component - v2.0+)

- **API:** Compound component (shadcn/ui pattern)
- **shadcn/ui variants:** `default`, `destructive`
- **Extended variants:** `success`, `warning`
- **Subcomponents:** `AlertGlassTitle`, `AlertGlassDescription`

```tsx
// shadcn/ui compatible
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Something went wrong</AlertGlassDescription>
</AlertGlass>

// Glass UI extended
<AlertGlass variant="success">
  <AlertGlassTitle>Success</AlertGlassTitle>
  <AlertGlassDescription>Operation completed successfully</AlertGlassDescription>
</AlertGlass>
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
- **[docs/migration/select-to-combobox.md](docs/migration/select-to-combobox.md)** - SelectGlass →
  ComboBoxGlass
- **[docs/migration/modal-glass-compound-api.md](docs/migration/modal-glass-compound-api.md)** -
  ModalGlass compound API
- **[docs/migration/tabs-glass-compound-api.md](docs/migration/tabs-glass-compound-api.md)** -
  TabsGlass compound API

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

Components will be added to `src/components/ui/`. To create Glass variants, copy to
`src/components/glass/ui/` and apply glass styling.

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

## CI/CD & Automation

### GitHub Workflows

| Workflow                                                           | Trigger               | Purpose                                          |
| ------------------------------------------------------------------ | --------------------- | ------------------------------------------------ |
| [ci.yml](.github/workflows/ci.yml)                                 | Push/PR to main       | Lint, TypeScript, build, visual tests, Storybook |
| [security.yml](.github/workflows/security.yml)                     | Push/PR + weekly      | npm audit, CodeQL, license check, secrets scan   |
| [bundle-size.yml](.github/workflows/bundle-size.yml)               | PR (src changes)      | Bundle size tracking with PR comments            |
| [auto-release.yml](.github/workflows/auto-release.yml)             | Push to main (src/\*) | Auto version bump + GitHub release               |
| [publish.yml](.github/workflows/publish.yml)                       | Release published     | Publish to npm                                   |
| [update-screenshots.yml](.github/workflows/update-screenshots.yml) | Manual                | Update visual test baselines                     |

### Pre-commit Hooks (Husky + lint-staged)

Runs automatically on every commit:

- **ESLint** with `--max-warnings=0` on staged TS/TSX files
- **Prettier** formatting on staged files
- Fast: only checks staged files

Configuration:

- `.husky/pre-commit` - Hook script
- `.lintstagedrc.json` - lint-staged config

### Auto-Release System

When you push to `main` with changes in `src/` (excluding tests, stories, docs):

1. **Version bump** based on commit message:
   - `feat:` or `feat(scope):` → Minor (1.0.0 → 1.1.0)
   - `fix:`, `chore:`, etc. → Patch (1.0.0 → 1.0.1)
   - `BREAKING CHANGE` or `!:` → Major (1.0.0 → 2.0.0)

2. **Automatic actions:**
   - Updates `package.json` version
   - Creates git tag (e.g., `v1.1.0`)
   - Creates GitHub Release with changelog
   - Triggers npm publish

**Skip auto-release:** Add `[skip release]` to commit message.

### Dependabot

Configured in `.github/dependabot.yml`:

- Weekly npm updates (Monday 9:00 UTC)
- Groups related dependencies (React, Tailwind, Storybook, etc.)
- Cooldown periods to reduce noise
- GitHub Actions updates

### Security Scanning

See [docs/SECURITY.md](docs/SECURITY.md) for details:

- **npm audit** - Known vulnerabilities
- **CodeQL** - Static analysis (TypeScript 5.9 supported)
- **License check** - Approved licenses only
- **TruffleHog** - Secrets detection
- **Dependency review** - PR dependency analysis

**Recommended:** Install [Socket.dev](https://github.com/marketplace/socket-security) for
supply-chain attack protection.
