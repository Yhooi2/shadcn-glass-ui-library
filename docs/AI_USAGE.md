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

## 🚨 v2.0.0 Breaking Changes (CSS Variables)

### Overview

**v2.0.0 removes deprecated metric color CSS variables** in favor of semantic naming aligned with
shadcn/ui conventions.

**Impact:** Custom themes, inline styles, or Tailwind arbitrary values using old metric variables
will break.

**Migration time:** ~5-10 minutes (automated script provided)

### Removed CSS Variables

| Removed (v1.x)            | Replacement (v2.0+)           | Semantic Meaning   | Use Case         |
| ------------------------- | ----------------------------- | ------------------ | ---------------- |
| `--metric-emerald-bg`     | `--metric-success-bg`         | Success background | Positive metrics |
| `--metric-emerald-text`   | `--metric-success-text`       | Success text       | Positive values  |
| `--metric-emerald-border` | `--metric-success-border`     | Success border     | Success cards    |
| `--metric-emerald-glow`   | `--metric-success-glow`       | Success glow       | Hover effects    |
| `--metric-amber-bg`       | `--metric-warning-bg`         | Warning background | Warning metrics  |
| `--metric-amber-text`     | `--metric-warning-text`       | Warning text       | Alert values     |
| `--metric-amber-border`   | `--metric-warning-border`     | Warning border     | Warning cards    |
| `--metric-amber-glow`     | `--metric-warning-glow`       | Warning glow       | Hover effects    |
| `--metric-blue-bg`        | `--metric-default-bg`         | Default background | Neutral metrics  |
| `--metric-blue-text`      | `--metric-default-text`       | Default text       | Normal values    |
| `--metric-blue-border`    | `--metric-default-border`     | Default border     | Neutral cards    |
| `--metric-blue-glow`      | `--metric-default-glow`       | Default glow       | Hover effects    |
| `--metric-red-bg`         | `--metric-destructive-bg`     | Error background   | Error metrics    |
| `--metric-red-text`       | `--metric-destructive-text`   | Error text         | Error values     |
| `--metric-red-border`     | `--metric-destructive-border` | Error border       | Error cards      |
| `--metric-red-glow`       | `--metric-destructive-glow`   | Error glow         | Hover effects    |

**Total affected:** 16 variables (4 color families × 4 properties)

### Why This Change?

1. **Semantic Clarity** - Color names (emerald, amber) → semantic roles (success, warning)
2. **shadcn/ui Alignment** - Matches AlertGlass, BadgeGlass, ButtonGlass variant naming
3. **Consistency** - All components now use same semantic vocabulary
4. **3-Layer Token System** - Part of v2.0.0 token architecture migration

### Automated Migration

**Step 1: Find affected files**

```bash
grep -rn "metric-emerald\|metric-amber\|metric-blue\|metric-red" src/
```

**Step 2: Automated replacement**

```bash
# macOS/BSD sed
find src/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.scss" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +

# Linux sed
find src/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.scss" \) -exec sed -i \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +
```

**Step 3: Verify changes**

```bash
npm run typecheck    # TypeScript validation
npm run lint         # ESLint checks
npm test             # Run test suite
npm run build        # Production build test
```

### Manual Migration Examples

**Example 1: Custom CSS**

```css
/* ❌ v1.x (REMOVED in v2.0.0) */
.metric-card-success {
  background: var(--metric-emerald-bg);
  color: var(--metric-emerald-text);
  border: 1px solid var(--metric-emerald-border);
  box-shadow: var(--metric-emerald-glow);
}

/* ✅ v2.0+ */
.metric-card-success {
  background: var(--metric-success-bg);
  color: var(--metric-success-text);
  border: 1px solid var(--metric-success-border);
  box-shadow: var(--metric-success-glow);
}
```

**Example 2: Tailwind Arbitrary Values**

```tsx
// ❌ v1.x
<div className="bg-[var(--metric-amber-bg)] text-[var(--metric-amber-text)]">
  Warning
</div>

// ✅ v2.0+
<div className="bg-[var(--metric-warning-bg)] text-[var(--metric-warning-text)]">
  Warning
</div>
```

**Example 3: Inline Styles**

```tsx
// ❌ v1.x
<div
  style={{
    background: 'var(--metric-blue-bg)',
    color: 'var(--metric-blue-text)',
  }}
>
  Default
</div>

// ✅ v2.0+
<div
  style={{
    background: 'var(--metric-default-bg)',
    color: 'var(--metric-default-text)',
  }}
>
  Default
</div>
```

### Affected Components

The following components may use metric color variables in **user custom implementations**:

- MetricCardGlass
- CircularMetricGlass
- MetricsGridGlass
- YearCardGlass (with sparkline metrics)
- Custom dashboard components
- Custom metric displays

**Note:** shadcn-glass-ui v2.0.0 library code is already migrated. This migration is only for **user
code** that references these variables.

### AI Assistant Guidance

**When user reports "CSS variable not defined" errors:**

1. **Check package version:**

   ```bash
   npm list shadcn-glass-ui
   # If v2.0.0+ → old metric variables removed
   ```

