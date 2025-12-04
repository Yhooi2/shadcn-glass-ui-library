import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { User, Mail, Phone, MapPin, Globe, Calendar } from "lucide-react";
import { SelectGlass, type SelectOption } from "./select-glass";

const meta = {
  title: "Components/SelectGlass",
  component: SelectGlass,
  parameters: {
    layout: "centered",
    snapshot: { disable: false },
    tags: ["autodocs"],
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the select",
    },
    searchable: {
      control: "boolean",
      description: "Enable search/filter functionality",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[400px] w-[320px] flex items-start justify-center pt-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options
const simpleOptions: SelectOption[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const iconOptions: SelectOption[] = [
  { value: "user", label: "User Profile", icon: User },
  { value: "mail", label: "Email Address", icon: Mail },
  { value: "phone", label: "Phone Number", icon: Phone },
  { value: "location", label: "Location", icon: MapPin },
  { value: "web", label: "Website", icon: Globe },
];

const longOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}));

export const Default: Story = {
  args: {
    options: simpleOptions,
    placeholder: "Select an option",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    options: simpleOptions,
    label: "Choose an option",
    placeholder: "Select...",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: {
    options: simpleOptions,
    value: "2",
    label: "Pre-selected",
    placeholder: "Select...",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    options: simpleOptions,
    label: "Required field",
    error: "Please select an option",
    placeholder: "Select...",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithSuccess: Story = {
  args: {
    options: simpleOptions,
    label: "Validated field",
    success: "Selection confirmed",
    value: "1",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithIcons: Story = {
  args: {
    options: iconOptions,
    label: "Select with icons",
    placeholder: "Choose an option",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Searchable: Story = {
  args: {
    options: longOptions,
    label: "Searchable select",
    placeholder: "Search options...",
    searchable: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    options: simpleOptions,
    label: "Disabled select",
    disabled: true,
    value: "1",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DisabledOptions: Story = {
  args: {
    options: [
      { value: "1", label: "Available Option" },
      { value: "2", label: "Disabled Option", disabled: true },
      { value: "3", label: "Another Available" },
    ],
    label: "Some options disabled",
    placeholder: "Select...",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <SelectGlass
        options={simpleOptions}
        label="Small"
        size="sm"
        placeholder="Small select"
      />
      <SelectGlass
        options={simpleOptions}
        label="Medium (Default)"
        size="md"
        placeholder="Medium select"
      />
      <SelectGlass
        options={simpleOptions}
        label="Large"
        size="lg"
        placeholder="Large select"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="min-h-[500px] w-[320px] pt-4">
        <Story />
      </div>
    ),
  ],
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = React.useState("");

    return (
      <div className="space-y-4 w-full">
        <SelectGlass
          options={iconOptions}
          value={value}
          onChange={setValue}
          label="Controlled Select"
          placeholder="Choose an option"
        />
        <p className="text-sm text-white/50">
          Selected: {value || "none"}
        </p>
      </div>
    );
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
