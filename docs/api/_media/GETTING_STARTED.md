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
npx shadcn@latest add @shadcn-glass-ui/button
npx shadcn@latest add @shadcn-glass-ui/input
npx shadcn@latest add @shadcn-glass-ui/modal
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
@import 'shadcn-glass-ui/dist/styles.css';

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
    --card-strong-bg: rgba(255, 255, 255, 0.20);
    --card-medium-border: rgba(255, 255, 255, 0.15);

    /* Text shadow for glass readability */
    --text-shadow-glass: 0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  /* Light theme overrides */
  .theme-light {
    --card-subtle-bg: rgba(0, 0, 0, 0.03);
    --card-medium-bg: rgba(0, 0, 0, 0.05);
    --card-strong-bg: rgba(0, 0, 0, 0.08);
    --card-medium-border: rgba(0, 0, 0, 0.10);
  }

  /* Aurora theme (gradient) */
  .theme-aurora {
    --card-subtle-bg: rgba(255, 255, 255, 0.10);
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
        variant={theme === 'glass' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setTheme('glass')}
      >
        Glass
      </ButtonGlass>

      <ButtonGlass
        variant={theme === 'light' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setTheme('light')}
      >
        Light
      </ButtonGlass>

      <ButtonGlass
        variant={theme === 'aurora' ? 'primary' : 'ghost'}
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
      <ButtonGlass
        variant="primary"
        size="md"
        onClick={() => alert('Clicked!')}
      >
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
            <ButtonGlass variant="primary">
              Purchase
            </ButtonGlass>
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
      <ButtonGlass onClick={() => setIsOpen(true)}>
        Open Modal
      </ButtonGlass>

      <ModalGlass
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md"
      >
        <p className="mb-6">Are you sure you want to proceed?</p>

        <div className="flex gap-3 justify-end">
          <ButtonGlass variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </ButtonGlass>
          <ButtonGlass onClick={() => {
            console.log('Confirmed');
            setIsOpen(false);
          }}>
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
            checked={settings.notifications}
            onCheckedChange={(checked) =>
              setSettings(prev => ({ ...prev, notifications: checked }))
            }
            label="Push Notifications"
          />

          <ToggleGlass
            checked={settings.darkMode}
            onCheckedChange={(checked) =>
              setSettings(prev => ({ ...prev, darkMode: checked }))
            }
            label="Dark Mode"
          />

          <CheckboxGlass
            id="auto-save"
            checked={settings.autoSave}
            onCheckedChange={(checked) =>
              setSettings(prev => ({ ...prev, autoSave: checked }))
            }
            label="Auto Save"
          />

          <CheckboxGlass
            id="email-updates"
            checked={settings.emailUpdates}
            onCheckedChange={(checked) =>
              setSettings(prev => ({ ...prev, emailUpdates: checked }))
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
- [ComponentShowcase](../src/components/ComponentShowcase.tsx) - All components in one page
- [DesktopShowcase](../src/components/DesktopShowcase.tsx) - Full application example

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
