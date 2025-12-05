# ModalGlass Compound API Migration Guide

**Version:** v1.0.0
**Status:** ⚠️ Legacy API removed - Compound API only

---

## Why Migrate?

The new **Compound Component API** provides:

✅ **Better composition** - Build complex modals with fine-grained control
✅ **Radix UI patterns** - Follows industry-standard component architecture
✅ **More control** - Customize each part independently
✅ **Easier styling** - Target specific sections without prop drilling
✅ **Type safety** - Better TypeScript inference for each sub-component
✅ **Accessibility** - Enhanced ARIA attributes and keyboard navigation

---

## API Comparison

### Legacy API (Removed in v1.0.0)

```tsx
<ModalGlass
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  size="md"
>
  <p>Modal body content goes here</p>
  <div className="flex gap-2">
    <ButtonGlass variant="outline" onClick={() => setOpen(false)}>
      Cancel
    </ButtonGlass>
    <ButtonGlass onClick={handleConfirm}>
      Confirm
    </ButtonGlass>
  </div>
</ModalGlass>
```

### Compound API (Recommended)

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content size="md">
    <ModalGlass.Header>
      <ModalGlass.Title>Confirm Action</ModalGlass.Title>
      <ModalGlass.Description>
        Are you sure you want to proceed?
      </ModalGlass.Description>
      <ModalGlass.Close />
    </ModalGlass.Header>

    <ModalGlass.Body>
      <p>Modal body content goes here</p>
    </ModalGlass.Body>

    <ModalGlass.Footer>
      <ButtonGlass variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </ButtonGlass>
      <ButtonGlass onClick={handleConfirm}>
        Confirm
      </ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

---

## Migration Examples

### Example 1: Basic Modal

**Before (Legacy):**
```tsx
import { ModalGlass } from '@/components/glass/ui/modal-glass';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <ModalGlass
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Welcome"
    >
      <p>Welcome to our application!</p>
    </ModalGlass>
  );
}
```

**After (Compound):**
```tsx
import { ModalGlass } from '@/components/glass/ui/modal-glass';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <ModalGlass.Root open={open} onOpenChange={setOpen}>
      <ModalGlass.Overlay />
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Welcome</ModalGlass.Title>
          <ModalGlass.Close />
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>Welcome to our application!</p>
        </ModalGlass.Body>
      </ModalGlass.Content>
    </ModalGlass.Root>
  );
}
```

---

### Example 2: Modal with Footer Actions

**Before (Legacy):**
```tsx
<ModalGlass
  isOpen={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  title="Delete Item"
  description="This action cannot be undone."
>
  <div className="space-y-4">
    <p>Are you sure you want to delete this item?</p>
    <div className="flex justify-end gap-2">
      <ButtonGlass
        variant="outline"
        onClick={() => setIsDeleteOpen(false)}
      >
        Cancel
      </ButtonGlass>
      <ButtonGlass
        variant="destructive"
        onClick={handleDelete}
      >
        Delete
      </ButtonGlass>
    </div>
  </div>
</ModalGlass>
```

**After (Compound):**
```tsx
<ModalGlass.Root open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Delete Item</ModalGlass.Title>
      <ModalGlass.Description>
        This action cannot be undone.
      </ModalGlass.Description>
      <ModalGlass.Close />
    </ModalGlass.Header>

    <ModalGlass.Body>
      <p>Are you sure you want to delete this item?</p>
    </ModalGlass.Body>

    <ModalGlass.Footer className="justify-end">
      <ButtonGlass
        variant="outline"
        onClick={() => setIsDeleteOpen(false)}
      >
        Cancel
      </ButtonGlass>
      <ButtonGlass
        variant="destructive"
        onClick={handleDelete}
      >
        Delete
      </ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

---

### Example 3: Modal with Custom Styling

**Before (Legacy):**
```tsx
<ModalGlass
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Settings"
  className="max-w-2xl"
>
  <div className="p-6">
    <SettingsForm />
  </div>
</ModalGlass>
```

**After (Compound - More Control):**
```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay className="bg-black/60" />
  <ModalGlass.Content size="lg" className="max-w-2xl">
    <ModalGlass.Header className="border-b border-white/10">
      <ModalGlass.Title className="text-2xl">Settings</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>

    <ModalGlass.Body className="p-6">
      <SettingsForm />
    </ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

---

### Example 4: Modal Without Header/Footer

**Before (Legacy):**
```tsx
<ModalGlass
  isOpen={open}
  onClose={() => setOpen(false)}
>
  <ImageGallery images={images} />
</ModalGlass>
```

