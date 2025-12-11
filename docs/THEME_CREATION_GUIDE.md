# Theme Creation Guide

## Create a New Theme in 15 Minutes

This guide shows how to create a **production-ready theme** using the 3-layer token architecture.

**Before the refactor:** Creating a theme took 2-3 hours (500+ lines of hardcoded OKLCH values).

**After the refactor:** Creating a theme takes **10-15 minutes** (~50 lines of semantic mappings).

---

## Quick Start: Neon Theme Example

Let's create a vibrant **neon theme** with cyan accents and dark backgrounds.

### Step 1: Create Theme File

Create `src/styles/themes/neon.css`:

```css
/* ========================================
   NEON THEME
   Vibrant cyan accents on deep black backgrounds
   ======================================== */

[data-theme='neon'] {
  /* ========================================
     SEMANTIC COLOR TOKENS (Layer 2)
     Map primitive tokens to semantic roles
     ======================================== */

  /* Primary Accent (Cyan) */
  --semantic-primary: var(--oklch-cyan-400);
  --semantic-primary-hover: var(--oklch-cyan-300);
  --semantic-primary-muted: var(--oklch-cyan-400-40);
  --semantic-primary-subtle: var(--oklch-cyan-400-20);
  --semantic-primary-text: var(--oklch-cyan-300);

  /* Secondary Accent (Pink) */
  --semantic-secondary: var(--oklch-pink-500);
  --semantic-secondary-muted: var(--oklch-pink-500-20);

  /* Surface Colors (Deep Black) */
  --semantic-surface: var(--oklch-black-90);
  --semantic-surface-muted: var(--oklch-black-80);
  --semantic-surface-elevated: var(--oklch-black-95);
  --semantic-surface-overlay: var(--oklch-black-85);
  --semantic-surface-strong: var(--oklch-white-5);

  /* Border Colors */
  --semantic-border: var(--oklch-cyan-400-40);
  --semantic-border-muted: var(--oklch-white-10);
  --semantic-border-strong: var(--oklch-cyan-400-60);
  --semantic-border-subtle: var(--oklch-white-5);

  /* Text Colors */
  --semantic-text: var(--oklch-white-95);
  --semantic-text-muted: var(--oklch-white-60);
  --semantic-text-subtle: var(--oklch-white-50);
  --semantic-text-disabled: var(--oklch-white-30);
  --semantic-text-inverse: var(--oklch-black);

  /* Status Colors */
  --semantic-success: var(--oklch-emerald-400);
  --semantic-success-muted: var(--oklch-emerald-400-20);
  --semantic-success-subtle: var(--oklch-emerald-400-10);
  --semantic-success-text: var(--oklch-emerald-300);

  --semantic-warning: var(--oklch-amber-400);
  --semantic-warning-muted: var(--oklch-amber-400-20);
  --semantic-warning-subtle: var(--oklch-amber-400-10);
  --semantic-warning-text: var(--oklch-amber-300);

  --semantic-error: var(--oklch-rose-400);
  --semantic-error-muted: var(--oklch-rose-400-20);
  --semantic-error-subtle: var(--oklch-rose-400-10);
  --semantic-error-text: var(--oklch-rose-300);

  --semantic-info: var(--oklch-blue-400);
  --semantic-info-muted: var(--oklch-blue-400-20);
  --semantic-info-subtle: var(--oklch-blue-400-10);
  --semantic-info-text: var(--oklch-blue-300);

  /* Glass-specific Effects */
  --semantic-glass-bg: var(--oklch-black-80);
  --semantic-glass-bg-subtle: var(--oklch-black-70);
  --semantic-glass-bg-medium: var(--oklch-black-90);
  --semantic-glass-bg-strong: var(--oklch-black-95);

  /* ========================================
     COMPONENT OVERRIDES (Optional)
     Override specific component tokens if needed
     ======================================== */

  /* Neon glow effects */
  --glow-primary: 0 0 30px var(--oklch-cyan-400-60), 0 0 60px var(--oklch-cyan-400-30);
  --glow-secondary: 0 0 20px var(--oklch-pink-500-50);
  --glow-success: 0 0 20px var(--oklch-emerald-400-50);

  /* Card hover effects */
  --card-hover-glow: 0 0 40px var(--oklch-cyan-400-40), inset 0 0 20px var(--oklch-cyan-400-10);

  /* Button primary with neon gradient */
  --btn-primary-bg: linear-gradient(135deg, var(--semantic-primary), var(--semantic-secondary));
  --btn-primary-glow: 0 0 40px var(--oklch-cyan-400-60), 0 0 80px var(--oklch-cyan-400-30);

  /* Background gradient */
  --bg-from: var(--oklch-black);
  --bg-via: var(--oklch-cyan-900);
  --bg-to: var(--oklch-black);
  --grid-color: var(--oklch-cyan-400-20);
  --grid-opacity: 0.05;
}
```

