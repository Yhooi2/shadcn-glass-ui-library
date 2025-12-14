import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGlass } from './button-glass';
import { BadgeGlass } from './badge-glass';
import { Check, Download, ArrowRight, ExternalLink, Bell, ShoppingCart, Mail } from 'lucide-react';

const meta = {
  title: 'Components/Core/ButtonGlass',
  component: ButtonGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'success', 'text'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Size variant',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (polymorphic)',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
  },
} satisfies Meta<typeof ButtonGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};

// Variants showcase
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGlass variant="default">Primary</ButtonGlass>
      <ButtonGlass variant="secondary">Secondary</ButtonGlass>
      <ButtonGlass variant="ghost">Ghost</ButtonGlass>
      <ButtonGlass variant="destructive">Destructive</ButtonGlass>
      <ButtonGlass variant="success">Success</ButtonGlass>
      <ButtonGlass variant="link">Text</ButtonGlass>
    </div>
  ),
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonGlass size="sm" variant="default">
        Small
      </ButtonGlass>
      <ButtonGlass size="default" variant="default">
        Medium
      </ButtonGlass>
      <ButtonGlass size="lg" variant="default">
        Large
      </ButtonGlass>
      <ButtonGlass size="icon" variant="default" icon={Check} />
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGlass icon={Check} iconPosition="left" variant="success">
        Confirm
      </ButtonGlass>
      <ButtonGlass icon={Download} iconPosition="left" variant="default">
        Download
      </ButtonGlass>
      <ButtonGlass icon={ArrowRight} iconPosition="right" variant="ghost">
        Continue
      </ButtonGlass>
      <ButtonGlass icon={ExternalLink} iconPosition="right" variant="secondary">
        Open
      </ButtonGlass>
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGlass loading variant="default">
        Processing...
      </ButtonGlass>
      <ButtonGlass loading variant="secondary">
        Loading...
      </ButtonGlass>
      <ButtonGlass loading variant="ghost">
        Please wait...
      </ButtonGlass>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGlass disabled variant="default">
        Disabled Primary
      </ButtonGlass>
      <ButtonGlass disabled variant="secondary">
        Disabled Secondary
      </ButtonGlass>
      <ButtonGlass disabled variant="ghost">
        Disabled Ghost
      </ButtonGlass>
    </div>
  ),
};

// asChild pattern - as Link
export const AsLink: Story = {
  name: 'asChild Pattern (as <a>)',
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground mb-2">
        Buttons rendered as anchor tags using the asChild pattern:
      </p>
      <div className="flex flex-wrap gap-4">
        <ButtonGlass asChild variant="default">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            Visit GitHub
          </a>
        </ButtonGlass>
        <ButtonGlass asChild variant="secondary">
          <a href="https://storybook.js.org" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4 inline-block" />
            Storybook Docs
          </a>
        </ButtonGlass>
        <ButtonGlass asChild variant="ghost">
          <a href="/dashboard">Go to Dashboard</a>
        </ButtonGlass>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Note: In real apps, replace with Next.js Link or React Router Link
      </p>
    </div>
  ),
};

// With Badge - Notification pattern
export const WithBadge: Story = {
  name: 'With Badge (Notifications)',
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground mb-2">
        Icon buttons with notification badges - perfect for headers and navigation:
      </p>

      <div className="flex flex-wrap gap-6 items-start">
        {/* Notifications */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative inline-flex">
            <ButtonGlass variant="ghost" size="lg" aria-label="Notifications. 3 unread">
              <Bell className="w-5 h-5" />
            </ButtonGlass>
            <BadgeGlass
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1.5"
            >
              3
            </BadgeGlass>
          </div>
          <span className="text-xs text-muted-foreground">Notifications</span>
        </div>

        {/* Shopping Cart */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative inline-flex">
            <ButtonGlass variant="ghost" size="lg" aria-label="Shopping cart. 12 items">
              <ShoppingCart className="w-5 h-5" />
            </ButtonGlass>
            <BadgeGlass
              variant="default"
              className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1.5"
            >
              12
            </BadgeGlass>
          </div>
          <span className="text-xs text-muted-foreground">Cart</span>
        </div>

        {/* Unread Messages */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative inline-flex">
            <ButtonGlass variant="ghost" size="lg" aria-label="Messages. 99+ unread">
              <Mail className="w-5 h-5" />
            </ButtonGlass>
            <BadgeGlass
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1.5"
            >
              99+
            </BadgeGlass>
          </div>
          <span className="text-xs text-muted-foreground">Messages</span>
        </div>

        {/* Ghost Button with Badge and Text */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative inline-flex">
            <ButtonGlass variant="ghost" size="lg">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </ButtonGlass>
            <BadgeGlass
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1.5"
            >
              5
            </BadgeGlass>
          </div>
          <span className="text-xs text-muted-foreground">With Text</span>
        </div>
      </div>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>Pattern:</strong> Wrap button in a container with{' '}
          <code>relative inline-flex</code>, then add badge as a sibling with absolute positioning.
          This prevents clipping and ensures the badge is fully visible outside the button
          boundaries.
        </p>
      </div>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Variants */}
      <div>
        <h3 className="text-sm font-medium mb-3">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <ButtonGlass variant="default">Primary</ButtonGlass>
          <ButtonGlass variant="secondary">Secondary</ButtonGlass>
          <ButtonGlass variant="ghost">Ghost</ButtonGlass>
          <ButtonGlass variant="destructive">Destructive</ButtonGlass>
          <ButtonGlass variant="success">Success</ButtonGlass>
          <ButtonGlass variant="link">Text</ButtonGlass>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-medium mb-3">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonGlass size="sm">Small</ButtonGlass>
          <ButtonGlass size="default">Medium</ButtonGlass>
          <ButtonGlass size="lg">Large</ButtonGlass>
          <ButtonGlass size="icon" icon={Check} />
        </div>
      </div>

      {/* Icons */}
      <div>
        <h3 className="text-sm font-medium mb-3">With Icons</h3>
        <div className="flex flex-wrap gap-3">
          <ButtonGlass icon={Check} iconPosition="left">
            Confirm
          </ButtonGlass>
          <ButtonGlass icon={ArrowRight} iconPosition="right">
            Continue
          </ButtonGlass>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 className="text-sm font-medium mb-3">States</h3>
        <div className="flex flex-wrap gap-3">
          <ButtonGlass loading>Loading...</ButtonGlass>
          <ButtonGlass disabled>Disabled</ButtonGlass>
        </div>
      </div>

      {/* asChild */}
      <div>
        <h3 className="text-sm font-medium mb-3">asChild Pattern</h3>
        <div className="flex flex-wrap gap-3">
          <ButtonGlass asChild variant="default">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub Link
            </a>
          </ButtonGlass>
          <ButtonGlass asChild variant="ghost">
            <a href="/docs">
              Documentation
              <ExternalLink className="ml-2 h-4 w-4 inline-block" />
            </a>
          </ButtonGlass>
        </div>
      </div>
    </div>
  ),
};
