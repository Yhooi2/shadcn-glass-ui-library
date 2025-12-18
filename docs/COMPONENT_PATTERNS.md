# Component Patterns Guide

This document defines the established patterns for Glass UI components to ensure consistency across
the library.

## Naming Convention

### Standard Pattern: `{Feature}Glass`

All Glass UI components follow a consistent naming pattern: **`{Feature}Glass`**

**Examples:**

- `ButtonGlass` - Button component
- `InputGlass` - Input component
- `AlertGlass` - Alert component
- `ModalGlass` - Modal/Dialog component
- `TabsGlass` - Tabs component
- `SidebarGlass` - Sidebar component
- `CardGlass` - Card component (compound)

### Exception: `GlassCard`

The `GlassCard` component is the only exception to this pattern. It uses `Glass{Feature}` instead of
`{Feature}Glass`. This is intentional and documented:

- **`GlassCard`** - A simple glass container with visual effects (intensity, glow, hover)
- **`CardGlass`** - A structured card with compound sub-components (shadcn/ui pattern)

Both serve different purposes:

- `GlassCard` = "Glass Container" (visual effects focus)
- `CardGlass` = "Structured Card" (layout/composition focus)

---

## Export Patterns

### Pattern 1: Object Pattern (Complex Compound Components)

**When to use:** Components with 5+ sub-components

**Structure:**

```tsx
export const ComponentGlass = {
  Root: ComponentRoot,
  Header: ComponentHeader,
  Content: ComponentContent,
  Footer: ComponentFooter,
  // ... more sub-components
};
```

**Usage:**

```tsx
<ComponentGlass.Root>
  <ComponentGlass.Header>
    <ComponentGlass.Title>Title</ComponentGlass.Title>
  </ComponentGlass.Header>
  <ComponentGlass.Content>Content</ComponentGlass.Content>
  <ComponentGlass.Footer>Footer</ComponentGlass.Footer>
</ComponentGlass.Root>
```

**Examples:**

- `ModalGlass` (10 sub-components)
- `TabsGlass` (4 sub-components)
- `SidebarGlass` (20+ sub-components)
- `SplitLayoutGlass` (10+ sub-components)
- `CardGlass` (7 sub-components)

### Pattern 2: Named Exports (Simple Compound Components)

**When to use:** Components with 2-4 sub-components

**Structure:**

```tsx
export const AlertGlass = AlertGlassRoot;
export { AlertGlassTitle, AlertGlassDescription };
```

**Usage:**

```tsx
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Something went wrong</AlertGlassDescription>
</AlertGlass>
```

**Examples:**

- `AlertGlass` (3 exports)
- `PopoverGlass` (4 exports)
- `TooltipGlass` (5 exports)
- `AvatarGlass` (4 exports)

### Pattern 3: Single Export (Atomic Components)

**When to use:** Self-contained components without sub-components

**Structure:**

```tsx
export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  ({ variant, size, className, ...props }, ref) => { ... }
);
```

**Examples:**

- `ButtonGlass`
- `BadgeGlass`
- `InputGlass`
- `CheckboxGlass`
- `SliderGlass`
- `ToggleGlass`

---

## Compound Component Structure

### Sub-component Naming

For compound components using Object Pattern:

- Root component: `ComponentRoot` (internal), `ComponentGlass.Root` (exported)
- Sub-components: `ComponentHeader`, `ComponentTitle`, etc.

### TypeScript Types

```tsx
// Props interface
interface ComponentGlassProps extends React.ComponentProps<'div'> {
  // Component-specific props
}

// For Radix-based components
type ComponentGlassProps = React.ComponentProps<typeof Primitive.Root>;
```

### Data Slot Attributes

All sub-components should include `data-slot` attributes for styling hooks:

```tsx
function CardGlassHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cn('...', className)} {...props} />;
}
```

---

## CSS Variable Naming

### 3-Layer Token Architecture

Glass UI uses a 3-layer token system:

1. **Layer 1 - Primitives:** `--oklch-*` (color values)
2. **Layer 2 - Semantic:** `--semantic-*` (role-based)
3. **Layer 3 - Component:** `--{component}-*` (component-specific)

### Component Token Pattern

```css
/* Card Component Tokens */
--card-subtle-bg: var(--semantic-surface);
--card-medium-bg: var(--semantic-surface-elevated);
--card-header-gap: 0.5rem;

/* Modal Component Tokens */
--modal-bg: var(--semantic-surface-elevated);
--modal-overlay: var(--semantic-overlay);
--modal-border: var(--semantic-border);
```

---

## Radix UI Integration

### When to Use Radix Primitives

Use `@radix-ui/react-*` primitives for:

- Components requiring complex accessibility (Dialog, Tooltip, Popover)
- Components with trigger/portal patterns
- Components needing state management (open/close, selected)

### Wrapping Pattern

```tsx
import * as DialogPrimitive from '@radix-ui/react-dialog';

function ModalGlassRoot({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="modal" {...props} />;
}

function ModalGlassTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />;
}
```

---

## File Organization

### Component Files

```
src/components/glass/ui/
├── button-glass.tsx           # Single component
├── button-glass.stories.tsx   # Colocated stories
├── alert-glass.tsx            # Named exports compound
├── modal-glass.tsx            # Object pattern compound
├── card-glass.tsx             # Object pattern compound
└── __tests__/
    ├── button-glass.test.tsx
    ├── alert-glass.test.tsx
    └── modal-glass.test.tsx
```

### Complex Components (Nested Directory)

```
src/components/glass/ui/sidebar-glass/
├── index.ts                   # Barrel export
├── sidebar-context.tsx        # Context provider
├── sidebar-glass.tsx          # Main components
└── sidebar-menu.tsx           # Menu sub-components
```

---

## Accessibility Requirements

All Glass components must meet WCAG 2.1 AA standards:

1. **Keyboard Navigation:** All interactive elements accessible via keyboard
2. **Focus Management:** Visible focus indicators, focus trapping where appropriate
3. **Screen Readers:** Proper ARIA attributes, semantic HTML
4. **Color Contrast:** Meet minimum contrast ratios
5. **Motion:** Respect `prefers-reduced-motion`

### JSDoc Accessibility Documentation

```tsx
/**
 * ModalGlass Component
 *
 * @accessibility
 * - **Keyboard Navigation:** Escape key closes modal, Tab traps focus
 * - **Focus Management:** Focus moved to modal on open, returned on close
 * - **Screen Readers:** Uses role="dialog" and aria-modal="true"
 */
```

---

## Testing Requirements

### Unit Tests

Every component must have unit tests covering:

- Rendering with default props
- All variant combinations
- Accessibility attributes
- Event handlers

### Visual Regression Tests

All components need visual tests for:

- All 3 themes (glass, light, aurora)
- All size variants
- All state variations (hover, focus, disabled)

### Storybook Stories

Required stories:

- Default usage
- All variants
- All sizes
- Interactive examples
- Accessibility showcase

---

## Migration Guide

### From shadcn/ui to Glass UI

Replace shadcn/ui imports with Glass UI equivalents:

```tsx
// Before (shadcn/ui)
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// After (Glass UI)
import { CardGlass } from '@/components/glass/ui';

// Usage
<CardGlass.Root>
  <CardGlass.Header>
    <CardGlass.Title>Title</CardGlass.Title>
  </CardGlass.Header>
  <CardGlass.Content>Content</CardGlass.Content>
</CardGlass.Root>;
```

For named export pattern (simpler components):

```tsx
// Before (shadcn/ui)
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// After (Glass UI)
import { AlertGlass, AlertGlassTitle, AlertGlassDescription } from '@/components/glass/ui';
```
