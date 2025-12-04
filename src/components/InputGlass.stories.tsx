import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { InputGlass } from "./glass/ui/input-glass";
import { Search, Mail, Lock, User, Eye } from "lucide-react";

const meta = {
  title: "Components/InputGlass",
  component: InputGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Input label",
      table: {
        type: { summary: "string" },
      },
    },
    error: {
      control: "text",
      description: "Error message",
      table: {
        type: { summary: "string" },
      },
    },
    success: {
      control: "text",
      description: "Success message",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
  },
  args: {
    onChange: fn(),
    className: "w-80",
  },
} satisfies Meta<typeof InputGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Text Input",
    placeholder: "Enter text...",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    icon: Search,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    value: "invalid-email",
    error: "Please enter a valid email address",
    icon: Mail,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    value: "johndoe",
    success: "Username is available",
    icon: User,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    icon: Lock,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllStates: Story = {
  args: {
    placeholder: "Enter text...",
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <InputGlass
        label="Normal"
        placeholder="Enter text..."
        icon={User}
      />
      <InputGlass
        label="With Value"
        value="Some value"
        icon={Mail}
      />
      <InputGlass
        label="Error State"
        value="Invalid input"
        error="This field has an error"
        icon={Lock}
      />
      <InputGlass
        label="Success State"
        value="Valid input"
        success="Looking good!"
        icon={Eye}
      />
      <InputGlass
        label="Disabled"
        placeholder="Disabled input"
        disabled
      />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
