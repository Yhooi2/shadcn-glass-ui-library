# SheetGlass

Glass-themed sheet/drawer component with full shadcn/ui Sheet API compatibility.

## Overview

SheetGlass is a compound component built on `@radix-ui/react-dialog` that provides an accessible
side drawer with glassmorphism styling. It's 100% compatible with shadcn/ui Sheet API and supports 4
slide-in directions.

### Key Features

- **shadcn/ui Compatible** - Drop-in replacement for shadcn/ui Sheet
- **Compound Component API** - Flexible composition with 10 sub-components
- **Radix UI Foundation** - Full WCAG 2.1 AA compliance out of the box
- **4 Slide Directions** - top, right (default), bottom, left
- **Controlled & Uncontrolled** - Programmatic or trigger-based opening
- **Focus Management** - Auto-focus on open, return focus on close
- **Keyboard Support** - Escape to close, Tab for focus trap
- **Glass Effects** - Backdrop blur, glow effects, smooth animations
- **Auto Close Button** - Optional X button in corner (default: true)
- **Type-Safe** - Full TypeScript support with exported types
- **Accessible** - Screen reader support with ARIA attributes

### Browser Compatibility

- Chrome 89+
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

```tsx
import { SheetGlass } from 'shadcn-glass-ui';

// Or use shadcn/ui compatible aliases
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure (Uncontrolled)

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Open Sheet</ButtonGlass>
  </SheetGlass.Trigger>

  <SheetGlass.Content side="right" showCloseButton={true}>
    <SheetGlass.Header>
      <SheetGlass.Title>Sheet Title</SheetGlass.Title>
      <SheetGlass.Description>Sheet description</SheetGlass.Description>
    </SheetGlass.Header>

    <div className="py-4">{/* Content here */}</div>

    <SheetGlass.Footer>
      <SheetGlass.Close asChild>
        <ButtonGlass variant="ghost">Cancel</ButtonGlass>
      </SheetGlass.Close>
      <ButtonGlass>Save</ButtonGlass>
    </SheetGlass.Footer>
  </SheetGlass.Content>
</SheetGlass.Root>
```

### Component Structure (Controlled)

```tsx
const [open, setOpen] = useState(false);

<SheetGlass.Root open={open} onOpenChange={setOpen}>
  <SheetGlass.Content side="left">
    <SheetGlass.Header>
      <SheetGlass.Title>Navigation</SheetGlass.Title>
    </SheetGlass.Header>

    <nav>{/* Menu items */}</nav>

    <SheetGlass.Footer>
      <ButtonGlass onClick={() => setOpen(false)}>Close</ButtonGlass>
    </SheetGlass.Footer>
  </SheetGlass.Content>
</SheetGlass.Root>;
```

### Full Component List

| Component     | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `Root`        | Sheet root with context provider (controlled/uncontrolled) |
| `Trigger`     | Opens the sheet when clicked (use `asChild`)               |
| `Portal`      | Renders children into a portal (auto-included in Content)  |
| `Overlay`     | Backdrop with blur effect (auto-included in Content)       |
| `Content`     | Main sheet container with glass styling and animations     |
| `Header`      | Header section with flex layout                            |
| `Footer`      | Footer section for actions                                 |
| `Title`       | Sheet title (connected to aria-labelledby)                 |
| `Description` | Sheet description (connected to aria-describedby)          |
| `Close`       | Closes the sheet when clicked (use `asChild`)              |

---

## Props API

### SheetGlass.Root

| Prop           | Type                      | Default | Description                                           |
| -------------- | ------------------------- | ------- | ----------------------------------------------------- |
| `open`         | `boolean`                 | -       | Controlled open state                                 |
| `defaultOpen`  | `boolean`                 | `false` | Uncontrolled default open state                       |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes                      |
| `modal`        | `boolean`                 | `true`  | Whether to trap focus and disable outside interaction |

**Extends:** `Radix UI Dialog.Root` props

### SheetGlass.Trigger

| Prop      | Type      | Default | Description                               |
| --------- | --------- | ------- | ----------------------------------------- |
| `asChild` | `boolean` | `false` | Render as child element instead of button |

