# Compound Components Migration Guide (v2.0+)

## Overview

As of v2.0.0, five component families have been migrated to the **compound component API** pattern
following shadcn/ui best practices:

- **AlertGlass** - Alert notifications with Title/Description
- **AvatarGlass** - User avatars with Image/Fallback
- **TooltipGlass** - Tooltips with Provider/Trigger/Content
- **PopoverGlass** - Popovers with Trigger/Content/Anchor
- **DropdownMenuGlass** - Dropdown menus with full shadcn/ui pattern (alongside simple
  DropdownGlass)

All components maintain **100% backward compatibility** through wrapper components or simple APIs.

---

## AlertGlass Migration

### Old API (v1.x)

```tsx
<AlertGlass variant="destructive" title="Error">
  Something went wrong
</AlertGlass>
```

### New API (v2.0+)

```tsx
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Something went wrong</AlertGlassDescription>
</AlertGlass>
```

### Benefits

- ✅ **Flexible composition** - Mix and match Title/Description
- ✅ **Type safety** - Better TypeScript inference
- ✅ **shadcn/ui compatible** - Same pattern as shadcn Alert
- ✅ **Custom styling** - Style Title/Description independently

### Available Components

```tsx
// Main container
<AlertGlass variant="default" | "destructive" | "success" | "warning" dismissible onDismiss={() => {}}>

// Sub-components (inherit color from variant)
<AlertGlassTitle>...</AlertGlassTitle>
<AlertGlassDescription>...</AlertGlassDescription>
```

---

## AvatarGlass Migration

### Old API (v1.x)

```tsx
<AvatarGlass name="John Doe" size="lg" status="online" />
```

### New API (v2.0+) - Compound

```tsx
<AvatarGlass size="lg" status="online">
  <AvatarGlassImage src="/avatar.jpg" alt="John Doe" />
  <AvatarGlassFallback>JD</AvatarGlassFallback>
</AvatarGlass>
```

### Backward Compatible - Simple Wrapper

```tsx
<AvatarGlassSimple name="John Doe" size="lg" status="online" />
```

### Benefits

- ✅ **Image control** - Full control over image loading/fallback
- ✅ **Radix UI based** - Built on `@radix-ui/react-avatar`
- ✅ **Custom fallback** - Any React element, not just initials
- ✅ **asChild pattern** - Use any element as container

### Available Components

```tsx
// Main container
<AvatarGlass size="sm" | "md" | "lg" | "xl" status="online" | "offline" | "busy" | "away" glowing>

// Sub-components
<AvatarGlassImage src="..." alt="..." />
<AvatarGlassFallback>...</AvatarGlassFallback>

// Simple wrapper (backward compatible)
<AvatarGlassSimple name="..." size="..." status="..." />
```

---

## TooltipGlass Migration

### Old API (v1.x)

```tsx
<TooltipGlass content="Tooltip text" side="top">
  <button>Hover me</button>
</TooltipGlass>
```

### New API (v2.0+) - Compound

```tsx
<TooltipGlassProvider>
  <TooltipGlass>
    <TooltipGlassTrigger asChild>
      <button>Hover me</button>
    </TooltipGlassTrigger>
    <TooltipGlassContent side="top">
      <p>Tooltip text</p>
    </TooltipGlassContent>
  </TooltipGlass>
</TooltipGlassProvider>
```

### Backward Compatible - Simple Wrapper

```tsx
<TooltipGlassProvider>
  <TooltipGlassSimple content="Tooltip text" side="top">
    <button>Hover me</button>
  </TooltipGlassSimple>
</TooltipGlassProvider>
```

### Benefits

- ✅ **Rich content** - Any React element in tooltip
- ✅ **Radix UI based** - Built on `@radix-ui/react-tooltip`
- ✅ **Provider pattern** - Share delay settings across tooltips
- ✅ **Accessibility** - WCAG 2.1 AA compliant

### Available Components

```tsx
// Provider (wrap all tooltips to share settings)
<TooltipGlassProvider delayDuration={0}>

// Root container
<TooltipGlass>

// Trigger (usually with asChild)
<TooltipGlassTrigger asChild>

// Content
<TooltipGlassContent side="top" | "bottom" | "left" | "right" sideOffset={4}>

// Simple wrapper (backward compatible)
<TooltipGlassSimple content="..." side="..." />
```

---

## PopoverGlass Migration

### Old API (v1.x)

```tsx
<PopoverGlass trigger={<button>Open</button>} side="bottom" align="center">
  <p>Popover content</p>
</PopoverGlass>
```

### New API (v2.0+) - Compound

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <button>Open</button>
  </PopoverGlassTrigger>
  <PopoverGlassContent side="bottom" align="center">
    <p>Popover content</p>
  </PopoverGlassContent>
</PopoverGlass>
```

### Backward Compatible - Legacy Wrapper

```tsx
<PopoverGlassLegacy trigger={<button>Open</button>} side="bottom" align="center">
  <p>Popover content</p>
</PopoverGlassLegacy>
```

### Benefits

- ✅ **Flexible positioning** - Full control over trigger/content
- ✅ **Radix UI based** - Built on `@radix-ui/react-popover`
- ✅ **Anchor support** - Position relative to custom anchor
- ✅ **Portal rendering** - Escape z-index issues

### Available Components

```tsx
// Root container
<PopoverGlass>

