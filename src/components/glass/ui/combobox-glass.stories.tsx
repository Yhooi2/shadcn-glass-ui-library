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
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size variant (affects trigger button height)',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable/disable search functionality',
    },
    disabled: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    success: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    glassVariant: {
      control: 'select',
      options: ['glass', 'frosted', 'fluted', 'crystal'],
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

// Default story
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

// With Label
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

// With Error
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

// With Success
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

// Size Variants
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

// Not Searchable
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

// With Trigger Icon
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

// With Option Icons
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

// Disabled
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

// Clearable
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

// Glass Variants
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

// Form Example (Complete)
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
