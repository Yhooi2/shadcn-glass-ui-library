# ModalGlass

Glass-themed modal/dialog component with full shadcn/ui Dialog API compatibility.

## Overview

ModalGlass is a compound component built on `@radix-ui/react-dialog` that provides an accessible,
beautiful modal dialog with glassmorphism styling. It's 100% compatible with shadcn/ui Dialog API
and supports both controlled and uncontrolled modes.

### Key Features

- **shadcn/ui Compatible** - Drop-in replacement for shadcn/ui Dialog
- **Compound Component API** - Flexible composition with 11 sub-components
- **Radix UI Foundation** - Full WCAG 2.1 AA compliance out of the box
- **Controlled & Uncontrolled** - Programmatic or trigger-based opening
- **Size Variants** - 5 sizes: sm, md, lg, xl, full
- **Focus Management** - Auto-focus on open, return focus on close
- **Keyboard Support** - Escape to close, Tab for focus trap
- **Glass Effects** - Backdrop blur, glow effects, smooth animations
- **Optional Body** - Content can go directly in Content (shadcn/ui pattern)
- **Type-Safe** - Full TypeScript support with exported types
- **Accessible** - Screen reader support with ARIA attributes

## Installation

```tsx
import { ModalGlass } from 'shadcn-glass-ui';

// Or use shadcn/ui compatible aliases
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from 'shadcn-glass-ui';
```

## Compound API Reference

### Component Structure (Uncontrolled)

```tsx
<ModalGlass.Root>
  <ModalGlass.Trigger asChild>
    <ButtonGlass>Open Dialog</ButtonGlass>
  </ModalGlass.Trigger>

  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Dialog Title</ModalGlass.Title>
      <ModalGlass.Description>Dialog description</ModalGlass.Description>
    </ModalGlass.Header>

    <ModalGlass.Body>
      {/* Optional wrapper for content */}
      Content here
    </ModalGlass.Body>

    <ModalGlass.Footer>
      <ModalGlass.Close asChild>
        <ButtonGlass variant="ghost">Cancel</ButtonGlass>
      </ModalGlass.Close>
      <ButtonGlass>Confirm</ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

### Component Structure (Controlled)

```tsx
const [open, setOpen] = useState(false);

<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Confirm Action</ModalGlass.Title>
    </ModalGlass.Header>

    <p>Are you sure?</p>

    <ModalGlass.Footer>
      <ButtonGlass onClick={() => setOpen(false)}>Cancel</ButtonGlass>
      <ButtonGlass onClick={handleConfirm}>Confirm</ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>;
```

### Full Component List

| Component     | Description                             |
| ------------- | --------------------------------------- |
| `Root`        | Dialog root with context provider       |
| `Trigger`     | Opens the dialog when clicked           |
| `Portal`      | Renders children into a portal          |
| `Overlay`     | Backdrop with blur effect               |
| `Content`     | Main modal container with glass styling |
| `Header`      | Header section with flex layout         |
| `Body`        | Optional wrapper for main content       |
| `Footer`      | Footer section for actions              |
| `Title`       | Modal title with accessibility          |
| `Description` | Modal description text                  |
| `Close`       | Closes the dialog when clicked          |

## Props API

### ModalGlass.Root

Dialog root component supporting both controlled and uncontrolled modes.

| Prop           | Type                                     | Default | Description                             |
| -------------- | ---------------------------------------- | ------- | --------------------------------------- |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'sm'`  | Modal size variant                      |
| `open`         | `boolean`                                | -       | Controlled open state                   |
| `defaultOpen`  | `boolean`                                | `false` | Initial open state (uncontrolled)       |
| `onOpenChange` | `(open: boolean) => void`                | -       | Callback when open state changes        |
| `modal`        | `boolean`                                | `true`  | Whether to render as modal (trap focus) |
| `children`     | `ReactNode`                              | -       | Sub-components (required)               |

**Modes:**

- **Uncontrolled:** Use with `Trigger`, optionally set `defaultOpen`
- **Controlled:** Pass `open` and `onOpenChange` props

### ModalGlass.Trigger

Opens the dialog when clicked (uncontrolled mode only).

| Prop       | Type        | Default | Description                               |
| ---------- | ----------- | ------- | ----------------------------------------- |
| `asChild`  | `boolean`   | `false` | Render as child element instead of button |
| `children` | `ReactNode` | -       | Trigger element (required)                |

**Example:**

```tsx
<ModalGlass.Trigger asChild>
  <ButtonGlass>Open</ButtonGlass>
</ModalGlass.Trigger>
```

### ModalGlass.Portal

Renders children into a portal (default: `document.body`).

| Prop        | Type          | Default         | Description               |
| ----------- | ------------- | --------------- | ------------------------- |
| `container` | `HTMLElement` | `document.body` | Portal container element  |
| `children`  | `ReactNode`   | -               | Portal content (required) |

**Note:** `ModalGlass.Content` automatically renders `Portal` and `Overlay`.

### ModalGlass.Overlay

Backdrop with glass blur effect.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Styling:**

