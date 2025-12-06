[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / AlertGlassProps

# Interface: AlertGlassProps

Defined in: [src/components/glass/ui/alert-glass.tsx:162](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/alert-glass.tsx#L162)

Props for the AlertGlass component

A glass-themed alert with semantic variants, dismissible option, and automatic icon selection.
Features theme-aware styling and WCAG-compliant role attributes.

## Accessibility

- **Keyboard Navigation:** Dismissible alerts include a keyboard-accessible close button (Tab + Enter/Space)
- **Focus Management:** Close button receives visible focus ring (WCAG 2.4.7)
- **Screen Readers:** Uses `role="alert"` for immediate announcement to screen readers (WCAG 4.1.3)
- **Icon Semantics:** Icons are decorative and hidden from screen readers with `aria-hidden="true"`
- **Variant Semantics:** Each variant uses distinct colors and icons for multi-modal communication (color + icon)
- **Touch Targets:** Dismiss button meets minimum 44x44px touch target (WCAG 2.5.5)
- **Color Contrast:** All variant text and backgrounds meet WCAG AA contrast ratio 4.5:1
- **Motion:** Transitions respect `prefers-reduced-motion` settings

## Example

```tsx
// Basic alert (info/default variant)
<AlertGlass title="Information" variant="default">
  This is an informational message
</AlertGlass>

// Error alert with aria-live for dynamic updates
<AlertGlass variant="destructive" title="Error" aria-live="assertive">
  Your session has expired. Please log in again.
</AlertGlass>

// Success alert
<AlertGlass variant="success" title="Success">
  Your changes have been saved successfully.
</AlertGlass>

// Warning alert
<AlertGlass variant="warning" title="Warning">
  Your subscription expires in 3 days.
</AlertGlass>

// Dismissible alert with accessible close button
<AlertGlass
  variant="default"
  title="Welcome"
  dismissible
  onDismiss={() => setShowAlert(false)}
>
  Check out our new features!
</AlertGlass>

// Alert without title
<AlertGlass variant="destructive">
  Quick error message without title
</AlertGlass>

// Form validation alert
<form onSubmit={handleSubmit}>
  {formError && (
    <AlertGlass variant="destructive" title="Validation Error" role="alert">
      {formError}
    </AlertGlass>
  )}
  <InputGlass label="Email" />
  <ButtonGlass type="submit">Submit</ButtonGlass>
</form>
```

## Extends

- `Omit`\<`React.HTMLAttributes`\<`HTMLDivElement`\>, `"style"` \| `"title"`\>.`VariantProps`\<*typeof* [`alertVariants`](../variables/alertVariants.md)\>

## Properties

### title?

> `readonly` `optional` **title**: `string`

Defined in: [src/components/glass/ui/alert-glass.tsx:165](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/alert-glass.tsx#L165)

***

### children

> `readonly` **children**: `ReactNode`

Defined in: [src/components/glass/ui/alert-glass.tsx:166](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/alert-glass.tsx#L166)

#### Overrides

`Omit.children`

***

### dismissible?

> `readonly` `optional` **dismissible**: `boolean`

Defined in: [src/components/glass/ui/alert-glass.tsx:167](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/alert-glass.tsx#L167)

***

### onDismiss()?

> `readonly` `optional` **onDismiss**: () => `void`

Defined in: [src/components/glass/ui/alert-glass.tsx:168](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/alert-glass.tsx#L168)

#### Returns

`void`

***

### variant?

> `optional` **variant**: `"default"` \| `"error"` \| `"destructive"` \| `"success"` \| `"warning"` \| `"info"` \| `null`

Defined in: [src/lib/variants/alert-glass-variants.ts:27](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/variants/alert-glass-variants.ts#L27)

#### Inherited from

`VariantProps.variant`
