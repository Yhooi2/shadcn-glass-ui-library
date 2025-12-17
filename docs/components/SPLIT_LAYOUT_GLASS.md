# SplitLayoutGlass

Responsive two-column layout component with sticky scroll behavior and glassmorphism styling.

## Overview

`SplitLayoutGlass` provides a modern split-panel layout inspired by MDN, GitHub Docs, and Linear. It
features independent scrolling in each panel after sticky positioning activates, making it perfect
for documentation sites, dashboards, and analytics applications.

**API:** Compound component only (v2.2.0+). Legacy props API has been removed.

### Key Features

- **Compound Component API** - Provider, Root, Sidebar, Main, and nested components
- **Sticky Scroll Behavior** - Panels scroll together until reaching sticky offset, then scroll
  independently
- **Responsive Design** - 2 columns on desktop, configurable mobile layouts
  (stack/main-only/sidebar-only)
- **Master-Detail Pattern** - Built-in selection state via `selectedKey`
- **CSS Grid with minmax()** - Minimum sidebar width prevents squeezing
- **Glassmorphism Styling** - Configurable blur intensity (subtle/medium/strong)
- **Keyboard Shortcut** - Toggle sidebar with Cmd/Ctrl + B
- **URL Persistence** - Optional URL parameter sync for selection state
- **Theme Support** - Works with all 3 themes (glass, light, aurora)

### Browser Compatibility

- Chrome 89+ (CSS Grid minmax support)
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

The component is part of the Glass UI library. Import it from the composite components:

```tsx
import { SplitLayoutGlass, useSplitLayout } from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure

```tsx
<SplitLayoutGlass.Provider>
  {' '}
  // Context provider (required)
  <SplitLayoutGlass.Root>
    {' '}
    // Grid container
    <SplitLayoutGlass.Sidebar>
      {' '}
      // Sidebar panel (aside element)
      <SplitLayoutGlass.SidebarHeader /> // Sticky header
      <SplitLayoutGlass.SidebarContent /> // Scrollable content
      <SplitLayoutGlass.SidebarFooter /> // Sticky footer
    </SplitLayoutGlass.Sidebar>
    <SplitLayoutGlass.Main>
      {' '}
      // Main panel (main element)
      <SplitLayoutGlass.MainHeader /> // Sticky header
      <SplitLayoutGlass.MainContent /> // Scrollable content
      <SplitLayoutGlass.MainFooter /> // Sticky footer
    </SplitLayoutGlass.Main>
  </SplitLayoutGlass.Root>
  <SplitLayoutGlass.Trigger /> // Toggle button (optional)
</SplitLayoutGlass.Provider>
```

---

## Props API

### Provider Props

| Prop                  | Type                                    | Default    | Description                              |
| --------------------- | --------------------------------------- | ---------- | ---------------------------------------- |
| `selectedKey`         | `string \| null`                        | -          | Controlled selected key (master-detail)  |
| `onSelectedKeyChange` | `(key: string \| null) => void`         | -          | Selection change handler                 |
| `defaultSelectedKey`  | `string \| null`                        | -          | Initial selected key                     |
| `open`                | `boolean`                               | -          | Controlled sidebar open state            |
| `onOpenChange`        | `(open: boolean) => void`               | -          | Open state change handler                |
| `defaultOpen`         | `boolean`                               | `true`     | Initial sidebar open state               |
| `breakpoint`          | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'`     | Desktop layout breakpoint                |
| `mobileMode`          | `'stack' \| 'accordion' \| 'drawer'`    | `'stack'`  | Mobile layout behavior                   |
| `intensity`           | `'subtle' \| 'medium' \| 'strong'`      | `'medium'` | Glass blur intensity                     |
| `stickyOffset`        | `number`                                | `24`       | Sticky offset in pixels                  |
| `urlParamName`        | `string`                                | -          | URL param name for selection persistence |
| `keyboardShortcut`    | `string \| false`                       | `'b'`      | Keyboard shortcut (Cmd/Ctrl + key)       |

### Root Props

