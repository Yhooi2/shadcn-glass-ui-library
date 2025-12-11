# shadcn-glass-ui Registry Usage

This guide explains how to use the shadcn-glass-ui component registry with the shadcn CLI.

## Overview

The shadcn-glass-ui registry provides **55+ glassmorphism UI components** that can be installed
directly into your project using the shadcn CLI, just like official shadcn/ui components.

**Registry URL:** `https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r`

**v2.0.0 Update:** All registry components now use the 3-layer token system. If upgrading from v1.x,
see the [CSS Variables Migration Guide](migration/CSS_VARIABLES_MIGRATION_2.0.md) for automated
migration scripts.

## Quick Start

### 1. Configure Your Project

Add the shadcn-glass-ui registry to your `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@shadcn-glass-ui": {
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r"
    }
  }
}
```

### 2. Install Components

Use the shadcn CLI with the registry namespace:

```bash
# Install a single component
npx shadcn@latest add @shadcn-glass-ui/button-glass

# Install multiple components
npx shadcn@latest add @shadcn-glass-ui/button-glass @shadcn-glass-ui/input-glass @shadcn-glass-ui/modal-glass

# Install with dependencies
npx shadcn@latest add @shadcn-glass-ui/button-glass --deps
```

### 3. Use in Your Code

After installation, components will be available in your project:

```tsx
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { InputGlass } from '@/components/glass/ui/input-glass';
import { ThemeProvider } from '@/lib/theme-context';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <div className="p-8 space-y-4">
        <ButtonGlass variant="primary">Click me</ButtonGlass>
        <InputGlass placeholder="Enter text..." />
      </div>
    </ThemeProvider>
  );
}
```

## Available Components

### Core UI Components (18)

| Component             | Registry Name                              | Description                       |
| --------------------- | ------------------------------------------ | --------------------------------- |
| ButtonGlass           | `@shadcn-glass-ui/button-glass`            | Glass button with 6 variants      |
| InputGlass            | `@shadcn-glass-ui/input-glass`             | Glass text input field            |
| CheckboxGlass         | `@shadcn-glass-ui/checkbox-glass`          | Glass checkbox                    |
| ToggleGlass           | `@shadcn-glass-ui/toggle-glass`            | Glass toggle switch               |
| SliderGlass           | `@shadcn-glass-ui/slider-glass`            | Glass range slider                |
| ModalGlass            | `@shadcn-glass-ui/modal-glass`             | Glass modal dialog (compound API) |
| TabsGlass             | `@shadcn-glass-ui/tabs-glass`              | Glass tabs (compound API)         |
| DropdownGlass         | `@shadcn-glass-ui/dropdown-glass`          | Glass dropdown menu               |
| TooltipGlass          | `@shadcn-glass-ui/tooltip-glass`           | Glass tooltip                     |
| AlertGlass            | `@shadcn-glass-ui/alert-glass`             | Glass alert (4 variants)          |
| NotificationGlass     | `@shadcn-glass-ui/notification-glass`      | Glass toast notification          |
| BadgeGlass            | `@shadcn-glass-ui/badge-glass`             | Glass badge (7 variants)          |
| AvatarGlass           | `@shadcn-glass-ui/avatar-glass`            | Glass avatar with status          |
| GlassCard             | `@shadcn-glass-ui/glass-card`              | Glass card (4 variants)           |
| ProgressGlass         | `@shadcn-glass-ui/progress-glass`          | Glass progress bar                |
| CircularProgressGlass | `@shadcn-glass-ui/circular-progress-glass` | Circular progress indicator       |
| SkeletonGlass         | `@shadcn-glass-ui/skeleton-glass`          | Glass loading skeleton            |
| ComboBoxGlass         | `@shadcn-glass-ui/combobox-glass`          | Glass combobox with search        |
| PopoverGlass          | `@shadcn-glass-ui/popover-glass`           | Glass popover                     |

### Atomic Components (6)

