# Architecture Research: shadcn/ui Design System

> **Note:** This document is an architectural research study conducted during the initial design phase.
> For the authoritative design specifications, see [UI_DESIGN.md](design-system/UI_DESIGN.md).
>
> **Date:** December 2024

---

# Исследование: Архитектура дизайн-системы на базе shadcn/ui

## Part 1: Executive Summary

**Главный вывод: Рекомендую Hybrid подход с фокусом на Custom Registry**

После анализа экосистемы, технических ограничений и существующих решений, рекомендую **Hybrid
модель** с приоритетом на **shadcn Registry** как primary delivery mechanism.

**Почему не чистый CSS Overlay:**

- shadcn компоненты используют hardcoded Tailwind классы в CVA variants (например, `bg-primary`,
  `hover:bg-primary/90`)
- Glassmorphism требует `backdrop-filter: blur()`, который **нельзя** добавить через CSS переменные
  — нужен класс в JSX
- Существующие glassmorphism решения (glasscn-ui) пошли путём **component replacement**, а не
  overlay

**Почему Registry подход оптимален для твоей аудитории:**

- Shadcn CLI позволяет запустить свой собственный code registry, который распространяет кастомные
  компоненты, хуки, страницы и конфиги в любой проект
- Твоя аудитория (shadcn разработчики) уже знакома с `npx shadcn add` workflow
- Минимальное трение при adoption

---

## Part 2: Technical Feasibility Analysis

### 2.1 CSS Overlay Approach — Частично возможен

**Что МОЖНО сделать через CSS variables:**

shadcn использует CSS variables для цветов: `--background`, `--foreground`, `--card`, `--primary`,
`--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`

Полный список переменных shadcn:

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  /* + chart colors, sidebar colors */
}
```

**Что НЕЛЬЗЯ сделать без изменения JSX:**

1. **backdrop-filter: blur()** — нет CSS переменной для этого
2. **Дополнительные классы** типа `backdrop-blur-xl`, `bg-white/10`
3. **Изменение opacity через Tailwind** — классы типа `bg-primary/90` hardcoded в компонентах

Button variants в shadcn используют hardcoded классы:
`"bg-primary text-primary-foreground hover:bg-primary/90"`,
`"bg-destructive text-destructive-foreground hover:bg-destructive/90"`,
`"border border-input bg-background hover:bg-accent"`

**Вывод:** Pure CSS overlay **недостаточен** для glassmorphism. Можно изменить цвета, но не добавить
blur effects.

### 2.2 Component Replacement Approach — Работает

glasscn-ui использует именно этот подход: все компоненты с solid surfaces получают новые props для
glassmorphic стиля (`glass`, `blur`), а library поставляется как npm package с Tailwind preset

**Как работает glasscn-ui:**

```tsx
// Новые props для glassmorphism
<Card glass blur="md">...</Card>
<Dialog glass>...</Dialog>
```

**Как поставляется:**

```ts
// tailwind.config.js
import { createTailwindPreset } from 'glasscn-ui';

const glasscnPreset = createTailwindPreset({
  baseRadius: '0.5em',
  colors: {
    primary: 'blue',
    // ...
  },
});