| Prop              | Type                                              | Default                       | Description                       |
| ----------------- | ------------------------------------------------- | ----------------------------- | --------------------------------- |
| `ratio`           | `{ sidebar: number; main: number }`               | `{ sidebar: 1, main: 2 }`     | Column ratio (1:2 = 33%/67%)      |
| `minSidebarWidth` | `string`                                          | `'300px'`                     | Minimum sidebar width (CSS value) |
| `maxSidebarWidth` | `string`                                          | -                             | Maximum sidebar width (CSS value) |
| `gap`             | `number \| { mobile?: number; desktop?: number }` | `{ mobile: 16, desktop: 24 }` | Gap between panels in pixels      |
| `breakpoint`      | `Breakpoint`                                      | -                             | Overrides Provider breakpoint     |
| `mobileLayout`    | `'stack' \| 'main-only' \| 'sidebar-only'`        | `'stack'`                     | Mobile layout mode                |
| `className`       | `string`                                          | -                             | Custom className for container    |

### Sidebar/Main Props

| Prop        | Type     | Default                                   | Description           |
| ----------- | -------- | ----------------------------------------- | --------------------- |
| `label`     | `string` | `'Sidebar navigation'` / `'Main content'` | ARIA label for region |
| `className` | `string` | -                                         | Custom className      |

### Header/Footer Props

| Prop        | Type     | Default | Description      |
| ----------- | -------- | ------- | ---------------- |
| `className` | `string` | -       | Custom className |

### Content Props

| Prop         | Type      | Default | Description                                         |
| ------------ | --------- | ------- | --------------------------------------------------- |
| `scrollable` | `boolean` | `true`  | Enable ScrollArea wrapper for independent scrolling |
| `className`  | `string`  | -       | Custom className                                    |

### Trigger Props

| Prop            | Type                | Default  | Description                                 |
| --------------- | ------------------- | -------- | ------------------------------------------- |
| `asChild`       | `boolean`           | `false`  | Use Radix Slot for custom trigger element   |
| `showOnDesktop` | `boolean`           | `false`  | Show trigger on desktop (hidden by default) |
| `variant`       | `'menu' \| 'panel'` | `'menu'` | Icon style (hamburger vs panel icons)       |
| `className`     | `string`            | -        | Custom className                            |

---

## Usage Examples

### Basic Two-Column Layout

```tsx
import { SplitLayoutGlass } from 'shadcn-glass-ui';

export function DocsLayout() {
  return (
    <SplitLayoutGlass.Provider>
      <SplitLayoutGlass.Root>
        <SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.SidebarHeader>
            <h3 className="text-lg font-semibold">Navigation</h3>
          </SplitLayoutGlass.SidebarHeader>
          <SplitLayoutGlass.SidebarContent>
            <nav className="space-y-2 p-4">
              <a href="#section-1" className="block p-2 rounded hover:bg-muted">
                Section 1
              </a>
              <a href="#section-2" className="block p-2 rounded hover:bg-muted">
                Section 2
              </a>
            </nav>
          </SplitLayoutGlass.SidebarContent>
        </SplitLayoutGlass.Sidebar>
        <SplitLayoutGlass.Main>
          <SplitLayoutGlass.MainContent>
            <article className="p-6">
              <h1 className="text-3xl font-bold mb-4">Content Title</h1>
              <p>Your main content here...</p>
            </article>
          </SplitLayoutGlass.MainContent>
        </SplitLayoutGlass.Main>
      </SplitLayoutGlass.Root>
    </SplitLayoutGlass.Provider>
  );
}
```

---

### Master-Detail Pattern

```tsx
import { SplitLayoutGlass, useSplitLayout } from 'shadcn-glass-ui';

function ItemList() {
  const { selectedKey, setSelectedKey } = useSplitLayout();
  const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setSelectedKey(item.id)}
          className={cn('w-full p-3 rounded text-left', selectedKey === item.id && 'bg-primary/10')}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

function ItemDetail() {
  const { selectedKey } = useSplitLayout();
  if (!selectedKey) return <p>Select an item</p>;
  return <div>Details for item {selectedKey}</div>;
}

export function MasterDetailLayout() {
  return (
    <SplitLayoutGlass.Provider defaultSelectedKey="1" urlParamName="item">
      <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }}>
        <SplitLayoutGlass.Sidebar>
          <SplitLayoutGlass.SidebarHeader>
            <h3>Items</h3>
            <SplitLayoutGlass.Trigger variant="menu" />
          </SplitLayoutGlass.SidebarHeader>
          <SplitLayoutGlass.SidebarContent>
            <ItemList />
          </SplitLayoutGlass.SidebarContent>
        </SplitLayoutGlass.Sidebar>
        <SplitLayoutGlass.Main>
          <SplitLayoutGlass.MainContent>
            <ItemDetail />
          </SplitLayoutGlass.MainContent>
        </SplitLayoutGlass.Main>
      </SplitLayoutGlass.Root>
    </SplitLayoutGlass.Provider>
  );
}
```

