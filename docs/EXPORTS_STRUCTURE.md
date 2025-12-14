# Exports Structure

> **AI-Friendly Documentation** - Complete guide to library exports for AI assistants

This document provides a comprehensive guide to all exports from `shadcn-glass-ui` library,
organized by category and hierarchy level.

## Table of Contents

- [Quick Start](#quick-start)
- [Import Patterns](#import-patterns)
- [Component Hierarchy](#component-hierarchy)
- [Complete Export Reference](#complete-export-reference)
- [Type System](#type-system)
- [Utilities & Hooks](#utilities--hooks)

---

## Quick Start

### Essential Imports

```tsx
// Core UI components (most commonly used)
import { ButtonGlass, InputGlass, ModalGlass, GlassCard } from 'shadcn-glass-ui';

// Theme system
import { ThemeProvider, useTheme } from 'shadcn-glass-ui';

// Utility function
import { cn } from 'shadcn-glass-ui';
```

### TypeScript Support

```tsx
import type { ButtonGlassProps, Theme, ThemeConfig } from 'shadcn-glass-ui';
```

---

## Import Patterns

### Pattern 1: Named Imports (Recommended)

```tsx
import { ButtonGlass, InputGlass, useTheme } from 'shadcn-glass-ui';
```

**Pros:**

- Tree-shakable
- Clear dependencies
- Type-safe

### Pattern 2: Type-Only Imports

```tsx
import type { ButtonGlassProps, Theme } from 'shadcn-glass-ui';
```

**Pros:**

- Zero runtime cost
- Explicit type usage

### Pattern 3: Namespace Import (Not Recommended)

```tsx
import * as GlassUI from 'shadcn-glass-ui';

// Usage: <GlassUI.ButtonGlass />
```

**Cons:**

- No tree-shaking
- Larger bundle size

---

## Component Hierarchy

The library uses a 6-level component hierarchy, from primitives to complete sections:

```
Level 0: Primitives (3)      → Foundation building blocks
Level 1: Core UI (18)        → Basic interactive components
Level 2: Atomic (6)          → Small, single-purpose components
Level 3: Specialized (8)     → Domain-specific components
Level 4: Composite (13)      → Multi-component compositions
Level 5: Sections (7)        → Complete page sections
```

### Hierarchy Diagram

```
┌─────────────────────────────────────────────┐
│ LEVEL 5: SECTIONS (7 components)            │
│ HeaderNavGlass, ProfileHeaderGlass, etc.    │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│ LEVEL 4: COMPOSITE (13 components)          │
│ MetricCardGlass, AICardGlass, etc.          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│ LEVEL 3: SPECIALIZED (8 components)         │
│ ProgressGlass, LanguageBarGlass, etc.       │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│ LEVEL 2: ATOMIC (6 components)              │
│ ThemeToggleGlass, SearchBoxGlass, etc.      │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│ LEVEL 1: CORE UI (18 components)            │
│ ButtonGlass, InputGlass, ModalGlass, etc.   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│ LEVEL 0: PRIMITIVES (3 components)          │
│ TouchTarget, FormFieldWrapper, etc.         │
└─────────────────────────────────────────────┘
```

---

## Complete Export Reference

### Level 0: Primitives (3 components)

Foundation components that other components build upon. Rarely used directly in application code.

| Export             | Type      | Description                              | Use Case                        |
| ------------------ | --------- | ---------------------------------------- | ------------------------------- |
| `TouchTarget`      | Component | Touch-friendly wrapper (44/48px minimum) | Wrap small interactive elements |
| `FormFieldWrapper` | Component | Unified form field structure             | Create custom form components   |
| `InteractiveCard`  | Component | Hover animations + glass effects         | Build custom card components    |

**Import:**

```tsx
import { TouchTarget, FormFieldWrapper, InteractiveCard } from 'shadcn-glass-ui';
```

**Example:**

```tsx
<TouchTarget>
  <button className="w-8 h-8">×</button>
</TouchTarget>
```

---

### Level 1: Core UI Components (18 components)

Primary building blocks for application interfaces. These are the most commonly used components.

#### Interactive Controls (7)

| Export          | Description           | Key Props                      | Variants                                              |
| --------------- | --------------------- | ------------------------------ | ----------------------------------------------------- |
| `ButtonGlass`   | Primary action button | `variant`, `size`, `asChild`   | default, secondary, outline, destructive, ghost, link |
| `CheckboxGlass` | Checkbox input        | `checked`, `onCheckedChange`   | -                                                     |
| `ComboBoxGlass` | Searchable dropdown   | `options`, `value`, `onChange` | -                                                     |
| `DropdownGlass` | Dropdown menu         | `items`, `onSelect`, `trigger` | -                                                     |
| `PopoverGlass`  | Popover dialog        | `trigger`, `content`           | -                                                     |
| `SliderGlass`   | Range slider          | `value`, `min`, `max`, `step`  | -                                                     |
| `ToggleGlass`   | Toggle switch         | `pressed`, `onPressedChange`   | -                                                     |

#### Form Elements (2)

| Export       | Description      | Key Props                                        | Variants |
| ------------ | ---------------- | ------------------------------------------------ | -------- |
| `InputGlass` | Text input field | `type`, `placeholder`, `error`                   | -        |
| `TabsGlass`  | Tab navigation   | `defaultValue`, `items` (legacy) OR compound API | -        |

#### Feedback & Display (9)

| Export                  | Description                 | Key Props                                   | Variants                                                         |
| ----------------------- | --------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| `AlertGlass`            | Alert message               | `variant`, `title`, `children`              | default, destructive, success, warning                           |
| `AvatarGlass`           | User avatar                 | `src`, `alt`, `size`, `status`, `asChild`   | -                                                                |
| `BadgeGlass`            | Status badge                | `variant`, `children`                       | default, secondary, destructive, outline, success, warning, info |
| `CircularProgressGlass` | Circular progress indicator | `value`, `size`                             | -                                                                |
| `GlassCard`             | Card container              | `glow`, `intensity`, `asChild`              | -                                                                |
| `ModalGlass`            | Modal dialog                | `size`, `children` (legacy) OR compound API | sm, md, lg, xl, full                                             |
| `NotificationGlass`     | Toast notification          | `variant`, `title`, `message`, `onClose`    | default, destructive, success, warning                           |
| `SkeletonGlass`         | Loading skeleton            | `variant`, `width`, `height`                | text, circle, rectangle                                          |
| `TooltipGlass`          | Tooltip overlay             | `content`, `position`, `children`           | top, bottom, left, right                                         |

**Import:**

```tsx
import {
  ButtonGlass,
  InputGlass,
  CheckboxGlass,
  AlertGlass,
  ModalGlass,
  TabsGlass,
} from 'shadcn-glass-ui';
```

**Example:**

```tsx
// Simple button
<ButtonGlass variant="default" size="md">Click me</ButtonGlass>

// Compound Modal API
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Trigger asChild>
    <ButtonGlass>Open Modal</ButtonGlass>
  </ModalGlass.Trigger>
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Modal Title</ModalGlass.Title>
    </ModalGlass.Header>
    <ModalGlass.Body>Content here</ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>

// Compound Tabs API
<TabsGlass.Root defaultValue="tab1">
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="tab1">Content 1</TabsGlass.Content>
  <TabsGlass.Content value="tab2">Content 2</TabsGlass.Content>
</TabsGlass.Root>
```

---

### Level 2: Atomic Components (6 components)

Small, single-purpose components with focused functionality.

| Export                  | Description                | Key Props                          | Use Case              |
| ----------------------- | -------------------------- | ---------------------------------- | --------------------- |
| `ExpandableHeaderGlass` | Collapsible section header | `title`, `isExpanded`, `onToggle`  | Accordion headers     |
| `IconButtonGlass`       | Icon-only button           | `icon`, `label`, `onClick`         | Toolbars, compact UIs |
| `SearchBoxGlass`        | Search input with icon     | `value`, `onChange`, `placeholder` | Search bars           |
| `SortDropdownGlass`     | Sort options dropdown      | `value`, `options`, `onChange`     | Data tables, lists    |
| `StatItemGlass`         | Single statistic display   | `label`, `value`, `icon`           | Dashboard metrics     |
| `ThemeToggleGlass`      | Theme switcher button      | -                                  | App header            |

**Import:**

```tsx
import { SearchBoxGlass, ThemeToggleGlass, StatItemGlass } from 'shadcn-glass-ui';
```

**Example:**

```tsx
<SearchBoxGlass
  value={search}
  onChange={setSearch}
  placeholder="Search..."
/>

<ThemeToggleGlass />

<StatItemGlass
  label="Total Users"
  value="1,234"
  icon={<Users />}
/>
```

---

### Level 3: Specialized Components (8 components)

Domain-specific components with unique styling or functionality.

#### Progress Indicators (3)

| Export                 | Description                   | Key Props                        | Use Case                    |
| ---------------------- | ----------------------------- | -------------------------------- | --------------------------- |
| `BaseProgressGlass`    | Foundation for progress bars  | `value`, `className`             | Extend for custom progress  |
| `ProgressGlass`        | Standard progress bar         | `value`, `gradient`, `showValue` | Loading, progress tracking  |
| `RainbowProgressGlass` | Multi-color gradient progress | `value`                          | Visual appeal, gamification |

#### Profile & Status (3)

| Export                 | Description              | Key Props                         | Use Case                  |
| ---------------------- | ------------------------ | --------------------------------- | ------------------------- |
| `ProfileAvatarGlass`   | Large avatar with glow   | `src`, `alt`, `size`              | Profile pages             |
| `StatusIndicatorGlass` | Status dot with glow     | `status`, `size`                  | Online/offline indicators |
| `LanguageBarGlass`     | Language proficiency bar | `language`, `percentage`, `color` | Skills display            |

#### UI Controls (2)

| Export                  | Description            | Key Props                      | Use Case        |
| ----------------------- | ---------------------- | ------------------------------ | --------------- |
| `FlagAlertGlass`        | Warning/danger flag    | `variant`, `title`, `message`  | Critical alerts |
| `SegmentedControlGlass` | Segmented button group | `options`, `value`, `onChange` | View switchers  |

**Import:**

```tsx
import { ProgressGlass, RainbowProgressGlass, SegmentedControlGlass } from 'shadcn-glass-ui';
```

**Example:**

```tsx
<ProgressGlass value={75} gradient="default" showValue />

<RainbowProgressGlass value={60} />

<SegmentedControlGlass
  options={['Day', 'Week', 'Month']}
  value="Week"
  onChange={setValue}
/>
```

---

### Level 4: Composite Components (13 components)

Multi-component compositions that combine several elements.

#### Metrics & Stats (4)

| Export                     | Description                     | Contains                 | Use Case               |
| -------------------------- | ------------------------------- | ------------------------ | ---------------------- |
| `CircularMetricGlass`      | Metric with circular progress   | CircularProgressGlass    | KPI displays           |
| `MetricCardGlass`          | Metric display card             | GlassCard, ProgressGlass | Dashboard cards        |
| `MetricsGridGlass`         | Grid of metrics                 | Multiple MetricCardGlass | Dashboard layouts      |
| `ContributionMetricsGlass` | GitHub-style contribution chart | Grid, tooltips           | Activity visualization |

#### User & Profile (3)

| Export               | Description            | Contains                     | Use Case             |
| -------------------- | ---------------------- | ---------------------------- | -------------------- |
| `UserInfoGlass`      | User info display      | AvatarGlass, BadgeGlass      | Profile headers      |
| `UserStatsLineGlass` | Single-line user stats | StatItemGlass (multiple)     | Compact profiles     |
| `AICardGlass`        | AI summary card        | GlassCard, BadgeGlass, icons | AI features showcase |

#### Repository & Career (6)

| Export                    | Description                  | Contains                       | Use Case           |
| ------------------------- | ---------------------------- | ------------------------------ | ------------------ |
| `RepositoryCardGlass`     | Repository card with details | GlassCard, BadgeGlass, buttons | Project listings   |
| `RepositoryHeaderGlass`   | Repository header            | Breadcrumbs, stats             | Repo pages         |
| `RepositoryMetadataGlass` | Repository metadata          | Icons, text, links             | Repo details       |
| `TrustScoreDisplayGlass`  | Trust score indicator        | CircularProgressGlass, badges  | Reputation systems |
| `YearCardGlass`           | Year timeline card           | GlassCard, stats               | Career timelines   |
| `CareerStatsHeaderGlass`  | Career stats header          | Stats, toggle                  | Profile sections   |

**Import:**

```tsx
import { MetricCardGlass, CircularMetricGlass, RepositoryCardGlass } from 'shadcn-glass-ui';
```

**Example:**

```tsx
<MetricCardGlass
  title="Total Commits"
  value={1234}
  progress={75}
  icon={<GitCommit />}
/>

<CircularMetricGlass
  value={85}
  label="Score"
  size="lg"
/>
```

---

### Level 5: Section Components (7 components)

Complete page sections, ready to use with minimal configuration.

| Export                | Description               | Contains                                                 | Use Case          |
| --------------------- | ------------------------- | -------------------------------------------------------- | ----------------- |
| `HeaderNavGlass`      | Navigation header         | SearchBoxGlass, ThemeToggleGlass, ButtonGlass            | App header        |
| `HeaderBrandingGlass` | Brand header section      | Logo, title, links                                       | Landing pages     |
| `ProfileHeaderGlass`  | User profile header       | ProfileAvatarGlass, UserStatsLineGlass, LanguageBarGlass | Profile pages     |
| `TrustScoreCardGlass` | Trust score card section  | TrustScoreDisplayGlass, MetricCardGlass (multiple)       | Reputation pages  |
| `CareerStatsGlass`    | Career statistics section | CareerStatsHeaderGlass, YearCardGlass (multiple)         | Portfolio pages   |
| `FlagsSectionGlass`   | Warnings/flags section    | ExpandableHeaderGlass, FlagAlertGlass (multiple)         | Alert sections    |
| `ProjectsListGlass`   | Projects list section     | SortDropdownGlass, RepositoryCardGlass (multiple)        | Project galleries |

**Import:**

```tsx
import { HeaderNavGlass, ProfileHeaderGlass, CareerStatsGlass } from 'shadcn-glass-ui';
```

**Example:**

```tsx
<HeaderNavGlass
  onSearch={handleSearch}
  userName="John Doe"
/>

<ProfileHeaderGlass
  user={{
    name: "John Doe",
    avatar: "/avatar.jpg",
    stats: { repos: 42, followers: 100 },
    languages: [
      { name: "TypeScript", percentage: 45 },
      { name: "React", percentage: 35 }
    ]
  }}
/>
```

---

## Type System

### Component Props Types

All component prop types are exported with the `*Props` suffix:

```tsx
import type {
  // Core UI
  ButtonGlassProps,
  InputGlassProps,
  ModalSize,

  // Atomic
  SearchBoxGlassProps,

  // Specialized
  ProgressGlassProps,
  ProgressGradient,

  // Common types
  AvatarSize,
  AvatarStatus,
  BadgeVariant,
  AlertType,
  NotificationType,
  SkeletonVariant,
  TooltipPosition,
} from 'shadcn-glass-ui';
```

### Variant Types

CVA (Class Variance Authority) variant types:

```tsx
import type {
  BadgeVariant, // 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
  AlertType, // 'default' | 'destructive' | 'success' | 'warning'
  NotificationType, // 'default' | 'destructive' | 'success' | 'warning'
  SkeletonVariant, // 'text' | 'circle' | 'rectangle'
  TooltipPosition, // 'top' | 'bottom' | 'left' | 'right'
  AvatarSize, // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  AvatarStatus, // 'online' | 'offline' | 'away' | 'busy'
  ModalSize, // 'sm' | 'md' | 'lg' | 'xl' | 'full'
  ProgressGradient, // 'default' | 'rainbow' | 'blue' | 'green' | 'red'
  GlowType, // 'none' | 'subtle' | 'medium' | 'strong'
  IntensityType, // 'low' | 'medium' | 'high'
} from 'shadcn-glass-ui';
```

### Theme Types

```tsx
import type {
  Theme, // 'glass' | 'light' | 'aurora'
  ThemeConfig, // { name: Theme; label: string; }
  ThemeContextValue, // { theme: Theme; setTheme: (theme: Theme) => void; cycleTheme: () => void; }
} from 'shadcn-glass-ui';
```

### Dropdown & Tabs Types

```tsx
import type {
  DropdownItem, // { label: string; value: string; icon?: React.ReactNode; disabled?: boolean; }
  TabItem, // { label: string; value: string; icon?: React.ReactNode; disabled?: boolean; }
} from 'shadcn-glass-ui';
```

---

## Utilities & Hooks

### Utility Functions

```tsx
import { cn } from 'shadcn-glass-ui';

// Merge Tailwind classes with conflict resolution
const className = cn('base-class', condition && 'conditional-class', 'override-class');
```

### Theme System

```tsx
import {
  ThemeProvider,
  useTheme,
  THEMES,
  THEME_CONFIG,
  getNextTheme,
  getThemeConfig,
} from 'shadcn-glass-ui';

// Wrap your app
<ThemeProvider defaultTheme="glass">
  <App />
</ThemeProvider>;

// Use in components
function MyComponent() {
  const { theme, setTheme, cycleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={cycleTheme}>Toggle Theme</button>
    </div>
  );
}

// Constants
console.log(THEMES); // ['glass', 'light', 'aurora']
console.log(THEME_CONFIG); // [{ name: 'glass', label: 'Glass' }, ...]
```

### React Hooks

```tsx
import { useFocus, useHover, useResponsive, useWallpaperTint } from 'shadcn-glass-ui';

// Focus management
function FocusExample() {
  const { isFocused, focusProps } = useFocus();
  return <input {...focusProps} />;
}

// Hover detection
function HoverExample() {
  const { isHovered, hoverProps } = useHover();
  return <div {...hoverProps}>Hover me</div>;
}

// Responsive breakpoints
function ResponsiveExample() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return isMobile ? <MobileView /> : <DesktopView />;
}

// Wallpaper tint detection
function WallpaperExample() {
  const { isDark, tintColor } = useWallpaperTint();
  return <div style={{ color: tintColor }}>Adaptive UI</div>;
}
```

### CVA Variants (Advanced)

For creating custom variants using the same styling system:

```tsx
// Export all CVA variant functions
export * from './lib/variants';

// Usage in custom components
import { buttonGlassVariants } from 'shadcn-glass-ui';

const MyCustomButton = ({ variant, size }) => {
  return <button className={buttonGlassVariants({ variant, size })}>Click me</button>;
};
```

---

## Quick Reference Tables

### Most Common Imports (Top 20)

```tsx
import {
  // Theme (always needed)
  ThemeProvider,
  useTheme,

  // Core UI (80% of use cases)
  ButtonGlass,
  InputGlass,
  GlassCard,
  AlertGlass,
  BadgeGlass,
  ModalGlass,
  TabsGlass,
  CheckboxGlass,
  DropdownGlass,

  // Atomic (common)
  ThemeToggleGlass,
  SearchBoxGlass,

  // Specialized (dashboards)
  ProgressGlass,

  // Composite (dashboards)
  MetricCardGlass,

  // Sections (app layout)
  HeaderNavGlass,

  // Utility
  cn,
} from 'shadcn-glass-ui';
```

### Import by Use Case

#### Dashboard Application

```tsx
import {
  ThemeProvider,
  useTheme,
  GlassCard,
  MetricCardGlass,
  CircularMetricGlass,
  MetricsGridGlass,
  ProgressGlass,
  RainbowProgressGlass,
  BadgeGlass,
  HeaderNavGlass,
} from 'shadcn-glass-ui';
```

#### Form-Heavy Application

```tsx
import {
  ThemeProvider,
  InputGlass,
  ButtonGlass,
  CheckboxGlass,
  ToggleGlass,
  SliderGlass,
  ComboBoxGlass,
  DropdownGlass,
  AlertGlass,
  ModalGlass,
} from 'shadcn-glass-ui';
```

#### Profile/Portfolio Page

```tsx
import {
  ThemeProvider,
  ProfileHeaderGlass,
  CareerStatsGlass,
  ProjectsListGlass,
  RepositoryCardGlass,
  TrustScoreCardGlass,
  LanguageBarGlass,
  YearCardGlass,
} from 'shadcn-glass-ui';
```

---

## AI Assistant Quick Reference

### Component Count by Level

- **Level 0 (Primitives):** 3 components
- **Level 1 (Core UI):** 18 components
- **Level 2 (Atomic):** 7 components
- **Level 3 (Specialized):** 10 components
- **Level 4 (Composite):** 13 components
- **Level 5 (Sections):** 7 components
- **Total:** 57 components

### Export Categories

- **Components:** 57 total
- **Types:** 25+ prop types, 15+ variant types
- **Utilities:** 1 function (`cn`)
- **Hooks:** 4 custom hooks
- **Theme:** 6 exports (provider, hook, constants, helpers)
- **CVA Variants:** 15+ variant functions

### shadcn/ui Compatibility

Components maintain full API compatibility with shadcn/ui:

- Standard prop names (`variant`, `size`, `disabled`, etc.)
- Consistent variant naming (`default`, `secondary`, `destructive`, `outline`)
- Compatible type definitions

### Breaking Changes (v1.0.0)

- ❌ `ButtonGlass variant="danger"` → ✅ `variant="destructive"`
- ❌ `AlertGlass type="error"` → ✅ `variant="destructive"`
- ❌ `NotificationGlass type="info"` → ✅ `variant="default"`
- ❌ `SelectGlass` → ✅ `ComboBoxGlass`

---

## Related Documentation

- [Components Catalog](./COMPONENTS_CATALOG.md) - Detailed component reference
- [Migration Guides](../docs/migration/) - Version upgrade guides
- [Storybook](https://storybook.example.com) - Live component examples
- [TypeDoc](https://typedoc.example.com) - Auto-generated API reference