- Background: `var(--modal-overlay)`
- Blur: `blur(var(--blur-sm))`
- Animations: Fade in/out

**Note:** Automatically rendered by `ModalGlass.Content`.

### ModalGlass.Content

Main modal container with glass styling.

| Prop              | Type                                     | Default | Description                       |
| ----------------- | ---------------------------------------- | ------- | --------------------------------- |
| `showCloseButton` | `boolean`                                | `true`  | Show X button in top-right corner |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | -       | Override size from Root           |
| `className`       | `string`                                 | -       | Additional CSS classes            |
| `children`        | `ReactNode`                              | -       | Modal content (required)          |

**Styling:**

- Background: `var(--modal-bg)`
- Border: `var(--modal-border)`
- Shadow: `var(--modal-glow)`
- Blur: `blur(var(--blur-lg))`

**Size Variants:**

- `sm` - 28rem (448px)
- `md` - 32rem (512px)
- `lg` - 40rem (640px)
- `xl` - 48rem (768px)
- `full` - Full screen with padding

**Animations:**

- Fade in/out
- Zoom in/out (95% → 100%)
- Slide from center

### ModalGlass.Header

Header section with flex layout.

| Prop        | Type        | Default | Description                                 |
| ----------- | ----------- | ------- | ------------------------------------------- |
| `className` | `string`    | -       | Additional CSS classes                      |
| `children`  | `ReactNode` | -       | Title and Description components (required) |

**Default Layout:**

- Mobile: Centered text
- Desktop: Left-aligned text
- Bottom margin: `mb-4`

### ModalGlass.Body

Optional wrapper for main content area.

| Prop        | Type        | Default | Description             |
| ----------- | ----------- | ------- | ----------------------- |
| `className` | `string`    | -       | Additional CSS classes  |
| `children`  | `ReactNode` | -       | Main content (required) |

**Styling:**

- Color: `var(--text-secondary)`

**Note:** This component is OPTIONAL. Content can go directly inside `ModalGlass.Content` (shadcn/ui
pattern).

### ModalGlass.Footer

Footer section with flex layout for actions.

| Prop        | Type        | Default | Description               |
| ----------- | ----------- | ------- | ------------------------- |
| `className` | `string`    | -       | Additional CSS classes    |
| `children`  | `ReactNode` | -       | Action buttons (required) |

**Default Layout:**

- Mobile: Column, reversed order (primary button on top)
- Desktop: Row, right-aligned
- Gap: `gap-2`
- Top margin: `mt-4`

### ModalGlass.Title

Modal title with proper accessibility.

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `className` | `string`    | -       | Additional CSS classes |
| `children`  | `ReactNode` | -       | Title text (required)  |

**Styling:**

- Font size: `text-lg md:text-xl`
- Font weight: `font-semibold`
- Color: `var(--text-primary)`

**Accessibility:**

- Linked to dialog via `aria-labelledby`

### ModalGlass.Description

Modal description text.

| Prop        | Type        | Default | Description                 |
| ----------- | ----------- | ------- | --------------------------- |
| `className` | `string`    | -       | Additional CSS classes      |
| `children`  | `ReactNode` | -       | Description text (required) |

**Styling:**

- Font size: `text-sm`
- Color: `var(--text-muted)`

**Accessibility:**

- Linked to dialog via `aria-describedby`

### ModalGlass.Close

Closes the dialog when clicked.

| Prop       | Type        | Default | Description                               |
| ---------- | ----------- | ------- | ----------------------------------------- |
| `asChild`  | `boolean`   | `false` | Render as child element instead of button |
| `children` | `ReactNode` | -       | Close element (required)                  |

**Example:**

```tsx
<ModalGlass.Close asChild>
  <ButtonGlass variant="ghost">Cancel</ButtonGlass>
</ModalGlass.Close>
```

## Usage Examples

### Basic Dialog (Uncontrolled)

```tsx
import { ModalGlass, ButtonGlass } from 'shadcn-glass-ui';

function BasicDialog() {
  return (
    <ModalGlass.Root>
      <ModalGlass.Trigger asChild>
        <ButtonGlass>Open Dialog</ButtonGlass>
      </ModalGlass.Trigger>

      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Welcome</ModalGlass.Title>
          <ModalGlass.Description>This is a basic glass-themed dialog</ModalGlass.Description>
        </ModalGlass.Header>

        <ModalGlass.Body>
          <p>Dialog content goes here.</p>
        </ModalGlass.Body>

        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Close</ButtonGlass>
          </ModalGlass.Close>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  );
}
```

### Controlled Dialog (Programmatic)

```tsx
import { useState } from 'react';
import { ModalGlass, ButtonGlass } from 'shadcn-glass-ui';

function ControlledDialog() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmed!');
    setOpen(false);
  };

  return (
    <>
      <ButtonGlass onClick={() => setOpen(true)}>Open Controlled Dialog</ButtonGlass>

      <ModalGlass.Root open={open} onOpenChange={setOpen}>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Confirm Action</ModalGlass.Title>
            <ModalGlass.Description>Are you sure you want to proceed?</ModalGlass.Description>
          </ModalGlass.Header>

          <ModalGlass.Footer>
            <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </ButtonGlass>
            <ButtonGlass onClick={handleConfirm}>Confirm</ButtonGlass>
          </ModalGlass.Footer>
        </ModalGlass.Content>
      </ModalGlass.Root>
    </>
  );
}
```

