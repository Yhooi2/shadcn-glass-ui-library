# Migration Guide - Design Token Compliance

**Date:** 2025-12-04
**Target Version:** TBD
**Estimated Migration Time:** 15-30 minutes

## Quick Start

### Step 1: Update Visual Test Baselines

```bash
# Update all visual regression test screenshots
npm run test:visual:update

# Verify changes
git diff src/components/__visual__/__screenshots__/
```

### Step 2: Run Compliance Tests

```bash
# Verify all components use design tokens
npm run test:compliance:source
```

**Expected output:**
```
✅ No hardcoded values found! All components use design tokens.
✅ No hardcoded CSS values found! All CSS files use design tokens.
```

### Step 3: Review Visual Changes in Storybook

```bash
npm run storybook
```

**Components to review:**
1. GlassCard → Medium/Strong intensity variants
2. TooltipGlass → Solid background instead of glass
3. AICardGlass → Subtle blur
4. DropdownGlass → Standard blur
5. CSS utilities → `.glass`, `.frosted` classes

## Detailed Migration by Component

### GlassCard

**Visual Change:** Medium and Strong intensities have more blur.

#### Before/After Comparison

| Intensity | Old Blur | New Blur | Visual Impact |
|-----------|----------|----------|---------------|
| subtle | 8px | 8px | No change |
| medium | **12px** | **16px** | +33% more blur |
| strong | **16px** | **24px** | +50% more blur |

#### Code Migration

**No code changes required** - only visual appearance changes.

```tsx
// ✅ Code stays the same
<GlassCard intensity="medium">
  <h3>Profile Stats</h3>
  <p>Contributions: 1,234</p>
</GlassCard>
```

#### If You Need Less Blur

```tsx
// Old: medium (12px) → Use subtle (8px) as closest alternative
<GlassCard intensity="subtle">  {/* Closest to old medium */}
  <p>Less blurred content</p>
</GlassCard>

// Old: strong (16px) → Use medium (16px) as closest alternative
<GlassCard intensity="medium">  {/* Closest to old strong */}
  <p>Standard blur</p>
</GlassCard>
```

#### Custom Blur (Not Recommended)

If you absolutely need custom blur values:

```tsx
// ❌ NOT recommended - bypasses design system
<div
  className="glass-card-base"
  style={{ backdropFilter: 'blur(12px)' }}
>
  {/* This will fail compliance tests */}
</div>

// ✅ Recommended - use design tokens
<GlassCard intensity="subtle">  {/* 8px */}
<GlassCard intensity="medium">  {/* 16px */}
<GlassCard intensity="strong">  {/* 24px */}
```

---

### TooltipGlass

**Visual Change:** Solid background instead of glass effect (CRITICAL for accessibility).

#### Before/After

| Aspect | Before | After |
|--------|--------|-------|
| Background | Glass (blur + low opacity) | Solid (high opacity) |
| Readability | Lower (text on blurred background) | Higher (text on solid background) |
| WCAG Compliance | Marginal | AA compliant |

#### Code Migration

**No code changes required.**

```tsx
// ✅ Code stays the same, background is now solid
<TooltipGlass content="Helpful tooltip text" position="top">
  <IconButton />
</TooltipGlass>
```

#### CSS Changes (Automatic)

The tooltip now uses:
```css
/* Old (removed) */
backdrop-filter: blur(12px);

/* New (automatic via CSS variables) */
background: var(--tooltip-bg);  /* High opacity solid background */
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow: var(--tooltip-shadow);
```

---

### AICardGlass

**Visual Change:** More subtle glass effect (8px instead of 12px).

#### Code Migration

**No code changes required.**

```tsx
// ✅ Works as before, just slightly less blurred
<AICardGlass
  features={["Code quality", "Best practices"]}
  onGenerate={handleGenerate}
/>
```

---

### DropdownGlass & SortDropdownGlass

**Visual Change:** Slightly less blur (16px instead of 20px).

#### Code Migration

**No code changes required.**

```tsx
// ✅ Both work the same
<DropdownGlass
  trigger={<IconButton />}
  items={menuItems}
/>

<SortDropdownGlass
  sortBy="commits"
  sortOrder="desc"
  onSortChange={handleSort}
/>
```

---

### CSS Utility Classes

**Visual Changes:** `.glass` less blurred, `.frosted` more blurred.

#### Migration Table

| Class | Old Blur | New Blur | Action |
|-------|----------|----------|--------|
| `.glass` | 20px | **16px** | Update visual tests |
| `.frosted` | 30px | **32px** | Update visual tests |
| `.fluted` | 16px | 16px | No change |
| `.crystal` | 8px | 8px | No change |

#### Code Examples

```tsx
// ✅ Code stays the same
<div className="glass rounded-xl p-6">
  {/* Now 16px blur instead of 20px */}
</div>

<div className="frosted rounded-2xl p-8">
  {/* Now 32px blur instead of 30px */}
</div>
```

#### If You Need Exact Old Values

```tsx
// ❌ NOT recommended - use design tokens instead
<div
  className="rounded-xl p-6"
  style={{
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',  // Hardcoded value
  }}
>
  {/* This will fail compliance tests */}
</div>

// ✅ Recommended - accept new values or use closest token
<div className="glass rounded-xl p-6">
  {/* 16px blur - standard design token */}
</div>

// OR use .frosted for heavier blur
<div className="frosted rounded-xl p-6">
  {/* 32px blur - maximum blur token */}
</div>
```

---

## Testing Your Migration

### 1. Visual Regression Tests

