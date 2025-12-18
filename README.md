# shadcn-glass-ui

[![npm version](https://img.shields.io/npm/v/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![npm downloads](https://img.shields.io/npm/dm/shadcn-glass-ui.svg)](https://www.npmjs.com/package/shadcn-glass-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/shadcn-glass-ui?cacheSeconds=86400)](https://bundlephobia.com/package/shadcn-glass-ui)
[![AI-Friendly](https://img.shields.io/badge/AI-Optimized-blueviolet)](docs/AI_USAGE.md)

**Glassmorphism components for React** — drop-in compatible with shadcn/ui. 59 components, 3 themes,
zero migration.

<div align="center">
  <img src="https://yhooi2.github.io/shadcn-glass-ui-library/demo-screenshot.png" alt="shadcn-glass-ui Demo" width="100%" />
  <br />
  <a href="https://yhooi2.github.io/shadcn-glass-ui-library/"><strong>Live Demo</strong></a> ·
  <a href="https://www.npmjs.com/package/shadcn-glass-ui"><strong>npm</strong></a> ·
  <a href="docs/GETTING_STARTED.md"><strong>Docs</strong></a>
</div>

---

## Quick Start

```bash
npm install shadcn-glass-ui
```

```tsx
import { ButtonGlass, ThemeProvider } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/styles.css';

export default function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <ButtonGlass variant="default">Click me</ButtonGlass>
    </ThemeProvider>
  );
}
```

**Or via shadcn CLI** — add to `components.json`:

```json
{
  "registries": {
    "@shadcn-glass-ui": {
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r"
    }
  }
}
```

```bash
npx shadcn@latest add @shadcn-glass-ui/button-glass
```

---

## Choose Your Path

| Goal                    | Resource                                                       |
| ----------------------- | -------------------------------------------------------------- |
| **Get started**         | [Getting Started Guide](docs/GETTING_STARTED.md)               |
| **Browse components**   | [Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/) |
| **Use with AI**         | [AI Usage Guide](docs/AI_USAGE.md)                             |
| **Create custom theme** | [Theme Guide](docs/THEME_CREATION_GUIDE.md)                    |
| **Migrate from v1.x**   | [Breaking Changes](docs/BREAKING_CHANGES.md)                   |

---

## Why shadcn-glass-ui?

|                   | shadcn-glass-ui                 | shadcn/ui    |
| ----------------- | ------------------------------- | ------------ |
| **Themes**        | 3 built-in (Glass/Light/Aurora) | 1 base       |
| **Glass effects** | Native blur, glow, transparency | Manual CSS   |
| **Components**    | 59 specialized                  | ~40 base     |
| **Custom theme**  | 15 lines CSS                    | Full rewrite |
| **AI docs**       | Context7, Claude Code, Copilot  | Basic        |

**Works alongside shadcn/ui** — same API, same CLI, no migration:

```tsx
import { Button } from '@/components/ui/button';           // shadcn/ui
import { ButtonGlass } from '@/components/glass/ui/button-glass';  // Glass variant

<Button variant="outline">Standard</Button>
<ButtonGlass variant="default">Glassmorphism</ButtonGlass>
```

---

## Components

| Category        | Count | Examples                                           |
| --------------- | ----- | -------------------------------------------------- |
| **Core UI**     | 22    | ButtonGlass, InputGlass, ModalGlass, SidebarGlass  |
| **Composite**   | 14    | MetricCardGlass, SplitLayoutGlass, AICardGlass     |
| **Specialized** | 9     | StepperGlass, SparklineGlass, RainbowProgressGlass |
| **Sections**    | 7     | HeaderNavGlass, ProfileHeaderGlass                 |
| **Atomic**      | 7     | SearchBoxGlass, ThemeToggleGlass                   |

[**Browse all 59 components →**](https://yhooi2.github.io/shadcn-glass-ui-library/)

---

## Themes

Three built-in themes with instant switching:

- **Glass** — Dark glassmorphism with purple accents
- **Light** — Clean minimal with subtle glass
- **Aurora** — Gradient glow effects

```tsx
const { theme, cycleTheme } = useTheme();
<button onClick={cycleTheme}>Theme: {theme}</button>;
```

**Create custom themes in ~15 lines** — [Theme Guide](docs/THEME_CREATION_GUIDE.md)

---

## AI-Optimized

Built for AI coding assistants:

| Tool             | Integration                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| **Context7 MCP** | [Auto-indexed](https://context7.com/yhooi2/shadcn-glass-ui-library) — 63 rules |
| **Claude Code**  | [CLAUDE.md](CLAUDE.md) — 365 lines of context                                  |
| **Copilot**      | TypeScript strict + JSDoc                                                      |

[**AI Usage Guide →**](docs/AI_USAGE.md)

---

## Documentation

| Resource                                                           | Description           |
| ------------------------------------------------------------------ | --------------------- |
| [**Storybook**](https://yhooi2.github.io/shadcn-glass-ui-library/) | Interactive demos     |
| [**Getting Started**](docs/GETTING_STARTED.md)                     | Installation & setup  |
| [**Component Catalog**](docs/COMPONENTS_CATALOG.md)                | All 57 components     |
| [**Theme Guide**](docs/THEME_CREATION_GUIDE.md)                    | Custom themes         |
| [**Token Architecture**](docs/TOKEN_ARCHITECTURE.md)               | 3-layer CSS system    |
| [**AI Usage**](docs/AI_USAGE.md)                                   | Claude, Copilot, GPT  |
| [**Breaking Changes**](docs/BREAKING_CHANGES.md)                   | v1.x → v2.0 migration |

---

## Requirements

- React 18+ or 19+
- Tailwind CSS 4.1+
- Node.js 20.16+

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — [LICENSE](LICENSE)

---

<div align="center">
  <strong>Built with</strong>
  <a href="https://ui.shadcn.com/">shadcn/ui</a> ·
  <a href="https://www.radix-ui.com/">Radix UI</a> ·
  <a href="https://tailwindcss.com/">Tailwind CSS</a>
  <br /><br />
  <a href="https://github.com/Yhooi2/shadcn-glass-ui-library">Star on GitHub</a> if you find this useful!
</div>
