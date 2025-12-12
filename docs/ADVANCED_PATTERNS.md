# Advanced Patterns

This guide covers advanced usage patterns for shadcn-glass-ui components.

## Table of Contents

- [asChild Pattern](#aschild-pattern) - Polymorphic rendering
- [Compound Components](#compound-components) - Fine-grained composition
- [Theme Integration](#theme-integration) - Dynamic theming
- [Accessibility Patterns](#accessibility-patterns) - WCAG 2.1 AA compliance

---

## asChild Pattern

The `asChild` prop enables polymorphic rendering using Radix UI Slot. This allows you to render a
component as any element while preserving all styles and behaviors.

### Supported Components

- `ButtonGlass`
- `AvatarGlass`
- `GlassCard`

### Basic Usage

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';
import { Link } from 'react-router-dom';

// Render button as React Router Link
<ButtonGlass asChild>
  <Link to="/profile">View Profile</Link>
</ButtonGlass>

// Render button as anchor tag
<ButtonGlass asChild variant="primary">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>
</ButtonGlass>

// Render button as Next.js Link
import NextLink from 'next/link';

<ButtonGlass asChild variant="secondary">
  <NextLink href="/dashboard">Dashboard</NextLink>
</ButtonGlass>
```

### With GlassCard

```tsx
import { GlassCard } from 'shadcn-glass-ui';

// Render card as article
<GlassCard asChild>
  <article>
    <h2>Card Title</h2>
    <p>Card content...</p>
  </article>
</GlassCard>

// Render card as link
<GlassCard asChild>
  <a href="/details" className="block">
    <h3>Clickable Card</h3>
    <p>Click anywhere to navigate</p>
  </a>
</GlassCard>
```

### With AvatarGlass

```tsx
import { AvatarGlass } from 'shadcn-glass-ui';

// Avatar as link to profile
<AvatarGlass asChild size="lg">
  <a href="/user/123">
    <img src="/avatar.jpg" alt="User" />
  </a>
</AvatarGlass>;
```

### When to Use asChild

| Use Case               | Recommendation                        |
| ---------------------- | ------------------------------------- |
| Navigation buttons     | Use `asChild` with `<Link>` or `<a>`  |
| Form submit buttons    | Regular `<ButtonGlass type="submit">` |
| Clickable cards        | Use `asChild` with `<a>` or `<Link>`  |
| Semantic HTML elements | Use `asChild` for proper semantics    |

---

## Compound Components

Compound components provide fine-grained control over complex UI patterns through composition.

### ModalGlass

The Modal compound API provides 9 sub-components for complete control.

```tsx
import { ModalGlass, ButtonGlass } from 'shadcn-glass-ui';
import { useState } from 'react';

function ConfirmDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonGlass onClick={() => setOpen(true)}>Open Modal</ButtonGlass>

      <ModalGlass.Root open={open} onOpenChange={setOpen}>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Confirm Action</ModalGlass.Title>
            <ModalGlass.Description>
              This action cannot be undone. Are you sure?
            </ModalGlass.Description>
            <ModalGlass.Close />
          </ModalGlass.Header>

          <ModalGlass.Body>
            <p>You are about to delete this item permanently.</p>
          </ModalGlass.Body>

          <ModalGlass.Footer>
            <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </ButtonGlass>
            <ButtonGlass variant="destructive" onClick={handleDelete}>
              Delete
            </ButtonGlass>
          </ModalGlass.Footer>
        </ModalGlass.Content>
      </ModalGlass.Root>
    </>
  );
}
```

#### Modal Sub-components

| Component                | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `ModalGlass.Root`        | Context provider, manages open/close state |
| `ModalGlass.Overlay`     | Backdrop with blur effect, click-to-close  |
| `ModalGlass.Content`     | Main content container                     |
| `ModalGlass.Header`      | Header section                             |
| `ModalGlass.Title`       | Accessible title (required for a11y)       |
| `ModalGlass.Description` | Optional description text                  |
| `ModalGlass.Close`       | Close button                               |
| `ModalGlass.Body`        | Main content area                          |
| `ModalGlass.Footer`      | Action buttons area                        |

### TabsGlass

The Tabs compound API provides 4 sub-components for flexible tab interfaces.

```tsx
import { TabsGlass } from 'shadcn-glass-ui';
import { useState } from 'react';

function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
      <TabsGlass.List>
        <TabsGlass.Trigger value="general">General</TabsGlass.Trigger>
        <TabsGlass.Trigger value="security">Security</TabsGlass.Trigger>
        <TabsGlass.Trigger value="notifications">Notifications</TabsGlass.Trigger>
      </TabsGlass.List>

      <TabsGlass.Content value="general">
        <h3>General Settings</h3>
        <p>Configure your general preferences...</p>
      </TabsGlass.Content>

      <TabsGlass.Content value="security">
        <h3>Security Settings</h3>
        <p>Manage your security options...</p>
      </TabsGlass.Content>

      <TabsGlass.Content value="notifications">
        <h3>Notification Settings</h3>
        <p>Control your notification preferences...</p>
      </TabsGlass.Content>
    </TabsGlass.Root>
  );
}
```

#### Tabs Sub-components

| Component           | Purpose                              |
| ------------------- | ------------------------------------ |
| `TabsGlass.Root`    | Context provider, manages active tab |
| `TabsGlass.List`    | Container for tab triggers           |
| `TabsGlass.Trigger` | Individual tab button                |
| `TabsGlass.Content` | Content panel for each tab           |

### StepperGlass

The Stepper compound API provides multi-step workflow support with 3 visual variants.

```tsx
import { StepperGlass, ButtonGlass } from 'shadcn-glass-ui';
import { useState } from 'react';

