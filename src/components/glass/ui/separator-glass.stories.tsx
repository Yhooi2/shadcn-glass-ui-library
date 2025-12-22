import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SeparatorGlass } from './separator-glass';

const meta = {
  title: 'Components/Core/SeparatorGlass',
  component: SeparatorGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'When true, hides from screen readers (purely visual)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof SeparatorGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default horizontal separator
 */
export const Default: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none" style={{ color: 'var(--text-primary)' }}>
          Section Title
        </h4>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Some description text here.
        </p>
      </div>
      <SeparatorGlass className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div style={{ color: 'var(--text-primary)' }}>Item 1</div>
        <SeparatorGlass orientation="vertical" />
        <div style={{ color: 'var(--text-primary)' }}>Item 2</div>
        <SeparatorGlass orientation="vertical" />
        <div style={{ color: 'var(--text-primary)' }}>Item 3</div>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const separators = canvas.getAllByRole('none');
    await expect(separators.length).toBeGreaterThan(0);
  },
};

/**
 * Horizontal separator (most common use case)
 */
export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <p style={{ color: 'var(--text-primary)' }}>Content above</p>
      <SeparatorGlass />
      <p style={{ color: 'var(--text-primary)' }}>Content below</p>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Vertical separator for inline content
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div style={{ color: 'var(--text-primary)' }}>Blog</div>
      <SeparatorGlass orientation="vertical" />
      <div style={{ color: 'var(--text-primary)' }}>Docs</div>
      <SeparatorGlass orientation="vertical" />
      <div style={{ color: 'var(--text-primary)' }}>Source</div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Separator with glow effect (glass theme)
 */
export const WithGlow: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <p style={{ color: 'var(--text-primary)' }}>Without glow:</p>
      <SeparatorGlass />
      <p style={{ color: 'var(--text-primary)' }}>With glow:</p>
      <SeparatorGlass glow />
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Non-decorative separator (visible to screen readers)
 */
export const NonDecorative: Story = {
  args: {
    decorative: false,
  },
  render: (args) => (
    <div className="w-64 space-y-4">
      <p style={{ color: 'var(--text-primary)' }}>
        This separator has <code>decorative=false</code> and will be announced by screen readers.
      </p>
      <SeparatorGlass {...args} />
      <p style={{ color: 'var(--text-primary)' }}>Content below the semantic separator.</p>
    </div>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('separator');
    await expect(separator).toBeInTheDocument();
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Horizontal variants */}
      <div className="w-64 space-y-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Horizontal
        </h3>
        <div className="space-y-2">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Default
          </p>
          <SeparatorGlass />
        </div>
        <div className="space-y-2">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            With Glow
          </p>
          <SeparatorGlass glow />
        </div>
      </div>

      {/* Vertical variants */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Vertical
        </h3>
        <div className="flex h-8 items-center space-x-4">
          <span style={{ color: 'var(--text-primary)' }}>Default</span>
          <SeparatorGlass orientation="vertical" />
          <span style={{ color: 'var(--text-primary)' }}>With Glow</span>
          <SeparatorGlass orientation="vertical" glow />
          <span style={{ color: 'var(--text-primary)' }}>End</span>
        </div>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * In content sections (real-world usage)
 */
export const InContentSections: Story = {
  render: () => (
    <div
      className="w-80 rounded-lg p-4"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        User Profile
      </h3>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        View and manage your profile settings.
      </p>

      <SeparatorGlass className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>Email</span>
          <span style={{ color: 'var(--text-primary)' }}>user@example.com</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-secondary)' }}>Role</span>
          <span style={{ color: 'var(--text-primary)' }}>Administrator</span>
        </div>
      </div>

      <SeparatorGlass className="my-4" glow />

      <div className="flex justify-end space-x-2">
        <button
          className="rounded px-3 py-1 text-sm"
          style={{
            color: 'var(--text-secondary)',
            border: '1px solid var(--card-border)',
          }}
        >
          Cancel
        </button>
        <button
          className="rounded px-3 py-1 text-sm"
          style={{
            background: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-text)',
          }}
        >
          Save
        </button>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
