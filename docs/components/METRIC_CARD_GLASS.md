# MetricCardGlass

Glass-themed metric display card with progress, sparkline, and trend visualization.

## Overview

MetricCardGlass is a composite component for displaying metrics with glassmorphism styling. It
follows shadcn/ui Card pattern with Glass UI extensions for data visualization, progress tracking,
and trend indicators.

### Key Features

- **shadcn/ui Compatible** - Follows Card and Badge variant patterns
- **5 Semantic Variants** - default, secondary, success, warning, destructive
- **Progress Visualization** - Optional progress bar with gradient effects
- **Sparkline Charts** - Mini trend charts using SparklineGlass
- **Trend Indicators** - Auto-colored change indicators (up/down/neutral)
- **Explain Button** - Contextual help with accessible aria-label
- **Ratio Display** - Support for value/maxScore format (e.g., "85/100")
- **Icon Support** - Optional icon display
- **Type-Safe** - Full TypeScript support with exported types
- **CSS Variables** - Theme-aware styling using design tokens
- **Accessible** - ARIA labels, keyboard support, WCAG 2.1 AA compliant
- **Responsive** - Mobile and desktop optimized

## Installation

```tsx
import { MetricCardGlass } from 'shadcn-glass-ui';
```

## Props API

### MetricCardGlassProps

Extends `React.HTMLAttributes<HTMLDivElement>` with the following props:

#### Core Props (shadcn/ui compatible)

| Prop          | Type                               | Default     | Description                                          |
| ------------- | ---------------------------------- | ----------- | ---------------------------------------------------- |
| `title`       | `string`                           | -           | Metric title (required)                              |
| `value`       | `string \| number`                 | -           | Display value (required)                             |
| `description` | `string`                           | -           | Optional description/subtitle                        |
| `change`      | `string \| number \| MetricChange` | -           | Change indicator (e.g., "+12.5%" or detailed object) |
| `variant`     | `MetricVariant`                    | `'default'` | Semantic variant                                     |
| `icon`        | `ReactNode`                        | -           | Icon to display in header                            |

#### Glass UI Extensions

| Prop            | Type                | Default | Description                      |
| --------------- | ------------------- | ------- | -------------------------------- |
| `sparklineData` | `readonly number[]` | -       | Data for sparkline visualization |
| `showSparkline` | `boolean`           | `true`  | Show sparkline chart             |
| `showProgress`  | `boolean`           | `true`  | Show progress bar                |
| `progress`      | `number`            | -       | Progress percentage (0-100)      |

#### Score Display & Explain

| Prop          | Type         | Default                        | Description                                               |
| ------------- | ------------ | ------------------------------ | --------------------------------------------------------- |
| `maxScore`    | `number`     | -                              | Max score for ratio display (renders as "value/maxScore") |
| `onExplain`   | `() => void` | -                              | Callback when explain button is clicked                   |
| `showExplain` | `boolean`    | `true` (if onExplain provided) | Control explain button visibility                         |

#### Deprecated Props (backward compatibility)

| Deprecated Prop  | Type                                      | Replacement                                                                   |
| ---------------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| `label`          | `string`                                  | Use `title`                                                                   |
| `color`          | `'emerald' \| 'amber' \| 'blue' \| 'red'` | Use `variant` (emerald→success, amber→warning, blue→default, red→destructive) |
| `valueSuffix`    | `string`                                  | Use `description`                                                             |
| `valueFormatter` | `(value: number) => string`               | Format value before passing                                                   |
| `trend`          | `MetricTrend`                             | Use `change`                                                                  |

### MetricVariant

Semantic variant type (follows shadcn/ui pattern):

```tsx
type MetricVariant =
  | 'default' // Blue theme (primary metric)
  | 'secondary' // Gray theme (neutral metric)
  | 'success' // Green theme (positive metric)
  | 'warning' // Yellow theme (caution metric)
  | 'destructive'; // Red theme (negative metric)
```

### MetricChange

Detailed change object with trend information:

```tsx
interface MetricChange {
  readonly value: number; // Change value (e.g., 12.5 for +12.5%)
  readonly direction?: TrendDirection; // 'up' | 'down' | 'neutral'
  readonly period?: string; // Optional label (e.g., "vs last month")
}
```

## Variants

