import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

/**
 * Glass Variants Demo
 *
 * Demonstrates the 4 glassmorphism effect variants available as CSS utility classes:
 * - .glass - Standard glassmorphism (16px blur, 180% saturation)
 * - .frosted - Matte finish (32px blur, 100% saturation)
 * - .fluted - Ribbed effect with vertical stripes (16px blur, 120% saturation)
 * - .crystal - Crystal-clear (8px blur, 200% saturation, brightness boost)
 *
 * These variants are defined in src/styles/utilities/glass-variants.css
 */

const GlassVariantsDemo = () => {
  return (
    <div className="w-full p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Glass Variants
        </h1>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          4 glassmorphism effects for maximum visual flexibility
        </p>
      </div>

      {/* Individual Cards - 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Standard Glass */}
        <div className="glass p-6 rounded-2xl">
          <div className="space-y-3">
            <div className="text-4xl">🔮</div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Glass
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Standard glassmorphism effect
            </p>
            <div className="space-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <p>blur: 16px | saturation: 180%</p>
            </div>
            <code
              className="block mt-2 p-2 rounded bg-black/20 text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              className="glass rounded-2xl"
            </code>
          </div>
        </div>

        {/* Frosted Glass */}
        <div className="frosted p-6 rounded-2xl">
          <div className="space-y-3">
            <div className="text-4xl">❄️</div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Frosted
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Matte finish with maximum blur
            </p>
            <div className="space-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <p>blur: 32px | saturation: 100%</p>
            </div>
            <code
              className="block mt-2 p-2 rounded bg-black/20 text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              className="frosted rounded-2xl"
            </code>
          </div>
        </div>

        {/* Fluted Glass */}
        <div className="fluted p-6 rounded-2xl">
          <div className="space-y-3">
            <div className="text-4xl">📏</div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Fluted
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Ribbed effect with vertical stripes
            </p>
            <div className="space-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <p>blur: 16px | saturation: 120%</p>
            </div>
            <code
              className="block mt-2 p-2 rounded bg-black/20 text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              className="fluted rounded-2xl"
            </code>
          </div>
        </div>

        {/* Crystal Glass */}
        <div className="crystal p-6 rounded-2xl">
          <div className="space-y-3">
            <div className="text-4xl">💎</div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Crystal
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Crystal-clear with minimal blur
            </p>
            <div className="space-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <p>blur: 8px | saturation: 200%</p>
            </div>
            <code
              className="block mt-2 p-2 rounded bg-black/20 text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              className="crystal rounded-2xl"
            </code>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-center" style={{ color: 'var(--text-primary)' }}>
          Quick Comparison
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass p-4 rounded-xl text-center">
            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
              Glass
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Standard
            </p>
          </div>
          <div className="frosted p-4 rounded-xl text-center">
            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
              Frosted
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Matte
            </p>
          </div>
          <div className="fluted p-4 rounded-xl text-center">
            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
              Fluted
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Ribbed
            </p>
          </div>
          <div className="crystal p-4 rounded-xl text-center">
            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
              Crystal
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Clear
            </p>
          </div>
        </div>
      </div>

      {/* Reference */}
      <div className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        <p>
          Defined in <code>src/styles/utilities/glass-variants.css</code>
        </p>
      </div>
    </div>
  );
};

const meta = {
  title: 'Examples/Demos/GlassVariants',
  component: GlassVariantsDemo,
  parameters: {
    docs: {
      description: {
        component: `
# Glass Variants

Four glassmorphism effect variants available as CSS utility classes.

## Available Variants

- **\`.glass\`** - Standard glassmorphism (16px blur, 180% saturation)
- **\`.frosted\`** - Matte finish (32px blur, 100% saturation)
- **\`.fluted\`** - Ribbed effect with vertical stripes (16px blur, 120% saturation)
- **\`.crystal\`** - Crystal-clear (8px blur, 200% saturation, brightness boost)

## Modifiers

### Intensity
- \`.glass-subtle\` - Lighter opacity (70%)
- \`.glass-strong\` - Stronger blur (24px)

Works with all variants: \`.frosted-subtle\`, \`.fluted-strong\`, etc.

### Color Tints
- \`.glass-tint-primary\` - Purple tint
- \`.glass-tint-success\` - Green tint
- \`.glass-tint-warning\` - Orange tint
- \`.glass-tint-error\` - Red tint

Works with all variants: \`.frosted-tint-success\`, \`.crystal-tint-primary\`, etc.

## Theme Support

All variants automatically adapt to the active theme:
- **Glass theme** - Dark glassmorphism
- **Light theme** - Increased opacity for better contrast
- **Aurora theme** - Enhanced glow effects

## Implementation

See \`src/styles/utilities/glass-variants.css\` for the complete CSS implementation.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GlassVariantsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const GlassTheme: Story = {
  parameters: {
    theme: 'glass',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LightTheme: Story = {
  parameters: {
    theme: 'light',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AuroraTheme: Story = {
  parameters: {
    theme: 'aurora',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
