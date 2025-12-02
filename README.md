# shadcn Glass UI Library

A modern, high-performance glassmorphism UI component library built with cutting-edge web technologies.

## Features

- **31 Glass Components** - Core, atomic, composite, and section components with glassmorphism design
- **Multi-Theme Support** - Glass (dark), Light, and Aurora (gradient) themes with seamless switching
- **Type-Safe** - Built with TypeScript 5.9 in strict mode
- **Accessible** - WCAG 2.1 AA compliant with automated a11y testing
- **Storybook Integration** - Comprehensive component documentation and interactive demos
- **Visual Regression Testing** - 135+ visual tests ensuring design consistency
- **Performance Optimized** - 3-16x faster builds, 100x less memory usage

## Tech Stack

- **React 19.2** - Server Components, React Compiler, automatic batching
- **TypeScript 5.9** - Strict type checking
- **Tailwind CSS 4.1** - CSS-first configuration with CSS variables
- **Vite 7** (rolldown-vite) - Rust-powered bundler
- **Storybook 10.1** - Component workshop with ESM-only architecture
- **Vitest 4.0** - Browser mode testing with visual regression

See [DEPENDENCIES.md](DEPENDENCIES.md) for detailed dependency documentation.

## Quick Start

### Prerequisites

- Node.js 20.16+, 22.19+, or 24+
- npm (latest stable version)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev          # Start Vite dev server
npm run storybook    # Start Storybook on port 6006
```

### Building

```bash
npm run build        # TypeScript check + Vite build
npm run build-storybook  # Build static Storybook
```

### Testing

```bash
npm test                     # Run all tests
npm run test:storybook       # Run Storybook component tests
npm run test:visual          # Run visual regression tests
npm run test:visual:update   # Update visual test baselines
```

### Linting

```bash
npm run lint         # Run ESLint
```

## Component Categories

### Core Components (16)
ButtonGlass, InputGlass, GlassCard, ProgressGlass, BadgeGlass, AlertGlass, ToggleGlass, CheckboxGlass, TabsGlass, TooltipGlass, SliderGlass, SkeletonGlass, ModalGlass, DropdownGlass, AvatarGlass, NotificationGlass

### Atomic Components (4)
StatusIndicatorGlass, SegmentedControlGlass, RainbowProgressGlass, LanguageBarGlass

### Composite Components (5)
MetricCardGlass, ProfileAvatarGlass, FlagAlertGlass, YearCardGlass, AICardGlass

### Section Components (6)
HeaderNavGlass, TrustScoreCardGlass, ProfileHeaderGlass, CareerStatsGlass, FlagsSectionGlass, RepoCardGlass

## Demo Pages

- **ComponentShowcase** - Interactive demo of all core components
- **DesktopShowcase** - GitHub Analytics desktop application mockup

## Documentation

- [DEPENDENCIES.md](DEPENDENCIES.md) - Detailed dependency documentation
- [CLAUDE.md](CLAUDE.md) - Claude Code development guidelines
- [Storybook](http://localhost:6006) - Component documentation (when running)

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── glass/           # Glass components (core, atomic, composite, section)
│   ├── __visual__/      # Visual regression tests
│   ├── ComponentShowcase.tsx
│   └── DesktopShowcase.tsx
├── lib/
│   ├── utils.ts         # cn() utility
│   ├── theme-context.tsx # Theme provider
│   └── themeStyles.ts   # Theme definitions
└── glass-theme.css      # CSS variables and animations
```

## Performance

- **Build Time:** 3-16x faster than standard Vite
- **Memory Usage:** 100x reduction vs traditional bundlers
- **Dev Server:** Near-instant start
- **Incremental Builds:** 100x faster with Tailwind CSS v4
- **Render Performance:** 32% fewer renders with React 19

## Code Quality

- TypeScript strict mode, no `any`
- WCAG 2.1 AA accessibility
- 90% test coverage target
- ESLint + Prettier

## Expanding the ESLint Configuration

For production applications, enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
