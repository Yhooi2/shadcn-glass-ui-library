# CardGlass

Glass-themed card component with full shadcn/ui Card API compatibility.

## Overview

CardGlass is a compound component that provides a structured glass-themed card with flexible
composition. It's 100% compatible with shadcn/ui Card API and supports multiple intensity levels,
glow effects, and hover states.

### Key Features

- **shadcn/ui Compatible** - Drop-in replacement for shadcn/ui Card
- **Compound Component API** - Flexible composition with 7 sub-components
- **Intensity Variants** - 3 blur levels: subtle (8px), medium (16px), strong (24px)
- **Glow Effects** - Optional blue, violet, or cyan glow shadows
- **Hover Effects** - Optional cursor pointer and border highlight
- **Flexible Layout** - Header with automatic action positioning via CSS Grid
- **Type-Safe** - Full TypeScript support with exported types
- **CSS Variables** - Theme-aware styling using design tokens
- **Accessible** - Semantic HTML, WCAG AA contrast compliance

### Browser Compatibility

- Chrome 89+
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

```tsx
import { CardGlass } from 'shadcn-glass-ui';

// Or use shadcn/ui compatible aliases
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure

```tsx
<CardGlass.Root intensity="medium" glow="blue" hover={false}>
  <CardGlass.Header>
    <CardGlass.Title>Card Title</CardGlass.Title>
    <CardGlass.Description>Card description text</CardGlass.Description>
    <CardGlass.Action>
      <ButtonGlass size="sm">Action</ButtonGlass>
    </CardGlass.Action>
  </CardGlass.Header>

  <CardGlass.Content>{/* Main content goes here */}</CardGlass.Content>

  <CardGlass.Footer>
    <ButtonGlass variant="ghost">Cancel</ButtonGlass>
    <ButtonGlass>Save</ButtonGlass>
  </CardGlass.Footer>
</CardGlass.Root>
```

### Full Component List

| Component     | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `Root`        | Glass-themed card container with intensity, glow, hover props |
| `Header`      | Grid layout container for title, description, and action      |
| `Title`       | Card title text (semibold, primary color)                     |
| `Description` | Card subtitle/description (sm, muted color)                   |
| `Action`      | Positioned action slot in header (auto-positioned right)      |
| `Content`     | Main content area with padding                                |
| `Footer`      | Footer area with flex layout for actions                      |

---

## Props API

### CardGlass.Root

| Prop        | Type                                   | Default    | Description                                   |
| ----------- | -------------------------------------- | ---------- | --------------------------------------------- |
| `intensity` | `'subtle' \| 'medium' \| 'strong'`     | `'medium'` | Glass blur intensity (8px/16px/24px)          |
| `glow`      | `'blue' \| 'violet' \| 'cyan' \| null` | `null`     | Glow effect color                             |
| `hover`     | `boolean`                              | `false`    | Enable hover effects (shadow, border, cursor) |
| `className` | `string`                               | -          | Additional CSS classes                        |
| `style`     | `CSSProperties`                        | -          | Inline styles (merged with defaults)          |

**Extends:** `React.ComponentProps<'div'>`

### CardGlass.Header

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

**Layout:** CSS Grid with automatic action positioning when `CardGlass.Action` is present.

### CardGlass.Title

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

### CardGlass.Description

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

### CardGlass.Action

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

**Note:** Automatically positioned to the right of title/description via CSS Grid.

### CardGlass.Content

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

### CardGlass.Footer

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.ComponentProps<'div'>`

---

## Usage Examples

### Basic Card

```tsx
<CardGlass.Root>
  <CardGlass.Header>
    <CardGlass.Title>Card Title</CardGlass.Title>
    <CardGlass.Description>This is a description of the card content.</CardGlass.Description>
  </CardGlass.Header>
  <CardGlass.Content>
    <p>This is the main content area of the card.</p>
  </CardGlass.Content>
  <CardGlass.Footer>
    <ButtonGlass variant="ghost" size="sm">
      Cancel
    </ButtonGlass>
    <ButtonGlass size="sm">Save</ButtonGlass>
  </CardGlass.Footer>
</CardGlass.Root>
```

### Card with Action

```tsx
<CardGlass.Root>
  <CardGlass.Header>
    <CardGlass.Title>Settings</CardGlass.Title>
    <CardGlass.Description>Manage your account settings</CardGlass.Description>
    <CardGlass.Action>
      <BadgeGlass variant="secondary">Pro</BadgeGlass>
    </CardGlass.Action>
  </CardGlass.Header>
  <CardGlass.Content>
    <p>Configure your preferences and account options here.</p>
  </CardGlass.Content>
</CardGlass.Root>
```

