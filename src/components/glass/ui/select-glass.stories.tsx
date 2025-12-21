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
Glass-themed select component with shadcn/ui compatible compound API.
Built on @radix-ui/react-select for accessibility and keyboard navigation.

## Sub-components
- \`SelectGlass\` / \`Select\` - Root component
- \`SelectGlassTrigger\` / \`SelectTrigger\` - Trigger button
- \`SelectGlassValue\` / \`SelectValue\` - Selected value display
- \`SelectGlassContent\` / \`SelectContent\` - Dropdown content
- \`SelectGlassItem\` / \`SelectItem\` - Option item
- \`SelectGlassGroup\` / \`SelectGroup\` - Group container
- \`SelectGlassLabel\` / \`SelectLabel\` - Group label
- \`SelectGlassSeparator\` / \`SelectSeparator\` - Visual separator

## shadcn/ui Compatibility
\`\`\`tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'shadcn-glass-ui'

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// STORIES
// ========================================

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

export const Controlled: Story = {
  render: () => <ControlledSelect />,
};

// shadcn/ui alias example
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

// Wide select
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
