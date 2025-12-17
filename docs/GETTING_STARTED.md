# Getting Started with shadcn-glass-ui

Complete guide to integrating shadcn-glass-ui into your React application.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Theme Configuration](#theme-configuration)
- [First Component](#first-component)
- [Common Patterns](#common-patterns)
- [Next Steps](#next-steps)

## Prerequisites

Before starting, ensure you have:

- **Node.js**: 20.16+, 22.19+, or 24+
- **React**: 18.0+ or 19.0+
- **Tailwind CSS**: 4.1+ (or will be installed)
- **TypeScript**: 5.0+ (recommended but optional)

## Installation

### Option 1: shadcn CLI (Recommended)

The easiest way to add components to an existing shadcn/ui project:

```bash
npx shadcn@latest add @shadcn-glass-ui/button-glass
npx shadcn@latest add @shadcn-glass-ui/input-glass
npx shadcn@latest add @shadcn-glass-ui/modal-glass
```

This will:

- Download component files
- Install dependencies
- Configure Tailwind
- Add necessary utilities

### Option 2: NPM Package

Install from the public npm registry:

```bash
npm install shadcn-glass-ui
```

For TypeScript projects, types are included automatically.

### Option 3: Manual Installation

Copy components directly from the repository:

```bash
# Clone the repository
git clone https://github.com/Yhooi2/shadcn-glass-ui-library.git

# Copy desired components
cp shadcn-glass-ui-library/src/components/glass/ui/button-glass.tsx ./src/components/ui/
cp shadcn-glass-ui-library/src/lib/variants/button-glass-variants.ts ./src/lib/variants/
cp shadcn-glass-ui-library/src/lib/utils.ts ./src/lib/
```

## Project Setup

### 1. Install Dependencies

If not using the shadcn CLI, install peer dependencies:

```bash
npm install class-variance-authority clsx tailwind-merge
npm install -D tailwindcss@4.1
```

Optional dependencies for full feature set:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-tabs @radix-ui/react-tooltip
npm install lucide-react  # For icons
```

### 2. Configure Tailwind CSS

Update your `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/shadcn-glass-ui/dist/**/*.{js,ts,jsx,tsx}', // If using npm package
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### 3. Add CSS Variables

Create or update your `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import shadcn-glass-ui styles (if using npm package) */
@import 'shadcn-glass-ui/styles.css';

/* Or define variables manually */
@layer base {
  :root {
    /* Blur tokens */
    --blur-sm: 8px;
    --blur-md: 16px;
    --blur-lg: 24px;
    --blur-xl: 32px;

    /* Glass theme (dark) */
    --card-subtle-bg: rgba(255, 255, 255, 0.08);
    --card-medium-bg: rgba(255, 255, 255, 0.15);
    --card-strong-bg: rgba(255, 255, 255, 0.2);
    --card-medium-border: rgba(255, 255, 255, 0.15);

    /* Text shadow for glass readability */
    --text-shadow-glass: 0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  /* Light theme overrides */
  .theme-light {
    --card-subtle-bg: rgba(0, 0, 0, 0.03);
    --card-medium-bg: rgba(0, 0, 0, 0.05);
    --card-strong-bg: rgba(0, 0, 0, 0.08);
    --card-medium-border: rgba(0, 0, 0, 0.1);
  }

  /* Aurora theme (gradient) */
  .theme-aurora {
    --card-subtle-bg: rgba(255, 255, 255, 0.1);
    --card-medium-bg: rgba(255, 255, 255, 0.18);
    --card-strong-bg: rgba(255, 255, 255, 0.25);
  }
}
```

### 4. Create Utilities File

Create `src/lib/utils.ts` (if not exists):

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Understanding the Token System (v2.0.0+)

shadcn-glass-ui uses a **3-layer token architecture** that eliminates hardcoded colors and enables
rapid theme creation.

### 3-Layer Architecture

```
Layer 3: Component Tokens  (--btn-primary-bg, --input-border, --modal-bg)
         ↓ references
Layer 2: Semantic Tokens   (--semantic-primary, --semantic-surface, --semantic-text)
         ↓ references
Layer 1: Primitive Tokens  (--oklch-purple-500, --oklch-white-8, --oklch-slate-800)
```

**What this means for you:**

1. **No hardcoded colors** - All colors use CSS variables
2. **Easy customization** - Change theme by updating semantic tokens
3. **Consistency** - All components automatically sync with theme changes
4. **Fast theme creation** - Create production-ready themes in 15 minutes

### Token Layers Explained

**Layer 1: Primitives** (`src/styles/tokens/oklch-primitives.css`)

- 207 OKLCH color primitives
- Single source of truth for all colors
- Shared across all themes (glass, light, aurora)

Example:

```css
--oklch-purple-500: oklch(66.6% 0.159 303);
--oklch-white-8: oklch(100% 0 0 / 0.08);
--oklch-emerald-400: oklch(76.5% 0.147 163);
```

**Layer 2: Semantic Tokens** (per-theme in `src/styles/themes/*.css`)

- Role-based color names
- Describe usage, not appearance
- Defined per theme (glass.css, light.css, aurora.css)

Example:

```css
/* glass.css */
--semantic-primary: var(--oklch-purple-500);
--semantic-surface: var(--oklch-white-8);
--semantic-text: var(--oklch-white-90);

/* light.css */
--semantic-primary: var(--oklch-violet-600);
--semantic-surface: var(--oklch-slate-100-80);
--semantic-text: var(--oklch-slate-800);
```

**Layer 3: Component Tokens** (per-theme in `src/styles/themes/*.css`)

- Component-specific styling
- References semantic tokens
- Inherited automatically when creating new themes

Example:

```css
--btn-primary-bg: linear-gradient(135deg, var(--semantic-primary), var(--semantic-secondary));
--btn-primary-text: var(--semantic-text-inverse);
--input-border: var(--semantic-border);
--modal-bg: var(--semantic-surface-elevated);
```

### Using Tokens in Your Code

**DO ✅ Use semantic tokens:**

```tsx
// Tailwind arbitrary values
<div className="bg-[var(--semantic-surface)] text-[var(--semantic-text)]">
  Content
</div>

// Custom CSS
.my-component {
  background: var(--semantic-surface);
  color: var(--semantic-text);
  border: 1px solid var(--semantic-border);
}
```

**DON'T ❌ Hardcode OKLCH values:**

```tsx
// ❌ BAD
<div style={{ background: 'oklch(66.6% 0.159 303)' }}>Content</div>

// ❌ BAD
.my-component {
  background: oklch(100% 0 0 / 0.08);
}
```

### v2.0.0 Breaking Changes

**Removed CSS variables** (use semantic replacements):

| Removed (v1.x)       | Replacement (v2.0+)      |
| -------------------- | ------------------------ |
| `--metric-emerald-*` | `--metric-success-*`     |
| `--metric-amber-*`   | `--metric-warning-*`     |
| `--metric-blue-*`    | `--metric-default-*`     |
| `--metric-red-*`     | `--metric-destructive-*` |

**Migration:**

```css
/* ❌ v1.x (REMOVED) */
background: var(--metric-emerald-bg);

/* ✅ v2.0+ */
background: var(--metric-success-bg);
```

See [CSS Variables Migration Guide](migration/CSS_VARIABLES_MIGRATION_2.0.md) for automated
migration scripts.

### Benefits

- **15-minute theme creation** - Was 2-3 hours before v2.0.0
- **Zero duplication** - Single source of truth for colors
- **Type-safe theming** - Semantic names prevent confusion
- **Maintainability** - Update one variable, affects all components

### Documentation

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) - Complete 3-layer system guide
- [THEME_CREATION_GUIDE.md](THEME_CREATION_GUIDE.md) - Create themes in 15 minutes
- [CSS_VARIABLES_AUDIT.md](CSS_VARIABLES_AUDIT.md) - Full variable reference

## Theme Configuration

### Basic Theme Setup

Wrap your app with a theme class:

```tsx
// app.tsx or layout.tsx
export default function App() {
  return (
    <div className="theme-glass min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <YourApp />
    </div>
  );
}
```

### Dynamic Theme Switching

Use the built-in theme provider:

```tsx
// main.tsx or app.tsx
import { ThemeProvider } from '@/lib/theme-context';

function Main() {
  return (
    <ThemeProvider defaultTheme="glass">
      <App />
    </ThemeProvider>
  );
}
```

Create a theme switcher component:

```tsx
// components/ThemeSwitcher.tsx
import { useTheme } from '@/lib/theme-context';
import { ButtonGlass } from '@/components/glass/ui/button-glass';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <ButtonGlass
        variant={theme === 'glass' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('glass')}
      >
        Glass
      </ButtonGlass>

      <ButtonGlass
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('light')}
      >
        Light
      </ButtonGlass>

      <ButtonGlass
        variant={theme === 'aurora' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('aurora')}
      >
        Aurora
      </ButtonGlass>
    </div>
  );
}
```

## First Component

### Simple Button

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';
// or: import { ButtonGlass } from '@/components/glass/ui/button-glass';

export default function Demo() {
  return (
    <div className="theme-glass p-8">
      <ButtonGlass variant="default" size="default" onClick={() => alert('Clicked!')}>
        Click Me
      </ButtonGlass>
    </div>
  );
}
```

### Form with Input

```tsx
import { useState } from 'react';
import { InputGlass, ButtonGlass } from 'shadcn-glass-ui';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="theme-glass min-h-screen flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <InputGlass
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <InputGlass
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <ButtonGlass type="submit" className="w-full">
          Sign In
        </ButtonGlass>
      </form>
    </div>
  );
}
```

### Card with Content

```tsx
import { GlassCard, ButtonGlass, BadgeGlass } from 'shadcn-glass-ui';

export default function ProductCard() {
  return (
    <div className="theme-glass p-8">
      <GlassCard variant="glass" intensity="medium" padding="default">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Glass UI Pro</h3>
            <BadgeGlass variant="success">New</BadgeGlass>
          </div>

          <p className="text-sm opacity-80">
            Premium glassmorphism components for modern applications
          </p>

          <div className="flex items-center justify-between pt-4">
            <span className="text-2xl font-bold">$49</span>
            <ButtonGlass variant="default">Purchase</ButtonGlass>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
```

## Common Patterns

### Modal Dialog

```tsx
import { useState } from 'react';
import { ModalGlass, ButtonGlass } from 'shadcn-glass-ui';

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-glass p-8">
      <ButtonGlass onClick={() => setIsOpen(true)}>Open Modal</ButtonGlass>

      <ModalGlass
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="default"
      >
        <p className="mb-6">Are you sure you want to proceed?</p>

        <div className="flex gap-3 justify-end">
          <ButtonGlass variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </ButtonGlass>
          <ButtonGlass
            onClick={() => {
              console.log('Confirmed');
              setIsOpen(false);
            }}
          >
            Confirm
          </ButtonGlass>
        </div>
      </ModalGlass>
    </div>
  );
}
```

### Settings Panel

```tsx
import { ToggleGlass, CheckboxGlass } from 'shadcn-glass-ui';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    emailUpdates: false,
  });

  return (
    <div className="theme-glass p-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>

        <div className="space-y-4">
          <ToggleGlass
            pressed={settings.notifications}
            onPressedChange={(pressed) =>
              setSettings((prev) => ({ ...prev, notifications: pressed }))
            }
            label="Push Notifications"
          />

          <ToggleGlass
            pressed={settings.darkMode}
            onPressedChange={(pressed) => setSettings((prev) => ({ ...prev, darkMode: pressed }))}
            label="Dark Mode"
          />

          <CheckboxGlass
            id="auto-save"
            checked={settings.autoSave}
            onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoSave: checked }))}
            label="Auto Save"
          />

          <CheckboxGlass
            id="email-updates"
            checked={settings.emailUpdates}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, emailUpdates: checked }))
            }
            label="Email Updates"
          />
        </div>
      </div>
    </div>
  );
}
```

### Navigation with Tabs

```tsx
import { TabsGlass } from 'shadcn-glass-ui';

