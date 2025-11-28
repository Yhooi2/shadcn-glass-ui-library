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
npx vitest                    # Run all tests
npx vitest --project=storybook  # Run Storybook component tests only
npx vitest ComponentName      # Run specific test
```

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

### Key Files

- `src/lib/utils.ts` - Utility functions (`cn` for className merging)
- `components.json` - shadcn/ui configuration
- `.storybook/` - Storybook configuration
- `vite.config.ts` - Vite + Vitest configuration
