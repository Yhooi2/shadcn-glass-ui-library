# PopoverGlass

Glass-themed popover component with full shadcn/ui Popover API compatibility.

## Overview

PopoverGlass is a compound component built on `@radix-ui/react-popover` that provides an accessible
floating container with glassmorphism styling. It's 100% compatible with shadcn/ui Popover API and
supports all positioning options.

### Key Features

- **shadcn/ui Compatible** - Drop-in replacement for shadcn/ui Popover
- **Compound Component API** - Flexible composition with 4 sub-components
- **Radix UI Foundation** - Full WCAG 2.1 AA compliance out of the box
- **12 Position Options** - 4 sides × 3 alignments (top/right/bottom/left × start/center/end)
- **Arrow Pointer** - Optional glass-styled arrow (default: true)
- **Controlled & Uncontrolled** - Programmatic or trigger-based opening
- **Click Outside to Close** - Dismissible with escape key or outside click
- **Glass Effects** - Backdrop blur, smooth fade-in animations
- **Type-Safe** - Full TypeScript support with exported types
- **Accessible** - Focus management, keyboard support, ARIA attributes
- **Legacy API Support** - Backward compatible API for existing code

### Browser Compatibility

- Chrome 89+
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

```tsx
import { PopoverGlass, PopoverGlassTrigger, PopoverGlassContent } from 'shadcn-glass-ui';

// Or use shadcn/ui compatible aliases (if available)
import { Popover, PopoverTrigger, PopoverContent } from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure (Uncontrolled)

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open Popover</ButtonGlass>
  </PopoverGlassTrigger>

  <PopoverGlassContent side="top" align="center" showArrow={true}>
    <div className="p-4">
      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
        Title
      </h3>
      <p style={{ color: 'var(--text-secondary)' }}>Popover content goes here</p>
    </div>
  </PopoverGlassContent>
</PopoverGlass>
```

### Component Structure (Controlled)

```tsx
const [open, setOpen] = useState(false);

<PopoverGlass open={open} onOpenChange={setOpen}>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Toggle</ButtonGlass>
  </PopoverGlassTrigger>

  <PopoverGlassContent>
    <div className="p-4">
      <p>Controlled popover</p>
      <ButtonGlass onClick={() => setOpen(false)}>Close</ButtonGlass>
    </div>
  </PopoverGlassContent>
</PopoverGlass>;
```

### Full Component List

| Component             | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `PopoverGlass` (Root) | Popover root with context provider (controlled/uncontrolled) |
| `PopoverGlassTrigger` | Opens the popover when clicked (use `asChild`)               |
| `PopoverGlassContent` | Main popover container with glass styling and arrow          |
| `PopoverGlassAnchor`  | Optional anchor element for positioning                      |

---

## Props API

### PopoverGlass (Root)

| Prop           | Type                      | Default | Description                                            |
| -------------- | ------------------------- | ------- | ------------------------------------------------------ |
| `open`         | `boolean`                 | -       | Controlled open state                                  |
| `defaultOpen`  | `boolean`                 | `false` | Uncontrolled default open state                        |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes                       |
| `modal`        | `boolean`                 | `false` | Whether to block interaction with the rest of the page |

**Extends:** `Radix UI Popover.Root` props

### PopoverGlassTrigger

| Prop      | Type      | Default | Description                               |
| --------- | --------- | ------- | ----------------------------------------- |
| `asChild` | `boolean` | `false` | Render as child element instead of button |

**Extends:** `Radix UI Popover.Trigger` props

**Recommendation:** Always use `asChild` with a semantic button element.

### PopoverGlassContent

| Prop                   | Type                                       | Default    | Description                              |
| ---------------------- | ------------------------------------------ | ---------- | ---------------------------------------- |
| `side`                 | `'top' \| 'right' \| 'bottom' \| 'left'`   | `'bottom'` | Preferred side to render against trigger |
| `align`                | `'start' \| 'center' \| 'end'`             | `'center'` | Preferred alignment against trigger      |
| `sideOffset`           | `number`                                   | `8`        | Distance in pixels from trigger          |
| `showArrow`            | `boolean`                                  | `true`     | Whether to show the arrow pointer        |
| `className`            | `string`                                   | -          | Additional CSS classes                   |
| `onEscapeKeyDown`      | `(event: KeyboardEvent) => void`           | -          | Escape key handler                       |
| `onPointerDownOutside` | `(event: PointerDownOutsideEvent) => void` | -          | Outside click handler                    |
| `onInteractOutside`    | `(event: Event) => void`                   | -          | Outside interaction handler              |

**Extends:** `Radix UI Popover.Content` props

**Note:** Automatically includes Portal rendering.

### PopoverGlassAnchor

