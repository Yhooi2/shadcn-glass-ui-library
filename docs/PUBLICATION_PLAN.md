# shadcn-glass-ui v1.0.0 - Детальный план публикации

**Дата создания:** 2025-12-05
**Версия:** 1.0.0
**Общее время:** ~31 час (без Registry) или ~41 час (с Registry)

---

## 📋 СОДЕРЖАНИЕ

1. [Обзор](#обзор)
2. [Этап 1: Подготовка](#этап-1-подготовка-7-часов)
3. [Этап 2: npm Package](#этап-2-npm-package-4-часа)
4. [Этап 3: Storybook Deployment](#этап-3-storybook-deployment-3-часа)
5. [Этап 4: Registry System](#этап-4-registry-system-10-часов-опционально)
6. [Этап 5: Финализация](#этап-5-финализация-7-часов)
7. [Чеклисты](#чеклисты)
8. [Rollback стратегия](#rollback-стратегия)

---

## ОБЗОР

Публикация shadcn-glass-ui проходит в **5 основных этапов**:

| Этап | Описание | Время | Статус |
|------|----------|-------|--------|
| 1 | Подготовка - создание entry points, настройка конфигов | ~7 часов | Pending |
| 2 | npm Package - сборка и публикация в npm | ~4 часа | Pending |
| 3 | Storybook Deployment - деплой на GitHub Pages | ~3 часа | Pending |
| 4 | Registry System - shadcn-style CLI установка (опционально) | ~10 часов | Optional |
| 5 | Финализация - документация, анонс, мониторинг | ~7 часов | Pending |

**Итого:** 31 час (без Registry) или 41 час (с Registry)

---

## ЭТАП 1: ПОДГОТОВКА (~7 часов)

### Цель
Настроить проект для публикации в npm: создать entry points, обновить конфиги.

### Задачи

- [ ] Создать `src/index.ts` - главный entry point
- [ ] Создать дополнительные entry points (опционально)
- [ ] Создать `src/styles.css` - агрегированный CSS
- [ ] Обновить `package.json` - exports, peerDependencies
- [ ] Создать `tsconfig.lib.json` - TypeScript для library build
- [ ] Обновить `vite.config.ts` - library mode
- [ ] Установить `vite-plugin-dts`
- [ ] Тестовая сборка `npm run build:lib`

---

### 1.1. Создать главный Entry Point

**Файл:** `src/index.ts` (**СОЗДАТЬ НОВЫЙ**)

Этот файл экспортирует **все 55+ компонентов** плюс утилиты, хуки и типы.

```typescript
// ========================================
// SHADCN-GLASS-UI LIBRARY
// Main entry point for npm package
// Version: 1.0.0
// ========================================

// ========================================
// CORE UI COMPONENTS (Level 1 - 18 components)
// ========================================
export { AlertGlass } from './components/glass/ui/alert-glass';
export { AvatarGlass } from './components/glass/ui/avatar-glass';
export { BadgeGlass } from './components/glass/ui/badge-glass';
export { ButtonGlass } from './components/glass/ui/button-glass';
export { CheckboxGlass } from './components/glass/ui/checkbox-glass';
export { CircularProgressGlass } from './components/glass/ui/circular-progress-glass';
export { ComboBoxGlass } from './components/glass/ui/combobox-glass';
export { DropdownGlass } from './components/glass/ui/dropdown-glass';
export { GlassCard } from './components/glass/ui/glass-card';
export { InputGlass } from './components/glass/ui/input-glass';
export { ModalGlass } from './components/glass/ui/modal-glass';
export { NotificationGlass } from './components/glass/ui/notification-glass';
export { PopoverGlass } from './components/glass/ui/popover-glass';
export { SkeletonGlass } from './components/glass/ui/skeleton-glass';
export { SliderGlass } from './components/glass/ui/slider-glass';
export { TabsGlass } from './components/glass/ui/tabs-glass';
export { ToggleGlass } from './components/glass/ui/toggle-glass';
export { TooltipGlass } from './components/glass/ui/tooltip-glass';

// ========================================
// ATOMIC COMPONENTS (Level 2 - 6 components)
// ========================================
export { ExpandableHeaderGlass } from './components/glass/atomic/expandable-header-glass';
export { IconButtonGlass } from './components/glass/atomic/icon-button-glass';
export { SearchBoxGlass } from './components/glass/atomic/search-box-glass';
export { SortDropdownGlass } from './components/glass/atomic/sort-dropdown-glass';
export { StatItemGlass } from './components/glass/atomic/stat-item-glass';
export { ThemeToggleGlass } from './components/glass/atomic/theme-toggle-glass';

// ========================================
// SPECIALIZED COMPONENTS (Level 3 - 8 components)
// ========================================
export { BaseProgressGlass } from './components/glass/specialized/base-progress-glass';
export { FlagAlertGlass } from './components/glass/specialized/flag-alert-glass';
export { LanguageBarGlass } from './components/glass/specialized/language-bar-glass';
export { ProfileAvatarGlass } from './components/glass/specialized/profile-avatar-glass';
export { ProgressGlass } from './components/glass/specialized/progress-glass';
export { RainbowProgressGlass } from './components/glass/specialized/rainbow-progress-glass';
export { SegmentedControlGlass } from './components/glass/specialized/segmented-control-glass';
export { StatusIndicatorGlass } from './components/glass/specialized/status-indicator-glass';

// ========================================
// COMPOSITE COMPONENTS (Level 4 - 13 components)
// ========================================
export { AICardGlass } from './components/glass/composite/ai-card-glass';
export { CareerStatsHeaderGlass } from './components/glass/composite/career-stats-header-glass';
export { CircularMetricGlass } from './components/glass/composite/circular-metric-glass';
export { ContributionMetricsGlass } from './components/glass/composite/contribution-metrics-glass';
export { MetricCardGlass } from './components/glass/composite/metric-card-glass';
export { MetricsGridGlass } from './components/glass/composite/metrics-grid-glass';
export { RepositoryCardGlass } from './components/glass/composite/repository-card-glass';
export { RepositoryHeaderGlass } from './components/glass/composite/repository-header-glass';
export { RepositoryMetadataGlass } from './components/glass/composite/repository-metadata-glass';
export { TrustScoreDisplayGlass } from './components/glass/composite/trust-score-display-glass';
export { UserInfoGlass } from './components/glass/composite/user-info-glass';
export { UserStatsLineGlass } from './components/glass/composite/user-stats-line-glass';
export { YearCardGlass } from './components/glass/composite/year-card-glass';

// ========================================
// SECTION COMPONENTS (Level 5 - 7 components)
// ========================================
export { CareerStatsGlass } from './components/glass/sections/career-stats-glass';
export { FlagsSectionGlass } from './components/glass/sections/flags-section-glass';
export { HeaderBrandingGlass } from './components/glass/sections/header-branding-glass';
export { HeaderNavGlass } from './components/glass/sections/header-nav-glass';
export { ProfileHeaderGlass } from './components/glass/sections/profile-header-glass';
export { ProjectsListGlass } from './components/glass/sections/projects-list-glass';
export { TrustScoreCardGlass } from './components/glass/sections/trust-score-card-glass';

// ========================================
// PRIMITIVE COMPONENTS (Foundation - 3 components)
// ========================================
export { FormFieldWrapper } from './components/glass/primitives/form-field-wrapper';
export { InteractiveCard } from './components/glass/primitives/interactive-card';
export { TouchTarget } from './components/glass/primitives/touch-target';

// ========================================
// UTILITIES
// ========================================
export { cn } from './lib/utils';

// ========================================
// THEME SYSTEM
// ========================================
export {
  ThemeProvider,
  useTheme,
  THEMES,
  THEME_CONFIG,
  getNextTheme,
  getThemeConfig,
  type Theme,
  type ThemeConfig,
  type ThemeContextValue,
} from './lib/theme-context';

// ========================================
// HOOKS
// ========================================
export { useFocus } from './lib/hooks/use-focus';
export { useHover } from './lib/hooks/use-hover';
export { useResponsive } from './lib/hooks/use-responsive';
export { useWallpaperTint } from './lib/hooks/use-wallpaper-tint';

// ========================================
// TYPES
// ========================================
export type { GlassVariant, ThemeVariant, SizeVariant } from './lib/types';

// ========================================
// VARIANTS (CVA)
// ========================================
// Export all CVA variant functions for advanced usage
export * from './lib/variants';
```

**Почему так:**
- **Прозрачная структура** - пользователи видят все компоненты
- **Tree-shaking** - modern bundlers автоматически удалят неиспользуемые экспорты
- **Ясная иерархия** - UI → Atomic → Specialized → Composite → Sections → Primitives

---

### 1.2. Создать дополнительные Entry Points (ОПЦИОНАЛЬНО)

Для advanced tree-shaking можно создать дополнительные entry points.

#### 1.2.1. Components Entry

**Файл:** `src/components.ts` (**СОЗДАТЬ НОВЫЙ**)

```typescript
// Components-only entry point
export * from './components/glass/ui';
export * from './components/glass/atomic';
export * from './components/glass/specialized';
export * from './components/glass/composite';
export * from './components/glass/sections';
export * from './components/glass/primitives';
```

#### 1.2.2. Hooks Entry

**Файл:** `src/hooks.ts` (**СОЗДАТЬ НОВЫЙ**)

```typescript
// Hooks-only entry point
export { useFocus } from './lib/hooks/use-focus';
export { useHover } from './lib/hooks/use-hover';
export { useResponsive } from './lib/hooks/use-responsive';
export { useWallpaperTint } from './lib/hooks/use-wallpaper-tint';
```

#### 1.2.3. Utils Entry

**Файл:** `src/utils.ts` (**СОЗДАТЬ НОВЫЙ**)

```typescript
// Utils-only entry point
export { cn } from './lib/utils';
export * from './lib/variants';
```

#### 1.2.4. Themes Entry

**Файл:** `src/themes.ts` (**СОЗДАТЬ НОВЫЙ**)

```typescript
// Themes-only entry point
export {
  ThemeProvider,
  useTheme,
  THEMES,
  THEME_CONFIG,
  getNextTheme,
  getThemeConfig,
  type Theme,
  type ThemeConfig,
  type ThemeContextValue,
} from './lib/theme-context';
```

**Использование:**
```typescript
// Вместо
import { ButtonGlass } from 'shadcn-glass-ui';

// Можно
import { ButtonGlass } from 'shadcn-glass-ui/components';
import { useTheme } from 'shadcn-glass-ui/themes';
```

---

### 1.3. Создать агрегированный CSS

**Файл:** `src/styles.css` (**СОЗДАТЬ НОВЫЙ**)

```css
/* ========================================
   SHADCN-GLASS-UI - Main Styles
   Version: 1.0.0
   ======================================== */

/* Import base styles */
@import './index.css';

/* Import glass theme system */
@import './glass-theme.css';
```

**Использование:**
```typescript
import 'shadcn-glass-ui/dist/styles.css';
```

---

### 1.4. Обновить package.json

**Файл:** `package.json` (**ИЗМЕНИТЬ**)

Внести следующие критические изменения:

```json
{
  "name": "shadcn-glass-ui",
  "private": false,  // ❗ ИЗМЕНИТЬ с true на false
  "version": "1.0.0",
  "description": "Modern glassmorphism UI component library for React with full shadcn/ui compatibility",
  "type": "module",

  // ❗ ДОБАВИТЬ metadata
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "keywords": [
    "react",
    "ui",
    "components",
    "glassmorphism",
    "glass",
    "shadcn",
    "tailwind",
    "typescript",
    "design-system",
    "radix-ui"
  ],

  // ❗ ДОБАВИТЬ repository info
  "repository": {
    "type": "git",
    "url": "https://github.com/Yhooi2/shadcn-glass-ui-library.git"
  },
  "homepage": "https://yhooi2.github.io/shadcn-glass-ui-library/",
  "bugs": {
    "url": "https://github.com/Yhooi2/shadcn-glass-ui-library/issues"
  },

  // ❗ ДОБАВИТЬ entry points
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",

  // ❗ ДОБАВИТЬ exports
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.cjs"
      }
    },
    "./components": {
      "import": "./dist/components.js",
      "require": "./dist/components.cjs",
      "types": "./dist/components.d.ts"
    },
    "./hooks": {
      "import": "./dist/hooks.js",
      "require": "./dist/hooks.cjs",
      "types": "./dist/hooks.d.ts"
    },
    "./utils": {
      "import": "./dist/utils.js",
      "require": "./dist/utils.cjs",
      "types": "./dist/utils.d.ts"
    },
    "./themes": {
      "import": "./dist/themes.js",
      "require": "./dist/themes.cjs",
      "types": "./dist/themes.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },

  // ❗ ДОБАВИТЬ files для публикации
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],

  // ❗ ДОБАВИТЬ sideEffects
  "sideEffects": [
    "*.css"
  ],

  // ❗ ДОБАВИТЬ peerDependencies
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "tailwindcss": "^4.0.0"
  },

  "peerDependenciesMeta": {
    "tailwindcss": {
      "optional": false
    }
  },

  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",

    // ❗ ДОБАВИТЬ library build script
    "build:lib": "tsc -b tsconfig.lib.json && vite build --mode lib",
    "prepublishOnly": "npm run build:lib",  // Автоматический build перед publish

    "lint": "eslint .",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "vitest",
    "test:unit": "vitest --project=unit",
    "test:storybook": "vitest --project=storybook",
    "test:visual": "vitest --project=visual",
    "test:visual:update": "vitest --project=visual --update",
    "test:visual:ci": "vitest --project=visual --run",
    "test:all": "vitest --run",
    "check:links": "bash scripts/check-links.sh"
  },

  "dependencies": {
    // ❗ Radix UI остаётся в dependencies (НЕ peer)
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tailwindcss/postcss": "^4.1.17",
    "@tailwindcss/vite": "^4.1.17",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "lucide-react": "^0.555.0",
    "next-themes": "^0.4.6",
    "postcss": "^8.5.6",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.17"
  },

  "devDependencies": {
    // ❗ React в devDependencies (т.к. это peerDependency)
    "react": "^19.2.0",
    "react-dom": "^19.2.0",

    "@chromatic-com/storybook": "^4.1.3",
    "@eslint/js": "^9.39.1",
    "@storybook/addon-a11y": "^10.1.0",
    "@storybook/addon-docs": "^10.1.0",
    "@storybook/addon-mcp": "^0.1.3",
    "@storybook/addon-onboarding": "^10.1.0",
    "@storybook/addon-vitest": "^10.1.0",
    "@storybook/react-vite": "^10.1.0",
    "@testing-library/react": "^16.3.0",
    "@types/glob": "^8.1.0",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "@vitest/browser-playwright": "^4.0.14",
    "@vitest/coverage-v8": "^4.0.14",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "eslint-plugin-storybook": "^10.1.0",
    "glob": "^13.0.0",
    "globals": "^16.5.0",
    "jsdom": "^27.2.0",
    "playwright": "^1.57.0",
    "prettier": "3.7.1",
    "sass": "^1.94.2",
    "shadcn": "^3.5.0",
    "storybook": "^10.1.0",
    "tw-animate-css": "^1.4.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "npm:rolldown-vite@7.2.5",
    "vitest": "^4.0.14",

    // ❗ ДОБАВИТЬ vite-plugin-dts
    "vite-plugin-dts": "^4.3.0"
  },

  "overrides": {
    "vite": "npm:rolldown-vite@7.2.5"
  }
}
```

**Ключевые моменты:**
- `"private": false` - разрешает npm publish
- `"main"`, `"module"`, `"types"` - entry points для разных систем
- `"exports"` - современный способ экспорта (ESM + CJS)
- `"files"` - только dist/ попадет в npm package
- `"sideEffects"` - указывает bundlers какие файлы имеют side effects (CSS)
- `"peerDependencies"` - что должно быть у пользователя (React, React-DOM, Tailwind)
- **ВАЖНО**: React и React-DOM должны быть:
  - ✅ В `peerDependencies` (требование для пользователей)
  - ✅ В `devDependencies` (для локальной разработки)
  - ❌ **НЕ** в `dependencies` (иначе будут установлены дважды)
- Radix UI в `dependencies` (не peer), т.к. компоненты напрямую зависят

---

### 1.5. Создать tsconfig.lib.json

**Файл:** `tsconfig.lib.json` (**СОЗДАТЬ НОВЫЙ**)

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": false,
    "noEmit": false,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "composite": false,

    // Paths для разработки
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    // Исключаем тесты
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx",

    // Исключаем stories
    "src/**/*.stories.ts",
    "src/**/*.stories.tsx",

    // Исключаем visual tests
    "src/**/*.visual.test.tsx",
    "src/**/__tests__/**",
    "src/**/__visual__/**",

    // Исключаем demo файлы
    "src/main.tsx",
    "src/App.tsx",
    "src/vite-env.d.ts",
    "src/test/**",

    // Исключаем showcase компоненты
    "src/components/ComponentShowcase.tsx",
    "src/components/DesktopShowcase.tsx",
    "src/components/MobileShowcase.tsx",

    // Исключаем blocks (они только для демо)
    "src/components/blocks/**"
  ]
}
```

**Ключевые отличия от tsconfig.app.json:**
- `"noEmit": false` - **включаем генерацию файлов** (в app это `true`)
- `"declaration": true` - **генерируем .d.ts типы**
- `"declarationMap": true` - **генерируем source maps для типов**
- `exclude` - исключаем всё, что не должно попасть в library build

---

### 1.6. Обновить vite.config.ts

**Файл:** `vite.config.ts` (**ИЗМЕНИТЬ**)

Добавить library mode через условие `mode === 'lib'`:

```typescript
/// <reference types="vitest/config" />
import path from 'path';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

// ❗ НОВЫЙ IMPORT
import dts from 'vite-plugin-dts';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // ========================================
  // LIBRARY BUILD MODE
  // ========================================
  if (mode === 'lib') {
    return {
      plugins: [
        react(),
        tailwindcss(),
        dts({
          include: ['src/**/*.ts', 'src/**/*.tsx'],
          exclude: [
            'src/**/*.test.ts',
            'src/**/*.test.tsx',
            'src/**/*.spec.ts',
            'src/**/*.spec.tsx',
            'src/**/*.stories.ts',
            'src/**/*.stories.tsx',
            'src/**/*.visual.test.tsx',
            'src/**/__tests__/**',
            'src/**/__visual__/**',
            'src/main.tsx',
            'src/App.tsx',
            'src/vite-env.d.ts',
            'src/test/**',
            'src/components/ComponentShowcase.tsx',
            'src/components/DesktopShowcase.tsx',
            'src/components/MobileShowcase.tsx',
            'src/components/blocks/**'
          ],
          insertTypesEntry: true,
          rollupTypes: true,
          tsconfigPath: './tsconfig.lib.json',
        }),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      build: {
        lib: {
          entry: {
            index: resolve(__dirname, 'src/index.ts'),
            components: resolve(__dirname, 'src/components.ts'),
            hooks: resolve(__dirname, 'src/hooks.ts'),
            utils: resolve(__dirname, 'src/utils.ts'),
            themes: resolve(__dirname, 'src/themes.ts'),
          },
          name: 'ShadcnGlassUI',
          formats: ['es', 'cjs'],
          fileName: (format, entryName) => {
            const ext = format === 'es' ? 'js' : 'cjs';
            return `${entryName}.${ext}`;
          },
        },
        rollupOptions: {
          // External dependencies (не бандлятся)
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            'lucide-react',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'cmdk',
            'next-themes',
            'sonner',
          ],
          output: {
            exports: 'named',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') {
                return 'styles.css';
              }
              return assetInfo.name || 'asset';
            },
          },
        },
        cssCodeSplit: false, // Весь CSS в один файл
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'dist',
      },
    };
  }

  // ========================================
  // DEFAULT DEV/BUILD MODE
  // ========================================
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.stories.{ts,tsx}',
          'src/**/*.test.{ts,tsx}',
          'src/**/*.visual.test.{ts,tsx}',
          'src/**/__visual__/**',
          'src/main.tsx',
          'src/vite-env.d.ts',
        ],
        thresholds: {
          lines: 90,
          functions: 90,
          branches: 90,
          statements: 90,
        },
      },
      projects: [
        // ... остальная существующая test конфигурация ...
        {
          extends: true,
          test: {
            name: 'unit',
            include: ['src/**/*.test.{ts,tsx}'],
            exclude: ['src/**/*.visual.test.{ts,tsx}', 'src/**/*.browser.test.{ts,tsx}'],
            environment: 'jsdom',
          },
        },
        // ... остальные test projects ...
      ],
    },
  };
});
```

**Ключевые моменты:**
- Условие `mode === 'lib'` - отдельная конфигурация для library build
- `vite-plugin-dts` - генерирует .d.ts файлы
- `external` - все peer dependencies не бандлятся
- `cssCodeSplit: false` - весь CSS в один `styles.css` файл
- Multiple entry points (index, components, hooks, utils, themes)

---

### 1.7. Установить vite-plugin-dts

```bash
npm install --save-dev vite-plugin-dts
```

---

### 1.8. Тестовая сборка

```bash
npm run build:lib
```

**Ожидаемый результат в `dist/`:**

```
dist/
├── index.js           # ESM entry point (~100-150KB)
├── index.cjs          # CommonJS entry point (~100-150KB)
├── index.d.ts         # TypeScript types (~50-80KB)
├── components.js
├── components.cjs
├── components.d.ts
├── hooks.js
├── hooks.cjs
├── hooks.d.ts
├── utils.js
├── utils.cjs
├── utils.d.ts
├── themes.js
├── themes.cjs
├── themes.d.ts
└── styles.css         # Агрегированный CSS (~10-15KB)
```

**Проверка размеров:**
```bash
ls -lh dist/
```

---

## ЭТАП 2: NPM PACKAGE (~4 часа)

### Цель
Собрать пакет, протестировать локально, опубликовать в npm.

### Задачи

- [ ] Локальное тестирование сборки
- [ ] `npm pack` и проверка содержимого
- [ ] Локальное тестирование установки
- [ ] `npm publish --dry-run`
- [ ] Создать git tag `v1.0.0`
- [ ] `npm publish --access public`
- [ ] Проверка публикации

---

### 2.1. Локальное тестирование сборки

**Шаг 1:** Собрать library:

```bash
npm run build:lib
```

**Шаг 2:** Проверить размеры:

```bash
ls -lh dist/
```

**Ожидаемые размеры:**
- `index.js` - ~100-150KB (ESM, все компоненты)
- `index.cjs` - ~100-150KB (CommonJS)
- `styles.css` - ~10-15KB (Tailwind purged CSS)
- `index.d.ts` - ~50-80KB (TypeScript types)

---

### 2.2. Проверка package с npm pack

**Создать архив:**

```bash
npm pack
```

Это создаст файл `shadcn-glass-ui-1.0.0.tgz`.

**Проверить содержимое:**

```bash
tar -tzf shadcn-glass-ui-1.0.0.tgz
```

**Ожидаемый output:**
```
package/
package/dist/
package/dist/index.js
package/dist/index.cjs
package/dist/index.d.ts
package/dist/components.js
package/dist/components.cjs
package/dist/components.d.ts
package/dist/hooks.js
package/dist/hooks.cjs
package/dist/hooks.d.ts
package/dist/utils.js
package/dist/utils.cjs
package/dist/utils.d.ts
package/dist/themes.js
package/dist/themes.cjs
package/dist/themes.d.ts
package/dist/styles.css
package/README.md
package/LICENSE
package/CHANGELOG.md
package/package.json
```

**Проверить:**
- ✅ Только `dist/`, `README.md`, `LICENSE`, `CHANGELOG.md`, `package.json`
- ❌ Нет `src/`, `tests/`, `.storybook/`, `node_modules/`

---

### 2.3. Локальное тестирование установки

**Шаг 1:** Создать тестовый проект:

```bash
mkdir /tmp/test-shadcn-glass-ui
cd /tmp/test-shadcn-glass-ui
npm init -y
npm install react react-dom tailwindcss
```

**Шаг 2:** Установить локальный package:

```bash
npm install /Users/art/code/shadcn-glass-ui-library/shadcn-glass-ui-1.0.0.tgz
```

**Шаг 3:** Создать тестовый файл `test.tsx`:

```tsx
import { ButtonGlass, InputGlass, useTheme, ThemeProvider } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <div className="p-8 space-y-4">
        <ButtonGlass variant="primary" size="lg">
          Test Button
        </ButtonGlass>
        <InputGlass placeholder="Test Input" />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

