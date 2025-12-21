# DropdownMenuGlass

Glass-themed dropdown menu component with compound API. 100% API compatible with shadcn/ui
DropdownMenu.

## Overview

`DropdownMenuGlass` provides a modern dropdown menu with glassmorphism effects, keyboard navigation,
and rich features like checkboxes, radio groups, and nested sub-menus. It follows the shadcn/ui
DropdownMenu API exactly, making migration seamless.

### Key Features

- **100% shadcn/ui Compatible** - Drop-in replacement for shadcn/ui DropdownMenu
- **Compound Component API** - Root, Trigger, Content, Item, and 10+ sub-components
- **Radix UI Primitives** - Built on @radix-ui/react-dropdown-menu for reliability
- **Glassmorphism** - Backdrop blur, glow effects, CSS variables
- **Rich Features** - Checkboxes, radio groups, labels, separators, sub-menus, shortcuts
- **Keyboard Accessible** - Full keyboard navigation (Tab, Arrow keys, Enter, Escape)
- **Theme Support** - Works with all 3 themes (glass, light, aurora)
- **Variant Support** - Destructive variant for dangerous actions

### Browser Compatibility

- Chrome 89+
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

```tsx
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
} from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure

```tsx
<DropdownMenuGlass>
  {' '}
  // Root context provider (required)
  <DropdownMenuGlassTrigger asChild>
    {' '}
    // Opens menu when clicked
    <Button>Menu</Button>
  </DropdownMenuGlassTrigger>
  <DropdownMenuGlassContent>
    {' '}
    // Menu container
    <DropdownMenuGlassLabel />
    // Section label
    <DropdownMenuGlassGroup>
      {' '}
      // Group related items
      <DropdownMenuGlassItem /> // Individual menu item
      <DropdownMenuGlassCheckboxItem /> // Checkbox item
    </DropdownMenuGlassGroup>
    <DropdownMenuGlassSeparator /> // Visual divider
    <DropdownMenuGlassRadioGroup>
      {' '}
      // Radio button group
      <DropdownMenuGlassRadioItem /> // Radio button item
    </DropdownMenuGlassRadioGroup>
    <DropdownMenuGlassSub>
      {' '}
      // Sub-menu context
      <DropdownMenuGlassSubTrigger /> // Opens sub-menu
      <DropdownMenuGlassSubContent>
        {' '}
        // Sub-menu content
        <DropdownMenuGlassItem /> // Sub-menu item
      </DropdownMenuGlassSubContent>
    </DropdownMenuGlassSub>
  </DropdownMenuGlassContent>
