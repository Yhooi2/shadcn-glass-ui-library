[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / GlassCardProps

# Interface: GlassCardProps

Defined in: [src/components/glass/ui/glass-card.tsx:99](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/glass-card.tsx#L99)

Props for the GlassCard component

A glass-themed container with configurable blur, glow effects, and hover animations.
Features polymorphic rendering via `asChild` for semantic HTML flexibility.

## Accessibility

- **Keyboard Navigation:** When used with `asChild` as a link/button, inherits native keyboard support (Enter/Space activation)
- **Focus Management:** Focus ring applied to child element when using `asChild` pattern with interactive elements
- **Screen Readers:** Semantic HTML preserved via `asChild` - use appropriate elements (`<a>`, `<button>`, `<article>`)
- **Hover State:** Hover effects are purely visual and do not affect functionality (progressive enhancement)
- **Touch Targets:** When interactive, ensure child element meets minimum 44x44px touch target (WCAG 2.5.5)
- **Color Contrast:** Card border and background meet WCAG AA contrast requirements, content contrast is consumer's responsibility
- **Motion:** Hover scale animation respects `prefers-reduced-motion` settings via CSS transitions

## Example

```tsx
// Basic card
<GlassCard intensity="medium">Content</GlassCard>

// As a clickable link with accessible name
<GlassCard asChild intensity="medium">
  <a href="/details" aria-label="View product details">
    <h3>Product Title</h3>
    <p>Description</p>
  </a>
</GlassCard>

// Different intensity levels
<GlassCard intensity="subtle">Subtle blur</GlassCard>
<GlassCard intensity="medium">Standard blur</GlassCard>
<GlassCard intensity="strong">Heavy blur</GlassCard>

// With glow effects
<GlassCard glow="blue">Blue glow card</GlassCard>
<GlassCard glow="violet">Violet glow card</GlassCard>
<GlassCard glow="cyan">Cyan glow card</GlassCard>

// As a button (interactive) with role
<GlassCard asChild hover intensity="medium">
  <button onClick={handleClick} aria-label="Open settings">
    <Settings className="w-6 h-6" />
    <span>Settings</span>
  </button>
</GlassCard>

// Article card with semantic HTML
<GlassCard asChild intensity="medium" padding="lg">
  <article>
    <header><h2>Article Title</h2></header>
    <p>Article content...</p>
    <footer>Published: Jan 1, 2025</footer>
  </article>
</GlassCard>
```

## Extends

- `Omit`\<`React.HTMLAttributes`\<`HTMLDivElement`\>, `"style"`\>.`VariantProps`\<*typeof* [`cardIntensity`](../variables/cardIntensity.md)\>

## Properties

### asChild?

> `readonly` `optional` **asChild**: `boolean`

Defined in: [src/components/glass/ui/glass-card.tsx:113](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/glass-card.tsx#L113)

Render as child element instead of div (polymorphic rendering).
Useful for making cards clickable links or custom interactive elements.

#### Default

```ts
false
```

#### Example

```tsx
<GlassCard asChild>
  <a href="/article">Article Content</a>
</GlassCard>
```

***

### children

> `readonly` **children**: `ReactNode`

Defined in: [src/components/glass/ui/glass-card.tsx:115](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/glass-card.tsx#L115)

#### Overrides

`Omit.children`

***

### glow?

> `readonly` `optional` **glow**: [`GlowType`](../type-aliases/GlowType.md)

Defined in: [src/components/glass/ui/glass-card.tsx:116](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/glass-card.tsx#L116)

***

### padding?

> `readonly` `optional` **padding**: [`PaddingType`](../type-aliases/PaddingType.md)

Defined in: [src/components/glass/ui/glass-card.tsx:117](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/glass-card.tsx#L117)

#### Overrides

`VariantProps.padding`

***

### intensity?

> `optional` **intensity**: `"subtle"` \| `"medium"` \| `"strong"` \| `null`

Defined in: [src/lib/variants/glass-card-variants.ts:15](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/variants/glass-card-variants.ts#L15)

#### Inherited from

`VariantProps.intensity`

***

### hover?

> `optional` **hover**: `boolean` \| `null`

Defined in: [src/lib/variants/glass-card-variants.ts:20](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/variants/glass-card-variants.ts#L20)

#### Inherited from

`VariantProps.hover`
