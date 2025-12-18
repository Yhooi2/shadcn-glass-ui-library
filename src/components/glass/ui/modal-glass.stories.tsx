/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalGlass } from './modal-glass';
import { ButtonGlass } from './button-glass';
import { InputGlass } from './input-glass';

const meta: Meta<typeof ModalGlass.Root> = {
  title: 'Components/Overlay/ModalGlass',
  component: ModalGlass.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ModalGlass is a compound component that provides a glass-themed modal dialog with full shadcn/ui Dialog API compatibility.

## Usage

### Trigger Pattern (Uncontrolled - Recommended)
\`\`\`tsx
<ModalGlass.Root>
  <ModalGlass.Trigger asChild>
    <ButtonGlass>Open Modal</ButtonGlass>
  </ModalGlass.Trigger>
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Title</ModalGlass.Title>
      <ModalGlass.Description>Description</ModalGlass.Description>
    </ModalGlass.Header>
    <ModalGlass.Body>Content</ModalGlass.Body>
    <ModalGlass.Footer>
      <ModalGlass.Close asChild>
        <ButtonGlass variant="ghost">Cancel</ButtonGlass>
      </ModalGlass.Close>
      <ButtonGlass>Confirm</ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
\`\`\`

### Controlled Pattern
\`\`\`tsx
const [open, setOpen] = useState(false);

<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Title</ModalGlass.Title>
    </ModalGlass.Header>
    <ModalGlass.Body>Content</ModalGlass.Body>
  </ModalGlass.Content>
</ModalGlass.Root>
\`\`\`

## Sub-components

- **ModalGlass.Root** - Dialog root with size prop (sm, md, lg, xl, full)
- **ModalGlass.Trigger** - Opens modal when clicked (supports asChild)
- **ModalGlass.Content** - Main modal container with glass styling
- **ModalGlass.Header** - Header section with flex layout
- **ModalGlass.Title** - Modal title with accessibility
- **ModalGlass.Description** - Modal description text
- **ModalGlass.Body** - Main content area
- **ModalGlass.Footer** - Footer with action buttons
- **ModalGlass.Close** - Closes modal when clicked (supports asChild)

## Accessibility

Built on @radix-ui/react-dialog with full WCAG 2.1 AA compliance:
- Keyboard: Escape to close, Tab for focus trap
- Screen Readers: role="dialog", aria-modal, aria-labelledby
- Focus Management: Auto-focus on open, return focus on close
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size variant for modal width',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    onOpenChange: {
      description: 'Callback when open state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModalGlass.Root>;

// ========================================
// BASIC EXAMPLES
// ========================================

export const Default: Story = {
  render: () => (
    <ModalGlass.Root>
      <ModalGlass.Trigger asChild>
        <ButtonGlass>Open Modal</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Modal Title</ModalGlass.Title>
          <ModalGlass.Description>
            This is a modal dialog with glassmorphism styling.
          </ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>
            It includes a backdrop blur effect and smooth animations. Press Escape or click outside
            to close.
          </p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Confirm</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

// ========================================
// SIZE VARIANTS
// ========================================

export const Small: Story = {
  render: () => (
    <ModalGlass.Root size="sm">
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="secondary">Small (480px)</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Small Modal</ModalGlass.Title>
          <ModalGlass.Description>max-width: 480px</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>Great for simple confirmations and alerts.</p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Confirm</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const Medium: Story = {
  render: () => (
    <ModalGlass.Root size="md">
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="secondary">Medium (640px)</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Medium Modal</ModalGlass.Title>
          <ModalGlass.Description>max-width: 640px (default)</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>The default size for most use cases.</p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Confirm</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const Large: Story = {
  render: () => (
    <ModalGlass.Root size="lg">
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="secondary">Large (800px)</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Large Modal</ModalGlass.Title>
          <ModalGlass.Description>max-width: 800px</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>More space for complex content, forms, or detailed information.</p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Confirm</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <ModalGlass.Root size="xl">
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="secondary">Extra Large</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Extra Large Modal</ModalGlass.Title>
          <ModalGlass.Description>max-width: xl</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>Perfect for multi-step forms, data tables, or rich content displays.</p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Confirm</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const Full: Story = {
  render: () => (
    <ModalGlass.Root size="full">
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="secondary">Full (4xl)</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Full Width Modal</ModalGlass.Title>
          <ModalGlass.Description>max-width: 4xl</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>
            Ideal for dashboards, editors, or any content that needs maximum screen real estate.
          </p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Confirm</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ModalGlass.Root size="sm">
        <ModalGlass.Trigger asChild>
          <ButtonGlass variant="outline">Small</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Small Modal</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>480px max-width</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>

      <ModalGlass.Root size="md">
        <ModalGlass.Trigger asChild>
          <ButtonGlass variant="outline">Medium</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Medium Modal</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>640px max-width (default)</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>

      <ModalGlass.Root size="lg">
        <ModalGlass.Trigger asChild>
          <ButtonGlass variant="outline">Large</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Large Modal</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>800px max-width</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>

      <ModalGlass.Root size="xl">
        <ModalGlass.Trigger asChild>
          <ButtonGlass variant="outline">XL</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Extra Large Modal</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>xl max-width</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>

      <ModalGlass.Root size="full">
        <ModalGlass.Trigger asChild>
          <ButtonGlass variant="outline">Full</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Full Width Modal</ModalGlass.Title>
          </ModalGlass.Header>
          <ModalGlass.Body>4xl max-width</ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Root>
    </div>
  ),
};

// ========================================
// CONTENT EXAMPLES
// ========================================

export const ConfirmDialog: Story = {
  render: () => (
    <ModalGlass.Root size="sm">
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="destructive">Delete Item</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Confirm Deletion</ModalGlass.Title>
          <ModalGlass.Description>This action cannot be undone.</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>
            Are you sure you want to delete this item? All associated data will be permanently
            removed.
          </p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass variant="destructive">Delete</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalGlass.Root>
      <ModalGlass.Trigger asChild>
        <ButtonGlass>Create Account</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Create Account</ModalGlass.Title>
          <ModalGlass.Description>Enter your details to get started.</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <div className="space-y-4">
            <InputGlass label="Email" type="email" placeholder="email@example.com" />
            <InputGlass label="Password" type="password" placeholder="Enter password" />
          </div>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Sign Up</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <ModalGlass.Root>
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="secondary">Terms & Conditions</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content>
        <ModalGlass.Header>
          <ModalGlass.Title>Terms and Conditions</ModalGlass.Title>
          <ModalGlass.Description>Please read carefully before proceeding.</ModalGlass.Description>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass variant="ghost">Decline</ButtonGlass>
          </ModalGlass.Close>
          <ButtonGlass>Accept</ButtonGlass>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <ModalGlass.Root>
      <ModalGlass.Trigger asChild>
        <ButtonGlass variant="outline">Important Notice</ButtonGlass>
      </ModalGlass.Trigger>
      <ModalGlass.Content showCloseButton={false}>
        <ModalGlass.Header>
          <ModalGlass.Title>Important Notice</ModalGlass.Title>
        </ModalGlass.Header>
        <ModalGlass.Body>
          <p>This modal has no X button. You must use the action buttons below to dismiss it.</p>
        </ModalGlass.Body>
        <ModalGlass.Footer>
          <ModalGlass.Close asChild>
            <ButtonGlass>I Understand</ButtonGlass>
          </ModalGlass.Close>
        </ModalGlass.Footer>
      </ModalGlass.Content>
    </ModalGlass.Root>
  ),
};

// ========================================
// ADVANCED EXAMPLES
// ========================================

export const ControlledMode: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm text-[var(--text-muted)]">
          Open state: <strong>{open ? 'true' : 'false'}</strong>
        </p>
        <ButtonGlass onClick={() => setOpen(true)}>Open Controlled Modal</ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen}>
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Controlled Modal</ModalGlass.Title>
              <ModalGlass.Description>
                This modal uses controlled state (open/onOpenChange).
              </ModalGlass.Description>
            </ModalGlass.Header>
            <ModalGlass.Body>
              <p>You can programmatically control when the modal opens and closes.</p>
            </ModalGlass.Body>
            <ModalGlass.Footer>
              <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </ButtonGlass>
              <ButtonGlass onClick={() => setOpen(false)}>Confirm</ButtonGlass>
            </ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      </div>
    );
  },
};

export const MultiStepForm: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    return (
      <ModalGlass.Root size="lg">
        <ModalGlass.Trigger asChild>
          <ButtonGlass>Multi-Step Wizard</ButtonGlass>
        </ModalGlass.Trigger>
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Setup Wizard</ModalGlass.Title>
            <ModalGlass.Description>
              Step {step} of {totalSteps}
            </ModalGlass.Description>
          </ModalGlass.Header>
          <ModalGlass.Body>
            {step === 1 && (
              <div className="space-y-4">
                <InputGlass label="Full Name" placeholder="John Doe" />
                <InputGlass label="Email" type="email" placeholder="john@example.com" />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <InputGlass label="Company" placeholder="Acme Inc." />
                <InputGlass label="Role" placeholder="Developer" />
              </div>
            )}
            {step === 3 && (
              <div className="p-4 rounded-xl bg-[var(--semantic-surface)]">
                <p className="text-[var(--text-primary)] font-medium">Ready to go!</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Click Finish to complete the setup.
                </p>
              </div>
            )}

            {/* Progress indicator */}
            <div className="mt-6 flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all"
                  style={{
                    background:
                      i < step ? 'var(--semantic-primary)' : 'var(--semantic-border-muted)',
                  }}
                />
              ))}
            </div>
          </ModalGlass.Body>
          <ModalGlass.Footer>
            {step > 1 && (
              <ButtonGlass variant="ghost" onClick={() => setStep(step - 1)}>
                Previous
              </ButtonGlass>
            )}
            <div className="flex-1" />
            {step < totalSteps ? (
              <ButtonGlass onClick={() => setStep(step + 1)}>Next</ButtonGlass>
            ) : (
              <ModalGlass.Close asChild>
                <ButtonGlass onClick={() => setStep(1)}>Finish</ButtonGlass>
              </ModalGlass.Close>
            )}
          </ModalGlass.Footer>
        </ModalGlass.Content>
      </ModalGlass.Root>
    );
  },
};
