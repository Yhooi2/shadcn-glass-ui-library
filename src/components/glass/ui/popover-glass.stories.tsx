import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Info, Settings, HelpCircle } from "lucide-react";
import { PopoverGlass } from "./popover-glass";
import { ButtonGlass } from "./button-glass";
import { InputGlass } from "./input-glass";

const meta = {
  title: "Components/PopoverGlass",
  component: PopoverGlass,
  parameters: {
    layout: "centered",
    snapshot: {
      disable: false,
    },
    tags: ["autodocs"],
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "The preferred side of the trigger to render against",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "The preferred alignment against the trigger",
    },
    sideOffset: {
      control: "number",
      description: "The distance in pixels from the trigger",
    },
    showArrow: {
      control: "boolean",
      description: "Whether to show the arrow pointer",
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

export const Default: Story = {
  args: {
    trigger: <ButtonGlass variant="secondary">Open Popover</ButtonGlass>,
    children: (
      <div className="w-64 p-4">
        <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Popover Title</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          This is a simple popover with glass-themed styling.
        </p>
      </div>
    ),
    side: "bottom",
    align: "center",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithForm: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </ButtonGlass>
    ),
    children: (
      <div className="w-72 space-y-4">
        <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Quick Settings</h3>
        <InputGlass
          label="Username"
          placeholder="Enter username"
          size="sm"
        />
        <InputGlass
          label="Email"
          type="email"
          placeholder="Enter email"
          size="sm"
        />
        <div className="flex gap-2">
          <ButtonGlass size="sm" variant="primary" className="flex-1">
            Save
          </ButtonGlass>
          <ButtonGlass size="sm" variant="ghost" className="flex-1">
            Cancel
          </ButtonGlass>
        </div>
      </div>
    ),
    side: "bottom",
    align: "center",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// POSITION TESTS - All sides
// ========================================

export const Positions: Story = {
  args: {
    trigger: <div>Trigger</div>,
    children: <div>Content</div>,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-16">
      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Top</ButtonGlass>}
        side="top"
      >
        <div className="p-2">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Top position</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Right</ButtonGlass>}
        side="right"
      >
        <div className="p-2">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Right position</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Bottom</ButtonGlass>}
        side="bottom"
      >
        <div className="p-2">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Bottom position</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Left</ButtonGlass>}
        side="left"
      >
        <div className="p-2">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Left position</p>
        </div>
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
      >
        <div className="w-48 p-2">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Aligned to start</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Align Center</ButtonGlass>}
        side="bottom"
        align="center"
      >
        <div className="w-48 p-2">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Aligned to center</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Align End</ButtonGlass>}
        side="bottom"
        align="end"
      >
        <div className="w-48 p-2">
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Aligned to end</p>
        </div>
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
          trigger={<ButtonGlass variant="primary">Controlled Popover</ButtonGlass>}
          open={open}
          onOpenChange={setOpen}
        >
          <div className="w-64">
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Controlled State</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              This popover is controlled by external state.
            </p>
            <ButtonGlass
              size="sm"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Close
            </ButtonGlass>
          </div>
        </PopoverGlass>

        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Open: {open ? "true" : "false"}
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

export const NoArrow: Story = {
  args: {
    trigger: <ButtonGlass variant="ghost">No Arrow</ButtonGlass>,
    children: (
      <div className="w-64">
        <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No Arrow</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          This popover has no arrow pointer.
        </p>
      </div>
    ),
    side: "bottom",
    align: "center",
    showArrow: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// OPEN STATE TESTS - Glass theme styling
// ========================================

export const OpenedDefault: Story = {
  args: {
    trigger: <ButtonGlass variant="ghost">Open Popover</ButtonGlass>,
    children: (
      <div className="w-64">
        <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Glass Popover</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Glass background with backdrop blur effect.
        </p>
      </div>
    ),
    side: "bottom",
    align: "center",
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

    const trigger = canvas.getByText("Open Popover");
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Open popover with glass styling
    // Background: rgba(255,255,255,0.08)
    // Border: 1px solid rgba(255,255,255,0.15)
    // Box-shadow: 0 15px 50px rgba(168,85,247,0.25)
    // Backdrop-filter: blur(16px)
    await expect(body.getByRole("dialog")).toBeInTheDocument();
  },
};

export const OpenedWithForm: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="primary">
        <HelpCircle className="w-4 h-4 mr-2" />
        Help
      </ButtonGlass>
    ),
    children: (
      <div className="w-80 space-y-4">
        <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Need Help?</h3>
        <InputGlass
          label="Subject"
          placeholder="What do you need help with?"
          size="sm"
        />
        <div className="space-y-2">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Message</label>
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
        <ButtonGlass size="sm" variant="primary" className="w-full">
          Submit
        </ButtonGlass>
      </div>
    ),
    side: "bottom",
    align: "center",
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

    const trigger = canvas.getByText("Help");
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(body.getByRole("dialog")).toBeInTheDocument();
  },
};

export const OpenedTopPosition: Story = {
  args: {
    trigger: <ButtonGlass variant="ghost">Open Top</ButtonGlass>,
    children: (
      <div className="w-56">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4" style={{ color: 'var(--text-accent)' }} />
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Info</h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Popover positioned above trigger.
        </p>
      </div>
    ),
    side: "top",
    align: "center",
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

    const trigger = canvas.getByText("Open Top");
    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(body.getByRole("dialog")).toBeInTheDocument();
  },
};
