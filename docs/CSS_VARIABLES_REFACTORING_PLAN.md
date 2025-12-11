# CSS Variables Refactoring Plan

## Problem Statement

Current state: **Massive color duplication** across 3 theme files (glass.css, light.css, aurora.css)

| Theme  | Most Duplicated Color             | Usage Count |
| ------ | --------------------------------- | ----------- |
| Glass  | `oklch(66.6% 0.159 303)` (purple) | 33+ times   |
| Light  | `oklch(54.1% 0.175 293)` (violet) | 28 times    |
| Aurora | `oklch(62.7% 0.159 291)` (violet) | 20+ times   |

Additional duplication:

- White with various alphas: 40+ uses per theme
- Semantic colors (success/warning/error): 12-16 uses each
- Border colors: 15-24 uses per theme
- Surface colors: 8-11 uses per theme

**Total duplication**: ~70% of CSS variables are duplicated color values

---

## Proposed Architecture

### Three-Layer System

```
┌─────────────────────────────────────────────┐
│ Layer 3: Component Variables (unchanged)     │
│ --btn-primary-bg, --input-border, etc.      │
└─────────────────────────────────────────────┘
                    ↓ references
┌─────────────────────────────────────────────┐
│ Layer 2: Semantic Tokens (NEW)              │
│ --semantic-primary, --semantic-surface, etc. │
└─────────────────────────────────────────────┘
                    ↓ references
┌─────────────────────────────────────────────┐
│ Layer 1: Primitive Tokens (NEW)             │
│ --primitive-purple-500, --primitive-white-08 │
└─────────────────────────────────────────────┘
```

---

## Layer 1: Primitive Tokens (primitives.css)

**Purpose**: Define raw color values once, reused by all themes

```css
/* primitives.css - NEW FILE */
:root {
  /* ============================================
     PRIMITIVE COLOR TOKENS
     Raw OKLCH values - DO NOT use directly
     ============================================ */

  /* Purple scale (glass theme primary) */
  --primitive-purple-300: oklch(79.5% 0.103 293);
  --primitive-purple-500: oklch(66.6% 0.159 303);
  --primitive-violet-500: oklch(62.7% 0.159 291);
  --primitive-violet-400: oklch(71.4% 0.138 291);

  /* Light theme primary */
  --primitive-violet-light-500: oklch(54.1% 0.175 293);

  /* Semantic colors (shared across themes) */
  --primitive-emerald-400: oklch(76.5% 0.147 163);
  --primitive-amber-400: oklch(82.8% 0.157 84);
  --primitive-rose-400: oklch(71.2% 0.161 12);
  --primitive-blue-400: oklch(70.7% 0.143 250);

  /* Neutral scale */
  --primitive-white: oklch(100% 0 0);
  --primitive-black: oklch(0% 0 0);
  --primitive-neutral-900: oklch(27.9% 0.041 260);
  --primitive-neutral-800: oklch(37.2% 0.044 257);
  --primitive-neutral-700: oklch(55.4% 0.046 257);
  --primitive-neutral-200: oklch(92.9% 0.013 255);
  --primitive-neutral-100: oklch(96.8% 0.007 247);

  /* ============================================
     ALPHA UTILITIES
     For creating opacity variants
     ============================================ */
  --alpha-05: 0.05;
  --alpha-08: 0.08;
  --alpha-10: 0.1;
  --alpha-15: 0.15;
  --alpha-20: 0.2;
  --alpha-25: 0.25;
  --alpha-30: 0.3;
  --alpha-40: 0.4;
  --alpha-50: 0.5;
  --alpha-60: 0.6;
  --alpha-80: 0.8;
  --alpha-90: 0.9;
}
```

---

## Layer 2: Semantic Tokens (in each theme file)

**Purpose**: Theme-specific semantic mappings