2. **Identify deprecated usage:**

   ```bash
   grep -rn "metric-emerald\|metric-amber\|metric-blue\|metric-red" src/
   ```

3. **Provide automated fix:**

   ```
   I see you're using deprecated CSS variables from v1.x.
   In v2.0.0, metric color variables were renamed to semantic names.

   Run this command to automatically migrate:
   [Provide bash script above]

   This will update all occurrences in your codebase.
   ```

4. **Explain why:**
   ```
   This change aligns with shadcn/ui naming conventions:
   - emerald → success (positive metrics)
   - amber → warning (alert metrics)
   - blue → default (neutral metrics)
   - red → destructive (error metrics)
   ```

### Common Error Messages

**"CSS variable '--metric-emerald-bg' is not defined"**

- **Cause:** Using v1.x variable name in v2.0.0+
- **Fix:** Replace `--metric-emerald-bg` → `--metric-success-bg`

**"Unexpected color in metric card"**

- **Cause:** CSS fallback to default color due to undefined variable
- **Fix:** Run automated migration script

**"TypeScript error: Property '--metric-blue-text' does not exist"**

- **Cause:** TypeScript strict mode detecting undefined CSS variable
- **Fix:** Update to semantic naming (`--metric-default-text`)

### Token System (v2.0.0+)

v2.0.0 introduces a **3-layer token architecture** that eliminates hardcoded colors:

```
Layer 3: Component Tokens  (--btn-primary-bg, --metric-success-bg)
         ↓ references
Layer 2: Semantic Tokens   (--semantic-primary, --semantic-success)
         ↓ references
Layer 1: Primitive Tokens  (--oklch-purple-500, --oklch-emerald-400)
```

**Benefits:**

- **207 primitive tokens** - Single source of truth for all OKLCH colors
- **Zero hardcoded OKLCH** - 100% CSS variable coverage
- **15-minute theme creation** - Was 2-3 hours before refactor
- **Rapid theming** - 90% faster (2-3 hours → 10-15 minutes)

**For AI Assistants:**

When suggesting custom styling in v2.0.0+:

1. **NEVER suggest hardcoded OKLCH values:**

   ```css
   /* ❌ BAD */
   background: oklch(66.6% 0.159 303);
   ```

2. **ALWAYS use semantic tokens:**

   ```css
   /* ✅ GOOD */
   background: var(--semantic-primary);
   ```

3. **Check if needed primitive exists:**
   - Search `src/styles/tokens/oklch-primitives.css` for color
   - If not found, suggest adding to appropriate family

4. **Creating custom themes:**
   - Reference [THEME_CREATION_GUIDE.md](THEME_CREATION_GUIDE.md)
   - Only need ~50 lines of semantic mappings
   - Component tokens inherited automatically

**Token Documentation:**

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) - Complete 3-layer system guide
- [THEME_CREATION_GUIDE.md](THEME_CREATION_GUIDE.md) - 15-minute theme creation
- [CSS_VARIABLES_MIGRATION_2.0.md](migration/CSS_VARIABLES_MIGRATION_2.0.md) - Full migration guide
- [PRIMITIVE_MAPPING.md](PRIMITIVE_MAPPING.md) - OKLCH primitive reference

### Migration Checklist

- [ ] Search codebase for deprecated variables
      (`grep -rn "metric-emerald|metric-amber|metric-blue|metric-red"`)
- [ ] Run automated replacement script
- [ ] Verify TypeScript compilation (`npm run typecheck`)
- [ ] Run linter (`npm run lint`)
- [ ] Run test suite (`npm test`)
- [ ] Test production build (`npm run build`)
- [ ] Visual regression testing (if applicable)
- [ ] Manual testing of affected components
- [ ] Update custom theme files (if any)
- [ ] Commit changes with message: `chore: migrate CSS variables to v2.0.0 semantic naming`

### Timeline

| Version              | Status       | Deprecated Variables                             |
| -------------------- | ------------ | ------------------------------------------------ |
| **v1.0.0 - v1.0.11** | ✅ Supported | Work via CSS aliases (with deprecation warnings) |
| **v2.0.0**           | 🚀 Current   | ❌ **REMOVED** (breaking change)                 |
| **v2.1.0+**          | ⏭️ Future    | Only semantic variables supported                |

### Need Help?

