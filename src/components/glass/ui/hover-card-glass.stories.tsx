import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { CalendarDays, User, ExternalLink, Github } from 'lucide-react';
import {
  HoverCardGlass,
  HoverCardGlassTrigger,
  HoverCardGlassContent,
  HoverCardGlassLegacy,
} from './hover-card-glass';
import { AvatarGlass, AvatarGlassImage, AvatarGlassFallback } from './avatar-glass';
import { ButtonGlass } from './button-glass';

const meta = {
  title: 'Components/Overlay/HoverCardGlass',
  component: HoverCardGlassLegacy,
  parameters: {
    layout: 'centered',
    snapshot: {
      disable: false,
    },
    docs: {
      description: {
        component: `
Hover-triggered floating glass-themed container for rich content previews. Unlike PopoverGlass (click-triggered), HoverCardGlass opens on hover after a configurable delay.

## Features
- Hover-triggered (vs click for PopoverGlass)
- Configurable delays: openDelay (200ms) and closeDelay (100ms)
- Arrow pointer with glass styling (shown by default)
- 12 positioning options: 4 sides × 3 alignments
- Fade animations with slide-in effects
- Portal rendering (always in document.body)
- Compound component API (recommended)
- Legacy API for backward compatibility
- Theme-aware glass styling via CSS variables
- 100% shadcn/ui compatible API

## Sub-Components
- **HoverCardGlass / HoverCard**: Root component with delay configuration
- **HoverCardGlassTrigger / HoverCardTrigger**: Element that triggers hover (supports asChild)
- **HoverCardGlassContent / HoverCardContent**: Content container with glass styling and arrow

## CSS Variables
- \`--hovercard-bg\`: Card background color (glass effect)
- \`--hovercard-border\`: Card border color
- \`--hovercard-shadow\`: Card shadow/glow effect
- \`--hovercard-arrow-bg\`: Arrow pointer background color

## Usage Pattern
\`\`\`tsx
// User preview card
<HoverCardGlass openDelay={200} closeDelay={100}>
  <HoverCardGlassTrigger asChild>
    <span className="underline">@shadcn</span>
  </HoverCardGlassTrigger>
  <HoverCardGlassContent side="bottom" align="start">
    <div className="flex gap-4">
      <Avatar src="..." />
      <div>
        <h4>shadcn</h4>
        <p>Creator of shadcn/ui</p>
      </div>
    </div>
  </HoverCardGlassContent>
</HoverCardGlass>

// Link preview
<HoverCardGlass>
  <HoverCardGlassTrigger asChild>
    <a href="https://github.com">GitHub</a>
  </HoverCardGlassTrigger>
  <HoverCardGlassContent>
    <h4>GitHub</h4>
    <p>Where developers shape the future of software</p>
  </HoverCardGlassContent>
</HoverCardGlass>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The preferred side of the trigger to render against',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: "'bottom'" },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The preferred alignment against the trigger',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: "'center'" },
      },
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    openDelay: {
      control: 'number',
      description: 'Delay in milliseconds before the hover card opens',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    closeDelay: {
      control: 'number',
      description: 'Delay in milliseconds before the hover card closes',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow pointer',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[300px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HoverCardGlassLegacy>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// BASIC HOVER CARD
// ========================================

/**
 * Basic hover card with user profile preview.
 * Displays avatar, name, description, and joined date.
 */
export const Default: Story = {
  args: {
    trigger: (
      <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
        @shadcn
      </span>
    ),
    children: (
      <div className="flex gap-4">
        <AvatarGlass>
          <AvatarGlassImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarGlassFallback>SC</AvatarGlassFallback>
        </AvatarGlass>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            @shadcn
          </h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            The creator of shadcn/ui and Taxonomy.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays
              className="mr-2 h-4 w-4 opacity-70"
              style={{ color: 'var(--text-muted)' }}
            />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    ),
    side: 'bottom',
    align: 'center',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// USER PROFILE PREVIEW
// ========================================

/**
 * Extended user profile preview with follower/repo counts.
 * Common use case: GitHub-style user mentions.
 */
export const UserProfile: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" size="sm">
        <User className="w-4 h-4 mr-2" />
        View Profile
      </ButtonGlass>
    ),
    children: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <AvatarGlass size="lg">
            <AvatarGlassImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarGlassFallback>V</AvatarGlassFallback>
          </AvatarGlass>
          <div>
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Vercel
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              @vercel
            </p>
          </div>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Develop. Preview. Ship. Creators of Next.js.
        </p>
        <div className="flex gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          <span>
            <strong style={{ color: 'var(--text-primary)' }}>2.8k</strong> followers
          </span>
          <span>
            <strong style={{ color: 'var(--text-primary)' }}>156</strong> repos
          </span>
        </div>
      </div>
    ),
    side: 'right',
    align: 'start',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// LINK PREVIEW
// ========================================

/**
 * Link preview card with site metadata.
 * Common use case: Rich link previews, social media style.
 */
export const LinkPreview: Story = {
  args: {
    trigger: (
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 underline"
        style={{ color: 'var(--text-accent)' }}
      >
        GitHub
        <ExternalLink className="w-3 h-3" />
      </a>
    ),
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Github className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            GitHub
          </h4>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          GitHub is where over 100 million developers shape the future of software.
        </p>
        <div className="pt-2 border-t" style={{ borderColor: 'var(--separator-bg)' }}>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            github.com
          </span>
        </div>
      </div>
    ),
    side: 'bottom',
    align: 'start',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// POSITIONS
// ========================================

/**
 * Demonstration of all 4 positioning options: top, right, bottom, left.
 * Each position adapts to available screen space.
 */
export const Positions: Story = {
  args: {
    trigger: <div>Trigger</div>,
    children: <div>Content</div>,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-16">
      <HoverCardGlassLegacy
        trigger={
          <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
            Top
          </span>
        }
        side="top"
      >
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Top position
        </p>
      </HoverCardGlassLegacy>

      <HoverCardGlassLegacy
        trigger={
          <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
            Right
          </span>
        }
        side="right"
      >
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Right position
        </p>
      </HoverCardGlassLegacy>

      <HoverCardGlassLegacy
        trigger={
          <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
            Bottom
          </span>
        }
        side="bottom"
      >
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Bottom position
        </p>
      </HoverCardGlassLegacy>

      <HoverCardGlassLegacy
        trigger={
          <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
            Left
          </span>
        }
        side="left"
      >
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Left position
        </p>
      </HoverCardGlassLegacy>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="min-h-[400px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// CUSTOM DELAYS
// ========================================

/**
 * Custom delay configuration: slow to open (500ms), fast to close (50ms).
 * Prevents accidental triggers while allowing quick dismissal.
 */
export const CustomDelays: Story = {
  args: {
    trigger: (
      <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
        Hover me (slow open, fast close)
      </span>
    ),
    children: (
      <div className="space-y-2">
        <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Custom Delays
        </h4>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Open delay: 500ms, Close delay: 50ms
        </p>
      </div>
    ),
    openDelay: 500,
    closeDelay: 50,
    side: 'bottom',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// NO ARROW
// ========================================

/**
 * Hover card without arrow pointer.
 * Cleaner appearance for certain design styles.
 */
export const NoArrow: Story = {
  args: {
    trigger: (
      <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
        No arrow pointer
      </span>
    ),
    children: (
      <div className="space-y-2">
        <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          No Arrow
        </h4>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          This hover card has no arrow pointer.
        </p>
      </div>
    ),
    showArrow: false,
    side: 'bottom',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// COMPOUND API EXAMPLE
// ========================================

/**
 * Using the compound component API (recommended approach).
 * Provides more flexibility and better tree-shaking.
 */
export const CompoundAPI: Story = {
  args: {
    trigger: <div>Trigger</div>,
    children: <div>Content</div>,
  },
  render: () => (
    <HoverCardGlass openDelay={200} closeDelay={100}>
      <HoverCardGlassTrigger asChild>
        <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
          @radix-ui
        </span>
      </HoverCardGlassTrigger>
      <HoverCardGlassContent side="bottom" align="start">
        <div className="flex gap-4">
          <AvatarGlass>
            <AvatarGlassImage src="https://github.com/radix-ui.png" alt="@radix-ui" />
            <AvatarGlassFallback>R</AvatarGlassFallback>
          </AvatarGlass>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Radix UI
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Unstyled, accessible components for building high-quality design systems.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays
                className="mr-2 h-4 w-4 opacity-70"
                style={{ color: 'var(--text-muted)' }}
              />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Joined March 2020
              </span>
            </div>
          </div>
        </div>
      </HoverCardGlassContent>
    </HoverCardGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// OPENED STATE TESTS
// ========================================

/**
 * Hover card in opened state for visual testing.
 * Automatically opens on hover with 0ms delay.
 */
export const Opened: Story = {
  args: {
    trigger: (
      <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
        Hover to preview
      </span>
    ),
    children: (
      <div className="flex gap-4">
        <AvatarGlass>
          <AvatarGlassImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarGlassFallback>SC</AvatarGlassFallback>
        </AvatarGlass>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            @shadcn
          </h4>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            The creator of shadcn/ui.
          </p>
        </div>
      </div>
    ),
    side: 'bottom',
    openDelay: 0,
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Find the trigger and hover over it
    const trigger = canvas.getByText('Hover to preview');
    await userEvent.hover(trigger);

    // Wait for hover card to open
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Check that content is visible in document
    const body = within(document.body);
    await expect(body.getByText('@shadcn')).toBeInTheDocument();
  },
};

/**
 * Hover card positioned on the right side in opened state.
 * Visual test for right-side positioning.
 */
export const OpenedRightSide: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" size="sm">
        <User className="w-4 h-4" />
      </ButtonGlass>
    ),
    children: (
      <div className="space-y-2">
        <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          User Preview
        </h4>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Hover card positioned on the right side.
        </p>
      </div>
    ),
    side: 'right',
    openDelay: 0,
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Find the trigger button and hover
    const trigger = canvas.getByRole('button');
    await userEvent.hover(trigger);

    // Wait for hover card to open
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Verify content is visible
    const body = within(document.body);
    await expect(body.getByText('User Preview')).toBeInTheDocument();
  },
};