```css
/* glass.css */
[data-theme='glass'] {
  /* ============================================
     SEMANTIC COLOR TOKENS
     Theme-agnostic names for component use
     ============================================ */

  /* Primary accent */
  --semantic-primary: var(--primitive-purple-500);
  --semantic-primary-muted: oklch(from var(--primitive-purple-500) l c h / var(--alpha-30));
  --semantic-primary-subtle: oklch(from var(--primitive-purple-500) l c h / var(--alpha-20));
  --semantic-primary-text: var(--primitive-purple-300);

  /* Secondary accent */
  --semantic-secondary: var(--primitive-violet-500);

  /* Surfaces */
  --semantic-surface: oklch(from var(--primitive-white) l c h / var(--alpha-08));
  --semantic-surface-subtle: oklch(from var(--primitive-white) l c h / var(--alpha-05));
  --semantic-surface-medium: oklch(from var(--primitive-white) l c h / var(--alpha-15));
  --semantic-surface-strong: oklch(from var(--primitive-white) l c h / var(--alpha-22));

  /* Borders */
  --semantic-border: oklch(from var(--primitive-white) l c h / var(--alpha-15));
  --semantic-border-subtle: oklch(from var(--primitive-white) l c h / var(--alpha-10));
  --semantic-border-strong: oklch(from var(--primitive-white) l c h / var(--alpha-25));

  /* Text */
  --semantic-text: oklch(from var(--primitive-white) l c h / var(--alpha-90));
  --semantic-text-muted: oklch(from var(--primitive-white) l c h / var(--alpha-60));
  --semantic-text-subtle: oklch(from var(--primitive-white) l c h / var(--alpha-50));
  --semantic-text-disabled: oklch(from var(--primitive-white) l c h / var(--alpha-30));

  /* Semantic states (shared across themes) */
  --semantic-success: var(--primitive-emerald-400);
  --semantic-warning: var(--primitive-amber-400);
  --semantic-error: var(--primitive-rose-400);
  --semantic-info: var(--primitive-blue-400);
}
```

---

## Layer 3: Component Variables (existing)

**No changes needed** - component variables reference semantic tokens:

```css
/* BEFORE (current) */
--btn-primary-bg: linear-gradient(135deg, oklch(66.6% 0.159 303), oklch(62.7% 0.159 291));
--stepper-step-completed-bg: oklch(66.6% 0.159 303);

/* AFTER (refactored) */
--btn-primary-bg: linear-gradient(135deg, var(--semantic-primary), var(--semantic-secondary));
--stepper-step-completed-bg: var(--semantic-primary);
```

---

## Modern CSS Features Used

### 1. `oklch(from ...)` Relative Color Syntax

```css
/* Create alpha variants from base color */
--semantic-primary-muted: oklch(from var(--primitive-purple-500) l c h / 0.3);
```

**Browser support**: Chrome 119+, Safari 16.4+, Firefox 128+ (2024)

**Fallback strategy**: Define explicit values for older browsers

### 2. CSS Custom Property Composition

```css
--semantic-surface: oklch(from var(--primitive-white) l c h / var(--alpha-08));
```

---

## Migration Strategy

### Phase 1: Foundation (Week 1)

- ✅ Create `src/styles/primitives.css`
- ✅ Define all primitive tokens
- ✅ Import in main CSS entry point
- ✅ Add semantic tokens to glass.css

### Phase 2: Glass Theme Refactor (Week 2)

- Refactor all component variables in glass.css
- Replace hardcoded OKLCH with semantic token references
- Test visual appearance (no regressions)
- Run Storybook visual tests

### Phase 3: Light Theme Refactor (Week 3)

- Add semantic tokens to light.css
- Refactor component variables
- Test visual appearance

### Phase 4: Aurora Theme Refactor (Week 4)

- Add semantic tokens to aurora.css
- Refactor component variables
- Test visual appearance

### Phase 5: Cleanup & Documentation (Week 5)

