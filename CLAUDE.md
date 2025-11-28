# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A shadcn/ui component library built with React 19, TypeScript, Tailwind CSS v4, and Storybook 10. Uses Vite (rolldown-vite) for bundling.

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
- `showcase.visual.test.tsx` - Full demo page tests (55 tests across 3 themes)

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

- **Components**: ButtonGlass, InputGlass, GlassCard, ProgressGlass, BadgeGlass, AlertGlass, ToggleGlass, CheckboxGlass, TabsGlass, TooltipGlass, SliderGlass, SkeletonGlass, ModalGlass, DropdownGlass, AvatarGlass, NotificationGlass
- **Demo page**: `src/components/ComponentShowcase.tsx`
- **Themes**: glass (dark glassmorphism), light, aurora (gradient)
- **Theme system**: `src/lib/theme-context.tsx` (ThemeProvider, useTheme, cycleTheme)
- **Theme styles**: `src/lib/themeStyles.ts`
- **CSS variables**: `src/glass-theme.css`

### Key Files

- `src/lib/utils.ts` - Utility functions (`cn` for className merging)
- `src/lib/theme-context.tsx` - Theme provider and hooks
- `src/lib/themeStyles.ts` - Theme-specific style definitions
- `src/glass-theme.css` - CSS variables and animations
- `components.json` - shadcn/ui configuration
- `.storybook/` - Storybook configuration
- `vite.config.ts` - Vite + Vitest configuration
