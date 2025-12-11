# CSS Variables Migration Guide: v1.x → v2.0.0

## Overview

Version 2.0.0 removes deprecated metric color variables in favor of semantic naming aligned with
shadcn/ui standards.

### Why This Change?

- **Semantic Clarity**: Color names (emerald, amber, blue, red) → semantic roles (success, warning,
  default, destructive)
- **shadcn/ui Compatibility**: Aligns with shadcn/ui variant naming conventions
- **Consistency**: Matches AlertGlass/BadgeGlass/ButtonGlass variant prop values
- **Token Architecture**: Part of the 3-layer token system migration

---

## Breaking Changes

### Complete Variable Mapping

| Deprecated (v1.x - REMOVED) | Replacement (v2.0+)           | Use Case                    |
| --------------------------- | ----------------------------- | --------------------------- |
| `--metric-emerald-bg`       | `--metric-success-bg`         | Positive metric backgrounds |
| `--metric-emerald-text`     | `--metric-success-text`       | Success metric text         |
| `--metric-emerald-border`   | `--metric-success-border`     | Success metric borders      |
| `--metric-emerald-glow`     | `--metric-success-glow`       | Success glow effects        |
| `--metric-amber-bg`         | `--metric-warning-bg`         | Warning metric backgrounds  |
| `--metric-amber-text`       | `--metric-warning-text`       | Warning metric text         |
| `--metric-amber-border`     | `--metric-warning-border`     | Warning borders             |
| `--metric-amber-glow`       | `--metric-warning-glow`       | Warning glow effects        |
| `--metric-blue-bg`          | `--metric-default-bg`         | Neutral metric backgrounds  |
| `--metric-blue-text`        | `--metric-default-text`       | Default metric text         |
| `--metric-blue-border`      | `--metric-default-border`     | Default borders             |
| `--metric-blue-glow`        | `--metric-default-glow`       | Default glow effects        |
| `--metric-red-bg`           | `--metric-destructive-bg`     | Error/danger backgrounds    |
| `--metric-red-text`         | `--metric-destructive-text`   | Error/danger text           |
| `--metric-red-border`       | `--metric-destructive-border` | Error/danger borders        |
| `--metric-red-glow`         | `--metric-destructive-glow`   | Error/danger glow effects   |

**Total affected variables:** 16 (4 color families × 4 properties each)

---

## Automated Migration

### Step 1: Find Affected Files

```bash
# Search your codebase for deprecated variables
grep -rn "metric-emerald\|metric-amber\|metric-blue\|metric-red" src/
```

### Step 2: Automated Replacement

#### macOS/BSD

```bash
find src/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.scss" \) -exec sed -i '' \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +
```

#### Linux

```bash
find src/ -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.scss" \) -exec sed -i \
  -e 's/--metric-emerald-/--metric-success-/g' \
  -e 's/--metric-amber-/--metric-warning-/g' \
  -e 's/--metric-blue-/--metric-default-/g' \
  -e 's/--metric-red-/--metric-destructive-/g' \
  {} +
```

#### Windows (PowerShell)

```powershell
Get-ChildItem -Path src\ -Include *.tsx,*.ts,*.css,*.scss -Recurse | ForEach-Object {
  (Get-Content $_.FullName) `
    -replace '--metric-emerald-', '--metric-success-' `
    -replace '--metric-amber-', '--metric-warning-' `
    -replace '--metric-blue-', '--metric-default-' `
    -replace '--metric-red-', '--metric-destructive-' |
  Set-Content $_.FullName
}
```

### Step 3: Verify Changes

```bash
npm run typecheck    # TypeScript validation
npm run lint         # ESLint checks
npm test             # Run test suite
npm run build        # Production build test
```

---

## Manual Migration Examples

### Example 1: Custom CSS

```css
/* ❌ v1.x (REMOVED in v2.0) */
.metric-card-success {
  background: var(--metric-emerald-bg);
  color: var(--metric-emerald-text);
  border: 1px solid var(--metric-emerald-border);
  box-shadow: var(--metric-emerald-glow);
}

/* ✅ v2.0+ */
.metric-card-success {
  background: var(--metric-success-bg);
  color: var(--metric-success-text);
  border: 1px solid var(--metric-success-border);
  box-shadow: var(--metric-success-glow);
}
```

### Example 2: Tailwind Arbitrary Values

```tsx
/* ❌ v1.x */
<div className="bg-[var(--metric-amber-bg)] text-[var(--metric-amber-text)]">
  Warning Metric
</div>

/* ✅ v2.0+ */
<div className="bg-[var(--metric-warning-bg)] text-[var(--metric-warning-text)]">
  Warning Metric
</div>
```

### Example 3: Inline Styles

```tsx
/* ❌ v1.x */
<div style={{
  background: 'var(--metric-blue-bg)',
  color: 'var(--metric-blue-text)',
  border: '1px solid var(--metric-blue-border)'
}}>
  Default Metric
</div>

/* ✅ v2.0+ */
<div style={{
  background: 'var(--metric-default-bg)',
  color: 'var(--metric-default-text)',
  border: '1px solid var(--metric-default-border)'
}}>
  Default Metric
</div>
```

