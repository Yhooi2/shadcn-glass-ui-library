# AlertGlass

Glass-themed alert component with full shadcn/ui Alert API compatibility.

## Overview

AlertGlass is a compound component that displays alert messages with glassmorphism styling. It's
100% compatible with shadcn/ui Alert API and supports both shadcn/ui variants (default, destructive)
and Glass UI extended variants (success, warning).

### Key Features

- **shadcn/ui Compatible** - Drop-in replacement for shadcn/ui Alert
- **Compound Component API** - Flexible composition with 3 components
- **4 Variants** - default, destructive, success, warning (+ aliases: info, error)
- **Auto Icons** - Contextual icons based on variant
- **Dismissible** - Optional dismiss button
- **Glass Effects** - Backdrop blur, theme-aware colors
- **Responsive** - Mobile and desktop optimized sizes
- **Type-Safe** - Full TypeScript support with exported types
- **Accessible** - ARIA role and screen reader support

## Installation

```tsx
import { AlertGlass, AlertGlassTitle, AlertGlassDescription } from 'shadcn-glass-ui';

// Or use shadcn/ui compatible aliases
import { Alert, AlertTitle, AlertDescription } from 'shadcn-glass-ui';
```

## Compound API Reference

### Component Structure

```tsx
<AlertGlass variant="default">
  <AlertGlassTitle>Heads up!</AlertGlassTitle>
  <AlertGlassDescription>You can add components to your app using the cli.</AlertGlassDescription>
</AlertGlass>
```

### Component Structure (Dismissible)

```tsx
const [show, setShow] = useState(true);

{
  show && (
    <AlertGlass variant="success" dismissible onDismiss={() => setShow(false)}>
      <AlertGlassTitle>Success!</AlertGlassTitle>
      <AlertGlassDescription>Your changes have been saved.</AlertGlassDescription>
    </AlertGlass>
  );
}
```

### Full Component List

| Component               | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| `AlertGlass`            | Root alert container with icon and optional dismiss button |
| `AlertGlassTitle`       | Alert title/heading                                        |
| `AlertGlassDescription` | Alert description/body text                                |

## Props API

### AlertGlass

Root alert container with auto icon and optional dismiss button.

| Prop          | Type                                                   | Default     | Description                             |
| ------------- | ------------------------------------------------------ | ----------- | --------------------------------------- |
| `variant`     | `'default' \| 'destructive' \| 'success' \| 'warning'` | `'default'` | Alert variant                           |
| `dismissible` | `boolean`                                              | `false`     | Show dismiss button                     |
| `onDismiss`   | `() => void`                                           | -           | Callback when dismiss button is clicked |
| `className`   | `string`                                               | -           | Additional CSS classes                  |
| `children`    | `ReactNode`                                            | -           | Alert content (required)                |

**Variants:**

- `default` - Info/neutral (blue theme, Info icon)
- `destructive` - Error/danger (red theme, AlertCircle icon)
- `success` - Success (green theme, CheckCircle icon)
- `warning` - Warning/caution (yellow theme, AlertTriangle icon)

**Aliases (backward compatibility):**

- `info` → `default`
- `error` → `destructive`

**Styling:**

- Background: `var(--alert-{variant}-bg)`
- Border: `var(--alert-{variant}-border)`
- Text: `var(--alert-{variant}-text)`
- Backdrop blur: `blur(var(--blur-sm))`

**Auto Icons:**

- Each variant displays a contextual icon automatically
- Icon color matches text color
- Icons are responsive: `w-4 h-4 md:w-5 md:h-5`

**Dismiss Button:**

- Only shown when `dismissible={true}`
- Hover effect: `hover:bg-black/5`
- ARIA label: "Dismiss alert"
- Icon: X (close icon)

### AlertGlassTitle

Alert title with medium font weight.

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `className` | `string`    | -       | Additional CSS classes |
| `children`  | `ReactNode` | -       | Title text (required)  |

**Styling:**

- Font weight: `font-medium`
- Font size: `text-xs md:text-sm`
- Bottom margin: `mb-0.5 md:mb-1`
- Color: Inherits from AlertGlass variant

### AlertGlassDescription

Alert description/body text.

| Prop        | Type        | Default | Description                 |
| ----------- | ----------- | ------- | --------------------------- |
| `className` | `string`    | -       | Additional CSS classes      |
| `children`  | `ReactNode` | -       | Description text (required) |

**Styling:**

- Font size: `text-xs md:text-sm`
- Opacity: `opacity-80`
- Color: Inherits from AlertGlass variant

## Usage Examples

### Basic Alert (Default)

```tsx
import { AlertGlass, AlertGlassTitle, AlertGlassDescription } from 'shadcn-glass-ui';

function BasicAlert() {
  return (
    <AlertGlass variant="default">
      <AlertGlassTitle>Heads up!</AlertGlassTitle>
      <AlertGlassDescription>
        You can add components to your app using the cli.
      </AlertGlassDescription>
    </AlertGlass>
  );
}
```

### Destructive Alert

```tsx
function DestructiveAlert() {
  return (
    <AlertGlass variant="destructive">
      <AlertGlassTitle>Error</AlertGlassTitle>
      <AlertGlassDescription>Your session has expired. Please sign in again.</AlertGlassDescription>
    </AlertGlass>
  );
}
```

### Success Alert

