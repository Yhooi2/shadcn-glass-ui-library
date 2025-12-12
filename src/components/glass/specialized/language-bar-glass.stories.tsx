import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LanguageBarGlass } from './language-bar-glass';

const meta = {
  title: 'Components/Composite/LanguageBarGlass',
  component: LanguageBarGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    languages: {
      description:
        'Array of language data with name, percentage, and optional color. ' +
        'Color accepts direct CSS values: oklch(...), #3b82f6, rgb(...), hsl(...). ' +
        'Avoid CSS variables as they may be tree-shaken in production.',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show language legend below the bar',
    },
  },
} satisfies Meta<typeof LanguageBarGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLanguage: Story = {
  args: {
    languages: [{ name: 'TypeScript', percent: 100 }],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const TwoLanguages: Story = {
  args: {
    languages: [
      { name: 'TypeScript', percent: 68 },
      { name: 'JavaScript', percent: 32 },
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MultipleLanguages: Story = {
  args: {
    languages: [
      { name: 'TypeScript', percent: 45 },
      { name: 'JavaScript', percent: 25 },
      { name: 'Python', percent: 15 },
      { name: 'HTML', percent: 10 },
      { name: 'CSS', percent: 5 },
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutLegend: Story = {
  args: {
    languages: [
      { name: 'TypeScript', percent: 60 },
      { name: 'JavaScript', percent: 25 },
      { name: 'Python', percent: 15 },
    ],
    showLegend: false,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CustomColors: Story = {
  args: {
    languages: [
      { name: 'OKLCH', percent: 30, color: 'oklch(66.6% 0.159 303)' }, // purple
      { name: 'Hex', percent: 25, color: '#3b82f6' }, // blue
      { name: 'RGB', percent: 25, color: 'rgb(16, 185, 129)' }, // emerald
      { name: 'HSL', percent: 20, color: 'hsl(45, 93%, 47%)' }, // amber
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ManyLanguages: Story = {
  args: {
    languages: [
      { name: 'TypeScript', percent: 30 },
      { name: 'JavaScript', percent: 20 },
      { name: 'Python', percent: 15 },
      { name: 'Java', percent: 12 },
      { name: 'Go', percent: 10 },
      { name: 'Rust', percent: 8 },
      { name: 'Ruby', percent: 5 },
    ],
    showLegend: true,
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
