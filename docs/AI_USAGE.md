# AI Usage Guide for shadcn-glass-ui

This guide is specifically for **AI assistants** (Claude Code, GitHub Copilot, GPT-based tools)
helping users integrate shadcn-glass-ui into their projects.

**Version:** 2.0.0+ (v1.x support removed)

## Quick Decision Tree

### When a user asks "I want to use shadcn-glass-ui"

**Step 1: Identify their project type**

```
Is this an existing shadcn/ui project?
│
├─ YES → Use shadcn CLI (Option A)
│         Best for: Existing shadcn/ui projects
│         Benefits: Automatic dependency resolution, familiar workflow
│
└─ NO → Is this a new project?
    │
    ├─ YES → Use npm package (Option B)
    │         Best for: New projects without shadcn/ui
    │         Benefits: Faster setup, pre-built components
    │
    └─ NO → Use manual copy (Option C)
              Best for: Custom setups, learning internals
              Benefits: Full control, no dependencies on npm/registry
```

---

## Option A: shadcn CLI (Existing shadcn/ui Projects)

### Prerequisites Check

Before suggesting this option, verify:

- `components.json` exists in project root
- `@/components/ui` alias configured
- Tailwind CSS installed

### Installation Steps

**1. Add registry to `components.json`**

```json
{
  "registries": {
    "@shadcn-glass-ui": {
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r"
    }
  }
}
```

**2. Install components**

```bash
npx shadcn@latest add @shadcn-glass-ui/button-glass
```

**3. Import and use**

```tsx
import { ButtonGlass } from '@/components/glass/ui/button-glass';

<ButtonGlass variant="default">Click me</ButtonGlass>;
```

### Common Issues

**Issue: "Registry not found"**

- **Cause:** Missing registry configuration
- **Fix:** Ensure `registries` object in `components.json`

**Issue: "Component not found"**

- **Cause:** Wrong component name
- **Fix:** Use `@shadcn-glass-ui/` prefix (e.g., `@shadcn-glass-ui/button-glass`, not `ButtonGlass`)

---

## Option B: npm Package (New Projects)

### Prerequisites

```bash
# Check Node.js version (must be 20.16+, 22.19+, or 24+)
node --version

# Check React version (must be 18.0+ or 19.0+)
npm list react
```

### Installation Steps

**1. Install package**

```bash
npm install shadcn-glass-ui
```

**2. Install peer dependencies**

```bash
npm install react@19 react-dom@19 tailwindcss@4
```

**3. Configure Tailwind**

Create/update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/shadcn-glass-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
    },
  },
} satisfies Config;
```

**4. Import CSS**

In your main CSS file (`src/index.css` or `src/globals.css`):

```css
@import 'shadcn-glass-ui/dist/styles.css';
```

**5. Wrap app with theme provider**

```tsx
import { ThemeProvider } from 'shadcn-glass-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <YourApp />
    </ThemeProvider>
  );
}
```

**6. Use components**

```tsx
import { ButtonGlass, InputGlass } from 'shadcn-glass-ui';

<ButtonGlass variant="default">Click me</ButtonGlass>
<InputGlass placeholder="Enter text..." />
```

### Verification Steps

**After installation, verify setup:**

```bash
# 1. Check package installed
npm list shadcn-glass-ui

# 2. Check Tailwind can find CSS
npm run build  # Should not show Tailwind warnings

# 3. Test component import
# Create test file: src/test-glass.tsx
```

```tsx
// src/test-glass.tsx
import { ButtonGlass } from 'shadcn-glass-ui';

export function Test() {
  return <ButtonGlass>Test</ButtonGlass>;
}
```

### Common Issues

**Issue: "Module not found: 'shadcn-glass-ui'"**

- **Cause:** Package not installed
- **Fix:** `npm install shadcn-glass-ui`

**Issue: "Peer dependency warning"**

- **Cause:** Missing React or Tailwind
- **Fix:** `npm install react@19 react-dom@19 tailwindcss@4`

**Issue: "Styles not applied"**

- **Cause:** CSS not imported
- **Fix:** Add `@import 'shadcn-glass-ui/dist/styles.css';` to main CSS

---

## Option C: Manual Copy (Custom Setups)

### When to Use

- Learning component internals
- Custom build systems
- Offline development
- No npm/yarn available

### Steps

**1. Copy component files**

```bash
# Example: Copy ButtonGlass
curl -o src/components/glass/ui/button-glass.tsx \
  https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/src/components/glass/ui/button-glass.tsx

