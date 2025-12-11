# MetricCardGlass API Redesign

## Goal

Make `MetricCardGlass` fully compatible with **shadcn/ui patterns** and **consistent** with other
Glass UI library components.

---

## 📋 Analysis of Existing Glass UI Patterns

### 1. Variant System Pattern

All components follow a unified variant system:

#### AlertGlass

```tsx
variant?: 'default' | 'destructive' | 'success' | 'warning'
//         ^^^^^^^^   ^^^^^^^^^^^^ shadcn/ui compatible
//                                  ^^^^^^^^  ^^^^^^^^ Glass UI extensions
```

#### BadgeGlass

```tsx
variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
//         ^^^^^^^^   ^^^^^^^^^^^   ^^^^^^^^^^^^   ^^^^^^^^^ shadcn/ui
//                                                             ^^^^^^^^  ^^^^^^^^  ^^^^^ Glass UI
```

#### ButtonGlass

```tsx
variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'text'
//         ^^^^^^^^   ^^^^^^^^^^^   ^^^^^^   ^^^^^^^^^^^^^ shadcn/ui-like
//                                                          ^^^^^^^^^ Glass UI
```

**Conclusion:** Uses `variant` prop with base shadcn/ui variants + extensions.

---

### 2. CSS Variables Pattern

All components use CSS variables for styling:

```tsx
// AlertGlass
const variantStyles: Record<AlertVariant, AlertStyleVars> = {
  default: {
    bg: 'var(--alert-default-bg)',
    border: 'var(--alert-default-border)',
    text: 'var(--alert-default-text)',
  },
  destructive: { ... },
  success: { ... },
};
```

**Conclusion:** Each variant has corresponding CSS variables in the format
`--component-variant-property`.

---

### 3. Props Interface Pattern

Standard structure:

```tsx
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof componentVariants> {
  // Required props
  readonly label: string;
  readonly value: string | number;

  // Optional extensions
  readonly icon?: ReactNode;
  readonly variant?: Variant;
  readonly size?: Size;
}
```

**Conclusion:** Uses `readonly`, extends `HTMLAttributes`, integrates with CVA
(class-variance-authority).

---

## 🔍 Analysis of Current MetricCardGlass API

### Problems:

1. **❌ No `variant` system**
   - Uses custom `color` instead of standard `variant`
   - Colors: `'emerald' | 'amber' | 'blue' | 'red'` don't match shadcn/ui

2. **❌ Complex data model**
   - `value` as percentage 0-100 + `valueFormatter` - unintuitive
   - Requires math for displaying real values

3. **❌ Incompatible with shadcn/ui**
   - Uses `label` instead of standard `title` from shadcn/ui Card
   - No `description` support

4. **❌ `trend` object too complex**
   - Requires `{ value: number, direction: 'up' | 'down', label?: string }`
   - shadcn/ui typically uses a simple `change` string

---

## ✅ Proposed Solution

### New API (v2.0)

```tsx
// ========================================
// TYPES
// ========================================

export type MetricVariant =
  | 'default' // shadcn/ui base
  | 'secondary' // shadcn/ui base
  | 'success' // Glass UI extension
  | 'warning' // Glass UI extension
  | 'destructive'; // shadcn/ui base

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface MetricChange {
  /** Change value (e.g., 12.5 for +12.5%) */
  readonly value: number;
  /** Trend direction */
  readonly direction?: TrendDirection;
  /** Optional period label (e.g., "vs last month") */
  readonly period?: string;
}

export interface MetricCardGlassProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof metricCardVariants> {
  // ========================================
  // CORE PROPS (shadcn/ui compatible)
  // ========================================

  /** Metric title (shadcn/ui Card: title) */
  readonly title: string;

  /** Display value (shadcn/ui Card: value) */
  readonly value: string | number;

  /** Optional description (shadcn/ui Card: description) */
  readonly description?: string;

  /** Change indicator (shadcn/ui: change) */
  readonly change?: string | number | MetricChange;

  /** Semantic variant (shadcn/ui: variant) */
  readonly variant?: MetricVariant;

  // ========================================
  // GLASS UI EXTENSIONS
  // ========================================

  /** Icon to display */
  readonly icon?: ReactNode;

  /** Data for sparkline visualization */
  readonly sparklineData?: readonly number[];

  /** Show sparkline chart */
  readonly showSparkline?: boolean;

  /** Show progress bar (value must be 0-100) */
  readonly showProgress?: boolean;

  /** Progress percentage (0-100, separate from display value) */
  readonly progress?: number;
}
```

---

## 📝 Usage Examples

### Simple variant (shadcn/ui style)

```tsx
<MetricCardGlass
  title="Total Revenue"
  value="$45,231"
  change="+12.5%"
  variant="success"
  icon={<DollarSign />}
/>
```

### With detailed change object

