# Breaking Changes

This document lists all breaking changes across major versions of shadcn-glass-ui, with migration
guides and automated scripts.

---

## Table of Contents

- [v2.0.0 — CSS Variables (Token Architecture)](#v200--css-variables-token-architecture)
- [v1.0.0 — API Standardization](#v100--api-standardization)
- [Migration Scripts](#migration-scripts)

---

## v2.0.0 — 100% shadcn/ui API Compatibility + Token Architecture

**Release Date:** 2025-12-14

### Summary

v2.0.0 achieves **100% API compatibility with shadcn/ui** by standardizing all component APIs to
match shadcn/ui conventions exactly. This release also introduces the 3-layer token architecture,
replacing color-based CSS variable names with semantic names.

**Major changes:**

1. **Component API migrations** — All components now use shadcn/ui naming (onValueChange, pressed,
   etc.)
2. **CSS variable renaming** — Color-based names → semantic names
3. **Breaking changes** — No backward compatibility for legacy APIs

---

### Component API Changes (shadcn/ui Compatibility)

All components have been migrated to match shadcn/ui API conventions exactly.

#### 1. ButtonGlass — `variant` prop standardization

**Removed variants:**

- `variant="primary"` → Use `variant="default"`
- `variant="text"` → Use `variant="link"`

**Removed size:**

- `size="md"` → Use `size="default"`

**Added variant:**

- `variant="outline"` (new)

**Migration:**

```tsx
// Before v2.0
<ButtonGlass variant="primary" size="md">Click me</ButtonGlass>
<ButtonGlass variant="text">Link</ButtonGlass>

// After v2.0
<ButtonGlass variant="default" size="default">Click me</ButtonGlass>
<ButtonGlass variant="link">Link</ButtonGlass>
```

---

#### 2. ToggleGlass — `pressed` state (shadcn/ui convention)

**Removed:** `checked`, `defaultChecked`, `onChange`

**Added:** `pressed`, `defaultPressed`, `onPressedChange`

**Migration:**

```tsx
// Before v2.0
<ToggleGlass
  checked={isOn}
  onChange={(checked) => setIsOn(checked)}
  size="md"
/>

// After v2.0
<ToggleGlass
  pressed={isOn}
  onPressedChange={(pressed) => setIsOn(pressed)}
  size="default"
/>
```

**ARIA changes:**

- `aria-checked` → `aria-pressed`
- `role="checkbox"` → `role="switch"`

---

#### 3. SliderGlass — Array-based values (Radix UI pattern)

**Removed:** `value: number`, `defaultValue: number`, `onChange(value: number)`

**Added:** `value: number[]`, `defaultValue: number[]`, `onValueChange(value: number[])`

**Migration:**

```tsx
// Before v2.0
<SliderGlass
  value={50}
  onChange={(val) => setValue(val)}
  min={0}
  max={100}
/>

// After v2.0
<SliderGlass
  value={[50]}
  onValueChange={(val) => setValue(val[0])}
  min={0}
  max={100}
/>

// Range slider (new feature in v2.0)
<SliderGlass
  value={[25, 75]}
  onValueChange={setRange}
/>
```

**New props:**

- `onValueCommit` — Callback when user finishes dragging (mouse up)
- `orientation` — `'horizontal' | 'vertical'`

---

#### 4. ComboBoxGlass — `onValueChange` (shadcn/ui convention)

**Removed:** `onChange`

**Added:** `onValueChange`

**Migration:**

```tsx
// Before v2.0
<ComboBoxGlass
  options={options}
  value={value}
  onChange={setValue}
/>

// After v2.0
<ComboBoxGlass
  options={options}
  value={value}
  onValueChange={setValue}
/>
```

---

### Component API Summary

| Component         | v1.x API              | v2.0 API                     | Reason                   |
| ----------------- | --------------------- | ---------------------------- | ------------------------ |
| **ButtonGlass**   | `variant="primary"`   | `variant="default"`          | shadcn/ui convention     |
| **ButtonGlass**   | `variant="text"`      | `variant="link"`             | shadcn/ui convention     |
| **ButtonGlass**   | `size="md"`           | `size="default"`             | shadcn/ui convention     |
| **ToggleGlass**   | `checked`, `onChange` | `pressed`, `onPressedChange` | shadcn/ui switch pattern |
| **SliderGlass**   | `value: number`       | `value: number[]`            | Radix UI + range support |
| **SliderGlass**   | `onChange`            | `onValueChange`              | shadcn/ui convention     |
| **ComboBoxGlass** | `onChange`            | `onValueChange`              | shadcn/ui convention     |

---

### CSS Variables REMOVED

| Removed (v1.x)            | Replacement (v2.0+)           | Semantic Meaning |
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

**Total removed:** 16 variables (4 color families x 4 properties)

### Migration

**Before (v1.x):**

```css
.my-component {
  background: var(--metric-emerald-bg);
  color: var(--metric-amber-text);
  box-shadow: var(--metric-blue-glow);
  border: 1px solid var(--metric-red-border);
}
```

**After (v2.0.0):**

```css
.my-component {
  background: var(--metric-success-bg);
  color: var(--metric-warning-text);
  box-shadow: var(--metric-default-glow);
  border: 1px solid var(--metric-destructive-border);
}
```

### Automated Migration

```bash
# macOS/Linux
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +
```

```bash
# Linux (GNU sed)
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) -exec sed -i \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +
```

### Why This Change?

1. **shadcn/ui alignment** — Matches standard naming conventions (`destructive`, `success`,
   `warning`)
2. **Semantic clarity** — Names describe _meaning_, not _color_ (what if your success color is
   blue?)
3. **Component consistency** — Aligns with variant props (`variant="destructive"`, not
   `variant="red"`)
4. **3-layer token architecture** — Part of the new primitive → semantic → component token system

### Related Documentation

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) — Complete token system guide
- [CSS_VARIABLES_MIGRATION_2.0.md](migration/CSS_VARIABLES_MIGRATION_2.0.md) — Detailed migration
  guide
- [THEME_CREATION_GUIDE.md](THEME_CREATION_GUIDE.md) — Create themes in 15 minutes

---

## v1.0.0 — API Standardization

**Release Date:** 2025-12-05

### Summary

v1.0.0 standardizes all component APIs to match shadcn/ui conventions. Legacy APIs have been
**completely removed** (no deprecation period).

---

### 1. SelectGlass — REMOVED

**Status:** Component removed entirely

**Migration:** Use `ComboBoxGlass` instead

```tsx
// Before (v0.x)
<SelectGlass
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
  value={value}
  onChange={setValue}
/>

// After (v1.0.0)
<ComboBoxGlass
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
  value={value}
  onChange={setValue}
/>
```

**Why?** ComboBoxGlass provides better performance, search functionality, and shadcn/ui
compatibility.

---

### 2. ModalGlass — Compound API Only

**Removed:** Legacy props API (`isOpen`, `onClose`, `title`)

**Required:** Compound component API

```tsx
// Before (v0.x) - REMOVED
<ModalGlass
  isOpen={open}
  onClose={() => setOpen(false)}
  title="My Modal"
>
  Content here
</ModalGlass>

// After (v1.0.0) - Required
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>My Modal</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>
      Content here
    </ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

**Prop changes:** | Old (v0.x) | New (v1.0.0) | |------------|--------------| | `isOpen` | `open`
(on ModalGlass.Root) | | `onClose` | `onOpenChange={(open) => ...}` | | `title` |
`<ModalGlass.Title>` component |

**Migration Guide:** [modal-glass-compound-api.md](migration/modal-glass-compound-api.md)

---

### 3. TabsGlass — Compound API Only

**Removed:** Legacy props API (`tabs`, `activeTab`, `onChange`)

**Required:** Compound component API

```tsx
// Before (v0.x) - REMOVED
<TabsGlass
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'settings', label: 'Settings' },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>

// After (v1.0.0) - Required
<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
    <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="overview">
    <OverviewPanel />
  </TabsGlass.Content>

  <TabsGlass.Content value="settings">
    <SettingsPanel />
  </TabsGlass.Content>
</TabsGlass.Root>
```

**Prop changes:** | Old (v0.x) | New (v1.0.0) | |------------|--------------| | `tabs` array |
Individual `<TabsGlass.Trigger>` components | | `activeTab` | `value` (on TabsGlass.Root) | |
`onChange` | `onValueChange` |

**Migration Guide:** [tabs-glass-compound-api.md](migration/tabs-glass-compound-api.md)

---

### 4. ButtonGlass — `danger` → `destructive`

**Removed:** `variant="danger"`

**Replacement:** `variant="destructive"`

```tsx
// Before (v0.x)
<ButtonGlass variant="danger">Delete</ButtonGlass>

// After (v1.0.0)
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

**Why?** Aligns with shadcn/ui standard variant naming.

---

### 5. AlertGlass — `type` → `variant`

**Removed:** `type` prop

**Replacement:** `variant` prop (compound component API in v2.0+)

```tsx
// Before (v0.x) - type prop
<AlertGlass type="error" title="Error">Message</AlertGlass>
<AlertGlass type="info" title="Info">Message</AlertGlass>

// v1.0.0 - variant prop
<AlertGlass variant="destructive" title="Error">Message</AlertGlass>
<AlertGlass variant="default" title="Info">Message</AlertGlass>

// v2.0.0+ - compound API (current)
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Message</AlertGlassDescription>
</AlertGlass>
```

**Mapping:** | Old `type` | New `variant` | |------------|---------------| | `info` | `default` | |
`error` | `destructive` | | `success` | `success` | | `warning` | `warning` |

---

### 6. NotificationGlass — `type` → `variant`

Same changes as AlertGlass.

```tsx
// Before (v0.x)
<NotificationGlass type="error" title="Error" message="..." onClose={...} />

// After (v1.0.0)
<NotificationGlass variant="destructive" title="Error" message="..." onClose={...} />
```

---

## Migration Scripts

### Full v0.x → v1.0.0 Migration

```bash
#!/bin/bash

# 1. Replace ButtonGlass danger → destructive
find src/ -name "*.tsx" -exec sed -i '' \
  's/variant="danger"/variant="destructive"/g' {} +

# 2. Replace AlertGlass/NotificationGlass type → variant
find src/ -name "*.tsx" -exec sed -i '' \
  -e 's/type="info"/variant="default"/g' \
  -e 's/type="error"/variant="destructive"/g' \
  -e 's/type="success"/variant="success"/g' \
  -e 's/type="warning"/variant="warning"/g' \
  {} +

# 3. Manual migration required for:
#    - SelectGlass → ComboBoxGlass
#    - ModalGlass legacy API → Compound API
#    - TabsGlass legacy API → Compound API
```

### Full v1.x → v2.0.0 Migration

```bash
#!/bin/bash

# 1. Component API migrations

# ButtonGlass: variant prop changes
find src/ -type f -name "*.tsx" -exec sed -i '' \
  -e 's/variant="primary"/variant="default"/g' \
  -e 's/variant="text"/variant="link"/g' \
  -e 's/size="md"/size="default"/g' \
  {} +

# ToggleGlass: checked → pressed
find src/ -type f -name "*.tsx" -exec sed -i '' \
  -e 's/\bChecked={/pressed={/g' \
  -e 's/defaultChecked=/defaultPressed=/g' \
  -e 's/onChange={(checked)/onPressedChange={(pressed)/g' \
  -e 's/onChange={(\([^)]*\))}/onPressedChange={\1}/g' \
  {} +

# SliderGlass: value → value[], onChange → onValueChange
# WARNING: Manual review required for array conversion
echo "⚠️  MANUAL MIGRATION REQUIRED for SliderGlass:"
echo "   - value={50} → value={[50]}"
echo "   - onChange={(val) => setValue(val)} → onValueChange={(val) => setValue(val[0])}"

# ComboBoxGlass: onChange → onValueChange
find src/ -type f -name "*.tsx" -exec sed -i '' \
  -e 's/<ComboBoxGlass\([^>]*\)onChange=/<ComboBoxGlass\1onValueChange=/g' \
  {} +

# 2. CSS Variables: color names → semantic names
find src/ -type f \( -name "*.tsx" -o -name "*.css" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +

echo "✅ Migration complete! Run tests and fix SliderGlass manually."
```

**Linux (GNU sed):**

```bash
#!/bin/bash

# Same as above but without '' after -i
find src/ -type f -name "*.tsx" -exec sed -i \
  -e 's/variant="primary"/variant="default"/g' \
  -e 's/variant="text"/variant="link"/g' \
  {} +

# ... (repeat other commands with sed -i instead of sed -i '')
```

---

## Compatibility Table

| Feature                              | v0.x | v1.0.0   | v2.0.0   |
| ------------------------------------ | ---- | -------- | -------- |
| **Legacy APIs (v0.x)**               |      |          |          |
| SelectGlass                          | Yes  | Removed  | Removed  |
| ModalGlass legacy API                | Yes  | Removed  | Removed  |
| TabsGlass legacy API                 | Yes  | Removed  | Removed  |
| `variant="danger"`                   | Yes  | Removed  | Removed  |
| `type` prop (Alert/Notification)     | Yes  | Removed  | Removed  |
| **v2.0.0 Breaking Changes**          |      |          |          |
| `variant="primary"` (ButtonGlass)    | Yes  | Yes      | Removed  |
| `variant="text"` (ButtonGlass)       | Yes  | Yes      | Removed  |
| `checked` prop (ToggleGlass)         | Yes  | Yes      | Removed  |
| `onChange` (SliderGlass)             | Yes  | Yes      | Removed  |
| `value: number` (SliderGlass)        | Yes  | Yes      | Removed  |
| `onChange` (ComboBoxGlass)           | Yes  | Yes      | Removed  |
| `--metric-emerald-*` variables       | Yes  | Yes      | Removed  |
| **New in v2.0.0**                    |      |          |          |
| `variant="default"` (ButtonGlass)    | No   | No       | Added    |
| `variant="link"` (ButtonGlass)       | No   | No       | Added    |
| `pressed` prop (ToggleGlass)         | No   | No       | Added    |
| `onValueChange` (Slider/ComboBox)    | No   | No       | Added    |
| `value: number[]` (SliderGlass)      | No   | No       | Added    |
| Compound APIs                        | No   | Required | Required |
| 3-layer token system                 | No   | No       | Required |
| **100% shadcn/ui API compatibility** | No   | No       | ✅ Yes   |

---

## Version History

- **v2.0.0** (2025-12-14) — 100% shadcn/ui API compatibility, component migrations, token
  architecture
- **v1.1.0** (2025-12-10) — SparklineGlass, InsightCardGlass, CLI commands
- **v1.0.0** (2025-12-05) — API standardization, compound components required
- **v0.x** — Legacy APIs (all removed in v1.0.0)

---

## Need Help?

- [CHANGELOG.md](../CHANGELOG.md) — Complete version history
- [Advanced Patterns](ADVANCED_PATTERNS.md) — Compound component examples
- [GitHub Issues](https://github.com/Yhooi2/shadcn-glass-ui-library/issues) — Report migration
  issues

---

**Last updated:** 2025-12-14
