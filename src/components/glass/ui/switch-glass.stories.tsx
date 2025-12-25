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
Glass-themed toggle switch with smooth animations and accessibility features.

## Features
- **Smooth Animation**: 300ms sliding thumb transition
- **Integrated Label**: Optional label with 44px touch targets
- **Glass Styling**: Gradient backgrounds and glow effects
- **Dual Modes**: Controlled and uncontrolled state management
- **Keyboard Support**: Space and Enter keys toggle
- **Accessibility**: Full ARIA attributes and screen reader support
- **shadcn/ui Compatible**: Drop-in replacement with \`Switch\` alias

## Usage Pattern
\`\`\`tsx
import { SwitchGlass } from 'shadcn-glass-ui'
import { useState } from 'react'

// Controlled
function Settings() {
  const [enabled, setEnabled] = useState(false)
  return <SwitchGlass checked={enabled} onCheckedChange={setEnabled} />
}

// Uncontrolled
<SwitchGlass defaultChecked />

// With label
<SwitchGlass label="Airplane Mode" checked={isOn} onCheckedChange={setIsOn} />
\`\`\`

## CSS Variables
- \`--toggle-bg\` - Background when unchecked
- \`--toggle-active-bg\` - Gradient background when checked
- \`--toggle-knob\` - Thumb/knob color
- \`--toggle-glow\` - Box shadow when checked
- \`--text-secondary\` - Label text color
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for uncontrolled mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Optional label text displayed next to the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onCheckedChange: {
      description: 'Callback fired when checked state changes',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
} satisfies Meta<typeof SwitchGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// STORIES
// ========================================

/**
 * Default unchecked switch.
 * Demonstrates the minimal setup required for an uncontrolled switch.
 */
export const Default: Story = {
  args: {},
};

/**
 * Switch in checked state.
 * Shows the gradient background and glow effect when active.
 */
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

/**
 * Switch with integrated label.
 * Label is clickable and provides 44px touch target for accessibility.
 */
export const WithLabel: Story = {
  args: {
    label: 'Airplane Mode',
    defaultChecked: false,
  },
};

/**
 * Disabled unchecked switch.
 * Shows reduced opacity and prevents interaction.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

/**
 * Disabled checked switch.
 * Demonstrates disabled state in the active position.
 */
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

/**
 * Controlled switch with state management.
 * Demonstrates controlled mode with real-time status display.
 */
export const Controlled: Story = {
  render: () => <ControlledSwitch />,
};

/**
 * Example using shadcn/ui compatible alias.
 * Demonstrates drop-in replacement for standard shadcn/ui Switch component.
 */
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

/**
 * Multiple switches with labels.
 * Demonstrates a common settings panel pattern.
 */
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