| Variant       | Theme  | Use Case                        | Progress Gradient | Border Color                       |
| ------------- | ------ | ------------------------------- | ----------------- | ---------------------------------- |
| `default`     | Blue   | Primary metrics, general data   | `blue`            | `var(--metric-default-border)`     |
| `secondary`   | Gray   | Neutral metrics, secondary data | `cyan`            | `var(--metric-secondary-border)`   |
| `success`     | Green  | Positive metrics, achievements  | `emerald`         | `var(--metric-success-border)`     |
| `warning`     | Yellow | Caution metrics, thresholds     | `amber`           | `var(--metric-warning-border)`     |
| `destructive` | Red    | Negative metrics, errors        | `rose`            | `var(--metric-destructive-border)` |

## Usage Examples

### Simple Metric

Basic metric display with title and value:

```tsx
import { MetricCardGlass } from 'shadcn-glass-ui';
import { DollarSign } from 'lucide-react';

function SimpleMetric() {
  return (
    <MetricCardGlass
      title="Total Revenue"
      value="$45,231"
      variant="success"
      icon={<DollarSign className="w-4 h-4" />}
    />
  );
}
```

### With String Change

Metric with simple string change indicator:

```tsx
import { Users } from 'lucide-react';

function MetricWithChange() {
  return (
    <MetricCardGlass
      title="Active Users"
      value="8,459"
      change="+12.5%"
      variant="default"
      icon={<Users className="w-4 h-4" />}
    />
  );
}
```

### With Detailed Change Object

Metric with detailed change information:

```tsx
import { TrendingUp } from 'lucide-react';

function DetailedChange() {
  return (
    <MetricCardGlass
      title="Conversion Rate"
      value="3.24%"
      description="Goal: 3.5%"
      change={{
        value: 12.5,
        direction: 'up',
        period: 'vs last month',
      }}
      variant="success"
      icon={<TrendingUp className="w-4 h-4" />}
    />
  );
}
```

### With Progress Bar

Metric with progress visualization:

```tsx
function MetricWithProgress() {
  return (
    <MetricCardGlass
      title="Project Progress"
      value="85%"
      description="17 of 20 tasks"
      progress={85}
      variant="success"
      showProgress
    />
  );
}
```

### With Sparkline Chart

Metric with trend visualization:

```tsx
function MetricWithSparkline() {
  return (
    <MetricCardGlass
      title="Performance"
      value="92"
      description="Weekly average"
      variant="default"
      sparklineData={[70, 75, 78, 82, 86, 90, 92]}
      showSparkline
    />
  );
}
```

### With Explain Button

