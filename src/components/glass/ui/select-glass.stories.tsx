import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  SelectGlass,
  SelectGlassTrigger,
  SelectGlassValue,
  SelectGlassContent,
  SelectGlassItem,
  SelectGlassGroup,
  SelectGlassLabel,
  SelectGlassSeparator,
  // shadcn/ui aliases
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './select-glass';

const meta = {
  title: 'Components/Core/SelectGlass',
  component: SelectGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Glass-themed select dropdown with compound component API for flexible composition.

## Features
- **Compound API**: 9 sub-components for maximum flexibility
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Home/End support
- **Grouped Options**: Organize items with labels and separators
- **Scroll Buttons**: Custom navigation for long lists
- **Glass Styling**: Theme-aware CSS variables for all themes
- **Accessibility**: Full ARIA support and focus management
- **shadcn/ui Compatible**: Drop-in replacement with aliases

## Usage Pattern
\`\`\`tsx
import { SelectGlass, SelectGlassTrigger, SelectGlassValue, SelectGlassContent, SelectGlassItem } from 'shadcn-glass-ui'

// Basic select
<SelectGlass>
  <SelectGlassTrigger className="w-[180px]">
    <SelectGlassValue placeholder="Select option" />
  </SelectGlassTrigger>
  <SelectGlassContent>
    <SelectGlassItem value="option1">Option 1</SelectGlassItem>
    <SelectGlassItem value="option2">Option 2</SelectGlassItem>
  </SelectGlassContent>
</SelectGlass>

// With groups
<SelectGlass>
  <SelectGlassTrigger>
    <SelectGlassValue />
  </SelectGlassTrigger>
  <SelectGlassContent>
    <SelectGlassGroup>
      <SelectGlassLabel>Group 1</SelectGlassLabel>
      <SelectGlassItem value="a">Item A</SelectGlassItem>
    </SelectGlassGroup>
    <SelectGlassSeparator />
    <SelectGlassGroup>
      <SelectGlassLabel>Group 2</SelectGlassLabel>
      <SelectGlassItem value="b">Item B</SelectGlassItem>
    </SelectGlassGroup>
  </SelectGlassContent>
</SelectGlass>
\`\`\`

## CSS Variables
- \`--input-bg\` - Trigger background
- \`--input-border\` - Trigger border
- \`--input-text\` - Trigger text
- \`--dropdown-bg\` - Content background
- \`--dropdown-border\` - Content border
- \`--dropdown-item-hover\` - Item hover background
- \`--dropdown-item-text\` - Item text color
- \`--dropdown-glow\` - Content shadow

## Sub-components
- \`SelectGlass\` / \`Select\` - Root component with state management
- \`SelectGlassTrigger\` / \`SelectTrigger\` - Trigger button
- \`SelectGlassValue\` / \`SelectValue\` - Selected value display
- \`SelectGlassContent\` / \`SelectContent\` - Dropdown portal
- \`SelectGlassItem\` / \`SelectItem\` - Option item with check indicator
- \`SelectGlassGroup\` / \`SelectGroup\` - Group container
- \`SelectGlassLabel\` / \`SelectLabel\` - Group label
- \`SelectGlassSeparator\` / \`SelectSeparator\` - Visual divider
- \`SelectGlassScrollUpButton\` - Scroll up indicator
- \`SelectGlassScrollDownButton\` - Scroll down indicator
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled selected value',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled mode',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      description: 'Callback when value changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'Form name attribute',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof SelectGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// STORIES
// ========================================

/**
 * Default select with basic fruit options.
 * Demonstrates the minimal setup required for a functional select.
 */
export const Default: Story = {
  render: () => (
    <SelectGlass>
      <SelectGlassTrigger className="w-[180px]">
        <SelectGlassValue placeholder="Select a fruit" />
      </SelectGlassTrigger>
      <SelectGlassContent>
        <SelectGlassItem value="apple">Apple</SelectGlassItem>
        <SelectGlassItem value="banana">Banana</SelectGlassItem>
        <SelectGlassItem value="orange">Orange</SelectGlassItem>
        <SelectGlassItem value="grape">Grape</SelectGlassItem>
        <SelectGlassItem value="mango">Mango</SelectGlassItem>
      </SelectGlassContent>
    </SelectGlass>
  ),
};

/**
 * Select with grouped options using SelectGlassGroup, SelectGlassLabel, and SelectGlassSeparator.
 * Demonstrates how to organize options into categories.
 */
export const WithGroups: Story = {
  render: () => (
    <SelectGlass>
      <SelectGlassTrigger className="w-[200px]">
        <SelectGlassValue placeholder="Select a framework" />
      </SelectGlassTrigger>
      <SelectGlassContent>
        <SelectGlassGroup>
          <SelectGlassLabel>Frontend</SelectGlassLabel>
          <SelectGlassItem value="react">React</SelectGlassItem>
          <SelectGlassItem value="vue">Vue</SelectGlassItem>
          <SelectGlassItem value="angular">Angular</SelectGlassItem>
          <SelectGlassItem value="svelte">Svelte</SelectGlassItem>
        </SelectGlassGroup>
        <SelectGlassSeparator />
        <SelectGlassGroup>
          <SelectGlassLabel>Backend</SelectGlassLabel>
          <SelectGlassItem value="node">Node.js</SelectGlassItem>
          <SelectGlassItem value="python">Python</SelectGlassItem>
          <SelectGlassItem value="go">Go</SelectGlassItem>
          <SelectGlassItem value="rust">Rust</SelectGlassItem>
        </SelectGlassGroup>
      </SelectGlassContent>
    </SelectGlass>
  ),
};

/**
 * Disabled select state.
 * Shows how the component appears when interaction is disabled.
 */
export const Disabled: Story = {
  render: () => (
    <SelectGlass disabled>
      <SelectGlassTrigger className="w-[180px]">
        <SelectGlassValue placeholder="Disabled" />
      </SelectGlassTrigger>
      <SelectGlassContent>
        <SelectGlassItem value="item">Item</SelectGlassItem>
      </SelectGlassContent>
    </SelectGlass>
  ),
};

// Controlled example
const ControlledSelect = () => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <SelectGlass value={value} onValueChange={setValue}>
        <SelectGlassTrigger className="w-[180px]">
          <SelectGlassValue placeholder="Select theme" />
        </SelectGlassTrigger>
        <SelectGlassContent>
          <SelectGlassItem value="light">Light</SelectGlassItem>
          <SelectGlassItem value="dark">Dark</SelectGlassItem>
          <SelectGlassItem value="system">System</SelectGlassItem>
        </SelectGlassContent>
      </SelectGlass>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Selected: {value || 'None'}
      </p>
    </div>
  );
};

/**
 * Controlled select with state management.
 * Demonstrates controlled mode with value and onValueChange props.
 */
export const Controlled: Story = {
  render: () => <ControlledSelect />,
};

/**
 * Example using shadcn/ui compatible aliases.
 * Demonstrates drop-in replacement for standard shadcn/ui Select component.
 */
export const ShadcnAlias: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Wide select with longer option labels.
 * Demonstrates how to handle width constraints with className.
 */
export const WideSelect: Story = {
  render: () => (
    <SelectGlass>
      <SelectGlassTrigger className="w-[300px]">
        <SelectGlassValue placeholder="Select your country" />
      </SelectGlassTrigger>
      <SelectGlassContent>
        <SelectGlassItem value="us">United States</SelectGlassItem>
        <SelectGlassItem value="uk">United Kingdom</SelectGlassItem>
        <SelectGlassItem value="ca">Canada</SelectGlassItem>
        <SelectGlassItem value="au">Australia</SelectGlassItem>
        <SelectGlassItem value="de">Germany</SelectGlassItem>
        <SelectGlassItem value="fr">France</SelectGlassItem>
        <SelectGlassItem value="jp">Japan</SelectGlassItem>
      </SelectGlassContent>
    </SelectGlass>
  ),
};