**Шаг 4:** Проверить TypeScript типы:

```bash
npx tsc --noEmit test.tsx
```

Если нет ошибок - типы работают корректно ✅

**Шаг 5:** Проверить tree-shaking (опционально):

```tsx
// Импорт через sub-entry points
import { ButtonGlass } from 'shadcn-glass-ui/components';
import { useTheme } from 'shadcn-glass-ui/themes';
import { cn } from 'shadcn-glass-ui/utils';
```

---

### 2.4. Публикация в npm (Dry-run)

**Проверить что будет опубликовано:**

```bash
npm publish --dry-run
```

**Ожидаемый output:**

```
npm notice
npm notice 📦  shadcn-glass-ui@1.0.0
npm notice === Tarball Contents ===
npm notice 150.5kB dist/index.js
npm notice 150.5kB dist/index.cjs
npm notice 80.2kB  dist/index.d.ts
npm notice 15.3kB  dist/components.js
npm notice 15.3kB  dist/components.cjs
npm notice 8.2kB   dist/components.d.ts
npm notice 2.1kB   dist/hooks.js
npm notice 2.1kB   dist/hooks.cjs
npm notice 1.5kB   dist/hooks.d.ts
npm notice 3.2kB   dist/utils.js
npm notice 3.2kB   dist/utils.cjs
npm notice 2.1kB   dist/utils.d.ts
npm notice 12.5kB  dist/themes.js
npm notice 12.5kB  dist/themes.cjs
npm notice 5.3kB   dist/themes.d.ts
npm notice 12.3kB  dist/styles.css
npm notice 25.1kB  README.md
npm notice 1.1kB   LICENSE
npm notice 5.2kB   CHANGELOG.md
npm notice === Tarball Details ===
npm notice name:          shadcn-glass-ui
npm notice version:       1.0.0
npm notice package size:  110.5 KB
npm notice unpacked size: 524.9 KB
npm notice shasum:        [hash]
npm notice integrity:     [hash]
npm notice total files:   19
npm notice
```

