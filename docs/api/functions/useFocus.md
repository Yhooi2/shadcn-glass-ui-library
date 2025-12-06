[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / useFocus

# Function: useFocus()

> **useFocus**(`options`): `UseFocusReturn`

Defined in: [src/lib/hooks/use-focus.ts:115](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/hooks/use-focus.ts#L115)

Hook for managing focus state with optional focus-visible support.

## Parameters

### options

`UseFocusOptions` = `{}`

## Returns

`UseFocusReturn`

## Examples

```tsx
const { isFocused, focusProps } = useFocus();

return (
  <input
    {...focusProps}
    style={{
      borderColor: isFocused ? 'violet' : 'gray',
    }}
  />
);
```

```tsx
const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });

return (
  <button
    {...focusProps}
    style={{
      outline: isFocusVisible ? '2px solid violet' : 'none',
    }}
  >
    Click or Tab to me
  </button>
);
```
