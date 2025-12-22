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
        component:
          'Hover-triggered floating glass-themed container for rich content previews. Unlike PopoverGlass (click-triggered), HoverCardGlass opens on hover.',
      },
    },
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The preferred side of the trigger to render against',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The preferred alignment against the trigger',
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger',
    },
    openDelay: {
      control: 'number',
      description: 'Delay in milliseconds before the hover card opens',
    },
    closeDelay: {
      control: 'number',
      description: 'Delay in milliseconds before the hover card closes',
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow pointer',
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