**Extends:** `Radix UI Dialog.Trigger` props

### SheetGlass.Portal

| Prop         | Type          | Default         | Description                  |
| ------------ | ------------- | --------------- | ---------------------------- |
| `container`  | `HTMLElement` | `document.body` | Portal container element     |
| `forceMount` | `boolean`     | -               | Force mount even when closed |

**Extends:** `Radix UI Dialog.Portal` props

### SheetGlass.Overlay

| Prop         | Type      | Default | Description                  |
| ------------ | --------- | ------- | ---------------------------- |
| `className`  | `string`  | -       | Additional CSS classes       |
| `forceMount` | `boolean` | -       | Force mount even when closed |

**Extends:** `Radix UI Dialog.Overlay` props

**Styling:** Applies `--modal-overlay` background with `--blur-sm` backdrop filter.

### SheetGlass.Content

| Prop                   | Type                                       | Default   | Description                       |
| ---------------------- | ------------------------------------------ | --------- | --------------------------------- |
| `side`                 | `'top' \| 'right' \| 'bottom' \| 'left'`   | `'right'` | Side from which sheet slides in   |
| `showCloseButton`      | `boolean`                                  | `true`    | Show X button in top-right corner |
| `className`            | `string`                                   | -         | Additional CSS classes            |
| `onEscapeKeyDown`      | `(event: KeyboardEvent) => void`           | -         | Escape key handler                |
| `onPointerDownOutside` | `(event: PointerDownOutsideEvent) => void` | -         | Outside click handler             |
| `onInteractOutside`    | `(event: Event) => void`                   | -         | Outside interaction handler       |

**Extends:** `Radix UI Dialog.Content` props

**Note:** Automatically includes Portal and Overlay.

### SheetGlass.Header

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

### SheetGlass.Footer

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

**Layout:** Flex column (mobile) → Flex row right-aligned (desktop)

### SheetGlass.Title

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `Radix UI Dialog.Title` props

**Note:** Automatically sets `aria-labelledby` on Content.

### SheetGlass.Description

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `Radix UI Dialog.Description` props

**Note:** Automatically sets `aria-describedby` on Content.

### SheetGlass.Close

| Prop      | Type      | Default | Description                               |
| --------- | --------- | ------- | ----------------------------------------- |
| `asChild` | `boolean` | `false` | Render as child element instead of button |

**Extends:** `Radix UI Dialog.Close` props

---

## Usage Examples

### Basic Sheet (Right)

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content side="right">
    <SheetGlass.Header>
      <SheetGlass.Title>Settings</SheetGlass.Title>
      <SheetGlass.Description>Configure your preferences</SheetGlass.Description>
    </SheetGlass.Header>
    <div className="py-4">
      <p>Settings content here</p>
    </div>
  </SheetGlass.Content>
</SheetGlass.Root>
```

### Left Navigation Sheet

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass variant="ghost" size="icon">
      <MenuIcon />
    </ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content side="left">
    <SheetGlass.Header>
      <SheetGlass.Title>Navigation</SheetGlass.Title>
    </SheetGlass.Header>
    <nav className="flex flex-col gap-2 py-4">
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </SheetGlass.Content>
</SheetGlass.Root>
```

### Top Sheet

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Show Notifications</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content side="top">
    <SheetGlass.Header>
      <SheetGlass.Title>Notifications</SheetGlass.Title>
    </SheetGlass.Header>
    <div className="py-4">
      <NotificationList />
    </div>
  </SheetGlass.Content>
</SheetGlass.Root>
```

### Bottom Sheet

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Share</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content side="bottom">
    <SheetGlass.Header>
      <SheetGlass.Title>Share</SheetGlass.Title>
      <SheetGlass.Description>Share this content with others</SheetGlass.Description>
    </SheetGlass.Header>
    <div className="grid grid-cols-4 gap-4 py-4">
      <ShareButton icon="twitter" />
      <ShareButton icon="facebook" />
      <ShareButton icon="linkedin" />
      <ShareButton icon="email" />
    </div>
  </SheetGlass.Content>
</SheetGlass.Root>
```

