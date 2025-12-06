[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / BadgeGlassProps

# Interface: BadgeGlassProps

Defined in: [src/components/glass/ui/badge-glass.tsx:141](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/badge-glass.tsx#L141)

Props for the BadgeGlass component

A glass-themed badge with semantic variants and optional animated status dot.
Features shadcn/ui compatible variants plus extended Glass UI variants.

## Accessibility

- **Keyboard Navigation:** Badges are non-interactive by default (display-only)
- **Focus Management:** N/A - badges do not receive focus unless wrapped in interactive elements
- **Screen Readers:** Semantic `<span>` element, content announced naturally
- **Status Indicators:** Use `aria-label` to provide context for status badges (e.g., "Status: Active")
- **Animated Dot:** Pulse animation respects `prefers-reduced-motion` settings
- **Touch Targets:** N/A for display badges, ensure 44x44px if wrapping in button/link (WCAG 2.5.5)
- **Color Contrast:** All variant text meets WCAG AA contrast ratio 4.5:1 against badge background
- **Motion:** Dot pulse animation can be disabled for users with motion sensitivity

## Example

```tsx
// Basic badge with variant
<BadgeGlass variant="default">New</BadgeGlass>

// Status badge with aria-label for screen readers
<BadgeGlass variant="success" aria-label="Status: Active">
  Active
</BadgeGlass>

// Different variants (shadcn/ui compatible)
<BadgeGlass variant="default">Default</BadgeGlass>
<BadgeGlass variant="secondary">Secondary</BadgeGlass>
<BadgeGlass variant="destructive">Error</BadgeGlass>
<BadgeGlass variant="outline">Outline</BadgeGlass>

// Extended Glass UI variants
<BadgeGlass variant="success">Success</BadgeGlass>
<BadgeGlass variant="warning">Warning</BadgeGlass>
<BadgeGlass variant="info">Info</BadgeGlass>

// With animated status dot
<BadgeGlass variant="success" dot aria-label="Status: Online">
  Online
</BadgeGlass>
<BadgeGlass variant="destructive" dot aria-label="Status: Offline">
  Offline
</BadgeGlass>

// Size variants
<BadgeGlass size="sm">Small</BadgeGlass>
<BadgeGlass size="md">Medium</BadgeGlass>
<BadgeGlass size="lg">Large</BadgeGlass>

// Inside interactive elements (ensure accessible labels)
<button aria-label="Filter by active status">
  Filter: <BadgeGlass variant="success">Active</BadgeGlass>
</button>

// Count badge with semantic meaning
<div>
  <span>Notifications</span>
  <BadgeGlass variant="destructive" aria-label="3 unread notifications">
    3
  </BadgeGlass>
</div>
```

## Extends

- `Omit`\<`React.HTMLAttributes`\<`HTMLSpanElement`\>, `"style"`\>.`VariantProps`\<*typeof* [`badgeVariants`](../variables/badgeVariants.md)\>

## Properties

### children

> `readonly` **children**: `ReactNode`

Defined in: [src/components/glass/ui/badge-glass.tsx:144](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/badge-glass.tsx#L144)

#### Overrides

`Omit.children`

***

### variant?

> `readonly` `optional` **variant**: [`BadgeVariant`](../type-aliases/BadgeVariant.md)

Defined in: [src/components/glass/ui/badge-glass.tsx:145](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/badge-glass.tsx#L145)

***

### dot?

> `readonly` `optional` **dot**: `boolean`

Defined in: [src/components/glass/ui/badge-glass.tsx:146](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/badge-glass.tsx#L146)

***

### size?

> `optional` **size**: `"sm"` \| `"md"` \| `"lg"` \| `null`

Defined in: [src/lib/variants/badge-glass-variants.ts:24](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/variants/badge-glass-variants.ts#L24)

#### Inherited from

`VariantProps.size`
