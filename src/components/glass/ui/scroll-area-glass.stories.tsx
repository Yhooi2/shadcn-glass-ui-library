import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ScrollAreaGlass } from './scroll-area-glass';
import { SeparatorGlass } from './separator-glass';

const meta = {
  title: 'Components/Core/ScrollAreaGlass',
  component: ScrollAreaGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Which scrollbars to show',
      table: {
        type: { summary: "'vertical' | 'horizontal' | 'both'" },
        defaultValue: { summary: 'vertical' },
      },
    },
  },
} satisfies Meta<typeof ScrollAreaGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for demonstrations
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.${a.length - i}.0`);

const items = [
  { id: 1, name: 'Introduction', description: 'Getting started with the library' },
  { id: 2, name: 'Installation', description: 'How to install and set up' },
  { id: 3, name: 'Components', description: 'Available UI components' },
  { id: 4, name: 'Themes', description: 'Customizing appearance' },
  { id: 5, name: 'Accessibility', description: 'WCAG compliance guide' },
  { id: 6, name: 'Performance', description: 'Optimization tips' },
  { id: 7, name: 'Testing', description: 'How to test components' },
  { id: 8, name: 'Migration', description: 'Upgrading from v1 to v2' },
  { id: 9, name: 'API Reference', description: 'Complete API documentation' },
  { id: 10, name: 'Examples', description: 'Real-world usage examples' },
];

/**
 * Default vertical scroll area with a list of tags
 */
export const Default: Story = {
  render: () => (
    <ScrollAreaGlass className="h-72 w-48 rounded-md border border-[var(--card-border)]">
      <div className="p-4">
        <h4
          className="mb-4 text-sm font-medium leading-none"
          style={{ color: 'var(--text-primary)' }}
        >
          Tags
        </h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {tag}
            </div>
            <SeparatorGlass className="my-2" />
          </div>
        ))}
      </div>
    </ScrollAreaGlass>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('v1.50.0')).toBeInTheDocument();
  },
};

/**
 * Horizontal scroll area for a gallery of items
 */
export const Horizontal: Story = {
  render: () => (
    <ScrollAreaGlass
      className="w-96 whitespace-nowrap rounded-md border border-[var(--card-border)]"
      orientation="horizontal"
    >
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 rounded-md w-[150px] h-[100px] flex items-center justify-center"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Item {i + 1}</span>
          </div>
        ))}
      </div>
    </ScrollAreaGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Both vertical and horizontal scrolling for large content
 */
export const Both: Story = {
  render: () => (
    <ScrollAreaGlass
      className="h-[300px] w-[400px] rounded-md border border-[var(--card-border)]"
      orientation="both"
    >
      <div className="p-4" style={{ width: '800px' }}>
        <h4 className="mb-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          Large Content Area
        </h4>
        <div className="space-y-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="w-24 shrink-0">Row {i + 1}</span>
              <div className="h-8 flex-1 rounded" style={{ background: 'var(--card-bg)' }} />
              <span className="w-32 shrink-0">Extra content that extends horizontally</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollAreaGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Scroll area with a list of documentation items
 */
export const DocumentationList: Story = {
  render: () => (
    <ScrollAreaGlass className="h-[350px] w-[300px] rounded-lg border border-[var(--card-border)]">
      <div className="p-4">
        <h3 className="mb-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Documentation
        </h3>
        <div className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              className="w-full rounded-md px-3 py-2 text-left transition-colors hover:bg-[var(--card-hover-bg)]"
              style={{ color: 'var(--text-primary)' }}
            >
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </ScrollAreaGlass>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Documentation')).toBeInTheDocument();
  },
};

/**
 * Scroll area in a card context
 */
export const InCard: Story = {
  render: () => (
    <div
      className="w-[320px] rounded-xl p-4"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
    >
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        Recent Activity
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        Your latest updates and notifications
      </p>
      <SeparatorGlass className="mb-4" />
      <ScrollAreaGlass className="h-[200px]">
        <div className="space-y-3 pr-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg p-2"
              style={{ background: 'var(--glass-surface)' }}
            >
              <div
                className="h-8 w-8 rounded-full shrink-0"
                style={{ background: 'var(--btn-primary-bg)' }}
              />
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Activity Item {i + 1}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {i + 1} minutes ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollAreaGlass>
    </div>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Recent Activity')).toBeInTheDocument();
  },
};

/**
 * Empty scroll area (no scrollbar when content fits)
 */
export const NoScrollNeeded: Story = {
  render: () => (
    <ScrollAreaGlass className="h-[300px] w-[250px] rounded-md border border-[var(--card-border)]">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          Short Content
        </h4>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          This content is short enough that no scrollbar is needed. The ScrollAreaGlass will not
          show scrollbars when the content fits within the viewport.
        </p>
      </div>
    </ScrollAreaGlass>
  ),
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Short Content')).toBeInTheDocument();
  },
};
