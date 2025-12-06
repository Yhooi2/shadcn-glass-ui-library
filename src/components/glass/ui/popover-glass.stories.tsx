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
        <h3 className="font-semibold text-white mb-2">Popover Title</h3>
        <p className="text-sm text-white/70">
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
        <h3 className="font-semibold text-white mb-2">Quick Settings</h3>
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
          <p className="text-sm text-white">Top position</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Right</ButtonGlass>}
        side="right"
      >
        <div className="p-2">
          <p className="text-sm text-white">Right position</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Bottom</ButtonGlass>}
        side="bottom"
      >
        <div className="p-2">
          <p className="text-sm text-white">Bottom position</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Left</ButtonGlass>}
        side="left"
      >
        <div className="p-2">
          <p className="text-sm text-white">Left position</p>
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
          <p className="text-sm text-white">Aligned to start</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Align Center</ButtonGlass>}
        side="bottom"
        align="center"
      >
        <div className="w-48 p-2">
          <p className="text-sm text-white">Aligned to center</p>
        </div>
      </PopoverGlass>

      <PopoverGlass
        trigger={<ButtonGlass variant="ghost">Align End</ButtonGlass>}
        side="bottom"
        align="end"
      >
        <div className="w-48 p-2">
          <p className="text-sm text-white">Aligned to end</p>
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
            <h3 className="font-semibold text-white mb-2">Controlled State</h3>
            <p className="text-sm text-white/70 mb-4">
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

        <p className="text-sm text-white/50">
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
        <h3 className="font-semibold text-white mb-2">No Arrow</h3>
        <p className="text-sm text-white/70">
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
        <h3 className="font-semibold text-white mb-2">Glass Popover</h3>
        <p className="text-sm text-white/70">
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
        <h3 className="font-semibold text-white mb-2">Need Help?</h3>
        <InputGlass
          label="Subject"
          placeholder="What do you need help with?"
          size="sm"
        />
        <div className="space-y-2">
          <label className="text-sm text-white/70">Message</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg text-sm text-white bg-white/5 border border-white/10 focus:border-purple-400 focus:outline-none resize-none"
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
          <Info className="w-4 h-4 text-purple-400" />
          <h3 className="font-semibold text-white">Info</h3>
        </div>
        <p className="text-sm text-white/70">
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
