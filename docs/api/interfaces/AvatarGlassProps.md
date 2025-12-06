[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / AvatarGlassProps

# Interface: AvatarGlassProps

Defined in: [src/components/glass/ui/avatar-glass.tsx:56](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/avatar-glass.tsx#L56)

Props for the AvatarGlass component

A glass-themed avatar component with status indicators and size variants.
Displays user initials with theme-aware styling and optional status badge.

## Example

```tsx
// Basic avatar
<AvatarGlass name="John Doe" />

// With status indicator
<AvatarGlass name="Jane Smith" status="online" size="lg" />

// Different sizes
<AvatarGlass name="Alex" size="sm" />
<AvatarGlass name="Sam" size="xl" />

// As a link (asChild pattern)
<AvatarGlass asChild name="Sarah Connor" status="online">
  <a href="/profile/sarah">View Profile</a>
</AvatarGlass>
```

## Extends

- `Omit`\<`React.HTMLAttributes`\<`HTMLDivElement`\>, `"style"`\>.`VariantProps`\<*typeof* [`avatarSizes`](../variables/avatarSizes.md)\>

## Properties

### asChild?

> `readonly` `optional` **asChild**: `boolean`

Defined in: [src/components/glass/ui/avatar-glass.tsx:70](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/avatar-glass.tsx#L70)

Render as child element instead of div (polymorphic rendering).
Useful for making avatars clickable links.

#### Default

```ts
false
```

#### Example

```tsx
<AvatarGlass asChild name="John">
  <a href="/profile">View Profile</a>
</AvatarGlass>
```

***

### name

> `readonly` **name**: `string`

Defined in: [src/components/glass/ui/avatar-glass.tsx:76](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/avatar-glass.tsx#L76)

Full name of the user. Automatically generates initials (first 2 letters).

#### Example

```ts
"John Doe" → "JD"
```

***

### status?

> `readonly` `optional` **status**: [`AvatarStatus`](../type-aliases/AvatarStatus.md)

Defined in: [src/components/glass/ui/avatar-glass.tsx:82](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/avatar-glass.tsx#L82)

Optional status indicator with glow effect

#### Default

```ts
undefined
```

***

### size?

> `readonly` `optional` **size**: `"sm"` \| `"md"` \| `"lg"` \| `"xl"`

Defined in: [src/components/glass/ui/avatar-glass.tsx:88](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/avatar-glass.tsx#L88)

Size variant of the avatar

#### Default

```ts
"md"
```

#### Overrides

`VariantProps.size`
