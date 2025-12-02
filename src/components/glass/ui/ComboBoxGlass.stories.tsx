import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ComboBoxGlass, type ComboBoxOption } from './combobox-glass';

// Sample data
const frameworks: ComboBoxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'next', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
];

const countries: ComboBoxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
];

const languages: ComboBoxOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ru', label: 'Russian' },
];

// Wrapper component for stories
function ComboBoxWrapper<T = string>({
  initialValue,
  options,
  ...props
}: Omit<React.ComponentProps<typeof ComboBoxGlass>, 'value' | 'onChange' | 'options'> & {
  initialValue?: T;
  options: readonly ComboBoxOption<T>[];
}) {
  const [value, setValue] = useState<T | undefined>(initialValue);
  return <ComboBoxGlass options={options} value={value} onChange={setValue} {...props} />;
}

const meta: Meta<typeof ComboBoxGlass> = {
  title: 'Glass/UI/ComboBoxGlass',
  component: ComboBoxGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <ComboBoxWrapper options={frameworks} placeholder="Select framework..." />,
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('combobox');
    await expect(button).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: {},
  render: () => (
    <ComboBoxWrapper options={frameworks} initialValue="react" placeholder="Select framework..." />
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('combobox');
    await expect(button).toHaveTextContent('React');
  },
};

export const Clearable: Story = {
  args: {},
  render: () => (
    <ComboBoxWrapper
      options={frameworks}
      initialValue="react"
      placeholder="Select framework..."
      clearable
    />
  ),
};

export const Disabled: Story = {
  args: {},
  render: () => (
    <ComboBoxWrapper
      options={frameworks}
      initialValue="react"
      placeholder="Select framework..."
      disabled
    />
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('combobox');
    await expect(button).toBeDisabled();
  },
};

export const CustomPlaceholders: Story = {
  args: {},
  render: () => (
    <ComboBoxWrapper
      options={countries}
      placeholder="Choose your country..."
      searchPlaceholder="Type to search countries..."
      emptyText="No countries match your search"
    />
  ),
};

export const AllGlassVariants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-2">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Glass
        </span>
        <ComboBoxWrapper options={frameworks} placeholder="Select..." glassVariant="glass" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Frosted
        </span>
        <ComboBoxWrapper options={frameworks} placeholder="Select..." glassVariant="frosted" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Fluted
        </span>
        <ComboBoxWrapper options={frameworks} placeholder="Select..." glassVariant="fluted" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Crystal
        </span>
        <ComboBoxWrapper options={frameworks} placeholder="Select..." glassVariant="crystal" />
      </div>
    </div>
  ),
};

export const LongList: Story = {
  args: {},
  render: () => {
    const longList: ComboBoxOption[] = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    }));

    return <ComboBoxWrapper options={longList} placeholder="Select from 50 options..." />;
  },
};

export const MultipleComboBoxes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          Framework
        </label>
        <ComboBoxWrapper options={frameworks} placeholder="Select framework..." />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          Country
        </label>
        <ComboBoxWrapper options={countries} placeholder="Select country..." />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          Language
        </label>
        <ComboBoxWrapper options={languages} placeholder="Select language..." />
      </div>
    </div>
  ),
};