**Проверить:**
- ✅ Размер package ~110KB (сжатый)
- ✅ Все необходимые файлы присутствуют
- ❌ Нет лишних файлов

---

### 2.5. Публикация в npm (Production)

**Предварительные шаги:**

1. **Убедиться что вы залогинены в npm:**

```bash
npm whoami
```

Если не залогинены:

```bash
npm login
```

Ввести:
- Username
- Password
- Email
- 2FA код (если включен)

2. **Проверить версию в package.json:**

```bash
cat package.json | grep '"version"'
```

Для первого релиза должна быть `"version": "1.0.0"`.

3. **Создать git tag:**

```bash
git tag v1.0.0
git push origin v1.0.0
```

**Публикация:**

```bash
npm publish --access public
```

**Флаги:**
- `--access public` - обязательно для scoped packages (`@yourorg/package`)
- Если package name без scope (`shadcn-glass-ui`), флаг не обязателен

**Ожидаемый output:**

```
+ shadcn-glass-ui@1.0.0
```

---

### 2.6. Проверка публикации

**Шаг 1:** Проверить package info:

```bash
npm info shadcn-glass-ui
```

Должно показать:
- name: shadcn-glass-ui
- version: 1.0.0
- description: Modern glassmorphism...
- dist.tarball: https://registry.npmjs.org/...
- dependencies: @radix-ui/..., etc.
- peerDependencies: react, react-dom, tailwindcss