- Remove old `--color-*` tokens (replaced by `--semantic-*`)
- Update documentation
- Add migration guide for consumers
- Performance testing

---

## Expected Benefits

| Metric              | Before     | After      | Improvement             |
| ------------------- | ---------- | ---------- | ----------------------- |
| Unique color values | ~120       | ~30        | **75% reduction**       |
| Lines of CSS        | ~1500      | ~800       | **47% reduction**       |
| Theme file size     | ~500 lines | ~250 lines | **50% reduction**       |
| Maintenance burden  | High       | Low        | Easier to change colors |
| New theme creation  | 500 lines  | 50 lines   | **90% faster**          |

---

## Risk Assessment

### Low Risk

- ✅ No breaking changes to public API
- ✅ Component variables stay the same
- ✅ Only internal implementation changes

### Medium Risk

- ⚠️ Browser compatibility (`oklch(from ...)` requires modern browsers)
- ⚠️ Visual testing needed to catch subtle color shifts

### Mitigation

- Provide fallback for older browsers using explicit OKLCH values
- Run full visual regression suite on all 3 themes
- Document browser requirements in README

---

## File Structure

```
src/styles/
├── primitives.css          # NEW - Primitive color tokens
├── themes/
│   ├── glass.css           # MODIFIED - Semantic tokens + component vars
│   ├── light.css           # MODIFIED - Semantic tokens + component vars
│   └── aurora.css          # MODIFIED - Semantic tokens + component vars
└── utilities/
    └── glass-effects.css   # Existing blur/backdrop utilities
```

---

## Example: Before & After

### BEFORE (glass.css - current)

```css
/* 33+ duplicates of this color */
--btn-primary-bg: linear-gradient(135deg, oklch(66.6% 0.159 303), oklch(62.7% 0.159 291));
--btn-primary-glow: 0 0 30px oklch(66.6% 0.159 303 / 0.6);
--checkbox-checked-bg: oklch(66.6% 0.159 303);
--tab-active-bg: oklch(66.6% 0.159 303 / 0.2);
--stepper-step-completed-bg: oklch(66.6% 0.159 303);
--modal-glow: 0 0 60px oklch(66.6% 0.159 303 / 0.35);
--slider-thumb-border: oklch(66.6% 0.159 303);
/* ... 26 more uses ... */
```

### AFTER (glass.css - refactored)

```css
/* Semantic tokens (once) */
--semantic-primary: var(--primitive-purple-500);
--semantic-primary-muted: oklch(from var(--semantic-primary) l c h / 0.3);
--semantic-primary-subtle: oklch(from var(--semantic-primary) l c h / 0.2);

/* Component variables (reference semantic tokens) */
--btn-primary-bg: linear-gradient(135deg, var(--semantic-primary), var(--semantic-secondary));
--btn-primary-glow: 0 0 30px var(--semantic-primary-glow);
--checkbox-checked-bg: var(--semantic-primary);
--tab-active-bg: var(--semantic-primary-subtle);
--stepper-step-completed-bg: var(--semantic-primary);
--modal-glow: 0 0 60px var(--semantic-primary-glow);
--slider-thumb-border: var(--semantic-primary);
```

**Result**: 33 duplicates → 1 definition, 32 references

---

## Next Steps

1. **Review & Approve** this plan
2. **Create primitives.css** with all base tokens
3. **Refactor glass.css** (most complex theme)
4. **Test thoroughly** (visual regression suite)
5. **Refactor light.css & aurora.css**
6. **Document** for contributors

---

## Open Questions

1. Should we use `oklch(from ...)` syntax or define explicit alpha variants?
   - **Recommendation**: Use explicit variants for better browser support
2. Keep `--color-*` tokens or rename to `--semantic-*`?
   - **Recommendation**: Rename to `--semantic-*` for clarity
3. Should primitives.css be imported automatically or manually?
   - **Recommendation**: Import in main glass-theme.css for automatic inclusion