function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Cart', 'Shipping', 'Payment', 'Confirm'];

  return (
    <StepperGlass.Root
      value={currentStep}
      onValueChange={setCurrentStep}
      variant="numbered" // or "icon" | "dots"
    >
      <StepperGlass.List>
        {steps.map((step, index) => (
          <StepperGlass.Step key={index} value={index}>
            {step}
          </StepperGlass.Step>
        ))}
      </StepperGlass.List>

      <StepperGlass.Content value={0}>
        <h3>Shopping Cart</h3>
        {/* Cart content */}
      </StepperGlass.Content>

      <StepperGlass.Content value={1}>
        <h3>Shipping Address</h3>
        {/* Shipping form */}
      </StepperGlass.Content>

      <StepperGlass.Content value={2}>
        <h3>Payment Method</h3>
        {/* Payment form */}
      </StepperGlass.Content>

      <StepperGlass.Content value={3}>
        <h3>Order Confirmation</h3>
        {/* Confirmation details */}
      </StepperGlass.Content>

      <div className="flex gap-4 mt-4">
        <ButtonGlass
          variant="ghost"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
        >
          Back
        </ButtonGlass>
        <ButtonGlass
          variant="primary"
          onClick={() => setCurrentStep((s) => s + 1)}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </ButtonGlass>
      </div>
    </StepperGlass.Root>
  );
}
```

#### Stepper Variants

| Variant    | Description                             |
| ---------- | --------------------------------------- |
| `numbered` | Steps displayed as numbers (1, 2, 3...) |
| `icon`     | Steps with custom icons                 |
| `dots`     | Minimal dot indicators                  |

---

## Theme Integration

### Using useTheme Hook

```tsx
import { useTheme, ThemeProvider } from 'shadcn-glass-ui';

function ThemeSwitcher() {
  const { theme, setTheme, cycleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>

      {/* Cycle through themes */}
      <button onClick={cycleTheme}>Next Theme</button>

      {/* Set specific theme */}
      <button onClick={() => setTheme('glass')}>Glass</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('aurora')}>Aurora</button>
    </div>
  );
}

// Wrap your app
function App() {
  return (
    <ThemeProvider defaultTheme="glass">
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
```

### Theme-Aware Components

```tsx
import { useTheme } from 'shadcn-glass-ui';

function ThemeAwareCard({ children }) {
  const { theme } = useTheme();

  return (
    <div
      className={`
      rounded-lg p-4
      ${theme === 'glass' ? 'bg-white/10 backdrop-blur-md' : ''}
      ${theme === 'light' ? 'bg-white shadow-md' : ''}
      ${theme === 'aurora' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' : ''}
    `}
    >
      {children}
    </div>
  );
}
```

---

## Accessibility Patterns

### Focus Management

All components support keyboard navigation out of the box:

```tsx
// Modal auto-focuses first focusable element
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content>
    {/* First focusable element receives focus */}
    <input type="text" placeholder="Auto-focused" />
  </ModalGlass.Content>
</ModalGlass.Root>

// Tabs support arrow key navigation
<TabsGlass.Root>
  <TabsGlass.List>
    {/* Arrow Left/Right to navigate */}
    <TabsGlass.Trigger value="1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="2">Tab 2</TabsGlass.Trigger>
  </TabsGlass.List>
</TabsGlass.Root>
```

### ARIA Labels

```tsx
// Buttons with icons need aria-label
<ButtonGlass aria-label="Close menu">
  <XIcon />
</ButtonGlass>

// Progress indicators
<ProgressGlass value={75} aria-label="Upload progress: 75%" />

// Form inputs
<InputGlass
  id="email"
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email</span>
```

### Touch Targets

All interactive components have minimum 44×44px touch targets (Apple HIG compliant):

```tsx
// Small visual, full touch target
<CheckboxGlass size="sm" /> {/* Visual: 16px, Touch: 44px */}

// Icon buttons maintain touch targets
<IconButtonGlass size="sm">
  <MenuIcon />
</IconButtonGlass>
```

---

## See Also

- [BREAKING_CHANGES.md](BREAKING_CHANGES.md) - Migration from legacy APIs
- [COMPONENTS_CATALOG.md](COMPONENTS_CATALOG.md) - Full component reference
- [migration/](migration/) - Detailed migration guides
