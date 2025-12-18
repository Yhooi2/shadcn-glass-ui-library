import type { Meta, StoryObj } from '@storybook/react';
import { CardGlass } from './card-glass';
import { ButtonGlass } from './button-glass';
import { BadgeGlass } from './badge-glass';
import { InputGlass } from './input-glass';

const meta: Meta<typeof CardGlass.Root> = {
  title: 'Components/Core/CardGlass',
  component: CardGlass.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
CardGlass is a compound component that provides a structured glass-themed card with shadcn/ui Card API compatibility.

## Usage

### Object Pattern (Recommended)
\`\`\`tsx
<CardGlass.Root intensity="medium">
  <CardGlass.Header>
    <CardGlass.Title>Title</CardGlass.Title>
    <CardGlass.Description>Description</CardGlass.Description>
  </CardGlass.Header>
  <CardGlass.Content>Content</CardGlass.Content>
  <CardGlass.Footer>Footer</CardGlass.Footer>
</CardGlass.Root>
\`\`\`

### Named Exports (shadcn/ui compatible)
\`\`\`tsx
import { CardGlassRoot, CardGlassHeader, CardGlassTitle } from '@/components/glass/ui';

<CardGlassRoot>
  <CardGlassHeader>
    <CardGlassTitle>Title</CardGlassTitle>
  </CardGlassHeader>
</CardGlassRoot>
\`\`\`

## Sub-components

- **CardGlass.Root** - Glass container with intensity, glow, and hover props
- **CardGlass.Header** - Grid layout for title, description, and action
- **CardGlass.Title** - Card title text
- **CardGlass.Description** - Card description/subtitle
- **CardGlass.Action** - Positioned action slot in header
- **CardGlass.Content** - Main content area
- **CardGlass.Footer** - Footer with flex layout

## Difference from GlassCard

- **GlassCard** - Simple glass container (intensity, glow, hover effects)
- **CardGlass** - Structured card with compound sub-components (shadcn/ui pattern)
        `,
      },
    },
  },
  argTypes: {
    intensity: {
      control: 'select',
      options: ['subtle', 'medium', 'strong'],
      description: 'Glass blur intensity',
    },
    glow: {
      control: 'select',
      options: [null, 'blue', 'violet', 'cyan'],
      description: 'Glow effect color',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardGlass.Root>;

// ========================================
// BASIC EXAMPLES
// ========================================

export const Default: Story = {
  render: () => (
    <CardGlass.Root>
      <CardGlass.Header>
        <CardGlass.Title>Card Title</CardGlass.Title>
        <CardGlass.Description>This is a description of the card content.</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">
          This is the main content area of the card. You can put any content here.
        </p>
      </CardGlass.Content>
      <CardGlass.Footer>
        <ButtonGlass variant="ghost" size="sm">
          Cancel
        </ButtonGlass>
        <ButtonGlass size="sm">Save</ButtonGlass>
      </CardGlass.Footer>
    </CardGlass.Root>
  ),
};

export const WithAction: Story = {
  render: () => (
    <CardGlass.Root>
      <CardGlass.Header>
        <CardGlass.Title>Settings</CardGlass.Title>
        <CardGlass.Description>Manage your account settings</CardGlass.Description>
        <CardGlass.Action>
          <BadgeGlass variant="secondary">Pro</BadgeGlass>
        </CardGlass.Action>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">
          Configure your preferences and account options here.
        </p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

// ========================================
// INTENSITY VARIANTS
// ========================================

export const IntensitySubtle: Story = {
  render: () => (
    <CardGlass.Root intensity="subtle">
      <CardGlass.Header>
        <CardGlass.Title>Subtle Intensity</CardGlass.Title>
        <CardGlass.Description>Light glass blur effect</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">8px blur for subtle glass effect.</p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

export const IntensityMedium: Story = {
  render: () => (
    <CardGlass.Root intensity="medium">
      <CardGlass.Header>
        <CardGlass.Title>Medium Intensity</CardGlass.Title>
        <CardGlass.Description>Standard glass blur effect</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">16px blur for standard glass effect.</p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

export const IntensityStrong: Story = {
  render: () => (
    <CardGlass.Root intensity="strong">
      <CardGlass.Header>
        <CardGlass.Title>Strong Intensity</CardGlass.Title>
        <CardGlass.Description>Heavy glass blur effect</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">24px blur for featured glass effect.</p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

// ========================================
// GLOW VARIANTS
// ========================================

export const GlowBlue: Story = {
  render: () => (
    <CardGlass.Root glow="blue">
      <CardGlass.Header>
        <CardGlass.Title>Blue Glow</CardGlass.Title>
        <CardGlass.Description>Card with blue glow effect</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">This card has a blue glow shadow.</p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

export const GlowViolet: Story = {
  render: () => (
    <CardGlass.Root glow="violet">
      <CardGlass.Header>
        <CardGlass.Title>Violet Glow</CardGlass.Title>
        <CardGlass.Description>Card with violet glow effect</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">This card has a violet glow shadow.</p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

export const GlowCyan: Story = {
  render: () => (
    <CardGlass.Root glow="cyan">
      <CardGlass.Header>
        <CardGlass.Title>Cyan Glow</CardGlass.Title>
        <CardGlass.Description>Card with cyan glow effect</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">This card has a cyan glow shadow.</p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

// ========================================
// INTERACTIVE EXAMPLES
// ========================================

export const HoverEnabled: Story = {
  render: () => (
    <CardGlass.Root hover>
      <CardGlass.Header>
        <CardGlass.Title>Clickable Card</CardGlass.Title>
        <CardGlass.Description>Hover over this card to see the effect</CardGlass.Description>
      </CardGlass.Header>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">
          This card has hover effects enabled. It can be used as a clickable card.
        </p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

// ========================================
// FORM CARD
// ========================================

export const FormCard: Story = {
  render: () => (
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
  ),
};

// ========================================
// CONTENT ONLY
// ========================================

export const ContentOnly: Story = {
  render: () => (
    <CardGlass.Root>
      <CardGlass.Content>
        <p className="text-[var(--text-secondary)]">
          This card only has content, no header or footer. Useful for simple information display.
        </p>
      </CardGlass.Content>
    </CardGlass.Root>
  ),
};

// ========================================
// ALL PARTS SHOWCASE
// ========================================

export const AllParts: Story = {
  render: () => (
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
          <p className="text-[var(--text-secondary)]">
            The CardGlass component provides a structured layout for content with:
          </p>
          <ul className="list-disc list-inside text-[var(--text-muted)] text-sm">
            <li>Header with title, description, and action slot</li>
            <li>Content area for main content</li>
            <li>Footer for actions</li>
          </ul>
        </div>
      </CardGlass.Content>
      <CardGlass.Footer>
        <span className="text-sm text-[var(--text-muted)]">Last updated: Today</span>
        <div className="ml-auto flex gap-2">
          <ButtonGlass variant="ghost" size="sm">
            Cancel
          </ButtonGlass>
          <ButtonGlass size="sm">Confirm</ButtonGlass>
        </div>
      </CardGlass.Footer>
    </CardGlass.Root>
  ),
};
