# API Patterns Comparison - Glass UI Library

## Document Purpose

Detailed comparison of API patterns across all library components to ensure **consistency** of the
new `MetricCardGlass` API.

---

## 📊 Comparison Table: Core UI Components

| Component             | Title/Label Prop                 | Value Prop        | Variant System                                                                                        | Children       | Icon Support               | Notes                    |
| --------------------- | -------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------- | -------------- | -------------------------- | ------------------------ |
| **shadcn/ui Card**    | `CardTitle` (subcomponent)       | —                 | —                                                                                                     | ✅ Composition | —                          | Compound component       |
| **AlertGlass**        | `AlertGlassTitle` (subcomponent) | —                 | `variant: 'default' \| 'destructive' \| 'success' \| 'warning'`                                       | ✅ Composition | ✅ Auto (variant-based)    | **Compound component**   |
| **BadgeGlass**        | —                                | —                 | `variant: 'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info'` | ✅ `children`  | ❌                         | **shadcn/ui + extended** |
| **ButtonGlass**       | —                                | —                 | `variant: 'primary' \| 'secondary' \| 'ghost' \| 'destructive' \| 'success' \| 'text'`                | ✅ `children`  | ✅ `iconLeft`, `iconRight` | **shadcn/ui-like**       |
| **GlassCard**         | —                                | —                 | `intensity: 'low' \| 'medium' \| 'high'`                                                              | ✅ `children`  | ❌                         | Custom Glass prop        |
| **NotificationGlass** | `title: string` (required)       | `message: string` | `variant: 'default' \| 'destructive' \| 'success' \| 'warning'`                                       | ❌             | ✅ Auto (variant-based)    | **shadcn/ui compatible** |

### Insights from Core UI:

1. **✅ Variant System** - all use `variant` prop (except GlassCard with `intensity`)
2. **✅ Compound Components** - AlertGlass follows shadcn/ui pattern with subcomponents
   (AlertGlassTitle, AlertGlassDescription)
3. **✅ shadcn/ui variants** - base variants: `default`, `secondary`, `destructive`, `outline`
4. **✅ Glass UI extensions** - extended variants: `success`, `warning`, `info`
5. **✅ Icon handling** - automatic icons based on `variant` (AlertGlass, NotificationGlass)

---

## 📊 Comparison Table: Composite Components

| Component                     | Title/Label Prop               | Value Prop                                 | Color/Variant System                             | Progress              | Trend/Change       | Notes                 |
| ----------------------------- | ------------------------------ | ------------------------------------------ | ------------------------------------------------ | --------------------- | ------------------ | --------------------- |
| **CircularMetricGlass**       | `label: string`                | `value: number (0-100)`                    | `color: 'emerald' \| 'amber' \| 'blue' \| 'red'` | ✅ Circular progress  | ❌                 | Simple metric display |
| **AICardGlass**               | — (hardcoded "AI Code Review") | —                                          | ❌                                               | ❌                    | ❌                 | Fixed layout card     |
| **YearCardGlass**             | `label: string` (badge)        | `commits: string`                          | `gradient?: ProgressGradient`                    | ✅ `progress: number` | ❌                 | Career stats card     |
| **TrustScoreDisplayGlass**    | `title?: string`               | `score: number (0-100)`                    | ❌ (color auto)                                  | ✅ Circular           | ❌                 | Score display         |
| **MetricCardGlass (current)** | `label: string`                | `value: number (0-100)` + `valueFormatter` | `color: 'emerald' \| 'amber' \| 'blue' \| 'red'` | ✅ `showProgress`     | ✅ `trend: object` | **Inconsistent!**     |

### Insights from Composite:

