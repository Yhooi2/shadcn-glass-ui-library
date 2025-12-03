import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { BadgeGlass } from "./glass/ui/badge-glass";

const meta = {
  title: "Components/BadgeGlass",
  component: BadgeGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "info"],
      description: "Badge color variant (shadcn/ui compatible + Glass UI extended)",
      table: {
        type: { summary: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'" },
        defaultValue: { summary: "default" },
      },
    },
    dot: {
      control: "boolean",
      description: "Show animated dot indicator",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Badge size",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },
    children: {
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof BadgeGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithDot: Story = {
  args: {
    variant: "info",
    dot: true,
    children: "Active",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  args: {
    children: "Badge",
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <BadgeGlass variant="default">Default</BadgeGlass>
      <BadgeGlass variant="secondary">Secondary</BadgeGlass>
      <BadgeGlass variant="destructive">Destructive</BadgeGlass>
      <BadgeGlass variant="outline">Outline</BadgeGlass>
      <BadgeGlass variant="success">Success</BadgeGlass>
      <BadgeGlass variant="warning">Warning</BadgeGlass>
      <BadgeGlass variant="info">Info</BadgeGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllWithDot: Story = {
  args: {
    children: "Badge",
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <BadgeGlass variant="default" dot>Default</BadgeGlass>
      <BadgeGlass variant="secondary" dot>Secondary</BadgeGlass>
      <BadgeGlass variant="destructive" dot>Destructive</BadgeGlass>
      <BadgeGlass variant="outline" dot>Outline</BadgeGlass>
      <BadgeGlass variant="success" dot>Success</BadgeGlass>
      <BadgeGlass variant="warning" dot>Warning</BadgeGlass>
      <BadgeGlass variant="info" dot>Info</BadgeGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllSizes: Story = {
  args: {
    children: "Badge",
  },
  render: () => (
    <div className="flex items-center gap-3">
      <BadgeGlass size="sm" variant="info">Small</BadgeGlass>
      <BadgeGlass size="md" variant="info">Medium</BadgeGlass>
      <BadgeGlass size="lg" variant="info">Large</BadgeGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
