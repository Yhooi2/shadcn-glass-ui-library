import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { BadgeGlass } from "./BadgeGlass";

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
      options: ["default", "success", "warning", "danger", "info", "violet"],
      description: "Badge color variant",
    },
    dot: {
      control: "boolean",
      description: "Show animated dot indicator",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Badge size",
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

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger",
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

export const Violet: Story = {
  args: {
    variant: "violet",
    children: "Violet",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithDot: Story = {
  args: {
    variant: "violet",
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
      <BadgeGlass variant="success">Success</BadgeGlass>
      <BadgeGlass variant="warning">Warning</BadgeGlass>
      <BadgeGlass variant="danger">Danger</BadgeGlass>
      <BadgeGlass variant="info">Info</BadgeGlass>
      <BadgeGlass variant="violet">Violet</BadgeGlass>
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
      <BadgeGlass variant="success" dot>Success</BadgeGlass>
      <BadgeGlass variant="warning" dot>Warning</BadgeGlass>
      <BadgeGlass variant="danger" dot>Danger</BadgeGlass>
      <BadgeGlass variant="info" dot>Info</BadgeGlass>
      <BadgeGlass variant="violet" dot>Violet</BadgeGlass>
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
      <BadgeGlass size="sm" variant="violet">Small</BadgeGlass>
      <BadgeGlass size="md" variant="violet">Medium</BadgeGlass>
      <BadgeGlass size="lg" variant="violet">Large</BadgeGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
