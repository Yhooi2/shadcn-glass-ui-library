# TabsGlass

Glass-themed tab navigation component with full shadcn/ui Tabs API compatibility.

## Overview

TabsGlass is a compound component built on `@radix-ui/react-tabs` that provides accessible,
beautiful tab navigation with glassmorphism styling. It's 100% compatible with shadcn/ui Tabs API
and supports both controlled and uncontrolled modes.

### Key Features

- **shadcn/ui Compatible** - Drop-in replacement for shadcn/ui Tabs
- **Compound Component API** - Flexible composition with 4 sub-components
- **Radix UI Foundation** - Full WCAG 2.1 AA compliance out of the box
- **Controlled & Uncontrolled** - Programmatic or default value
- **Keyboard Navigation** - Arrow keys, Home, End for tab switching
- **Orientation Support** - Horizontal (default) and vertical layouts
- **RTL Support** - Full right-to-left text direction support
- **Activation Modes** - Automatic (focus) or manual (click)
- **Active Indicator** - Visual indicator with smooth transitions
- **Glass Effects** - Backdrop blur, glow effects, theme-aware styling
- **Type-Safe** - Full TypeScript support with exported types
- **Accessible** - Screen reader support with ARIA attributes

## Installation

```tsx
import { TabsGlass } from 'shadcn-glass-ui';

// Or use shadcn/ui compatible aliases
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'shadcn-glass-ui';
```

## Compound API Reference

### Component Structure (Uncontrolled)

```tsx
<TabsGlass.Root defaultValue="tab1">
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab3">Tab 3</TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="tab1">
    <p>Content for Tab 1</p>
  </TabsGlass.Content>

  <TabsGlass.Content value="tab2">
    <p>Content for Tab 2</p>
  </TabsGlass.Content>

  <TabsGlass.Content value="tab3">
    <p>Content for Tab 3</p>
  </TabsGlass.Content>
</TabsGlass.Root>
```

### Component Structure (Controlled)

```tsx
const [activeTab, setActiveTab] = useState('tab1');

<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="tab1">
    <p>Content for Tab 1</p>
  </TabsGlass.Content>

  <TabsGlass.Content value="tab2">
    <p>Content for Tab 2</p>
  </TabsGlass.Content>
</TabsGlass.Root>;
```

### Full Component List

| Component | Description                     |
| --------- | ------------------------------- |
| `Root`    | Tabs root with context provider |
| `List`    | Container for tab triggers      |
| `Trigger` | Individual tab button           |
| `Content` | Content panel for a tab         |

## Props API

### TabsGlass.Root

Tabs root component supporting both controlled and uncontrolled modes.

| Prop             | Type                         | Default        | Description                       |
| ---------------- | ---------------------------- | -------------- | --------------------------------- |
| `value`          | `string`                     | -              | Controlled active tab value       |
| `defaultValue`   | `string`                     | -              | Initial active tab (uncontrolled) |
| `onValueChange`  | `(value: string) => void`    | -              | Callback when active tab changes  |
| `orientation`    | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab layout direction              |
| `dir`            | `'ltr' \| 'rtl'`             | `'ltr'`        | Text direction for RTL support    |
| `activationMode` | `'automatic' \| 'manual'`    | `'automatic'`  | Tab activation behavior           |
| `className`      | `string`                     | -              | Additional CSS classes            |
| `children`       | `ReactNode`                  | -              | Sub-components (required)         |

**Modes:**

- **Uncontrolled:** Use `defaultValue`, tab switching handled internally
- **Controlled:** Pass `value` and `onValueChange` props

**Orientation:**

- `horizontal` - Tabs displayed in a row (default)
- `vertical` - Tabs displayed in a column

**Activation Mode:**