- 📖 [Full Migration Guide](migration/CSS_VARIABLES_MIGRATION_2.0.md)
- 🎨 [Token Architecture](TOKEN_ARCHITECTURE.md)
- 🛠️ [Theme Creation Guide](THEME_CREATION_GUIDE.md)
- 🐛 [Report Issues](https://github.com/Yhooi2/shadcn-glass-ui-library/issues)

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
assistant discoverability. AI assistants can automatically fetch documentation, code examples, and
component specifications through the Context7 MCP server.

### What is Context7?

Context7 is a library indexing service that makes open-source libraries discoverable and accessible
to AI coding assistants through the Model Context Protocol (MCP). When an AI assistant has Context7
MCP configured, it can:

- 🔍 **Search** for libraries by name or functionality
- 📖 **Fetch** up-to-date documentation automatically
- 💡 **Access** code examples and best practices
- 🎯 **Apply** library-specific rules and conventions
- 🔄 **Track** version history and breaking changes

### Using Context7 MCP

#### Step 1: Resolve Library ID

First, resolve the library name to get the Context7-compatible ID:

```
mcp__context7__resolve-library-id shadcn-glass-ui
```

**Returns:** `/yhooi2/shadcn-glass-ui-library`

#### Step 2: Fetch Documentation

Once you have the library ID, fetch documentation for specific topics:

```
// Get component API documentation
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library --topic="ButtonGlass"

// Get theming documentation
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library --topic="themes"

// Get installation guide
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library --topic="installation"

// Get token system documentation (v2.0.0+)
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library --topic="token architecture"
```

#### Step 3: Access Specific Versions

You can also fetch documentation for specific versions:

```
// Get v2.0.0 documentation
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library/v2.0.0

// Get v1.0.0 documentation (legacy)
mcp__context7__get-library-docs /yhooi2/shadcn-glass-ui-library/v1.0.0
```

### Context7 Benefits for AI Development

1. **Always Up-to-Date** - Documentation syncs with latest releases via context7.json
2. **Version-Aware** - Access docs for any tagged version (v1.0.0, v2.0.0, etc.)
3. **Rule-Based Guidance** - 20+ library-specific rules prevent common mistakes
4. **Zero Configuration** - No manual doc downloads or context copying
5. **Fast Iteration** - AI assistants fetch examples instantly during development

### Context7 Rules (20 total)

Key rules indexed for AI assistants:

**v2.0.0+ Breaking Changes:**

1. Use `--metric-success-*` instead of `--metric-emerald-*` (REMOVED)
2. Use `--metric-warning-*` instead of `--metric-amber-*` (REMOVED)
3. Use `--metric-default-*` instead of `--metric-blue-*` (REMOVED)
4. Use `--metric-destructive-*` instead of `--metric-red-*` (REMOVED)
5. NEVER hardcode OKLCH values - use CSS variables from oklch-primitives.css
6. Use 3-layer token system: Primitive → Semantic → Component tokens

**Component API:** 7. Use `variant` prop instead of `type` for AlertGlass/NotificationGlass 8. Use
`variant="destructive"` instead of `variant="danger"` for ButtonGlass 9. Always wrap components with
ThemeProvider 10. ModalGlass and TabsGlass use compound component API 11. StepperGlass uses compound
API: Root, Step, Title, Description, Indicator 12. Three themes: `glass`, `light`, `aurora` 13. Use
`asChild` prop for polymorphic rendering 14. Memoize ComboBoxGlass options with `useMemo` 15. Use
TooltipGlass with `aria-label` on icon buttons

**Theming:** 16. Create new themes in 15 minutes using THEME_CREATION_GUIDE.md 17. All 207 primitive
tokens defined in src/styles/tokens/oklch-primitives.css 18. Reference TOKEN_ARCHITECTURE.md for
token system documentation 19. Use exported hooks: useFocus, useHover, useResponsive,
useWallpaperTint 20. StepperGlass supports linear mode (wizard pattern) - set linear prop

Full rules available in [context7.json](../context7.json).

### Example: AI-Assisted Development with Context7

**User Request:** "Add a stepper component to my checkout flow"

**AI Assistant with Context7:**

1. Fetches StepperGlass documentation via MCP
2. Reads rules: "StepperGlass uses compound API", "supports linear mode"
3. Generates code following library conventions:

```tsx
import { StepperGlass } from 'shadcn-glass-ui';

function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <StepperGlass.Root value={currentStep} onValueChange={setCurrentStep} linear>
      <StepperGlass.Step value={0}>
        <StepperGlass.Indicator />
        <StepperGlass.Title>Cart Review</StepperGlass.Title>
        <StepperGlass.Description>Review your items</StepperGlass.Description>
      </StepperGlass.Step>
      {/* ... */}
    </StepperGlass.Root>
  );
}
```

**Without Context7:** AI might use incorrect API, miss linear mode, or suggest non-existent props.

### Configuring Context7 MCP

To enable Context7 in your AI assistant (Claude Code, Cursor, etc.):

1. Install Context7 MCP server
2. Add to MCP settings:
   ```json
   {
     "mcpServers": {
       "context7": {
         "command": "npx",
         "args": ["-y", "@context7/mcp-server"]
       }
     }
   }
   ```
3. Restart your AI assistant

See
[Context7 MCP Documentation](https://github.com/modelcontextprotocol/servers/tree/main/src/context7)
for details.

---

## 📚 Resources for AI Assistants

### Quick Reference

- **Package name:** `shadcn-glass-ui`
- **Registry URL:** `https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r`
- **Registry namespace:** `@shadcn-glass-ui`
- **Context7 Library ID:** `/yhooi2/shadcn-glass-ui-library`
- **Component count:** 57 (includes StepperGlass in v2.0.0+)
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