| Component             | Registry Name                              | Description       |
| --------------------- | ------------------------------------------ | ----------------- |
| IconButtonGlass       | `@shadcn-glass-ui/icon-button-glass`       | Icon-only button  |
| ThemeToggleGlass      | `@shadcn-glass-ui/theme-toggle-glass`      | Theme switcher    |
| SearchBoxGlass        | `@shadcn-glass-ui/search-box-glass`        | Search input      |
| SortDropdownGlass     | `@shadcn-glass-ui/sort-dropdown-glass`     | Sorting dropdown  |
| StatItemGlass         | `@shadcn-glass-ui/stat-item-glass`         | Stat display      |
| ExpandableHeaderGlass | `@shadcn-glass-ui/expandable-header-glass` | Expandable header |

### Specialized Components (8)

| Component             | Registry Name                              | Description               |
| --------------------- | ------------------------------------------ | ------------------------- |
| StatusIndicatorGlass  | `@shadcn-glass-ui/status-indicator-glass`  | Status dots with glow     |
| SegmentedControlGlass | `@shadcn-glass-ui/segmented-control-glass` | Segmented button group    |
| RainbowProgressGlass  | `@shadcn-glass-ui/rainbow-progress-glass`  | Rainbow gradient progress |
| LanguageBarGlass      | `@shadcn-glass-ui/language-bar-glass`      | Language proficiency bar  |
| ProfileAvatarGlass    | `@shadcn-glass-ui/profile-avatar-glass`    | Large avatar with glow    |
| FlagAlertGlass        | `@shadcn-glass-ui/flag-alert-glass`        | Warning/danger flag       |
| BaseProgressGlass     | `@shadcn-glass-ui/base-progress-glass`     | Base progress component   |

### Composite Components (13)

| Component                | Registry Name                                 | Description             |
| ------------------------ | --------------------------------------------- | ----------------------- |
| MetricCardGlass          | `@shadcn-glass-ui/metric-card-glass`          | Metric display card     |
| YearCardGlass            | `@shadcn-glass-ui/year-card-glass`            | Year card for timeline  |
| AICardGlass              | `@shadcn-glass-ui/ai-card-glass`              | AI summary card         |
| RepositoryCardGlass      | `@shadcn-glass-ui/repository-card-glass`      | Repository card         |
| TrustScoreDisplayGlass   | `@shadcn-glass-ui/trust-score-display-glass`  | Trust score display     |
| CareerStatsHeaderGlass   | `@shadcn-glass-ui/career-stats-header-glass`  | Career stats header     |
| CircularMetricGlass      | `@shadcn-glass-ui/circular-metric-glass`      | Circular metric display |
| ContributionMetricsGlass | `@shadcn-glass-ui/contribution-metrics-glass` | Contribution metrics    |
| MetricsGridGlass         | `@shadcn-glass-ui/metrics-grid-glass`         | Metrics grid layout     |
| RepositoryHeaderGlass    | `@shadcn-glass-ui/repository-header-glass`    | Repository header       |
| RepositoryMetadataGlass  | `@shadcn-glass-ui/repository-metadata-glass`  | Repository metadata     |
| UserInfoGlass            | `@shadcn-glass-ui/user-info-glass`            | User info display       |
| UserStatsLineGlass       | `@shadcn-glass-ui/user-stats-line-glass`      | User stats line         |

### Section Components (7)

| Component           | Registry Name                             | Description                |
| ------------------- | ----------------------------------------- | -------------------------- |
| HeaderNavGlass      | `@shadcn-glass-ui/header-nav-glass`       | Navigation header          |
| ProfileHeaderGlass  | `@shadcn-glass-ui/profile-header-glass`   | Profile header with avatar |
| CareerStatsGlass    | `@shadcn-glass-ui/career-stats-glass`     | Career statistics          |
| FlagsSectionGlass   | `@shadcn-glass-ui/flags-section-glass`    | Flags/warnings section     |
| TrustScoreCardGlass | `@shadcn-glass-ui/trust-score-card-glass` | Trust score card           |
| ProjectsListGlass   | `@shadcn-glass-ui/projects-list-glass`    | Projects list              |
| HeaderBrandingGlass | `@shadcn-glass-ui/header-branding-glass`  | Branded header             |

### Primitive Components (3)

| Component        | Registry Name                         | Description                 |
| ---------------- | ------------------------------------- | --------------------------- |
| TouchTarget      | `@shadcn-glass-ui/touch-target`       | Touch-friendly wrapper      |
| FormFieldWrapper | `@shadcn-glass-ui/form-field-wrapper` | Form field structure        |
| InteractiveCard  | `@shadcn-glass-ui/interactive-card`   | Interactive card with hover |

