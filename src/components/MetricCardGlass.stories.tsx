import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MetricCardGlass } from "./MetricCardGlass";

const meta = {
  title: "Glass/Composite/MetricCardGlass",
  component: MetricCardGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Metric label",
    },
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Metric value (0-100)",
    },
    color: {
      control: "select",
      options: ["emerald", "amber", "blue", "red"],
      description: "Color theme",
    },
  },
} satisfies Meta<typeof MetricCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Emerald: Story = {
  args: {
    label: "Regularity",
    value: 84,
    color: "emerald",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Amber: Story = {
  args: {
    label: "Impact",
    value: 45,
    color: "amber",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Blue: Story = {
  args: {
    label: "Diversity",
    value: 78,
    color: "blue",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Red: Story = {
  args: {
    label: "Collaboration",
    value: 12,
    color: "red",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllColors: Story = {
  args: {
    label: "Example",
    value: 50,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-80">
      <MetricCardGlass label="Regularity" value={84} color="emerald" />
      <MetricCardGlass label="Impact" value={45} color="amber" />
      <MetricCardGlass label="Diversity" value={78} color="blue" />
      <MetricCardGlass label="Collaboration" value={12} color="red" />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
