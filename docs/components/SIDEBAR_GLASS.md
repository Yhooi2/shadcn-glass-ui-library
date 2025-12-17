# SidebarGlass

Collapsible sidebar navigation component with glassmorphism styling. 100% API compatible with
shadcn/ui Sidebar.

## Overview

`SidebarGlass` provides a modern sidebar navigation with collapsible behavior, mobile drawer mode,
and glassmorphism effects. It follows the shadcn/ui Sidebar API exactly, making migration seamless.

### Key Features

- **100% shadcn/ui Compatible** - Drop-in replacement for shadcn/ui Sidebar
- **Compound Component API** - Provider, Root, Header, Content, Footer, and more
- **Mobile Drawer** - Renders as ModalGlass sheet on mobile
- **Desktop Collapsible** - Three modes: offcanvas, icon, none
- **Interactive Rail** - Click or drag to toggle sidebar
- **Keyboard Shortcut** - Toggle with Cmd/Ctrl + B
- **Cookie Persistence** - Remember sidebar state across sessions
- **Glassmorphism** - Backdrop blur, glow effects, CSS variables
- **Theme Support** - Works with all 3 themes (glass, light, aurora)

### Browser Compatibility

- Chrome 89+
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

```tsx
import { SidebarGlass, useSidebar } from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure

```tsx
<SidebarGlass.Provider>
  {' '}
  // Context provider (required)
  <SidebarGlass.Root>
    {' '}
    // Main sidebar container (aside)
    <SidebarGlass.Header /> // Sticky header
    <SidebarGlass.Content>
      {' '}
      // Scrollable content
      <SidebarGlass.Group>
        {' '}
        // Navigation group
        <SidebarGlass.GroupLabel />
        <SidebarGlass.GroupContent>
          <SidebarGlass.Menu>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton />
            </SidebarGlass.MenuItem>
          </SidebarGlass.Menu>
        </SidebarGlass.GroupContent>
      </SidebarGlass.Group>
    </SidebarGlass.Content>
    <SidebarGlass.Footer /> // Sticky footer
    <SidebarGlass.Rail /> // Collapse/expand rail
  </SidebarGlass.Root>
  <SidebarGlass.Inset>
    {' '}
    // Main content wrapper
    <main>...</main>
  </SidebarGlass.Inset>
</SidebarGlass.Provider>
```

### Full Component List

| Component       | Description                           |
| --------------- | ------------------------------------- |
| `Provider`      | Context provider, wraps entire layout |
| `Root`          | Main sidebar container (`<aside>`)    |
| `Header`        | Sticky header section                 |
| `Content`       | Scrollable content area               |
| `Footer`        | Sticky footer section                 |
| `Rail`          | Interactive collapse/expand rail      |
| `Inset`         | Main content area wrapper (`<main>`)  |
| `Trigger`       | Toggle button                         |
| `Separator`     | Visual divider                        |
| `Group`         | Navigation group container            |
| `GroupLabel`    | Group title                           |
| `GroupAction`   | Group action button                   |
| `GroupContent`  | Group content wrapper                 |
| `Menu`          | Menu list (`<ul>`)                    |
| `MenuItem`      | Menu item (`<li>`)                    |
| `MenuButton`    | Clickable menu item                   |
| `MenuAction`    | Menu item action button               |
| `MenuBadge`     | Menu item badge                       |
| `MenuSkeleton`  | Menu item loading skeleton            |
| `MenuSub`       | Submenu list                          |
| `MenuSubItem`   | Submenu item                          |
| `MenuSubButton` | Submenu button                        |

---

## Props API

### Provider Props

| Prop               | Type                                 | Default           | Description                        |
| ------------------ | ------------------------------------ | ----------------- | ---------------------------------- |
| `side`             | `'left' \| 'right'`                  | `'left'`          | Sidebar position                   |
| `variant`          | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'`       | Visual style                       |
| `collapsible`      | `'offcanvas' \| 'icon' \| 'none'`    | `'offcanvas'`     | Collapse behavior                  |
| `open`             | `boolean`                            | -                 | Controlled open state              |
| `onOpenChange`     | `(open: boolean) => void`            | -                 | Open state change handler          |
| `defaultOpen`      | `boolean`                            | `true`            | Initial open state                 |
| `cookieName`       | `string`                             | `'sidebar:state'` | Cookie name for persistence        |
| `keyboardShortcut` | `string \| false`                    | `'b'`             | Keyboard shortcut (Cmd/Ctrl + key) |