## Utilities & Hooks

### Utilities

- **cn** - Class name merging (clsx + tailwind-merge)
- **Theme utilities** - Theme configuration and helpers

### Hooks

- **use-hover** - Hover state management
- **use-focus** - Focus state management
- **use-responsive** - Responsive breakpoint detection
- **use-wallpaper-tint** - Wallpaper tint effect

## Installation Examples

### Example 1: Complete Form Setup

Install all form-related components at once:

```bash
npx shadcn@latest add \
  @shadcn-glass-ui/button-glass \
  @shadcn-glass-ui/input-glass \
  @shadcn-glass-ui/checkbox-glass \
  @shadcn-glass-ui/toggle-glass \
  @shadcn-glass-ui/slider-glass
```

### Example 2: Dashboard UI

Install components for a dashboard interface:

```bash
npx shadcn@latest add \
  @shadcn-glass-ui/glass-card \
  @shadcn-glass-ui/metric-card-glass \
  @shadcn-glass-ui/progress-glass \
  @shadcn-glass-ui/badge-glass \
  @shadcn-glass-ui/avatar-glass
```

### Example 3: Navigation Setup

Install header and navigation components:

```bash
npx shadcn@latest add \
  @shadcn-glass-ui/header-nav-glass \
  @shadcn-glass-ui/theme-toggle-glass \
  @shadcn-glass-ui/search-box-glass \
  @shadcn-glass-ui/dropdown-glass
```

## Features

- ✅ **shadcn/ui Compatible** - Works with existing shadcn/ui components
- ✅ **Automatic Dependencies** - CLI installs all required dependencies
- ✅ **Type Safe** - Full TypeScript support
- ✅ **Tree Shakeable** - Only bundle what you use
- ✅ **Theme System** - 3 built-in themes (glass, light, aurora)
- ✅ **Accessible** - WCAG 2.1 AA compliant
- ✅ **Customizable** - CSS variables for easy theming

## Registry Structure

The registry follows shadcn/ui v4 schema:

```
public/r/
├── registry.json           # Main index
├── button-glass.json       # Component metadata
├── input-glass.json
└── ... (55 total components)
```

Each component JSON includes:

- **$schema** - JSON schema validation
- **name** - Component identifier
- **type** - Component type (registry:ui, registry:block, etc.)
- **description** - Component description
- **dependencies** - npm dependencies
- **registryDependencies** - Other registry components
- **files** - Component source code
- **cssVars** - CSS variables for theming

## Troubleshooting

### Error: Registry not found

Make sure your `components.json` includes the registry configuration:

```json
{
  "registries": {
    "@shadcn-glass-ui": {
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r"
    }
  }
}
```

### Error: Component not found

Check that you're using the correct component name with the `@shadcn-glass-ui/` prefix:

```bash
# ✅ Correct
npx shadcn@latest add @shadcn-glass-ui/button-glass

# ❌ Incorrect (missing prefix)
npx shadcn@latest add button-glass

# ❌ Incorrect (wrong name)
npx shadcn@latest add @shadcn-glass-ui/ButtonGlass
```

### Missing Dependencies

If you encounter missing dependencies, install them manually:

```bash
npm install @radix-ui/react-slot class-variance-authority lucide-react
```

Or use the `--deps` flag:

```bash
npx shadcn@latest add @shadcn-glass-ui/button-glass --deps
```

## Alternative Installation

If you prefer not to use the registry, you can install components via npm:

```bash
npm install shadcn-glass-ui
```

```tsx
import { ButtonGlass, InputGlass } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';
```

See [GETTING_STARTED.md](./GETTING_STARTED.md) for npm installation guide.

## Resources

- **Live Demo:** https://yhooi2.github.io/shadcn-glass-ui-library/
- **GitHub:** https://github.com/Yhooi2/shadcn-glass-ui-library
- **npm Package:** https://www.npmjs.com/package/shadcn-glass-ui
- **Documentation:** https://github.com/Yhooi2/shadcn-glass-ui-library/tree/main/docs

## Contributing

Found a bug or want to add a component to the registry? Contributions are welcome!

1. Fork the repository
2. Make your changes
3. Run `npm run generate:registry` to update registry files
4. Submit a pull request

## License

MIT © shadcn-glass-ui
