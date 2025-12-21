import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SwitchGlass, Switch } from './switch-glass';

const meta = {
  title: 'Components/Core/SwitchGlass',
  component: SwitchGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Glass-themed switch component with shadcn/ui compatible API.
Built on @radix-ui/react-switch for accessibility and keyboard navigation.

## Features
- \`checked\` / \`defaultChecked\` - Control checked state
- \`onCheckedChange\` - Callback when state changes
- \`disabled\` - Disable the switch
- \`label\` - Optional label text

## shadcn/ui Compatibility
Import as \`Switch\` for drop-in replacement:
\`\`\`tsx
import { Switch } from 'shadcn-glass-ui'
<Switch checked={enabled} onCheckedChange={setEnabled} />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for uncontrolled mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
  },
} satisfies Meta<typeof SwitchGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// STORIES
// ========================================

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Airplane Mode',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

// Controlled example
const ControlledSwitch = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <SwitchGlass checked={checked} onCheckedChange={setChecked} label="Notifications" />
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Status: {checked ? 'Enabled' : 'Disabled'}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSwitch />,
};

// shadcn/ui alias example
export const ShadcnAlias: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Airplane Mode
      </label>
    </div>
  ),
};

// Multiple switches
export const MultipleOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SwitchGlass label="Wi-Fi" defaultChecked />
      <SwitchGlass label="Bluetooth" defaultChecked />
      <SwitchGlass label="Airplane Mode" />
      <SwitchGlass label="Do Not Disturb" />
    </div>
  ),
};
