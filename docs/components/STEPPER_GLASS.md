# StepperGlass

Glass-themed step indicator component with multi-step workflow support.

## Overview

StepperGlass is a compound component that provides an accessible step indicator for multi-step
forms, wizards, and progress flows. Supports horizontal/vertical orientations, numbered/icon/dots
variants, and linear mode.

### Key Features

- **Compound Component API** - Flexible composition with 4 sub-components
- **3 Visual Variants** - Numbered (default), icon, dots
- **2 Orientations** - Horizontal, vertical
- **3 Sizes** - sm, md (default), lg
- **Linear Mode** - Lock future steps until current is completed
- **Keyboard Navigation** - Arrow keys, Home, End
- **Focus Management** - Visible focus rings with glass glow
- **Animated Connectors** - Progress lines between steps
- **Custom Icons** - Support for step and completion icons
- **WCAG 2.1 AA Compliant** - Full accessibility support
- **Theme Support** - Works with all 3 themes (glass, light, aurora)

### Browser Compatibility

- Chrome 89+
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

```tsx
import { StepperGlass } from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure

```tsx
<StepperGlass.Root value={currentStep} onValueChange={setCurrentStep} linear={false}>
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Account" description="Create your account" />
    <StepperGlass.Step value="step2" label="Profile" description="Setup your profile" />
    <StepperGlass.Step value="step3" label="Complete" description="Finish setup" />
  </StepperGlass.List>

  <StepperGlass.Content value="step1">{/* Step 1 content */}</StepperGlass.Content>

  <StepperGlass.Content value="step2">{/* Step 2 content */}</StepperGlass.Content>

  <StepperGlass.Content value="step3">{/* Step 3 content */}</StepperGlass.Content>
</StepperGlass.Root>
```

### Full Component List

| Component | Description                                             |
| --------- | ------------------------------------------------------- |
| `Root`    | Stepper root with state management and context provider |
| `List`    | Container for step indicators with `role="tablist"`     |
| `Step`    | Individual step indicator with label and description    |
| `Content` | Content panel for active step (conditional render)      |

---

## Props API

### StepperGlass.Root

| Prop            | Type                             | Default        | Description                         |
| --------------- | -------------------------------- | -------------- | ----------------------------------- |
| `value`         | `string`                         | **Required**   | Current active step value           |
| `onValueChange` | `(value: string) => void`        | -              | Callback when step changes          |
| `orientation`   | `'horizontal' \| 'vertical'`     | `'horizontal'` | Stepper orientation                 |
| `variant`       | `'numbered' \| 'icon' \| 'dots'` | `'numbered'`   | Visual variant                      |
| `size`          | `'sm' \| 'md' \| 'lg'`           | `'md'`         | Step indicator size                 |
| `linear`        | `boolean`                        | `false`        | Lock future steps (sequential mode) |
| `className`     | `string`                         | -              | Additional CSS classes              |

### StepperGlass.List

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

**Extends:** `React.HTMLAttributes<HTMLDivElement>`

**ARIA:** Sets `role="tablist"` and `aria-orientation`.

### StepperGlass.Step

| Prop            | Type        | Default      | Description                             |
| --------------- | ----------- | ------------ | --------------------------------------- |
| `value`         | `string`    | **Required** | Unique value for this step              |
| `label`         | `string`    | **Required** | Step label (required for accessibility) |
| `description`   | `string`    | -            | Optional description text               |
| `icon`          | `ReactNode` | -            | Custom icon for icon variant            |
| `completedIcon` | `ReactNode` | `<Check />`  | Icon shown when step is completed       |
| `disabled`      | `boolean`   | `false`      | Force disabled state                    |
| `className`     | `string`    | -            | Additional CSS classes                  |
| `index`         | `number`    | auto         | Step index for ordering (auto-detected) |

**Extends:** `React.ComponentPropsWithoutRef<'button'>`

**States:** `pending` | `active` | `completed` | `disabled`

### StepperGlass.Content

| Prop        | Type     | Default      | Description                               |
| ----------- | -------- | ------------ | ----------------------------------------- |
| `value`     | `string` | **Required** | Value of the step this content belongs to |
| `className` | `string` | -            | Additional CSS classes                    |

**ARIA:** Sets `role="tabpanel"` and `aria-hidden`.

---

## Usage Examples

### Basic Stepper

```tsx
function BasicStepper() {
  const [step, setStep] = useState('step1');

  return (
    <StepperGlass.Root value={step} onValueChange={setStep}>
      <StepperGlass.List>
        <StepperGlass.Step value="step1" label="Account" />
        <StepperGlass.Step value="step2" label="Profile" />
        <StepperGlass.Step value="step3" label="Complete" />
      </StepperGlass.List>

      <StepperGlass.Content value="step1">
        <h3>Create Account</h3>
        <p>Enter your email and password</p>
      </StepperGlass.Content>

      <StepperGlass.Content value="step2">
        <h3>Setup Profile</h3>
        <p>Add your personal information</p>
      </StepperGlass.Content>

      <StepperGlass.Content value="step3">
        <h3>Finish</h3>
        <p>Review and complete setup</p>
      </StepperGlass.Content>
    </StepperGlass.Root>
  );
}
```

### Linear Mode (Sequential Steps)

```tsx
<StepperGlass.Root value={step} onValueChange={setStep} linear={true}>
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Step 1" description="Must complete first" />
    <StepperGlass.Step value="step2" label="Step 2" description="Locked until step 1 done" />
    <StepperGlass.Step value="step3" label="Step 3" description="Locked until step 2 done" />
  </StepperGlass.List>
