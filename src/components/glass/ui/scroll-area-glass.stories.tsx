import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ScrollAreaGlass } from './scroll-area-glass';
import { SeparatorGlass } from './separator-glass';

const meta = {
  title: 'Components/Core/ScrollAreaGlass',
  component: ScrollAreaGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Custom scrollable container with glass-themed scrollbars.

## Features
- **Glass-Styled Scrollbars:** Custom scrollbars with theme-aware glass styling
- **Multi-Directional:** Supports vertical, horizontal, or bidirectional scrolling
- **Auto-Hide Behavior:** Scrollbars fade in on hover, hide when inactive
- **Cross-Browser Consistency:** Built on Radix UI for uniform behavior across browsers
- **Keyboard Accessible:** Full keyboard navigation support (arrow keys, Page Up/Down, Home/End)
- **Focus States:** Visible focus ring for keyboard users
- **Smooth Transitions:** Animated scrollbar appearance and hover states
- **Customizable:** Theme CSS variables for colors and effects

## Usage Pattern
Set a fixed height/width and let content overflow:

\`\`\`tsx
// Vertical scrolling
<ScrollAreaGlass className="h-[400px]">
  <div className="space-y-2">
    {longList.map(item => <Item key={item.id} {...item} />)}
  </div>
</ScrollAreaGlass>

// Horizontal scrolling
<ScrollAreaGlass orientation="horizontal" className="w-96">
  <div className="flex space-x-4">
    {cards.map(card => <Card key={card.id} {...card} />)}
  </div>
</ScrollAreaGlass>

// Both directions
<ScrollAreaGlass orientation="both" className="h-96 w-full">
  <LargeDataTable />
</ScrollAreaGlass>
\`\`\`

## CSS Variables
Customize via theme CSS:
- \`--scroll-thumb-bg\`: Scrollbar thumb background color
- \`--scroll-thumb-hover-bg\`: Scrollbar thumb hover background color
- \`--scroll-thumb-border\`: Scrollbar thumb border color
- \`--scroll-track-bg\`: Scrollbar track and corner background color
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Which scrollbars to display (vertical, horizontal, or both)',
      table: {
        type: { summary: "'vertical' | 'horizontal' | 'both'" },
        defaultValue: { summary: "'vertical'" },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes (typically used for setting height/width)',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description: 'Content to be scrolled',
      table: {
        type: { summary: 'ReactNode' },
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
 * Default vertical scrolling with a list of version tags.
 * Demonstrates auto-hide scrollbar behavior and separator usage.
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
 * Horizontal scrolling for wide content.
 * Use `orientation="horizontal"` for image galleries or card carousels.
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
 * Bidirectional scrolling for large data tables.
 * Use `orientation="both"` when content overflows in both dimensions.
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
 * Interactive documentation list with hover states.
 * Demonstrates combining ScrollAreaGlass with clickable items and proper spacing.
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
 * ScrollAreaGlass inside a GlassCard with header and separator.
 * Common pattern for activity feeds, notification lists, and sidebars.
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
 * Content that fits without scrolling.
 * ScrollAreaGlass automatically hides scrollbars when content doesn't overflow.
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
