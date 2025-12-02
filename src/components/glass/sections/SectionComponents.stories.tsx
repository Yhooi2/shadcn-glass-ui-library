import type { Meta, StoryObj } from '@storybook/react';
import { Github } from 'lucide-react';
import { HeaderBrandingGlass } from './header-branding-glass';

const meta = {
  title: 'Glass/Section Components',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderBrandingGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logoIcon: Github,
    title: 'User Analytics',
    subtitle: 'Dashboard',
  },
};

export const WithoutSubtitle: Story = {
  args: {
    logoIcon: Github,
    title: 'User Analytics',
  },
};

export const LongTitle: Story = {
  args: {
    logoIcon: Github,
    title: 'Comprehensive GitHub Analytics Platform',
    subtitle: 'Enterprise Dashboard',
  },
};

export const CustomAriaLabel: Story = {
  args: {
    logoIcon: Github,
    title: 'Analytics',
    subtitle: 'Dashboard',
    logoAriaLabel: 'Go to homepage',
  },
};

// Interactive demo
export const Interactive: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h3 className="text-sm font-medium text-white/80">Header Branding Examples</h3>

      <div className="space-y-4">
        <HeaderBrandingGlass
          logoIcon={Github}
          title="GitHub Analytics"
          subtitle="Professional"
        />

        <HeaderBrandingGlass logoIcon={Github} title="Simple Title" />

        <HeaderBrandingGlass
          logoIcon={Github}
          title="With Callback"
          subtitle="Click logo"
          onLogoClick={() => alert('Logo clicked!')}
        />
      </div>
    </div>
  ),
};
