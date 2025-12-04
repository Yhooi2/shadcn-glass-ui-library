import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { useState } from "react";
import { CheckboxGlass } from "./glass/ui/checkbox-glass";

const meta = {
  title: "Components/CheckboxGlass",
  component: CheckboxGlass,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Checkbox state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
    label: {
      control: "text",
      description: "Label text",
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof CheckboxGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    label: "Accept terms and conditions",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: "I agree to the privacy policy",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: "Disabled checkbox",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: "Disabled checked",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllStates: Story = {
  args: {
    checked: false,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <CheckboxGlass checked={false} label="Unchecked" />
      <CheckboxGlass checked={true} label="Checked" />
      <CheckboxGlass checked={false} disabled label="Disabled unchecked" />
      <CheckboxGlass checked={true} disabled label="Disabled checked" />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const InteractiveCheckboxDemo = () => {
  const [options, setOptions] = useState({
    notifications: true,
    marketing: false,
    updates: true,
  });

  const handleChange = (key: keyof typeof options) => (checked: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="flex flex-col gap-3">
      <CheckboxGlass
        checked={options.notifications}
        onChange={handleChange("notifications")}
        label="Email notifications"
      />
      <CheckboxGlass
        checked={options.marketing}
        onChange={handleChange("marketing")}
        label="Marketing emails"
      />
      <CheckboxGlass
        checked={options.updates}
        onChange={handleChange("updates")}
        label="Product updates"
      />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    checked: false,
  },
  render: () => <InteractiveCheckboxDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
