import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { useState } from 'react';
import { ToggleGlass } from './toggle-glass';

const meta = {
  title: 'Components/Core/ToggleGlass',
  component: ToggleGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Toggle size (shadcn/ui compatible)',
      table: {
        type: { summary: "'default' | 'sm' | 'lg'" },
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Toggle variant (shadcn/ui compatible)',
      table: {
        type: { summary: "'default' | 'outline'" },
        defaultValue: { summary: 'default' },
      },
    },
    pressed: {
      control: 'boolean',
      description: 'Toggle pressed state (shadcn/ui compatible)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultPressed: {
      control: 'boolean',
      description: 'Default pressed state for uncontrolled usage',
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
    onPressedChange: fn(),
  },
} satisfies Meta<typeof ToggleGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultDemo = () => {
  const [pressed, setPressed] = useState(false);
  return <ToggleGlass pressed={pressed} onPressedChange={setPressed} />;
};

export const Default: Story = {
  render: () => <DefaultDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Pressed: Story = {
  args: {
    pressed: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithLabel: Story = {
  args: {
    pressed: false,
    label: 'Enable notifications',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    pressed: true,
    label: 'Small toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DefaultSize: Story = {
  args: {
    size: 'default',
    pressed: true,
    label: 'Default size toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    pressed: true,
    label: 'Large toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    pressed: false,
    label: 'Outline variant',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const OutlinePressed: Story = {
  args: {
    variant: 'outline',
    pressed: true,
    label: 'Outline pressed',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    pressed: false,
    disabled: true,
    label: 'Disabled toggle',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const DisabledPressed: Story = {
  args: {
    pressed: true,
    disabled: true,
    label: 'Disabled pressed',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const AllSizesDemo = () => {
  const [sm, setSm] = useState(true);
  const [def, setDef] = useState(true);
  const [lg, setLg] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass size="sm" pressed={sm} onPressedChange={setSm} label="Small" />
      <ToggleGlass size="default" pressed={def} onPressedChange={setDef} label="Default" />
      <ToggleGlass size="lg" pressed={lg} onPressedChange={setLg} label="Large" />
    </div>
  );
};

export const AllSizes: Story = {
  args: {
    pressed: true,
  },
  render: () => <AllSizesDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const AllVariantsDemo = () => {
  const [def, setDef] = useState(true);
  const [outline, setOutline] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass
        variant="default"
        pressed={def}
        onPressedChange={setDef}
        label="Default variant"
      />
      <ToggleGlass
        variant="outline"
        pressed={outline}
        onPressedChange={setOutline}
        label="Outline variant"
      />
    </div>
  );
};

export const AllVariants: Story = {
  render: () => <AllVariantsDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const AllStatesDemo = () => {
  const [unpressed, setUnpressed] = useState(false);
  const [pressed, setPressed] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass pressed={unpressed} onPressedChange={setUnpressed} label="Unpressed" />
      <ToggleGlass pressed={pressed} onPressedChange={setPressed} label="Pressed" />
      <ToggleGlass pressed={false} disabled label="Disabled unpressed" />
      <ToggleGlass pressed={true} disabled label="Disabled pressed" />
    </div>
  );
};

export const AllStates: Story = {
  args: {
    pressed: false,
  },
  render: () => <AllStatesDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const InteractiveToggleDemo = () => {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass
        pressed={pressed}
        onPressedChange={setPressed}
        label={pressed ? 'Enabled' : 'Disabled'}
      />
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Status: {pressed ? 'ON' : 'OFF'}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  args: {
    pressed: false,
  },
  render: () => <InteractiveToggleDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

const UncontrolledDemo = () => {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGlass defaultPressed={false} label="Uncontrolled (default off)" />
      <ToggleGlass defaultPressed={true} label="Uncontrolled (default on)" />
    </div>
  );
};

export const Uncontrolled: Story = {
  render: () => <UncontrolledDemo />,
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