</StepperGlass.Root>
```

### Vertical Orientation

```tsx
<StepperGlass.Root value={step} onValueChange={setStep} orientation="vertical">
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Personal Info" description="Name, email, phone" />
    <StepperGlass.Step value="step2" label="Address" description="Shipping and billing" />
    <StepperGlass.Step value="step3" label="Payment" description="Credit card details" />
  </StepperGlass.List>
</StepperGlass.Root>
```

### Icon Variant

```tsx
import { User, CreditCard, CheckCircle } from 'lucide-react';

<StepperGlass.Root value={step} onValueChange={setStep} variant="icon">
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Account" icon={<User className="w-5 h-5" />} />
    <StepperGlass.Step value="step2" label="Payment" icon={<CreditCard className="w-5 h-5" />} />
    <StepperGlass.Step value="step3" label="Done" icon={<CheckCircle className="w-5 h-5" />} />
  </StepperGlass.List>
</StepperGlass.Root>;
```

### Dots Variant

```tsx
<StepperGlass.Root value={step} onValueChange={setStep} variant="dots">
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Step 1" />
    <StepperGlass.Step value="step2" label="Step 2" />
    <StepperGlass.Step value="step3" label="Step 3" />
  </StepperGlass.List>
</StepperGlass.Root>
```

### Size Variants

```tsx
{
  /* Small */
}
<StepperGlass.Root value={step} onValueChange={setStep} size="sm">
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Step 1" />
  </StepperGlass.List>
</StepperGlass.Root>;

{
  /* Medium (default) */
}
<StepperGlass.Root value={step} onValueChange={setStep} size="md">
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Step 1" />
  </StepperGlass.List>
</StepperGlass.Root>;

{
  /* Large */
}
<StepperGlass.Root value={step} onValueChange={setStep} size="lg">
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Step 1" />
  </StepperGlass.List>
</StepperGlass.Root>;
```

### Custom Completion Icon

```tsx
import { Star } from 'lucide-react';

<StepperGlass.Root value={step} onValueChange={setStep}>
  <StepperGlass.List>
    <StepperGlass.Step
      value="step1"
      label="Special"
      completedIcon={<Star className="w-4 h-4 fill-current" />}
    />
  </StepperGlass.List>
</StepperGlass.Root>;
```

### Form Wizard with Navigation

```tsx
function FormWizard() {
  const [step, setStep] = useState('account');

  const steps = ['account', 'profile', 'preferences', 'review'];
  const currentIndex = steps.indexOf(step);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div>
      <StepperGlass.Root value={step} onValueChange={setStep} linear={true}>
        <StepperGlass.List>
          <StepperGlass.Step value="account" label="Account" description="Login details" />
          <StepperGlass.Step value="profile" label="Profile" description="Personal info" />
          <StepperGlass.Step value="preferences" label="Preferences" description="Settings" />
          <StepperGlass.Step value="review" label="Review" description="Confirm details" />
        </StepperGlass.List>

        <StepperGlass.Content value="account">
          <h3>Create Account</h3>
          <InputGlass label="Email" type="email" />
          <InputGlass label="Password" type="password" />
        </StepperGlass.Content>

        <StepperGlass.Content value="profile">
          <h3>Profile Information</h3>
          <InputGlass label="Name" />
          <InputGlass label="Phone" />
        </StepperGlass.Content>

        <StepperGlass.Content value="preferences">
          <h3>Preferences</h3>
          <CheckboxGlass label="Email notifications" />
          <CheckboxGlass label="SMS notifications" />
        </StepperGlass.Content>

        <StepperGlass.Content value="review">
          <h3>Review & Submit</h3>
          <p>Please review your information before submitting.</p>
        </StepperGlass.Content>
      </StepperGlass.Root>

      <div className="flex justify-between mt-6">
        <ButtonGlass variant="ghost" onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </ButtonGlass>
        <ButtonGlass onClick={handleNext} disabled={currentIndex === steps.length - 1}>
          {currentIndex === steps.length - 1 ? 'Submit' : 'Next'}
        </ButtonGlass>
      </div>
    </div>
  );
}
```

---

## CSS Variables

StepperGlass uses CSS variables for theme-aware styling:

### Step Indicators

```css
/* Pending state */
--stepper-step-bg: /* Background */ --stepper-step-border: /* Border color */
  --stepper-step-text: /* Text color */ /* Active state */
  --stepper-step-active-bg: /* Background (primary) */
  --stepper-step-active-border: /* Border color (primary) */
  --stepper-step-active-text: /* Text color (white) */
  --stepper-step-active-glow: /* Box shadow glow */ /* Completed state */
  --stepper-step-completed-bg: /* Background (success) */
  --stepper-step-completed-border: /* Border color (success) */
  --stepper-step-completed-text: /* Text color (white) */ /* Disabled state */
  --stepper-step-disabled-bg: /* Background (muted) */
  --stepper-step-disabled-border: /* Border color (muted) */
  --stepper-step-disabled-text: /* Text color (muted) */;