### Size Variants

```tsx
function SizeVariants() {
  return (
    <>
      {/* Small (default) */}
      <ModalGlass.Root size="sm">
        <ModalGlass.Trigger asChild>
          <ButtonGlass>Small Dialog</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Small Dialog</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>28rem width</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>

      {/* Large */}
      <ModalGlass.Root size="lg">
        <ModalGlass.Trigger asChild>
          <ButtonGlass>Large Dialog</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Large Dialog</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>40rem width</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>

      {/* Full screen */}
      <ModalGlass.Root size="full">
        <ModalGlass.Trigger asChild>
          <ButtonGlass>Full Screen Dialog</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Full Screen Dialog</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>Full viewport with padding</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>
    </>
  );
}
```

### Without Close Button

```tsx
function NoCloseButton() {
  const [open, setOpen] = useState(false);

  return (
    <ModalGlass.Root open={open} onOpenChange={setOpen}>
      <ModalGlass.Content showCloseButton={false}>
        <ModalGlass.Header>
          <ModalGlass.Title>Confirm Delete</ModalGlass.Title>
          <ModalGlass.Description>This action cannot be undone.</ModalGlass.Description>
        </ModalGlass.Header>

        <ModalGlass.Footer>
          <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </ButtonGlass>
          <ButtonGlass variant="destructive" onClick={handleDelete}>
            Delete
          </ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  );
}
```

### shadcn/ui Compatible Usage

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'shadcn-glass-ui';
import { ButtonGlass } from 'shadcn-glass-ui';

function ShadcnCompatible() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonGlass>Open</ButtonGlass>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>shadcn/ui Pattern</DialogTitle>
          <DialogDescription>100% compatible with shadcn/ui Dialog API</DialogDescription>
        </DialogHeader>

        {/* Content goes directly here (no DialogBody needed) */}
        <p className="text-sm text-(--text-secondary)">
          This follows the exact shadcn/ui Dialog pattern.
        </p>

        <DialogFooter>
          <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          <ButtonGlass>Confirm</ButtonGlass>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Accessibility

### Keyboard Navigation

| Key           | Action                                                   |
| ------------- | -------------------------------------------------------- |
| `Escape`      | Close the dialog                                         |
| `Tab`         | Move focus to next focusable element (trapped in dialog) |
| `Shift + Tab` | Move focus to previous focusable element                 |

### ARIA Attributes

- `role="dialog"` - Dialog role
- `aria-modal="true"` - Modal behavior
- `aria-labelledby` - Links to Title
- `aria-describedby` - Links to Description (if present)

### Focus Management

- **Auto-focus:** First focusable element when dialog opens
- **Focus trap:** Tab cycles through dialog elements only
- **Return focus:** Focus returns to trigger element on close

### Screen Reader Support

- Title announced as dialog label
- Description announced as dialog description
- Close button has `sr-only` text: "Close"

## shadcn/ui Compatibility

ModalGlass provides 100% API compatibility with shadcn/ui Dialog:

### Component Aliases

| shadcn/ui           | ModalGlass               | Same Component |
| ------------------- | ------------------------ | -------------- |
| `Dialog`            | `ModalGlass.Root`        | ✅             |
| `DialogTrigger`     | `ModalGlass.Trigger`     | ✅             |
| `DialogPortal`      | `ModalGlass.Portal`      | ✅             |
| `DialogOverlay`     | `ModalGlass.Overlay`     | ✅             |
| `DialogContent`     | `ModalGlass.Content`     | ✅             |
| `DialogHeader`      | `ModalGlass.Header`      | ✅             |
| `DialogFooter`      | `ModalGlass.Footer`      | ✅             |
| `DialogTitle`       | `ModalGlass.Title`       | ✅             |
| `DialogDescription` | `ModalGlass.Description` | ✅             |
| `DialogClose`       | `ModalGlass.Close`       | ✅             |

**Usage:**

```tsx
// Both import styles work identically
import { Dialog, DialogContent } from 'shadcn-glass-ui';
import { ModalGlass } from 'shadcn-glass-ui';

// These are the exact same components
<Dialog> === <ModalGlass.Root>
<DialogContent> === <ModalGlass.Content>
```

## Related Components

- [ButtonGlass](./button-glass.md) - Glass-styled buttons for Trigger/Footer
- [AlertGlass](./ALERT_GLASS.md) - Alert dialogs with variants
- [TabsGlass](./TABS_GLASS.md) - Tabbed content with glass styling
- [PopoverGlass](./popover-glass.md) - Non-modal popover component

---

**Version:** v2.0.0+ **Last Updated:** 2025-12-21 **Status:** Stable **Radix UI:**
@radix-ui/react-dialog
