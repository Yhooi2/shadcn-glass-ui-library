import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import {
  TooltipGlassProvider,
  TooltipGlassSimple as TooltipGlass,
  // shadcn/ui compatible imports
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './tooltip-glass';
import { ButtonGlass } from './button-glass';
import { Info, HelpCircle, Settings } from 'lucide-react';

const meta = {
  title: 'Components/Feedback/TooltipGlass',
  component: TooltipGlass,
  decorators: [
    (Story) => (
      <TooltipGlassProvider>
        <Story />
      </TooltipGlassProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip side placement',
    },
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
  },
} satisfies Meta<typeof TooltipGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <ButtonGlass>Hover me</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Top: Story = {
  args: {
    side: 'top',
    content: 'Tooltip on top',
    children: <ButtonGlass>Top</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Bottom: Story = {
  args: {
    side: 'bottom',
    content: 'Tooltip on bottom',
    children: <ButtonGlass>Bottom</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Left: Story = {
  args: {
    side: 'left',
    content: 'Tooltip on left',
    children: <ButtonGlass>Left</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Right: Story = {
  args: {
    side: 'right',
    content: 'Tooltip on right',
    children: <ButtonGlass>Right</ButtonGlass>,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Click for more information',
    children: (
      <button className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
        <Info className="w-5 h-5" />
      </button>
    ),
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllPositions: Story = {
  args: {
    content: 'Tooltip',
    children: <ButtonGlass>Hover</ButtonGlass>,
  },
  render: () => (
    <div className="flex gap-8 p-8">
      <TooltipGlass side="top" content="Top tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
      <TooltipGlass side="bottom" content="Bottom tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
      <TooltipGlass side="left" content="Left tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
      <TooltipGlass side="right" content="Right tooltip">
        <ButtonGlass variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithDifferentTriggers: Story = {
  args: {
    content: 'Tooltip',
    children: <ButtonGlass>Hover</ButtonGlass>,
  },
  render: () => (
    <div className="flex gap-4">
      <TooltipGlass content="Primary action">
        <ButtonGlass variant="default">Primary</ButtonGlass>
      </TooltipGlass>
      <TooltipGlass content="Secondary action">
        <ButtonGlass variant="ghost">Ghost</ButtonGlass>
      </TooltipGlass>
      <TooltipGlass content="Settings">
        <ButtonGlass variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </ButtonGlass>
      </TooltipGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

/**
 * Using shadcn/ui compatible import aliases.
 * These can be used as drop-in replacements for shadcn/ui Tooltip.
 */
export const ShadcnUICompatible: Story = {
  name: 'shadcn/ui Compatible',
  args: {
    content: 'Tooltip',
    children: <ButtonGlass>Hover</ButtonGlass>,
  },
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonGlass>Hover me (shadcn/ui API)</ButtonGlass>
          </TooltipTrigger>
          <TooltipContent>
            <p>This uses shadcn/ui compatible imports</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonGlass variant="ghost" size="icon">
              <HelpCircle className="w-4 h-4" />
            </ButtonGlass>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Help tooltip</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
