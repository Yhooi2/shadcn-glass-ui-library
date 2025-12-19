import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TrustScoreCardGlass } from './trust-score-card-glass';

const meta = {
  title: 'Components/Sections/TrustScoreCardGlass',
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
      { title: 'Regularity', value: 84, variant: 'success' },
      { title: 'Diversity', value: 78, variant: 'default' },
      { title: 'Impact', value: 45, variant: 'warning' },
      { title: 'Collaboration', value: 12, variant: 'destructive' },
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
      { title: 'Regularity', value: 95, variant: 'success' },
      { title: 'Diversity', value: 88, variant: 'default' },
      { title: 'Impact', value: 91, variant: 'success' },
      { title: 'Collaboration', value: 94, variant: 'success' },
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
      { title: 'Regularity', value: 35, variant: 'warning' },
      { title: 'Diversity', value: 22, variant: 'destructive' },
      { title: 'Impact', value: 18, variant: 'destructive' },
      { title: 'Collaboration', value: 38, variant: 'warning' },
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
      { title: 'Regularity', value: 62, variant: 'default' },
      { title: 'Diversity', value: 48, variant: 'warning' },
      { title: 'Impact', value: 55, variant: 'default' },
      { title: 'Collaboration', value: 55, variant: 'default' },
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
      { title: 'Regularity', value: 100, variant: 'success' },
      { title: 'Diversity', value: 100, variant: 'success' },
      { title: 'Impact', value: 100, variant: 'success' },
      { title: 'Collaboration', value: 100, variant: 'success' },
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
      { title: 'Regularity', value: 0, variant: 'destructive' },
      { title: 'Diversity', value: 0, variant: 'destructive' },
      { title: 'Impact', value: 0, variant: 'destructive' },
      { title: 'Collaboration', value: 0, variant: 'destructive' },
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
      { title: 'Code Quality', value: 75, variant: 'default' },
      { title: 'Documentation', value: 55, variant: 'warning' },
    ],
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
