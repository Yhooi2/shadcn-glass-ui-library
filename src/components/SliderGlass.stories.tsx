import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { useState } from 'react';
import { SliderGlass } from './glass/ui/slider-glass';

const meta = {
  title: 'Glass UI/Form/SliderGlass',
  component: SliderGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Slider value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
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
  },
  args: {
    onChange: fn(),
    className: 'w-80',
  },
} satisfies Meta<typeof SliderGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultDemo = () => {
  const [value, setValue] = useState(50);
  return <SliderGlass value={value} onChange={setValue} className="w-80" />;
};

export const Default: Story = {
  args: {
    value: 50,
  },
  render: () => <DefaultDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    value: 50,
    label: 'Volume',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    label: 'Brightness',
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
    label: 'Custom Range (0-50)',
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
    label: 'Step: 10',
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
    label: 'Disabled Slider',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MinValue: Story = {
  args: {
    value: 0,
    label: 'Minimum (0)',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MaxValue: Story = {
  args: {
    value: 100,
    label: 'Maximum (100)',
    showValue: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const AllStatesDemo = () => {
  const [empty, setEmpty] = useState(0);
  const [quarter, setQuarter] = useState(25);
  const [half, setHalf] = useState(50);
  const [threeQuarters, setThreeQuarters] = useState(75);
  const [full, setFull] = useState(100);

  return (
    <div className="flex flex-col gap-6 w-80">
      <SliderGlass value={empty} onChange={setEmpty} label="Empty" showValue />
      <SliderGlass value={quarter} onChange={setQuarter} label="Quarter" showValue />
      <SliderGlass value={half} onChange={setHalf} label="Half" showValue />
      <SliderGlass
        value={threeQuarters}
        onChange={setThreeQuarters}
        label="Three quarters"
        showValue
      />
      <SliderGlass value={full} onChange={setFull} label="Full" showValue />
      <SliderGlass value={50} onChange={() => {}} label="Disabled" showValue disabled />
    </div>
  );
};

export const AllStates: Story = {
  args: {
    value: 50,
  },
  render: () => <AllStatesDemo />,
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
      <SliderGlass value={volume} onChange={setVolume} label="Volume" showValue />
      <SliderGlass value={brightness} onChange={setBrightness} label="Brightness" showValue />
      <SliderGlass value={contrast} onChange={setContrast} label="Contrast" showValue />
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