1. **❌ ISSUE:** `label` is used instead of `title`
2. **❌ ISSUE:** `color` instead of `variant` (doesn't match Core UI)
3. **❌ ISSUE:** `value` as percentage 0-100 instead of display value
4. **✅ Good:** Separate `progress` prop in YearCardGlass
5. **❌ ISSUE:** Complex `trend` object instead of simple `change`

---

## 🎯 Patterns from shadcn/ui Card

### Compound Component Pattern

```tsx
// shadcn/ui uses composition
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Advantages of Compound Pattern:

- ✅ Maximum composition flexibility
- ✅ No need for complex layout props
- ✅ Easy to extend
- ❌ More verbose API

### Disadvantages for MetricCard:

- ❌ Too complex for simple use case
- ❌ More boilerplate code
- ❌ Not suitable for fixed layout metrics

---

## 🔍 Analysis: Which Pattern to Choose?

### Option 1: Compound Component (like shadcn/ui Card)

```tsx
<MetricCardGlass>
  <MetricCardGlass.Header>
    <MetricCardGlass.Title>Total Revenue</MetricCardGlass.Title>
    <MetricCardGlass.Icon><DollarSign /></MetricCardGlass.Icon>
  </MetricCardGlass.Header>
  <MetricCardGlass.Value>$45,231</MetricCardGlass.Value>
  <MetricCardGlass.Change>+12.5%</MetricCardGlass.Change>
  <MetricCardGlass.Sparkline data={[...]} />
</MetricCardGlass>
```

**Assessment:**

- ✅ Maximum flexibility
- ❌ Too verbose for fixed layout
- ❌ Doesn't match other Composite components

### Option 2: Flat Props (like CircularMetricGlass, YearCardGlass)

```tsx
<MetricCardGlass
  title="Total Revenue"
  value="$45,231"
  change="+12.5%"
  variant="success"
  icon={<DollarSign />}
  sparklineData={[...]}
/>
```

**Assessment:**

- ✅ Simple and clear API
- ✅ Matches CircularMetricGlass, YearCardGlass
- ✅ Less boilerplate
- ✅ **RECOMMENDED** ✨

### Option 3: Hybrid (Props + Composition for complex cases)

```tsx
// Simple case
<MetricCardGlass title="Revenue" value="$45,231" change="+12.5%" />

// Complex case with custom layout
<MetricCardGlass>
  <MetricCardGlass.Header>...</MetricCardGlass.Header>
  <CustomContent />
</MetricCardGlass>
```

**Assessment:**

- ✅ Flexibility + simplicity
- ❌ More complex to implement
- ❌ API becomes less predictable

---

## ✅ RECOMMENDATION: Option 2 - Flat Props API

### Why?

1. **Consistency with the library** ✅
   - Matches the pattern of CircularMetricGlass, YearCardGlass, TrustScoreDisplayGlass
   - All Composite components use flat props

2. **Ease of use** ✅
   - Less code for typical cases
   - Clear API without nesting
   - Easy to migrate from current API

3. **shadcn/ui compatibility** ✅
   - Uses `title` (like CardTitle)
   - Uses `description` (like CardDescription)
   - Uses `variant` system (like Alert, Badge, Button)

4. **Extensibility** ✅
   - Can add `children` for custom content
   - Can add `asChild` for polymorphism

---

## 📝 Final API for MetricCardGlass

### Type Definitions

```tsx
// ========================================
// VARIANT SYSTEM (following AlertGlass, BadgeGlass)
// ========================================

export type MetricVariant =
  | 'default' // shadcn/ui base (blue)
  | 'secondary' // shadcn/ui base (gray)
  | 'success' // Glass UI extension (green)
  | 'warning' // Glass UI extension (yellow)
  | 'destructive'; // shadcn/ui base (red)

// Mapping: old color → new variant
// emerald → success
// amber → warning
// blue → default
// red → destructive

// ========================================
// CHANGE/TREND TYPES (simplified)
// ========================================

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface MetricChange {
  /** Change value (e.g., 12.5 for +12.5%) */
  readonly value: number;
  /** Trend direction (auto-detected if not provided) */
  readonly direction?: TrendDirection;
  /** Optional period label (e.g., "vs last month") */
  readonly period?: string;
}

// ========================================
// MAIN PROPS INTERFACE
// ========================================

export interface MetricCardGlassProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof metricCardVariants> {
  // ========================================
  // CORE PROPS (shadcn/ui compatible)
  // ========================================

  /** Metric title (shadcn/ui Card: title) */
  readonly title: string;

  /** Display value (shadcn/ui Card: value) */
  readonly value: string | number;

  /** Optional description/subtitle (shadcn/ui Card: description) */
  readonly description?: string;

  /** Change indicator (shadcn/ui: change) */
  readonly change?: string | number | MetricChange;

  /** Semantic variant (follows AlertGlass, BadgeGlass pattern) */
  readonly variant?: MetricVariant;

  /** Icon to display */
  readonly icon?: ReactNode;

  // ========================================
  // GLASS UI EXTENSIONS
  // ========================================

  /** Data for sparkline visualization */
  readonly sparklineData?: readonly number[];

  /** Show sparkline chart */
  readonly showSparkline?: boolean;

  /** Show progress bar (requires progress prop) */
  readonly showProgress?: boolean;

  /** Progress percentage (0-100, separate from display value) */
  readonly progress?: number;

  // ========================================
  // DEPRECATED (backward compatibility)
  // ========================================

  /** @deprecated Use `title` instead */
  readonly label?: string;

  /** @deprecated Use `variant` instead. Mapping: emerald→success, amber→warning, blue→default, red→destructive */
  readonly color?: 'emerald' | 'amber' | 'blue' | 'red';

  /** @deprecated Format value before passing. Use `value` prop directly */
  readonly valueFormatter?: (value: number) => string;

  /** @deprecated Use `description` instead */
  readonly valueSuffix?: string;

  /** @deprecated Use `change` instead */
  readonly trend?: { value: number; direction: TrendDirection; label?: string };
}
```

### Usage Examples

```tsx
// ========================================
// SIMPLE VARIANT (shadcn/ui style)
// ========================================

<MetricCardGlass
  title="Total Revenue"
  value="$45,231"
  change="+12.5%"
  variant="success"
  icon={<DollarSign />}
/>

// ========================================
// WITH DESCRIPTION
// ========================================

<MetricCardGlass
  title="Active Users"
  value="8,459"
  description="Current active sessions"
  change="+5.2%"
  variant="default"
  icon={<Users />}
/>

// ========================================
// WITH DETAILED CHANGE OBJECT
// ========================================

<MetricCardGlass
  title="Conversion Rate"
  value="3.24%"
  change={{
    value: 2.1,
    direction: 'up',
    period: 'vs last month'
  }}
  variant="success"
/>

// ========================================
// WITH PROGRESS AND SPARKLINE (Glass UI extensions)
// ========================================

<MetricCardGlass
  title="Completion Rate"
  value="85%"
  description="Project milestones"
  change="+5.2%"
  variant="success"
  progress={85}          // 0-100 for progress bar
  sparklineData={[70, 75, 78, 80, 82, 84, 85]}
  showProgress
  showSparkline
/>

// ========================================
// BACKWARD COMPATIBILITY (deprecated props)
// ========================================

<MetricCardGlass
  label="Total Revenue"  // ⚠️ deprecated → title
  value={75}
  valueFormatter={(v) => `$${v}`}  // ⚠️ deprecated → format before
  color="emerald"  // ⚠️ deprecated → variant="success"
  trend={{ value: 12.5, direction: 'up' }}  // ⚠️ deprecated → change
/>
```

---

## 🎨 CSS Variables Structure

Following the AlertGlass and BadgeGlass pattern:

```css
/* ========================================
   METRIC CARD VARIANTS
   Following AlertGlass, BadgeGlass pattern
   ======================================== */

/* Default variant (blue) */
--metric-default-bg: rgba(59, 130, 246, 0.08);
--metric-default-border: rgba(59, 130, 246, 0.25);
--metric-default-text: rgb(96, 165, 250);
--metric-default-glow: 0 0 20px rgba(59, 130, 246, 0.3);

/* Secondary variant (gray) */
--metric-secondary-bg: rgba(148, 163, 184, 0.08);
--metric-secondary-border: rgba(148, 163, 184, 0.25);
--metric-secondary-text: rgb(203, 213, 225);
--metric-secondary-glow: 0 0 20px rgba(148, 163, 184, 0.2);

/* Success variant (green/emerald) */
--metric-success-bg: rgba(16, 185, 129, 0.08);
--metric-success-border: rgba(16, 185, 129, 0.25);
--metric-success-text: rgb(52, 211, 153);
--metric-success-glow: 0 0 20px rgba(16, 185, 129, 0.3);

/* Warning variant (yellow/amber) */
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

## ✅ Final Consistency Verification

| Criteria                   | AlertGlass | BadgeGlass | MetricCardGlass (new) | Compliance |
| -------------------------- | ---------- | ---------- | --------------------- | ---------- |
| Uses `variant` prop        | ✅         | ✅         | ✅                    | ✅         |
| Base shadcn/ui variants    | ✅         | ✅         | ✅                    | ✅         |
| Glass UI extensions        | ✅         | ✅         | ✅                    | ✅         |
| CSS variables pattern      | ✅         | ✅         | ✅                    | ✅         |
| `title` prop (not `label`) | ✅         | —          | ✅                    | ✅         |
| `description` support      | —          | —          | ✅                    | ✅         |
| `extends HTMLAttributes`   | ✅         | ✅         | ✅                    | ✅         |
| `readonly` props           | ✅         | ✅         | ✅                    | ✅         |
| CVA integration            | ✅         | ✅         | ✅                    | ✅         |
| Icon support               | ✅ (auto)  | ❌         | ✅ (prop)             | ✅         |

**Result: 10/10 - Complete consistency!** ✅

---

## 📚 References

- [AlertGlass](../src/components/glass/ui/alert-glass.tsx)
- [BadgeGlass](../src/components/glass/ui/badge-glass.tsx)
- [ButtonGlass](../src/components/glass/ui/button-glass.tsx)
- [CircularMetricGlass](../src/components/glass/composite/circular-metric-glass.tsx)
- [YearCardGlass](../src/components/glass/composite/year-card-glass.tsx)
- [shadcn/ui Card](https://ui.shadcn.com/docs/components/card)
