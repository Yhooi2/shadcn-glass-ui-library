[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / TooltipGlassProps

# Interface: TooltipGlassProps

Defined in: [src/components/glass/ui/tooltip-glass.tsx:90](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/tooltip-glass.tsx#L90)

Props for the TooltipGlass component

A glass-themed tooltip with configurable positioning and unified dark design.
Features smooth animations and WCAG-compliant accessibility attributes.

## Accessibility

- **Keyboard Navigation:** Tooltip appears on focus for keyboard users (same as hover)
- **Focus Management:** Tooltip does not trap focus, allows normal navigation flow
- **Screen Readers:** Uses `aria-describedby` to associate tooltip with trigger element (WCAG 4.1.3)
- **ARIA Attributes:** Tooltip marked with `role="tooltip"` and unique ID for proper association
- **Dismissible:** Tooltip dismisses on mouse leave, focus blur, or Escape key
- **Touch Targets:** N/A - tooltips appear on hover/focus, do not require direct interaction
- **Color Contrast:** Tooltip text meets WCAG AA contrast ratio 4.5:1 against dark background
- **Motion:** Fade-in animation respects `prefers-reduced-motion` settings

## Example

```tsx
// Basic tooltip
<TooltipGlass content="Click to edit">
  <button><Edit className="w-4 h-4" /></button>
</TooltipGlass>

// Different positions
<TooltipGlass content="Top tooltip" position="top">
  <ButtonGlass>Hover me</ButtonGlass>
</TooltipGlass>
<TooltipGlass content="Bottom tooltip" position="bottom">
  <ButtonGlass>Hover me</ButtonGlass>
</TooltipGlass>
<TooltipGlass content="Left tooltip" position="left">
  <ButtonGlass>Hover me</ButtonGlass>
</TooltipGlass>
<TooltipGlass content="Right tooltip" position="right">
  <ButtonGlass>Hover me</ButtonGlass>
</TooltipGlass>

// Icon button with accessible tooltip (provides label)
<TooltipGlass content="Delete item">
  <ButtonGlass
    icon={Trash}
    size="icon"
    variant="ghost"
    aria-label="Delete item"
  />
</TooltipGlass>

// Informational tooltip on text
<TooltipGlass content="This feature requires a Pro subscription">
  <span className="underline decoration-dotted">Pro Feature</span>
</TooltipGlass>

// Badge with tooltip for additional context
<TooltipGlass content="Last updated 2 hours ago" position="top">
  <BadgeGlass variant="success" dot>
    Active
  </BadgeGlass>
</TooltipGlass>

// Disabled button with explanation tooltip
<TooltipGlass content="Save your changes first to enable this action">
  <span>
    <ButtonGlass disabled aria-describedby="tooltip-id">
      Export
    </ButtonGlass>
  </span>
</TooltipGlass>
```

## Extends

- `VariantProps`\<*typeof* [`tooltipPositions`](../variables/tooltipPositions.md)\>

## Properties

### children

> `readonly` **children**: `ReactNode`

Defined in: [src/components/glass/ui/tooltip-glass.tsx:91](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/tooltip-glass.tsx#L91)

***

### content

> `readonly` **content**: `string`

Defined in: [src/components/glass/ui/tooltip-glass.tsx:92](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/tooltip-glass.tsx#L92)

***

### position?

> `readonly` `optional` **position**: [`TooltipPosition`](../type-aliases/TooltipPosition.md)

Defined in: [src/components/glass/ui/tooltip-glass.tsx:93](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/tooltip-glass.tsx#L93)

#### Overrides

`VariantProps.position`

***

### className?

> `readonly` `optional` **className**: `string`

Defined in: [src/components/glass/ui/tooltip-glass.tsx:94](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/tooltip-glass.tsx#L94)
