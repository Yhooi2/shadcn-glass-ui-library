/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ComboBoxGlass, type ComboBoxOption } from './combobox-glass';
import { User, MapPin, Building } from 'lucide-react';
import { ThemeProvider } from '@/lib/theme-context';
import '@/glass-theme.css';

const meta = {
  title: 'Glass UI/ComboBoxGlass',
  component: ComboBoxGlass,
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
} satisfies Meta<typeof ComboBoxGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
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
  args: {
    options: countries,
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// With Error
export const WithError: Story = {
  args: {
    options: countries,
    label: 'Country',
    error: 'Please select a country',
    required: true,
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// With Success
export const WithSuccess: Story = {
  args: {
    options: countries,
    label: 'Country',
    success: 'Country selected successfully',
    placeholder: 'Select country...',
    value: 'us',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('us');
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// Size Variants
export const SizeSmall: Story = {
  args: {
    options: countries,
    label: 'Country (Small)',
    size: 'sm',
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

export const SizeMedium: Story = {
  args: {
    options: countries,
    label: 'Country (Medium)',
    size: 'md',
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

export const SizeLarge: Story = {
  args: {
    options: countries,
    label: 'Country (Large)',
    size: 'lg',
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// Not Searchable
export const NotSearchable: Story = {
  args: {
    options: countries,
    label: 'Country (No Search)',
    searchable: false,
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// With Trigger Icon
export const WithTriggerIcon: Story = {
  args: {
    options: countries,
    label: 'Location',
    icon: MapPin,
    placeholder: 'Select location...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// With Option Icons
export const WithOptionIcons: Story = {
  args: {
    options: countriesWithIcons,
    label: 'Country',
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    options: countries,
    label: 'Country',
    disabled: true,
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// Clearable
export const Clearable: Story = {
  args: {
    options: countries,
    label: 'Country',
    clearable: true,
    placeholder: 'Select country...',
    value: 'us',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('us');
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
  },
};

// Glass Variants
export const GlassVariantFrosted: Story = {
  args: {
    options: countries,
    label: 'Country (Frosted)',
    glassVariant: 'frosted',
    placeholder: 'Select country...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>();
    return <ComboBoxGlass {...args} value={value} onChange={setValue} />;
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
          onChange={setCountry}
          label="Country"
          placeholder="Select your country..."
          required
          icon={MapPin}
          size="md"
        />

        <ComboBoxGlass
          options={departments}
          value={department}
          onChange={setDepartment}
          label="Department"
          placeholder="Select department..."
          required
          size="md"
        />

        <ComboBoxGlass
          options={roles}
          value={role}
          onChange={setRole}
          label="Role"
          placeholder="Select your role..."
          searchable={false}
          size="md"
        />
      </div>
    );
  },
};
