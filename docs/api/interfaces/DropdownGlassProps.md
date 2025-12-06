[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / DropdownGlassProps

# Interface: DropdownGlassProps

Defined in: [src/components/glass/ui/dropdown-glass.tsx:208](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/dropdown-glass.tsx#L208)

Props for the DropdownGlass component

A glass-themed dropdown menu with accessible keyboard navigation, based on Radix UI primitives.
Features theme-aware styling, smooth animations, and WCAG-compliant interactions.

## Accessibility

- **Keyboard Navigation:** Arrow keys navigate menu items, Enter/Space activates, Escape closes (WCAG 2.1.1)
- **Focus Management:** Focus trapped within menu when open, returned to trigger on close (WCAG 2.4.3)
- **Screen Readers:** Uses `role="menu"` and `role="menuitem"` for proper menu semantics (WCAG 4.1.3)
- **ARIA Attributes:** Items marked with `data-highlighted` state for screen reader announcement
- **Trigger Association:** Menu automatically associated with trigger button via Radix UI primitives
- **Touch Targets:** All menu items meet minimum 44x44px touch target (WCAG 2.5.5)
- **Color Contrast:** Menu text and backgrounds meet WCAG AA contrast ratio 4.5:1
- **Motion:** Open/close animations respect `prefers-reduced-motion` settings

## Example

```tsx
// Basic dropdown with icon items
<DropdownGlass
  trigger={
    <button aria-label="Open menu">
      <MoreVertical className="w-5 h-5" />
    </button>
  }
  items={[
    { label: 'Edit', icon: Edit, onClick: handleEdit },
    { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true }
  ]}
/>

// Dropdown with dividers and alignment
<DropdownGlass
  trigger={<ButtonGlass>Actions</ButtonGlass>}
  align="right"
  items={[
    { label: 'View', icon: Eye, onClick: () => navigate('/view') },
    { label: 'Edit', icon: Edit, onClick: () => setEditMode(true) },
    { divider: true },
    { label: 'Archive', icon: Archive, onClick: handleArchive },
    { divider: true },
    { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true }
  ]}
/>

// Dropdown in table row (ensure trigger has accessible label)
<DropdownGlass
  trigger={
    <button aria-label={`Actions for ${user.name}`}>
      <MoreHorizontal />
    </button>
  }
  items={[
    { label: 'View Profile', onClick: () => viewProfile(user.id) },
    { label: 'Send Message', onClick: () => sendMessage(user.id) }
  ]}
/>

// Dropdown with keyboard-friendly trigger
<DropdownGlass
  trigger={
    <ButtonGlass
      icon={Settings}
      variant="ghost"
      aria-haspopup="menu"
      aria-label="Settings menu"
    >
      Settings
    </ButtonGlass>
  }
  items={[
    { label: 'Preferences', icon: Sliders, onClick: () => navigate('/settings/preferences') },
    { label: 'Security', icon: Lock, onClick: () => navigate('/settings/security') },
    { divider: true },
    { label: 'Log Out', icon: LogOut, onClick: handleLogout }
  ]}
/>

// Advanced: Using Radix primitives directly (see component JSDoc for examples)
```

## Properties

### trigger

> `readonly` **trigger**: `ReactNode`

Defined in: [src/components/glass/ui/dropdown-glass.tsx:209](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/dropdown-glass.tsx#L209)

***

### items

> `readonly` **items**: readonly [`DropdownItem`](DropdownItem.md)[]

Defined in: [src/components/glass/ui/dropdown-glass.tsx:210](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/dropdown-glass.tsx#L210)

***

### align?

> `readonly` `optional` **align**: `"left"` \| `"right"`

Defined in: [src/components/glass/ui/dropdown-glass.tsx:211](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/dropdown-glass.tsx#L211)

***

### className?

> `readonly` `optional` **className**: `string`

Defined in: [src/components/glass/ui/dropdown-glass.tsx:212](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/dropdown-glass.tsx#L212)
