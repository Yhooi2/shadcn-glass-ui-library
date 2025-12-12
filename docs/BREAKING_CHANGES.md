# Breaking Changes

This document consolidates all breaking changes across major versions of shadcn-glass-ui.

## Quick Navigation

- [v2.0.0](#v200---css-variable-renames) - CSS variable renames (token architecture)
- [v1.0.0](#v100---legacy-api-removal) - Legacy API removal (Compound API only)

---

## v2.0.0 - CSS Variable Renames

**Released:** December 2024

v2.0.0 removes deprecated CSS variables as part of the 3-layer token architecture migration.

### Removed CSS Variables

| Removed (v1.x)       | Replacement (v2.0+)      | Semantic Meaning                  |
| -------------------- | ------------------------ | --------------------------------- |
| `--metric-emerald-*` | `--metric-success-*`     | Success states (positive metrics) |
| `--metric-amber-*`   | `--metric-warning-*`     | Warning states (attention needed) |
| `--metric-blue-*`    | `--metric-default-*`     | Neutral/default states            |
| `--metric-red-*`     | `--metric-destructive-*` | Error/danger states (critical)    |

**Total removed:** 16 variables (4 color families × 4 properties each: bg, text, border, glow)

### Why This Change?

- **Semantic Clarity**: Color names (emerald, amber, blue, red) → semantic roles (success, warning,
  default, destructive)
- **shadcn/ui Compatibility**: Aligns with shadcn/ui variant naming conventions
- **Consistency**: Matches AlertGlass/BadgeGlass/ButtonGlass variant prop values
- **Token Architecture**: Part of the 3-layer token system migration

### Migration Guide

**Automated Migration (Recommended):**

```bash
# macOS/BSD
find src/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +

# Linux
find src/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -exec sed -i \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +
```

**Example:**

```css
/* v1.x (REMOVED in v2.0) */
.metric-card-success {
  background: var(--metric-emerald-bg);
  color: var(--metric-emerald-text);
}

/* v2.0+ */
.metric-card-success {
  background: var(--metric-success-bg);
  color: var(--metric-success-text);
}
```

**[Complete Migration Guide](migration/CSS_VARIABLES_MIGRATION_2.0.md)** - Includes manual examples,
troubleshooting, and affected components.

### New in v2.0.0

**Token Architecture:**

- **3-Layer System**: Primitive → Semantic → Component tokens
- **207 Primitive Tokens**: Complete OKLCH color palette in `oklch-primitives.css`
- **Zero Hardcoded Colors**: 100% migration to CSS variables
- **Theme Creation**: 90% faster (2-3 hours → 10-15 minutes)

**New Components:**

- **StepperGlass** - Compound stepper with 3 variants (numbered, icon, dots), 2 orientations

**Custom Hooks (Exported):**

- `useFocus`, `useHover`, `useResponsive`, `useWallpaperTint`

**Documentation:**

- [TOKEN_ARCHITECTURE.md](TOKEN_ARCHITECTURE.md) - Complete token system guide
- [THEME_CREATION_GUIDE.md](THEME_CREATION_GUIDE.md) - Create themes in 15 minutes
- [CSS_VARIABLES_AUDIT.md](CSS_VARIABLES_AUDIT.md) - Complete audit of 296+ variables per theme

---

## v1.0.0 - Legacy API Removal

**Released:** November 2024

v1.0.0 removes all legacy/deprecated APIs. This is a clean slate release with only Compound API
support.

### Removed Components

#### SelectGlass

**SelectGlass has been removed.** Use **ComboBoxGlass** instead.

```tsx
// v0.x (REMOVED in v1.0)
<SelectGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>

// v1.0+ - Use ComboBoxGlass
<ComboBoxGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>
```

**[SelectGlass → ComboBoxGlass Migration](migration/select-to-combobox.md)**

### Removed Legacy APIs

#### ModalGlass: Legacy Props API

**The old props-based API has been removed.** Use Compound API instead.

```tsx
// v0.x (REMOVED in v1.0)
<ModalGlass isOpen={true} onClose={() => {}} title="Test">
  Content
</ModalGlass>

// v1.0+ - Use Compound API
<ModalGlass.Root open={true} onOpenChange={() => {}}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Test</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>Content</ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

**Key Changes:**

| v0.x Prop | v1.0+ Equivalent                                      |
| --------- | ----------------------------------------------------- |
| `isOpen`  | `open` (on ModalGlass.Root)                           |
| `onClose` | `onOpenChange` (signature: `(open: boolean) => void`) |
| `title`   | `<ModalGlass.Title>` component                        |

**[ModalGlass Compound API Migration](migration/modal-glass-compound-api.md)**

#### TabsGlass: Legacy Props API

**The old props-based API has been removed.** Use Compound API instead.

```tsx
// v0.x (REMOVED in v1.0)
<TabsGlass
  tabs={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' }
  ]}
  activeTab="tab1"
  onChange={setActiveTab}
/>

// v1.0+ - Use Compound API
<TabsGlass.Root value="tab1" onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="tab1">Content 1</TabsGlass.Content>
  <TabsGlass.Content value="tab2">Content 2</TabsGlass.Content>
</TabsGlass.Root>
```

**Key Changes:**

| v0.x Prop    | v1.0+ Equivalent                            |
| ------------ | ------------------------------------------- |
| `tabs` array | Individual `<TabsGlass.Trigger>` components |
| `activeTab`  | `value` (on TabsGlass.Root)                 |
| `onChange`   | `onValueChange`                             |

**[TabsGlass Compound API Migration](migration/tabs-glass-compound-api.md)**

---

## See Also

- [CHANGELOG.md](../CHANGELOG.md) - Complete version history
- [migration/](migration/) - Detailed migration guides
- [ADVANCED_PATTERNS.md](ADVANCED_PATTERNS.md) - Compound API usage examples