**Шаг 2:** Установить из npm:

```bash
mkdir /tmp/test-npm-install
cd /tmp/test-npm-install
npm init -y
npm install shadcn-glass-ui react react-dom tailwindcss
```

**Шаг 3:** Проверить что всё работает:

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';

// Должно работать без ошибок ✅
```

---

### 2.7. Rollback план

**Если обнаружена критическая ошибка СРАЗУ после публикации (в течение 24 часов):**

```bash
# Удалить версию из npm (можно только в первые 24 часа)
npm unpublish shadcn-glass-ui@1.0.0
```

**Если прошло >24 часа:**

```bash
# Сделать deprecate
npm deprecate shadcn-glass-ui@1.0.0 "Critical bug, please upgrade to 1.0.1"
```

**Затем:**
1. Исправить баг
2. Bump версию: `"version": "1.0.1"` в package.json
3. Создать новый tag: `git tag v1.0.1`
4. Повторить публикацию: `npm publish --access public`

---

## ЭТАП 3: STORYBOOK DEPLOYMENT (~3 часа)

### Цель
Опубликовать Storybook документацию на GitHub Pages для live демо компонентов.

### Задачи

- [ ] Обновить `.github/workflows/ci.yml` - добавить deploy job
- [ ] Включить GitHub Pages в Settings репозитория
- [ ] Обновить `.storybook/main.ts` - base path (опционально)
- [ ] Тестовая сборка локально
- [ ] Закоммитить и push
- [ ] Следить за GitHub Actions
- [ ] Обновить README.md с ссылкой на Storybook

---

### 3.1. Обновить .github/workflows/ci.yml

**Файл:** `.github/workflows/ci.yml` (**ИЗМЕНИТЬ**)

Добавить deploy job после существующего `build-storybook`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # ... существующие jobs (lint-and-typecheck, build, visual-tests, build-storybook) ...

  # Job 5: Deploy Storybook to GitHub Pages
  deploy-storybook:
    name: Deploy Storybook
    runs-on: ubuntu-latest
    needs: build-storybook
    # Деплоить только при push в main (не на PR)
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    # Важно: нужны permissions для GitHub Pages
    permissions:
      contents: read
      pages: write
      id-token: write

    # Защита от одновременных деплоев
    concurrency:
      group: "pages"
      cancel-in-progress: false

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Download Storybook build
        uses: actions/download-artifact@v4
        with:
          name: storybook-static
          path: storybook-static

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact to Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: storybook-static

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Ключевые моменты:**
- `needs: build-storybook` - деплой только после успешной сборки
- `if: github.event_name == 'push' && github.ref == 'refs/heads/main'` - только при push в main
- `permissions` - необходимы для работы с GitHub Pages
- `environment: github-pages` - создает environment (видно в GitHub UI)

---

### 3.2. Включить GitHub Pages в настройках репозитория

**Шаг 1:** Перейти в Settings репозитория:

```
https://github.com/Yhooi2/shadcn-glass-ui-library/settings
```

**Шаг 2:** В левом меню выбрать **Pages**

**Шаг 3:** В разделе **Build and deployment**:

- **Source:** Выбрать **"GitHub Actions"**
- **Branch:** (не нужно выбирать, т.к. используем Actions)

**Шаг 4:** Сохранить изменения

После первого успешного деплоя, Storybook будет доступен по адресу:
```
https://yhooi2.github.io/shadcn-glass-ui-library/
```

---

### 3.3. Обновить .storybook/main.ts (опционально)

**Файл:** `.storybook/main.ts` (**ИЗМЕНИТЬ**, если нужен base path)

Если Storybook будет на `https://yhooi2.github.io/shadcn-glass-ui-library/`, нужно настроить base path:

```typescript
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    './Introduction.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-mcp'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  // ❗ ДОБАВИТЬ для GitHub Pages
  async viteFinal(config) {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? '/shadcn-glass-ui-library/'  // Имя репозитория
      : '/';

    return {
      ...config,
      base: baseUrl,
    };
  },
};

export default config;
```

**Примечание:** Если используете custom domain (yourdomain.com), base path не нужен.

---

### 3.4. Тестирование деплоя локально

**Шаг 1:** Собрать Storybook:

```bash
npm run build-storybook
```

**Шаг 2:** Проверить локально:

```bash
npx http-server storybook-static -p 8080
```

Открыть `http://localhost:8080` и проверить что Storybook работает.

---

### 3.5. Запуск деплоя

**Шаг 1:** Закоммитить изменения:

```bash
git add .github/workflows/ci.yml .storybook/main.ts
git commit -m "ci: add Storybook deployment to GitHub Pages"
git push origin main
```

**Шаг 2:** Следить за GitHub Actions:

```
https://github.com/Yhooi2/shadcn-glass-ui-library/actions
```

**Ожидаемый результат:**
- ✅ lint-and-typecheck
- ✅ build
- ✅ visual-tests
- ✅ build-storybook
- ✅ deploy-storybook (**новый job**)

**Шаг 3:** После успешного деплоя, Storybook будет доступен:

```
https://yhooi2.github.io/shadcn-glass-ui-library/
```

Открыть ссылку и проверить:
- ✅ Все 46 stories загружаются
- ✅ Темы переключаются (glass, light, aurora)
- ✅ A11y addon работает
- ✅ Docs автоматически генерируются

---

### 3.6. Обновить README.md

**Файл:** `README.md` (**ИЗМЕНИТЬ**)

Добавить/обновить секцию Documentation:

```markdown
## 📚 Documentation

- **[Live Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)** - Interactive component demos
- **[npm Package](https://www.npmjs.com/package/shadcn-glass-ui)** - Installation and usage
- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Setup tutorial
- **[Component Docs](docs/)** - Detailed documentation
```

---

## ЭТАП 4: REGISTRY SYSTEM (~10 часов, ОПЦИОНАЛЬНО)

### Цель
Создать shadcn-style registry для CLI установки компонентов.

**Примечание:** Этот этап опционален. Можно пропустить для MVP и добавить позже.

---

### 4.1. Структура Registry

Создать директорию `registry/` в корне проекта:

```
registry/
├── registry.json                 # Главный индекс
├── components/
│   ├── ui/                      # Core UI (18)
│   │   ├── button-glass.json
│   │   ├── input-glass.json
│   │   ├── modal-glass.json
│   │   └── ...
│   ├── atomic/                  # Atomic (6)
│   │   ├── theme-toggle-glass.json
│   │   └── ...
│   ├── specialized/             # Specialized (8)
│   │   ├── progress-glass.json
│   │   └── ...
│   ├── composite/               # Composite (13)
│   │   ├── metric-card-glass.json
│   │   └── ...
│   └── sections/                # Sections (7)
│       ├── header-nav-glass.json
│       └── ...
├── hooks/
│   ├── use-theme.json
│   └── ...
└── utils/
    ├── cn.json
    └── ...
```

---

### 4.2. Формат Registry JSON (shadcn standard)

**Пример:** `registry/components/ui/button-glass.json`

```json
{
  "name": "button-glass",
  "type": "components:ui",
  "description": "Glassmorphism button with multiple variants and sizes",
  "dependencies": [
    "@radix-ui/react-slot",
    "class-variance-authority",
    "lucide-react"
  ],
  "devDependencies": [],
  "registryDependencies": [
    "cn"
  ],
  "files": [
    {
      "name": "button-glass.tsx",
      "content": "// base64 encoded или plain text file content"
    }
  ],
  "tailwind": {
    "config": {
      "plugins": ["@tailwindcss/vite"]
    }
  },
  "cssVars": {
    "light": {
      "--blur-sm": "8px",
      "--blur-md": "16px",
      "--blur-lg": "24px"
    },
    "dark": {
      "--blur-sm": "8px",
      "--blur-md": "16px",
      "--blur-lg": "24px"
    }
  }
}
```

**Ключевые поля:**
- `name` - component name (для CLI: `npx shadcn add button-glass`)
- `type` - тип компонента (`components:ui`, `components:atomic`, etc.)
- `dependencies` - npm зависимости
- `registryDependencies` - другие компоненты из registry (например, `cn` utility)
- `files` - файлы компонента с содержимым
- `tailwind` - Tailwind конфигурация
- `cssVars` - CSS переменные для темизации

---

### 4.3. Главный Registry Index

**Файл:** `registry/registry.json`

```json
{
  "name": "shadcn-glass-ui",
  "version": "1.0.0",
  "description": "Modern glassmorphism UI component library",
  "homepage": "https://yhooi2.github.io/shadcn-glass-ui-library/",
  "repository": "https://github.com/Yhooi2/shadcn-glass-ui-library",
  "categories": [
    "ui",
    "atomic",
    "specialized",
    "composite",
    "sections"
  ],
  "components": [
    {
      "name": "button-glass",
      "type": "components:ui",
      "description": "Glassmorphism button",
      "path": "/registry/components/ui/button-glass.json",
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/registry/components/ui/button-glass.json"
    },
    {
      "name": "input-glass",
      "type": "components:ui",
      "description": "Glassmorphism input field",
      "path": "/registry/components/ui/input-glass.json",
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/registry/components/ui/input-glass.json"
    }
    // ... все 55 компонентов
  ],
  "utils": [
    {
      "name": "cn",
      "description": "Class name utility",
      "path": "/registry/utils/cn.json",
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/registry/utils/cn.json"
    },
    {
      "name": "theme-context",
      "description": "Theme provider and hooks",
      "path": "/registry/utils/theme-context.json",
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/registry/utils/theme-context.json"
    }
  ],
  "hooks": [
    {
      "name": "use-theme",
      "description": "Theme hook",
      "path": "/registry/hooks/use-theme.json",
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/registry/hooks/use-theme.json"
    }
  ]
}
```

---

### 4.4. Генерация Registry (автоматизация)

**Опция 1: Скрипт для генерации registry JSON**

**Файл:** `scripts/generate-registry.ts` (**СОЗДАТЬ НОВЫЙ**)