**That's it!** All component tokens (buttons, badges, inputs, cards, etc.) **automatically inherit**
from semantic tokens.

### Step 2: Import Theme

Add to `src/glass-theme.css`:

```css
@import './styles/themes/neon.css';
```

### Step 3: Add Theme to Type Definitions

Update `src/lib/theme-context.tsx`:

```tsx
export type Theme = 'glass' | 'light' | 'aurora' | 'neon';
```

### Step 4: Test Theme

```tsx
import { ThemeProvider } from '@/lib/theme-context';

function App() {
  return (
    <ThemeProvider defaultTheme="neon">
      <YourComponents />
    </ThemeProvider>
  );
}
```

---

## Detailed Breakdown

### Semantic Tokens You Must Define

**Required (15 tokens minimum):**

| Token                         | Purpose                    | Example                |
| ----------------------------- | -------------------------- | ---------------------- |
| `--semantic-primary`          | Main accent color          | cyan-400, violet-600   |
| `--semantic-secondary`        | Secondary accent           | pink-500, violet-500   |
| `--semantic-surface`          | Card backgrounds           | black-90, slate-100-80 |
| `--semantic-border`           | Standard borders           | cyan-400-40, slate-200 |
| `--semantic-text`             | Primary text               | white-95, slate-800    |
| `--semantic-text-inverse`     | Inverse text (on primary)  | black, white           |
| `--semantic-success`          | Success states             | emerald-400            |
| `--semantic-warning`          | Warning states             | amber-400              |
| `--semantic-error`            | Error states               | rose-400               |
| `--semantic-info`             | Info states                | blue-400               |
| `--semantic-glass-bg`         | Glass surface              | black-80, white-60     |
| `--semantic-border-muted`     | Subtle borders             | white-10, slate-200-40 |
| `--semantic-text-muted`       | Muted text                 | white-60, slate-500    |
| `--semantic-surface-elevated` | Elevated surfaces (modals) | black-95, white        |
| `--semantic-primary-text`     | Text on primary bg         | cyan-300, violet-700   |

**Optional (20+ tokens for full customization):**

- Hover states: `--semantic-primary-hover`
- Disabled states: `--semantic-text-disabled`
- Alpha variants: `--semantic-primary-muted`, `--semantic-primary-subtle`
- Glass variants: `--semantic-glass-bg-subtle`, `--semantic-glass-bg-strong`
- Border variants: `--semantic-border-strong`, `--semantic-border-subtle`

### Component Token Overrides

**You don't need to define any component tokens!** They inherit from semantic tokens.

**BUT**, you can override specific components for custom effects:

```css
/* Override button glow in neon theme */
--btn-primary-glow: 0 0 40px var(--oklch-cyan-400-60);

/* Override card hover in neon theme */
--card-hover-glow: 0 0 40px var(--oklch-cyan-400-40);

/* Disable glows in light theme */
--glow-primary: none;
--glow-secondary: none;
```

---

## Theme Templates

### Dark Theme Template