export default {
  content: ['./node_modules/glasscn-ui/dist/index.js'],
  presets: [glasscnPreset],
};
```

### 2.3 Registry Approach — Оптимальный для твоего случая

shadcn registry позволяет определить структурированную коллекцию компонентов, хуков и файлов,
которые устанавливаются в проекты через CLI. В отличие от ручного копирования, registry предлагает
эффективный способ поддержания консистентности с гибкостью для кастомизации

**Преимущества:**

- Пользователь выбирает какие компоненты установить
- Код копируется в проект — полный контроль
- Работает с существующим shadcn setup
- Уже есть Glass UI в официальном directory: "@crenspire/glass-ui — 40+ glassmorphic
  React/TypeScript components с Apple-inspired дизайном, glow/shimmer/ripple эффектами"

---

## Part 3: Ecosystem Analysis

### 3.1 Существующие решения

| Name                    | Approach              | GitHub/URL                    | Активность          | Плюсы                                        | Минусы                            |
| ----------------------- | --------------------- | ----------------------------- | ------------------- | -------------------------------------------- | --------------------------------- |
| **glasscn-ui**          | npm + Tailwind Preset | github.com/itsjavi/glasscn-ui | Активен             | Полная glassmorphism интеграция, props-based | Требует полной замены компонентов |
| **@crenspire/glass-ui** | shadcn Registry       | glass-ui.crenspire.com        | Новый (3 weeks ago) | 40+ компонентов, official directory          | Может быть прямым конкурентом     |
| **tweakcn**             | Theme Editor          | tweakcn.com                   | Активен             | Visual editor, Tailwind v4                   | Только цвета, не glassmorphism    |
| **shadcn-custom-theme** | CLI tool              | github.com/kiliman            | Средне              | Генерирует CSS vars                          | Только цвета                      |

### 3.2 Market Gap — Где твоя уникальность?

**Что уже существует:**

- Glassmorphism компоненты (glasscn-ui, Glass UI)
- Theme generators (tweakcn, shadcn-custom-theme)
- Theme editors

**Чего не хватает:**

1. **Multi-theme system** (Glass + Light + Aurora в одном пакете)
2. **Hybrid delivery** (overlay для базовых изменений + registry для полных компонентов)
3. **Optimized CSS architecture** (твоя работа над 80-100 переменных)
4. **Tailwind v4 native** с @theme directive

---

## Part 4: Design System Architecture

### 4.1 Предлагаемая структура Design Tokens

```css
/* ============================================
   LEVEL 1: PRIMITIVES (базовые значения)
   ============================================ */

/* Opacity Scale */
--glass-opacity-5: 0.05;
--glass-opacity-10: 0.1;
--glass-opacity-15: 0.15;
--glass-opacity-20: 0.2;
--glass-opacity-30: 0.3;

/* Blur Scale */
--glass-blur-sm: 4px;
--glass-blur-md: 8px;
--glass-blur-lg: 12px;
--glass-blur-xl: 16px;
--glass-blur-2xl: 24px;

/* Border opacity */
--glass-border-opacity: 0.1;

/* Shadow/Glow primitives */
--glow-spread-sm: 10px;
--glow-spread-md: 20px;
--glow-spread-lg: 40px;

/* ============================================
   LEVEL 2: SEMANTIC TOKENS
   ============================================ */

/* Surfaces */
--surface-glass: oklch(1 0 0 / var(--glass-opacity-10));
--surface-glass-hover: oklch(1 0 0 / var(--glass-opacity-15));
--surface-glass-active: oklch(1 0 0 / var(--glass-opacity-20));

/* Borders */
--border-glass: oklch(1 0 0 / var(--glass-border-opacity));

/* Blur contexts */
--blur-surface: var(--glass-blur-lg);
--blur-overlay: var(--glass-blur-xl);
--blur-subtle: var(--glass-blur-sm);

/* ============================================
   LEVEL 3: COMPONENT TOKENS
   ============================================ */

/* Button */
--button-glass-bg: var(--surface-glass);
--button-glass-bg-hover: var(--surface-glass-hover);
--button-glass-border: var(--border-glass);
--button-glass-blur: var(--blur-surface);

/* Card */
--card-glass-bg: var(--surface-glass);
--card-glass-border: var(--border-glass);
--card-glass-blur: var(--blur-surface);
--card-glass-shadow: 0 4px 30px oklch(0 0 0 / 0.1);