```bash
# Update baselines with new blur values
npm run test:visual:update

# Run tests to verify
npm run test:visual
```

**Expected:** All tests pass with updated baselines.

### 2. Compliance Tests

```bash
# Verify no hardcoded values in your custom code
npm run test:compliance:source
```

**Expected:** 0 violations.

### 3. Manual Testing Checklist

- [ ] GlassCard medium variant renders correctly
- [ ] GlassCard strong variant renders correctly
- [ ] TooltipGlass has solid background (readable text)
- [ ] DropdownGlass opens/closes correctly
- [ ] AICardGlass displays properly
- [ ] Theme switching works (glass/light/aurora)
- [ ] All interactive components respond to hover/focus
- [ ] No console errors or warnings

### 4. Cross-Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (important for `-webkit-backdrop-filter`)

---

## Common Issues & Solutions

### Issue 1: Visual Tests Failing

**Symptom:**
```
❌ Screenshot mismatch: glass-card-medium.png
```

**Solution:**
```bash
# Update baselines
npm run test:visual:update

# Commit new screenshots
git add src/components/__visual__/__screenshots__/
git commit -m "test: update visual baselines after design token migration"
```

---

### Issue 2: Custom Components with Hardcoded Blur

**Symptom:**
```
❌ BLUR VIOLATIONS
custom-component.tsx:42:10
  Found: blur(12px)
  Expected: blur(var(--blur-sm)) /* 8px */
```

**Solution:**

```tsx
// ❌ Before (hardcoded)
const styles = {
  backdropFilter: 'blur(12px)',
};

// ✅ After (design token)
const styles = {
  backdropFilter: 'blur(var(--blur-md))',  // 16px (closest to 12px)
};

// OR use blur-sm if you need less
const styles = {
  backdropFilter: 'blur(var(--blur-sm))',  // 8px
};
```

---

### Issue 3: Tooltips Not Readable

**Symptom:** Tooltip text hard to read on busy backgrounds.

**Reason:** Tooltips now use solid backgrounds per UI_DIZINE.md.

**Solution:** This is correct behavior! Tooltips MUST be highly readable. If contrast is still low:

```css
/* Adjust tooltip opacity in theme file (glass.css, light.css, etc.) */
--tooltip-bg: rgba(30, 30, 45, 0.98);  /* Increase opacity if needed */
```

---

### Issue 4: GlassCard Too Blurred

**Symptom:** Medium/Strong cards have too much blur.

**Solution:** Use a lower intensity variant:

```tsx
// ❌ Too blurred
<GlassCard intensity="strong">  {/* 24px blur */}

// ✅ Less blur
<GlassCard intensity="medium">  {/* 16px blur */}
<GlassCard intensity="subtle">  {/* 8px blur */}
```

---

## Design Token Reference

### Available Blur Tokens

```css
/* From primitives.css */
--blur-sm: 8px;   /* Subtle glass, small components */
--blur-md: 16px;  /* Standard cards, dropdowns */
--blur-lg: 24px;  /* Featured cards, modals */
--blur-xl: 32px;  /* Heavy blur, full-screen overlays */
```

### Component Mappings

| Component | Property | Token | Value |
|-----------|----------|-------|-------|
| GlassCard (subtle) | intensity | --blur-sm | 8px |
| GlassCard (medium) | intensity | --blur-md | 16px |
| GlassCard (strong) | intensity | --blur-lg | 24px |
| TooltipGlass | N/A | **SOLID BG** | No blur |
| AICardGlass | backdrop | --blur-sm | 8px |
| DropdownGlass | backdrop | --blur-md | 16px |
| ModalGlass | backdrop | --blur-lg | 24px |
| .glass utility | class | --blur-md | 16px |
| .frosted utility | class | --blur-xl | 32px |
| .fluted utility | class | --blur-md | 16px |
| .crystal utility | class | --blur-sm | 8px |

---

## Best Practices

### ✅ DO

- Use design token variables: `var(--blur-sm)`, `var(--blur-md)`, etc.
- Accept visual changes as design improvements
- Update visual test baselines
- Run compliance tests regularly
- Document any custom blur needs with justification

### ❌ DON'T

- Hardcode blur values: `blur(12px)`, `blur(20px)`
- Mix hardcoded and token values
- Skip visual regression test updates
- Override design tokens without team discussion

---

## Rollback Plan

If critical issues arise:

### Option 1: Temporary CSS Override (Quick Fix)

```css
/* In your app's main CSS file (TEMPORARY ONLY) */
:root {
  --blur-md: 12px !important;  /* Old GlassCard medium */
  --blur-lg: 16px !important;  /* Old GlassCard strong */
}
```

**Warning:** This will cause compliance test failures.

### Option 2: Git Revert (Full Rollback)

```bash
# Revert the design token compliance changes
git revert <commit-hash>

# Reinstall dependencies if needed
npm install
```

---

## Support

- **Compliance tests failing?** Run `npm run test:compliance:source` for detailed violation reports
- **Visual changes unexpected?** Check [BREAKING_CHANGES.md](./BREAKING_CHANGES.md)
- **Custom components?** See Design Token Reference above

---

## Next Steps

After successful migration:

1. ✅ All compliance tests pass
2. ✅ Visual tests updated
3. ✅ Storybook renders correctly
4. ✅ Cross-browser testing complete
5. 🎉 You're compliant with UI_DIZINE.md design system!

**Continuous Compliance:**

```bash
# Add to CI/CD pipeline
npm run test:compliance:source

# Pre-commit hook (optional)
npm run test:compliance:source --run
```
