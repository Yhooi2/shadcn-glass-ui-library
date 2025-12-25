/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ComboBoxGlass, type ComboBoxOption } from './combobox-glass';
import { User, MapPin, Building } from 'lucide-react';
import { ThemeProvider } from '@/lib/theme-context';
import '@/glass-theme.css';

const meta: Meta = {
  title: 'Components/Overlay/ComboBoxGlass',
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    docs: {
      description: {
        component: `
Glass-themed combobox (searchable select) combining autocomplete and dropdown functionality.

## Features
- **Search/Filter**: Real-time filtering with keyboard navigation
- **Form Integration**: Optional label, error, success states via FormFieldWrapper
- **Size Variants**: sm, md, lg, xl (via InputGlass variants)
- **Icon Support**: Trigger button and individual option icons
- **Glass Variants**: glass, frosted, fluted, crystal styles
- **Clearable**: Click selected item to deselect
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab
- **Accessibility**: Full ARIA support and screen reader announcements

## Usage Pattern
\`\`\`tsx
import { ComboBoxGlass, type ComboBoxOption } from 'shadcn-glass-ui'
import { useState } from 'react'

const options: ComboBoxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]

function Selector() {
  const [value, setValue] = useState<string>()
  return (
    <ComboBoxGlass
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select framework..."
    />
  )
}

// With form field wrapper
<ComboBoxGlass
  options={options}
  value={value}
  onValueChange={setValue}
  label="Country"
  error="Please select a country"
  required
/>

// With icons
import { MapPin } from 'lucide-react'
const optionsWithIcons: ComboBoxOption[] = [
  { value: 'us', label: 'United States', icon: MapPin },
]
<ComboBoxGlass options={optionsWithIcons} icon={Building} />
\`\`\`

## CSS Variables
- \`--input-bg\` - Trigger background
- \`--input-border\` - Trigger border
- \`--input-text\` - Trigger text
- \`--dropdown-bg\` - Content background
- \`--dropdown-border\` - Content border
- \`--dropdown-item-hover\` - Item hover background
- \`--dropdown-item-text\` - Item text color
- \`--dropdown-icon\` - Option icon color
- \`--dropdown-glow\` - Content shadow
- \`--text-accent\` - Check icon color
- \`--text-muted\` - Search icon color
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Available options to display in the dropdown',
      table: {
        type: { summary: 'readonly ComboBoxOption<T>[]' },
      },
    },
    value: {
      description: 'Currently selected value (controlled mode)',
      table: {
        type: { summary: 'T' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onValueChange: {
      description: 'Callback when value changes',
      table: {
        type: { summary: '(value: T | undefined) => void' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for trigger button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Select option..."' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size variant (affects trigger button height)',
      table: {
        type: { summary: 'InputGlassSize' },
        defaultValue: { summary: '"md"' },
      },
    },
    searchable: {
      control: 'boolean',
      description: 'Enable/disable search functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
    clearable: {
      control: 'boolean',
      description: 'Allow clearing selection by clicking selected item',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Shows required asterisk (*) next to label',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the field',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message - displays in red below the field',
      table: {
        type: { summary: 'string' },
      },
    },
    success: {
      control: 'text',
      description: 'Success message - displays in green if no error',
      table: {
        type: { summary: 'string' },
      },
    },
    glassVariant: {
      control: 'select',
      options: ['glass', 'frosted', 'fluted', 'crystal'],
      description: 'Glass variant style for dropdown content',
      table: {
        type: { summary: 'GlassVariant' },
        defaultValue: { summary: '"glass"' },
      },
    },
    icon: {
      description: 'Optional icon for trigger button',
      table: {
        type: { summary: 'LucideIcon' },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'glass';
      return (
        <ThemeProvider defaultTheme={theme}>
          <div
            className="min-h-[400px] w-[320px] flex items-start justify-center pt-4 p-8"
            style={{ background: 'var(--bg-gradient)' }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj;

// Sample data - typed for ComboBoxGlass
const countries: ComboBoxOption<string>[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
];

const countriesWithIcons: ComboBoxOption<string>[] = [
  { value: 'us', label: 'United States', icon: MapPin },
  { value: 'uk', label: 'United Kingdom', icon: MapPin },
  { value: 'ca', label: 'Canada', icon: MapPin },
  { value: 'au', label: 'Australia', icon: MapPin },
];

/**
 * Default combobox with basic country options.
 * Demonstrates the minimal setup with search functionality enabled.
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Combobox with label using FormFieldWrapper.
 * Shows the component integrated into a form context.
 */
export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country"
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Combobox with error state.
 * Demonstrates validation error display with required indicator.
 */
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country"
        error="Please select a country"
        required
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Combobox with success state.
 * Shows positive feedback after successful selection.
 */
export const WithSuccess: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('us');
    return (
      <ComboBoxGlass
        options={countries}
        label="Country"
        success="Country selected successfully"
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Small size variant (sm).
 * Demonstrates the smallest trigger button size.
 */
export const SizeSmall: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country (Small)"
        size="sm"
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Medium size variant (md) - default.
 * Shows the standard trigger button size.
 */
export const SizeMedium: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country (Medium)"
        size="md"
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Large size variant (lg).
 * Demonstrates larger trigger button for improved touch targets.
 */
export const SizeLarge: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country (Large)"
        size="lg"
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Combobox with search disabled.
 * Behaves like a traditional select dropdown without filtering.
 */
export const NotSearchable: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country (No Search)"
        searchable={false}
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Combobox with trigger icon.
 * Shows icon displayed before the selected value.
 */
export const WithTriggerIcon: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Location"
        icon={MapPin}
        placeholder="Select location..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Combobox with icons on individual options.
 * Demonstrates icon display within dropdown items.
 */
export const WithOptionIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countriesWithIcons}
        label="Country"
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Disabled combobox state.
 * Shows reduced opacity and prevents interaction.
 */
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country"
        disabled
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Clearable combobox with pre-selected value.
 * Click the selected item again to clear the selection.
 */
export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('us');
    return (
      <ComboBoxGlass
        options={countries}
        label="Country"
        clearable
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Frosted glass variant for dropdown content.
 * Demonstrates alternative glass styling option.
 */
export const GlassVariantFrosted: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <ComboBoxGlass
        options={countries}
        label="Country (Frosted)"
        glassVariant="frosted"
        placeholder="Select country..."
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * Complete form example with multiple comboboxes.
 * Demonstrates real-world usage with different configurations.
 */
export const CompleteForm: Story = {
  render: () => {
    const [country, setCountry] = useState<string>();
    const [department, setDepartment] = useState<string>();
    const [role, setRole] = useState<string>();

    const departments: ComboBoxOption<string>[] = [
      { value: 'eng', label: 'Engineering', icon: Building },
      { value: 'des', label: 'Design', icon: Building },
      { value: 'mkt', label: 'Marketing', icon: Building },
      { value: 'sales', label: 'Sales', icon: Building },
    ];

    const roles: ComboBoxOption<string>[] = [
      { value: 'dev', label: 'Developer', icon: User },
      { value: 'pm', label: 'Product Manager', icon: User },
      { value: 'des', label: 'Designer', icon: User },
    ];

    return (
      <div className="w-[400px] space-y-4">
        <ComboBoxGlass
          options={countries}
          value={country}
          onValueChange={setCountry}
          label="Country"
          placeholder="Select your country..."
          required
          icon={MapPin}
        />

        <ComboBoxGlass
          options={departments}
          value={department}
          onValueChange={setDepartment}
          label="Department"
          placeholder="Select department..."
          required
        />

        <ComboBoxGlass
          options={roles}
          value={role}
          onValueChange={setRole}
          label="Role"
          placeholder="Select your role..."
          searchable={false}
        />
      </div>
    );
  },
};