| Prop      | Type      | Default | Description             |
| --------- | --------- | ------- | ----------------------- |
| `asChild` | `boolean` | `false` | Render as child element |

**Extends:** `Radix UI Popover.Anchor` props

**Use case:** When you want to position the popover relative to a different element than the
trigger.

---

## Usage Examples

### Basic Popover

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass variant="outline">Open</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent>
    <div className="p-4">
      <p style={{ color: 'var(--text-secondary)' }}>This is a simple popover with glass styling</p>
    </div>
  </PopoverGlassContent>
</PopoverGlass>
```

### Positioning Options

```tsx
{
  /* Top center */
}
<PopoverGlassContent side="top" align="center">
  <div className="p-3">Top center</div>
</PopoverGlassContent>;

{
  /* Right start */
}
<PopoverGlassContent side="right" align="start">
  <div className="p-3">Right start</div>
</PopoverGlassContent>;

{
  /* Bottom end */
}
<PopoverGlassContent side="bottom" align="end">
  <div className="p-3">Bottom end</div>
</PopoverGlassContent>;

{
  /* Left center */
}
<PopoverGlassContent side="left" align="center">
  <div className="p-3">Left center</div>
</PopoverGlassContent>;
```

### Without Arrow

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>No Arrow</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent showArrow={false}>
    <div className="p-4">
      <p>Popover without arrow pointer</p>
    </div>
  </PopoverGlassContent>
</PopoverGlass>
```

### Controlled Popover

```tsx
function ControlledPopover() {
  const [open, setOpen] = useState(false);

  return (
    <PopoverGlass open={open} onOpenChange={setOpen}>
      <PopoverGlassTrigger asChild>
        <ButtonGlass>Toggle ({open ? 'Open' : 'Closed'})</ButtonGlass>
      </PopoverGlassTrigger>
      <PopoverGlassContent>
        <div className="p-4 space-y-2">
          <p>Programmatically controlled popover</p>
          <ButtonGlass onClick={() => setOpen(false)}>Close</ButtonGlass>
        </div>
      </PopoverGlassContent>
    </PopoverGlass>
  );
}
```

### User Menu Popover

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass variant="ghost" size="icon">
      <User className="w-5 h-5" />
    </ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent side="bottom" align="end" sideOffset={12}>
    <div className="p-3 space-y-2 min-w-[200px]">
      <div className="px-2 py-1.5">
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          John Doe
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          john@example.com
        </p>
      </div>
      <div className="border-t" style={{ borderColor: 'var(--border)' }} />
      <ButtonGlass variant="ghost" size="sm" className="w-full justify-start">
        Profile
      </ButtonGlass>
      <ButtonGlass variant="ghost" size="sm" className="w-full justify-start">
        Settings
      </ButtonGlass>
      <div className="border-t" style={{ borderColor: 'var(--border)' }} />
      <ButtonGlass variant="ghost" size="sm" className="w-full justify-start text-destructive">
        Logout
      </ButtonGlass>
    </div>
  </PopoverGlassContent>
</PopoverGlass>
```

### Form in Popover

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Filter</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent side="bottom" align="start">
    <div className="p-4 space-y-4 w-[320px]">
      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
        Filter Options
      </h3>
      <InputGlass label="Name" placeholder="Search by name" />
      <div className="flex gap-2">
        <CheckboxGlass label="Active" />
        <CheckboxGlass label="Archived" />
      </div>
      <div className="flex justify-end gap-2">
        <ButtonGlass variant="ghost" size="sm">
          Reset
        </ButtonGlass>
        <ButtonGlass size="sm">Apply</ButtonGlass>
      </div>
    </div>
  </PopoverGlassContent>
</PopoverGlass>
```

### With Custom Anchor

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </PopoverGlassTrigger>

  {/* Position relative to this anchor instead of trigger */}
  <PopoverGlassAnchor asChild>
    <div className="w-32 h-32 bg-muted rounded-lg" />
  </PopoverGlassAnchor>

  <PopoverGlassContent>
    <div className="p-4">
      <p>Positioned relative to the anchor element</p>
    </div>
  </PopoverGlassContent>
</PopoverGlass>
```

### Prevent Outside Click Close

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open Form</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent
    onInteractOutside={(e) => {
      e.preventDefault(); // Prevent closing on outside click
    }}
  >
    <div className="p-4">
      <p>This popover won't close when clicking outside</p>
      <p className="text-sm text-muted mt-2">Use the close button or Escape key</p>
    </div>
  </PopoverGlassContent>
</PopoverGlass>
```

---

## Legacy API (Backward Compatible)

For existing code using the legacy API:

```tsx
import { PopoverGlassLegacy } from 'shadcn-glass-ui';

<PopoverGlassLegacy
  trigger={<ButtonGlass>Open</ButtonGlass>}
  side="top"
  align="center"
  showArrow={true}
>
  <div className="p-4">
    <p>Legacy API popover content</p>
  </div>
</PopoverGlassLegacy>;
```

