[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / useHover

# Function: useHover()

> **useHover**(`options`): `UseHoverReturn`

Defined in: [src/lib/hooks/use-hover.ts:74](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/hooks/use-hover.ts#L74)

Hook for managing hover state with optional delays and focus support.

## Parameters

### options

`UseHoverOptions` = `{}`

## Returns

`UseHoverReturn`

## Examples

```tsx
const { isHovered, hoverProps } = useHover();

return (
  <div
    {...hoverProps}
    style={{ opacity: isHovered ? 1 : 0.8 }}
  >
    Hover me
  </div>
);
```

```tsx
const { isHovered, hoverProps } = useHover({
  enterDelay: 100,
  leaveDelay: 200,
  includeFocus: true,
  onHoverChange: (hover) => console.log('Hovered:', hover),
});
```
