# AI Usage Guide for shadcn-glass-ui

This guide is specifically for **AI assistants** (Claude Code, GitHub Copilot, GPT-based tools)
helping users integrate shadcn-glass-ui into their projects.

## 🎯 Quick Decision Tree

### When a user asks "I want to use shadcn-glass-ui"

**Step 1: Identify their project type**

```
Is this an existing shadcn/ui project?
│
├─ YES → Use shadcn CLI (Option A)
│         ✅ Best for: Existing shadcn/ui projects
│         ✅ Benefits: Automatic dependency resolution, familiar workflow
│
└─ NO → Is this a new project?
    │
    ├─ YES → Use npm package (Option B)
    │         ✅ Best for: New projects without shadcn/ui
    │         ✅ Benefits: Faster setup, pre-built components
    │
    └─ NO → Use manual copy (Option C)
              ✅ Best for: Custom setups, learning internals
              ✅ Benefits: Full control, no dependencies on npm/registry
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

<ButtonGlass variant="primary">Click me</ButtonGlass>;
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

<ButtonGlass variant="primary">Click me</ButtonGlass>
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

## 🧠 AI Assistant Workflow

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
    <ButtonGlass variant="primary" size="md" onClick={() => console.log('Clicked!')}>
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

## 📦 Component Selection Guide

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

## 🚨 Migration from v0.x to v1.0

### Breaking Changes Summary

**1. ButtonGlass: `variant="danger"` removed**

```tsx
// ❌ v0.x
<ButtonGlass variant="danger">Delete</ButtonGlass>

// ✅ v1.0
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

**2. AlertGlass: `type` → `variant`**

```tsx
// ❌ v0.x
<AlertGlass type="error" title="Error">Message</AlertGlass>

// ✅ v1.0
<AlertGlass variant="destructive" title="Error">Message</AlertGlass>
```

**3. SelectGlass removed → Use ComboBoxGlass**

```tsx
// ❌ v0.x
<SelectGlass options={options} value={value} onChange={setValue} />

// ✅ v1.0
<ComboBoxGlass options={options} value={value} onChange={setValue} />
```

**4. ModalGlass: Legacy API removed**

```tsx
// ❌ v0.x
<ModalGlass isOpen={true} onClose={() => {}} title="Test">
  Content
</ModalGlass>

// ✅ v1.0 (Compound API)
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

### Migration Workflow for AI

**When user shows code with legacy API:**

1. **Identify the version**
   - Check `package.json` for version number
   - Look for `variant="danger"` or `type="error"` → v0.x

2. **Suggest upgrade**

   ```bash
   npm install shadcn-glass-ui@latest
   ```

3. **Provide migration code**
   - Show side-by-side before/after
   - Explain why it changed (shadcn/ui compatibility)

4. **Update all usages**
   - Search project for old patterns
   - Replace systematically

---

## 🧪 Testing Components

### Verify Installation

**Test 1: Import works**

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';
// No TypeScript errors → ✅ Package installed correctly
```

**Test 2: Styles applied**

```tsx
<div className="theme-glass p-8">
  <ButtonGlass variant="primary">Test</ButtonGlass>
</div>
// Button should have glass effect → ✅ CSS loaded correctly
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
// Clicking buttons changes theme → ✅ Theme system works
```

---

## 🔍 Debugging Common Issues

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

## 🖥️ CLI Commands

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

**Output for `npx shadcn-glass-ui info ButtonGlass`:**

```
ButtonGlass
──────────────────────────────────────────────────

Description:
  Primary action button with glassmorphism effects

Category:    core
Level:       L1
Type:        component
Props:       ButtonGlassProps

Variants:
  • default
  • secondary
  • destructive
  • ghost

Sizes:
  • sm
  • md
  • lg

✓ shadcn/ui compatible
✓ Supports asChild pattern

Usage Example:
─────────────────────

import { ButtonGlass } from 'shadcn-glass-ui';

<ButtonGlass variant="default" size="sm">
  {/* Content here */}
</ButtonGlass>
```

---

## 🌐 Context7 MCP Integration

