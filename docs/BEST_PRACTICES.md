# Best Practices for shadcn-glass-ui

A comprehensive guide for building applications with shadcn-glass-ui.

## Table of Contents

- [Theme Setup](#theme-setup)
- [Form Patterns](#form-patterns)
- [Modal Patterns](#modal-patterns)
- [Theme Switching](#theme-switching)
- [Accessibility Checklist](#accessibility-checklist)
- [Performance Tips](#performance-tips)
- [Common Patterns](#common-patterns)
- [TypeScript Best Practices](#typescript-best-practices)

---

## Theme Setup

Always wrap your app with ThemeProvider at the root level:

```tsx
import { ThemeProvider } from 'shadcn-glass-ui';
import 'shadcn-glass-ui/dist/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Available Themes

| Theme    | Description                          |
| -------- | ------------------------------------ |
| `glass`  | Dark glassmorphism (default)         |
| `light`  | Light mode with subtle glass effects |
| `aurora` | Gradient theme with aurora effects   |

### Theme-Specific CSS Variables

```css
/* Custom styling using theme variables */
.custom-card {
  background: var(--glass-bg);
  backdrop-filter: var(--blur-md);
  border: 1px solid var(--glass-border);
  box-shadow: var(--focus-glow);
}
```

---

## Form Patterns

### Basic Form with Validation

```tsx
import { InputGlass, ButtonGlass } from 'shadcn-glass-ui';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputGlass
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="you@example.com"
      />
      <InputGlass
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="Enter password"
      />
      <ButtonGlass type="submit" variant="primary" className="w-full">
        Sign In
      </ButtonGlass>
    </form>
  );
}
```

### Form with Success States

```tsx
<InputGlass
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  error={!isValidUsername ? 'Username must be 3+ characters' : undefined}
  success={isValidUsername ? 'Username is available' : undefined}
/>
```

### Form with FormFieldWrapper

```tsx
import { FormFieldWrapper } from 'shadcn-glass-ui';

<FormFieldWrapper label="Email" error={errors.email} required>
  <input type="email" className="..." />
</FormFieldWrapper>;
```

---

## Modal Patterns

### Confirmation Modal

```tsx
import { ModalGlass, ButtonGlass } from 'shadcn-glass-ui';

function ConfirmDialog({ open, onConfirm, onCancel, title, message }: ConfirmDialogProps) {
  return (
    <ModalGlass.Root open={open} onOpenChange={onCancel}>
      <ModalGlass.Overlay />
      <ModalGlass.Content size="sm">
        <ModalGlass.Header>
          <ModalGlass.Title>{title}</ModalGlass.Title>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>{message}</p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ButtonGlass variant="ghost" onClick={onCancel}>
            Cancel
          </ButtonGlass>
          <ButtonGlass variant="destructive" onClick={onConfirm}>
            Confirm
          </ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  );
}
```

### Form Modal with Validation

```tsx
function CreateProjectModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    onSubmit({ name });
    setName('');
    onClose();
  };

  return (
    <ModalGlass.Root open={open} onOpenChange={onClose}>
      <ModalGlass.Overlay />
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Create Project</ModalGlass.Title>
          <ModalGlass.Description>Enter details for your new project</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <InputGlass
            label="Project Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            error={error}
            placeholder="My Project"
          />
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ButtonGlass variant="ghost" onClick={onClose}>
            Cancel
          </ButtonGlass>
          <ButtonGlass variant="primary" onClick={handleSubmit}>
            Create
          </ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  );
}
```

---

## Theme Switching

### Basic Theme Toggle

```tsx
import { useTheme, ButtonGlass } from 'shadcn-glass-ui';
import { Moon, Sun, Sparkles } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme, cycleTheme } = useTheme();

  const icons = {
    glass: <Moon className="h-4 w-4" />,
    light: <Sun className="h-4 w-4" />,
    aurora: <Sparkles className="h-4 w-4" />,
  };

  return (
    <ButtonGlass
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={`Switch to next theme (current: ${theme})`}
    >
      {icons[theme]}
    </ButtonGlass>
  );
}
```

### Theme Selector Dropdown

```tsx
import { useTheme, DropdownGlass, ButtonGlass } from 'shadcn-glass-ui';

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownGlass
      trigger={<ButtonGlass variant="ghost">Theme: {theme}</ButtonGlass>}
      items={[
        { label: 'Glass (Dark)', onClick: () => setTheme('glass') },
        { label: 'Light', onClick: () => setTheme('light') },
        { label: 'Aurora', onClick: () => setTheme('aurora') },
      ]}
    />
  );
}
```

---

## Accessibility Checklist

### Essential Requirements

- [ ] All interactive elements have visible focus states
- [ ] Icon-only buttons have `aria-label`
- [ ] Forms have proper label associations
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] Touch targets are at least 44x44px
- [ ] Modals trap focus correctly
- [ ] Content is navigable via keyboard

### Icon Button Accessibility

```tsx
// BAD - No accessible name
<ButtonGlass size="icon">
  <X />
</ButtonGlass>

// GOOD - Has aria-label
<ButtonGlass size="icon" aria-label="Close dialog">
  <X />
</ButtonGlass>

// BETTER - With tooltip for sighted users
<TooltipGlass content="Close dialog">
  <ButtonGlass size="icon" aria-label="Close dialog">
    <X />
  </ButtonGlass>
</TooltipGlass>
```

### Form Field Accessibility

```tsx
// GOOD - Label associated with input
<InputGlass
  id="email"
  label="Email Address"
  type="email"
  required
  aria-describedby="email-error"