```typescript
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ComponentMetadata {
  name: string;
  type: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: Array<{ name: string; content: string }>;
}

async function generateRegistry() {
  const components = await glob('src/components/glass/**/*.tsx', {
    ignore: ['**/*.test.tsx', '**/*.stories.tsx']
  });

  const registry: ComponentMetadata[] = [];

  for (const componentPath of components) {
    const content = fs.readFileSync(componentPath, 'utf-8');
    const name = path.basename(componentPath, '.tsx');
    const category = componentPath.includes('/ui/')
      ? 'ui'
      : componentPath.includes('/atomic/')
      ? 'atomic'
      : componentPath.includes('/specialized/')
      ? 'specialized'
      : componentPath.includes('/composite/')
      ? 'composite'
      : 'sections';

    // Парсим dependencies из import statements
    const dependencies = parseDependencies(content);

    const metadata: ComponentMetadata = {
      name,
      type: `components:${category}`,
      description: extractDescription(content),
      dependencies,
      registryDependencies: extractRegistryDeps(content),
      files: [
        {
          name: `${name}.tsx`,
          content: Buffer.from(content).toString('base64'), // base64 encoding
        },
      ],
    };

    registry.push(metadata);

    // Записываем отдельный JSON для каждого компонента
    const outputDir = `registry/components/${category}`;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      `${outputDir}/${name}.json`,
      JSON.stringify(metadata, null, 2)
    );
  }

  // Генерируем главный registry.json
  const mainRegistry = {
    name: 'shadcn-glass-ui',
    version: '1.0.0',
    components: registry.map((c) => ({
      name: c.name,
      type: c.type,
      description: c.description,
      path: `/registry/components/${c.type.split(':')[1]}/${c.name}.json`,
      url: `https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/registry/components/${c.type.split(':')[1]}/${c.name}.json`,
    })),
  };

  fs.writeFileSync('registry/registry.json', JSON.stringify(mainRegistry, null, 2));

  console.log(`✅ Generated registry for ${registry.length} components`);
}

function parseDependencies(content: string): string[] {
  const deps: Set<string> = new Set();
  const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      deps.add(importPath);
    }
  }

  return Array.from(deps);
}

function extractDescription(content: string): string {
  // Извлекаем description из JSDoc комментариев
  const descRegex = /\/\*\*\s*\n\s*\*\s*(.+?)\n/;
  const match = content.match(descRegex);
  return match ? match[1] : '';
}

function extractRegistryDeps(content: string): string[] {
  const deps: Set<string> = new Set();
  const importRegex = /import\s+.*\s+from\s+['"]@\/lib\/(.+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    deps.add(match[1].replace(/\//g, '-'));
  }

  return Array.from(deps);
}

generateRegistry().catch(console.error);
```

**Добавить скрипт в package.json:**

```json
{
  "scripts": {
    "generate:registry": "tsx scripts/generate-registry.ts"
  }
}
```

**Установить tsx:**

```bash
npm install --save-dev tsx
```

**Запуск:**

```bash
npm run generate:registry
```

**Опция 2: Ручное создание registry JSON**

Если автоматизация сложна, можно создавать JSON файлы вручную для ключевых компонентов (ButtonGlass, InputGlass, ModalGlass).

---

### 4.5. Использование Registry

Пользователи смогут добавлять компоненты через shadcn CLI:

```bash
# Установить ButtonGlass
npx shadcn@latest add @shadcn-glass-ui/button-glass

# Установить несколько компонентов
npx shadcn@latest add @shadcn-glass-ui/button-glass @shadcn-glass-ui/input-glass

# Установить все UI компоненты
npx shadcn@latest add @shadcn-glass-ui/ui
```

**Что происходит:**
1. shadcn CLI читает registry.json
2. Скачивает button-glass.json
3. Извлекает файлы компонента
4. Копирует в `components/ui/button-glass.tsx`
5. Устанавливает npm dependencies
6. Обновляет Tailwind config

---

## ЭТАП 5: ФИНАЛИЗАЦИЯ (~7 часов)

### Цель
Завершить публикацию: обновить документацию, создать анонс, настроить мониторинг.

### Задачи

- [ ] Обновить все ссылки в документации
- [ ] Создать GitHub Release
- [ ] Создать CHANGELOG.md
- [ ] Настроить автоматизацию (CI/CD для npm publish)
- [ ] Создать анонс (Twitter, Reddit, Dev.to)
- [ ] Настроить мониторинг (badges)

---

### 5.1. Обновить все ссылки в документации

**Файлы для обновления:**

#### 1. README.md

Обновить ссылки и добавить badges:

```markdown
# shadcn-glass-ui

[![npm version](https://img.shields.io/npm/v/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![npm downloads](https://img.shields.io/npm/dm/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![License](https://img.shields.io/npm/l/shadcn-glass-ui.svg)](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/main/LICENSE)
[![CI](https://github.com/Yhooi2/shadcn-glass-ui-library/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/Yhooi2/shadcn-glass-ui-library/actions)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/shadcn-glass-ui)](https://bundlephobia.com/package/shadcn-glass-ui)

Modern glassmorphism UI component library for React with full shadcn/ui compatibility.

## 📚 Documentation

- **[Live Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)** - Interactive demos
- **[npm Package](https://www.npmjs.com/package/shadcn-glass-ui)** - Installation
- **[Getting Started](docs/GETTING_STARTED.md)** - Tutorial
- **[GitHub](https://github.com/Yhooi2/shadcn-glass-ui-library)** - Source code

## 📦 Installation

\`\`\`bash
npm install shadcn-glass-ui
\`\`\`

## 🚀 Quick Start

\`\`\`tsx
import { ButtonGlass, ThemeProvider } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <ButtonGlass variant="primary">Click me</ButtonGlass>
    </ThemeProvider>
  );
}
\`\`\`
```

#### 2. CONTRIBUTING.md

Обновить процесс контрибуции:

```markdown
## Getting Started

1. Fork the repository: https://github.com/Yhooi2/shadcn-glass-ui-library/fork
2. Clone your fork
3. Create a branch
4. Make changes
5. Submit a pull request
```

#### 3. docs/GETTING_STARTED.md

Обновить инструкции по установке с реальным npm package:

```markdown
## Installation

\`\`\`bash
npm install shadcn-glass-ui react react-dom tailwindcss
\`\`\`

## Usage

\`\`\`tsx
import { ButtonGlass, InputGlass } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';
\`\`\`
```

#### 4. package.json

Обновить URLs:

```json
{
  "homepage": "https://yhooi2.github.io/shadcn-glass-ui-library/",
  "repository": {
    "url": "https://github.com/Yhooi2/shadcn-glass-ui-library.git"
  },
  "bugs": "https://github.com/Yhooi2/shadcn-glass-ui-library/issues"
}
```

---

### 5.2. Создать GitHub Release

**Шаг 1:** Перейти в Releases:

```
https://github.com/Yhooi2/shadcn-glass-ui-library/releases/new
```

**Шаг 2:** Заполнить форму:

- **Tag version:** `v1.0.0`
- **Release title:** `v1.0.0 - Initial Release`
- **Description:**

```markdown
# shadcn-glass-ui v1.0.0 - Initial Release

We're excited to announce the first stable release of **shadcn-glass-ui** - a modern glassmorphism UI component library for React!

## ✨ Highlights

- 🎨 **55+ Components** - Core UI (18) + Atomic (6) + Specialized (8) + Composite (13) + Sections (7) + Primitives (3)
- 🌈 **3 Themes** - Glass (dark), Light, Aurora (gradient)
- 🔮 **Advanced Patterns** - asChild polymorphic rendering, Compound components (Modal, Tabs)
- ♿ **WCAG 2.1 AA** - Full accessibility compliance
- 📱 **Touch Optimized** - 44×44px minimum touch targets
- ⚡ **Modern Stack** - React 19, Tailwind v4, Vitest 4, Storybook 10
- 🧪 **704 Tests** - 99.5% passing
- 📦 **shadcn Compatible** - Works seamlessly with shadcn/ui

## 📦 Installation

\`\`\`bash
npm install shadcn-glass-ui
\`\`\`

## 📚 Documentation

- **[Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)** - Live demos
- **[Getting Started](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/main/docs/GETTING_STARTED.md)** - Tutorial
- **[Component Docs](https://github.com/Yhooi2/shadcn-glass-ui-library#component-categories)** - All components

## 🚀 Quick Start

\`\`\`tsx
import { ButtonGlass, InputGlass, ThemeProvider } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <ButtonGlass variant="primary">Click me</ButtonGlass>
      <InputGlass placeholder="Enter text..." />
    </ThemeProvider>
  );
}
\`\`\`

## 📝 Changelog

See [CHANGELOG.md](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/main/CHANGELOG.md) for details.

## 🙏 Credits

Built with [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/).

---

**Full Changelog**: https://github.com/Yhooi2/shadcn-glass-ui-library/commits/v1.0.0
```

