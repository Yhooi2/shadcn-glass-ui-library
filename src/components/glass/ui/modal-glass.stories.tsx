/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { ModalGlass } from './modal-glass';
import { ButtonGlass } from './button-glass';

const meta = {
  title: 'Components/Overlay/ModalGlass',
  parameters: {
    layout: 'fullscreen',
    snapshot: {
      disable: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// SIZE VARIANTS - Matching DesktopShowcase
// ========================================

export const Default: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="sm">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Modal Title</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p className="mb-4">
              This is a modal dialog with glassmorphism styling. It includes a backdrop blur effect
              and smooth animations.
            </p>
            <div className="flex gap-3 justify-end">
              <ButtonGlass variant="ghost">Cancel</ButtonGlass>
              <ButtonGlass variant="default">Confirm</ButtonGlass>
            </div>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Small: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="sm">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Small Modal</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p>This is a small modal. Great for simple confirmations.</p>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Medium: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="default">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Medium Modal</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p>This is a medium modal. The default size for most use cases.</p>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Large: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="lg">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Large Modal</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p className="mb-2">
              This is a large modal. It provides more space for complex content.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Use this size when you need to display forms, detailed information, or multiple
              sections of content.
            </p>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ExtraLarge: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="xl">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Extra Large Modal</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p className="mb-2">This is an extra large modal for complex workflows.</p>
            <p style={{ color: 'var(--text-muted)' }}>
              Perfect for multi-step forms, data tables, or rich content displays.
            </p>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Full: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="full">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Full Width Modal</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p className="mb-2">This is the maximum width modal. Use it for complex interfaces.</p>
            <p style={{ color: 'var(--text-muted)' }}>
              Ideal for dashboards, editors, or any content that needs maximum screen real estate.
            </p>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// CONTENT VARIANTS - Different layouts
// ========================================

export const WithActions: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="default">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Confirm Action</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <p className="mb-4">
              Are you sure you want to proceed with this action? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <ButtonGlass variant="ghost">Cancel</ButtonGlass>
              <ButtonGlass variant="default">Confirm</ButtonGlass>
            </div>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithForm: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="default">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Create New Item</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full px-4 py-2 rounded-xl focus:outline-none"
                  style={{
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--input-text)',
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl focus:outline-none resize-none"
                  style={{
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--input-text)',
                  }}
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <ButtonGlass variant="ghost">Cancel</ButtonGlass>
                <ButtonGlass variant="default">Create</ButtonGlass>
              </div>
            </div>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLongContent: Story = {
  render: () => (
    <ModalGlass.Root open={true} onOpenChange={fn()} size="default">
      <ModalGlass.Portal>
        <ModalGlass.Overlay />
        <ModalGlass.Content>
          <ModalGlass.Header>
            <ModalGlass.Title>Terms and Conditions</ModalGlass.Title>
            <ModalGlass.Close />
          </ModalGlass.Header>
          <ModalGlass.Body>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium.
              </p>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <ButtonGlass variant="ghost">Decline</ButtonGlass>
              <ButtonGlass variant="default">Accept</ButtonGlass>
            </div>
          </ModalGlass.Body>
        </ModalGlass.Content>
      </ModalGlass.Portal>
    </ModalGlass.Root>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// INTERACTIVE TEST
// ========================================

const InteractiveModalExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <ButtonGlass variant="default" onClick={() => setOpen(true)}>
        Open Modal
      </ButtonGlass>
      <ModalGlass.Root open={open} onOpenChange={setOpen} size="sm">
        <ModalGlass.Portal>
          <ModalGlass.Overlay />
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Modal Title</ModalGlass.Title>
              <ModalGlass.Close />
            </ModalGlass.Header>
            <ModalGlass.Body>
              <p className="mb-4">
                This is a modal dialog with glassmorphism styling. It includes a backdrop blur
                effect and smooth animations.
              </p>
              <div className="flex gap-3 justify-end">
                <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </ButtonGlass>
                <ButtonGlass variant="default" onClick={() => setOpen(false)}>
                  Confirm
                </ButtonGlass>
              </div>
            </ModalGlass.Body>
          </ModalGlass.Content>
        </ModalGlass.Portal>
      </ModalGlass.Root>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveModalExample />,
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Open Modal' });

    await userEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 350));
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();
  },
};

// ========================================
// COMPOUND COMPONENT API
// ========================================

export const CompoundBasic: Story = {
  name: 'Compound API - Basic',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <ButtonGlass onClick={() => setOpen(true)}>Open Compound Modal</ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen} size="default">
          <ModalGlass.Portal>
            <ModalGlass.Overlay />
            <ModalGlass.Content>
              <ModalGlass.Header>
                <ModalGlass.Title>Compound Component API</ModalGlass.Title>
                <ModalGlass.Close />
              </ModalGlass.Header>
              <ModalGlass.Body>
                <p>
                  The new compound component API provides granular control over modal structure.
                  Each part can be customized independently.
                </p>
              </ModalGlass.Body>
            </ModalGlass.Content>
          </ModalGlass.Portal>
        </ModalGlass.Root>
      </div>
    );
  },
};