- `automatic` - Tab activates on focus (keyboard navigation)
- `manual` - Tab activates on click/Enter/Space (focus doesn't switch)

### TabsGlass.List

Container for tab triggers with glass styling.

| Prop        | Type        | Default | Description                       |
| ----------- | ----------- | ------- | --------------------------------- |
| `className` | `string`    | -       | Additional CSS classes            |
| `children`  | `ReactNode` | -       | TabsTrigger components (required) |

**Styling:**

- Background: `var(--tab-container-bg)`
- Border: `var(--tab-container-border)`
- Rounded corners: `rounded-xl`
- Padding: `p-0.5 md:p-1`
- Gap: `gap-0.5 md:gap-1`

### TabsGlass.Trigger

Individual tab button with active indicator.

| Prop        | Type        | Default | Description               |
| ----------- | ----------- | ------- | ------------------------- |
| `value`     | `string`    | -       | Tab identifier (required) |
| `disabled`  | `boolean`   | `false` | Disable the tab           |
| `className` | `string`    | -       | Additional CSS classes    |
| `children`  | `ReactNode` | -       | Tab label (required)      |

**Styling:**

- **Inactive:**
  - Background: `var(--tab-bg)`
  - Text color: `var(--text-secondary)`
- **Active:**
  - Background: `var(--tab-active-bg)`
  - Text color: `var(--tab-active-text)`
  - Indicator: Bottom border with `var(--tab-indicator)`
- **Focus:**
  - Shadow: `var(--focus-glow)`
- **Disabled:**
  - Opacity: 50%
  - Cursor: `not-allowed`

**Active Indicator:**

- Position: Bottom center
- Width: `6px md:8px` (w-6 md:w-8)
- Height: `2px` (h-0.5)
- Rounded: `rounded-full`
- Animation: Fade in/out (300ms)

### TabsGlass.Content

Content panel that shows when tab is active.

| Prop         | Type        | Default | Description                    |
| ------------ | ----------- | ------- | ------------------------------ |
| `value`      | `string`    | -       | Tab identifier (required)      |
| `forceMount` | `boolean`   | `false` | Force mount even when inactive |
| `className`  | `string`    | -       | Additional CSS classes         |
| `children`   | `ReactNode` | -       | Content (required)             |

**Animations:**

- Fade in: `fade-in-0 duration-200`
- Only renders when `value` matches active tab

## Usage Examples

### Basic Tabs (Uncontrolled)

```tsx
import { TabsGlass } from 'shadcn-glass-ui';

function BasicTabs() {
  return (
    <TabsGlass.Root defaultValue="overview">
      <TabsGlass.List>
        <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
        <TabsGlass.Trigger value="analytics">Analytics</TabsGlass.Trigger>
        <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
      </TabsGlass.List>

      <TabsGlass.Content value="overview">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p>Dashboard overview content goes here.</p>
        </div>
      </TabsGlass.Content>

      <TabsGlass.Content value="analytics">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Analytics</h2>
          <p>Analytics charts and metrics go here.</p>
        </div>
      </TabsGlass.Content>

      <TabsGlass.Content value="settings">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Settings</h2>
          <p>Settings form goes here.</p>
        </div>
      </TabsGlass.Content>
    </TabsGlass.Root>
  );
}
```

### Controlled Tabs (Programmatic)

```tsx
import { useState } from 'react';
import { TabsGlass, ButtonGlass } from 'shadcn-glass-ui';

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleNext = () => {
    const tabs = ['tab1', 'tab2', 'tab3'];
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  return (
    <div>
      <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
        <TabsGlass.List>
          <TabsGlass.Trigger value="tab1">Step 1</TabsGlass.Trigger>
          <TabsGlass.Trigger value="tab2">Step 2</TabsGlass.Trigger>
          <TabsGlass.Trigger value="tab3">Step 3</TabsGlass.Trigger>
        </TabsGlass.List>

        <TabsGlass.Content value="tab1">
          <p>Step 1 content</p>
        </TabsGlass.Content>

        <TabsGlass.Content value="tab2">
          <p>Step 2 content</p>
        </TabsGlass.Content>

        <TabsGlass.Content value="tab3">
          <p>Step 3 content</p>
        </TabsGlass.Content>
      </TabsGlass.Root>

      <ButtonGlass onClick={handleNext} className="mt-4">
        Next Step
      </ButtonGlass>
    </div>
  );
}
```

### Vertical Tabs

```tsx
function VerticalTabs() {
  return (
    <TabsGlass.Root defaultValue="profile" orientation="vertical">
      <div className="flex gap-4">
        <TabsGlass.List>
          <TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
          <TabsGlass.Trigger value="account">Account</TabsGlass.Trigger>
          <TabsGlass.Trigger value="security">Security</TabsGlass.Trigger>
        </TabsGlass.List>

        <div className="flex-1">
          <TabsGlass.Content value="profile">
            <h2>Profile Settings</h2>
            <p>Edit your profile information.</p>
          </TabsGlass.Content>

          <TabsGlass.Content value="account">
            <h2>Account Settings</h2>
            <p>Manage your account preferences.</p>
          </TabsGlass.Content>

          <TabsGlass.Content value="security">
            <h2>Security Settings</h2>
            <p>Update your security preferences.</p>
          </TabsGlass.Content>
        </div>
      </div>
    </TabsGlass.Root>
  );
}
```

### Manual Activation Mode

```tsx
function ManualActivationTabs() {
  return (
    <TabsGlass.Root defaultValue="tab1" activationMode="manual">
      <TabsGlass.List>
        <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab3">Tab 3</TabsGlass.Trigger>
      </TabsGlass.List>

      <TabsGlass.Content value="tab1">
        <p>Manual activation: click or press Enter/Space to switch.</p>
      </TabsGlass.Content>

      <TabsGlass.Content value="tab2">
        <p>Arrow keys move focus but don't switch tabs.</p>
      </TabsGlass.Content>

      <TabsGlass.Content value="tab3">
        <p>Useful for preventing accidental tab switches.</p>
      </TabsGlass.Content>
    </TabsGlass.Root>
  );
}
```

### With Disabled Tab

```tsx
function DisabledTabExample() {
  return (
    <TabsGlass.Root defaultValue="tab1">
      <TabsGlass.List>
        <TabsGlass.Trigger value="tab1">Available</TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab2" disabled>
          Coming Soon
        </TabsGlass.Trigger>
        <TabsGlass.Trigger value="tab3">Available</TabsGlass.Trigger>
      </TabsGlass.List>

      <TabsGlass.Content value="tab1">
        <p>This tab is available.</p>
      </TabsGlass.Content>

      <TabsGlass.Content value="tab3">
        <p>This tab is also available.</p>
      </TabsGlass.Content>
    </TabsGlass.Root>
  );
}
```

### shadcn/ui Compatible Usage

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'shadcn-glass-ui';

function ShadcnCompatible() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <p className="text-sm text-(--text-secondary)">100% compatible with shadcn/ui Tabs API</p>
      </TabsContent>

      <TabsContent value="password">
        <p className="text-sm text-(--text-secondary)">Change your password here.</p>
      </TabsContent>
    </Tabs>
  );
}
```

## Accessibility

### Keyboard Navigation

| Key                          | Action                               |
| ---------------------------- | ------------------------------------ |
| `Tab`                        | Move focus to/from tab list          |
| `Arrow Left` / `Arrow Up`    | Select previous tab (automatic mode) |
| `Arrow Right` / `Arrow Down` | Select next tab (automatic mode)     |
| `Home`                       | Select first tab                     |
| `End`                        | Select last tab                      |
| `Enter` / `Space`            | Activate focused tab (manual mode)   |

**Note:** Arrow key direction respects `orientation` prop (horizontal vs vertical).

### ARIA Attributes

- `role="tablist"` - TabsList
- `role="tab"` - TabsTrigger
- `role="tabpanel"` - TabsContent
- `aria-selected` - Indicates active tab
- `aria-controls` - Links tab to its content panel
- `aria-orientation` - Indicates layout direction

### Focus Management

- **Roving tabindex:** Only active tab is tabbable
- **Arrow keys:** Navigate between tabs
- **Visible focus ring:** Using `var(--focus-glow)`

### Screen Reader Support

- Tab role and state announced
- Active tab indicated with aria-selected
- Tab panels linked with aria-controls

## shadcn/ui Compatibility

TabsGlass provides 100% API compatibility with shadcn/ui Tabs:

### Component Aliases

| shadcn/ui     | TabsGlass           | Same Component |
| ------------- | ------------------- | -------------- |
| `Tabs`        | `TabsGlass.Root`    | ✅             |
| `TabsList`    | `TabsGlass.List`    | ✅             |
| `TabsTrigger` | `TabsGlass.Trigger` | ✅             |
| `TabsContent` | `TabsGlass.Content` | ✅             |

**Usage:**

```tsx
// Both import styles work identically
import { Tabs, TabsList } from 'shadcn-glass-ui';
import { TabsGlass } from 'shadcn-glass-ui';

// These are the exact same components
<Tabs> === <TabsGlass.Root>
<TabsList> === <TabsGlass.List>
```

## Related Components

- [ModalGlass](./MODAL_GLASS.md) - Modal dialogs with glass styling
- [SegmentedControlGlass](../specialized/segmented-control-glass.md) - Alternative tab-like switcher
- [StepperGlass](./stepper-glass.md) - Step-by-step navigation
- [DropdownMenuGlass](./DROPDOWN_MENU_GLASS.md) - Dropdown menu with similar activation patterns

---

**Version:** v2.3.0+ **Last Updated:** 2025-12-21 **Status:** Stable **Radix UI:**
@radix-ui/react-tabs
