import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { AlertGlass } from "./glass/ui/alert-glass";

const meta = {
  title: "Components/AlertGlass",
  component: AlertGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info", "error"],
      description: "Alert variant (shadcn/ui compatible + Glass UI extended). Note: 'info' and 'error' are aliases.",
      table: {
        type: { summary: "'default' | 'destructive' | 'success' | 'warning' | 'info' | 'error'" },
        defaultValue: { summary: "default" },
      },
    },
    dismissible: {
      control: "boolean",
      description: "Show dismiss button",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: "text",
      description: "Alert title",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: "text",
      description: "Alert message",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  args: {
    className: "w-96",
  },
} satisfies Meta<typeof AlertGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Information",
    children: "This is an informational alert message.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error",
    children: "An error occurred. Please try again.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your action was completed successfully.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review your input before proceeding.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Dismissible: Story = {
  args: {
    variant: "default",
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
    variant: "default",
    children: "This alert has no title, just a message.",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  args: {
    children: "Alert message",
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <AlertGlass variant="default" title="Default">
        This is an informational message.
      </AlertGlass>
      <AlertGlass variant="destructive" title="Destructive">
        Something went wrong.
      </AlertGlass>
      <AlertGlass variant="success" title="Success">
        Operation completed successfully.
      </AlertGlass>
      <AlertGlass variant="warning" title="Warning">
        Please proceed with caution.
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
      <AlertGlass variant="default" title="Info" dismissible>
        Dismissible info alert.
      </AlertGlass>
      <AlertGlass variant="destructive" title="Error" dismissible>
        Dismissible error alert.
      </AlertGlass>
      <AlertGlass variant="success" title="Success" dismissible>
        Dismissible success alert.
      </AlertGlass>
      <AlertGlass variant="warning" title="Warning" dismissible>
        Dismissible warning alert.
      </AlertGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