```

### Connectors

```css
--stepper-connector-bg: /* Inactive connector line */ --stepper-connector-active-bg:
  /* Active connector line (completed steps) */;
```

### Labels

```css
--stepper-label-text: /* Label text color (active/completed) */ --stepper-description-text:
  /* Description text color */;
```

### Focus

```css
--focus-glow: /* Focus ring glow effect */ --blur-sm: 8px; /* Backdrop blur for indicators */
```

---

## Accessibility

### ARIA Attributes

StepperGlass automatically sets proper ARIA attributes:

- `role="tablist"` on List
- `role="tab"` on each Step
- `role="tabpanel"` on each Content
- `aria-orientation` on List
- `aria-selected` on active Step
- `aria-disabled` on disabled Steps
- `aria-current="step"` on active Step

### Keyboard Navigation

| Key                | Action                                  |
| ------------------ | --------------------------------------- |
| `Arrow Right/Down` | Move to next step (horizontal/vertical) |
| `Arrow Left/Up`    | Move to previous step                   |
| `Home`             | Move to first step                      |
| `End`              | Move to last step                       |
| `Tab`              | Focus next element                      |
| `Shift + Tab`      | Focus previous element                  |

**Note:** Arrow keys only navigate between enabled (non-disabled) steps.

### Touch Targets

All step indicators meet WCAG 2.5.5 requirements:

- **Minimum size:** 44x44px (enforced via `min-w-[44px] min-h-[44px]`)
- **Touch-friendly:** Adequate spacing between steps

### Color Contrast

All text colors meet WCAG AA 4.5:1 contrast ratio:

- **Active text:** White on primary background
- **Completed text:** White on success background
- **Pending text:** Muted on glass background
- **Disabled text:** Reduced opacity for visual indication

### Reduced Motion

Respects `prefers-reduced-motion`:

- Hover scale animations disabled
- Connector animations reduced
- Focus transitions remain for accessibility

---

## Migration from Radix Tabs

StepperGlass uses a similar API to Radix UI Tabs:

```tsx
// Before (Radix Tabs)
import * as Tabs from '@radix-ui/react-tabs';

<Tabs.Root value={tab} onValueChange={setTab}>
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>;

// After (StepperGlass)
import { StepperGlass } from 'shadcn-glass-ui';

<StepperGlass.Root value={step} onValueChange={setStep}>
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Step 1" />
    <StepperGlass.Step value="step2" label="Step 2" />
  </StepperGlass.List>
  <StepperGlass.Content value="step1">Content 1</StepperGlass.Content>
  <StepperGlass.Content value="step2">Content 2</StepperGlass.Content>
</StepperGlass.Root>;
```

**Key differences:**

- `Tabs.Trigger` → `StepperGlass.Step` (adds `label` prop)
- Additional features: `linear`, `orientation`, `variant`, `size`
- Automatic step ordering and status management

---

## Related Components

- [TabsGlass](./TABS_GLASS.md) - Glass-themed tab navigation
- [ProgressGlass](../COMPONENTS_CATALOG.md#progressglass) - Linear progress bar
- [CircularProgressGlass](../COMPONENTS_CATALOG.md#circularprogressglass) - Circular progress

---

## Version History

- **v2.0.0** - Initial compound component API release

---

**Last Updated:** 2025-12-21 **Component Status:** Stable **Accessibility:** WCAG 2.1 AA Compliant
