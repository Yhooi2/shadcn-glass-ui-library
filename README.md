# shadcn-glass-ui

[![npm version](https://img.shields.io/npm/v/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![npm downloads](https://img.shields.io/npm/dm/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![AI-Friendly](https://img.shields.io/badge/AI-Optimized-blueviolet)](docs/AI_USAGE.md)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/shadcn-glass-ui)](https://bundlephobia.com/package/shadcn-glass-ui)

**Glassmorphism UI components for React** — beautiful frosted glass effects, 58 production-ready
components, 3 themes, drop-in compatible with shadcn/ui.

<!-- TODO: Add your project example link here -->
<!-- [🎬 See it in action →](https://your-project-url.com) -->

**[Live Demo](https://yhooi2.github.io/shadcn-glass-ui-library/)** |
**[Interactive Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)** |
**[npm Package](https://www.npmjs.com/package/shadcn-glass-ui)**

---

## Why shadcn-glass-ui?

| Feature              | shadcn-glass-ui                      | Standard shadcn/ui  |
| -------------------- | ------------------------------------ | ------------------- |
| **Themes**           | 3 built-in (Glass/Light/Aurora)      | 1 base theme        |
| **Glass Effects**    | Native blur, glow, transparency      | Manual CSS required |
| **AI Documentation** | Optimized for Claude, Copilot, GPT   | Basic docs          |
| **Components**       | 58 specialized glassmorphism         | ~40 base components |
| **Token System**     | 207 OKLCH primitives, zero hardcoded | CSS variables       |
| **Accessibility**    | WCAG 2.1 AA + 44px touch targets     | Basic a11y          |

**Key advantages:**

- Works alongside existing shadcn/ui components — same patterns, same CLI
- AI-first documentation with decision trees and Context7 integration
- 1,570+ tests (visual regression, compliance, unit)
- Create custom themes in 15 minutes with 3-layer token system

---

## Quick Start

**Requirements:** React 18+, Tailwind CSS 4+

### Install

```bash
npm install shadcn-glass-ui
```

### Use

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
```

**[Full Getting Started Guide →](docs/GETTING_STARTED.md)**

---

## Installation Methods

### Option 1: shadcn CLI (Recommended)

Listed on [registry.directory](https://registry.directory)!

Add to `components.json`:

```json
{
  "registries": {
    "@shadcn-glass-ui": {
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r"
    }
  }
}
```

Install components:

```bash
npx shadcn@latest add @shadcn-glass-ui/button-glass @shadcn-glass-ui/input-glass
```

**[Registry Documentation →](docs/REGISTRY_USAGE.md)**

### Option 2: npm Package

```bash
npm install shadcn-glass-ui
```

**[npm Installation Guide →](docs/GETTING_STARTED.md)**

---

## Components

| Category        | Count | Examples                                                      |
| --------------- | ----- | ------------------------------------------------------------- |
| **Core UI**     | 18    | ButtonGlass, InputGlass, ModalGlass, TabsGlass, CheckboxGlass |
| **Atomic**      | 7     | SearchBoxGlass, ThemeToggleGlass, IconButtonGlass             |
| **Composite**   | 13    | MetricCardGlass, AICardGlass, YearCardGlass                   |
| **Sections**    | 7     | HeaderNavGlass, ProfileHeaderGlass, CareerStatsGlass          |
| **Specialized** | 10    | SparklineGlass, StepperGlass, RainbowProgressGlass            |
| **Primitives**  | 3     | TouchTarget, FormFieldWrapper, InteractiveCard                |

<details>
<summary><strong>Core UI (18)</strong> — Essential building blocks</summary>

ButtonGlass, InputGlass, CheckboxGlass, ToggleGlass, SliderGlass, ModalGlass, TabsGlass,
DropdownGlass, TooltipGlass, AlertGlass, NotificationGlass, BadgeGlass, AvatarGlass, GlassCard,
ProgressGlass, CircularProgressGlass, SkeletonGlass, ComboBoxGlass

</details>

<details>
<summary><strong>Atomic (7)</strong> — Single-purpose components</summary>

IconButtonGlass, ThemeToggleGlass, SearchBoxGlass, SortDropdownGlass, StatItemGlass,
ExpandableHeaderGlass, InsightCardGlass

</details>

<details>
<summary><strong>Composite (13)</strong> — Pre-built complex widgets</summary>

MetricCardGlass, YearCardGlass, AICardGlass, RepositoryCardGlass, TrustScoreDisplayGlass,
CircularMetricGlass, UserStatsLineGlass, UserInfoGlass, CareerStatsHeaderGlass,
ContributionMetricsGlass, MetricsGridGlass, RepositoryHeaderGlass, RepositoryMetadataGlass

</details>

<details>
<summary><strong>Sections (7)</strong> — Full page sections</summary>

HeaderNavGlass, ProfileHeaderGlass, CareerStatsGlass, FlagsSectionGlass, TrustScoreCardGlass,
ProjectsListGlass, HeaderBrandingGlass

</details>

<details>
<summary><strong>Specialized (10)</strong> — Advanced components</summary>

StatusIndicatorGlass, SegmentedControlGlass, RainbowProgressGlass, LanguageBarGlass,
ProfileAvatarGlass, FlagAlertGlass, BaseProgressGlass, SparklineGlass, StepperGlass (compound API
with 3 variants)

</details>

**[Full Component Catalog →](docs/COMPONENTS_CATALOG.md)** |
**[Try in Storybook →](https://yhooi2.github.io/shadcn-glass-ui-library/)**

---

## Themes

Three built-in themes with seamless switching:

- **Glass (Dark)** — Frosted glass effects with purple accents, blur + glow
- **Light** — Clean minimal design with subtle glass effects
- **Aurora** — Gradient glow with aurora borealis-inspired colors

```tsx
import { ThemeProvider, useTheme } from 'shadcn-glass-ui';

function ThemeSwitcher() {
  const { theme, cycleTheme } = useTheme();
  return <button onClick={cycleTheme}>Theme: {theme}</button>;
}
```

**[Theme Creation Guide →](docs/THEME_CREATION_GUIDE.md)** — Create custom themes in 15 minutes

---

## AI Support

This library is optimized for AI coding assistants:

- **Claude Code** — Project-specific instructions in [CLAUDE.md](CLAUDE.md)
- **Context7** — [Indexed](https://context7.com/yhooi2/shadcn-glass-ui-library) with 59 AI-specific
  rules
- **GitHub Copilot** — TypeScript strict mode + comprehensive JSDoc
- **ChatGPT/GPT-4** — Machine-readable [EXPORTS_MAP.json](docs/EXPORTS_MAP.json)

**[AI Usage Guide →](docs/AI_USAGE.md)**

---

## CLI

```bash
npx shadcn-glass-ui info button     # Component info (fuzzy search)
npx shadcn-glass-ui list            # List all components
npx shadcn-glass-ui list --category=core  # Filter by category
```

---

## FAQ

<details>
<summary><strong>How do I migrate from v1.x to v2.0?</strong></summary>

v2.0 renames CSS variables to semantic names. Run automated migration:

```bash
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' {} +
```

**[Full Migration Guide →](docs/BREAKING_CHANGES.md)**

</details>

<details>
<summary><strong>Does it work with existing shadcn/ui components?</strong></summary>

Yes! Glass components use the same patterns and can coexist with standard shadcn/ui components. Same
CLI, same structure.

</details>

<details>
<summary><strong>What are the requirements?</strong></summary>

- React 18.0+ or 19.0+
- React-DOM 18.0+ or 19.0+
- Tailwind CSS 4.0+
- Node.js 20.16+

</details>

<details>
<summary><strong>Where are breaking changes documented?</strong></summary>

- **[BREAKING_CHANGES.md](docs/BREAKING_CHANGES.md)** — v1.0 and v2.0 changes
- **[CHANGELOG.md](CHANGELOG.md)** — Complete version history
- **[Migration Guides](docs/migration/)** — Step-by-step migration

</details>

<details>
<summary><strong>How do I create a custom theme?</strong></summary>

Use the 3-layer token system. Define ~15 semantic tokens and component tokens are inherited
automatically.

```css
[data-theme='custom'] {
  --semantic-primary: var(--oklch-cyan-400);
  --semantic-surface: var(--oklch-slate-900);
  /* ... */
}
```

**[Theme Creation Guide →](docs/THEME_CREATION_GUIDE.md)**

</details>

<details>
<summary><strong>How do I use Compound Components (Modal, Tabs, Stepper)?</strong></summary>

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Title</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>Content</ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

**[Advanced Patterns →](docs/ADVANCED_PATTERNS.md)**

</details>

---

## Documentation

| Resource                                                           | Description                 |
| ------------------------------------------------------------------ | --------------------------- |
| **[Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/)** | Interactive component demos |
| **[Getting Started](docs/GETTING_STARTED.md)**                     | Setup tutorial              |
| **[Component Catalog](docs/COMPONENTS_CATALOG.md)**                | All 58 components           |
| **[AI Usage Guide](docs/AI_USAGE.md)**                             | For Claude, Copilot, GPT    |
| **[Theme Guide](docs/THEME_CREATION_GUIDE.md)**                    | Create custom themes        |
| **[Token Architecture](docs/TOKEN_ARCHITECTURE.md)**               | 3-layer CSS token system    |
| **[Advanced Patterns](docs/ADVANCED_PATTERNS.md)**                 | asChild, Compound APIs      |
| **[Breaking Changes](docs/BREAKING_CHANGES.md)**                   | Migration guides            |

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — See [LICENSE](LICENSE)

## Credits

Built with [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/),
[Tailwind CSS](https://tailwindcss.com/), [Vite](https://vitejs.dev/)

---

<div align="center">

**[Star on GitHub](https://github.com/Yhooi2/shadcn-glass-ui-library)** if you find this useful!

[![Star History Chart](https://api.star-history.com/svg?repos=Yhooi2/shadcn-glass-ui-library&type=Date)](https://star-history.com/#Yhooi2/shadcn-glass-ui-library)

</div>
