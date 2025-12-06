# SelectGlass → ComboBoxGlass Migration Guide

**Version:** v1.0.0
**Status:** ⚠️ SelectGlass removed in v1.0.0

---

## ⚠️ Important Notice

**SelectGlass has been removed** in v1.0.0.

Please migrate to **ComboBoxGlass** which provides:
- ✅ Better performance (uses shadcn/ui Command component)
- ✅ More features (icons, better search, styling)
- ✅ Active maintenance
- ✅ shadcn/ui compatibility

---

## Quick Migration

### Basic Migration

**Before (SelectGlass):**
```tsx
import { SelectGlass } from '@/components/glass/ui/select-glass';

<SelectGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>
```

**After (ComboBoxGlass):**
```tsx
import { ComboBoxGlass } from '@/components/glass/ui/combobox-glass';

<ComboBoxGlass
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select option"
/>
```

**API is 95% compatible** - Most code requires only import change!

---

## API Comparison

### Props Mapping

| SelectGlass Prop | ComboBoxGlass Prop | Notes |
|------------------|-------------------|-------|
| `options` | `options` | ✅ Same format |
| `value` | `value` | ✅ Same type |
| `onChange` | `onChange` | ✅ Same signature |
| `placeholder` | `placeholder` | ✅ Same |
| `label` | `label` | ✅ Same |
| `error` | `error` | ✅ Same |
| `success` | `success` | ✅ Same |
| `size` | `size` | ✅ Same (`sm`, `md`, `lg`) |
| `disabled` | `disabled` | ✅ Same |
| `searchable` | `searchable` | ✅ Default `true` in ComboBoxGlass |
| `className` | `className` | ✅ Same |
| N/A | `triggerIcon` | ⭐ NEW - Custom trigger icon |
| N/A | `emptyMessage` | ⭐ NEW - Custom "No results" text |

---

## Migration Examples

### Example 1: Basic Select

**Before:**
```tsx
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];

<SelectGlass
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  label="Country"
  placeholder="Select country"
/>
```

**After:**
```tsx
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];

<ComboBoxGlass
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  label="Country"
  placeholder="Select country"
/>
```

✅ **No changes needed** except import!

---

### Example 2: Select with Icons

**Before:**
```tsx
import { User, Settings, LogOut } from 'lucide-react';

const menuOptions = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'logout', label: 'Logout', icon: LogOut }
];

<SelectGlass
  options={menuOptions}
  value={selected}
  onChange={setSelected}
/>
```

**After:**
```tsx
import { User, Settings, LogOut } from 'lucide-react';

const menuOptions = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'logout', label: 'Logout', icon: LogOut }
];

<ComboBoxGlass
  options={menuOptions}
  value={selected}
  onChange={setSelected}
/>
```

✅ **Same code** - icons work identically!

---

### Example 3: Select with Validation

**Before:**
```tsx
<SelectGlass
  options={options}
  value={value}
  onChange={setValue}
  label="Required Field"
  error={errors.field ? "This field is required" : undefined}
  size="md"
/>
```

**After:**
```tsx
<ComboBoxGlass
  options={options}
  value={value}
  onChange={setValue}
  label="Required Field"
  error={errors.field ? "This field is required" : undefined}
  size="md"
/>
```

✅ **Identical API** for validation states!

---

### Example 4: Non-Searchable Select

**Before:**
```tsx
<SelectGlass
  options={statusOptions}
  value={status}
  onChange={setStatus}
  searchable={false}  // Disable search
/>
```

**After:**
```tsx
<ComboBoxGlass
  options={statusOptions}
  value={status}
  onChange={setStatus}
  searchable={false}  // Still works
/>
```

✅ **Same prop** for controlling search!

---

### Example 5: Custom Empty Message (NEW Feature)

**Before (SelectGlass - Not Possible):**
```tsx
// Could not customize "No results" message
<SelectGlass
  options={filteredOptions}
  value={value}
  onChange={setValue}
/>
```

**After (ComboBoxGlass - NEW):**
```tsx
<ComboBoxGlass
  options={filteredOptions}
  value={value}
  onChange={setValue}
  emptyMessage="No matching countries found. Try a different search."
/>
```

⭐ **New feature** in ComboBoxGlass!

---

## Benefits of ComboBoxGlass

