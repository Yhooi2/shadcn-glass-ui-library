import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TrustScoreCardGlass } from './glass/sections/trust-score-card-glass';

const meta = {
  title: 'Glass UI/Composite/TrustScoreCardGlass',
  component: TrustScoreCardGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    score: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Overall trust score (0-100)',
    },
    metrics: {
      description: 'Array of metric data to display below the score',
    },
  },
} satisfies Meta<typeof TrustScoreCardGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    score: 72,
    metrics: [
      { label: 'Regularity', value: 84, color: 'emerald' },
      { label: 'Diversity', value: 78, color: 'blue' },
      { label: 'Impact', value: 45, color: 'amber' },
      { label: 'Collaboration', value: 12, color: 'red' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const HighScore: Story = {
  args: {
    score: 92,
    metrics: [
      { label: 'Regularity', value: 95, color: 'emerald' },
      { label: 'Diversity', value: 88, color: 'blue' },
      { label: 'Impact', value: 91, color: 'emerald' },
      { label: 'Collaboration', value: 94, color: 'emerald' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LowScore: Story = {
  args: {
    score: 28,
    metrics: [
      { label: 'Regularity', value: 35, color: 'amber' },
      { label: 'Diversity', value: 22, color: 'red' },
      { label: 'Impact', value: 18, color: 'red' },
      { label: 'Collaboration', value: 38, color: 'amber' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const MediumScore: Story = {
  args: {
    score: 55,
    metrics: [
      { label: 'Regularity', value: 62, color: 'blue' },
      { label: 'Diversity', value: 48, color: 'amber' },
      { label: 'Impact', value: 55, color: 'blue' },
      { label: 'Collaboration', value: 55, color: 'blue' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutMetrics: Story = {
  args: {
    score: 72,
    metrics: [],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const PerfectScore: Story = {
  args: {
    score: 100,
    metrics: [
      { label: 'Regularity', value: 100, color: 'emerald' },
      { label: 'Diversity', value: 100, color: 'emerald' },
      { label: 'Impact', value: 100, color: 'emerald' },
      { label: 'Collaboration', value: 100, color: 'emerald' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ZeroScore: Story = {
  args: {
    score: 0,
    metrics: [
      { label: 'Regularity', value: 0, color: 'red' },
      { label: 'Diversity', value: 0, color: 'red' },
      { label: 'Impact', value: 0, color: 'red' },
      { label: 'Collaboration', value: 0, color: 'red' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const TwoMetrics: Story = {
  args: {
    score: 65,
    metrics: [
      { label: 'Code Quality', value: 75, color: 'blue' },
      { label: 'Documentation', value: 55, color: 'amber' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
