[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / useWallpaperTint

# Function: useWallpaperTint()

> **useWallpaperTint**(`options`): `WallpaperTintResult`

Defined in: [src/lib/hooks/use-wallpaper-tint.ts:172](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/lib/hooks/use-wallpaper-tint.ts#L172)

Hook to extract and use wallpaper tint color

## Parameters

### options

`WallpaperTintOptions` = `{}`

## Returns

`WallpaperTintResult`

## Example

```tsx
const { tintColor, isLoading } = useWallpaperTint({
  imageUrl: '/path/to/background.jpg',
});

// Use tintColor in CSS variables
<div style={{ '--wallpaper-tint': tintColor }}>
  <GlassCard />
</div>
```