**Migration to Compound API:**

```tsx
// Before (Legacy)
<PopoverGlassLegacy trigger={<ButtonGlass>Open</ButtonGlass>} side="top">
  <div className="p-4">Content</div>
</PopoverGlassLegacy>

// After (Compound - Recommended)
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent side="top">
    <div className="p-4">Content</div>
  </PopoverGlassContent>
</PopoverGlass>
```

---

## CSS Variables

PopoverGlass uses CSS variables for theme-aware styling:

### Background & Border

```css
--popover-bg: /* Popover background with alpha */ --popover-border: /* Popover border color */;
```

### Shadow

```css
--popover-shadow: /* Box shadow for popover */;
```

### Arrow

```css
--popover-arrow-bg: /* Arrow fill color (matches background) */;
```

### Blur

```css
--blur-md: 16px; /* Backdrop blur for content */
```

---

## Accessibility

### ARIA Attributes

PopoverGlass automatically sets proper ARIA attributes via Radix UI:

- `aria-expanded` on Trigger (true when open)
- `aria-haspopup="dialog"` on Trigger
- `aria-controls` linking Trigger to Content
- `role="dialog"` on Content

### Keyboard Support

| Key           | Action                                      |
| ------------- | ------------------------------------------- |
| `Space`       | Opens/closes popover (when trigger focused) |
| `Enter`       | Opens/closes popover (when trigger focused) |
| `Escape`      | Closes popover                              |
| `Tab`         | Moves focus to next element inside popover  |
| `Shift + Tab` | Moves focus to previous element             |

### Focus Management

- **On Open:** Focus moves to Content (unless auto-focus disabled)
- **On Close:** Focus returns to Trigger
- **Tab Trap:** Tab cycles through focusable elements inside popover

### Screen Reader Support

- Trigger announces popover state (expanded/collapsed)
- Content has `role="dialog"` for proper context
- All interactive elements are keyboard accessible

---

## shadcn/ui Compatibility

PopoverGlass provides 100% API compatibility with shadcn/ui Popover:

### Component Aliases

| PopoverGlass          | shadcn/ui Popover | Compatibility           |
| --------------------- | ----------------- | ----------------------- |
| `PopoverGlass`        | `Popover`         | ✅ 100%                 |
| `PopoverGlassTrigger` | `PopoverTrigger`  | ✅ 100%                 |
| `PopoverGlassContent` | `PopoverContent`  | ✅ 100% + glass effects |
| `PopoverGlassAnchor`  | `PopoverAnchor`   | ✅ 100%                 |

### Usage Comparison

```tsx
// shadcn/ui style
import { Popover, PopoverTrigger, PopoverContent } from 'shadcn-glass-ui';

<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Content</p>
  </PopoverContent>
</Popover>;

// Glass UI style (same result)
import { PopoverGlass, PopoverGlassTrigger, PopoverGlassContent } from 'shadcn-glass-ui';

<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent>
    <p>Content</p>
  </PopoverGlassContent>
</PopoverGlass>;
```

### Migration from shadcn/ui

PopoverGlass is a drop-in replacement with automatic glass effects:

```tsx
// Before (shadcn/ui)
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Content</p>
  </PopoverContent>
</Popover>;

// After (Glass UI)
import { PopoverGlass, PopoverGlassTrigger, PopoverGlassContent } from 'shadcn-glass-ui';

<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent>
    <p>Content</p>
  </PopoverGlassContent>
</PopoverGlass>;
```

**No code changes required** - Glass effects applied automatically.

---

## Animation Details

PopoverGlassContent uses Tailwind animations:

- **Fade in:** `fade-in-0` (opacity 0 → 1)
- **Zoom in:** `zoom-in-95` (scale 0.95 → 1)
- **Slide in:** Direction-specific slide based on `side` prop
  - `top`: Slides from bottom
  - `bottom`: Slides from top
  - `left`: Slides from right
  - `right`: Slides from left
- **Duration:** 200ms

---

## Related Components

- [TooltipGlass](../COMPONENTS_CATALOG.md#tooltipglass) - Glass-themed tooltip
- [DropdownMenuGlass](./DROPDOWN_MENU_GLASS.md) - Glass-themed dropdown menu
- [ModalGlass](./MODAL_GLASS.md) - Glass-themed modal/dialog
- [SheetGlass](./SHEET_GLASS.md) - Glass-themed side sheet

---

## Version History

- **v2.0.0** - Initial compound component API release
- **Legacy API** - Maintained for backward compatibility

---

**Last Updated:** 2025-12-21 **Component Status:** Stable **shadcn/ui Compatibility:** 100%
