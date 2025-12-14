# Advanced Patterns

This guide covers advanced component patterns in shadcn-glass-ui: Compound Components, asChild
polymorphism, and composition techniques.

---

## Table of Contents

1. [Compound Components](#compound-components)
   - [ModalGlass](#modalglass)
   - [TabsGlass](#tabsglass)
   - [StepperGlass](#stepperglass)
2. [asChild Pattern](#aschild-pattern)
   - [ButtonGlass with Next.js Link](#buttonglass-with-nextjs-link)
   - [ButtonGlass with React Router](#buttonglass-with-react-router)
   - [GlassCard with Custom Element](#glasscard-with-custom-element)
3. [Composition Patterns](#composition-patterns)
   - [Form Validation](#form-validation)
   - [Controlled vs Uncontrolled](#controlled-vs-uncontrolled)

---

## Compound Components

Compound components provide flexible, composable APIs for complex UI patterns. Each sub-component
handles a specific concern.

### ModalGlass

**Sub-components:**

- `ModalGlass.Root` - Context provider with open/close state
- `ModalGlass.Overlay` - Backdrop with blur effect
- `ModalGlass.Content` - Main modal container
- `ModalGlass.Header` - Header layout
- `ModalGlass.Body` - Content area
- `ModalGlass.Footer` - Footer with actions
- `ModalGlass.Title` - Accessible title (ARIA)
- `ModalGlass.Description` - Accessible description (ARIA)
- `ModalGlass.Close` - Close button

#### Basic Usage

```tsx
import { ModalGlass, ButtonGlass } from 'shadcn-glass-ui';

function MyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonGlass onClick={() => setOpen(true)}>Open Modal</ButtonGlass>

      <ModalGlass.Root open={open} onOpenChange={setOpen}>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Confirm Action</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>

          <ModalGlass.Body>
            <p>Are you sure you want to proceed?</p>
          </ModalGlass.Body>

          <ModalGlass.Footer>
            <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </ButtonGlass>
            <ButtonGlass variant="default">Confirm</ButtonGlass>
          </ModalGlass.Footer>
        </ModalGlass.Content>
      </ModalGlass.Root>
    </>
  );
}
```

#### With Form

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content size="lg">
    <ModalGlass.Header>
      <ModalGlass.Title>Create Account</ModalGlass.Title>
      <ModalGlass.Description>Fill in your details to get started.</ModalGlass.Description>
      <ModalGlass.Close />
    </ModalGlass.Header>

    <ModalGlass.Body>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputGlass label="Email" type="email" placeholder="you@example.com" required />
        <InputGlass label="Password" type="password" placeholder="••••••••" required />
      </form>
    </ModalGlass.Body>

    <ModalGlass.Footer>
      <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </ButtonGlass>
      <ButtonGlass variant="default" type="submit">
        Create Account
      </ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

#### Size Variants

```tsx
// Small modal (alerts, confirmations)
<ModalGlass.Content size="sm">

// Default size
<ModalGlass.Content size="default">

// Large modal (forms, complex content)
<ModalGlass.Content size="lg">

// Full-width modal
<ModalGlass.Content size="full">
```

---

### TabsGlass

**Sub-components:**

- `TabsGlass.Root` - Context provider with value state
- `TabsGlass.List` - Container for tab triggers
- `TabsGlass.Trigger` - Individual tab button
- `TabsGlass.Content` - Content panel for each tab

#### Basic Usage

```tsx
import { TabsGlass } from 'shadcn-glass-ui';

function MyTabs() {
  const [tab, setTab] = useState('overview');

  return (
    <TabsGlass.Root value={tab} onValueChange={setTab}>
      <TabsGlass.List>
        <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
        <TabsGlass.Trigger value="analytics">Analytics</TabsGlass.Trigger>
        <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
      </TabsGlass.List>

      <TabsGlass.Content value="overview">
        <OverviewPanel />
      </TabsGlass.Content>

      <TabsGlass.Content value="analytics">
        <AnalyticsPanel />
      </TabsGlass.Content>

      <TabsGlass.Content value="settings">
        <SettingsPanel />
      </TabsGlass.Content>
    </TabsGlass.Root>
  );
}
```

#### With Icons and Badges

```tsx
import { Home, BarChart, Settings, Inbox } from 'lucide-react';
import { TabsGlass, BadgeGlass } from 'shadcn-glass-ui';

<TabsGlass.Root value={tab} onValueChange={setTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="home">
      <Home className="w-4 h-4 mr-2" />
      Home
    </TabsGlass.Trigger>

    <TabsGlass.Trigger value="inbox">
      <Inbox className="w-4 h-4 mr-2" />
      Inbox
      <BadgeGlass variant="destructive" className="ml-2">
        5
      </BadgeGlass>
    </TabsGlass.Trigger>

    <TabsGlass.Trigger value="stats">
      <BarChart className="w-4 h-4 mr-2" />
      Statistics
    </TabsGlass.Trigger>
  </TabsGlass.List>

  {/* Content panels */}
</TabsGlass.Root>;
```

#### Vertical Layout

```tsx
<TabsGlass.Root value={tab} onValueChange={setTab}>
  <div className="flex gap-6">
    {/* Vertical tab list */}
    <TabsGlass.List className="flex-col w-48">
      <TabsGlass.Trigger value="general">General</TabsGlass.Trigger>
      <TabsGlass.Trigger value="security">Security</TabsGlass.Trigger>
      <TabsGlass.Trigger value="privacy">Privacy</TabsGlass.Trigger>
    </TabsGlass.List>

    {/* Content area */}
    <div className="flex-1">
      <TabsGlass.Content value="general">
        <GeneralSettings />
      </TabsGlass.Content>
      <TabsGlass.Content value="security">
        <SecuritySettings />
      </TabsGlass.Content>
      <TabsGlass.Content value="privacy">
        <PrivacySettings />
      </TabsGlass.Content>
    </div>
  </div>
</TabsGlass.Root>
```

#### Dynamic Tabs

```tsx
const tabs = [
  { id: 'tab1', label: 'First', content: <FirstContent /> },
  { id: 'tab2', label: 'Second', content: <SecondContent /> },
  { id: 'tab3', label: 'Third', content: <ThirdContent /> },
];

<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    {tabs.map((tab) => (
      <TabsGlass.Trigger key={tab.id} value={tab.id}>
        {tab.label}
      </TabsGlass.Trigger>
    ))}
  </TabsGlass.List>

  {tabs.map((tab) => (
    <TabsGlass.Content key={tab.id} value={tab.id}>
      {tab.content}
    </TabsGlass.Content>
  ))}
</TabsGlass.Root>;
```

---

### StepperGlass

**Sub-components:**

- `StepperGlass.Root` - Context provider with step state
- `StepperGlass.Step` - Individual step container
- `StepperGlass.Indicator` - Step number/icon/dot
- `StepperGlass.Title` - Step title
- `StepperGlass.Description` - Step description

#### Basic Usage

```tsx
import { StepperGlass } from 'shadcn-glass-ui';

function CheckoutStepper() {
  const [step, setStep] = useState(0);

  return (
    <StepperGlass.Root value={step} onValueChange={setStep}>
      <StepperGlass.Step value={0}>
        <StepperGlass.Indicator />
        <StepperGlass.Title>Cart</StepperGlass.Title>
        <StepperGlass.Description>Review items</StepperGlass.Description>
      </StepperGlass.Step>

      <StepperGlass.Step value={1}>
        <StepperGlass.Indicator />
        <StepperGlass.Title>Shipping</StepperGlass.Title>
        <StepperGlass.Description>Enter address</StepperGlass.Description>
      </StepperGlass.Step>

      <StepperGlass.Step value={2}>
        <StepperGlass.Indicator />
        <StepperGlass.Title>Payment</StepperGlass.Title>
        <StepperGlass.Description>Add payment method</StepperGlass.Description>
      </StepperGlass.Step>

      <StepperGlass.Step value={3}>
        <StepperGlass.Indicator />
        <StepperGlass.Title>Confirm</StepperGlass.Title>
        <StepperGlass.Description>Place order</StepperGlass.Description>
      </StepperGlass.Step>
    </StepperGlass.Root>
  );
}
```

#### Variants

```tsx
// Numbered steps (default)
<StepperGlass.Root variant="numbered">

// With icons
<StepperGlass.Root variant="icon">
  <StepperGlass.Step value={0}>
    <StepperGlass.Indicator icon={<ShoppingCart />} />
    ...
  </StepperGlass.Step>
</StepperGlass.Root>

// Dot indicators
<StepperGlass.Root variant="dots">
```

#### Linear Mode (Wizard)

Locks future steps until previous ones are completed:

```tsx
<StepperGlass.Root
  value={step}
  onValueChange={setStep}
  linear // Prevents clicking future steps
>
  {/* Steps */}
</StepperGlass.Root>
```

#### Vertical Orientation

```tsx
<StepperGlass.Root orientation="vertical">{/* Steps render vertically */}</StepperGlass.Root>
```

---

## asChild Pattern

The `asChild` pattern allows components to render as different elements while preserving styles and
behavior. Powered by Radix UI's Slot.

### Why asChild?

- **Semantic HTML** - Render as `<a>`, `<Link>`, or any element
- **No wrapper divs** - Clean DOM structure
- **Style preservation** - All glass effects maintained
- **Accessibility** - Proper element semantics

### ButtonGlass with Next.js Link

```tsx
import Link from 'next/link';
import { ButtonGlass } from 'shadcn-glass-ui';

// Renders as <a> with ButtonGlass styles
<ButtonGlass asChild variant="default">
  <Link href="/dashboard">Go to Dashboard</Link>
</ButtonGlass>;
```

**HTML output:**

```html
<a href="/dashboard" class="btn-glass btn-primary ..."> Go to Dashboard </a>
```

### ButtonGlass with React Router

```tsx
import { Link } from 'react-router-dom';
import { ButtonGlass } from 'shadcn-glass-ui';

<ButtonGlass asChild variant="secondary">
  <Link to="/settings">Settings</Link>
</ButtonGlass>;
```

### ButtonGlass as External Link

```tsx
<ButtonGlass asChild variant="ghost">
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
    View on GitHub
  </a>
</ButtonGlass>
```

### GlassCard with Custom Element

```tsx
import { GlassCard } from 'shadcn-glass-ui';

// Render card as article
<GlassCard asChild>
  <article>
    <h2>Blog Post Title</h2>
    <p>Content...</p>
  </article>
</GlassCard>

// Render card as link
<GlassCard asChild>
  <a href="/product/123">
    <img src="product.jpg" alt="Product" />
    <h3>Product Name</h3>
  </a>
</GlassCard>
```

### With Icons

```tsx
import { ExternalLink } from 'lucide-react';

<ButtonGlass asChild variant="default">
  <a href="https://docs.example.com" target="_blank">
    Documentation
    <ExternalLink className="w-4 h-4 ml-2" />
  </a>
</ButtonGlass>;
```

---

## Composition Patterns

### Form Validation

Use `FormFieldWrapper` with `InputGlass` for consistent validation UI:

```tsx
import { InputGlass, FormFieldWrapper } from 'shadcn-glass-ui';

function ValidatedInput({ label, error, success, ...props }) {
  return (
    <FormFieldWrapper label={label} error={error} success={success}>
      <InputGlass error={error} success={success} {...props} />
    </FormFieldWrapper>
  );
}

// Usage
<ValidatedInput
  label="Email"
  error={errors.email?.message}
  success={isEmailValid ? 'Email is available' : undefined}
  placeholder="you@example.com"
/>;
```

### Controlled vs Uncontrolled

#### Controlled (recommended for forms)

```tsx
function ControlledTabs() {
  const [value, setValue] = useState('tab1');

  return (
    <TabsGlass.Root value={value} onValueChange={setValue}>
      {/* ... */}
    </TabsGlass.Root>
  );
}
```

#### Uncontrolled (simple cases)

```tsx
function UncontrolledTabs() {
  return <TabsGlass.Root defaultValue="tab1">{/* ... */}</TabsGlass.Root>;
}
```

### Combining Patterns

Complex form with modal, tabs, and validation:

```tsx
function SettingsModal({ open, onOpenChange }) {
  const [tab, setTab] = useState('profile');

  return (
    <ModalGlass.Root open={open} onOpenChange={onOpenChange}>
      <ModalGlass.Overlay />
      <ModalGlass.Content size="lg">
        <ModalGlass.Header>
          <ModalGlass.Title>Settings</ModalGlass.Title>
          <ModalGlass.Close />
        </ModalGlass.Header>

        <ModalGlass.Body>
          <TabsGlass.Root value={tab} onValueChange={setTab}>
            <TabsGlass.List>
              <TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
              <TabsGlass.Trigger value="notifications">Notifications</TabsGlass.Trigger>
            </TabsGlass.List>

            <TabsGlass.Content value="profile">
              <ProfileForm />
            </TabsGlass.Content>

            <TabsGlass.Content value="notifications">
              <NotificationSettings />
            </TabsGlass.Content>
          </TabsGlass.Root>
        </ModalGlass.Body>

        <ModalGlass.Footer>
          <ButtonGlass variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </ButtonGlass>
          <ButtonGlass variant="default">Save Changes</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  );
}
```

---

## Common Pitfalls

### Mismatched Tab Values

```tsx
// Wrong - values don't match
<TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
<TabsGlass.Content value="user">...</TabsGlass.Content>

// Correct
<TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
<TabsGlass.Content value="profile">...</TabsGlass.Content>
```

### Missing List Wrapper

```tsx
// Wrong - triggers without List
<TabsGlass.Root>
  <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
</TabsGlass.Root>

// Correct
<TabsGlass.Root>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
  </TabsGlass.List>
</TabsGlass.Root>
```

### Forgetting onValueChange (Controlled)

```tsx
// Wrong - controlled without handler
<TabsGlass.Root value={tab}>

// Correct - controlled
<TabsGlass.Root value={tab} onValueChange={setTab}>

// Or - uncontrolled
<TabsGlass.Root defaultValue="overview">
```

---

## Related Documentation

- [Compound Components Guide](migration/compound-components-v2.md)
- [Component Catalog](COMPONENTS_CATALOG.md)
- [Breaking Changes](BREAKING_CHANGES.md)

---

**Last updated:** 2025-12-14