/* Input */
--input-glass-bg: oklch(1 0 0 / var(--glass-opacity-5));
--input-glass-border: var(--border-glass);
--input-glass-blur: var(--blur-subtle);
```

### 4.2 Предлагаемая структура файлов

```
glass-ui/
├── registry/
│   ├── registry.json           # Main registry definition
│   └── new-york/               # Style variant
│       ├── button/
│       │   └── button.tsx
│       ├── card/
│       │   └── card.tsx
│       ├── input/
│       │   └── input.tsx
│       └── ...
│
├── src/
│   ├── styles/
│   │   ├── themes/
│   │   │   ├── glass.css       # Glass theme tokens
│   │   │   ├── light.css       # Light theme tokens
│   │   │   └── aurora.css      # Aurora theme tokens
│   │   ├── primitives.css      # Base design tokens
│   │   └── index.css           # Main export
│   │
│   ├── tailwind/
│   │   └── preset.ts           # Tailwind preset
│   │
│   └── index.ts                # Main exports
│
├── public/
│   └── r/                      # Built registry JSON files
│       ├── button.json
│       ├── card.json
│       └── ...
│
└── package.json
```

### 4.3 Scales & Systems

**Spacing Scale** (совместим с Tailwind):

```css
--spacing-0: 0;
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px */
```

**Radius Scale**:

```css
--radius-none: 0;
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.5rem; /* 8px - default */
--radius-lg: 0.75rem; /* 12px */
--radius-xl: 1rem; /* 16px */
--radius-2xl: 1.5rem; /* 24px */
--radius-full: 9999px;
```

---

## Part 5: Integration Strategy

### 5.1 shadcn Variables Mapping

```css
/* shadcn default → Glass override */

/* Background colors - добавляем transparency */
--background: oklch(1 0 0); /* Keep solid for body */
--card: oklch(1 0 0 / 0.1); /* Make translucent */
--popover: oklch(1 0 0 / 0.15); /* Slightly more opaque */

/* For dark mode */
.dark {
  --card: oklch(0.2 0 0 / 0.1);
  --popover: oklch(0.2 0 0 / 0.15);
}

/* Add new glass-specific tokens */
--glass-blur: 12px;
--glass-border: oklch(1 0 0 / 0.1);
--glass-shadow: 0 4px 30px oklch(0 0 0 / 0.1);
```

### 5.2 Tailwind Plugin/Preset Strategy

```ts
// src/tailwind/preset.ts
import type { Config } from 'tailwindcss';

export const glassPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        glass: {
          DEFAULT: 'oklch(1 0 0 / 0.1)',
          hover: 'oklch(1 0 0 / 0.15)',
          border: 'oklch(1 0 0 / 0.1)',
        },
      },
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        glass: '0 4px 30px oklch(0 0 0 / 0.1)',
        'glass-glow': '0 0 20px oklch(var(--primary) / 0.3)',
      },
    },
  },
};
```

### 5.3 Package.json Exports

```json
{
  "name": "@your-name/glass-ui",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles/index.css",
    "./styles/glass": "./dist/styles/themes/glass.css",
    "./styles/light": "./dist/styles/themes/light.css",
    "./styles/aurora": "./dist/styles/themes/aurora.css",
    "./preset": {
      "import": "./dist/tailwind/preset.js",
      "types": "./dist/tailwind/preset.d.ts"
    }
  }
}
```

---

## Part 6: User Experience Design

### 6.1 Installation Scenarios

**Scenario A: Existing shadcn project (Overlay mode)**

```bash
# 1. Install package
npm install @your-name/glass-ui

# 2. Add CSS import
# In globals.css:
@import '@your-name/glass-ui/styles/glass';

# 3. (Optional) Add Tailwind preset for utilities
# In tailwind.config.ts:
import { glassPreset } from '@your-name/glass-ui/preset'
export default {
  presets: [glassPreset],
  // ...
}
```

**Результат:** Цвета изменятся, но без blur effects (partial glassmorphism)

**Scenario B: Full glassmorphism (Registry mode)**

```bash
# 1. Add to components.json registries
{
  "registries": {
    "@glass": "https://glass-ui.yoursite.com/r/{name}.json"
  }
}

# 2. Install components
npx shadcn add @glass/button
npx shadcn add @glass/card
npx shadcn add @glass/input