**After (Compound - Flexible):**
```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content size="xl">
    {/* No header - just body */}
    <ModalGlass.Body className="p-0">
      <ImageGallery images={images} />
      {/* Optional: Add close button in top-right corner */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 p-2 rounded-lg bg-black/50"
      >
        <X className="w-4 h-4" />
      </button>
    </ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

---

## Component API Reference

### ModalGlass.Root

**Props:**
- `open: boolean` - Controlled open state
- `onOpenChange: (open: boolean) => void` - Called when modal should open/close
- `children: ReactNode` - Must contain `ModalGlass.Content`

### ModalGlass.Overlay

**Props:**
- `className?: string` - Custom classes for overlay
- Standard HTML div attributes

**Default behavior:**
- Click to close
- Backdrop blur effect

### ModalGlass.Content

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` - Modal size
- `className?: string` - Custom classes
- `children: ReactNode` - Modal content
- Standard HTML div attributes

### ModalGlass.Header

**Props:**
- `className?: string` - Custom classes
- `children: ReactNode` - Header content
- Standard HTML div attributes

**Typical children:** `Title`, `Description`, `Close`

### ModalGlass.Title

**Props:**
- `className?: string` - Custom classes
- `children: ReactNode` - Title text
- Standard HTML heading attributes

### ModalGlass.Description

**Props:**
- `className?: string` - Custom classes
- `children: ReactNode` - Description text
- Standard HTML paragraph attributes

### ModalGlass.Body

**Props:**
- `className?: string` - Custom classes
- `children: ReactNode` - Body content
- Standard HTML div attributes

### ModalGlass.Footer

**Props:**
- `className?: string` - Custom classes
- `children: ReactNode` - Footer content (typically buttons)
- Standard HTML div attributes

### ModalGlass.Close

**Props:**
- `className?: string` - Custom classes
- Standard HTML button attributes

**Default:** Renders X icon button

---

## Benefits by Use Case

### 1. **Complex Forms**
Compound API makes it easier to add custom headers, sections, and footers:
```tsx
<ModalGlass.Root>
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Multi-Step Form</ModalGlass.Title>
      <div className="flex gap-2">
        <Badge>Step {step}/3</Badge>
      </div>
    </ModalGlass.Header>
    {/* ... */}
  </ModalGlass.Content>
</ModalGlass.Root>
```

### 2. **Custom Layouts**
Skip header/footer when you don't need them:
```tsx
<ModalGlass.Root>
  <ModalGlass.Content>
    <ModalGlass.Body className="p-0">
      <VideoPlayer />
    </ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
```

### 3. **Advanced Styling**
Target specific parts independently:
```tsx
<ModalGlass.Root>
  <ModalGlass.Overlay className="bg-gradient-to-br from-purple-900/50" />
  <ModalGlass.Content className="shadow-2xl">
    <ModalGlass.Header className="bg-gradient-to-r from-purple-500">
      {/* ... */}
    </ModalGlass.Header>
  </ModalGlass.Content>
</ModalGlass.Root>
```

---

## Migration Timeline

| Version | Status | Notes |
|---------|--------|-------|
| **v0.x** | ✅ Both APIs supported | Legacy API fully functional |
| **v1.0.0** | 🔥 Legacy removed | Only Compound API available |

**Note:** Legacy API was removed in v1.0.0. Use the Compound API as shown above.

---

## Performance Notes

- ✅ **No performance difference** - Both APIs render the same DOM structure
- ✅ **Bundle size** - Compound API adds ~200 bytes (negligible)
- ✅ **Tree shaking** - Unused sub-components are removed in production builds

---

## Accessibility

The Compound API enhances accessibility:

- ✅ `ModalGlass.Title` automatically sets `aria-labelledby`
- ✅ `ModalGlass.Description` automatically sets `aria-describedby`
- ✅ `ModalGlass.Close` has proper `aria-label="Close modal"`
- ✅ Keyboard navigation (Escape, Tab) works identically

---

## Common Pitfalls

### ❌ Forgetting ModalGlass.Root
```tsx
// Wrong - will not work
<ModalGlass.Content>
  {/* ... */}
</ModalGlass.Content>
```

```tsx
// Correct
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content>
    {/* ... */}
  </ModalGlass.Content>
</ModalGlass.Root>
```

### ❌ Missing Overlay
```tsx
// Works but no backdrop
<ModalGlass.Root>
  <ModalGlass.Content>{/* ... */}</ModalGlass.Content>
</ModalGlass.Root>
```

```tsx
// Add overlay for backdrop
<ModalGlass.Root>
  <ModalGlass.Overlay />
  <ModalGlass.Content>{/* ... */}</ModalGlass.Content>
</ModalGlass.Root>
```

---

## Need Help?

- 📖 See [Storybook examples](http://localhost:6006/?path=/story/components-modalglass--compound-api)
- 💬 Ask in [GitHub Discussions](https://github.com/your-org/shadcn-glass-ui-library/discussions)
- 🐛 Report issues in [GitHub Issues](https://github.com/your-org/shadcn-glass-ui-library/issues)

---

**Last updated:** 2025-12-05
**Status:** ✅ Ready for migration
**Backward compatibility:** Maintained until v5.0
