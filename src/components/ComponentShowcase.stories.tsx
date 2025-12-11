import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentShowcase } from './ComponentShowcase';

const meta: Meta<typeof ComponentShowcase> = {
  title: 'Demo/ComponentShowcase',
  component: ComponentShowcase,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'todo' },
    chromatic: { viewports: [1280] },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentShowcase>;

export const Default: Story = {};