</DropdownMenuGlass>
```

### Full Component List

| Component                       | Description                            |
| ------------------------------- | -------------------------------------- |
| `DropdownMenuGlass`             | Root context provider                  |
| `DropdownMenuGlassTrigger`      | Opens menu when clicked (asChild)      |
| `DropdownMenuGlassContent`      | Main menu container with glass styling |
| `DropdownMenuGlassItem`         | Individual menu item (variant support) |
| `DropdownMenuGlassCheckboxItem` | Checkbox menu item                     |
| `DropdownMenuGlassRadioItem`    | Radio button menu item                 |
| `DropdownMenuGlassRadioGroup`   | Container for radio items              |
| `DropdownMenuGlassLabel`        | Label for menu sections                |
| `DropdownMenuGlassSeparator`    | Visual divider                         |
| `DropdownMenuGlassGroup`        | Groups related items                   |
| `DropdownMenuGlassSub`          | Sub-menu context                       |
| `DropdownMenuGlassSubTrigger`   | Opens sub-menu                         |
| `DropdownMenuGlassSubContent`   | Sub-menu content                       |
| `DropdownMenuGlassShortcut`     | Keyboard shortcut display              |
| `DropdownMenuGlassPortal`       | Portal for menu content (optional)     |

---

## Props API

### DropdownMenuGlass (Root)

| Prop           | Type                      | Default | Description                       |
| -------------- | ------------------------- | ------- | --------------------------------- |
| `open`         | `boolean`                 | -       | Controlled open state             |
| `onOpenChange` | `(open: boolean) => void` | -       | Open state change handler         |
| `defaultOpen`  | `boolean`                 | `false` | Initial open state (uncontrolled) |
| `modal`        | `boolean`                 | `true`  | Modal behavior (trap focus)       |
| `dir`          | `'ltr' \| 'rtl'`          | `'ltr'` | Text direction                    |

### DropdownMenuGlassTrigger

| Prop        | Type      | Default | Description                       |
| ----------- | --------- | ------- | --------------------------------- |
| `asChild`   | `boolean` | `false` | Use Radix Slot for custom element |
| `className` | `string`  | -       | Custom className                  |

### DropdownMenuGlassContent

| Prop               | Type                                     | Default    | Description                   |
| ------------------ | ---------------------------------------- | ---------- | ----------------------------- |
| `align`            | `'start' \| 'center' \| 'end'`           | `'center'` | Alignment relative to trigger |
| `side`             | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred side                |
| `sideOffset`       | `number`                                 | `4`        | Offset from trigger           |
| `alignOffset`      | `number`                                 | `0`        | Offset from align edge        |
| `collisionPadding` | `number`                                 | `8`        | Padding from viewport edge    |
| `className`        | `string`                                 | -          | Custom className              |

### DropdownMenuGlassItem

| Prop        | Type                         | Default     | Description                    |
| ----------- | ---------------------------- | ----------- | ------------------------------ |
| `variant`   | `'default' \| 'destructive'` | `'default'` | Visual variant                 |
| `disabled`  | `boolean`                    | `false`     | Disable interaction            |
| `onSelect`  | `(event: Event) => void`     | -           | Callback when item is selected |
| `inset`     | `boolean`                    | `false`     | Add left padding (for icons)   |
| `className` | `string`                     | -           | Custom className               |

### DropdownMenuGlassCheckboxItem

| Prop              | Type                         | Default | Description                   |
| ----------------- | ---------------------------- | ------- | ----------------------------- |
| `checked`         | `boolean \| 'indeterminate'` | `false` | Checked state                 |
| `onCheckedChange` | `(checked: boolean) => void` | -       | Callback when checked changes |
| `disabled`        | `boolean`                    | `false` | Disable interaction           |
| `className`       | `string`                     | -       | Custom className              |

### DropdownMenuGlassRadioItem

| Prop        | Type      | Default | Description               |
| ----------- | --------- | ------- | ------------------------- |
| `value`     | `string`  | -       | Value for this radio item |
| `disabled`  | `boolean` | `false` | Disable interaction       |
| `className` | `string`  | -       | Custom className          |

### DropdownMenuGlassRadioGroup

| Prop            | Type                      | Default | Description                 |
| --------------- | ------------------------- | ------- | --------------------------- |
| `value`         | `string`                  | -       | Currently selected value    |
| `onValueChange` | `(value: string) => void` | -       | Callback when value changes |

### DropdownMenuGlassLabel

| Prop        | Type      | Default | Description                      |
| ----------- | --------- | ------- | -------------------------------- |
| `inset`     | `boolean` | `false` | Add left padding (for alignment) |
| `className` | `string`  | -       | Custom className                 |

### DropdownMenuGlassSub

| Prop           | Type                      | Default | Description               |
| -------------- | ------------------------- | ------- | ------------------------- |
| `open`         | `boolean`                 | -       | Controlled open state     |
| `onOpenChange` | `(open: boolean) => void` | -       | Open state change handler |
| `defaultOpen`  | `boolean`                 | `false` | Initial open state        |

### DropdownMenuGlassSubTrigger

| Prop        | Type      | Default | Description         |
| ----------- | --------- | ------- | ------------------- |
| `inset`     | `boolean` | `false` | Add left padding    |
| `disabled`  | `boolean` | `false` | Disable interaction |
| `className` | `string`  | -       | Custom className    |

### DropdownMenuGlassShortcut

| Prop        | Type     | Default | Description      |
| ----------- | -------- | ------- | ---------------- |
| `className` | `string` | -       | Custom className |

---

## Usage Examples

### Basic Menu

```tsx
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassSeparator,
} from 'shadcn-glass-ui';
import { ButtonGlass } from 'shadcn-glass-ui';