**Шаг 3:** Опубликовать Release

---

### 5.3. Создать CHANGELOG.md

**Файл:** `CHANGELOG.md` (**СОЗДАТЬ НОВЫЙ**)

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-05

### ⚠️ BREAKING CHANGES

Initial release - no breaking changes from previous versions.

### ✨ Added

#### Core UI Components (18)
- ButtonGlass - Glassmorphism button with 6 variants and 3 sizes
- InputGlass - Text input field with glass effects
- CheckboxGlass - Checkbox with glass styling
- ToggleGlass - Toggle switch with glass effects
- SliderGlass - Range slider with glass styling
- ModalGlass - Modal dialog with compound API
- TabsGlass - Tabbed interface with compound API
- DropdownGlass - Dropdown menu with glass effects
- TooltipGlass - Tooltip with glass styling
- AlertGlass - Alert component with 4 variants
- NotificationGlass - Notification toast with 4 variants
- BadgeGlass - Badge component with 7 variants
- AvatarGlass - Avatar component with status indicator support
- GlassCard - Card component with 4 glass variants
- ProgressGlass - Progress bar with glass effects
- CircularProgressGlass - Circular progress indicator
- SkeletonGlass - Loading skeleton with glass effects
- ComboBoxGlass - Combobox with search and filtering
- PopoverGlass - Popover with glass effects

#### Atomic Components (6)
- IconButtonGlass - Icon-only button
- ThemeToggleGlass - Theme switcher button
- SearchBoxGlass - Search input with icon
- SortDropdownGlass - Sorting dropdown
- StatItemGlass - Stat display item
- ExpandableHeaderGlass - Expandable section header

#### Specialized Components (8)
- StatusIndicatorGlass - Status dots with glow
- SegmentedControlGlass - Segmented button group
- RainbowProgressGlass - Rainbow gradient progress bar
- LanguageBarGlass - Language proficiency bar
- ProfileAvatarGlass - Large avatar with glow animation
- FlagAlertGlass - Warning/danger flag alert
- ProgressGlass - Advanced progress bar
- BaseProgressGlass - Base progress component

#### Composite Components (13)
- MetricCardGlass - Metric display card with progress
- YearCardGlass - Year card for timeline
- AICardGlass - AI summary card with features
- RepositoryCardGlass - Repository card with expandable details
- TrustScoreDisplayGlass - Trust score display
- CareerStatsHeaderGlass - Career stats header
- CircularMetricGlass - Circular metric display
- ContributionMetricsGlass - Contribution metrics
- MetricsGridGlass - Metrics grid layout
- RepositoryHeaderGlass - Repository header
- RepositoryMetadataGlass - Repository metadata
- UserInfoGlass - User info display
- UserStatsLineGlass - User stats line

#### Section Components (7)
- HeaderNavGlass - Navigation header with search
- ProfileHeaderGlass - User profile header with avatar, stats, languages
- CareerStatsGlass - Career statistics with expandable year cards
- FlagsSectionGlass - Expandable flags/warnings section
- TrustScoreCardGlass - Trust score card with metrics
- ProjectsListGlass - Projects list
- HeaderBrandingGlass - Branded header

#### Primitive Components (3)
- TouchTarget - Touch-friendly wrapper (44px minimum)
- FormFieldWrapper - Unified form field structure
- InteractiveCard - Hover animations + glass effects

#### Utilities & Hooks
- cn() - Class name merging utility (clsx + tailwind-merge)
- ThemeProvider - Theme context provider
- useTheme - Theme hook
- useFocus - Focus state hook
- useHover - Hover state hook
- useResponsive - Responsive breakpoint hook
- useWallpaperTint - Wallpaper tint hook

#### Design System
- 3 themes (Glass, Light, Aurora)
- 85 CSS variables (optimized from 200)
- CVA variants for all components
- WCAG 2.1 AA compliance
- Touch target optimization (44×44px Apple HIG)
- 4 Glass variants (glass, frosted, fluted, crystal)

#### Testing
- 704 total tests (99.5% pass rate)
- 125 unit tests
- 579 visual regression tests
- Automated a11y testing via Storybook

#### Documentation
- 46 Storybook stories
- Component API docs with ArgTypes
- Getting Started guide
- Migration guides
- UI Design System specification
- Performance guide
- Accessibility guide
- Troubleshooting guide

### Tech Stack

- React 19.2
- TypeScript 5.9 (strict mode)
- Tailwind CSS 4.1 (CSS-first)
- Vite 7 (rolldown-vite bundler)
- Storybook 10.1 (ESM-only)
- Vitest 4.0 (browser mode + visual regression)
- Radix UI primitives

### Package Distribution

- ESM (`dist/index.js`)
- CommonJS (`dist/index.cjs`)
- TypeScript types (`dist/index.d.ts`)
- CSS bundle (`dist/styles.css`)
- Source maps included

[1.0.0]: https://github.com/Yhooi2/shadcn-glass-ui-library/releases/tag/v1.0.0
```

---

### 5.4. Настроить автоматизацию (CI/CD для npm publish)

**Файл:** `.github/workflows/publish.yml` (**СОЗДАТЬ НОВЫЙ**)

Автоматическая публикация в npm при создании GitHub Release:

```yaml
name: Publish to npm

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build library
        run: npm run build:lib

      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Создать NPM_TOKEN secret:**

