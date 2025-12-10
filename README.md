# shadcn-glass-ui

[![npm version](https://img.shields.io/npm/v/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![npm downloads](https://img.shields.io/npm/dm/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![License](https://img.shields.io/npm/l/shadcn-glass-ui.svg)](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/main/LICENSE)
[![CI](https://github.com/Yhooi2/shadcn-glass-ui-library/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/Yhooi2/shadcn-glass-ui-library/actions)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/shadcn-glass-ui)](https://bundlephobia.com/package/shadcn-glass-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-blue)](https://tailwindcss.com/)
[![AI-Friendly](https://img.shields.io/badge/AI-Friendly-blueviolet?logo=openai)](docs/AI_USAGE.md)
[![Claude Code](https://img.shields.io/badge/Claude-Code-5865F2?logo=anthropic)](docs/AI_USAGE.md)
[![GitHub Copilot](https://img.shields.io/badge/GitHub-Copilot-181717?logo=github)](docs/AI_USAGE.md)
[![Context7](https://img.shields.io/badge/Context7-Indexed-00D4AA)](https://context7.com/yhooi2/shadcn-glass-ui-library)

Glassmorphism UI library for React - AI-friendly with 57 components, strict TypeScript, and
comprehensive docs.

## ✨ Highlights

- 🎨 **57 Components** - Core UI (18) + Atomic (7) + Composite (13) + Sections (7) + Specialized
  (9) + Primitives (3)
- 🌈 **3 Themes** - Glass (dark glassmorphism), Light (clean minimal), Aurora (gradient glow)
- 🤖 **AI-Friendly** - Optimized for Claude Code, Copilot, GPT with comprehensive docs
- 🔮 **Advanced Patterns** - asChild polymorphic rendering, Compound components (Modal, Tabs)
- ♿ **WCAG 2.1 AA** - Full accessibility compliance with automated testing
- 📱 **Touch Optimized** - 44×44px minimum touch targets (Apple HIG)
- ⚡ **Modern Stack** - React 19, Tailwind v4, Vitest 4, Storybook 10, Vite 7
- 🧪 **1355+ Tests** - 650+ compliance + 580 visual regression + 125 unit tests
- 📦 **shadcn Compatible** - Works seamlessly with existing shadcn/ui projects
- 🎯 **Design System** - Comprehensive [UI_DESIGN.md](docs/design-system/UI_DESIGN.md)
  specifications
- 📦 **Bundle Size** - ~110KB gzipped (production build)
- 📊 **Data Visualization** - SparklineGlass for compact time series, InsightCardGlass for analytics

## Tech Stack

- **React 19.2** - Server Components, React Compiler, automatic batching
- **TypeScript 5.9** - Strict type checking
- **Tailwind CSS 4.1** - CSS-first configuration with CSS variables
- **Vite 7** (rolldown-vite) - Rust-powered bundler
- **Storybook 10.1** - Component workshop with ESM-only architecture
- **Vitest 4.0** - Browser mode testing with visual regression

See [DEPENDENCIES.md](DEPENDENCIES.md) for detailed dependency documentation.

## 🤖 AI Assistant Support

This library is **optimized for AI coding assistants** including Claude Code, GitHub Copilot, and
ChatGPT:

- 📖 **Dedicated AI Guide** - [AI_USAGE.md](docs/AI_USAGE.md) with decision trees and workflows
- 🎯 **TypeScript Strict Mode** - Full type inference for autocomplete
- 📝 **Rich JSDoc** - Every component documented with @example, @accessibility
- 🗂️ **Component Catalog** - [COMPONENTS_CATALOG.md](docs/COMPONENTS_CATALOG.md) with searchable
  index
- 🔍 **Exports Map** - Machine-readable [EXPORTS_MAP.json](docs/EXPORTS_MAP.json)
- 🧪 **Real-World Examples** - Use-case based Storybook stories
- 📦 **shadcn CLI Compatible** - Install components via
  `npx shadcn add @shadcn-glass-ui/button-glass`
- 🌐 **Context7 Indexed** - Discoverable via
  [Context7 MCP](https://context7.com/yhooi2/shadcn-glass-ui-library) for AI assistants

[**→ Read AI Usage Guide**](docs/AI_USAGE.md) |
[**→ Component Catalog**](docs/COMPONENTS_CATALOG.md)

## 🖥️ CLI

Explore components directly from the command line:

```bash
# Get component info (fuzzy search supported)
npx shadcn-glass-ui info ButtonGlass
npx shadcn-glass-ui info button
npx shadcn-glass-ui info modal

# List all components
npx shadcn-glass-ui list

# List by category
npx shadcn-glass-ui list --category=core
npx shadcn-glass-ui list --category=composite

# Show help
npx shadcn-glass-ui --help
```

## 📚 Documentation

- **[Live Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)** - Interactive component
  demos
- **[npm Package](https://www.npmjs.com/package/shadcn-glass-ui)** - Public npm registry
- **[Registry Guide](docs/REGISTRY_USAGE.md)** - shadcn CLI installation via registry
- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Setup tutorial
- **[GitHub](https://github.com/Yhooi2/shadcn-glass-ui-library)** - Source code
- [Component Documentation](https://yhooi2.github.io/shadcn-glass-ui-library/?path=/docs) - Detailed
  API references
- [Design System](docs/design-system/UI_DESIGN.md) - Comprehensive UI specifications
- [Migration Guides](docs/migration/) - Upgrade and API changes

## 📦 Installation Methods

shadcn-glass-ui can be installed in two ways:

### Option 1: Registry (shadcn CLI) ⭐ Recommended

**Listed on [registry.directory](https://registry.directory)!**

Configure your `components.json`:

```json
{
  "registries": {
    "@shadcn-glass-ui": {
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r"
    }
  }
}
```

Install components via shadcn CLI:

```bash
# Single component
npx shadcn@latest add @shadcn-glass-ui/button-glass

# Multiple components
npx shadcn@latest add @shadcn-glass-ui/button-glass @shadcn-glass-ui/input-glass @shadcn-glass-ui/modal-glass

# With automatic dependencies
npx shadcn@latest add @shadcn-glass-ui/button-glass --deps
```

**Benefits:**

- ✅ Automatic dependency installation
- ✅ Type-safe CLI workflow
- ✅ Compatible with existing shadcn/ui projects
- ✅ 57 components available

**[→ Full Registry Documentation](docs/REGISTRY_USAGE.md)**

### Option 2: npm Package

Install from npm registry:

```bash
npm install shadcn-glass-ui
```

**[→ npm Installation Guide](docs/GETTING_STARTED.md)**

---

## 🚀 Quick Start

**Requirements:**

- React 18.0+ or 19.0+
- React-DOM 18.0+ or 19.0+
- Tailwind CSS 4.0+

### Basic Usage

```tsx
import { ButtonGlass, InputGlass, ThemeProvider } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <div className="p-8 space-y-4">
        <ButtonGlass variant="primary" size="lg">
          Click me
        </ButtonGlass>
        <InputGlass placeholder="Enter text..." />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## 🆕 Advanced Features (Phase 3)

### asChild Pattern

Polymorphic rendering with Radix UI Slot - render components as any element:

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';
import { Link } from 'react-router-dom';

// Render button as Link
<ButtonGlass asChild>
  <Link to="/profile">View Profile</Link>
</ButtonGlass>

// Render button as anchor
<ButtonGlass asChild variant="primary">
  <a href="https://example.com" target="_blank">
    External Link
  </a>
</ButtonGlass>
```

**Supported components:** `ButtonGlass`, `AvatarGlass`, `GlassCard`

### Compound Components

Fine-grained composition for complex components:

```tsx
import { ModalGlass, TabsGlass } from 'shadcn-glass-ui';

// ModalGlass Compound API
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Confirm Action</ModalGlass.Title>
      <ModalGlass.Description>
        This action cannot be undone
      </ModalGlass.Description>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>
      <p>Content here...</p>
    </ModalGlass.Body>
    <ModalGlass.Footer>
      <ButtonGlass onClick={() => setOpen(false)}>Cancel</ButtonGlass>
      <ButtonGlass variant="primary">Confirm</ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>

// TabsGlass Compound API
<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Overview</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Analytics</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="tab1">
    <p>Overview content</p>
  </TabsGlass.Content>
  <TabsGlass.Content value="tab2">
    <p>Analytics content</p>
  </TabsGlass.Content>
</TabsGlass.Root>
```

## ⚠️ Breaking Changes (v1.0.0)

**v1.0.0 removes all legacy/deprecated APIs.** This is a clean slate release with only Compound API
support.

### Removed Components

#### SelectGlass (Removed in v1.0.0)

**SelectGlass has been removed.** Use **ComboBoxGlass** instead.

```tsx
// ❌ Removed in v1.0.0
<SelectGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>

// ✅ Use ComboBoxGlass
<ComboBoxGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>
```

### Removed Legacy APIs

#### ModalGlass: Legacy Props API Removed

**The old props-based API has been removed.** Use Compound API instead.

```tsx
// ❌ Removed in v1.0.0
<ModalGlass isOpen={true} onClose={() => {}} title="Test">
  Content
</ModalGlass>

// ✅ Use Compound API
<ModalGlass.Root open={true} onOpenChange={() => {}}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Test</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>Content</ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

**Key Changes:**

- `isOpen` → `open` (on ModalGlass.Root)
- `onClose` → `onOpenChange` (callback signature changed from `() => void` to
  `(open: boolean) => void`)
- `title` prop removed → use `<ModalGlass.Title>` component
- Manual structure required (Overlay, Content, Header, Body, Footer)

#### TabsGlass: Legacy Props API Removed

**The old props-based API has been removed.** Use Compound API instead.

```tsx
// ❌ Removed in v1.0.0
<TabsGlass
  tabs={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' }
  ]}
  activeTab="tab1"
  onChange={setActiveTab}
/>

// ✅ Use Compound API
<TabsGlass.Root value="tab1" onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="tab1">Content 1</TabsGlass.Content>
  <TabsGlass.Content value="tab2">Content 2</TabsGlass.Content>
</TabsGlass.Root>
```

**Key Changes:**

- `tabs` array prop removed → use individual `<TabsGlass.Trigger>` components
- `activeTab` → `value` (on TabsGlass.Root)
- `onChange` → `onValueChange`
- Content must be explicitly defined with `<TabsGlass.Content>` for each tab

### Migration Guides

Detailed migration guides are available in the [docs/migration/](docs/migration/) directory:

- **[ModalGlass Compound API](docs/migration/modal-glass-compound-api.md)** - Legacy → Compound API
- **[TabsGlass Compound API](docs/migration/tabs-glass-compound-api.md)** - Legacy → Compound API

### Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete version history and breaking changes.

## 📚 Full Documentation

- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Comprehensive setup tutorial
- **[AI Usage Guide](docs/AI_USAGE.md)** - Using library with AI assistants (Copilot, Claude, GPT)
- **[Publishing Guide](docs/PUBLISHING.md)** - Build and publish with TypeScript declarations
- **[Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)** - Live component demos
- **[UI Design System](docs/design-system/UI_DESIGN.md)** - Complete design specifications
- **[Visual Testing Guide](docs/visual-testing-guide.md)** - Screenshot update workflow
- **[Migration Guide](MIGRATION_GUIDE.md)** - Upgrading from v1
- **[Breaking Changes](BREAKING_CHANGES.md)** - API changes log
- **[Dependencies](DEPENDENCIES.md)** - Detailed dependency docs
- **[Contributing](CONTRIBUTING.md)** - Development guidelines

## 🎯 Component Categories

### Level 1: Core UI (18 components)

Essential building blocks for any application:

- **Buttons & Actions**: ButtonGlass
- **Inputs**: InputGlass, CheckboxGlass, ToggleGlass, SliderGlass, ComboBoxGlass, PopoverGlass
- **Containers**: GlassCard, ModalGlass
- **Navigation**: TabsGlass, DropdownGlass
- **Feedback**: BadgeGlass, AlertGlass, NotificationGlass, TooltipGlass, SkeletonGlass,
  ProgressGlass, CircularProgressGlass
- **Media**: AvatarGlass

[View all Core UI components →](src/components/glass/ui/)

### Level 2: Atomic (7 components)

Small, specialized components for specific use cases:

- **SearchBoxGlass** - Search input with icon
- **ThemeToggleGlass** - Theme switcher button
- **ExpandableHeaderGlass** - Collapsible header section
- **SortDropdownGlass** - Sorting dropdown menu
- **StatItemGlass** - Individual stat display
- **IconButtonGlass** - Icon-only button variant
- **InsightCardGlass** - Insight display with 7 semantic variants (default, tip, highlight, warning,
  stat, growth, decline)

[View all Atomic components →](src/components/glass/atomic/)

### Level 3: Composite (13 components)

Pre-built complex components combining multiple elements:

- **AICardGlass** - AI summary card with feature list
- **MetricCardGlass** - Metric display card with progress indicator
- **YearCardGlass** - Year card for career timeline
- **CircularMetricGlass** - Circular progress metric display
- **RepositoryCardGlass** - Repository card with expandable details
- **RepositoryHeaderGlass** - Repository header with metadata
- **RepositoryMetadataGlass** - Repository metadata display
- **TrustScoreDisplayGlass** - Trust score with visual indicator
- **UserStatsLineGlass** - User statistics horizontal display
- **UserInfoGlass** - User information card
- **CareerStatsHeaderGlass** - Career statistics header
- **ContributionMetricsGlass** - Contribution metrics display
- **MetricsGridGlass** - Grid layout for metrics

[View all Composite components →](src/components/glass/composite/)

### Specialized Components (9 components)

Advanced specialized components for specific use cases:

- **StatusIndicatorGlass** - Status dots with glow effect
- **SegmentedControlGlass** - Segmented button group
- **RainbowProgressGlass** - Rainbow gradient progress bar
- **LanguageBarGlass** - Language proficiency bar with legend
- **ProfileAvatarGlass** - Large avatar with glow animation
- **FlagAlertGlass** - Warning/danger flag alert with icon
- **ProgressGlass** - Enhanced progress bar
- **BaseProgressGlass** - Base progress component
- **SparklineGlass** - Compact bar chart for time series visualization with height/gap variants

[View all Specialized components →](src/components/glass/specialized/)

### Level 4: Sections (7 components)

Full-page sections ready to use in your application:

- **HeaderNavGlass** - Navigation header with search and theme toggle
- **ProfileHeaderGlass** - User profile header with avatar, stats, and languages
- **CareerStatsGlass** - Career statistics with expandable year cards
- **FlagsSectionGlass** - Expandable flags/warnings section
- **TrustScoreCardGlass** - Trust score display with detailed metrics
- **ProjectsListGlass** - Projects list with filtering and sorting
- **HeaderBrandingGlass** - Branded header with logo and navigation

[View all Section components →](src/components/glass/sections/)

### Blocks (6 ready-to-use demo sections)

Complete component showcases following shadcn/ui pattern - these are demo/documentation components,
not production-ready blocks:

- **ButtonsBlock** - All button variants, sizes, states demo
- **FormElementsBlock** - Input, Slider, Toggle, Checkbox demos
- **ProgressBlock** - Progress bars, RainbowProgress, Skeletons demo
- **AvatarGalleryBlock** - Avatar sizes and status indicators demo
- **BadgesBlock** - Badge variants with tooltips demo
- **NotificationsBlock** - Notifications and alerts demo

**Note:** Blocks are showcase/demo components visible in Storybook. For production use, utilize
individual components from the categories above.

[View Blocks in Storybook →](https://yhooi2.github.io/shadcn-glass-ui-library/?path=/story/glass-blocks--default)

### Demo Pages (3 full applications)

Complete application examples showcasing all components:

- **ComponentShowcase** - Interactive demo of all 57 components with theme switching
- **DesktopShowcase** - GitHub Analytics desktop application mockup with glassmorphism design
- **MobileShowcase** - Mobile-optimized GitHub profile view with responsive layout

[Try live demos →](https://yhooi2.github.io/shadcn-glass-ui-library/)

## 🎨 Themes

shadcn-glass-ui provides three built-in themes:

### 🌑 Glass Theme (Dark Glassmorphism)

Default dark theme with frosted glass effects:

```tsx
<div className="theme-glass">
  <ButtonGlass>Glassmorphic Button</ButtonGlass>
</div>
```

**Features:**

- Backdrop blur: 16px (md)
- Dark background with glass overlays
- Purple gradient accents
- Glow effects on hover/focus

### ☀️ Light Theme

Clean, minimal light theme:

```tsx
<div className="theme-light">
  <ButtonGlass>Light Theme Button</ButtonGlass>
</div>
```

**Features:**

- Subtle shadows instead of blur
- White/gray color palette
- Reduced opacity overlays
- Crisp, modern aesthetic

### 🌈 Aurora Theme (Gradient)

Vibrant gradient theme with glow effects:

```tsx
<div className="theme-aurora">
  <ButtonGlass>Aurora Gradient Button</ButtonGlass>
</div>
```

**Features:**

- Multi-color gradients
- Enhanced glow effects
- Dynamic backgrounds
- Eye-catching visuals

### Theme Switching

```tsx
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@/lib/theme-context';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="glass">Glass (Dark)</option>
      <option value="light">Light</option>
      <option value="aurora">Aurora</option>
    </select>
  );
}
```

## 🔮 Glass Effect Intensity

GlassCard supports 3 intensity levels for customizable blur effects:

```tsx
// Subtle glass effect (8px blur)
<GlassCard intensity="subtle">
  Subtle Effect
</GlassCard>

// Standard glassmorphism (16px blur - default)
<GlassCard intensity="medium">
  Standard Glass
</GlassCard>

// Strong glass effect (24px blur)
<GlassCard intensity="strong">
  Strong Effect
</GlassCard>
```

**Intensity Levels:**

- `subtle` - 8px blur (--blur-sm) - Light glass effect
- `medium` - 16px blur (--blur-md) - Standard cards (default)
- `strong` - 24px blur (--blur-lg) - Featured cards

**Performance Note:** Use sparingly - limit to 2-3 glass elements per view for optimal performance.

## ♿ Accessibility

All components are WCAG 2.1 AA compliant:

- ✅ **Keyboard Navigation** - Full Tab/Enter/Arrow key support
- ✅ **Screen Readers** - Proper ARIA labels and roles
- ✅ **Focus Indicators** - Visible focus rings (2px inner + 4px outer)
- ✅ **Color Contrast** - Minimum 4.5:1 for text, 3:1 for UI
- ✅ **Touch Targets** - 44×44px minimum (Apple HIG)
- ✅ **Reduced Motion** - Respects `prefers-reduced-motion`

### Automated Testing

```bash
npm run test:compliance        # Design system compliance (650+ tests)
npm run test:compliance:browser # Browser-based a11y tests
```

## 📊 Performance

Thanks to the modern stack:

### Build Performance

- **Production Builds**: 3-16x faster (Rolldown bundler)
- **Memory Usage**: 100x reduction vs Webpack/Rollup
- **Dev Server**: Near-instant start with Vite HMR
- **CSS Builds**: 100x faster incremental builds (Tailwind v4)

### Runtime Performance

- **Render Optimization**: 32% fewer renders (React 19 compiler)
- **Bundle Size**: Tree-shakeable ESM exports
- **Code Splitting**: Automatic route-based splitting
- **CSS Output**: Optimized purged CSS (~10KB gzipped)

### Performance Benchmarks

```bash
npm run benchmark  # Run performance benchmarks
```

Example results:

- ButtonGlass initial render: < 1ms
- 100 component renders: < 50ms
- Theme switching: < 100ms

## 🧪 Testing

Comprehensive test coverage across multiple layers:

### Test Suites

```bash
# All tests (1,355+ total)
npm test

# Design system compliance (650+ tests)
npm run test:compliance:run          # jsdom tests
npm run test:compliance:browser:run  # browser tests

# Visual regression (580 screenshots)
npm run test:visual:ci              # Run visual tests
npm run test:visual:update          # Update baselines

# Unit tests (125 tests)
npm run test:unit

# Coverage report (90% target)
npm run test:coverage
```

### Test Categories

| Category                     | Tests      | Coverage          |
| ---------------------------- | ---------- | ----------------- |
| **Design System Compliance** | 650+       | 100%              |
| **Visual Regression**        | 580        | All components    |
| **Unit Tests**               | 125        | Core utilities    |
| **Total**                    | **1,355+** | **Comprehensive** |

## 🛠️ Development

### Prerequisites

- **Node.js**: 20.16+, 22.19+, or 24+
- **npm**: Latest stable version

### Setup

```bash
# Clone repository
git clone https://github.com/Yhooi2/shadcn-glass-ui-library.git
cd shadcn-glass-ui-library

# Install dependencies
npm install

# Setup git hooks (prevents committing screenshots from non-Linux platforms)
./scripts/setup-git-hooks.sh

# Start development
npm run dev          # Vite dev server (port 5173)
npm run storybook    # Storybook (port 6006)
```

### Build

```bash
npm run build              # TypeScript check + Vite build
npm run build-storybook    # Build static Storybook
```

### Linting

```bash
npm run lint               # ESLint
npm run format             # Prettier
```

## 📁 Project Structure

```
shadcn-glass-ui/
├── src/
│   ├── components/
│   │   ├── glass/
│   │   │   ├── ui/           # Core UI components (17)
│   │   │   ├── atomic/       # Atomic components (6)
│   │   │   ├── composite/    # Composite components (13)
│   │   │   └── sections/     # Section components (7)
│   │   ├── blocks/           # Ready-to-use blocks (6)
│   │   ├── __visual__/       # Visual regression tests
│   │   ├── ComponentShowcase.tsx
│   │   └── DesktopShowcase.tsx
│   ├── lib/
│   │   ├── utils.ts          # cn() utility
│   │   ├── theme-context.tsx # Theme provider
│   │   ├── themeStyles.ts    # Theme definitions
│   │   └── variants/         # CVA variants
│   ├── styles/
│   │   ├── tokens/           # Design tokens
│   │   └── themes/           # Theme CSS
│   └── test/
│       ├── compliance/       # Compliance tests
│       └── utils/            # Test utilities
├── .storybook/               # Storybook config
├── docs/                     # Documentation
├── docs/design-system/UI_DESIGN.md  # Design system spec
└── package.json
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-component`
3. Make your changes following our code standards
4. Run tests: `npm run test:compliance:run`
5. Commit with conventional commits: `feat(ui): add DatePickerGlass component`
6. Push and create a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📝 License

MIT License

This project is open source under the MIT license. See [LICENSE](LICENSE) for details.

## 🙏 Credits

Built with amazing open source projects:

- [shadcn/ui](https://ui.shadcn.com/) - Design system foundation
- [Radix UI](https://www.radix-ui.com/) - Unstyled accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Storybook](https://storybook.js.org/) - Component workshop
- [Vitest](https://vitest.dev/) - Blazing fast unit test framework

## 🔗 Links

- **NPM Package**: [shadcn-glass-ui](https://www.npmjs.com/package/shadcn-glass-ui)
- **Documentation**: [Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)
- **GitHub**: [shadcn-glass-ui-library](https://github.com/Yhooi2/shadcn-glass-ui-library)
- **Issues**: [Report a bug](https://github.com/Yhooi2/shadcn-glass-ui-library/issues)
- **Discussions**: [Community](https://github.com/Yhooi2/shadcn-glass-ui-library/discussions)

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=Yhooi2/shadcn-glass-ui-library&type=Date)](https://star-history.com/#Yhooi2/shadcn-glass-ui-library&Date)

---

**Made with ❤️ and glassmorphism**