Metric with contextual help button (addresses Issue #23):

```tsx
import { Activity } from 'lucide-react';
import { useState } from 'react';

function MetricWithExplain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <MetricCardGlass
        title="Trust Score"
        value="85%"
        description="Overall reliability"
        variant="success"
        icon={<Activity className="w-4 h-4" />}
        progress={85}
        onExplain={() => setShowModal(true)}
      />
      {/* Modal with explanation */}
    </>
  );
}
```

**Accessibility Note:** The explain button includes an accessible aria-label:
`"Explain ${title} metric"`, ensuring screen reader users can distinguish between multiple explain
buttons on the same page.

### Score Ratio Display

Metric with value/maxScore format:

```tsx
function ScoreDisplay() {
  return (
    <MetricCardGlass
      title="Test Score"
      value={85}
      maxScore={100}
      description="Pass rate: 85%"
      variant="success"
    />
  );
}
// Displays: "85/100"
```

### Full-Featured Example

Metric with all features enabled:

```tsx
import { Activity } from 'lucide-react';

function FullFeaturedMetric() {
  return (
    <MetricCardGlass
      title="Activity Index"
      value="94%"
      description="Excellent performance"
      change={{ value: 15.2, direction: 'up', period: 'vs last month' }}
      variant="success"
      icon={<Activity className="w-4 h-4" />}
      sparklineData={[70, 75, 80, 85, 88, 90, 94]}
      progress={94}
      showProgress
      showSparkline
      onExplain={() =>
        alert('Activity Index combines commit frequency, PR reviews, and issue responses.')
      }
    />
  );
}
```

### All Variants Showcase

Display all 5 semantic variants:

```tsx
import { DollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';

function AllVariantsShowcase() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCardGlass
        title="Default"
        value="$12,345"
        change="+8.2%"
        variant="default"
        icon={<DollarSign className="w-4 h-4" />}
        sparklineData={[60, 65, 70, 75, 80, 85, 90]}
        progress={75}
      />
      <MetricCardGlass
        title="Secondary"
        value="2,458"
        change="+3.1%"
        variant="secondary"
        icon={<Users className="w-4 h-4" />}
        sparklineData={[50, 55, 58, 62, 65, 68, 70]}
        progress={68}
      />
      <MetricCardGlass
        title="Success"
        value="98.5%"
        change={{ value: 12, direction: 'up' }}
        variant="success"
        icon={<TrendingUp className="w-4 h-4" />}
        sparklineData={[85, 88, 90, 92, 94, 96, 98]}
        progress={98}
      />
      <MetricCardGlass
        title="Warning"
        value="67%"
        change={{ value: 5, direction: 'down' }}
        variant="warning"
        icon={<AlertTriangle className="w-4 h-4" />}
        sparklineData={[80, 77, 74, 71, 69, 68, 67]}
        progress={67}
      />
      <MetricCardGlass
        title="Destructive"
        value="23%"
        change={{ value: 18, direction: 'down', period: 'critical' }}
        variant="destructive"
        icon={<AlertTriangle className="w-4 h-4" />}
        sparklineData={[45, 40, 35, 30, 28, 25, 23]}
        progress={23}
      />
    </div>
  );
}
```

### Deprecated Props (Migration Example)

Example of old API vs new API:

```tsx
// ❌ DEPRECATED (v1.x - still works but shows console warnings)
<MetricCardGlass
  label="Score"              // Use title
  color="emerald"            // Use variant="success"
  trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}  // Use change
  valueSuffix="points"       // Use description
  valueFormatter={(v) => `${v}%`}  // Format value before passing
/>

// ✅ NEW API (v2.0+)
<MetricCardGlass
  title="Score"
  variant="success"
  change={{ value: 12.5, direction: 'up', period: 'vs last month' }}
  description="points"
  value="85%"  // Pre-formatted
/>
```

## Accessibility

MetricCardGlass follows WCAG 2.1 AA guidelines and implements comprehensive accessibility features.

### ARIA Attributes

- **Explain button**: `aria-label="Explain ${title} metric"` - Includes metric title for context
  (fixes Issue #23)
- **Sparkline**: `aria-label="${title} trend"` - Describes the trend visualization
- **Progress bar**:
  - `role="progressbar"`
  - `aria-valuenow={progress}`
  - `aria-valuemin={0}`
  - `aria-valuemax={100}`

### Keyboard Navigation

| Key   | Action                            |
| ----- | --------------------------------- |
| Tab   | Focus explain button (if present) |
| Enter | Activate explain button           |
| Space | Activate explain button           |

### Screen Reader Support

MetricCardGlass provides comprehensive screen reader support:

1. **Metric title** announced first
2. **Value and description** announced sequentially
3. **Change indicator** with direction context:
   - Positive changes: "up" direction with success tone
   - Negative changes: "down" direction with destructive tone
   - Neutral changes: "neutral" indicator
4. **Progress percentage** announced from progress bar
5. **Explain button** includes metric title for context:
   - Example: "Explain Activity Index metric, button"
   - Multiple cards distinguishable by metric name

### Focus Management

- Explain button receives focus in natural tab order
- Hover states provide visual feedback
- Focus visible for keyboard navigation

### Color Contrast

All variants meet WCAG AA contrast requirements:

- Text contrast ratio: ≥4.5:1
- Interactive elements: ≥3:1
- Variant colors tested across all themes (glass, light, aurora)

## CSS Variables

MetricCardGlass uses CSS variables for theme-aware styling. Each variant has 4 CSS variables:

### Variable Pattern

```css
--metric-{variant}-bg      /* Background color */
--metric-{variant}-text    /* Text and glow color */
--metric-{variant}-border  /* Border color */
--metric-{variant}-glow    /* Glow/shadow color */
```

### All Variants

```css
/* Default variant (blue) */
--metric-default-bg
--metric-default-text
--metric-default-border
--metric-default-glow

/* Secondary variant (gray) */
--metric-secondary-bg
--metric-secondary-text
--metric-secondary-border
--metric-secondary-glow

/* Success variant (green) */
--metric-success-bg
--metric-success-text
--metric-success-border
--metric-success-glow

/* Warning variant (yellow) */
--metric-warning-bg
--metric-warning-text
--metric-warning-border
--metric-warning-glow

/* Destructive variant (red) */
--metric-destructive-bg
--metric-destructive-text
--metric-destructive-border
--metric-destructive-glow
```

### Theme Compatibility

CSS variables adapt to active theme:

- **glass** (dark): High contrast, vibrant colors
- **light**: Subtle colors, light backgrounds
- **aurora**: Gradient-enhanced colors

### Custom Styling

Override CSS variables for custom themes:

```css
[data-theme='custom'] {
  --metric-success-bg: oklch(0.5 0.15 150 / 0.15);
  --metric-success-text: oklch(0.7 0.18 150);
  --metric-success-border: oklch(0.6 0.16 150 / 0.3);
  --metric-success-glow: oklch(0.65 0.17 150 / 0.4);
}
```

## Migration from v1.x

### Breaking Changes in v2.0

**Removed props:**

- `label` → Use `title`
- `color` → Use `variant`
- `trend` → Use `change`
- `valueSuffix` → Use `description`
- `valueFormatter` → Format value before passing

### Migration Steps

1. **Replace `label` with `title`:**

   ```tsx
   // Before
   <MetricCardGlass label="Score" value={85} />

   // After
   <MetricCardGlass title="Score" value={85} />
   ```

2. **Replace `color` with `variant`:**

   ```tsx
   // Before
   <MetricCardGlass color="emerald" value="95%" />

   // After
   <MetricCardGlass variant="success" value="95%" />
   ```

   **Color mapping:**
   - `emerald` → `success`
   - `amber` → `warning`
   - `blue` → `default`
   - `red` → `destructive`

3. **Replace `trend` with `change`:**

   ```tsx
   // Before
   <MetricCardGlass
     trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}
   />

   // After
   <MetricCardGlass
     change={{ value: 12.5, direction: 'up', period: 'vs last month' }}
   />
   ```

4. **Replace `valueSuffix` with `description`:**

   ```tsx
   // Before
   <MetricCardGlass value={85} valueSuffix="points" />

   // After
   <MetricCardGlass value={85} description="points" />
   ```

5. **Replace `valueFormatter`:**

   ```tsx
   // Before
   <MetricCardGlass
     value={85}
     valueFormatter={(v) => `${v}%`}
   />

   // After
   <MetricCardGlass value="85%" />
   ```

### Automated Migration

Use this sed command for bulk migration (macOS/Linux):

```bash
# Replace label with title
find src/ -type f -name "*.tsx" -exec sed -i '' 's/label="/title="/g' {} +

# Replace color with variant (manual mapping required for values)
find src/ -type f -name "*.tsx" -exec sed -i '' 's/color="/variant="/g' {} +
```

## Related Components

- [ProgressGlass](./PROGRESS_GLASS.md) - Progress bar component used internally
- [SparklineGlass](./SPARKLINE_GLASS.md) - Sparkline chart component used internally
- [CardGlass](./CARD_GLASS.md) - Base glass card component
- [BadgeGlass](./BADGE_GLASS.md) - Badge component with similar variant system
- [AlertGlass](./ALERT_GLASS.md) - Alert component with similar variant system
- [InteractiveCard](../primitives/interactive-card.md) - Primitive card with hover effects

## Best Practices

1. **Use semantic variants** - Choose variants based on meaning, not just color preference
2. **Provide context** - Always include `title` and meaningful `value`
3. **Leverage explain button** - Use `onExplain` for complex metrics that need explanation
4. **Optimize sparkline data** - Keep data arrays to 5-10 points for best visual results
5. **Use `maxScore` for scores** - Display scores as ratios (e.g., "85/100") for clarity
6. **Format values before passing** - Pre-format numbers as strings for consistent display
7. **Combine progress + sparkline** - Show both for comprehensive data visualization
8. **Test accessibility** - Verify screen reader announcements and keyboard navigation

## Browser Compatibility

| Browser        | Minimum Version | Notes                   |
| -------------- | --------------- | ----------------------- |
| Chrome         | 90+             | Full support            |
| Firefox        | 88+             | Full support            |
| Safari         | 14+             | Full support            |
| Edge           | 90+             | Full support (Chromium) |
| Mobile Safari  | 14+             | Full support            |
| Chrome Android | 90+             | Full support            |

**CSS Features Used:**

- CSS Grid (layout)
- CSS Variables (theming)
- Backdrop Filter (glass effect)
- oklch() color space (modern browsers)

---

**Version:** v2.6.1+ **Last Updated:** 2025-12-21 **Component Status:** Stable **shadcn/ui
Compatibility:** Variant patterns compatible **Icons:** lucide-react
