[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / InputGlassProps

# Interface: InputGlassProps

Defined in: [src/components/glass/ui/input-glass.tsx:121](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/input-glass.tsx#L121)

Props for the InputGlass component

A glass-themed input field with labels, validation states, and icon support.
Features focus glow effects and theme-aware styling.

## Accessibility

- **Keyboard Navigation:** Full keyboard support with native `<input>` element, standard tab navigation
- **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
- **Screen Readers:** Semantic `<label>` elements properly associated via `htmlFor`, error/success messages announced with `aria-describedby`
- **Error State:** Red border and error message displayed below input, programmatically associated for screen readers
- **Success State:** Green border and success message displayed below input, programmatically associated for screen readers
- **Touch Targets:** Minimum 44x44px touch target on mobile devices (WCAG 2.5.5)
- **Color Contrast:** All text meets WCAG AA contrast ratio 4.5:1 minimum against backgrounds
- **Motion:** Icon color transitions respect `prefers-reduced-motion` settings

## Example

```tsx
// Basic input with label
<InputGlass label="Email" placeholder="you@example.com" />

// With aria-describedby for additional context
<InputGlass
  label="Username"
  placeholder="Enter username"
  aria-describedby="username-help"
/>
<span id="username-help">Must be 3-20 characters</span>

// With validation states (automatically announced to screen readers)
<InputGlass label="Username" error="Username is required" />
<InputGlass label="Password" success="Strong password" type="password" />

// With icon and accessible label
<InputGlass
  icon={Search}
  placeholder="Search..."
  aria-label="Search products"
/>
<InputGlass icon={Mail} iconPosition="right" type="email" />

// Disabled state (automatically announced)
<InputGlass label="Email" disabled value="locked@example.com" />

// Form integration with accessible error handling
<form onSubmit={handleSubmit}>
  <InputGlass
    label="Email"
    type="email"
    required
    error={errors.email}
    aria-invalid={!!errors.email}
  />
  <InputGlass
    label="Password"
    type="password"
    icon={Lock}
    error={errors.password}
  />
  <ButtonGlass type="submit">Sign In</ButtonGlass>
</form>
```

## Extends

- `Omit`\<`InputHTMLAttributes`\<`HTMLInputElement`\>, `"size"`\>.`VariantProps`\<*typeof* [`inputVariants`](../variables/inputVariants.md)\>

## Properties

### label?

> `readonly` `optional` **label**: `string`

Defined in: [src/components/glass/ui/input-glass.tsx:127](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/input-glass.tsx#L127)

Label text displayed above the input field

***

### error?

> `readonly` `optional` **error**: `string`

Defined in: [src/components/glass/ui/input-glass.tsx:132](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/input-glass.tsx#L132)

Error message to display below the input (red styling)

***

### success?

> `readonly` `optional` **success**: `string`

Defined in: [src/components/glass/ui/input-glass.tsx:137](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/input-glass.tsx#L137)

Success message to display below the input (green styling)

***

### icon?

> `readonly` `optional` **icon**: `LucideIcon`

Defined in: [src/components/glass/ui/input-glass.tsx:143](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/input-glass.tsx#L143)

Icon component from lucide-react to display

#### Example

```ts
icon={Search}
```

***

### iconPosition?

> `readonly` `optional` **iconPosition**: `"left"` \| `"right"`

Defined in: [src/components/glass/ui/input-glass.tsx:149](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/input-glass.tsx#L149)

Position of the icon relative to input text

#### Default

```ts
"left"
```

***

### ~~inputSize?~~

> `readonly` `optional` **inputSize**: `"sm"` \| `"md"` \| `"lg"`

Defined in: [src/components/glass/ui/input-glass.tsx:155](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/input-glass.tsx#L155)

#### Deprecated

Use `size` prop instead. Will be removed in v4.0

#### Default

```ts
"md"
```

***

### size?

> `optional` **size**: `"sm"` \| `"md"` \| `"lg"` \| `null`

Defined in: [src/lib/variants/input-glass-variants.ts:14](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/variants/input-glass-variants.ts#L14)

#### Inherited from

`VariantProps.size`