### Controlled Sheet

```tsx
function ControlledSheetExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonGlass onClick={() => setOpen(true)}>Open Sheet</ButtonGlass>

      <SheetGlass.Root open={open} onOpenChange={setOpen}>
        <SheetGlass.Content>
          <SheetGlass.Header>
            <SheetGlass.Title>Controlled Sheet</SheetGlass.Title>
          </SheetGlass.Header>
          <div className="py-4">
            <p>This sheet is controlled programmatically</p>
          </div>
          <SheetGlass.Footer>
            <ButtonGlass onClick={() => setOpen(false)}>Close</ButtonGlass>
          </SheetGlass.Footer>
        </SheetGlass.Content>
      </SheetGlass.Root>
    </>
  );
}
```

### Sheet with Form

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Add Item</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content>
    <SheetGlass.Header>
      <SheetGlass.Title>Add New Item</SheetGlass.Title>
      <SheetGlass.Description>Fill out the form below to add a new item</SheetGlass.Description>
    </SheetGlass.Header>
    <div className="py-4 space-y-4">
      <InputGlass label="Name" placeholder="Item name" />
      <InputGlass label="Description" placeholder="Item description" />
    </div>
    <SheetGlass.Footer>
      <SheetGlass.Close asChild>
        <ButtonGlass variant="ghost">Cancel</ButtonGlass>
      </SheetGlass.Close>
      <ButtonGlass>Save</ButtonGlass>
    </SheetGlass.Footer>
  </SheetGlass.Content>
</SheetGlass.Root>
```

### Without Close Button

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content showCloseButton={false}>
    <SheetGlass.Header>
      <SheetGlass.Title>No Close Button</SheetGlass.Title>
    </SheetGlass.Header>
    <p className="py-4">Must use Cancel button or Escape key</p>
    <SheetGlass.Footer>
      <SheetGlass.Close asChild>
        <ButtonGlass>Cancel</ButtonGlass>
      </SheetGlass.Close>
    </SheetGlass.Footer>
  </SheetGlass.Content>
</SheetGlass.Root>
```

### Prevent Outside Click Close

```tsx
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Open Form</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content
    onInteractOutside={(e) => {
      e.preventDefault(); // Prevent closing on outside click
    }}
  >
    <SheetGlass.Header>
      <SheetGlass.Title>Unsaved Changes</SheetGlass.Title>
      <SheetGlass.Description>
        This form has unsaved changes. Click Cancel to close.
      </SheetGlass.Description>
    </SheetGlass.Header>
    <div className="py-4">
      <InputGlass label="Name" />
    </div>
    <SheetGlass.Footer>
      <SheetGlass.Close asChild>
        <ButtonGlass variant="destructive">Discard</ButtonGlass>
      </SheetGlass.Close>
      <ButtonGlass>Save</ButtonGlass>
    </SheetGlass.Footer>
  </SheetGlass.Content>
</SheetGlass.Root>
```

---

## CSS Variables

SheetGlass uses CSS variables for theme-aware styling:

### Background & Border

```css
--modal-bg: /* Sheet background with alpha */ --modal-border: /* Sheet border color */;
```

### Overlay

```css
--modal-overlay: /* Backdrop background with alpha */;
```

### Glow Effect

```css
--modal-glow: /* Box shadow for sheet */ --modal-glow-effect: /* Gradient overlay for glow */;
```

### Blur

```css
--blur-sm: 8px; /* Overlay blur */
--blur-lg: 24px; /* Content blur */
```

### Close Button

```css
--modal-close-btn-bg: /* Close button background */ --modal-close-btn-border:
  /* Close button border */;
```

---

## Accessibility

### ARIA Attributes

SheetGlass automatically sets proper ARIA attributes via Radix UI:

- `role="dialog"` on Content
- `aria-modal="true"` on Content
- `aria-labelledby` pointing to Title
- `aria-describedby` pointing to Description
- `aria-hidden="true"` on glow effect layer

### Keyboard Navigation