### Intensity Variants

```tsx
{
  /* Subtle - 8px blur */
}
<CardGlass.Root intensity="subtle">
  <CardGlass.Content>Light glass effect</CardGlass.Content>
</CardGlass.Root>;

{
  /* Medium - 16px blur (default) */
}
<CardGlass.Root intensity="medium">
  <CardGlass.Content>Standard glass effect</CardGlass.Content>
</CardGlass.Root>;

{
  /* Strong - 24px blur */
}
<CardGlass.Root intensity="strong">
  <CardGlass.Content>Heavy glass effect</CardGlass.Content>
</CardGlass.Root>;
```

### Glow Variants

```tsx
{
  /* Blue glow */
}
<CardGlass.Root glow="blue">
  <CardGlass.Header>
    <CardGlass.Title>Blue Glow</CardGlass.Title>
  </CardGlass.Header>
  <CardGlass.Content>Card with blue glow shadow</CardGlass.Content>
</CardGlass.Root>;

{
  /* Violet glow */
}
<CardGlass.Root glow="violet">
  <CardGlass.Header>
    <CardGlass.Title>Violet Glow</CardGlass.Title>
  </CardGlass.Header>
  <CardGlass.Content>Card with violet glow shadow</CardGlass.Content>
</CardGlass.Root>;

{
  /* Cyan glow */
}
<CardGlass.Root glow="cyan">
  <CardGlass.Header>
    <CardGlass.Title>Cyan Glow</CardGlass.Title>
  </CardGlass.Header>
  <CardGlass.Content>Card with cyan glow shadow</CardGlass.Content>
</CardGlass.Root>;
```

### Clickable Card with Hover

```tsx
<CardGlass.Root hover onClick={() => navigate('/details')}>
  <CardGlass.Header>
    <CardGlass.Title>Clickable Card</CardGlass.Title>
    <CardGlass.Description>Click to view details</CardGlass.Description>
  </CardGlass.Header>
  <CardGlass.Content>
    <p>This card has hover effects and can be clicked.</p>
  </CardGlass.Content>
</CardGlass.Root>
```

### Form Card

```tsx
<CardGlass.Root>
  <CardGlass.Header>
    <CardGlass.Title>Create Account</CardGlass.Title>
    <CardGlass.Description>Enter your details to create a new account</CardGlass.Description>
  </CardGlass.Header>
  <CardGlass.Content>
    <div className="space-y-4">
      <InputGlass label="Email" type="email" placeholder="email@example.com" />
      <InputGlass label="Password" type="password" placeholder="Enter password" />
    </div>
  </CardGlass.Content>
  <CardGlass.Footer>
    <ButtonGlass variant="ghost">Cancel</ButtonGlass>
    <ButtonGlass>Sign Up</ButtonGlass>
  </CardGlass.Footer>
</CardGlass.Root>
```

### Content Only

```tsx
<CardGlass.Root>
  <CardGlass.Content>
    <p>This card only has content, no header or footer.</p>
    <p>Useful for simple information display.</p>
  </CardGlass.Content>
</CardGlass.Root>
```

### Complete Example

```tsx
<CardGlass.Root intensity="medium" glow="blue">
  <CardGlass.Header>
    <CardGlass.Title>Complete Card Example</CardGlass.Title>
    <CardGlass.Description>
      This card demonstrates all available sub-components
    </CardGlass.Description>
    <CardGlass.Action>
      <ButtonGlass size="sm" variant="secondary">
        Action
      </ButtonGlass>
    </CardGlass.Action>
  </CardGlass.Header>
  <CardGlass.Content>
    <div className="space-y-2">
      <p>The CardGlass component provides:</p>
      <ul className="list-disc list-inside text-sm">
        <li>Header with title, description, and action slot</li>
        <li>Content area for main content</li>
        <li>Footer for actions</li>
      </ul>
    </div>
  </CardGlass.Content>
  <CardGlass.Footer>
    <span className="text-sm text-muted">Last updated: Today</span>
    <div className="ml-auto flex gap-2">
      <ButtonGlass variant="ghost" size="sm">
        Cancel
      </ButtonGlass>
      <ButtonGlass size="sm">Confirm</ButtonGlass>
    </div>
  </CardGlass.Footer>
</CardGlass.Root>
```

---

## CSS Variables

CardGlass uses CSS variables for theme-aware styling:

### Background Variables

```css
--card-subtle-bg: /* Light glass background */ --card-medium-bg: /* Standard glass background */
  --card-strong-bg: /* Heavy glass background */;
```

### Border Variables

```css
--card-subtle-border: /* Light border color */ --card-medium-border: /* Standard border color */
  --card-strong-border: /* Heavy border color */ --card-hover-border: /* Hover state border color */;
```