### Root Props

| Prop          | Type                 | Default | Description                   |
| ------------- | -------------------- | ------- | ----------------------------- |
| `side`        | `SidebarSide`        | -       | Override Provider side        |
| `variant`     | `SidebarVariant`     | -       | Override Provider variant     |
| `collapsible` | `SidebarCollapsible` | -       | Override Provider collapsible |
| `className`   | `string`             | -       | Custom className              |

### MenuButton Props

| Prop       | Type                        | Default     | Description                       |
| ---------- | --------------------------- | ----------- | --------------------------------- |
| `asChild`  | `boolean`                   | `false`     | Use Radix Slot for custom element |
| `isActive` | `boolean`                   | `false`     | Active/selected state             |
| `tooltip`  | `string`                    | -           | Tooltip text (shown in icon mode) |
| `variant`  | `'default' \| 'outline'`    | `'default'` | Button variant                    |
| `size`     | `'default' \| 'sm' \| 'lg'` | `'default'` | Button size                       |

### Trigger Props

| Prop        | Type      | Default | Description                       |
| ----------- | --------- | ------- | --------------------------------- |
| `asChild`   | `boolean` | `false` | Use Radix Slot for custom trigger |
| `className` | `string`  | -       | Custom className                  |

---

## Usage Examples

### Basic Sidebar

```tsx
import { SidebarGlass } from 'shadcn-glass-ui';
import { Home, Settings, Users } from 'lucide-react';

export function AppLayout({ children }) {
  return (
    <SidebarGlass.Provider>
      <SidebarGlass.Root>
        <SidebarGlass.Header>
          <Logo />
        </SidebarGlass.Header>
        <SidebarGlass.Content>
          <SidebarGlass.Menu>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton isActive>
                <Home className="w-4 h-4" />
                Dashboard
              </SidebarGlass.MenuButton>
            </SidebarGlass.MenuItem>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton>
                <Users className="w-4 h-4" />
                Users
              </SidebarGlass.MenuButton>
            </SidebarGlass.MenuItem>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton>
                <Settings className="w-4 h-4" />
                Settings
              </SidebarGlass.MenuButton>
            </SidebarGlass.MenuItem>
          </SidebarGlass.Menu>
        </SidebarGlass.Content>
        <SidebarGlass.Footer>
          <UserMenu />
        </SidebarGlass.Footer>
      </SidebarGlass.Root>
      <SidebarGlass.Inset>
        <main>{children}</main>
      </SidebarGlass.Inset>
    </SidebarGlass.Provider>
  );
}
```

---

### With Groups

```tsx
<SidebarGlass.Provider>
  <SidebarGlass.Root>
    <SidebarGlass.Content>
      <SidebarGlass.Group>
        <SidebarGlass.GroupLabel>Main</SidebarGlass.GroupLabel>
        <SidebarGlass.GroupContent>
          <SidebarGlass.Menu>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton isActive>
                <Home /> Dashboard
              </SidebarGlass.MenuButton>
            </SidebarGlass.MenuItem>
          </SidebarGlass.Menu>
        </SidebarGlass.GroupContent>
      </SidebarGlass.Group>

      <SidebarGlass.Separator />

      <SidebarGlass.Group>
        <SidebarGlass.GroupLabel>Settings</SidebarGlass.GroupLabel>
        <SidebarGlass.GroupAction asChild>
          <button>
            <Plus />
          </button>
        </SidebarGlass.GroupAction>
        <SidebarGlass.GroupContent>
          <SidebarGlass.Menu>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton>
                <Settings /> Settings
              </SidebarGlass.MenuButton>
            </SidebarGlass.MenuItem>
          </SidebarGlass.Menu>
        </SidebarGlass.GroupContent>
      </SidebarGlass.Group>
    </SidebarGlass.Content>
  </SidebarGlass.Root>
</SidebarGlass.Provider>
```

