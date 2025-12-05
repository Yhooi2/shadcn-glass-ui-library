# Breaking Changes - Design Token Compliance

**Date:** 2025-12-04
**Version:** TBD (pending release)
**Reason:** Migration to design token system compliance per UI_DESIGN.md

## Overview

All hardcoded blur values have been replaced with CSS design tokens to ensure consistency across the design system. This affects **visual appearance** of several components and CSS utility classes.

## Breaking Changes

### 1. GlassCard Component

**File:** `src/components/glass/ui/glass-card.tsx`

**Changes:**
- `medium` intensity: blur changed from `12px` → `16px` (var(--blur-md))
- `strong` intensity: blur changed from `16px` → `24px` (var(--blur-lg))

**Impact:**
- Medium cards will appear slightly more blurred (more glass effect)
- Strong cards will have significantly more blur (featured cards)

**Migration:**
```tsx
// Before
<GlassCard intensity="medium">  {/* 12px blur */}
<GlassCard intensity="strong">  {/* 16px blur */}

// After (no code changes needed, but visual change)
<GlassCard intensity="medium">  {/* 16px blur - MORE blurred */}
<GlassCard intensity="strong">  {/* 24px blur - MUCH MORE blurred */}

// To preserve old appearance (NOT recommended):
<GlassCard intensity="subtle">   {/* 8px blur - closest to old medium */}
<GlassCard intensity="medium">   {/* 16px blur - closest to old strong */}
```

### 2. TooltipGlass Component

**File:** `src/components/glass/ui/tooltip-glass.tsx`

**Changes:**
- **Removed** `backdropFilter` blur effect entirely
- Now uses solid background per UI_DESIGN.md design rule

**Impact:**
- Tooltips now have solid backgrounds instead of glass effect
- Improved text readability (critical for tooltips)
- Follows WCAG accessibility guidelines

**Migration:**
```tsx
// No code changes needed - tooltips will automatically use solid backgrounds
<TooltipGlass content="Tooltip text">
  {/* Tooltip background is now solid for maximum readability */}
</TooltipGlass>
```

### 3. AICardGlass Component

**File:** `src/components/glass/composite/ai-card-glass.tsx`

**Changes:**
- Blur changed from `12px` → `8px` (var(--blur-sm))

**Impact:**
- Less blurred appearance (more transparent, subtle glass)
- Appropriate for small card size

**Migration:**
```tsx
// No code changes needed, visual change only
<AICardGlass />  {/* Now has subtle 8px blur instead of 12px */}
```

### 4. DropdownGlass & SortDropdownGlass Components

**Files:**
- `src/components/glass/ui/dropdown-glass.tsx`
- `src/components/glass/atomic/sort-dropdown-glass.tsx`

**Changes:**
- Blur changed from `20px` → `16px` (var(--blur-md))

**Impact:**
- Slightly less blurred appearance
- Better alignment with standard card blur

**Migration:**
```tsx
// No code changes needed
<DropdownGlass />      {/* 16px blur */}
<SortDropdownGlass />  {/* 16px blur */}
```

### 5. CSS Utility Classes

**File:** `src/styles/utilities/glass-variants.css`

**Changes:**

| Class | Old Blur | New Blur | Token |
|-------|----------|----------|-------|
| `.glass` | 20px | 16px | var(--blur-md) |
| `.frosted` | 30px | 32px | var(--blur-xl) |
| `.fluted` | 16px | 16px | var(--blur-md) (no visual change) |
| `.crystal` | 8px | 8px | var(--blur-sm) (no visual change) |
| `.glass-strong` | 24px | 24px | var(--blur-lg) (no visual change) |

**Impact:**
- `.glass` utility: slightly **less** blurred
- `.frosted` utility: slightly **more** blurred

**Migration:**
```tsx
// Before
<div className="glass">       {/* 20px blur */}
<div className="frosted">     {/* 30px blur */}

// After (no code changes, but visual difference)
<div className="glass">       {/* 16px blur - less blurred */}
<div className="frosted">     {/* 32px blur - more blurred */}
```

### 6. Theme Override (glass.css)

**File:** `src/styles/themes/glass.css`

**Changes:**
- `--blur-md` override changed from `20px` → `16px`

**Impact:**
- All components using `var(--blur-md)` in glass theme now use 16px
- Consistency with primitives.css design tokens

## Visual Testing

**Action Required:** Update visual regression test baselines

```bash
npm run test:visual:update
```

Visual tests will show differences in:
- GlassCard medium/strong variants
- TooltipGlass (solid background)
- Dropdown components
- .glass and .frosted utility classes

## Compliance Testing

New automated compliance tests detect hardcoded values:

```bash
npm run test:compliance:source
```

**Expected result:** ✅ 0 violations

## Design Rationale

All changes align with UI_DESIGN.md design token system:

```
Blur Scale (primitives.css):
--blur-sm: 8px   (subtle glass)
--blur-md: 16px  (standard cards, dropdowns)
--blur-lg: 24px  (featured cards, modals)
--blur-xl: 32px  (heavy blur, overlays)
```

**Benefits:**
- Consistent blur values across all components
- Easier theme customization (change one CSS variable)
- Automated compliance testing prevents future violations
- Improved accessibility (solid tooltips)

## Rollback

If breaking changes cause issues, you can temporarily revert by modifying primitives.css:

```css
/* Temporary rollback (NOT recommended for production) */
:root {
  --blur-md: 12px;  /* Old GlassCard medium value */
  --blur-lg: 16px;  /* Old GlassCard strong value */
}
```

**Warning:** This will make compliance tests fail.

## Questions?

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration steps and examples.
