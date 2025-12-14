import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { useState } from 'react';
import { SliderGlass } from './slider-glass';

const meta = {
  title: 'Components/Core/SliderGlass',
  component: SliderGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'object' },
      description: 'Controlled value (array for range support)',
      table: {
        type: { summary: 'number[]' },
      },
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'Default value for uncontrolled usage (array for range support)',
      table: {
        type: { summary: 'number[]' },
      },
    },
    min: {
      control: 'number',
      description: 'Minimum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    step: {
      control: 'number',
      description: 'Step increment',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text',
      table: {
        type: { summary: 'string' },
      },
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Slider orientation',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
      },
    },
  },
  args: {
    onValueChange: fn(),
    className: 'w-80',
  },
} satisfies Meta<typeof SliderGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// BASIC EXAMPLES
// ========================================

const DefaultDemo = () => {
  const [value, setValue] = useState([50]);
  return <SliderGlass value={value} onValueChange={setValue} className="w-80" />;
};

export const Default: Story = {
  args: {
    defaultValue: [50],
  },
  render: () => <DefaultDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: [50],
    label: 'Uncontrolled Slider',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    defaultValue: [50],
    label: 'Volume',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: [75],
    label: 'Brightness',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// RANGE SLIDER (NEW!)
// ========================================

const RangeDemo = () => {
  const [value, setValue] = useState([25, 75]);
  return (
    <SliderGlass
      value={value}
      onValueChange={setValue}
      label="Price Range"
      showValue
      className="w-80"
    />
  );
};

export const RangeSlider: Story = {
  args: {
    defaultValue: [25, 75],
  },
  render: () => <RangeDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const MultipleThumbsDemo = () => {
  const [value, setValue] = useState([20, 50, 80]);
  return (
    <SliderGlass
      value={value}
      onValueChange={setValue}
      label="Multi-thumb"
      showValue
      className="w-80"
    />
  );
};

export const MultipleThumbs: Story = {
  args: {
    defaultValue: [20, 50, 80],
  },
  render: () => <MultipleThumbsDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// CONFIGURATION OPTIONS
// ========================================

export const CustomRange: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 50,
    label: 'Custom Range (0-50)',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithStep: Story = {
  args: {
    defaultValue: [20],
    min: 0,
    max: 100,
    step: 10,
    label: 'Step: 10',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [60],
    disabled: true,
    label: 'Disabled Slider',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MinValue: Story = {
  args: {
    defaultValue: [0],
    label: 'Minimum (0)',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MaxValue: Story = {
  args: {
    defaultValue: [100],
    label: 'Maximum (100)',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// ALL STATES SHOWCASE
// ========================================

const AllStatesDemo = () => {
  const [empty, setEmpty] = useState([0]);
  const [quarter, setQuarter] = useState([25]);
  const [half, setHalf] = useState([50]);
  const [threeQuarters, setThreeQuarters] = useState([75]);
  const [full, setFull] = useState([100]);
  const [range, setRange] = useState([25, 75]);

  return (
    <div className="flex flex-col gap-6 w-80">
      <SliderGlass value={empty} onValueChange={setEmpty} label="Empty" showValue />
      <SliderGlass value={quarter} onValueChange={setQuarter} label="Quarter" showValue />
      <SliderGlass value={half} onValueChange={setHalf} label="Half" showValue />
      <SliderGlass
        value={threeQuarters}
        onValueChange={setThreeQuarters}
        label="Three quarters"
        showValue
      />
      <SliderGlass value={full} onValueChange={setFull} label="Full" showValue />
      <SliderGlass value={range} onValueChange={setRange} label="Range" showValue />
      <SliderGlass defaultValue={[50]} label="Disabled" showValue disabled />
    </div>
  );
};

export const AllStates: Story = {
  args: {
    defaultValue: [50],
  },
  render: () => <AllStatesDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// INTERACTIVE DEMOS
// ========================================

const InteractiveSliderDemo = () => {
  const [volume, setVolume] = useState([50]);
  const [brightness, setBrightness] = useState([75]);
  const [contrast, setContrast] = useState([60]);

  return (
    <div className="flex flex-col gap-6 w-80">
      <SliderGlass value={volume} onValueChange={setVolume} label="Volume" showValue />
      <SliderGlass value={brightness} onValueChange={setBrightness} label="Brightness" showValue />
      <SliderGlass value={contrast} onValueChange={setContrast} label="Contrast" showValue />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    defaultValue: [50],
  },
  render: () => <InteractiveSliderDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const PreciseSliderDemo = () => {
  const [value, setValue] = useState([5]);

  return (
    <div className="w-80">
      <SliderGlass
        value={value}
        onValueChange={setValue}
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
    defaultValue: [5],
  },
  render: () => <PreciseSliderDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// PRICE RANGE USE CASE
// ========================================

const PriceRangeDemo = () => {
  const [priceRange, setPriceRange] = useState([100, 500]);

  return (
    <div className="w-80 space-y-4">
      <SliderGlass
        value={priceRange}
        onValueChange={setPriceRange}
        min={0}
        max={1000}
        step={50}
        label="Price Range ($)"
        showValue
      />
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Selected: ${priceRange[0]} - ${priceRange[1]}
      </div>
    </div>
  );
};

export const PriceRange: Story = {
  args: {
    defaultValue: [100, 500],
  },
  render: () => <PriceRangeDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