---

### Icon Mode (Collapsible)

```tsx
<SidebarGlass.Provider collapsible="icon">
  <SidebarGlass.Root>
    <SidebarGlass.Content>
      <SidebarGlass.Menu>
        <SidebarGlass.MenuItem>
          <SidebarGlass.MenuButton tooltip="Dashboard">
            <Home /> Dashboard
          </SidebarGlass.MenuButton>
        </SidebarGlass.MenuItem>
        <SidebarGlass.MenuItem>
          <SidebarGlass.MenuButton tooltip="Settings">
            <Settings /> Settings
          </SidebarGlass.MenuButton>
        </SidebarGlass.MenuItem>
      </SidebarGlass.Menu>
    </SidebarGlass.Content>
    <SidebarGlass.Rail />
  </SidebarGlass.Root>
</SidebarGlass.Provider>
```

When collapsed, only icons are shown and tooltips appear on hover.

---

### Right Side

```tsx
<SidebarGlass.Provider side="right">
  <SidebarGlass.Inset>
    <main>Content</main>
  </SidebarGlass.Inset>
  <SidebarGlass.Root>{/* Sidebar on right side */}</SidebarGlass.Root>
</SidebarGlass.Provider>
```

---

### Floating Variant

```tsx
<SidebarGlass.Provider variant="floating">
  <SidebarGlass.Root>{/* Sidebar with margin and rounded corners */}</SidebarGlass.Root>
</SidebarGlass.Provider>
```

---

### With Submenus

```tsx
<SidebarGlass.Menu>
  <SidebarGlass.MenuItem>
    <SidebarGlass.MenuButton>
      <Folder /> Documents
    </SidebarGlass.MenuButton>
    <SidebarGlass.MenuSub>
      <SidebarGlass.MenuSubItem>
        <SidebarGlass.MenuSubButton>
          <File /> Recent
        </SidebarGlass.MenuSubButton>
      </SidebarGlass.MenuSubItem>
      <SidebarGlass.MenuSubItem>
        <SidebarGlass.MenuSubButton>
          <Star /> Starred
        </SidebarGlass.MenuSubButton>
      </SidebarGlass.MenuSubItem>
    </SidebarGlass.MenuSub>
  </SidebarGlass.MenuItem>
</SidebarGlass.Menu>
```

---

### With Badges

```tsx
<SidebarGlass.MenuItem>
  <SidebarGlass.MenuButton>
    <Inbox /> Inbox
    <SidebarGlass.MenuBadge>12</SidebarGlass.MenuBadge>
  </SidebarGlass.MenuButton>
</SidebarGlass.MenuItem>
```

---

### With Actions

```tsx
<SidebarGlass.MenuItem>
  <SidebarGlass.MenuButton>
    <File /> document.pdf
  </SidebarGlass.MenuButton>
  <SidebarGlass.MenuAction asChild>
    <button onClick={handleDelete}>
      <Trash />
    </button>
  </SidebarGlass.MenuAction>
</SidebarGlass.MenuItem>
```

---

### Loading State

```tsx
<SidebarGlass.Menu>
  <SidebarGlass.MenuItem>
    <SidebarGlass.MenuSkeleton showIcon />
  </SidebarGlass.MenuItem>
  <SidebarGlass.MenuItem>
    <SidebarGlass.MenuSkeleton />
  </SidebarGlass.MenuItem>
</SidebarGlass.Menu>
```

---

### Controlled State

```tsx
function App() {
  const [open, setOpen] = useState(true);

  return (
    <SidebarGlass.Provider open={open} onOpenChange={setOpen}>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <SidebarGlass.Root>{/* ... */}</SidebarGlass.Root>
    </SidebarGlass.Provider>
  );
}
```

---

## Hook: useSidebar()