### 1. Better Performance
- Uses shadcn/ui Command component (optimized)
- Virtual scrolling for large lists (500+ items)
- Faster search filtering

### 2. Enhanced Features
- Custom trigger icons
- Better keyboard navigation
- Improved accessibility (ARIA attributes)
- Better mobile support

### 3. Better Styling
- More customizable appearance
- Better glass effects
- Smoother animations

### 4. Active Maintenance
- SelectGlass frozen (no new features)
- ComboBoxGlass actively maintained
- Future updates and improvements

---

## Breaking Changes (Minor)

### 1. Default `searchable` Value

**SelectGlass:** `searchable` defaults to `false`
**ComboBoxGlass:** `searchable` defaults to `true`

**Fix:** Explicitly set `searchable={false}` if you don't want search:
```tsx
<ComboBoxGlass searchable={false} {...props} />
```

### 2. Import Path

**Before:**
```tsx
import { SelectGlass } from '@/components/glass/ui/select-glass';
```

**After:**
```tsx
import { ComboBoxGlass } from '@/components/glass/ui/combobox-glass';
```

---

## Migration Checklist

- [ ] Find all `SelectGlass` imports: `rg "SelectGlass" -l`
- [ ] Replace imports with `ComboBoxGlass`
- [ ] Replace component usage: `<SelectGlass` → `<ComboBoxGlass`
- [ ] Add `searchable={false}` where needed (if you relied on default `false`)
- [ ] Test all select dropdowns
- [ ] Run TypeScript check: `npx tsc --noEmit`
- [ ] Run tests: `npm run test`
- [ ] Commit: `refactor: migrate SelectGlass to ComboBoxGlass`

---

## Automated Migration (Recommended)

### Find All Usage:
```bash
# Find all SelectGlass usage
rg "SelectGlass" --type typescript --type tsx -l

# Count occurrences
rg "SelectGlass" --type typescript --type tsx | wc -l
```

### Semi-Automated Replace:
```bash
# Replace imports
rg "import.*SelectGlass.*from" -l | xargs sed -i '' \
  's/SelectGlass/ComboBoxGlass/g' \
  's/select-glass/combobox-glass/g'

# Replace component usage
rg "<SelectGlass" -l | xargs sed -i '' 's/<SelectGlass/<ComboBoxGlass/g'
rg "</SelectGlass>" -l | xargs sed -i '' 's/<\/SelectGlass>/<\/ComboBoxGlass>/g'

# Verify
rg "SelectGlass" --files-with-matches
```

⚠️ **Review changes before committing!**

---

## Timeline

| Version | Event |
|---------|-------|
| **v0.x** | SelectGlass available |
| **v1.0.0** | SelectGlass removed |

**Action Required:** Use ComboBoxGlass instead

---

## Need Help?

- 📖 See [ComboBoxGlass Storybook](http://localhost:6006/?path=/story/components-comboboxglass)
- 💬 Ask in [GitHub Discussions](https://github.com/your-org/shadcn-glass-ui-library/discussions)
- 🐛 Report issues in [GitHub Issues](https://github.com/your-org/shadcn-glass-ui-library/issues)

---

## Rollback Plan

If you encounter issues:

### Option 1: Revert Migration
```bash
git revert <commit-hash>
```

### Option 2: Pin to v0.x
If you need more time to migrate, pin to version 0.x temporarily.

---

## FAQ

### Q: Why is SelectGlass being removed?
**A:** ComboBoxGlass is a superior implementation using shadcn/ui Command. Maintaining both components is redundant and increases bundle size.

### Q: Will my code break immediately?
**A:** Yes, in v1.0.0. SelectGlass has been removed. Migrate to ComboBoxGlass.

### Q: Is the API exactly the same?
**A:** 95% identical. Main difference: `searchable` defaults to `true` in ComboBoxGlass.

### Q: Can I use both components during migration?
**A:** No. In v1.0.0, only ComboBoxGlass is available. Pin to v0.x if you need gradual migration.

### Q: What if I find a bug in ComboBoxGlass?
**A:** Report it! We'll fix it. ComboBoxGlass is actively maintained.

---

**Last updated:** 2025-12-05
**Status:** SelectGlass removed in v1.0.0
**Migration:** Use ComboBoxGlass
