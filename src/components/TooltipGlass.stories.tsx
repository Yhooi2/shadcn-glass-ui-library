import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TooltipGlass } from "./TooltipGlass";
import { ButtonGlass } from "./ButtonGlass";
import { Info, HelpCircle, Settings } from "lucide-react";

const meta = {
  title: "Components/TooltipGlass",
  component: TooltipGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Tooltip position",
    },
    content: {
      control: "text",
      description: "Tooltip content",
    },
  },
} satisfies Meta<typeof TooltipGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <ButtonGlass>Hover me</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Top: Story = {
  args: {
    position: "top",
    content: "Tooltip on top",
    children: <ButtonGlass>Top</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Bottom: Story = {
  args: {
    position: "bottom",
    content: "Tooltip on bottom",
    children: <ButtonGlass>Bottom</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Left: Story = {
  args: {
    position: "left",
    content: "Tooltip on left",
    children: <ButtonGlass>Left</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Right: Story = {
  args: {
    position: "right",
    content: "Tooltip on right",
    children: <ButtonGlass>Right</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithIcon: Story = {
  args: {
    content: "Click for more information",
    children: (
      <button className="p-2 rounded-lg" style={{ color: "var(--text-secondary)" }}>
        <Info className="w-5 h-5" />
      </button>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllPositions: Story = {
  args: {
    content: "Tooltip",
    children: <ButtonGlass>Hover</ButtonGlass>,
  },
  render: () => (
    <div className="flex gap-8 p-8">
      <TooltipGlass position="top" content="Top tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
      <TooltipGlass position="bottom" content="Bottom tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
      <TooltipGlass position="left" content="Left tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
      <TooltipGlass position="right" content="Right tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithDifferentTriggers: Story = {
  args: {
    content: "Tooltip",
    children: <ButtonGlass>Hover</ButtonGlass>,
  },
  render: () => (
    <div className="flex gap-4">
      <TooltipGlass content="Primary action">
        <ButtonGlass variant="primary">Primary</ButtonGlass>
      </TooltipGlass>
      <TooltipGlass content="Secondary action">
        <ButtonGlass variant="ghost">Ghost</ButtonGlass>
      </TooltipGlass>
      <TooltipGlass content="Settings">
        <ButtonGlass variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
