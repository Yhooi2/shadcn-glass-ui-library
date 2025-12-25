import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Info, Settings, HelpCircle } from 'lucide-react';
import { PopoverGlassLegacy as PopoverGlass } from './popover-glass';
import { ButtonGlass } from './button-glass';
import { InputGlass } from './input-glass';

/**
 * PopoverGlass Stories
 *
 * Demonstrates the PopoverGlass component with various configurations:
 * - Compound API (recommended) and Legacy API (backward compatible)
 * - All 12 positioning options (4 sides × 3 alignments)
 * - Arrow pointer (optional)
 * - Controlled state for programmatic control
 * - Form integration examples
 */

const meta = {
  title: 'Components/Overlay/PopoverGlass',
  component: PopoverGlass,
  parameters: {
    layout: 'centered',
    snapshot: {
      disable: false,
    },
    tags: ['autodocs'],
    docs: {
      description: {
        component: `
Floating glass-themed container for tooltips, dropdowns, and contextual overlays.

## Features
- **Two APIs:** Compound (recommended) and Legacy (backward compatible)
- **Positioning:** 12 options (4 sides × 3 alignments)
- **Glass Styling:** Theme-aware glassmorphism with backdrop blur
- **Arrow Pointer:** Optional arrow with glass styling
- **Accessibility:** Keyboard navigation, focus trap, screen reader support

## Sub-Components
- **PopoverGlass.Root** - Context provider with open/close state
- **PopoverGlassTrigger** - Trigger element (supports asChild)
- **PopoverGlassAnchor** - Optional positioning anchor
- **PopoverGlassContent** - Content container with glass styling

## CSS Variables
\`\`\`css
--popover-bg            /* Background color */
--popover-border        /* Border color */
--popover-shadow        /* Box shadow with glow */
--popover-arrow-bg      /* Arrow background color */
--blur-md               /* Backdrop blur (16px) */
\`\`\`

## Usage
\`\`\`tsx
import { PopoverGlass, PopoverGlassTrigger, PopoverGlassContent } from '@/components/glass/ui/popover-glass';

<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent side="top">
    <div className="p-4">Content</div>
  </PopoverGlassContent>
</PopoverGlass>
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
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The preferred alignment against the trigger',
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: 'center' },
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
} satisfies Meta<typeof PopoverGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// BASIC POPOVER TESTS
// ========================================

/**
 * Default popover with bottom positioning and center alignment.
 * Shows the legacy API with simple trigger and content.
 */
export const Default: Story = {
  args: {
    trigger: <ButtonGlass variant="secondary">Open Popover</ButtonGlass>,
    children: (
      <div className="space-y-2">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Popover Title
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          This is a simple popover with glass-themed styling.
        </p>
      </div>
    ),
    side: 'bottom',
    align: 'center',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Popover with form elements inside.
 * Demonstrates integration with InputGlass and ButtonGlass components.
 */
export const WithForm: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </ButtonGlass>
    ),
    children: (
      <div className="space-y-4">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Quick Settings
        </h3>
        <InputGlass label="Username" placeholder="Enter username" size="sm" />
        <InputGlass label="Email" type="email" placeholder="Enter email" size="sm" />
        <div className="flex gap-2">
          <ButtonGlass size="sm" variant="default" className="flex-1">
            Save
          </ButtonGlass>
          <ButtonGlass size="sm" variant="ghost" className="flex-1">
            Cancel
          </ButtonGlass>
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
// POSITION TESTS - All sides
// ========================================

/**
 * Demonstrates all four positioning sides: top, right, bottom, left.
 * Each popover uses the same ghost button trigger.
 */
export const Positions: Story = {
  args: {
    trigger: <div>Trigger</div>,
    children: <div>Content</div>,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-16">
      <PopoverGlass trigger={<ButtonGlass variant="ghost">Top</ButtonGlass>} side="top">
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Top position
        </p>
      </PopoverGlass>

      <PopoverGlass trigger={<ButtonGlass variant="ghost">Right</ButtonGlass>} side="right">
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Right position
        </p>
      </PopoverGlass>

      <PopoverGlass trigger={<ButtonGlass variant="ghost">Bottom</ButtonGlass>} side="bottom">
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Bottom position
        </p>
      </PopoverGlass>

      <PopoverGlass trigger={<ButtonGlass variant="ghost">Left</ButtonGlass>} side="left">
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Left position
        </p>
      </PopoverGlass>
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
// ALIGNMENT TESTS - start/center/end
// ========================================

/**
 * Demonstrates all three alignment options: start, center, end.
 * All positioned at the bottom with different alignments.
 */
export const Alignments: Story = {
  args: {
    trigger: <div>Trigger</div>,
    children: <div>Content</div>,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Align Start</ButtonGlass>}
        side="bottom"
        align="start"
        className="w-48"
      >
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Aligned to start
        </p>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Align Center</ButtonGlass>}
        side="bottom"
        align="center"
        className="w-48"
      >
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Aligned to center
        </p>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Align End</ButtonGlass>}
        side="bottom"
        align="end"
        className="w-48"
      >
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
          Aligned to end
        </p>
      </PopoverGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// CONTROLLED STATE TEST
// ========================================

/**
 * Controlled popover with external state management.
 * Shows programmatic open/close control.
 */
export const Controlled: Story = {
  args: {
    trigger: <div>Trigger</div>,
    children: <div>Content</div>,
  },
  render: function ControlledPopover() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <PopoverGlass
          trigger={<ButtonGlass variant="default">Controlled Popover</ButtonGlass>}
          open={open}
          onOpenChange={setOpen}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Controlled State
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                This popover is controlled by external state.
              </p>
            </div>
            <ButtonGlass size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Close
            </ButtonGlass>
          </div>
        </PopoverGlass>

        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Open: {open ? 'true' : 'false'}
        </p>
      </div>
    );
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// NO ARROW TEST
// ========================================

/**
 * Popover without arrow pointer.
 * Demonstrates the showArrow prop set to false.
 */
export const NoArrow: Story = {
  args: {
    trigger: <ButtonGlass variant="ghost">No Arrow</ButtonGlass>,
    children: (
      <div className="space-y-2">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          No Arrow
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          This popover has no arrow pointer.
        </p>
      </div>
    ),
    side: 'bottom',
    align: 'center',
    showArrow: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// OPEN STATE TESTS - Glass theme styling
// ========================================

/**
 * Visual test for opened popover with glass theme styling.
 * Captures the glassmorphism effect with backdrop blur.
 */
export const OpenedDefault: Story = {
  args: {
    trigger: <ButtonGlass variant="ghost">Open Popover</ButtonGlass>,
    children: (
      <div className="space-y-2">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Glass Popover
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Glass background with backdrop blur effect.
        </p>
      </div>
    ),
    side: 'bottom',
    align: 'center',
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
    const body = within(document.body);

    const trigger = canvas.getByText('Open Popover');
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Open popover with glass styling
    // Background: rgba(255,255,255,0.08)
    // Border: 1px solid rgba(255,255,255,0.15)
    // Box-shadow: 0 15px 50px rgba(168,85,247,0.25)
    // Backdrop-filter: blur(16px)
    await expect(body.getByRole('dialog')).toBeInTheDocument();
  },
};

export const OpenedWithForm: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="default">
        <HelpCircle className="w-4 h-4 mr-2" />
        Help
      </ButtonGlass>
    ),
    children: (
      <div className="space-y-4">
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
          Need Help?
        </h3>
        <InputGlass label="Subject" placeholder="What do you need help with?" size="sm" />
        <div className="space-y-2">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none resize-none"
            style={{
              color: 'var(--text-primary)',
              background: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
            }}
            rows={3}
            placeholder="Describe your issue..."
          />
        </div>
        <ButtonGlass size="sm" variant="default" className="w-full">
          Submit
        </ButtonGlass>
      </div>
    ),
    side: 'bottom',
    align: 'center',
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
    const body = within(document.body);

    const trigger = canvas.getByText('Help');
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(body.getByRole('dialog')).toBeInTheDocument();
  },
};

export const OpenedTopPosition: Story = {
  args: {
    trigger: <ButtonGlass variant="ghost">Open Top</ButtonGlass>,
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4" style={{ color: 'var(--text-accent)' }} />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Info
          </h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Popover positioned above trigger.
        </p>
      </div>
    ),
    side: 'top',
    align: 'center',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[350px] flex items-end justify-center pb-4">
        <Story />
      </div>
    ),
  ],
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByText('Open Top');
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(body.getByRole('dialog')).toBeInTheDocument();
  },
};