```tsx
function SuccessAlert() {
  return (
    <AlertGlass variant="success">
      <AlertGlassTitle>Success</AlertGlassTitle>
      <AlertGlassDescription>Your profile has been updated successfully.</AlertGlassDescription>
    </AlertGlass>
  );
}
```

### Warning Alert

```tsx
function WarningAlert() {
  return (
    <AlertGlass variant="warning">
      <AlertGlassTitle>Warning</AlertGlassTitle>
      <AlertGlassDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertGlassDescription>
    </AlertGlass>
  );
}
```

### Dismissible Alert

```tsx
import { useState } from 'react';
import { AlertGlass, AlertGlassTitle, AlertGlassDescription } from 'shadcn-glass-ui';

function DismissibleAlert() {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) return null;

  return (
    <AlertGlass variant="success" dismissible onDismiss={() => setShowAlert(false)}>
      <AlertGlassTitle>Changes Saved</AlertGlassTitle>
      <AlertGlassDescription>Your preferences have been saved successfully.</AlertGlassDescription>
    </AlertGlass>
  );
}
```

### Title Only

```tsx
function TitleOnlyAlert() {
  return (
    <AlertGlass variant="warning">
      <AlertGlassTitle>Your trial expires in 3 days</AlertGlassTitle>
    </AlertGlass>
  );
}
```

### Description Only

```tsx
function DescriptionOnlyAlert() {
  return (
    <AlertGlass variant="default">
      <AlertGlassDescription>
        New features are available. Check the changelog for details.
      </AlertGlassDescription>
    </AlertGlass>
  );
}
```

### All Variants Showcase

```tsx
function AllVariants() {
  return (
    <div className="space-y-4">
      <AlertGlass variant="default">
        <AlertGlassTitle>Default Alert</AlertGlassTitle>
        <AlertGlassDescription>Info icon with blue theme</AlertGlassDescription>
      </AlertGlass>

      <AlertGlass variant="destructive">
        <AlertGlassTitle>Destructive Alert</AlertGlassTitle>
        <AlertGlassDescription>AlertCircle icon with red theme</AlertGlassDescription>
      </AlertGlass>

      <AlertGlass variant="success">
        <AlertGlassTitle>Success Alert</AlertGlassTitle>
        <AlertGlassDescription>CheckCircle icon with green theme</AlertGlassDescription>
      </AlertGlass>

      <AlertGlass variant="warning">
        <AlertGlassTitle>Warning Alert</AlertGlassTitle>
        <AlertGlassDescription>AlertTriangle icon with yellow theme</AlertGlassDescription>
      </AlertGlass>
    </div>
  );
}
```

### shadcn/ui Compatible Usage

```tsx
import { Alert, AlertTitle, AlertDescription } from 'shadcn-glass-ui';

function ShadcnCompatible() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>100% compatible with shadcn/ui Alert API</AlertDescription>
    </Alert>
  );
}
```

## Accessibility

### ARIA Attributes

- `role="alert"` - Alert role for screen readers
- `aria-label="Dismiss alert"` - Dismiss button label
- `aria-hidden="true"` - Icon is decorative

### Screen Reader Support

- Alert role announces content to screen readers
- Title announced first, followed by description
- Dismiss button announced as "Dismiss alert" button

### Keyboard Navigation

| Key               | Action                                |
| ----------------- | ------------------------------------- |
| `Tab`             | Focus dismiss button (if dismissible) |
| `Enter` / `Space` | Click dismiss button                  |

### Visual Design

- High contrast between text and background
- Icon provides visual context
- Responsive font sizes for better readability
- Dismiss button with visible hover state

## Variant Icon Mapping

| Variant         | Icon          | Theme Color |
| --------------- | ------------- | ----------- |
| `default`       | Info          | Blue        |
| `destructive`   | AlertCircle   | Red         |
| `success`       | CheckCircle   | Green       |
| `warning`       | AlertTriangle | Yellow      |
| `info` (alias)  | Info          | Blue        |
| `error` (alias) | AlertCircle   | Red         |

**Icon Library:** lucide-react

## shadcn/ui Compatibility

AlertGlass provides 100% API compatibility with shadcn/ui Alert:

### Component Aliases

| shadcn/ui          | AlertGlass              | Same Component |
| ------------------ | ----------------------- | -------------- |
| `Alert`            | `AlertGlass`            | ✅             |
| `AlertTitle`       | `AlertGlassTitle`       | ✅             |
| `AlertDescription` | `AlertGlassDescription` | ✅             |

**Variant Compatibility:**

- ✅ `default` - shadcn/ui compatible
- ✅ `destructive` - shadcn/ui compatible
- ➕ `success` - Glass UI extended
- ➕ `warning` - Glass UI extended

**Usage:**

```tsx
// Both import styles work identically
import { Alert, AlertTitle, AlertDescription } from 'shadcn-glass-ui';
import { AlertGlass, AlertGlassTitle, AlertGlassDescription } from 'shadcn-glass-ui';

// These are the exact same components
<Alert> === <AlertGlass>
<AlertTitle> === <AlertGlassTitle>
```

## Related Components

- [NotificationGlass](./notification-glass.md) - Toast notifications with auto-dismiss
- [ModalGlass](./MODAL_GLASS.md) - Modal dialogs for critical alerts
- [BadgeGlass](./badge-glass.md) - Small status indicators
- [FlagAlertGlass](../specialized/flag-alert-glass.md) - Warning/danger flag alerts

---

**Version:** v2.6.0+ **Last Updated:** 2025-12-21 **Status:** Stable **Icons:** lucide-react