```css
[data-theme='my-dark-theme'] {
  /* Primary: Choose vibrant accent */
  --semantic-primary: var(--oklch-{color}-{scale});
  --semantic-primary-text: var(--oklch-{color}-300);

  /* Surface: Dark backgrounds */
  --semantic-surface: var(--oklch-black-80);
  --semantic-border: var(--oklch-white-15);

  /* Text: Light on dark */
  --semantic-text: var(--oklch-white-90);
  --semantic-text-inverse: var(--oklch-black);

  /* Glass: Subtle transparency */
  --semantic-glass-bg: var(--oklch-white-5);
}
```

### Light Theme Template

```css
[data-theme='my-light-theme'] {
  /* Primary: Medium saturation */
  --semantic-primary: var(--oklch-{color}-600);

  /* Surface: Light backgrounds */
  --semantic-surface: var(--oklch-slate-100-80);
  --semantic-border: var(--oklch-slate-200);

  /* Text: Dark on light */
  --semantic-text: var(--oklch-slate-800);
  --semantic-text-inverse: var(--oklch-white);

  /* Glass: Frosted white */
  --semantic-glass-bg: var(--oklch-white-60);
}
```

### Minimal Theme (15 tokens only)

```css
[data-theme='minimal'] {
  --semantic-primary: var(--oklch-blue-500);
  --semantic-secondary: var(--oklch-violet-500);
  --semantic-surface: var(--oklch-white);
  --semantic-border: var(--oklch-slate-200);
  --semantic-text: var(--oklch-slate-900);
  --semantic-text-inverse: var(--oklch-white);
  --semantic-success: var(--oklch-emerald-400);
  --semantic-warning: var(--oklch-amber-400);
  --semantic-error: var(--oklch-red-500);
  --semantic-info: var(--oklch-blue-400);
  --semantic-glass-bg: var(--oklch-white-80);
  --semantic-border-muted: var(--oklch-slate-200-50);
  --semantic-text-muted: var(--oklch-slate-500);
  --semantic-surface-elevated: var(--oklch-white);
  --semantic-primary-text: var(--oklch-blue-700);
}
```

---

## Choosing Colors

### Step 1: Pick Primary Accent

Browse primitives in `src/styles/tokens/oklch-primitives.css`:

- **Violet family** (hue ~291-293): violet-300 to violet-900
- **Purple family** (hue ~303): purple-300 to purple-900
- **Blue family** (hue ~250-255): blue-300 to blue-900
- **Cyan family** (hue ~195): cyan-300 to cyan-900
- **Pink family** (hue ~350): pink-300 to pink-900

**Recommendation:** Use **-400 or -500** for vibrant accents, **-600** for professional themes.

### Step 2: Choose Surface Color

**Dark themes:**

- Very dark: `--oklch-black-90` to `--oklch-black-95`
- Medium dark: `--oklch-slate-900`, `--oklch-slate-800`
- With transparency: `--oklch-black-80`, `--oklch-slate-800-80`

**Light themes:**

- Pure white: `--oklch-white`
- Subtle: `--oklch-slate-50`, `--oklch-slate-100`
- Frosted: `--oklch-white-80`, `--oklch-slate-100-80`

### Step 3: Pick Text Color

**Dark themes:** `--oklch-white-90` to `--oklch-white-95` (near-white)

**Light themes:** `--oklch-slate-800` to `--oklch-slate-900` (near-black)

### Step 4: Status Colors (Universal)

These work across all themes:

- **Success:** `--oklch-emerald-400`
- **Warning:** `--oklch-amber-400`
- **Error:** `--oklch-rose-400` (dark) or `--oklch-red-500` (light)
- **Info:** `--oklch-blue-400`

---

## Testing Your Theme

### Visual Testing Checklist

```bash
# 1. Start Storybook
npm run storybook

# 2. Test components in your new theme
# - ComponentShowcase story
# - DesktopShowcase story
# - All individual component stories

# 3. Run visual regression tests
npx vitest --project=visual

# 4. Check for missing tokens
# Browser DevTools → Inspect element → Computed styles
# Look for "unset" or "initial" values
```

