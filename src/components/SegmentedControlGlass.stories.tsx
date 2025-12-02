import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SegmentedControlGlass } from "./SegmentedControlGlass";

const meta = {
  title: "Glass/Composite/SegmentedControlGlass",
  component: SegmentedControlGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      description: "Array of segment options",
    },
    value: {
      description: "Currently selected value",
    },
    onChange: {
      description: "Callback when selection changes",
    },
  },
} satisfies Meta<typeof SegmentedControlGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoSegments: Story = {
  args: {
    options: [
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
    ],
    value: "left",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ThreeSegments: Story = {
  args: {
    options: [
      { value: "overview", label: "Overview" },
      { value: "repos", label: "Repositories" },
      { value: "activity", label: "Activity" },
    ],
    value: "overview",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const FourSegments: Story = {
  args: {
    options: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "pending", label: "Pending" },
      { value: "completed", label: "Completed" },
    ],
    value: "all",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  args: {
    options: [
      { value: "overview", label: "Overview" },
      { value: "repos", label: "Repositories" },
      { value: "activity", label: "Activity" },
    ],
    value: "overview",
  },
  render: function InteractiveSegmented() {
    const [value, setValue] = useState("overview");
    return (
      <div className="flex flex-col gap-4 items-center">
        <SegmentedControlGlass
          options={[
            { value: "overview", label: "Overview" },
            { value: "repos", label: "Repositories" },
            { value: "activity", label: "Activity" },
          ]}
          value={value}
          onChange={setValue}
        />
        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
          Selected: {value}
        </span>
      </div>
    );
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
