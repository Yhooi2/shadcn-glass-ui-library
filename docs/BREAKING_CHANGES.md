# Breaking Changes

This document lists breaking changes in shadcn-glass-ui v2.0.0 and later.

**Current Version:** 2.5.1 (2025-12-21)

> **Note:** As of v2.1.0, all v2.0.0 migrations are complete across the entire codebase. All
> components, examples, and documentation now use the new API.

---

## v2.5.1 — className Behavior Fix (Issue #13)

### Summary

v2.5.1 fixes `className` handling in CheckboxGlass and ToggleGlass to match the shadcn/ui pattern
where `className` applies to the root interactive element, not wrapper elements.

**Bug fix:** `className` was incorrectly applied to wrapper label instead of root element.

**New shadcn/ui aliases added:** Button, Badge, Alert, AlertTitle, AlertDescription, Avatar,
AvatarImage, AvatarFallback, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

---

### CheckboxGlass

**Fixed:** `className` now applies to the checkbox root element (button), not the label wrapper.

**Added:** `wrapperClassName` prop for styling the label wrapper.

```tsx
// className now correctly styles the checkbox root (shadcn/ui pattern)
<CheckboxGlass className="w-8 h-8" label="Accept" />

// Use wrapperClassName for wrapper styling:
<CheckboxGlass wrapperClassName="gap-4 p-2" label="Accept" />
```

---

### ToggleGlass

**Fixed:** `className` now ALWAYS applies to the toggle button, regardless of whether a label is
provided.

**Added:** `wrapperClassName` prop for styling the label wrapper.

```tsx
// className now always styles the toggle button (shadcn/ui pattern)
<ToggleGlass className="w-14 h-8" label="Dark mode" pressed={on} onPressedChange={setOn} />

// Use wrapperClassName for wrapper styling:
<ToggleGlass wrapperClassName="gap-4" label="Dark mode" pressed={on} onPressedChange={setOn} />
```

---

## v2.0.0 — 100% shadcn/ui API Compatibility

### Summary

v2.0.0 achieves **100% API compatibility with shadcn/ui** by standardizing all component APIs to
match shadcn/ui conventions exactly. This release also introduces the 3-layer token architecture,
replacing color-based CSS variable names with semantic names.

**Major changes:**

1. **Component API migrations** — All components now use shadcn/ui naming (onValueChange, pressed,
   etc.)
2. **CSS variable renaming** — Color-based names → semantic names
3. **No backward compatibility** — Legacy APIs removed

---

## Component API Changes

### 1. ButtonGlass

**Removed variants:**

- `variant="primary"` → Use `variant="default"`
- `variant="text"` → Use `variant="link"`
- `size="md"` → Use `size="default"`

```tsx
// Before
<ButtonGlass variant="primary" size="md">Click me</ButtonGlass>
<ButtonGlass variant="text">Link</ButtonGlass>

// After
<ButtonGlass variant="default" size="default">Click me</ButtonGlass>
<ButtonGlass variant="link">Link</ButtonGlass>
```

---

### 2. ToggleGlass

**Removed:** `checked`, `defaultChecked`, `onChange`

**Added:** `pressed`, `defaultPressed`, `onPressedChange`

```tsx
// Before
<ToggleGlass checked={isOn} onChange={(checked) => setIsOn(checked)} />

// After
<ToggleGlass pressed={isOn} onPressedChange={(pressed) => setIsOn(pressed)} />
```

**ARIA changes:** `aria-checked` → `aria-pressed`, `role="checkbox"` → `role="switch"`

---

### 3. SliderGlass

**Removed:** `value: number`, `defaultValue: number`, `onChange(value: number)`

**Added:** `value: number[]`, `defaultValue: number[]`, `onValueChange(value: number[])`

```tsx
// Before
<SliderGlass value={50} onChange={(val) => setValue(val)} />

// After (single value)
<SliderGlass value={[50]} onValueChange={(val) => setValue(val[0])} />

// Range slider (new feature)
<SliderGlass value={[25, 75]} onValueChange={setRange} />
```

**New props:** `onValueCommit`, `orientation`

---

### 4. ComboBoxGlass

**Removed:** `onChange`

**Added:** `onValueChange`

```tsx
// Before
<ComboBoxGlass options={options} value={value} onChange={setValue} />

// After
<ComboBoxGlass options={options} value={value} onValueChange={setValue} />
```

---