```tsx
<MetricCardGlass
  title="Total Revenue"
  value="$45,231"
  change={{
    value: 12.5,
    direction: 'up',
    period: 'vs last month',
  }}
  variant="success"
  icon={<DollarSign />}
/>
```

### With progress and sparkline (Glass UI extensions)

```tsx
<MetricCardGlass
  title="Completion Rate"
  value="85%"
  description="Project progress"
  change="+5.2%"
  variant="success"
  progress={85}
  sparklineData={[70, 75, 78, 80, 82, 84, 85]}
  showProgress
  showSparkline
/>
```

### Backward Compatibility (optional)

To support the old API, aliases can be added:

```tsx
<MetricCardGlass
  label="Total Revenue" // ⚠️ deprecated, use title
  value={75}
  valueFormatter={(v) => `$${v}`} // ⚠️ deprecated, use value directly
  color="emerald" // ⚠️ deprecated, use variant="success"
/>
```

---

## 🎨 Mapping: old API → new API

| Old API                       | New API                    | Note                                  |
| ----------------------------- | -------------------------- | ------------------------------------- |
| `label`                       | `title`                    | shadcn/ui standard                    |
| `value: number (0-100)`       | `value: string \| number`  | Simplification                        |
| `valueFormatter`              | —                          | Removed, format before passing        |
| `valueSuffix`                 | `description`              | shadcn/ui standard                    |
| `color: 'emerald'`            | `variant: 'success'`       | Unification                           |
| `color: 'amber'`              | `variant: 'warning'`       | Unification                           |
| `color: 'blue'`               | `variant: 'default'`       | Unification                           |
| `color: 'red'`                | `variant: 'destructive'`   | Unification                           |
| `trend: { value, direction }` | `change: string \| object` | Simplification                        |
| —                             | `progress: number`         | New: separation of value and progress |

---

## 🛠 CSS Variables Structure

Following the library pattern:

```css
/* glass-theme.css */

/* Default variant */
--metric-default-bg: rgba(255, 255, 255, 0.08);
--metric-default-border: rgba(255, 255, 255, 0.15);
--metric-default-text: var(--text-primary);
--metric-default-glow: 0 0 20px rgba(59, 130, 246, 0.3);

/* Success variant (emerald) */
--metric-success-bg: rgba(16, 185, 129, 0.08);
--metric-success-border: rgba(16, 185, 129, 0.25);
--metric-success-text: rgb(52, 211, 153);
--metric-success-glow: 0 0 20px rgba(16, 185, 129, 0.3);

/* Warning variant (amber) */
--metric-warning-bg: rgba(245, 158, 11, 0.08);
--metric-warning-border: rgba(245, 158, 11, 0.25);
--metric-warning-text: rgb(251, 191, 36);
--metric-warning-glow: 0 0 20px rgba(245, 158, 11, 0.3);

/* Destructive variant (red/rose) */
--metric-destructive-bg: rgba(244, 63, 94, 0.08);
--metric-destructive-border: rgba(244, 63, 94, 0.25);
--metric-destructive-text: rgb(251, 113, 133);
--metric-destructive-glow: 0 0 20px rgba(244, 63, 94, 0.3);
```

---

## 🎯 Advantages of New API

### 1. **shadcn/ui compatibility** ✅

- Uses standard props: `title`, `value`, `description`, `variant`
- Can easily be replaced with shadcn/ui Card without API changes

### 2. **Consistency with the library** ✅

- Follows `AlertGlass`, `BadgeGlass`, `ButtonGlass` patterns
- Uses unified `variant` system
- CSS variables in unified format

### 3. **Ease of use** ✅

- No need for `valueFormatter` and math
- Simple string `change="+12.5%"` instead of object
- Clear separation of `value` (display) and `progress` (0-100)

### 4. **Flexibility** ✅

- Supports both simple strings and objects for `change`
- Optional Glass UI extensions (sparkline, progress)
- Backward compatibility through aliases (optional)

---

## 🚀 Migration Plan

### Step 1: Create new component

- [ ] Create `metric-card-glass-v2.tsx` with new API
- [ ] Add CVA variants to `metric-card-glass-variants.ts`
- [ ] Add CSS variables to `glass-theme.css`

### Step 2: Testing

- [ ] Create stories for new API
- [ ] Add unit tests
- [ ] Add visual regression tests

### Step 3: Migration

- [ ] Update `dashboard.stories.tsx`
- [ ] Update other usages
- [ ] Add deprecation warnings for old API

### Step 4: Documentation

- [ ] Update Storybook docs
- [ ] Add migration guide
- [ ] Update README

---

## 📚 References

- [Card - shadcn/ui](https://ui.shadcn.com/docs/components/card)
- [The Anatomy of shadcn/ui Components | Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
- [Shadcn UI Dashboard Widgets](https://shadcnstore.com/blocks/application/widgets)
- [Stat Cards - Shadcn UI Kit](https://shadcnuikit.com/components/cards/stat)
