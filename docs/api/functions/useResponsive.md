[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / useResponsive

# Function: useResponsive()

> **useResponsive**(): `UseResponsiveReturn`

Defined in: [src/lib/hooks/use-responsive.ts:47](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/hooks/use-responsive.ts#L47)

Hook to detect current responsive breakpoint

## Returns

`UseResponsiveReturn`

Responsive state with current breakpoint and device type flags

## Example

```tsx
const { isMobile, isTablet, isDesktop, currentBreakpoint } = useResponsive();

return (
  <div className={isMobile ? 'flex-col' : 'flex-row'}>
    {currentBreakpoint === 'lg' && <Sidebar />}
  </div>
);
```