---

### Custom Ratio and Width

```tsx
<SplitLayoutGlass.Provider>
  <SplitLayoutGlass.Root
    ratio={{ sidebar: 1, main: 3 }} // 25% sidebar, 75% main
    minSidebarWidth="250px"
    maxSidebarWidth="400px"
  >
    {/* ... */}
  </SplitLayoutGlass.Root>
</SplitLayoutGlass.Provider>
```

---

### Intensity Variants

```tsx
// Subtle blur (8px) - minimal glass effect
<SplitLayoutGlass.Provider intensity="subtle">
  {/* ... */}
</SplitLayoutGlass.Provider>

// Medium blur (16px) - standard glass effect (default)
<SplitLayoutGlass.Provider intensity="medium">
  {/* ... */}
</SplitLayoutGlass.Provider>

// Strong blur (24px) - heavy glass effect
<SplitLayoutGlass.Provider intensity="strong">
  {/* ... */}
</SplitLayoutGlass.Provider>
```

---

### Mobile Layouts

```tsx
// Stack Layout (default) - sidebar above main
<SplitLayoutGlass.Root mobileLayout="stack">
  {/* ... */}
</SplitLayoutGlass.Root>

// Main Only - hide sidebar on mobile
<SplitLayoutGlass.Root mobileLayout="main-only">
  {/* ... */}
</SplitLayoutGlass.Root>

// Sidebar Only - hide main on mobile
<SplitLayoutGlass.Root mobileLayout="sidebar-only">
  {/* ... */}
</SplitLayoutGlass.Root>
```

---

### With Headers and Footers

```tsx
<SplitLayoutGlass.Provider>
  <SplitLayoutGlass.Root>
    <SplitLayoutGlass.Sidebar>
      <SplitLayoutGlass.SidebarHeader>
        <Logo />
        <SplitLayoutGlass.Trigger />
      </SplitLayoutGlass.SidebarHeader>
      <SplitLayoutGlass.SidebarContent scrollable>
        <Navigation />
      </SplitLayoutGlass.SidebarContent>
      <SplitLayoutGlass.SidebarFooter>
        <UserMenu />
      </SplitLayoutGlass.SidebarFooter>
    </SplitLayoutGlass.Sidebar>
    <SplitLayoutGlass.Main>
      <SplitLayoutGlass.MainHeader>
        <Breadcrumbs />
        <SearchBar />
      </SplitLayoutGlass.MainHeader>
      <SplitLayoutGlass.MainContent>
        <PageContent />
      </SplitLayoutGlass.MainContent>
      <SplitLayoutGlass.MainFooter>
        <Pagination />
      </SplitLayoutGlass.MainFooter>
    </SplitLayoutGlass.Main>
  </SplitLayoutGlass.Root>
</SplitLayoutGlass.Provider>
```

---

### Different Breakpoint

```tsx
<SplitLayoutGlass.Provider breakpoint="lg">
  <SplitLayoutGlass.Root>
    {/* Two-column layout starts at 1024px instead of 768px */}
  </SplitLayoutGlass.Root>
</SplitLayoutGlass.Provider>
```

**Breakpoint values:**

- `sm`: 640px
- `md`: 768px (default)
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Hook: useSplitLayout()

Access the SplitLayoutGlass context from any child component:

```tsx
import { useSplitLayout } from 'shadcn-glass-ui';

function MyComponent() {
  const {
    // Selection state (master-detail)
    selectedKey, // Current selected key
    setSelectedKey, // Set selected key

    // Desktop state
    isOpen, // Sidebar open state
    setIsOpen, // Set open state

    // Mobile state
    isMobileOpen, // Mobile sidebar open
    setMobileOpen, // Set mobile open

    // Responsive
    isMobile, // Is mobile viewport
    breakpoint, // Current breakpoint
    mobileMode, // Mobile layout mode

    // Config
    intensity, // Glass intensity
    stickyOffset, // Sticky offset

    // Actions
    toggle, // Toggle sidebar

    // shadcn/ui aliases
    state, // 'expanded' | 'collapsed'
    open, // Alias for isOpen
    openMobile, // Alias for isMobileOpen
    toggleSidebar, // Alias for toggle
  } = useSplitLayout();

  return <button onClick={toggle}>{isOpen ? 'Close Sidebar' : 'Open Sidebar'}</button>;
}
```

