import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { AlertGlass } from "./AlertGlass";

const meta = {
  title: "Components/AlertGlass",
  component: AlertGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "warning", "error"],
      description: "Alert type",
    },
    dismissible: {
      control: "boolean",
      description: "Show dismiss button",
    },
    title: {
      control: "text",
      description: "Alert title",
    },
    children: {
      control: "text",
      description: "Alert message",
    },
  },
  args: {
    className: "w-96",
  },
} satisfies Meta<typeof AlertGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: "info",
    title: "Information",
    children: "This is an informational alert message.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Success: Story = {
  args: {
    type: "success",
    title: "Success",
    children: "Your action was completed successfully.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning",
    children: "Please review your input before proceeding.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    type: "error",
    title: "Error",
    children: "An error occurred. Please try again.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Dismissible: Story = {
  args: {
    type: "info",
    title: "Dismissible Alert",
    children: "Click the X button to dismiss this alert.",
    dismissible: true,
    onDismiss: fn(),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutTitle: Story = {
  args: {
    type: "info",
    children: "This alert has no title, just a message.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllTypes: Story = {
  args: {
    children: "Alert message",
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <AlertGlass type="info" title="Information">
        This is an informational message.
      </AlertGlass>
      <AlertGlass type="success" title="Success">
        Operation completed successfully.
      </AlertGlass>
      <AlertGlass type="warning" title="Warning">
        Please proceed with caution.
      </AlertGlass>
      <AlertGlass type="error" title="Error">
        Something went wrong.
      </AlertGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllDismissible: Story = {
  args: {
    children: "Alert message",
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <AlertGlass type="info" title="Info" dismissible>
        Dismissible info alert.
      </AlertGlass>
      <AlertGlass type="success" title="Success" dismissible>
        Dismissible success alert.
      </AlertGlass>
      <AlertGlass type="warning" title="Warning" dismissible>
        Dismissible warning alert.
      </AlertGlass>
      <AlertGlass type="error" title="Error" dismissible>
        Dismissible error alert.
      </AlertGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