curl -o src/lib/variants/button-glass-variants.ts \
  https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/src/lib/variants/button-glass-variants.ts
```

**2. Install dependencies manually**

```bash
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot lucide-react
```

**3. Create utilities file**

```bash
curl -o src/lib/utils.ts \
  https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/src/lib/utils.ts
```

---

## AI Assistant Workflow

### When user says: "Add a button to my app"

**Step 1: Ask clarifying questions**

```
"I can help you add a glassmorphism button. First, let me check your setup:

1. Do you have shadcn/ui already configured? (Check for components.json)
2. If not, are you starting a new project or modifying an existing one?
3. What's your React version? (Run: npm list react)
```

**Step 2: Choose installation method**

Based on answers above, recommend Option A, B, or C.

**Step 3: Provide code**

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';

function MyComponent() {
  return (
    <ButtonGlass variant="default" size="default" onClick={() => console.log('Clicked!')}>
      Click me
    </ButtonGlass>
  );
}
```

**Step 4: Suggest theme setup**

```tsx
// If theme not configured:
"I notice you haven't set up the theme provider. Add this to your App.tsx:";

import { ThemeProvider } from 'shadcn-glass-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <MyComponent />
    </ThemeProvider>
  );
}
```

---

## Component Selection Guide

### Minimal Starter Kit (5 components)

Recommend these for new users:

```bash
npx shadcn@latest add \
  @shadcn-glass-ui/button-glass \
  @shadcn-glass-ui/input-glass \
  @shadcn-glass-ui/glass-card \
  @shadcn-glass-ui/badge-glass \
  @shadcn-glass-ui/modal-glass
```

**Why these 5?**

- **ButtonGlass** - Most common UI element
- **InputGlass** - Forms need inputs
- **GlassCard** - Layout container
- **BadgeGlass** - Status indicators
- **ModalGlass** - Dialogs/confirmations

### Use Case Based Recommendations

**User says: "I'm building a dashboard"**

```bash
npx shadcn@latest add \
  @shadcn-glass-ui/glass-card \
  @shadcn-glass-ui/metric-card-glass \
  @shadcn-glass-ui/progress-glass \
  @shadcn-glass-ui/badge-glass \
  @shadcn-glass-ui/tabs-glass
```

**User says: "I need a login form"**

```bash
npx shadcn@latest add \
  @shadcn-glass-ui/input-glass \
  @shadcn-glass-ui/button-glass \
  @shadcn-glass-ui/checkbox-glass \
  @shadcn-glass-ui/alert-glass
```

**User says: "I'm creating a settings page"**

```bash
npx shadcn@latest add \
  @shadcn-glass-ui/toggle-glass \
  @shadcn-glass-ui/checkbox-glass \
  @shadcn-glass-ui/slider-glass \
  @shadcn-glass-ui/tabs-glass
```

---

## v2.0.0 API Reference

### Component APIs (100% shadcn/ui Compatible)

v2.0.0 achieves **complete API compatibility with shadcn/ui**.

#### ButtonGlass

```tsx
// Available variants
<ButtonGlass variant="default">Default</ButtonGlass>
<ButtonGlass variant="secondary">Secondary</ButtonGlass>
<ButtonGlass variant="destructive">Destructive</ButtonGlass>
<ButtonGlass variant="outline">Outline</ButtonGlass>
<ButtonGlass variant="ghost">Ghost</ButtonGlass>
<ButtonGlass variant="link">Link</ButtonGlass>

// Available sizes
<ButtonGlass size="default">Default</ButtonGlass>
<ButtonGlass size="sm">Small</ButtonGlass>
<ButtonGlass size="lg">Large</ButtonGlass>
<ButtonGlass size="icon">Icon Only</ButtonGlass>
```

#### ToggleGlass

```tsx
// Uses pressed/onPressedChange (shadcn/ui pattern)
<ToggleGlass pressed={isOn} onPressedChange={(pressed) => setIsOn(pressed)} />
```

#### SliderGlass

```tsx
// Uses array values (Radix UI pattern)
<SliderGlass value={[50]} onValueChange={(val) => setValue(val[0])} />

// Range slider support
<SliderGlass value={[25, 75]} onValueChange={setRange} />
```

#### ComboBoxGlass

```tsx
// Uses onValueChange (shadcn/ui pattern)
<ComboBoxGlass options={options} value={value} onValueChange={setValue} />
```

#### AlertGlass (Compound Component)

```tsx
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Something went wrong</AlertGlassDescription>
</AlertGlass>
```

