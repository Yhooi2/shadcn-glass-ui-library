[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / TouchTarget

# Variable: TouchTarget

> `const` **TouchTarget**: `ForwardRefExoticComponent`\<`TouchTargetProps` & `RefAttributes`\<`HTMLDivElement`\>\>

Defined in: [src/components/glass/primitives/touch-target.tsx:62](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/primitives/touch-target.tsx#L62)

TouchTarget wrapper component

Ensures interactive elements meet accessibility standards for touch devices.
Automatically applies minimum dimensions and optional centering.

## Example

```tsx
// Basic usage with default 44px minimum
<TouchTarget>
  <button className="w-8 h-8">×</button>
</TouchTarget>

// Material Design 48px minimum
<TouchTarget minSize={48}>
  <Checkbox />
</TouchTarget>

// Custom alignment
<TouchTarget center={false} className="justify-start">
  <IconButton />
</TouchTarget>
```