export default function Dashboard() {
  return (
    <div className="theme-glass p-8">
      <TabsGlass defaultValue="overview">
        <TabsGlass.List>
          <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
          <TabsGlass.Trigger value="analytics">Analytics</TabsGlass.Trigger>
          <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
        </TabsGlass.List>

        <TabsGlass.Content value="overview">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <p>Dashboard overview content...</p>
        </TabsGlass.Content>

        <TabsGlass.Content value="analytics">
          <h3 className="text-lg font-semibold mb-4">Analytics</h3>
          <p>Analytics charts and data...</p>
        </TabsGlass.Content>

        <TabsGlass.Content value="settings">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          <p>Settings configuration...</p>
        </TabsGlass.Content>
      </TabsGlass>
    </div>
  );
}
```

## Next Steps

### Explore More Components

- [ButtonGlass](../src/components/ButtonGlass.mdx) - All button variants
- [InputGlass](../src/components/InputGlass.mdx) - Form inputs
- [ModalGlass](../src/components/ModalGlass.mdx) - Dialogs
- [GlassCard](../src/components/GlassCard.mdx) - Card containers
- [Full Component List](../README.md#component-categories)

### Learn the Design System

Read [UI_DESIGN.md](design-system/UI_DESIGN.md) to understand:

- Design tokens and spacing
- Touch target requirements
- Accessibility guidelines
- Theme specifications

### Browse Examples

- [Storybook](https://yhooi2.github.io/shadcn-glass-ui-library/) - Live component demos
- [ComponentShowcase](../src/components/demos/ComponentShowcase.tsx) - All components in one page
- [DesktopShowcase](../src/components/demos/DesktopShowcase.tsx) - Full application example
- [MobileShowcase](../src/components/demos/MobileShowcase.tsx) - Mobile-optimized showcase

### Customize

- Create custom variants with CVA
- Extend theme with custom colors
- Build composite components
- Add your own glass effects

### Get Help

- [GitHub Discussions](https://github.com/Yhooi2/shadcn-glass-ui-library/discussions)
- [Issues](https://github.com/Yhooi2/shadcn-glass-ui-library/issues)
- [Contributing Guide](../CONTRIBUTING.md)

---

**Happy building with glassmorphism!** ✨
