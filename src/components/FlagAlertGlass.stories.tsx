import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { FlagAlertGlass } from "./glass/specialized/flag-alert-glass";

const meta = {
  title: "Glass/Composite/FlagAlertGlass",
  component: FlagAlertGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["warning", "danger"],
      description: "Alert type (warning or danger)",
    },
    title: {
      control: "text",
      description: "Alert title",
    },
    description: {
      control: "text",
      description: "Optional alert description",
    },
  },
} satisfies Meta<typeof FlagAlertGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    type: "warning",
    title: "High activity detected",
    description: "Unusual number of contributions in the last 24 hours",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
    title: "Security issue detected",
    description: "Multiple failed login attempts from unknown IP address",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WarningWithoutDescription: Story = {
  args: {
    type: "warning",
    title: "API rate limit approaching",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DangerWithoutDescription: Story = {
  args: {
    type: "danger",
    title: "Account suspension notice",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LongDescription: Story = {
  args: {
    type: "warning",
    title: "Repository size warning",
    description:
      "Your repository size has exceeded 500MB. Consider using Git LFS for large files or cleaning up old branches to reduce repository size and improve performance.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllTypes: Story = {
  args: {
    title: "Example",
  },
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <FlagAlertGlass
        type="warning"
        title="High activity detected"
        description="Unusual number of contributions in the last 24 hours"
      />
      <FlagAlertGlass
        type="danger"
        title="Security issue detected"
        description="Multiple failed login attempts from unknown IP address"
      />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
