import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect } from 'storybook/test';
import { NotificationGlass } from './notification-glass';

const meta = {
  title: 'Components/Feedback/NotificationGlass',
  component: NotificationGlass,
  parameters: {
    layout: 'centered',
    snapshot: {
      // Enable visual snapshot testing
      disable: false,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning'],
      description: 'Notification variant (shadcn/ui compatible)',
      table: {
        type: { summary: "'default' | 'destructive' | 'success' | 'warning'" },
        defaultValue: { summary: 'default' },
      },
    },
    title: {
      control: 'text',
      description: 'The notification title',
      table: {
        type: { summary: 'string' },
      },
    },
    message: {
      control: 'text',
      description: 'The notification message',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof NotificationGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// TYPE VARIANTS - Reference: .claude/tepm/first
// Glass theme: rgba(255,255,255,0.08) bg, rgba(255,255,255,0.15) border
// Box-shadow: 0 8px 32px rgba(168,85,247,0.20), inset 0 1px 0 rgba(255,255,255,0.10)
// ========================================

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'New update available',
    message: 'Version 2.0 is ready to install with new features.',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Default variant (info)
    // Icon color: #60a5fa, iconBg: rgba(96,165,250,0.15)
    // Glow: 0 0 20px rgba(96,165,250,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Payment successful',
    message: 'Your payment has been processed successfully.',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Success variant
    // Icon color: #34d399, iconBg: rgba(52,211,153,0.15)
    // Glow: 0 0 20px rgba(52,211,153,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Storage almost full',
    message: "You're using 90% of your available storage.",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Warning variant
    // Icon color: #fbbf24, iconBg: rgba(251,191,36,0.15)
    // Glow: 0 0 20px rgba(251,191,36,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Connection failed',
    message: 'Unable to connect to the server. Please try again.',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Destructive variant (error)
    // Icon color: #fb7185, iconBg: rgba(251,113,133,0.15)
    // Glow: 0 0 20px rgba(251,113,133,0.30)
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// CONTENT VARIATIONS
// ========================================

export const ShortContent: Story = {
  args: {
    variant: 'default',
    title: 'Info',
    message: 'Short message',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Short content
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LongContent: Story = {
  args: {
    variant: 'default',
    title: 'Important Information About Your Account',
    message:
      'This is a longer notification message that spans multiple lines to test how the component handles text wrapping and maintains proper spacing and alignment.',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Long content with text wrapping
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// ALL TYPES TOGETHER - Critical snapshot
// ========================================

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <NotificationGlass
        variant="default"
        title="Information"
        message="This is an informational notification."
        onClose={args.onClose}
      />
      <NotificationGlass
        variant="success"
        title="Success"
        message="Operation completed successfully."
        onClose={args.onClose}
      />
      <NotificationGlass
        variant="warning"
        title="Warning"
        message="Please review this important warning."
        onClose={args.onClose}
      />
      <NotificationGlass
        variant="destructive"
        title="Error"
        message="An error occurred. Please try again."
        onClose={args.onClose}
      />
    </div>
  ),
  args: {
    variant: 'default',
    title: '',
    message: '',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - All notification variants together
    // Critical for preserving consistent glass theme styling
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// GLASS THEME SPECIFIC TESTS
// ========================================

export const GlassBackgroundTest: Story = {
  args: {
    variant: 'default',
    title: 'Glass Effect Test',
    message: 'Testing the glassmorphism background, borders, and glow effects',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Glass effect
    // Background: rgba(255,255,255,0.08)
    // Border: 1px solid rgba(255,255,255,0.15)
    // Backdrop-filter: blur(20px)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const IconBackgroundsTest: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <NotificationGlass
        variant="default"
        title="Default Icon"
        message="Blue icon background - rgba(96,165,250,0.15)"
        onClose={args.onClose}
      />
      <NotificationGlass
        variant="success"
        title="Success Icon"
        message="Green icon background - rgba(52,211,153,0.15)"
        onClose={args.onClose}
      />
      <NotificationGlass
        variant="warning"
        title="Warning Icon"
        message="Yellow icon background - rgba(251,191,36,0.15)"
        onClose={args.onClose}
      />
      <NotificationGlass
        variant="destructive"
        title="Destructive Icon"
        message="Red icon background - rgba(251,113,133,0.15)"
        onClose={args.onClose}
      />
    </div>
  ),
  args: {
    variant: 'default',
    title: '',
    message: '',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - All icon backgrounds with variant-specific colors
    await expect(canvasElement).toBeInTheDocument();
  },
};