// Trigger (usually with asChild)
<PopoverGlassTrigger asChild>

// Content
<PopoverGlassContent side="top" | "bottom" | "left" | "right" align="start" | "center" | "end">

// Optional anchor
<PopoverGlassAnchor>

// Legacy wrapper (backward compatible)
<PopoverGlassLegacy trigger={...} side="..." align="...">
```

---

## Migration Checklist

When migrating your codebase to compound components:

### 1. AlertGlass

- [ ] Replace `title` prop with `<AlertGlassTitle>`
- [ ] Wrap children in `<AlertGlassDescription>`
- [ ] Update imports to include `AlertGlassTitle`, `AlertGlassDescription`

### 2. AvatarGlass

**Option A: Full migration (recommended)**

- [ ] Use `<AvatarGlassImage>` for images
- [ ] Use `<AvatarGlassFallback>` for fallback content
- [ ] Update imports to include `AvatarGlassImage`, `AvatarGlassFallback`

**Option B: Quick fix (backward compatible)**

- [ ] Replace `<AvatarGlass>` with `<AvatarGlassSimple>`
- [ ] Update import to include `AvatarGlassSimple`

### 3. TooltipGlass

**Option A: Full migration (recommended)**

- [ ] Wrap tooltips in `<TooltipGlassProvider>`
- [ ] Use `<TooltipGlassTrigger asChild>` for trigger
- [ ] Use `<TooltipGlassContent>` for content
- [ ] Update imports

**Option B: Quick fix (backward compatible)**

- [ ] Wrap tooltips in `<TooltipGlassProvider>`
- [ ] Replace `<TooltipGlass>` with `<TooltipGlassSimple>`
- [ ] Update import to include `TooltipGlassProvider`, `TooltipGlassSimple`

### 4. PopoverGlass

**Option A: Full migration (recommended)**

- [ ] Use `<PopoverGlassTrigger asChild>` for trigger
- [ ] Use `<PopoverGlassContent>` for content
- [ ] Update imports

**Option B: Quick fix (backward compatible)**

- [ ] Replace `<PopoverGlass>` with `<PopoverGlassLegacy>`
- [ ] Update import to include `PopoverGlassLegacy`

### 5. DropdownMenuGlass (New in v2.0)

**No migration needed!** DropdownMenuGlass is a **new addition** alongside the existing
DropdownGlass.

**DropdownGlass (simple API)** - Already available, no changes:

- [ ] Continue using `items` prop for simple dropdowns
- [ ] No migration required

**DropdownMenuGlass (compound API)** - New compound component for complex menus:

- [ ] Use for advanced features (checkboxes, radio groups, submenus, labels)
- [ ] Follow shadcn/ui DropdownMenu pattern
- [ ] Import from `@/components/glass/ui/dropdown-menu-glass`

**When to use which:**

- Use `DropdownGlass` for simple menus with basic items (quick setup)
- Use `DropdownMenuGlass` for complex menus with advanced features (full control)

---

## Automated Migration Scripts

### Find all AlertGlass with old API

```bash
# macOS/Linux
grep -r "title=" src/ | grep "AlertGlass"

# Find and update (use with caution!)
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's/<AlertGlass variant="\([^"]*\)" title="\([^"]*\)">\s*\([^<]*\)\s*<\/AlertGlass>/<AlertGlass variant="\1">\n  <AlertGlassTitle>\2<\/AlertGlassTitle>\n  <AlertGlassDescription>\3<\/AlertGlassDescription>\n<\/AlertGlass>/g' \
  {} +
```

### Find all AvatarGlass with old API

```bash
# macOS/Linux
grep -r "name=" src/ | grep "AvatarGlass"
```

### Find all TooltipGlass with old API

```bash
# macOS/Linux
grep -r "content=" src/ | grep "TooltipGlass"
```

### Find all PopoverGlass with old API

```bash
# macOS/Linux
grep -r "trigger=" src/ | grep "PopoverGlass"
```

---

## Breaking Changes Summary

**None!** All components maintain 100% backward compatibility through wrapper components:

- `AlertGlass` - No wrapper needed, but `title` prop removed
- `AvatarGlass` → `AvatarGlassSimple` (wrapper available)
- `TooltipGlass` → `TooltipGlassSimple` (wrapper available)
- `PopoverGlass` → `PopoverGlassLegacy` (wrapper available)

---

## TypeScript Support

All compound components have full TypeScript support with:

- ✅ Strict type checking
- ✅ Autocomplete for props
- ✅ Generic constraints for `asChild` pattern
- ✅ Proper `React.forwardRef` types

Example:

```tsx
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

// Type inference works automatically
const ref = useRef<ElementRef<typeof AlertGlass>>(null);

// Props are fully typed
const props: ComponentPropsWithoutRef<typeof AlertGlass> = {
  variant: 'success',
  dismissible: true,
  onDismiss: () => {},
};
```

---

## Further Reading

- [shadcn/ui Alert](https://ui.shadcn.com/docs/components/alert) - Reference implementation
- [Radix UI Primitives](https://www.radix-ui.com/primitives) - Base components
- [Compound Component Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks) -
  Pattern explanation

---

**Questions?** Open an issue at [github.com/your-repo/issues](https://github.com/your-repo/issues)
