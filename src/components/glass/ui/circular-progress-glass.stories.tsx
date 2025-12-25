import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { CircularProgressGlass } from './circular-progress-glass';

const meta = {
  title: 'Components/Feedback/CircularProgressGlass',
  component: CircularProgressGlass,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SVG-based circular progress indicator with gradient colors and glow effects. Supports both determinate (0-100%) and indeterminate (spinner) variants.

## Features
- Determinate (0-100%) and indeterminate (spinner) variants
- 4 sizes: sm (64px), md (96px), lg (128px), xl (160px)
- 6 gradient colors: violet, blue, cyan, amber, emerald, rose
- Configurable stroke thickness and track width
- Optional center label (percentage or custom text)
- SVG glow filters with 3 intensity levels (low, medium, high)
- Smooth transitions with configurable animation duration
- Theme-aware styling via CSS variables
- Screen reader accessible with ARIA progressbar

## CSS Variables
- \`--progress-bg\`: Progress bar background color
- \`--progress-glow\`: Default glow color
- \`--progress-glow-violet\`: Glow for violet gradient
- \`--progress-glow-blue\`: Glow for blue gradient
- \`--progress-glow-cyan\`: Glow for cyan gradient
- \`--progress-glow-amber\`: Glow for amber gradient
- \`--progress-glow-emerald\`: Glow for emerald gradient
- \`--progress-glow-rose\`: Glow for rose gradient

## Usage Pattern
\`\`\`tsx
// Determinate progress
<CircularProgressGlass value={65} color="violet" />

// Indeterminate spinner
<CircularProgressGlass variant="indeterminate" showLabel={false} />

// With custom label
<CircularProgressGlass value={75} label="Loading..." color="emerald" />

// Large with high glow
<CircularProgressGlass value={80} size="xl" glowIntensity="high" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100), clamped automatically',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Variant type: determinate (0-100%) or indeterminate (spinner)',
      table: {
        type: { summary: "'determinate' | 'indeterminate'" },
        defaultValue: { summary: "'determinate'" },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Circle size: sm (64px), md (96px), lg (128px), xl (160px)',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    color: {
      control: 'select',
      options: ['violet', 'blue', 'cyan', 'amber', 'emerald', 'rose'],
      description: 'Gradient color variant',
      table: {
        type: { summary: "'violet' | 'blue' | 'cyan' | 'amber' | 'emerald' | 'rose'" },
        defaultValue: { summary: "'violet'" },
      },
    },
    thickness: {
      control: { type: 'range', min: 2, max: 20 },
      description: 'Stroke width in pixels for progress circle',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    trackWidth: {
      control: { type: 'range', min: 2, max: 20 },
      description: 'Background track width in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label in center',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: 'text',
      description: 'Custom label text (overrides percentage)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    showGlow: {
      control: 'boolean',
      description: 'Show glow effect using SVG filters',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    glowIntensity: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: 'Glow intensity level',
      table: {
        type: { summary: "'low' | 'medium' | 'high'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    strokeLinecap: {
      control: 'select',
      options: ['round', 'butt', 'square'],
      description: 'Stroke line cap style',
      table: {
        type: { summary: "'round' | 'butt' | 'square'" },
        defaultValue: { summary: "'round'" },
      },
    },
    animationDuration: {
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: 'Animation duration in seconds for value transitions',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
} satisfies Meta<typeof CircularProgressGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default circular progress at 65% with violet gradient.
 * Shows percentage label in the center.
 */
export const Default: Story = {
  args: {
    value: 65,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Indeterminate spinner variant for unknown duration tasks.
 * Label is hidden as percentage doesn't apply.
 */
export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
    showLabel: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Custom label text overrides the default percentage display.
 * Useful for showing status messages alongside progress.
 */
export const WithCustomLabel: Story = {
  args: {
    value: 75,
    label: 'Loading...',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Progress indicator without glow effect.
 * Reduces visual prominence for secondary progress indicators.
 */
export const NoGlow: Story = {
  args: {
    value: 60,
    showGlow: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * High glow intensity creates more prominent visual effect.
 * Best for primary progress indicators that need attention.
 */
export const HighGlowIntensity: Story = {
  args: {
    value: 80,
    glowIntensity: 'high',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Thicker stroke width creates a bolder appearance.
 * Both progress and track widths set to 16px.
 */
export const ThickStroke: Story = {
  args: {
    value: 50,
    thickness: 16,
    trackWidth: 16,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Showcase of all 4 size variants: sm, md, lg, xl.
 * Sizes range from 64px to 160px.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="sm" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Small
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="md" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Medium
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="lg" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Large
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={65} size="xl" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          XL
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * All 6 gradient color options: violet, blue, cyan, amber, emerald, rose.
 * Each color has matching glow effects.
 */
export const AllColors: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="violet" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Violet
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="blue" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Blue
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="cyan" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Cyan
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="amber" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Amber
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="emerald" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Emerald
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} color="rose" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Rose
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Progress states from 0% to 100% in 25% increments.
 * Demonstrates smooth transitions between values.
 */
export const ProgressSteps: Story = {
  render: () => (
    <div className="flex gap-6 items-center flex-wrap">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={0} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          0%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={25} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          25%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={50} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          50%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={75} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          75%
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={100} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          100%
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Comparison of stroke linecap styles: round, butt, square.
 * Round creates rounded ends, butt is flat, square extends slightly.
 */
export const StrokeLinecaps: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={70} strokeLinecap="round" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Round
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={70} strokeLinecap="butt" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Butt
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CircularProgressGlass value={70} strokeLinecap="square" />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Square
        </span>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
