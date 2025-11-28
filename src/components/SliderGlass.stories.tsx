import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { useState } from "react";
import { SliderGlass } from "./SliderGlass";

const meta = {
  title: "Components/SliderGlass",
  component: SliderGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Slider value",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    showValue: {
      control: "boolean",
      description: "Show current value",
    },
  },
  args: {
    onChange: fn(),
    className: "w-80",
  },
} satisfies Meta<typeof SliderGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    value: 50,
    label: "Volume",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    label: "Brightness",
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CustomRange: Story = {
  args: {
    value: 25,
    min: 0,
    max: 50,
    label: "Custom Range (0-50)",
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithStep: Story = {
  args: {
    value: 20,
    min: 0,
    max: 100,
    step: 10,
    label: "Step: 10",
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    value: 60,
    disabled: true,
    label: "Disabled Slider",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MinValue: Story = {
  args: {
    value: 0,
    label: "Minimum (0)",
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MaxValue: Story = {
  args: {
    value: 100,
    label: "Maximum (100)",
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllStates: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <SliderGlass value={0} onChange={() => {}} label="Empty" showValue />
      <SliderGlass value={25} onChange={() => {}} label="Quarter" showValue />
      <SliderGlass value={50} onChange={() => {}} label="Half" showValue />
      <SliderGlass value={75} onChange={() => {}} label="Three quarters" showValue />
      <SliderGlass value={100} onChange={() => {}} label="Full" showValue />
      <SliderGlass value={50} onChange={() => {}} label="Disabled" showValue disabled />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const InteractiveSliderDemo = () => {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [contrast, setContrast] = useState(60);

  return (
    <div className="flex flex-col gap-6 w-80">
      <SliderGlass
        value={volume}
        onChange={setVolume}
        label="Volume"
        showValue
      />
      <SliderGlass
        value={brightness}
        onChange={setBrightness}
        label="Brightness"
        showValue
      />
      <SliderGlass
        value={contrast}
        onChange={setContrast}
        label="Contrast"
        showValue
      />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    value: 50,
  },
  render: () => <InteractiveSliderDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const PreciseSliderDemo = () => {
  const [value, setValue] = useState(5);

  return (
    <div className="w-80">
      <SliderGlass
        value={value}
        onChange={setValue}
        min={1}
        max={10}
        step={0.5}
        label="Rating (1-10, step 0.5)"
        showValue
      />
    </div>
  );
};

export const PreciseControl: Story = {
  args: {
    value: 5,
  },
  render: () => <PreciseSliderDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