1. Перейти на [npmjs.com](https://www.npmjs.com/)
2. Account Settings → Access Tokens → Generate New Token
3. Выбрать **Automation**
4. Скопировать token
5. В GitHub: Settings → Secrets and variables → Actions → New repository secret
6. Name: `NPM_TOKEN`
7. Value: [вставить token]
8. Add secret

**Теперь при создании GitHub Release автоматически произойдет npm publish!**

---

### 5.5. Создать анонс (Marketing)

#### Twitter / X

```
🎉 Introducing shadcn-glass-ui v1.0.0!

Modern glassmorphism UI components for React with full shadcn/ui compatibility.

✨ 55+ components
🌈 3 themes (Glass, Light, Aurora)
♿ WCAG 2.1 AA
⚡ React 19 + Tailwind v4
📦 Tree-shakeable ESM
🧪 704 tests (99.5% pass)

npm install shadcn-glass-ui

📚 Docs: https://yhooi2.github.io/shadcn-glass-ui-library/
🎨 Demo: [Storybook URL]
💻 GitHub: https://github.com/Yhooi2/shadcn-glass-ui-library

#React #UI #Glassmorphism #shadcn #TailwindCSS #TypeScript
```

#### Reddit (r/reactjs, r/webdev)

**Title:** `[Project] shadcn-glass-ui - Modern Glassmorphism UI Component Library for React`

**Body:**

```markdown
Hey everyone! I'm excited to share **shadcn-glass-ui** - a glassmorphism UI component library for React that's fully compatible with shadcn/ui.

## What is it?

A modern UI component library with beautiful glassmorphism effects, built on top of Radix UI primitives and styled with Tailwind CSS v4.

## Key Features

- **55+ components** - Buttons, Inputs, Modals, Progress bars, Cards, Avatars, etc.
- **3 built-in themes** - Glass (dark), Light, Aurora (gradient)
- **Full TypeScript support** - Strict types for all components
- **WCAG 2.1 AA accessible** - Proper contrast, keyboard navigation, screen readers
- **Tree-shakeable ESM exports** - Only bundle what you use
- **Works with shadcn/ui** - Can mix and match components

## Tech Stack

- React 19.2
- Tailwind CSS 4.1 (CSS-first)
- Radix UI
- Vite 7 (Rolldown bundler - 3-16x faster builds)
- Vitest 4 (704 tests, 99.5% passing)
- Storybook 10 (live demos)

## Installation

\`\`\`bash
npm install shadcn-glass-ui
\`\`\`

## Quick Start

\`\`\`tsx
import { ButtonGlass, InputGlass, ThemeProvider } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <ButtonGlass variant="primary">Click me</ButtonGlass>
      <InputGlass placeholder="Enter text..." />
    </ThemeProvider>
  );
}
\`\`\`

## Links

- **npm:** https://www.npmjs.com/package/shadcn-glass-ui
- **GitHub:** https://github.com/Yhooi2/shadcn-glass-ui-library
- **Storybook (Live Demo):** https://yhooi2.github.io/shadcn-glass-ui-library/
- **Docs:** https://github.com/Yhooi2/shadcn-glass-ui-library/blob/main/docs/GETTING_STARTED.md

## What makes it unique?

1. **Aurora theme** - Unique gradient glassmorphism theme
2. **Modern stack** - React 19, Tailwind v4, latest everything
3. **Visual regression tests** - 579 tests ensure quality
4. **Business-ready components** - MetricCard, TrustScore, ProfileHeader, etc.
5. **Real demo** - GitHub Analytics dashboard (Desktop + Mobile)
6. **4 Glass variants** - glass, frosted, fluted, crystal

Would love to hear your feedback! Let me know if you have any questions.

---

**Disclaimer:** I built this as a learning project. It's production-ready but still evolving. Contributions welcome!
```

#### Dev.to

**Title:** `Building a Modern Glassmorphism UI Library with React 19 and Tailwind v4`

**Tags:** `react`, `typescript`, `tailwindcss`, `ui`

**Body:** (полноценная статья с примерами кода, скриншотами, историей создания)

---

### 5.6. Настроить мониторинг

Добавить badges в README.md:

```markdown
[![npm version](https://img.shields.io/npm/v/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![npm downloads](https://img.shields.io/npm/dm/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![License](https://img.shields.io/npm/l/shadcn-glass-ui.svg)](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/main/LICENSE)
[![CI](https://github.com/Yhooi2/shadcn-glass-ui-library/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/Yhooi2/shadcn-glass-ui-library/actions)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/shadcn-glass-ui)](https://bundlephobia.com/package/shadcn-glass-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-blue)](https://tailwindcss.com/)
```

---

## ЧЕКЛИСТЫ

### Pre-Release Checklist

- [ ] **Все тесты проходят**
  ```bash
  npm run test:all
  ```

- [ ] **Lint без ошибок**
  ```bash
  npm run lint
  ```

- [ ] **TypeScript без ошибок**
  ```bash
  npx tsc --noEmit
  ```

- [ ] **Visual tests обновлены**
  ```bash
  npm run test:visual:update
  ```

- [ ] **Storybook собирается**
  ```bash
  npm run build-storybook
  ```

- [ ] **Library build работает**
  ```bash
  npm run build:lib
  ```

- [ ] **package.json обновлён**
  - [ ] `"private": false`
  - [ ] `"name"`: правильное имя
  - [ ] `"version": "1.0.0"`
  - [ ] `"author"`: ваше имя и email
  - [ ] `"repository"`: правильный URL
  - [ ] `"homepage"`: правильный URL
  - [ ] `"exports"`: все entry points

- [ ] **peerDependencies настроены правильно**
  ```bash
  # React и React-DOM должны быть в devDependencies, не в dependencies
  grep -A5 '"devDependencies"' package.json | grep -E '"react":|"react-dom"'
  # peerDependencies должны существовать
  grep -A5 '"peerDependencies"' package.json
  ```

- [ ] **sideEffects настроены для CSS**
  ```bash
  grep '"sideEffects"' package.json
  ```

- [ ] **README.md обновлён**
  - [ ] Все ссылки работают
  - [ ] Badges добавлены
  - [ ] Installation инструкции правильные

- [ ] **CHANGELOG.md создан**

- [ ] **LICENSE файл присутствует** (MIT)

- [ ] **Git tags созданы**
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```

- [ ] **npm dry-run успешен**
  ```bash
  npm publish --dry-run
  ```

- [ ] **Локальное тестирование пакета**
  ```bash
  npm pack
  # test install в другом проекте
  ```

---

### Post-Release Checklist

- [ ] **npm package опубликован**
  ```bash
  npm info shadcn-glass-ui
  ```

- [ ] **GitHub Release создан**
  - https://github.com/Yhooi2/shadcn-glass-ui-library/releases/tag/v1.0.0

- [ ] **Storybook задеплоен на GitHub Pages**
  - https://yhooi2.github.io/shadcn-glass-ui-library/

- [ ] **README badges обновлены** и работают

- [ ] **Анонс опубликован**
  - [ ] Twitter/X
  - [ ] Reddit (r/reactjs, r/webdev)
  - [ ] Dev.to

- [ ] **Мониторинг настроен**
  - [ ] npm stats
  - [ ] GitHub Actions status
  - [ ] Bundle size

- [ ] **Автоматическая публикация настроена**
  - [ ] `.github/workflows/publish.yml` создан
  - [ ] NPM_TOKEN secret добавлен в GitHub

---

## ROLLBACK СТРАТЕГИЯ

### Если критическая ошибка в npm package

#### В течение 24 часов:

```bash
npm unpublish shadcn-glass-ui@1.0.0
```

**Примечание:** npm позволяет unpublish только в течение 24 часов после публикации.

#### После 24 часов:

```bash
npm deprecate shadcn-glass-ui@1.0.0 "Critical bug, please upgrade to 1.0.1"
```

**Затем:**

1. Исправить баг
2. Bump версию в `package.json`: `"version": "1.0.1"`
3. Создать новый git tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
4. Повторить публикацию:
   ```bash
   npm publish --access public
   ```
5. Создать новый GitHub Release для v1.0.1

---

### Если проблемы со Storybook deployment

1. **Откатить коммит с workflow changes:**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **Исправить конфигурацию** в `.github/workflows/ci.yml` или `.storybook/main.ts`

3. **Push снова:**
   ```bash
   git add .github/workflows/ci.yml
   git commit -m "fix: correct Storybook deployment config"
   git push origin main
   ```

---

## ПРИМЕРНЫЙ TIMELINE

| Неделя | Этап | Время | Задачи |
|--------|------|-------|--------|
| **1** | Подготовка | ~7 часов | Создать entry points, обновить конфиги, тестовая сборка |
| **2** | npm Package | ~4 часа | Локальное тестирование, npm publish, проверка |
| **3** | Storybook | ~3 часа | GitHub Pages деплой, обновить README |
| **4** | Registry (опц.) | ~10 часов | Создать registry JSON, автоматизация |
| **5** | Финализация | ~7 часов | Документация, GitHub Release, анонс, мониторинг |

**Итого:** 31 час (без Registry) или 41 час (с Registry)

---

## ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

### Документация

- [npm publish docs](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [GitHub Pages docs](https://docs.github.com/en/pages)
- [Vite library mode](https://vitejs.dev/guide/build.html#library-mode)
- [TypeScript declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

### Инструменты

- [Bundlephobia](https://bundlephobia.com/) - проверка размера пакета
- [npm semver calculator](https://semver.npmjs.com/) - проверка версий
- [Can I Use](https://caniuse.com/) - проверка browser compatibility

---

**Конец детального плана публикации**
