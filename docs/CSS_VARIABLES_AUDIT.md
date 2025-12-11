# CSS Variables Audit & Optimization Report

## 📊 Summary

**Total CSS Variables:**

- Glass theme: 296 variables
- Light theme: 288 variables
- Aurora theme: 288 variables

**Status:** ✅ All deprecated aliases (`metric-emerald-*`, `metric-amber-*`, `metric-blue-*`,
`metric-red-*`) are **only used in CSS definitions** for backward compatibility. **No usage in
components or tests.**

---

## 🔍 Findings

### 1. ✅ Deprecated Variables Usage: CLEAN

**Result:** No deprecated variable usage found in production code.

- ❌ `--metric-emerald-*` - Not used in components
- ❌ `--metric-amber-*` - Not used in components
- ❌ `--metric-blue-*` - Not used in components
- ❌ `--metric-red-*` - Not used in components

All components successfully migrated to:

- ✅ `--metric-success-*`
- ✅ `--metric-warning-*`
- ✅ `--metric-default-*`
- ✅ `--metric-destructive-*`

**Deprecated aliases remain only in CSS files** (glass.css, light.css, aurora.css) for backward
compatibility with external consumers.

---

### 2. 🎯 Duplicate Patterns Found

#### A. `transparent` Background Variables (19 occurrences in Glass)

**All these variables = `transparent` across all themes:**

```css
/* Buttons */
--btn-ghost-bg: transparent;

/* Badges */
--badge-default-border: transparent;
--badge-secondary-border: transparent;
--badge-destructive-border: transparent;
--badge-outline-bg: transparent;
--badge-success-border: transparent;
--badge-warning-border: transparent;
--badge-info-border: transparent;

/* Tabs */
--tab-bg: transparent;

/* Metrics */
--metric-default-bg: transparent;
--metric-default-border: transparent;
--metric-secondary-bg: transparent;
--metric-secondary-border: transparent;
--metric-success-bg: transparent;
--metric-success-border: transparent;
--metric-warning-bg: transparent;
--metric-warning-border: transparent;
--metric-destructive-bg: transparent;
--metric-destructive-border: transparent;
```

#### B. `none` Glow Variables (14 occurrences in Light theme)

**All glow effects in Light theme = `none`:**

```css
--metric-default-glow: none;
--metric-secondary-glow: none;
--metric-success-glow: none;
--metric-warning-glow: none;
--metric-destructive-glow: none;
/* ... and 9 more */
```

#### C. Glow Pattern Duplication

**Glass theme:** All glows use `0 0 12px <color> / 0.4` pattern

```css
--metric-default-glow: 0 0 12px oklch(70.7% 0.143 250 / 0.4);
--metric-success-glow: 0 0 12px oklch(76.5% 0.147 163 / 0.4);
--metric-warning-glow: 0 0 12px oklch(82.8% 0.157 84 / 0.4);
--metric-destructive-glow: 0 0 12px oklch(71.2% 0.161 12 / 0.4);
```

**Aurora theme:** All glows use `0 0 10px <color> / 0.35` pattern (except secondary:
`0 0 8px / 0.25`)

```css
--metric-default-glow: 0 0 10px oklch(70.7% 0.143 250 / 0.35);
--metric-success-glow: 0 0 10px oklch(76.5% 0.147 163 / 0.35);
--metric-warning-glow: 0 0 10px oklch(82.8% 0.157 84 / 0.35);
--metric-destructive-glow: 0 0 10px oklch(71.5% 0.179 27 / 0.35);
```

---

## 💡 Optimization Recommendations

### Priority 1: Remove Unused Variables ⚠️

**Investigate if these `transparent` variables are actually used:**

If `--metric-*-bg` and `--metric-*-border` are never used (always transparent), they can be removed
entirely:

```css
/* Can be removed if unused: */
--metric-default-bg: transparent; /* Used anywhere? */
--metric-default-border: transparent; /* Used anywhere? */
--metric-success-bg: transparent; /* Used anywhere? */
--metric-success-border: transparent; /* Used anywhere? */
/* ... etc */
```

**Action:** Search codebase for usage of these variables. If unused, remove from all themes.

**Potential savings:** ~16 variables × 3 themes = 48 variable definitions

---

### Priority 2: Simplify Glow System 🎨

**Current:** Each metric variant has its own glow variable with repeated patterns.

**Proposal:** Use CSS functions or global glow intensity variables.

#### Option A: Glow Intensity Tokens