/>;
{
  error && (
    <p id="email-error" role="alert">
      {error}
    </p>
  );
}
```

### Expandable Sections

```tsx
// ExpandableHeaderGlass has built-in ARIA attributes
<ExpandableHeaderGlass title="Advanced Options" defaultExpanded={false}>
  <p>Hidden content</p>
</ExpandableHeaderGlass>
```

---

## Performance Tips

### 1. Memoize ComboBox Options

```tsx
// BAD - Creates new array on every render
<ComboBoxGlass
  options={[
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
  ]}
  value={value}
  onChange={setValue}
/>;

// GOOD - Memoized options
const options = useMemo(
  () => [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
  ],
  []
);

<ComboBoxGlass options={options} value={value} onChange={setValue} />;
```

### 2. Lazy Load Modal Content

```tsx
import { lazy, Suspense } from 'react';

const HeavyModalContent = lazy(() => import('./HeavyModalContent'));

<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content>
    <Suspense fallback={<SkeletonGlass height={200} />}>
      <HeavyModalContent />
    </Suspense>
  </ModalGlass.Content>
</ModalGlass.Root>;
```

### 3. Use CSS Variables for Custom Styles

```css
/* GOOD - Uses theme CSS variables */
.custom-card {
  background: var(--glass-bg);
  backdrop-filter: var(--blur-md);
}

/* BAD - Hardcoded values */
.custom-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
}
```

### 4. Prefer GlassCard Intensity Variants

```tsx
// Use intensity variants instead of custom blur
<GlassCard intensity="subtle">Low blur content</GlassCard>
<GlassCard intensity="medium">Normal blur content</GlassCard>
<GlassCard intensity="strong">High blur content</GlassCard>
```

### 5. RainbowProgressGlass Performance

RainbowProgressGlass uses GPU-optimized animations with `will-change`. Avoid having many instances
on a single page:

```tsx
// GOOD - Single prominent progress
<RainbowProgressGlass value={progress} />;

// For multiple progress bars, use ProgressGlass instead
{
  items.map((item) => <ProgressGlass key={item.id} value={item.progress} />);
}
```

---

## Common Patterns

### Button as Link (asChild)

```tsx
import { Link } from 'react-router-dom'; // or next/link

<ButtonGlass asChild variant="ghost">
  <Link href="/dashboard">Go to Dashboard</Link>
</ButtonGlass>;
```

### Card as Link (asChild)

```tsx
<GlassCard asChild>
  <a href="/project/123" className="block">
    <h3>Project Name</h3>
    <p>Project description</p>
  </a>
</GlassCard>
```

### Segmented Control for Exclusive Selection

```tsx
// Use instead of radio buttons for glass-styled exclusive selection
<SegmentedControlGlass
  options={['Day', 'Week', 'Month', 'Year']}
  value={period}
  onChange={setPeriod}
/>
```

### Status Display

```tsx
<div className="flex items-center gap-2">
  <StatusIndicatorGlass status="online" />
  <span>User is online</span>
</div>
```

### Metric Dashboard Card

```tsx
<MetricCardGlass label="Total Revenue" value="$45,678" change={12.5} trend="up" progress={75} />
```

---

## TypeScript Best Practices

### Component Props Types

```tsx
import type { ButtonGlassProps } from 'shadcn-glass-ui';

// Extend component props
interface MyButtonProps extends ButtonGlassProps {
  analyticsId: string;
}

function MyButton({ analyticsId, onClick, ...props }: MyButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackClick(analyticsId);
    onClick?.(e);
  };

  return <ButtonGlass onClick={handleClick} {...props} />;
}
```

### Theme Type Safety

```tsx
import type { Theme } from 'shadcn-glass-ui';

function saveThemePreference(theme: Theme) {
  localStorage.setItem('theme', theme);
}
```

### Strict Mode Compliance

```tsx
// All components are strict TypeScript compliant
// No 'any' types - use proper typing

// BAD
const handleChange = (value: any) => setValue(value);

// GOOD
const handleChange = (value: string) => setValue(value);
```

---

## Testing Guidelines

### Test All 3 Themes

Before shipping, test components with all themes:

```tsx
describe('MyComponent', () => {
  const themes = ['glass', 'light', 'aurora'] as const;

  themes.forEach((theme) => {
    it(`renders correctly in ${theme} theme`, () => {
      render(
        <ThemeProvider defaultTheme={theme}>
          <MyComponent />
        </ThemeProvider>
      );
      expect(screen.getByRole('button')).toBeVisible();
    });
  });
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Migration Notes

### From variant="danger" to variant="destructive"

```tsx
// OLD (removed in v1.0)
<ButtonGlass variant="danger">Delete</ButtonGlass>

// NEW
<ButtonGlass variant="destructive">Delete</ButtonGlass>
```

### From type prop to variant prop

```tsx
// OLD (AlertGlass, NotificationGlass)
<AlertGlass type="error" title="Error">...</AlertGlass>

// NEW
<AlertGlass variant="destructive" title="Error">...</AlertGlass>
```

### From SelectGlass to ComboBoxGlass

```tsx
// OLD (SelectGlass removed in v1.0)
<SelectGlass options={options} value={value} onChange={setValue} />

// NEW
<ComboBoxGlass options={options} value={value} onChange={setValue} />
```

---

**Total Components:** 55 **TypeScript:** Full strict mode support **Accessibility:** WCAG 2.1 AA
compliant **Themes:** 3 (glass, light, aurora)