---

## Responsive Behavior

### Desktop (≥ breakpoint)

- **Layout:** Two columns side by side
- **Sticky:** Both panels become sticky after scrolling past offset
- **Max Height:** `calc(100vh - offset * 2)` constrains panel height
- **Scrolling:** Each panel scrolls independently within max-height
- **Grid:** Uses CSS Grid with `minmax()` for sidebar width

### Mobile (< breakpoint)

- **Layout:** Determined by `mobileLayout` prop
  - `stack`: Single column, sidebar above main
  - `main-only`: Hide sidebar, show only main
  - `sidebar-only`: Hide main, show only sidebar
- **Sticky:** Disabled (not useful in single column)
- **Scrolling:** Normal document flow

---

## Sticky Scroll Behavior

### How It Works

1. **Initial scroll:** Both panels scroll together with page
2. **Reaching offset:** Panels become `position: sticky` at `top: {stickyOffset}px`
3. **Independent scroll:** Each panel scrolls independently within `max-height` constraint
4. **No sync:** Panels do NOT scroll together to end of document

### Visual Diagram

```
┌─────────────────────────────────────┐
│         Browser Viewport            │
│  ┌─────────────────────────────┐   │
│  │  Offset (24px)              │   │
│  ├─────────────┬───────────────┤   │ ← Sticky point
│  │  Sidebar    │     Main      │   │
│  │  (sticky)   │   (sticky)    │   │
│  │             │               │   │
│  │  [scroll]   │   [scroll]    │   │
│  │    ↕        │      ↕        │   │
│  └─────────────┴───────────────┘   │
│  Offset (24px)                      │
└─────────────────────────────────────┘
```

---

## Accessibility

### Semantic HTML

- **`<aside>`** for sidebar - Navigation landmark
- **`<main>`** for main content - Main landmark
- Screen readers announce these regions automatically

### ARIA Labels

```tsx
<SplitLayoutGlass.Sidebar label="Documentation navigation">
  {/* ... */}
</SplitLayoutGlass.Sidebar>

<SplitLayoutGlass.Main label="Article content">
  {/* ... */}
</SplitLayoutGlass.Main>
```

### Keyboard Navigation

- **Cmd/Ctrl + B:** Toggle sidebar (configurable via `keyboardShortcut`)
- **Tab:** Cycles through focusable elements in document order
- **Arrow keys:** Scrolls within focused ScrollArea
- **Space/Page Down:** Scrolls down in focused panel

---

## Troubleshooting

### Sidebar too narrow

**Solution:** Increase `minSidebarWidth`

```tsx
<SplitLayoutGlass.Root minSidebarWidth="350px">
```

### Sidebar too wide

**Solution:** Set `maxSidebarWidth` or adjust ratio

```tsx
<SplitLayoutGlass.Root maxSidebarWidth="400px" ratio={{ sidebar: 1, main: 3 }} />
```

### Content not scrolling

**Solution:** Ensure `scrollable` prop is true (default) on Content components

```tsx
<SplitLayoutGlass.SidebarContent scrollable>{/* Long content */}</SplitLayoutGlass.SidebarContent>
```

### Sticky not working

**Possible causes:**

1. **Mobile viewport** - Sticky disabled on mobile
2. **Parent overflow** - Parent has `overflow: hidden/auto/scroll`
3. **Z-index conflict** - Add `z-10` to className

---

## Related Components

- **[SidebarGlass](./SIDEBAR_GLASS.md)** - Traditional collapsible sidebar (shadcn/ui compatible)
- **[GlassCard](./GLASS_CARD.md)** - Base glass container
- **[ModalGlass](./MODAL_GLASS.md)** - Modal with compound API pattern

---

## Changelog

### v2.2.0 (2025-01-XX)

- Initial release with compound API
- Legacy props API removed
- 18 visual tests across 3 themes
- 20+ unit tests with 100% coverage
- Complete documentation

---

## Support

- **GitHub Issues:** [Report bugs](https://github.com/yhooi2/shadcn-glass-ui-library/issues)
- **Storybook:** [View live examples](https://yhooi2.github.io/shadcn-glass-ui-library/)
- **Documentation:** [CLAUDE.md](../../CLAUDE.md) for AI assistants

---

## License

MIT License - Part of [shadcn-glass-ui-library](https://github.com/yhooi2/shadcn-glass-ui-library)
