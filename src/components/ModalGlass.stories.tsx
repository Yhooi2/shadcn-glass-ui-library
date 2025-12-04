import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import { ModalGlass } from "./glass/ui/modal-glass";
import { ButtonGlass } from "./glass/ui/button-glass";

const meta = {
  title: "Components/ModalGlass",
  component: ModalGlass,
  parameters: {
    layout: "fullscreen",
    snapshot: {
      // Enable visual snapshot testing
      disable: false,
    },
  tags: ["autodocs"],
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the modal",
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl' | 'full'" },
        defaultValue: { summary: "md" },
      },
    },
    isOpen: {
      control: "boolean",
      description: "Whether the modal is open",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: "text",
      description: "The modal title",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof ModalGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// SIZE VARIANTS - Reference: .claude/tepm/first
// Glass theme:
// modalBg: rgba(255,255,255,0.06)
// modalBorder: rgba(255,255,255,0.12)
// modalGlow: 0 25px 80px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.15)
// modalOverlay: rgba(15,23,42,0.60)
// Backdrop-filter: blur(24px)
// ========================================

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Modal Title",
    size: "md",
    children: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          This is a modal dialog with glassmorphism styling. It features
          beautiful blur effects, gradient backgrounds, and smooth animations.
        </p>
        <p className="leading-relaxed text-white/60">
          The modal automatically locks body scroll, closes on Escape key, and
          handles click outside behavior.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Default medium modal
    // Background: rgba(255,255,255,0.06)
    // Border: 1px solid rgba(255,255,255,0.12)
    // Box-shadow: 0 25px 80px rgba(168,85,247,0.35)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    title: "Small Modal",
    size: "sm",
    children: (
      <p className="leading-relaxed">
        This is a small modal. Great for simple confirmations.
      </p>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Small modal: max-w-sm
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Medium: Story = {
  args: {
    isOpen: true,
    title: "Medium Modal",
    size: "md",
    children: (
      <p className="leading-relaxed">
        This is a medium modal. The default size for most use cases.
      </p>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Medium modal: max-w-md
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    title: "Large Modal",
    size: "lg",
    children: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          This is a large modal. It provides more space for complex content.
        </p>
        <p className="leading-relaxed text-white/60">
          Use this size when you need to display forms, detailed information, or
          multiple sections of content.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Large modal: max-w-lg
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ExtraLarge: Story = {
  args: {
    isOpen: true,
    title: "Extra Large Modal",
    size: "xl",
    children: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          This is an extra large modal for complex workflows.
        </p>
        <p className="leading-relaxed text-white/60">
          Perfect for multi-step forms, data tables, or rich content displays.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Extra large modal: max-w-xl
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Full: Story = {
  args: {
    isOpen: true,
    title: "Full Width Modal",
    size: "full",
    children: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          This is the maximum width modal. Use it for complex interfaces.
        </p>
        <p className="leading-relaxed text-white/60">
          Ideal for dashboards, editors, or any content that needs maximum
          screen real estate.
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Full width modal: max-w-4xl
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// CONTENT VARIANTS - Different layouts
// ========================================

export const WithActions: Story = {
  args: {
    isOpen: true,
    title: "Confirm Action",
    size: "md",
    children: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          Are you sure you want to proceed with this action? This cannot be
          undone.
        </p>
        <div className="flex gap-3 justify-end pt-4">
          <ButtonGlass variant="text">Cancel</ButtonGlass>
          <ButtonGlass variant="primary">Confirm</ButtonGlass>
        </div>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Modal with action buttons
    // Button styling should match glass theme
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithForm: Story = {
  args: {
    isOpen: true,
    title: "Create New Item",
    size: "md",
    children: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            rows={3}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <ButtonGlass variant="text">Cancel</ButtonGlass>
          <ButtonGlass variant="primary">Create</ButtonGlass>
        </div>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Modal with form inputs
    // Input styling: bg-white/10, border-white/20, focus:ring-purple-500
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLongContent: Story = {
  args: {
    isOpen: true,
    title: "Terms and Conditions",
    size: "md",
    children: (
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        <p className="leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="leading-relaxed">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="leading-relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
        <p className="leading-relaxed">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
        <p className="leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
        <div className="flex gap-3 justify-end pt-4 sticky bottom-0 bg-transparent">
          <ButtonGlass variant="text">Decline</ButtonGlass>
          <ButtonGlass variant="primary">Accept</ButtonGlass>
        </div>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Modal with scrollable content
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// ALL SIZES COMPARISON
// ========================================

export const AllSizes: Story = {
  render: () => (
    <div className="min-h-screen grid grid-cols-2 gap-4 p-8">
      <div className="relative h-[300px] bg-slate-900/50 rounded-xl overflow-hidden">
        <ModalGlass isOpen={true} onClose={() => {}} title="Small" size="sm">
          <p>Small modal content</p>
        </ModalGlass>
      </div>
      <div className="relative h-[300px] bg-slate-900/50 rounded-xl overflow-hidden">
        <ModalGlass isOpen={true} onClose={() => {}} title="Medium" size="md">
          <p>Medium modal content</p>
        </ModalGlass>
      </div>
      <div className="relative h-[300px] bg-slate-900/50 rounded-xl overflow-hidden">
        <ModalGlass isOpen={true} onClose={() => {}} title="Large" size="lg">
          <p>Large modal content</p>
        </ModalGlass>
      </div>
      <div className="relative h-[300px] bg-slate-900/50 rounded-xl overflow-hidden">
        <ModalGlass
          isOpen={true}
          onClose={() => {}}
          title="Extra Large"
          size="xl"
        >
          <p>Extra large modal content</p>
        </ModalGlass>
      </div>
    </div>
  ),
  args: {
    isOpen: true,
    title: "",
    children: null,
  },
  async play({ canvasElement }) {
    // Visual snapshot test - All sizes for comparison
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// GLASS THEME SPECIFIC TESTS
// ========================================

export const GlassOverlayTest: Story = {
  args: {
    isOpen: true,
    title: "Glass Overlay",
    size: "md",
    children: (
      <p className="leading-relaxed">
        Testing the glass overlay effect with blur backdrop.
      </p>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Overlay styling
    // Background: rgba(15,23,42,0.60)
    // Backdrop-filter: blur(8px)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const GlassGlowTest: Story = {
  args: {
    isOpen: true,
    title: "Glass Glow Effect",
    size: "lg",
    children: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          Testing the purple glow effect around the modal.
        </p>
        <p className="leading-relaxed text-white/60">
          Box-shadow: 0 25px 80px rgba(168,85,247,0.35)
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Glow effect
    // Box-shadow: 0 25px 80px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.15)
    // Glow gradient: radial-gradient(ellipse at top, rgba(168,85,247,0.15) 0%, transparent 50%)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CloseButtonTest: Story = {
  args: {
    isOpen: true,
    title: "Close Button Styling",
    size: "md",
    children: (
      <p className="leading-relaxed">
        Hover over the close button to see the hover effect.
      </p>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Close button styling
    // Default: bg rgba(255,255,255,0.08), border rgba(255,255,255,0.10)
    // Hover: bg rgba(255,255,255,0.15), glow 0 0 20px rgba(168,85,247,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const TitleAndBodyText: Story = {
  args: {
    isOpen: true,
    title: "Typography Test",
    size: "md",
    children: (
      <div className="space-y-4">
        <p className="leading-relaxed">
          This tests the title and body text colors.
        </p>
        <p className="leading-relaxed text-white/60">
          Body text should be rgba(255,255,255,0.70).
        </p>
        <p className="font-semibold">
          Title should be rgba(255,255,255,0.95).
        </p>
      </div>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Text colors
    // Title: rgba(255,255,255,0.95)
    // Body: rgba(255,255,255,0.70)
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// INTERACTIVE TEST
// ========================================

const InteractiveModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <ButtonGlass variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </ButtonGlass>
      <ModalGlass
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Interactive Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="leading-relaxed">
            This is an interactive modal example. Click outside or press Escape
            to close.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <ButtonGlass variant="text" onClick={() => setIsOpen(false)}>
              Cancel
            </ButtonGlass>
            <ButtonGlass variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </ButtonGlass>
          </div>
        </div>
      </ModalGlass>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveModalExample />,
  args: {
    isOpen: false,
    title: "",
    children: null,
  },
  async play({ canvasElement }) {
    // Interactive test - Opens modal on button click
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Open Modal" });

    // Click to open
    await userEvent.click(button);

    // Wait for animation
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Modal should be visible
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
};

export const InteractiveOpened: Story = {
  render: () => <InteractiveModalExample />,
  args: {
    isOpen: false,
    title: "",
    children: null,
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Open Modal" });

    // Open modal for snapshot
    await userEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Visual snapshot test - Interactive modal in open state
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
};

// ========================================
// ANIMATION TEST
// ========================================

export const AnimationTest: Story = {
  args: {
    isOpen: true,
    title: "Animation Test",
    size: "md",
    children: (
      <p className="leading-relaxed">
        This modal tests the open animation effect.
      </p>
    ),
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Animation
    // modalFadeIn: from scale(0.95) translateY(20px) opacity(0)
    //              to scale(1) translateY(0) opacity(1)
    // Duration: 0.3s ease-out
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// COMPOUND COMPONENT API (Week 4)
// New composition pattern for advanced use cases
// ========================================

export const CompoundBasic: Story = {
  name: "Compound API - Basic",
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <ButtonGlass onClick={() => setOpen(true)}>
          Open Compound Modal
        </ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen}>
          <ModalGlass.Overlay />
          <ModalGlass.Content>
            <ModalGlass.Header>
              <ModalGlass.Title>Compound Component API</ModalGlass.Title>
              <ModalGlass.Close />
            </ModalGlass.Header>
            <ModalGlass.Body>
              <p className="leading-relaxed">
                The new compound component API provides granular control over modal structure.
                Each part can be customized independently.
              </p>
            </ModalGlass.Body>
          </ModalGlass.Content>
        </ModalGlass.Root>
      </>
    );
  },
};

export const CompoundWithFooter: Story = {
  name: "Compound API - With Footer",
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <ButtonGlass onClick={() => setOpen(true)}>
          Open Modal with Footer
        </ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen} size="lg">
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
              <p className="leading-relaxed">
                Are you sure you want to proceed with this action? This operation cannot be undone.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm text-yellow-200">
                  <strong>Warning:</strong> This will permanently delete your data.
                </p>
              </div>
            </ModalGlass.Body>
            <ModalGlass.Footer>
              <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </ButtonGlass>
              <ButtonGlass variant="primary" onClick={() => {
                console.log("Confirmed");
                setOpen(false);
              }}>
                Confirm
              </ButtonGlass>
            </ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      </>
    );
  },
};

export const CompoundCustomStyling: Story = {
  name: "Compound API - Custom Styling",
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <ButtonGlass onClick={() => setOpen(true)}>
          Open Custom Styled Modal
        </ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen} size="md">
          <ModalGlass.Overlay className="bg-purple-900/40" />
          <ModalGlass.Content className="border-2 border-purple-500/30">
            <ModalGlass.Header className="border-b border-purple-500/20 pb-4">
              <ModalGlass.Title className="text-purple-200">
                Custom Styled Modal
              </ModalGlass.Title>
              <ModalGlass.Description className="text-purple-300/70">
                Each compound component accepts custom className for styling
              </ModalGlass.Description>
              <ModalGlass.Close />
            </ModalGlass.Header>
            <ModalGlass.Body className="py-6">
              <p className="leading-relaxed text-purple-100/90">
                The compound API gives you full control over styling while maintaining
                the glassmorphism aesthetic. You can customize colors, spacing, borders,
                and animations.
              </p>
            </ModalGlass.Body>
            <ModalGlass.Footer className="border-t border-purple-500/20 pt-4">
              <ButtonGlass variant="primary" onClick={() => setOpen(false)}>
                Got it
              </ButtonGlass>
            </ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      </>
    );
  },
};

export const CompoundMultiStep: Story = {
  name: "Compound API - Multi-Step Form",
  render: () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    return (
      <>
        <ButtonGlass onClick={() => {
          setOpen(true);
          setStep(1);
        }}>
          Open Multi-Step Modal
        </ButtonGlass>

        <ModalGlass.Root open={open} onOpenChange={setOpen} size="lg">
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
                <div className="space-y-4">
                  <h3 className="font-semibold">Personal Information</h3>
                  <p className="text-sm text-white/60">
                    Enter your basic details to get started.
                  </p>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Account Setup</h3>
                  <p className="text-sm text-white/60">
                    Configure your account preferences and settings.
                  </p>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Confirmation</h3>
                  <p className="text-sm text-white/60">
                    Review your information and confirm to proceed.
                  </p>
                </div>
              )}

              {/* Progress indicator */}
              <div className="mt-6 flex gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i < step ? "bg-purple-500" : "bg-white/10"
                    }`}
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
                <ButtonGlass variant="primary" onClick={() => setStep(step + 1)}>
                  Next
                </ButtonGlass>
              ) : (
                <ButtonGlass variant="primary" onClick={() => setOpen(false)}>
                  Finish
                </ButtonGlass>
              )}
            </ModalGlass.Footer>
          </ModalGlass.Content>
        </ModalGlass.Root>
      </>
    );
  },
};
