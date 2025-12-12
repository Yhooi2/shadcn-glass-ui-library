# Dropdown Components Architecture

## Overview

All dropdown-style components in the Glass UI library follow the **shadcn/ui compound component
pattern**, built on **Radix UI primitives** and **shared styling utilities**.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Radix UI Primitives                         │
│              @radix-ui/react-dropdown-menu                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Shared Styling Utilities                       │
│         src/lib/variants/dropdown-content-styles.ts             │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              DropdownMenuGlass (Compound Components)             │
│                src/components/glass/ui/dropdown-menu-glass.tsx  │
│                                                                  │
│  Exports:                                                        │
│  • DropdownMenuGlass (Root)                                     │
│  • DropdownMenuGlassTrigger                                     │
│  • DropdownMenuGlassContent                                     │
│  • DropdownMenuGlassItem                                        │
│  • DropdownMenuGlassSeparator                                   │
│  • DropdownMenuGlassLabel                                       │
│  • DropdownMenuGlassCheckboxItem                                │
│  • DropdownMenuGlassRadioGroup / RadioItem                      │
│  • DropdownMenuGlassSub / SubTrigger / SubContent               │
│  • DropdownMenuGlassShortcut                                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
               ┌───────────────┼───────────────┐
               ▼               ▼               ▼
         ┌──────────┐   ┌──────────┐   ┌───────────────┐
         │ Dropdown │   │   Sort   │   │   ComboBox    │
         │  Glass   │   │ Dropdown │   │     Glass     │
         │ (Simple) │   │  Glass   │   │  (Searchable) │
         └──────────┘   └──────────┘   └───────────────┘
```

## Component APIs

### 1. DropdownMenuGlass (Compound Components) - shadcn/ui Pattern

**Location:** `src/components/glass/ui/dropdown-menu-glass.tsx`

**Purpose:** Base compound components for building any dropdown menu

```tsx
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassSeparator,
  DropdownMenuGlassLabel,
} from '@/components/glass/ui/dropdown-menu-glass';

// Basic usage
<DropdownMenuGlass>
  <DropdownMenuGlassTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuGlassTrigger>
  <DropdownMenuGlassContent>
    <DropdownMenuGlassLabel>Actions</DropdownMenuGlassLabel>
    <DropdownMenuGlassItem onSelect={() => console.log('Edit')}>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuGlassItem>
    <DropdownMenuGlassSeparator />
    <DropdownMenuGlassItem variant="destructive">
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuGlassItem>
  </DropdownMenuGlassContent>
</DropdownMenuGlass>;
```

**Available Components:**

| Component                       | Description                     |
| ------------------------------- | ------------------------------- |
| `DropdownMenuGlass`             | Root component (manages state)  |
| `DropdownMenuGlassTrigger`      | Trigger element (use `asChild`) |
| `DropdownMenuGlassContent`      | Dropdown content container      |
| `DropdownMenuGlassItem`         | Menu item with `variant` prop   |
| `DropdownMenuGlassSeparator`    | Visual divider                  |
| `DropdownMenuGlassLabel`        | Section label                   |
| `DropdownMenuGlassCheckboxItem` | Checkbox menu item              |
| `DropdownMenuGlassRadioGroup`   | Radio group container           |
| `DropdownMenuGlassRadioItem`    | Radio menu item                 |
| `DropdownMenuGlassSub`          | Sub-menu root                   |
| `DropdownMenuGlassSubTrigger`   | Sub-menu trigger                |
| `DropdownMenuGlassSubContent`   | Sub-menu content                |
| `DropdownMenuGlassShortcut`     | Keyboard shortcut hint          |

### 2. DropdownGlass (Simple API)

**Location:** `src/components/glass/ui/dropdown-glass.tsx`

**Purpose:** Quick setup for basic dropdown menus (wrapper over compound components)

```tsx
import { DropdownGlass } from '@/components/glass/ui/dropdown-glass';