#### ModalGlass (Compound Component)

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>My Modal</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>Content here</ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

#### TabsGlass (Compound Component)

```tsx
<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
    <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="overview">
    <OverviewPanel />
  </TabsGlass.Content>

  <TabsGlass.Content value="settings">
    <SettingsPanel />
  </TabsGlass.Content>
</TabsGlass.Root>
```

### CSS Variables (Semantic Naming)

v2.0.0 uses semantic CSS variable names:

```css
/* Semantic metric colors */
--metric-success-bg, --metric-success-text, --metric-success-border, --metric-success-glow
--metric-warning-bg, --metric-warning-text, --metric-warning-border, --metric-warning-glow
--metric-default-bg, --metric-default-text, --metric-default-border, --metric-default-glow
--metric-destructive-bg, --metric-destructive-text, --metric-destructive-border, --metric-destructive-glow
```

For custom styling, always use semantic tokens:

```css
/* DO use semantic tokens */
.my-component {
  background: var(--semantic-primary);
  color: var(--semantic-text);
}

/* DON'T hardcode OKLCH values */
.my-component {
  background: oklch(66.6% 0.159 303); /* NEVER do this */
}
```

---

## Testing Components

### Verify Installation

**Test 1: Import works**

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';
// No TypeScript errors → Package installed correctly
```

**Test 2: Styles applied**

```tsx
<div className="theme-glass p-8">
  <ButtonGlass variant="default">Test</ButtonGlass>
</div>
// Button should have glass effect → CSS loaded correctly
```

**Test 3: Theme switching**

```tsx
import { ThemeProvider, useTheme } from 'shadcn-glass-ui';

function Test() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <button onClick={() => setTheme('glass')}>Glass</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </>
  );
}
// Clicking buttons changes theme → Theme system works
```

---

## Debugging Common Issues

### Issue 1: "Cannot find module 'shadcn-glass-ui'"

**Diagnosis:**

```bash
npm list shadcn-glass-ui
# If not found → package not installed
```

**Fix:**

```bash
npm install shadcn-glass-ui
```

### Issue 2: "Component has no styles"

**Diagnosis:**

- Check if CSS imported in `src/index.css`
- Check if Tailwind config includes `node_modules/shadcn-glass-ui/dist/**/*`

**Fix:**

```css
/* src/index.css */
@import 'shadcn-glass-ui/dist/styles.css';
```

```typescript
// tailwind.config.ts
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './node_modules/shadcn-glass-ui/dist/**/*.{js,ts,jsx,tsx}',
],
```

### Issue 3: "Theme not applying"

**Diagnosis:**

- Check if `ThemeProvider` wraps components
- Check if theme class applied to container

**Fix:**

```tsx
import { ThemeProvider } from 'shadcn-glass-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <div className="theme-glass min-h-screen">
        <YourApp />
      </div>
    </ThemeProvider>
  );
}
```

---

## CLI Commands

Explore components directly from the command line:

```bash
# Get component info (fuzzy search supported)
npx shadcn-glass-ui info ButtonGlass
npx shadcn-glass-ui info button     # Works with partial names
npx shadcn-glass-ui info modal      # Finds ModalGlass

# List all components
npx shadcn-glass-ui list

# List by category
npx shadcn-glass-ui list --category=core
npx shadcn-glass-ui list --category=composite
npx shadcn-glass-ui list --level=1

# Show help
npx shadcn-glass-ui --help
```

---

## Context7 MCP Integration

This library is indexed on [Context7](https://context7.com/yhooi2/shadcn-glass-ui-library) for AI
assistant discoverability.

### Using Context7 MCP

```
// Resolve library ID
mcp__context7__resolve-library-id shadcn-glass-ui
// Returns: /yhooi2/shadcn-glass-ui-library