| Key           | Action                                                 |
| ------------- | ------------------------------------------------------ |
| `Escape`      | Closes the sheet                                       |
| `Tab`         | Moves focus to next focusable element (trapped inside) |
| `Shift + Tab` | Moves focus to previous focusable element              |

### Focus Management

- **On Open:** Focus moves to first focusable element or Content
- **Focus Trap:** Tab/Shift+Tab cycles through focusable elements inside sheet
- **On Close:** Focus returns to Trigger element

### Screen Reader Support

- Title announces sheet purpose
- Description provides additional context
- Close button has `sr-only` text: "Close"
- All interactive elements are keyboard accessible

---

## shadcn/ui Compatibility

SheetGlass provides 100% API compatibility with shadcn/ui Sheet:

### Component Aliases

| SheetGlass               | shadcn/ui Sheet    | Compatibility           |
| ------------------------ | ------------------ | ----------------------- |
| `SheetGlass.Root`        | `Sheet`            | ✅ 100%                 |
| `SheetGlass.Trigger`     | `SheetTrigger`     | ✅ 100%                 |
| `SheetGlass.Content`     | `SheetContent`     | ✅ 100% + glass effects |
| `SheetGlass.Header`      | `SheetHeader`      | ✅ 100%                 |
| `SheetGlass.Footer`      | `SheetFooter`      | ✅ 100%                 |
| `SheetGlass.Title`       | `SheetTitle`       | ✅ 100%                 |
| `SheetGlass.Description` | `SheetDescription` | ✅ 100%                 |
| `SheetGlass.Close`       | `SheetClose`       | ✅ 100%                 |
| `SheetGlass.Portal`      | `SheetPortal`      | ✅ 100%                 |
| `SheetGlass.Overlay`     | `SheetOverlay`     | ✅ 100%                 |

### Usage Comparison

```tsx
// shadcn/ui style
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from 'shadcn-glass-ui';

<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>;

// Glass UI style (same result)
import { SheetGlass } from 'shadcn-glass-ui';

<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content side="right">
    <SheetGlass.Header>
      <SheetGlass.Title>Title</SheetGlass.Title>
    </SheetGlass.Header>
  </SheetGlass.Content>
</SheetGlass.Root>;
```

### Migration from shadcn/ui

SheetGlass is a drop-in replacement with automatic glass effects:

```tsx
// Before (shadcn/ui)
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <Button>Menu</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <nav>...</nav>
  </SheetContent>
</Sheet>;

// After (Glass UI)
import { Sheet, SheetContent, SheetTrigger } from 'shadcn-glass-ui';

<Sheet>
  <SheetTrigger asChild>
    <ButtonGlass>Menu</ButtonGlass>
  </SheetTrigger>
  <SheetContent side="left">
    <nav>...</nav>
  </SheetContent>
</Sheet>;
```

**No code changes required** - Glass effects applied automatically.

---

## Animation Details

### Side-Specific Animations

SheetGlass uses `sheetVariants` from CVA for direction-specific slide animations:

- **Right:** Slides in from right (`slide-in-from-right-full`)
- **Left:** Slides in from left (`slide-in-from-left-full`)
- **Top:** Slides in from top (`slide-in-from-top-full`)
- **Bottom:** Slides in from bottom (`slide-in-from-bottom-full`)

### Overlay Animations

- **Open:** Fade in (0 → 1)
- **Close:** Fade out (1 → 0)

---

## Related Components

- [ModalGlass](./MODAL_GLASS.md) - Glass-themed modal/dialog
- [SidebarGlass](./SIDEBAR_GLASS.md) - Collapsible sidebar navigation
- [DropdownMenuGlass](./DROPDOWN_MENU_GLASS.md) - Glass-themed dropdown menu
- [PopoverGlass](./POPOVER_GLASS.md) - Glass-themed popover

---

## Version History

- **v2.4.0** - Initial implementation with shadcn/ui Sheet API compatibility
- **v2.6.0** - Added shadcn/ui compatible aliases

---

**Last Updated:** 2025-12-21 **Component Status:** Stable **shadcn/ui Compatibility:** 100%