This library is indexed on [Context7](https://context7.com/yhooi2/shadcn-glass-ui-library) for AI
assistant discoverability.

### Using Context7 MCP

If your AI assistant has Context7 MCP configured, you can fetch library documentation directly:

```
// In Claude Code or other Context7-enabled assistants:
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library
```

### Context7 Rules (20 total)

Key rules indexed for AI assistants:

1. Use `variant` prop instead of `type` for AlertGlass/NotificationGlass
2. Use `variant="destructive"` instead of `variant="danger"` for ButtonGlass
3. Always wrap components with ThemeProvider
4. ModalGlass and TabsGlass use compound component API
5. Three themes: `glass`, `light`, `aurora`
6. Use `asChild` prop for polymorphic rendering
7. Memoize ComboBoxGlass options with `useMemo`
8. Use TooltipGlass with `aria-label` on icon buttons

Full rules available in [context7.json](../context7.json).

---

## 📚 Resources for AI Assistants

### Quick Reference

- **Package name:** `shadcn-glass-ui`
- **Registry URL:** `https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r`
- **Registry namespace:** `@shadcn-glass-ui`
- **Context7 Library ID:** `/yhooi2/shadcn-glass-ui-library`
- **Component count:** 55
- **React version:** 18.0+ or 19.0+
- **Tailwind version:** 4.0+
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

- `primary`, `secondary`, `outline`, `ghost`, `link`, `destructive`

**BadgeGlass:**

- `default`, `secondary`, `outline`, `destructive`, `success`, `warning`, `info`

**AlertGlass:**

- `default`, `destructive`, `success`, `warning`

**GlassCard:**

- `glass`, `light`, `aurora`, `outline`
- Intensity: `subtle`, `medium`, `strong`

---

## 💡 Best Practices for AI Assistants

### DO ✅

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

5. **Explain breaking changes**
   - Show v0.x vs v1.0
   - Explain why changed
   - Provide migration path

### DON'T ❌

1. **Don't mix installation methods**

   ```tsx
   // ❌ BAD: Mixing npm and shadcn CLI imports
   import { ButtonGlass } from 'shadcn-glass-ui';
   import { InputGlass } from '@/components/glass/ui/input-glass';

   // ✅ GOOD: Consistent imports
   import { ButtonGlass, InputGlass } from 'shadcn-glass-ui';
   ```

2. **Don't use deprecated APIs**

   ```tsx
   // ❌ BAD: v0.x API
   <ButtonGlass variant="danger">Delete</ButtonGlass>

   // ✅ GOOD: v1.0 API
   <ButtonGlass variant="destructive">Delete</ButtonGlass>
   ```

3. **Don't skip theme setup**

   ```tsx
   // ❌ BAD: No theme provider
   function App() {
     return <ButtonGlass>Click me</ButtonGlass>;
   }

   // ✅ GOOD: With theme provider
   function App() {
     return (
       <ThemeProvider defaultTheme="glass">
         <ButtonGlass>Click me</ButtonGlass>
       </ThemeProvider>
     );
   }
   ```

4. **Don't forget CSS import**

   ```css
   /* ❌ BAD: Missing CSS import */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* ✅ GOOD: Include glass styles */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   @import 'shadcn-glass-ui/dist/styles.css';
   ```

---

## 🎓 Learning Path for Users

### Beginner (Week 1)

**Goal:** Get first component working

1. Install package
2. Add ButtonGlass to app
3. Set up theme provider
4. Try 3 themes (glass, light, aurora)

**Example project:**

```bash
npx create-vite@latest my-glass-app --template react-ts
cd my-glass-app
npm install shadcn-glass-ui react@19 react-dom@19 tailwindcss@4
# Follow Option B steps above
```

### Intermediate (Week 2)

**Goal:** Build a form

1. Add InputGlass, CheckboxGlass, ToggleGlass
2. Create form validation
3. Add AlertGlass for errors
4. Use ModalGlass for confirmations

**Example project:** Login form with validation

### Advanced (Week 3+)

**Goal:** Build dashboard

1. Use composite components (MetricCardGlass, etc.)
2. Create custom variants with CVA
3. Build section components (HeaderNavGlass, etc.)
4. Implement theme persistence

**Example project:** Analytics dashboard with glassmorphism

---

## 🤖 Prompts for AI Assistants

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
      variant="primary"
      size="md"
      onClick={() => alert('Clicked!')}
    >
      Click me
    </ButtonGlass>
  );
}
````

Available variants:

- primary (purple gradient)
- secondary (muted)
- outline (border only)
- ghost (transparent)
- link (text only)
- destructive (red for delete/danger)

[If theme not set up: Suggest ThemeProvider]

```

### Prompt 3: "Migrate from v0.x to v1.0"

**Response template:**
```

I'll help you migrate to v1.0. Here are the breaking changes in your code:

1. [Identify deprecated APIs in user's code]
2. [Provide replacement code]
3. [Explain why changed]

Updated code: [Show before/after comparison]

After migration, test these components: [List affected components]

```

---

## 📞 Support Escalation

### When to recommend reading docs

- User wants to customize themes → [UI_DESIGN.md](design-system/UI_DESIGN.md)
- User wants to understand architecture → [CLAUDE.md](../CLAUDE.md)
- User wants to contribute → [CONTRIBUTING.md](../CONTRIBUTING.md)

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

**Made for AI assistants by shadcn-glass-ui team** 🤖✨
```