// Fetch documentation
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library --topic="ButtonGlass"
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library --topic="themes"
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library --topic="token architecture"
```

### Context7 Rules Summary

**Component API:**

- Use `variant` prop (not `type`) for AlertGlass/NotificationGlass
- Use `variant="destructive"` (not `variant="danger"`) for ButtonGlass
- ModalGlass and TabsGlass use compound component API
- StepperGlass uses compound API: Root, Step, Title, Description, Indicator
- Use `asChild` prop for polymorphic rendering

**Theming:**

- Three themes: `glass`, `light`, `aurora`
- Always wrap with ThemeProvider
- Use semantic tokens, never hardcode OKLCH values
- 207 primitive tokens in `src/styles/tokens/oklch-primitives.css`

---

## Resources for AI Assistants

### Quick Reference

- **Package name:** `shadcn-glass-ui`
- **Registry URL:** `https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r`
- **Registry namespace:** `@shadcn-glass-ui`
- **Context7 Library ID:** `/yhooi2/shadcn-glass-ui-library`
- **Component count:** 57 (includes StepperGlass)
- **React version:** 18.0+ or 19.0+
- **Tailwind version:** 4.1+
- **Node version:** 20.16+, 22.19+, or 24+

### Import Patterns

**npm package:**

```tsx
import { ButtonGlass, InputGlass } from 'shadcn-glass-ui';
import { ThemeProvider, useTheme } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';
```

**shadcn CLI:**

```tsx
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { ThemeProvider } from '@/lib/theme-context';
```

### Component Variants Reference

**ButtonGlass:**

- `default`, `secondary`, `outline`, `ghost`, `link`, `destructive`

**BadgeGlass:**

- `default`, `secondary`, `outline`, `destructive`, `success`, `warning`, `info`

**AlertGlass:**

- `default`, `destructive`, `success`, `warning`

**GlassCard:**

- `glass`, `light`, `aurora`, `outline`
- Intensity: `subtle`, `medium`, `strong`

---

## Best Practices for AI Assistants

### DO

1. **Check project setup first**
   - Look for `package.json`
   - Check for `components.json`
   - Verify React/Tailwind versions

2. **Recommend based on context**
   - Existing shadcn/ui → shadcn CLI
   - New project → npm package
   - Custom setup → manual copy

3. **Provide complete code**
   - Include imports
   - Show theme setup
   - Add TypeScript types

4. **Test before suggesting**
   - Verify component names
   - Check variant names
   - Ensure props exist

### DON'T

1. **Don't mix installation methods**

   ```tsx
   // BAD: Mixing npm and shadcn CLI imports
   import { ButtonGlass } from 'shadcn-glass-ui';
   import { InputGlass } from '@/components/glass/ui/input-glass';

   // GOOD: Consistent imports
   import { ButtonGlass, InputGlass } from 'shadcn-glass-ui';
   ```

2. **Don't skip theme setup**

   ```tsx
   // BAD: No theme provider
   function App() {
     return <ButtonGlass>Click me</ButtonGlass>;
   }

   // GOOD: With theme provider
   function App() {
     return (
       <ThemeProvider defaultTheme="glass">
         <ButtonGlass>Click me</ButtonGlass>
       </ThemeProvider>
     );
   }
   ```

3. **Don't forget CSS import**

   ```css
   /* BAD: Missing CSS import */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* GOOD: Include glass styles */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   @import 'shadcn-glass-ui/dist/styles.css';
   ```

---

## Prompts for AI Assistants

### Prompt 1: "Help me install shadcn-glass-ui"

**Response template:**

```
I'll help you install shadcn-glass-ui. First, let me check your project setup:

1. [Check package.json for React version]
2. [Check for components.json]
3. [Recommend installation method]

Based on your setup, I recommend [Option A/B/C].

Here are the steps:
[Provide step-by-step instructions]

After installation, try this test component:
[Provide test code]
```

### Prompt 2: "Add a glass button"

**Response template:**

````
I'll add a glassmorphism button to your project.

[If not installed: Suggest installation first]

Here's the code:

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';

function MyComponent() {
  return (
    <ButtonGlass
      variant="default"
      size="default"
      onClick={() => alert('Clicked!')}
    >
      Click me
    </ButtonGlass>
  );
}
````

Available variants:

- default (standard)
- secondary (muted)
- outline (border only)
- ghost (transparent)
- link (text only)
- destructive (red for delete/danger)

[If theme not set up: Suggest ThemeProvider]

```

---

## Support Escalation

### When to recommend reading docs

- User wants to customize themes → [THEME_CREATION_GUIDE.md](THEME_CREATION_GUIDE.md)
- User wants to understand architecture → [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md)
- User wants breaking changes info → [BREAKING_CHANGES.md](BREAKING_CHANGES.md)

### When to recommend Storybook

- User wants to see all components → https://yhooi2.github.io/shadcn-glass-ui-library/
- User wants to test interactivity → Storybook interactive mode
- User wants to explore variants → Storybook controls

### When to recommend GitHub Issues

- Bug in component
- Missing feature
- TypeScript type errors
- Build failures

---

**Made for AI assistants by shadcn-glass-ui team**
```
