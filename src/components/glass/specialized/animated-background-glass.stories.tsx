import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedBackgroundGlass } from './animated-background-glass';
import { ThemeProvider } from '@/lib/theme-context';
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { GlassCard } from '@/components/glass/ui/glass-card';

const meta = {
  title: 'Components/Specialized/AnimatedBackgroundGlass',
  component: AnimatedBackgroundGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Animated gradient background with floating orbs for glassmorphism UIs.

## Features
- **Theme-aware:** Automatically adapts to glass/light/aurora themes
- **5 Animated Orbs:** Floating blurred circles with staggered animations (8s cycle)
- **Center Orb Control:** Show/hide the center orb (auto-enabled in glass theme)
- **Full-screen:** Fixed positioning covers the entire viewport
- **Performance:** CSS-only animations with GPU acceleration

## Usage Pattern
Always render the background first, then your content with \`z-index\`:

\`\`\`tsx
<>
  <AnimatedBackgroundGlass />
  <main className="relative z-10">Your content</main>
</>
\`\`\`

## CSS Variables
Customize via theme CSS:
- \`--orb-1\` to \`--orb-5\`: Orb colors (OKLCH with opacity)
- \`--bg-from\`, \`--bg-via\`, \`--bg-to\`: Gradient colors
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showCenterOrb: {
      control: 'boolean',
      description: 'Show center orb (Orb 5). Auto-enabled in glass theme, hidden in light/aurora.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined (theme-dependent)' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization (e.g., opacity, filters)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider
        defaultTheme={(context.globals.theme as 'glass' | 'light' | 'aurora') || 'glass'}
      >
        <div className="h-screen w-full relative">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof AnimatedBackgroundGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default background with theme-detected settings.
 * Center orb visibility depends on current theme (visible in glass, hidden in light/aurora).
 */
export const Default: Story = {
  args: {},
};

/**
 * Force center orb to be visible regardless of theme.
 * Useful for light/aurora themes where it's hidden by default.
 */
export const WithCenterOrb: Story = {
  args: {
    showCenterOrb: true,
  },
};

/**
 * Explicitly hide center orb in all themes.
 * Use when you want a more subtle background, even in glass theme.
 */
export const WithoutCenterOrb: Story = {
  args: {
    showCenterOrb: false,
  },
};

/**
 * Typical usage pattern with content overlay.
 * Demonstrates z-index layering with GlassCard and buttons.
 */
export const WithContent: Story = {
  render: (args) => (
    <>
      <AnimatedBackgroundGlass {...args} />
      <div className="relative z-10 flex items-center justify-center h-full p-8">
        <GlassCard className="max-w-md p-8 text-center">
          <h1 className="text-2xl font-bold text-(--text-primary) mb-4">Glass UI Library</h1>
          <p className="text-(--text-secondary) mb-6">
            Beautiful glassmorphism components with animated backgrounds.
          </p>
          <div className="flex gap-4 justify-center">
            <ButtonGlass variant="default">Get Started</ButtonGlass>
            <ButtonGlass variant="outline">Learn More</ButtonGlass>
          </div>
        </GlassCard>
      </div>
    </>
  ),
};

/**
 * Reduced opacity for subtle backgrounds.
 * Use className to adjust opacity when content needs more focus.
 */
export const ReducedOpacity: Story = {
  args: {
    className: 'opacity-50',
  },
  render: (args) => (
    <>
      <AnimatedBackgroundGlass {...args} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-(--text-primary) text-xl">Background with reduced opacity (50%)</p>
      </div>
    </>
  ),
};

/**
 * With semi-transparent dark overlay.
 * Improves text contrast for light-colored content.
 */
export const DarkOverlay: Story = {
  render: (args) => (
    <>
      <AnimatedBackgroundGlass {...args} />
      <div className="fixed inset-0 bg-black/30 z-[1]" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <GlassCard className="p-8">
          <p className="text-(--text-primary)">With dark overlay for better contrast</p>
        </GlassCard>
      </div>
    </>
  ),
};