<DropdownGlass
  trigger={
    <button>
      <MoreVertical />
    </button>
  }
  items={[
    { label: 'Edit', icon: Edit, onClick: handleEdit },
    { divider: true },
    { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true },
  ]}
  align="left"
/>;
```

**When to use:**

- Simple menus with items, dividers, and icons
- No need for checkboxes, radio groups, or sub-menus

### 3. SortDropdownGlass (Specialized)

**Location:** `src/components/glass/atomic/sort-dropdown-glass.tsx`

**Purpose:** Sort field selection with order toggle

```tsx
import { SortDropdownGlass } from '@/components/glass/atomic/sort-dropdown-glass';

<SortDropdownGlass
  sortBy="commits"
  sortOrder="desc"
  onSortChange={(field, order) => console.log(field, order)}
  options={['commits', 'stars', 'name']}
  compact={false}
/>;
```

**Built on:** DropdownMenuGlass compound components

### 4. ComboBoxGlass (Searchable)

**Location:** `src/components/glass/ui/combobox-glass.tsx`

**Purpose:** Searchable select dropdown with filtering

```tsx
import { ComboBoxGlass } from '@/components/glass/ui/combobox-glass';

<ComboBoxGlass
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  searchable
/>;
```

**Built on:** Radix UI Popover + shadcn Command (separate pattern for search)

## Shared Styling

### CSS Variables

```css
--dropdown-bg          /* Background color */
--dropdown-border      /* Border color */
--dropdown-glow        /* Shadow/glow effect */
--dropdown-item-text   /* Item text color */
--dropdown-item-hover  /* Hover background */
--dropdown-icon        /* Icon color */
--dropdown-icon-hover  /* Icon hover color */
--dropdown-divider     /* Separator color */
```

### Styling Utilities

**Location:** `src/lib/variants/dropdown-content-styles.ts`

```typescript
// Glass surface styling
getDropdownContentStyles(): CSSProperties

// Container classes
dropdownContentClasses: string

// Item classes with state support
getDropdownItemClasses({ danger?, selected?, highlighted? }): string

// Icon classes
getDropdownIconClasses({ danger? }): string

// Other classes
dropdownSeparatorClasses: string
dropdownLabelClasses: string
```

## Creating New Dropdown Components

### Step 1: Import DropdownMenuGlass primitives

```tsx
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
} from '@/components/glass/ui/dropdown-menu-glass';
```

### Step 2: Build your component

```tsx
export function MyDropdown({ value, onChange, options }) {
  return (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <button>{value}</button>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent>
        {options.map((opt) => (
          <DropdownMenuGlassItem key={opt.value} onSelect={() => onChange(opt.value)}>
            {opt.label}
          </DropdownMenuGlassItem>
        ))}
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  );
}
```

### Step 3: Add custom styling if needed

```tsx
<DropdownMenuGlassItem
  className={cn(
    'justify-between',
    isSelected && 'bg-(--select-item-selected-bg)'
  )}
>
```

## Benefits

1. **shadcn/ui Compatible**: Same compound component pattern
2. **Composable**: Mix and match components as needed
3. **Accessible**: Full Radix UI accessibility support
4. **Themeable**: Uses CSS variables for easy customization
5. **Tree-shakeable**: Import only what you need

## Migration from v1.x

### SortDropdownGlass Changes

**Before (v1.x):**

- Manual state management with useState
- Custom click outside/Escape handlers
- Z-index hacks

**After (v2.x):**

- Built on DropdownMenuGlass primitives
- Radix UI handles all interactions
- No z-index issues

The API remains the same - no breaking changes for consumers.

## Related Files

- `src/components/glass/ui/dropdown-menu-glass.tsx` - Compound components
- `src/components/glass/ui/dropdown-glass.tsx` - Simple API wrapper
- `src/components/glass/atomic/sort-dropdown-glass.tsx` - Sort dropdown
- `src/components/glass/ui/combobox-glass.tsx` - Searchable dropdown
- `src/lib/variants/dropdown-content-styles.ts` - Shared styling