export const CompoundWithFooter: Story = {
  name: 'Compound API - With Footer',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <ButtonGlass onClick={() => setOpen(true)}>Open Modal with Footer</ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen} size="lg">
          <ModalGlass.Portal>
            <ModalGlass.Overlay />
            <ModalGlass.Content>
              <ModalGlass.Header>
                <ModalGlass.Title>Confirm Action</ModalGlass.Title>
                <ModalGlass.Description>
                  This modal demonstrates the footer component with action buttons.
                </ModalGlass.Description>
                <ModalGlass.Close />
              </ModalGlass.Header>
              <ModalGlass.Body>
                <p className="mb-4">
                  Are you sure you want to proceed with this action? This operation cannot be
                  undone.
                </p>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'var(--alert-warning-bg)',
                    border: '1px solid var(--alert-warning-border)',
                  }}
                >
                  <p className="text-sm" style={{ color: 'var(--alert-warning-text)' }}>
                    <strong>Warning:</strong> This will permanently delete your data.
                  </p>
                </div>
              </ModalGlass.Body>
              <ModalGlass.Footer>
                <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </ButtonGlass>
                <ButtonGlass variant="default" onClick={() => setOpen(false)}>
                  Confirm
                </ButtonGlass>
              </ModalGlass.Footer>
            </ModalGlass.Content>
          </ModalGlass.Portal>
        </ModalGlass.Root>
      </div>
    );
  },
};

export const CompoundMultiStep: Story = {
  name: 'Compound API - Multi-Step Form',
  render: () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <ButtonGlass
          onClick={() => {
            setOpen(true);
            setStep(1);
          }}
        >
          Open Multi-Step Modal
        </ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen} size="lg">
          <ModalGlass.Portal>
            <ModalGlass.Overlay />
            <ModalGlass.Content>
              <ModalGlass.Header>
                <ModalGlass.Title>Multi-Step Form</ModalGlass.Title>
                <ModalGlass.Description>
                  Step {step} of {totalSteps}
                </ModalGlass.Description>
                <ModalGlass.Close />
              </ModalGlass.Header>
              <ModalGlass.Body>
                {step === 1 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Personal Information
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Enter your basic details to get started.
                    </p>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Account Setup
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Configure your account preferences and settings.
                    </p>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Confirmation
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Review your information and confirm to proceed.
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
                  <ButtonGlass variant="default" onClick={() => setStep(step + 1)}>
                    Next
                  </ButtonGlass>
                ) : (
                  <ButtonGlass variant="default" onClick={() => setOpen(false)}>
                    Finish
                  </ButtonGlass>
                )}
              </ModalGlass.Footer>
            </ModalGlass.Content>
          </ModalGlass.Portal>
        </ModalGlass.Root>
      </div>
    );
  },
};
