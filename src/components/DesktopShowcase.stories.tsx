import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopShowcase } from './DesktopShowcase';

const meta: Meta<typeof DesktopShowcase> = {
  title: 'Demo/DesktopShowcase',
  component: DesktopShowcase,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'todo' },
    chromatic: { viewports: [1280] },
  },
};

export default meta;
type Story = StoryObj<typeof DesktopShowcase>;

export const Default: Story = {};