### Glow Variables

```css
--glow-neutral: /* Default glow (no color) */ --glow-blue: /* Blue glow shadow */
  --glow-violet: /* Violet glow shadow */ --glow-cyan: /* Cyan glow shadow */;
```

### Blur Variables

```css
--blur-sm: 8px; /* Subtle intensity */
--blur-md: 16px; /* Medium intensity */
--blur-lg: 24px; /* Strong intensity */
```

---

## Accessibility

### Semantic HTML

- Uses `<div>` elements with appropriate `data-slot` attributes
- Supports all standard HTML div props
- Compatible with ARIA attributes

### Color Contrast

- Primary text: Uses `--text-primary` (WCAG AA compliant)
- Description text: Uses `--text-muted` (WCAG AA compliant)
- Background: Sufficient contrast across all intensity levels

### Keyboard Support

CardGlass itself doesn't handle keyboard events, but when `hover` prop is enabled with `onClick`:

| Key     | Action                                          |
| ------- | ----------------------------------------------- |
| `Enter` | Activates card (if onClick provided)            |
| `Space` | Activates card (if onClick provided)            |
| `Tab`   | Focus moves to interactive elements within card |

**Recommendation:** When using `hover` with `onClick`, add `role="button"` and `tabIndex={0}` for
proper keyboard accessibility.

```tsx
<CardGlass.Root
  hover
  onClick={handleClick}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  {/* content */}
</CardGlass.Root>
```

---

## shadcn/ui Compatibility

CardGlass provides 100% API compatibility with shadcn/ui Card:

### Component Aliases

| CardGlass               | shadcn/ui Card    | Compatibility         |
| ----------------------- | ----------------- | --------------------- |
| `CardGlass.Root`        | `Card`            | ✅ 100%               |
| `CardGlass.Header`      | `CardHeader`      | ✅ 100%               |
| `CardGlass.Title`       | `CardTitle`       | ✅ 100%               |
| `CardGlass.Description` | `CardDescription` | ✅ 100%               |
| `CardGlass.Content`     | `CardContent`     | ✅ 100%               |
| `CardGlass.Footer`      | `CardFooter`      | ✅ 100%               |
| `CardGlass.Action`      | -                 | ⚠️ Glass UI extension |

### Usage Comparison

```tsx
// shadcn/ui style
import { Card, CardHeader, CardTitle, CardContent } from 'shadcn-glass-ui';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>;

// Glass UI style (same result)
import { CardGlass } from 'shadcn-glass-ui';

<CardGlass.Root>
  <CardGlass.Header>
    <CardGlass.Title>Title</CardGlass.Title>
  </CardGlass.Header>
  <CardGlass.Content>Content</CardGlass.Content>
</CardGlass.Root>;
```

### Migration from shadcn/ui

CardGlass is a drop-in replacement with additional glass effects:

```tsx
// Before (shadcn/ui)
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>;

// After (Glass UI)
import { Card, CardHeader, CardTitle } from 'shadcn-glass-ui';

<Card intensity="medium" glow="blue">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>;
```

**No breaking changes** - All shadcn/ui Card props work identically.

---

## Comparison with GlassCard

| Feature                  | GlassCard               | CardGlass               |
| ------------------------ | ----------------------- | ----------------------- |
| **API Style**            | Simple props            | Compound components     |
| **Structure**            | Single container        | Header, Content, Footer |
| **Flexibility**          | Basic                   | High (composable)       |
| **Use Case**             | Simple glass containers | Structured card layouts |
| **shadcn/ui Compatible** | ❌ No                   | ✅ Yes                  |
| **Sub-components**       | None                    | 7 components            |
| **TypeScript**           | Basic types             | Full compound types     |

**When to use:**

- **GlassCard** - Simple glass container without structure
- **CardGlass** - Structured card with shadcn/ui compatibility

---

## Related Components

- [GlassCard](../COMPONENTS_CATALOG.md#glasscard) - Simple glass container
- [ModalGlass](./MODAL_GLASS.md) - Glass-themed modal/dialog
- [SheetGlass](./SHEET_GLASS.md) - Glass-themed side sheet
- [ButtonGlass](../COMPONENTS_CATALOG.md#buttonglass) - Glass-themed button
- [BadgeGlass](../COMPONENTS_CATALOG.md#badgeglass) - Glass-themed badge

---

## Version History

- **v2.6.0** - Added shadcn/ui compatible aliases (Card, CardHeader, etc.)
- **v2.0.0** - Initial compound component API release

---

**Last Updated:** 2025-12-21 **Component Status:** Stable **shadcn/ui Compatibility:** 100%