export function BasicMenu() {
  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass>Open Menu</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent>
        <DropdownMenuGlassItem>Profile</DropdownMenuGlassItem>
        <DropdownMenuGlassItem>Settings</DropdownMenuGlassItem>
        <DropdownMenuGlassItem>Billing</DropdownMenuGlassItem>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">Log out</DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

---

### With Icons and Shortcuts

```tsx
import { User, Settings, LogOut } from 'lucide-react';

export function MenuWithIcons() {
  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass variant="outline">Account</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuGlassShortcut>⇧⌘P</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuGlassShortcut>⌘,</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuGlassShortcut>⇧⌘Q</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

---

### With Labels and Groups

```tsx
import { User, Settings, Plus, MessageSquare } from 'lucide-react';

export function MenuWithLabels() {
  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass>Options</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassLabel>My Account</DropdownMenuGlassLabel>
        <DropdownMenuGlassGroup>
          <DropdownMenuGlassItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuGlassItem>
        </DropdownMenuGlassGroup>

        <DropdownMenuGlassSeparator />

        <DropdownMenuGlassLabel>Actions</DropdownMenuGlassLabel>
        <DropdownMenuGlassGroup>
          <DropdownMenuGlassItem>
            <Plus className="mr-2 h-4 w-4" />
            New Item
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Message
          </DropdownMenuGlassItem>
        </DropdownMenuGlassGroup>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

---

### With Checkboxes

```tsx
import { useState } from 'react';

export function MenuWithCheckboxes() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass variant="outline">View</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassLabel>Appearance</DropdownMenuGlassLabel>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          Status Bar
        </DropdownMenuGlassCheckboxItem>
        <DropdownMenuGlassCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
        </DropdownMenuGlassCheckboxItem>
        <DropdownMenuGlassCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Panel
        </DropdownMenuGlassCheckboxItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

---

### With Radio Group

```tsx
import { useState } from 'react';

export function MenuWithRadioGroup() {
  const [position, setPosition] = useState('bottom');

  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass variant="outline">Panel Position</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassLabel>Panel Position</DropdownMenuGlassLabel>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuGlassRadioItem value="top">Top</DropdownMenuGlassRadioItem>
          <DropdownMenuGlassRadioItem value="bottom">Bottom</DropdownMenuGlassRadioItem>
          <DropdownMenuGlassRadioItem value="right">Right</DropdownMenuGlassRadioItem>
        </DropdownMenuGlassRadioGroup>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

---

### With Nested Sub-Menus

```tsx
import { FileText, Plus, Settings, User, Clock, Star } from 'lucide-react';

export function MenuWithSubMenus() {
  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass>File</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassItem>
          <FileText className="mr-2 h-4 w-4" />
          New File
        </DropdownMenuGlassItem>

        <DropdownMenuGlassSub>
          <DropdownMenuGlassSubTrigger>
            <Plus className="mr-2 h-4 w-4" />
            More Tools
          </DropdownMenuGlassSubTrigger>
          <DropdownMenuGlassSubContent>
            <DropdownMenuGlassItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuGlassItem>
            <DropdownMenuGlassItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuGlassItem>

            <DropdownMenuGlassSeparator />

            <DropdownMenuGlassSub>
              <DropdownMenuGlassSubTrigger>
                <Star className="mr-2 h-4 w-4" />
                Recent
              </DropdownMenuGlassSubTrigger>
              <DropdownMenuGlassSubContent>
                <DropdownMenuGlassItem>
                  <Clock className="mr-2 h-4 w-4" />
                  Last Hour
                </DropdownMenuGlassItem>
                <DropdownMenuGlassItem>
                  <Star className="mr-2 h-4 w-4" />
                  Favorites
                </DropdownMenuGlassItem>
              </DropdownMenuGlassSubContent>
            </DropdownMenuGlassSub>
          </DropdownMenuGlassSubContent>
        </DropdownMenuGlassSub>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

---

### User Account Menu (Real-World Example)

```tsx
import { User, Settings, LogOut } from 'lucide-react';

export function UserAccountMenu() {
  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass variant="ghost" className="relative h-10 w-10 rounded-full">
          <User className="h-5 w-5" />
        </ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56" align="end" forceMount>
        <DropdownMenuGlassLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-[var(--text-muted)]">john@example.com</p>
          </div>
        </DropdownMenuGlassLabel>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassGroup>
          <DropdownMenuGlassItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuGlassShortcut>⇧⌘P</DropdownMenuGlassShortcut>
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuGlassShortcut>⌘,</DropdownMenuGlassShortcut>
          </DropdownMenuGlassItem>
        </DropdownMenuGlassGroup>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuGlassShortcut>⇧⌘Q</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

---

### Controlled State

```tsx
import { useState } from 'react';

export function ControlledMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p>Menu is: {open ? 'open' : 'closed'}</p>

      <DropdownMenuGlass open={open} onOpenChange={setOpen}>
        <DropdownMenuGlassTrigger asChild>
          <ButtonGlass>Controlled Menu</ButtonGlass>
        </DropdownMenuGlassTrigger>
        <DropdownMenuGlassContent>
          <DropdownMenuGlassItem onSelect={() => console.log('Item 1')}>
            Item 1
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem onSelect={() => console.log('Item 2')}>
            Item 2
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem onSelect={() => setOpen(false)}>Close Menu</DropdownMenuGlassItem>
        </DropdownMenuGlassContent>
      </DropdownMenuGlass>

      <ButtonGlass variant="outline" onClick={() => setOpen(!open)}>
        Toggle from outside
      </ButtonGlass>
    </div>
  );
}
```

---

## CSS Variables

DropdownMenuGlass uses shared dropdown CSS variables for theming:

```css
:root {
  --dropdown-bg: oklch(var(--glass-bg));
  --dropdown-border: oklch(var(--border));
  --dropdown-glow: 0 0 20px oklch(var(--glow-color));
  --dropdown-backdrop-blur: 16px;

  --dropdown-item-hover: oklch(var(--accent) / 0.1);
  --dropdown-item-destructive: oklch(var(--destructive));
  --dropdown-item-destructive-hover: oklch(var(--destructive) / 0.9);
}
```

---

## Accessibility

### Semantic HTML

- Uses `role="menu"` for menu container
- Uses `role="menuitem"` for menu items
- Uses `role="separator"` for separators

### Keyboard Navigation

- **Tab**: Move focus to trigger
- **Enter/Space**: Open menu (on trigger)
- **Arrow Keys**: Navigate menu items
- **Enter**: Select focused item
- **Escape**: Close menu
- **Type ahead**: Jump to items starting with typed character

### ARIA

- Menu has `aria-haspopup="menu"` on trigger
- Menu has `aria-expanded` based on open state
- Menu items have `aria-disabled` when disabled
- Checkbox items have `aria-checked` attribute
- Radio items have `role="menuitemradio"` and `aria-checked`

### Focus Management

- Focus trapped in open menu
- Focus returns to trigger on close
- First item focused when menu opens
- Keyboard navigation cycles through items

---

## Migration from shadcn/ui

DropdownMenuGlass is 100% API compatible with shadcn/ui DropdownMenu:

```tsx
// Before (shadcn/ui)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

// After (Glass UI)
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
} from 'shadcn-glass-ui';

// Or use shadcn/ui-compatible aliases
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'shadcn-glass-ui';

// Usage is identical
<DropdownMenu>
  <DropdownMenuTrigger>...</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>...</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

---

## Comparison with DropdownGlass

This library also exports a simpler `DropdownGlass` component with a different API:

| Feature                  | DropdownMenuGlass           | DropdownGlass    |
| ------------------------ | --------------------------- | ---------------- |
| **API Style**            | Compound components         | Items prop array |
| **Complexity**           | More control                | Simpler          |
| **Checkboxes**           | ✅ Full support             | ❌ Not supported |
| **Radio Groups**         | ✅ Full support             | ❌ Not supported |
| **Sub-menus**            | ✅ Full support             | ❌ Not supported |
| **shadcn/ui Compatible** | ✅ Yes                      | ❌ No            |
| **Best for**             | Complex menus, full control | Simple dropdowns |

**When to use:**

- Use **DropdownMenuGlass** for complex menus, checkboxes, radio groups, or shadcn/ui compatibility
- Use **DropdownGlass** for simple item lists with quick setup

---

## Related Components

- **[ComboBoxGlass](./COMBO_BOX_GLASS.md)** - Searchable dropdown with autocomplete
- **[PopoverGlass](./POPOVER_GLASS.md)** - Generic popover container
- **[DropdownGlass](../ui/dropdown-glass.md)** - Simple dropdown (items prop API)

---

## Changelog

### v2.5.0 (2025-01-XX)

- Initial release
- 100% shadcn/ui API compatibility
- Full compound component API
- Complete Storybook documentation
- Visual regression tests

---

## Support

- **GitHub Issues:** [Report bugs](https://github.com/yhooi2/shadcn-glass-ui-library/issues)
- **Storybook:** [View live examples](https://yhooi2.github.io/shadcn-glass-ui-library/)
- **Documentation:** [CLAUDE.md](../../CLAUDE.md) for AI assistants

---

## License

MIT License - Part of [shadcn-glass-ui-library](https://github.com/yhooi2/shadcn-glass-ui-library)
