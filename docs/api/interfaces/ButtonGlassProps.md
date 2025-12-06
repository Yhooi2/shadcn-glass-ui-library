[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / ButtonGlassProps

# Interface: ButtonGlassProps

Defined in: [src/components/glass/ui/button-glass.tsx:157](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/button-glass.tsx#L157)

Props for the ButtonGlass component

A glass-themed button with ripple effects, loading states, and icon support.
Features theme-aware styling and hover animations.

## Accessibility

- **Keyboard Navigation:** Fully keyboard accessible with native `<button>` element
- **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
- **Screen Readers:** Semantic `<button>` element, disabled state announced automatically
- **Loading State:** When loading=true, button is disabled and loading spinner is visible
- **Touch Targets:** Minimum 44x44px touch target (WCAG 2.5.5) via size variants
- **Color Contrast:** All variants meet WCAG AA contrast ratio 4.5:1 minimum
- **Motion:** Respects `prefers-reduced-motion` for ripple/shine animations

## Example

```tsx
// Basic button
<ButtonGlass variant="primary">Click me</ButtonGlass>

// With icon and aria-label for icon-only buttons
<ButtonGlass icon={Check} iconPosition="left">Save</ButtonGlass>
<ButtonGlass icon={X} size="icon" aria-label="Close dialog" />

// Loading state (automatically disables and shows spinner)
<ButtonGlass loading aria-live="polite">Processing...</ButtonGlass>

// Different variants
<ButtonGlass variant="ghost">Cancel</ButtonGlass>
<ButtonGlass variant="success">Confirm</ButtonGlass>
<ButtonGlass variant="destructive">Delete</ButtonGlass>

// As a link (asChild pattern) - maintains semantic HTML
<ButtonGlass asChild variant="primary">
  <a href="/dashboard">Go to Dashboard</a>
</ButtonGlass>

// With Next.js Link
<ButtonGlass asChild variant="ghost">
  <Link href="/settings">Settings</Link>
</ButtonGlass>

// Form submit button
<ButtonGlass type="submit" variant="primary">
  Submit Form
</ButtonGlass>
```

## Extends

- `Omit`\<`React.ButtonHTMLAttributes`\<`HTMLButtonElement`\>, `"style"`\>.`VariantProps`\<*typeof* [`buttonGlassVariants`](../variables/buttonGlassVariants.md)\>

## Properties

### asChild?

> `readonly` `optional` **asChild**: `boolean`

Defined in: [src/components/glass/ui/button-glass.tsx:176](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/button-glass.tsx#L176)

Render as child element instead of button (polymorphic rendering).
Useful for rendering buttons as links or other interactive elements.

**Note:** When using `asChild`, decorative effects (ripple, shine, glow)
are disabled to maintain compatibility with Radix UI Slot.
Only styles and event handlers are passed to the child element.

#### Default

```ts
false
```

#### Example

```tsx
<ButtonGlass asChild>
  <a href="/about">About Us</a>
</ButtonGlass>
```

***

### variant?

> `readonly` `optional` **variant**: [`ButtonGlassVariant`](../type-aliases/ButtonGlassVariant.md)

Defined in: [src/components/glass/ui/button-glass.tsx:182](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/button-glass.tsx#L182)

Visual style variant of the button

#### Default

```ts
"primary"
```

#### Overrides

`VariantProps.variant`

***

### loading?

> `readonly` `optional` **loading**: `boolean`

Defined in: [src/components/glass/ui/button-glass.tsx:188](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/button-glass.tsx#L188)

Show loading spinner and disable interactions

#### Default

```ts
false
```

***

### icon?

> `readonly` `optional` **icon**: `LucideIcon`

Defined in: [src/components/glass/ui/button-glass.tsx:194](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/button-glass.tsx#L194)

Icon component from lucide-react to display

#### Example

```ts
icon={Check}
```

***

### iconPosition?

> `readonly` `optional` **iconPosition**: `"left"` \| `"right"`

Defined in: [src/components/glass/ui/button-glass.tsx:200](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/button-glass.tsx#L200)

Position of the icon relative to button text

#### Default

```ts
"left"
```

***

### size?

> `readonly` `optional` **size**: `"sm"` \| `"md"` \| `"lg"` \| `"icon"`

Defined in: [src/components/glass/ui/button-glass.tsx:206](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/button-glass.tsx#L206)

Size variant of the button

#### Default

```ts
"md"
```

#### Overrides

`VariantProps.size`
