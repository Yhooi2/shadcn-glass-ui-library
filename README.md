# shadcn-glass-ui

> Modern glassmorphism UI component library for React with full shadcn/ui compatibility

[![npm version](https://img.shields.io/npm/v/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-2,127%20passing-success)](https://github.com/yourusername/shadcn-glass-ui)

## ✨ Highlights

- 🎨 **48 Components** - Core UI (16) + Atomic (4) + Composites (5) + Sections (6) + Blocks (6) + New (11)
- 🌈 **3 Themes** - Glass (dark glassmorphism), Light (clean minimal), Aurora (gradient glow)
- 🔮 **Advanced Patterns** - asChild polymorphic rendering, Compound components (Modal, Tabs)
- ♿ **WCAG 2.1 AA** - Full accessibility compliance with automated testing
- 📱 **Touch Optimized** - 44×44px minimum touch targets (Apple HIG)
- ⚡ **Modern Stack** - React 19, Tailwind v4, Vitest 4, Storybook 10, Vite 7
- 🧪 **704 Tests** - 125 unit tests + 579 visual regression (99.5% passing)
- 📦 **shadcn Compatible** - Works seamlessly with existing shadcn/ui projects
- 🎯 **Design System** - Comprehensive [UI_DIZINE.md](UI_DIZINE.md) specifications
- 📦 **Bundle Size** - ~110KB gzipped (production build)

## Tech Stack

- **React 19.2** - Server Components, React Compiler, automatic batching
- **TypeScript 5.9** - Strict type checking
- **Tailwind CSS 4.1** - CSS-first configuration with CSS variables
- **Vite 7** (rolldown-vite) - Rust-powered bundler
- **Storybook 10.1** - Component workshop with ESM-only architecture
- **Vitest 4.0** - Browser mode testing with visual regression

See [DEPENDENCIES.md](DEPENDENCIES.md) for detailed dependency documentation.

## 🚀 Quick Start

### Installation

#### Option 1: shadcn CLI (Recommended)

Add individual components to your existing shadcn/ui project:

```bash
npx shadcn@latest add @shadcn-glass-ui/button
npx shadcn@latest add @shadcn-glass-ui/input
npx shadcn@latest add @shadcn-glass-ui/modal
```

#### Option 2: NPM Package

Install the entire library:

```bash
npm install shadcn-glass-ui
```

#### Option 3: Manual Copy

Copy component files directly from the repository:

```bash
# Clone the repository
git clone https://github.com/yourusername/shadcn-glass-ui.git

# Copy components
cp shadcn-glass-ui/src/components/glass/ui/button-glass.tsx your-project/components/ui/
```

### Basic Usage

```tsx
import { ButtonGlass, InputGlass, AlertGlass } from 'shadcn-glass-ui';

export default function App() {
  return (
    <div className="theme-glass min-h-screen p-8">
      <ButtonGlass variant="primary">Click me</ButtonGlass>
      <ButtonGlass variant="destructive">Delete</ButtonGlass>
      <InputGlass placeholder="Enter text..." />
      <AlertGlass variant="default" title="Welcome">
        Getting started with shadcn-glass-ui
      </AlertGlass>
    </div>
  );
}
```

### Theme Setup

Add CSS variables to your `globals.css`:

```css
@import 'shadcn-glass-ui/dist/styles.css';

/* Or define variables manually */
:root {
  --blur-sm: 8px;
  --blur-md: 16px;
  --blur-lg: 24px;
  --blur-xl: 32px;
  --card-medium-bg: rgba(255, 255, 255, 0.15);
  --card-medium-border: rgba(255, 255, 255, 0.15);
}
```

Apply theme class to your app:

```tsx
// Glass theme (dark glassmorphism)
<div className="theme-glass">
  <App />
</div>

// Light theme
<div className="theme-light">
  <App />
</div>

// Aurora theme (gradient)
<div className="theme-aurora">
  <App />
</div>
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

**Legacy API still supported** - 100% backward compatible!

## ⚠️ Breaking Changes (v3.x)

Recent updates have introduced breaking changes to align with shadcn/ui design system standards. **Please review the migration guides before updating.**

### Component API Changes

#### 1. ButtonGlass: `danger` → `destructive`

```tsx
// ❌ Old API (removed in v3.x)
<ButtonGlass variant="danger">Delete</ButtonGlass>

// ✅ New API
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

**Migration:** Replace all `variant="danger"` with `variant="destructive"`

#### 2. AlertGlass: `type` → `variant`

```tsx
// ❌ Old API (removed in v3.x)
<AlertGlass type="info" title="Info">Message</AlertGlass>
<AlertGlass type="error" title="Error">Message</AlertGlass>
<AlertGlass type="success" title="Success">Message</AlertGlass>
<AlertGlass type="warning" title="Warning">Message</AlertGlass>

// ✅ New API
<AlertGlass variant="default" title="Info">Message</AlertGlass>
<AlertGlass variant="destructive" title="Error">Message</AlertGlass>
<AlertGlass variant="success" title="Success">Message</AlertGlass>
<AlertGlass variant="warning" title="Warning">Message</AlertGlass>
```

**Mapping:**
- `type="info"` → `variant="default"`
- `type="error"` → `variant="destructive"`
- `type="success"` → `variant="success"`
- `type="warning"` → `variant="warning"`

#### 3. NotificationGlass: `type` → `variant`

```tsx
// ❌ Old API (removed in v3.x)
<NotificationGlass
  type="info"
  title="Update available"
  message="Version 2.0 is ready"
  onClose={() => {}}
/>

// ✅ New API
<NotificationGlass
  variant="default"
  title="Update available"
  message="Version 2.0 is ready"
  onClose={() => {}}
/>
```

**Same mapping as AlertGlass** (see above)

### Deprecated Components

#### SelectGlass (Deprecated in v3.x, Removed in v4.0)

**SelectGlass will be removed in v4.0** (estimated 6+ months from v3.5 release). Please migrate to **ComboBoxGlass**.

```tsx
// ❌ Deprecated (works in v3.x, removed in v4.0)
<SelectGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>

// ✅ Recommended (95% compatible API)
<ComboBoxGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>
```

**Why migrate?**
- Better performance (shadcn/ui Command component)
- More features (custom icons, better search)
- Active maintenance
- shadcn/ui compatibility

**Migration Guide:** [SelectGlass → ComboBoxGlass](docs/migration/select-to-combobox.md)

### Migration Guides

Detailed migration guides are available in the [docs/migration/](docs/migration/) directory:

- **[SelectGlass → ComboBoxGlass](docs/migration/select-to-combobox.md)** - Component replacement guide
- **[ModalGlass Compound API](docs/migration/modal-glass-compound-api.md)** - Legacy → Compound API
- **[TabsGlass Compound API](docs/migration/tabs-glass-compound-api.md)** - Legacy → Compound API

### Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete version history and breaking changes.

## 📚 Documentation

- **[Getting Started Guide](docs/GETTING_STARTED.md)** - Comprehensive setup tutorial
- **[Storybook](https://yourusername.github.io/shadcn-glass-ui/)** - Live component demos
- **[UI Design System](UI_DIZINE.md)** - Complete design specifications
- **[Migration Guide](MIGRATION_GUIDE.md)** - Upgrading from v1
- **[Breaking Changes](BREAKING_CHANGES.md)** - API changes log
- **[Dependencies](DEPENDENCIES.md)** - Detailed dependency docs
- **[Contributing](CONTRIBUTING.md)** - Development guidelines

## 🎯 Component Categories

### Level 1: Core UI (17 components)

Essential building blocks for any application:

- **Buttons & Actions**: ButtonGlass, IconButtonGlass
- **Inputs**: InputGlass, CheckboxGlass, ToggleGlass, SliderGlass, ComboBoxGlass
- **Containers**: GlassCard, ModalGlass
- **Navigation**: TabsGlass, DropdownGlass
- **Feedback**: BadgeGlass, AlertGlass, NotificationGlass, TooltipGlass, SkeletonGlass,
  ProgressGlass, CircularProgressGlass
- **Media**: AvatarGlass

[View all Core UI components →](src/components/glass/ui/)

### Level 2: Atomic (9 components)

Small, specialized components for specific use cases:

- **StatusIndicatorGlass** - Status dots with glow effect
- **SegmentedControlGlass** - Segmented button group
- **RainbowProgressGlass** - Rainbow gradient progress bar
- **LanguageBarGlass** - Language proficiency bar with legend
- **StatItemGlass** - Individual stat display
- **SearchBoxGlass** - Search input with icon
- **ThemeToggleGlass** - Theme switcher button
- **ExpandableHeaderGlass** - Collapsible header section
- **SortDropdownGlass** - Sorting dropdown menu

[View all Atomic components →](src/components/glass/atomic/)

### Level 3: Composite (13 components)

Pre-built complex components combining multiple elements:

- **MetricCardGlass** - Metric display card with progress indicator
- **YearCardGlass** - Year card for career timeline
- **AICardGlass** - AI summary card with feature list
- **RepositoryCardGlass** - Repository card with expandable details
- **TrustScoreDisplayGlass** - Trust score with visual indicator
- **ProfileAvatarGlass** - Large avatar with glow animation
- **FlagAlertGlass** - Warning/danger flag alert with icon
- **UserStatsLineGlass** - User statistics horizontal display
- **ProjectCardGlass** - Project card with status and metadata
- **TeamMemberCardGlass** - Team member profile card
- **NotificationCardGlass** - Notification card with actions
- **TimelineItemGlass** - Timeline entry with connector
- **PricingCardGlass** - Pricing tier card with features

[View all Composite components →](src/components/glass/composite/)

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

### Blocks (6 ready-to-use sections)

Complete component showcases following shadcn/ui pattern:

- **ButtonsBlock** - All button variants, sizes, states
- **FormElementsBlock** - Input, Slider, Toggle, Checkbox demos
- **ProgressBlock** - Progress bars, RainbowProgress, Skeletons
- **AvatarGalleryBlock** - Avatar sizes and status indicators
- **BadgesBlock** - Badge variants with tooltips
- **NotificationsBlock** - Notifications and alerts

[View all Blocks →](src/components/blocks/)

### Demo Pages (2 full applications)

Complete application examples:

- **ComponentShowcase** - Interactive demo of all 57 core components
- **DesktopShowcase** - GitHub Analytics desktop application mockup with glassmorphism design

[Try live demos →](https://yourusername.github.io/shadcn-glass-ui/)

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

## 🔮 Glass Effect Variants

Each GlassCard supports 4 glass effect variants:

```tsx
// Standard glassmorphism (16px blur)
<GlassCard variant="glass">Standard Glass</GlassCard>

// Heavy frosted effect (32px blur)
<GlassCard variant="frosted">Frosted Glass</GlassCard>

// Vertical streaks effect
<GlassCard variant="fluted">Fluted Glass</GlassCard>

// Diamond-cut reflections
<GlassCard variant="crystal">Crystal Glass</GlassCard>
```

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
npm run test:compliance        # Design system compliance (647 tests)
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
# All tests (2,127 total)
npm test

# Design system compliance (647 tests)
npm run test:compliance:run          # jsdom tests
npm run test:compliance:browser:run  # browser tests

# Visual regression (1,480 screenshots)
npm run test:visual:ci              # Run visual tests
npm run test:visual:update          # Update baselines

# Unit tests (110 tests)
npm run test:unit

# Coverage report (90% target)
npm run test:coverage
```

### Test Categories

| Category                     | Tests     | Coverage          |
| ---------------------------- | --------- | ----------------- |
| **Design System Compliance** | 647       | 100%              |
| **Visual Regression**        | 1,480     | All components    |
| **Unit Tests**               | 110       | 13.87% (growing)  |
| **Total**                    | **2,127** | **Comprehensive** |

## 🛠️ Development

### Prerequisites

- **Node.js**: 20.16+, 22.19+, or 24+
- **npm**: Latest stable version

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/shadcn-glass-ui.git
cd shadcn-glass-ui

# Install dependencies
npm install

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
├── UI_DIZINE.md             # Design system spec
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

MIT © [Your Name]

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
- **Documentation**: [Storybook](https://yourusername.github.io/shadcn-glass-ui/)
- **GitHub**: [shadcn-glass-ui](https://github.com/yourusername/shadcn-glass-ui)
- **Issues**: [Report a bug](https://github.com/yourusername/shadcn-glass-ui/issues)
- **Discussions**: [Community](https://github.com/yourusername/shadcn-glass-ui/discussions)

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/shadcn-glass-ui&type=Date)](https://star-history.com/#yourusername/shadcn-glass-ui&Date)

---

**Made with ❤️ and glassmorphism**
