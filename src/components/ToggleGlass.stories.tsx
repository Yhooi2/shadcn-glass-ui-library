import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { useState } from 'react';
import { ToggleGlass } from './glass/ui/toggle-glass';

const meta = {
  title: 'Components/ToggleGlass',
  component: ToggleGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Toggle size',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Toggle state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof ToggleGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultDemo = () => {
  const [checked, setChecked] = useState(false);
  return <ToggleGlass checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: () => <DefaultDemo />,
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
    label: 'Enable notifications',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    checked: true,
    label: 'Small toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    checked: true,
    label: 'Medium toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    checked: true,
    label: 'Large toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled checked',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const AllSizesDemo = () => {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass size="sm" checked={sm} onChange={setSm} label="Small" />
      <ToggleGlass size="md" checked={md} onChange={setMd} label="Medium" />
      <ToggleGlass size="lg" checked={lg} onChange={setLg} label="Large" />
    </div>
  );
};

export const AllSizes: Story = {
  args: {
    checked: true,
  },
  render: () => <AllSizesDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const AllStatesDemo = () => {
  const [unchecked, setUnchecked] = useState(false);
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass checked={unchecked} onChange={setUnchecked} label="Unchecked" />
      <ToggleGlass checked={checked} onChange={setChecked} label="Checked" />
      <ToggleGlass checked={false} disabled label="Disabled unchecked" />
      <ToggleGlass checked={true} disabled label="Disabled checked" />
    </div>
  );
};

export const AllStates: Story = {
  args: {
    checked: false,
  },
  render: () => <AllStatesDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const InteractiveToggleDemo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass
        checked={checked}
        onChange={setChecked}
        label={checked ? 'Enabled' : 'Disabled'}
      />
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Status: {checked ? 'ON' : 'OFF'}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  args: {
    checked: false,
  },
  render: () => <InteractiveToggleDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