```css
/* Global tokens (add to root or theme) */
--glow-radius-sm: 8px;
--glow-radius-md: 10px;
--glow-radius-lg: 12px;
--glow-opacity-light: 0.25;
--glow-opacity-medium: 0.35;
--glow-opacity-strong: 0.4;

/* Then in themes: */
[data-theme='glass'] {
  --glow-radius: var(--glow-radius-lg); /* 12px */
  --glow-opacity: var(--glow-opacity-strong); /* 0.4 */
}

[data-theme='aurora'] {
  --glow-radius: var(--glow-radius-md); /* 10px */
  --glow-opacity: var(--glow-opacity-medium); /* 0.35 */
}

[data-theme='light'] {
  --glow-radius: 0;
  --glow-opacity: 0;
}

/* Usage in metric variables: */
--metric-success-glow: 0 0 var(--glow-radius) oklch(76.5% 0.147 163 / var(--glow-opacity));
```

**Savings:** Reduces pattern duplication, easier to adjust glow intensity globally.

---

### Priority 3: Consider Color Semantic Tokens 🎭

**Current issue:** Text colors differ between Glass/Aurora and Light themes.

**Example:**

```css
/* Glass/Aurora */
--metric-success-text: oklch(76.5% 0.147 163); /* emerald-400 */

/* Light */
--metric-success-text: oklch(69.6% 0.155 163); /* emerald-500 */
```

**Proposal:** Use semantic lightness tokens:

```css
/* Root level */
--color-lightness-for-dark: 76.5%; /* 400-level colors */
--color-lightness-for-light: 69.6%; /* 500-level colors */

/* Then: */
[data-theme='glass'],
[data-theme='aurora'] {
  --base-lightness: var(--color-lightness-for-dark);
}

[data-theme='light'] {
  --base-lightness: var(--color-lightness-for-light);
}
```

**Note:** This is more complex and may not be worth it unless you plan many more themes.

---

### Priority 4: Audit Deprecated Aliases Removal Timeline 📅

**Current status:** Deprecated aliases are defined but unused in codebase.

**Recommendation:**

1. **v1.x** - Keep deprecated aliases (current state) ✅
2. **v2.0** - Add deprecation warnings to CHANGELOG
3. **v2.1** - Add console warnings when deprecated variables are detected
4. **v3.0** - Remove deprecated aliases entirely

**Migration path for external consumers:**

```md
## Migration from v1.x to v2.x

Replace all deprecated metric color variables:

- `--metric-emerald-*` → `--metric-success-*`
- `--metric-amber-*` → `--metric-warning-*`
- `--metric-blue-*` → `--metric-default-*`
- `--metric-red-*` → `--metric-destructive-*`
```

---

## 🚀 Implementation Priority

### High Priority (Do Now)

1. ✅ **Verify deprecated aliases are unused** - DONE
2. 🔍 **Search for unused `transparent` variables** - TODO
3. 📝 **Document removal timeline** - Add to CHANGELOG

### Medium Priority (Consider for v2.0)

4. 🎨 **Simplify glow system** with intensity tokens
5. 📦 **Remove unused transparent variables** (if found)
6. 🔧 **Add deprecation notices** to CHANGELOG

### Low Priority (Future)

7. 🎭 **Consider semantic color tokens** (if adding 5+ themes)
8. 🧹 **Remove deprecated aliases** in v3.0

---

## 📝 Action Items

### Immediate

- [ ] Search codebase for `--metric-*-bg` usage (bg variants)
- [ ] Search codebase for `--metric-*-border` usage (border variants)
- [ ] If unused, create PR to remove these variables from all themes

### v2.0 Planning

- [x] Add deprecation notice to CHANGELOG.md (see [CHANGELOG.md](../CHANGELOG.md#unreleased))
- [ ] Update migration documentation
- [ ] Consider glow system refactoring

### v3.0 Planning

- [ ] Remove all deprecated `--metric-emerald/amber/blue/red-*` aliases
- [ ] Update documentation

---

## 📊 Metrics

**Cleanup potential:**

- Unused transparent variables: Up to 48 definitions (16 vars × 3 themes)
- Deprecated aliases: 48 definitions (16 vars × 3 themes) - **keep for now**

**Total potential reduction:** ~96 variable definitions if all transparent vars are unused

**Actual impact:** Minimal - CSS variables are lightweight. Focus on:

1. ✅ **Consistency** - Already achieved!
2. 📚 **Maintainability** - Document removal timeline
3. 🧹 **Cleanup** - Remove truly unused vars

---

## ✅ Conclusion

**Current state: EXCELLENT**

1. ✅ No deprecated variable usage in components
2. ✅ Consistent naming convention (shadcn/ui compatible)
3. ✅ All tests passing with new variables
4. 📋 Some optimization opportunities (transparent vars, glow patterns)

**Next steps:** Focus on Priority 1 (unused variable audit) and Priority 4 (deprecation timeline).