### 5. Compound Components (Required)

ModalGlass and TabsGlass require compound component API:

**ModalGlass:**

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Title</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>Content</ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

**TabsGlass:**

```tsx
<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="tab1">Content</TabsGlass.Content>
</TabsGlass.Root>
```

**AlertGlass:**

```tsx
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Message</AlertGlassDescription>
</AlertGlass>
```

---

## CSS Variables Removed

| Removed                   | Replacement                   | Semantic Meaning |
| ------------------------- | ----------------------------- | ---------------- |
| `--metric-emerald-bg`     | `--metric-success-bg`         | Success states   |
| `--metric-emerald-text`   | `--metric-success-text`       | Success states   |
| `--metric-emerald-border` | `--metric-success-border`     | Success states   |
| `--metric-emerald-glow`   | `--metric-success-glow`       | Success states   |
| `--metric-amber-bg`       | `--metric-warning-bg`         | Warning states   |
| `--metric-amber-text`     | `--metric-warning-text`       | Warning states   |
| `--metric-amber-border`   | `--metric-warning-border`     | Warning states   |
| `--metric-amber-glow`     | `--metric-warning-glow`       | Warning states   |
| `--metric-blue-bg`        | `--metric-default-bg`         | Neutral/default  |
| `--metric-blue-text`      | `--metric-default-text`       | Neutral/default  |
| `--metric-blue-border`    | `--metric-default-border`     | Neutral/default  |
| `--metric-blue-glow`      | `--metric-default-glow`       | Neutral/default  |
| `--metric-red-bg`         | `--metric-destructive-bg`     | Error/danger     |
| `--metric-red-text`       | `--metric-destructive-text`   | Error/danger     |
| `--metric-red-border`     | `--metric-destructive-border` | Error/danger     |
| `--metric-red-glow`       | `--metric-destructive-glow`   | Error/danger     |

**Total removed:** 16 variables (4 color families × 4 properties)

---

## Migration Script

```bash
#!/bin/bash

# Component API migrations
find src/ -type f -name "*.tsx" -exec sed -i '' \
  -e 's/variant="primary"/variant="default"/g' \
  -e 's/variant="text"/variant="link"/g' \
  -e 's/size="md"/size="default"/g' \
  -e 's/\bchecked={/pressed={/g' \
  -e 's/defaultChecked=/defaultPressed=/g' \
  {} +

# CSS Variables
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +

echo "⚠️  Manual review required for:"
echo "   - SliderGlass: value={50} → value={[50]}"
echo "   - ToggleGlass: onChange → onPressedChange"
echo "   - ComboBoxGlass: onChange → onValueChange"
```

---

## API Summary Table

| Component         | Old API               | v2.0.0 API                   | Reason                   |
| ----------------- | --------------------- | ---------------------------- | ------------------------ |
| **ButtonGlass**   | `variant="primary"`   | `variant="default"`          | shadcn/ui convention     |
| **ButtonGlass**   | `variant="text"`      | `variant="link"`             | shadcn/ui convention     |
| **ButtonGlass**   | `size="md"`           | `size="default"`             | shadcn/ui convention     |
| **ToggleGlass**   | `checked`, `onChange` | `pressed`, `onPressedChange` | shadcn/ui switch pattern |
| **SliderGlass**   | `value: number`       | `value: number[]`            | Radix UI + range support |
| **SliderGlass**   | `onChange`            | `onValueChange`              | shadcn/ui convention     |
| **ComboBoxGlass** | `onChange`            | `onValueChange`              | shadcn/ui convention     |

---

## Why These Changes?

1. **shadcn/ui alignment** — Matches standard naming conventions
2. **Semantic clarity** — Names describe meaning, not appearance
3. **Component consistency** — Aligns with variant props
4. **3-layer token architecture** — Primitive → Semantic → Component tokens

---

## Related Documentation

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) — Complete token system guide
- [CSS_VARIABLES_MIGRATION_2.0.md](migration/CSS_VARIABLES_MIGRATION_2.0.md) — Detailed CSS
  migration
- [THEME_CREATION_GUIDE.md](THEME_CREATION_GUIDE.md) — Create themes in 15 minutes

---

## Need Help?

- [CHANGELOG.md](../CHANGELOG.md) — Complete version history
- [GitHub Issues](https://github.com/Yhooi2/shadcn-glass-ui-library/issues) — Report migration
  issues

---

**Last updated:** 2025-12-14