Access the SidebarGlass context from any child component:

```tsx
import { useSidebar } from 'shadcn-glass-ui';

function MyComponent() {
  const {
    // State
    state, // 'expanded' | 'collapsed'
    open, // Desktop open state
    setOpen, // Set desktop open
    openMobile, // Mobile open state
    setOpenMobile, // Set mobile open

    // Responsive
    isMobile, // Is mobile viewport

    // Config
    side, // 'left' | 'right'
    variant, // 'sidebar' | 'floating' | 'inset'
    collapsible, // 'offcanvas' | 'icon' | 'none'

    // Actions
    toggleSidebar, // Toggle open state
  } = useSidebar();

  return <button onClick={toggleSidebar}>{state === 'expanded' ? 'Collapse' : 'Expand'}</button>;
}
```

---

## Collapsible Modes

### Offcanvas (Default)

Sidebar slides completely off screen when collapsed.

```tsx
<SidebarGlass.Provider collapsible="offcanvas">
```

### Icon

Sidebar collapses to icon-only width. Text is hidden, tooltips shown on hover.

```tsx
<SidebarGlass.Provider collapsible="icon">
```

### None

Sidebar cannot be collapsed.

```tsx
<SidebarGlass.Provider collapsible="none">
```

---

## CSS Variables

SidebarGlass uses CSS variables for theming:

```css
:root {
  --sidebar-width: 16rem;
  --sidebar-width-mobile: 18rem;
  --sidebar-width-icon: 3rem;
  --sidebar-bg: oklch(var(--glass-bg));
  --sidebar-foreground: oklch(var(--foreground));
  --sidebar-border: oklch(var(--border));
  --sidebar-backdrop-blur: 16px;
  --sidebar-glow: 0 0 20px oklch(var(--glow-color));
}
```

---

## Responsive Behavior

### Desktop

- Sidebar renders as collapsible aside
- Rail provides toggle interaction
- Keyboard shortcut active

### Mobile

- Sidebar renders as ModalGlass drawer
- Overlay appears when open
- Swipe to close (via ModalGlass)

---

## Accessibility

### Semantic HTML

- Uses `<aside>` for sidebar (complementary landmark)
- Uses `<nav>` for menu (navigation landmark)
- Uses `<main>` for inset content

### Keyboard Navigation

- **Cmd/Ctrl + B:** Toggle sidebar
- **Tab:** Navigate through menu items
- **Enter/Space:** Activate menu item
- **Escape:** Close mobile drawer

### ARIA

- Menu items use `role="menuitem"`
- Active state via `aria-current="page"`
- Expandable sections use `aria-expanded`

---

## Migration from shadcn/ui

SidebarGlass is 100% API compatible with shadcn/ui Sidebar:

```tsx
// Before (shadcn/ui)
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

// After (Glass UI)
import { SidebarGlass } from 'shadcn-glass-ui';

// Usage is identical
<SidebarGlass.Provider>
  <SidebarGlass.Root>{/* Same API */}</SidebarGlass.Root>
</SidebarGlass.Provider>;
```

---

## Related Components

- **[SplitLayoutGlass](./SPLIT_LAYOUT_GLASS.md)** - Two-column layout (master-detail pattern)
- **[ModalGlass](./MODAL_GLASS.md)** - Modal dialog (used for mobile drawer)
- **[GlassCard](./GLASS_CARD.md)** - Base glass container

---

## Changelog

### v2.1.4 (2025-12-XX)

- Initial release
- 100% shadcn/ui API compatibility
- Mobile drawer mode
- Three collapsible variants
- Complete documentation

---

## Support

- **GitHub Issues:** [Report bugs](https://github.com/yhooi2/shadcn-glass-ui-library/issues)
- **Storybook:** [View live examples](https://yhooi2.github.io/shadcn-glass-ui-library/)
- **Documentation:** [CLAUDE.md](../../CLAUDE.md) for AI assistants

---

## License

MIT License - Part of [shadcn-glass-ui-library](https://github.com/yhooi2/shadcn-glass-ui-library)
