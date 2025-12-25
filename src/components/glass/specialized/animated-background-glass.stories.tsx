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
        component:
          'Animated gradient background with floating orbs. Creates an immersive glassmorphism atmosphere for your application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showCenterOrb: {
      control: 'boolean',
      description: 'Show center orb (auto-enabled in glass theme)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
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

export const Default: Story = {
  args: {},
};

export const WithCenterOrb: Story = {
  args: {
    showCenterOrb: true,
  },
};

export const WithoutCenterOrb: Story = {
  args: {
    showCenterOrb: false,
  },
};

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
