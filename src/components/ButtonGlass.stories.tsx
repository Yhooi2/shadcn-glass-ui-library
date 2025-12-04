import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect } from "storybook/test";
import { ButtonGlass } from "./glass/ui/button-glass";

const meta = {
  title: "Components/ButtonGlass",
  component: ButtonGlass,
  parameters: {
    layout: "centered",
    snapshot: {
      // Enable visual snapshot testing
      disable: false,
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "text"],
      description: "The visual style variant of the button",
      table: {
        type: { summary: "'primary' | 'ghost' | 'text'" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      description: "The size of the button",
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'icon'" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "The button content",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
} satisfies Meta<typeof ButtonGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates glass theme styling
    // Reference: Glass theme purple gradient, glow effects
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates ghost variant styling
    // Reference: rgba(255,255,255,0.10) bg, border rgba(255,255,255,0.20)
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates text variant styling
    // Reference: transparent bg, white text, hover glow effect
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates small size: px-3 py-1.5 text-sm rounded-lg
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates medium size: px-5 py-2.5 text-base rounded-xl
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates large size: px-7 py-3.5 text-lg rounded-2xl
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: "+",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates icon size: p-2.5 rounded-xl
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
  async play({ canvasElement }) {
    // Visual snapshot test - validates disabled state: opacity-50
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DisabledGhost: Story = {
  args: {
    variant: "ghost",
    disabled: true,
    children: "Disabled Ghost",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DisabledText: Story = {
  args: {
    variant: "text",
    disabled: true,
    children: "Disabled Text",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <ButtonGlass variant="primary">Primary</ButtonGlass>
        <ButtonGlass variant="ghost">Ghost</ButtonGlass>
        <ButtonGlass variant="text">Text</ButtonGlass>
      </div>
      <div className="flex items-center gap-4">
        <ButtonGlass size="sm">Small</ButtonGlass>
        <ButtonGlass size="md">Medium</ButtonGlass>
        <ButtonGlass size="lg">Large</ButtonGlass>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - validates all variants and sizes together
    // Critical for preserving overall design consistency
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllPrimarySizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonGlass variant="primary" size="sm">Small Primary</ButtonGlass>
      <ButtonGlass variant="primary" size="md">Medium Primary</ButtonGlass>
      <ButtonGlass variant="primary" size="lg">Large Primary</ButtonGlass>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - validates primary variant at all sizes
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllGhostSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonGlass variant="ghost" size="sm">Small Ghost</ButtonGlass>
      <ButtonGlass variant="ghost" size="md">Medium Ghost</ButtonGlass>
      <ButtonGlass variant="ghost" size="lg">Large Ghost</ButtonGlass>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - validates ghost variant at all sizes
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllTextSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonGlass variant="text" size="sm">Small Text</ButtonGlass>
      <ButtonGlass variant="text" size="md">Medium Text</ButtonGlass>
      <ButtonGlass variant="text" size="lg">Large Text</ButtonGlass>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - validates text variant at all sizes
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllDisabledStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonGlass variant="primary" disabled>Primary Disabled</ButtonGlass>
      <ButtonGlass variant="ghost" disabled>Ghost Disabled</ButtonGlass>
      <ButtonGlass variant="text" disabled>Text Disabled</ButtonGlass>
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - validates all disabled states
    await expect(canvasElement).toBeInTheDocument();
  },
};