### Component Coverage

Test these component groups:

- **Buttons:** primary, secondary, ghost, destructive, success
- **Badges:** all variants (default, secondary, success, warning, destructive)
- **Alerts:** all variants
- **Inputs:** text, focus states
- **Cards:** hover, active states
- **Status:** online, offline, busy, away indicators
- **Modals/Dropdowns/Popovers:** overlays, shadows, glows
- **Notifications/Tooltips:** all severity levels

### Common Issues

**Issue:** Components appear unstyled **Cause:** Missing semantic tokens **Fix:** Add all required
tokens from template above

**Issue:** Wrong colors appear **Cause:** Typo in primitive token name **Fix:** Check
`oklch-primitives.css` for correct spelling

**Issue:** Theme doesn't activate **Cause:** Not imported in `glass-theme.css` **Fix:** Add
`@import './styles/themes/your-theme.css';`

**Issue:** Type error on theme name **Cause:** Type not updated **Fix:** Add theme to `Theme` type
in `theme-context.tsx`

---

## Advanced Customization

### Custom Component Tokens

Override specific components for unique effects:

```css
[data-theme='cyberpunk'] {
  /* ... semantic tokens ... */

  /* Cyberpunk-specific glows */
  --btn-primary-glow:
    0 0 10px var(--oklch-cyan-400), 0 0 20px var(--oklch-cyan-400-80),
    0 0 40px var(--oklch-cyan-400-60), 0 0 80px var(--oklch-cyan-400-40);

  /* Animated scanline effect */
  --card-hover-bg: linear-gradient(
    180deg,
    var(--oklch-cyan-400-10) 0%,
    transparent 50%,
    var(--oklch-cyan-400-10) 100%
  );

  /* Neon text shadows */
  --text-glow: 0 0 5px var(--oklch-cyan-400), 0 0 10px var(--oklch-cyan-400-60);
}
```

### Theme-Specific Animations

```css
[data-theme='aurora'] {
  /* ... semantic tokens ... */

  /* Aurora-specific gradient animation */
  --bg-from: var(--oklch-slate-900);
  --bg-via: var(--oklch-purple-700);
  --bg-to: var(--oklch-slate-900);

  /* Animated gradient (requires animation keyframes) */
  --aurora-gradient: linear-gradient(
    135deg,
    var(--oklch-violet-500-20) 0%,
    var(--oklch-purple-500-20) 50%,
    var(--oklch-cyan-500-20) 100%
  );
}
```

---

## Performance Considerations

**CSS Custom Properties** have minimal performance impact:

- **Build time:** No change (CSS variables resolved at runtime)
- **Runtime:** ~0.1ms overhead per property lookup
- **Memory:** ~1KB per theme definition

**Optimization tip:** Use semantic tokens, not primitive tokens directly, to reduce cascade depth.

---

## Examples

See existing themes for reference:

- **Glass Theme:** `src/styles/themes/glass.css` (dark glassmorphism)
- **Light Theme:** `src/styles/themes/light.css` (light mode)
- **Aurora Theme:** `src/styles/themes/aurora.css` (gradient dark)

---

## Summary: 15-Minute Checklist

- [ ] Create `src/styles/themes/your-theme.css`
- [ ] Define 15 required semantic tokens
- [ ] Add optional tokens for custom effects
- [ ] Import in `src/glass-theme.css`
- [ ] Update `Theme` type in `theme-context.tsx`
- [ ] Test in Storybook (ComponentShowcase, DesktopShowcase)
- [ ] Run visual regression tests
- [ ] Check all component variants
- [ ] Document theme in README (optional)

**Total time:** 10-15 minutes ⏱️

**Lines of code:** ~50 (vs. 500+ before refactoring)

**Maintenance:** Change 1 token, update entire theme instantly