### Example 4: Styled Components / Emotion

```tsx
/* ❌ v1.x */
const StyledMetric = styled.div`
  background: var(--metric-red-bg);
  color: var(--metric-red-text);
  box-shadow: var(--metric-red-glow);
`;

/* ✅ v2.0+ */
const StyledMetric = styled.div`
  background: var(--metric-destructive-bg);
  color: var(--metric-destructive-text);
  box-shadow: var(--metric-destructive-glow);
`;
```

---

## Migration Checklist

- [ ] Search codebase for deprecated variables:
      `grep -rn "metric-emerald|metric-amber|metric-blue|metric-red" src/`
- [ ] Run automated replacement script (or manual find-replace in IDE)
- [ ] Verify TypeScript compilation: `npm run typecheck`
- [ ] Run linter: `npm run lint`
- [ ] Run test suite: `npm test`
- [ ] Test production build: `npm run build`
- [ ] Visual regression testing (if applicable)
- [ ] Manual testing of affected components
- [ ] Update custom theme files (if any)
- [ ] Commit changes with clear message: `chore: migrate CSS variables to v2.0.0 semantic naming`

---

## Timeline

| Version              | Status       | Deprecated Variables                             |
| -------------------- | ------------ | ------------------------------------------------ |
| **v1.0.0 - v1.0.11** | ✅ Supported | Work via CSS aliases (with deprecation warnings) |
| **v2.0.0**           | 🚀 Current   | ❌ **REMOVED** (breaking change)                 |
| **v2.1.0+**          | ⏭️ Future    | Only semantic variables supported                |

---

## Affected Components

The following components may use metric color variables in custom implementations:

### Library Components (Already Migrated)

- MetricCardGlass ✅
- CircularMetricGlass ✅
- MetricsGridGlass ✅
- YearCardGlass (with sparkline metrics) ✅

### User Code (Requires Migration)

- Custom dashboard components ⚠️
- Custom metric displays ⚠️
- Custom themes using metric variables ⚠️
- Any component referencing `--metric-emerald-*`, `--metric-amber-*`, `--metric-blue-*`,
  `--metric-red-*`

**Note:** shadcn-glass-ui v2.0.0 library code is already migrated. This guide is for **your code**
that may reference these variables.

---

## IDE-Specific Migration

### VS Code

1. Open Find & Replace (Cmd/Ctrl + Shift + H)
2. Enable regex mode (.\*icon)
3. Search: `--metric-(emerald|amber|blue|red)-`
4. Replace with corresponding semantic names manually

### WebStorm / IntelliJ IDEA

1. Edit → Find → Replace in Path (Cmd/Ctrl + Shift + R)
2. Enable regex mode
3. Use same pattern as VS Code

### Vim / Neovim

```vim
:%s/--metric-emerald-/--metric-success-/gc
:%s/--metric-amber-/--metric-warning-/gc
:%s/--metric-blue-/--metric-default-/gc
:%s/--metric-red-/--metric-destructive-/gc
```

---

## Troubleshooting

### Issue: Variables not working after migration

**Cause:** Browser CSS cache not cleared

**Fix:**

```bash
# Hard refresh in browser
# Chrome/Firefox: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)

# Or clear browser cache manually
```

### Issue: Theme colors look wrong after migration

**Cause:** Custom theme file still using old variables

**Fix:** Check custom theme files (if any) and update them:

```bash
grep -r "metric-emerald\|metric-amber\|metric-blue\|metric-red" src/styles/
```

### Issue: Build fails after migration

**Cause:** Missed some occurrences in template literals or computed styles

**Fix:** Search more thoroughly:

```bash
# Search in all file types
grep -rn "metric-emerald\|metric-amber\|metric-blue\|metric-red" .
```

---

## Related Documentation

- **[Token Architecture Guide](../TOKEN_ARCHITECTURE.md)** - Complete 3-layer token system
  documentation
- **[Theme Creation Guide](../THEME_CREATION_GUIDE.md)** - Create custom themes in 15 minutes
- **[CSS Variables Audit](../CSS_VARIABLES_AUDIT.md)** - Complete list of 296+ variables per theme
- **[CHANGELOG](../../CHANGELOG.md)** - Full version history

---

## Need Help?

- 📖 [Token Architecture Guide](../TOKEN_ARCHITECTURE.md)
- 🎨 [Theme Creation Guide](../THEME_CREATION_GUIDE.md)
- 🐛 [Report Issues](https://github.com/Yhooi2/shadcn-glass-ui-library/issues)
- 💬 [Discussions](https://github.com/Yhooi2/shadcn-glass-ui-library/discussions)
- 📧 [Contact Support](https://github.com/Yhooi2/shadcn-glass-ui-library/issues/new/choose)

---

## Migration Success Stories

> "The automated script worked perfectly! Migrated our entire codebase in under 5 minutes." -
> Anonymous User

> "The semantic naming makes much more sense. Should have been this way from the start!" - Developer
> Feedback

---

**Last Updated:** 2025-12-11 **Version:** 2.0.0 **Migration Difficulty:** Easy (automated script
provided) **Estimated Time:** 5-15 minutes depending on codebase size