# Or install all
npx shadcn add @glass/all
```

**Результат:** Полный glassmorphism с blur, glow effects

**Scenario C: New project**

```bash
# 1. Init shadcn
npx shadcn@latest init

# 2. Configure glass-ui registry
# (during init or manually in components.json)

# 3. Install glass components
npx shadcn add @glass/button @glass/card
```

---

## Part 7: Recommendations & Roadmap

### 7.1 Final Recommendation

**Рекомендую: Hybrid (Registry-first) подход**

1. **Primary:** shadcn Registry для компонентов
   - Полный контроль над glassmorphism effects
   - Знакомый workflow для shadcn developers
   - Официальная поддержка через directory listing

2. **Secondary:** CSS theme package для простых случаев
   - Для тех кто хочет только изменить цветовую палитру
   - Минимальный bundle size
   - Быстрый onboarding

### 7.2 Implementation Phases

```
Phase 1: Foundation (2-3 недели)
├── Финализировать design tokens architecture
├── Создать Tailwind preset
├── Настроить registry infrastructure
└── Портировать 5 core компонентов: Button, Card, Input, Dialog, Popover

Phase 2: Core Library (3-4 недели)
├── Добавить остальные компоненты (15-20)
├── Документация на основе Storybook
├── Theme switching (Glass/Light/Aurora)
└── Тестирование с Next.js App Router, Pages Router, Vite

Phase 3: Polish & Launch (2 недели)
├── Submit to shadcn Registry Directory
├── Landing page с примерами
├── npm publish
└── Community feedback loop
```

### 7.3 Risk Mitigation

| Риск                                    | Mitigation                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Конкуренция с Glass UI (@crenspire)     | Дифференциация через multi-theme, оптимизированные tokens, лучшую документацию |
| Breaking changes в shadcn               | Pin версии в registryDependencies, мониторить changelog                        |
| Browser compatibility (backdrop-filter) | Graceful degradation с fallback на solid backgrounds                           |
| Maintenance burden                      | Автоматизировать build через CI, использовать shadcn build command             |

---

## Part 8: Key Answers

### ❓ Можно ли сделать glassmorphism overlay ТОЛЬКО через CSS?

**Ответ: НЕТ, не полностью.**

Можно изменить цвета через CSS variables, но:

- `backdrop-filter: blur()` требует класс в JSX
- Opacity в Tailwind классах (типа `bg-primary/90`) hardcoded
- Для полного glassmorphism нужно модифицировать компоненты

### ❓ Какой подход используют другие?

glasscn-ui делает это через component library с Tailwind preset — все компоненты переписаны с
glassmorphic variants как props (glass, blur)

### ❓ Что лучше для пользователя?

Для **твоей аудитории** (shadcn developers) — **Registry approach**, потому что:

- Знакомый `npx shadcn add` workflow
- Код в их проекте — полный контроль
- Можно выбрать отдельные компоненты

### ❓ Реалистично ли поддерживать Hybrid?

**Да**, если чётко разделить:

- **CSS package:** только tokens/variables (low maintenance)
- **Registry:** компоненты с полным glassmorphism (higher maintenance, но автоматизируемо через
  shadcn build)

---

## Resources

**Официальная документация:**

- https://ui.shadcn.com/docs/theming
- https://ui.shadcn.com/docs/registry
- https://ui.shadcn.com/docs/registry/getting-started

**Конкуренты/Референсы:**

- https://github.com/itsjavi/glasscn-ui
- https://glass-ui.crenspire.com/
- https://tweakcn.com/

**Registry Templates:**

- https://github.com/shadcn-ui/registry-template
- https://github.com/vantezzen/shadcn-registry-template

**Theme Tools:**

- https://gradient.page/tools/shadcn-ui-theme-generator
- https://github.com/kiliman/shadcn-custom-theme

---

Хочешь, чтобы я углубился в какой-то конкретный аспект? Например:

1. Детальный код для Tailwind preset
2. Структура registry.json для твоих компонентов
3. Анализ glasscn-ui исходников
4. План миграции твоих существующих компонентов
