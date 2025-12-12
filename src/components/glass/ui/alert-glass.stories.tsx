import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { AlertGlass, AlertGlassTitle, AlertGlassDescription } from './alert-glass';

const meta = {
  title: 'Components/Feedback/AlertGlass',
  component: AlertGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info', 'error'],
      description:
        "Alert variant (shadcn/ui compatible + Glass UI extended). Note: 'info' and 'error' are aliases.",
      table: {
        type: { summary: "'default' | 'destructive' | 'success' | 'warning' | 'info' | 'error'" },
        defaultValue: { summary: 'default' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    className: 'w-96',
  },
} satisfies Meta<typeof AlertGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <AlertGlass {...args}>
      <AlertGlassTitle>Heads up!</AlertGlassTitle>
      <AlertGlassDescription>
        You can add components to your app using the cli.
      </AlertGlassDescription>
    </AlertGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <AlertGlass {...args}>
      <AlertGlassTitle>Error</AlertGlassTitle>
      <AlertGlassDescription>Your session has expired. Please log in again.</AlertGlassDescription>
    </AlertGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => (
    <AlertGlass {...args}>
      <AlertGlassTitle>Success</AlertGlassTitle>
      <AlertGlassDescription>Your changes have been saved successfully.</AlertGlassDescription>
    </AlertGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => (
    <AlertGlass {...args}>
      <AlertGlassTitle>Warning</AlertGlassTitle>
      <AlertGlassDescription>Your subscription expires in 3 days.</AlertGlassDescription>
    </AlertGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'default',
    dismissible: true,
    onDismiss: fn(),
  },
  render: (args) => (
    <AlertGlass {...args}>
      <AlertGlassTitle>Dismissible Alert</AlertGlassTitle>
      <AlertGlassDescription>Click the X button to dismiss this alert.</AlertGlassDescription>
    </AlertGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <AlertGlass {...args}>
      <AlertGlassDescription>This alert has no title, just a description.</AlertGlassDescription>
    </AlertGlass>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <AlertGlass variant="default">
        <AlertGlassTitle>Information</AlertGlassTitle>
        <AlertGlassDescription>This is an informational message.</AlertGlassDescription>
      </AlertGlass>
      <AlertGlass variant="destructive">
        <AlertGlassTitle>Error</AlertGlassTitle>
        <AlertGlassDescription>Something went wrong.</AlertGlassDescription>
      </AlertGlass>
      <AlertGlass variant="success">
        <AlertGlassTitle>Success</AlertGlassTitle>
        <AlertGlassDescription>Operation completed successfully.</AlertGlassDescription>
      </AlertGlass>
      <AlertGlass variant="warning">
        <AlertGlassTitle>Warning</AlertGlassTitle>
        <AlertGlassDescription>Please proceed with caution.</AlertGlassDescription>
      </AlertGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllDismissible: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <AlertGlass variant="default" dismissible>
        <AlertGlassTitle>Info</AlertGlassTitle>
        <AlertGlassDescription>Dismissible info alert.</AlertGlassDescription>
      </AlertGlass>
      <AlertGlass variant="destructive" dismissible>
        <AlertGlassTitle>Error</AlertGlassTitle>
        <AlertGlassDescription>Dismissible error alert.</AlertGlassDescription>
      </AlertGlass>
      <AlertGlass variant="success" dismissible>
        <AlertGlassTitle>Success</AlertGlassTitle>
        <AlertGlassDescription>Dismissible success alert.</AlertGlassDescription>
      </AlertGlass>
      <AlertGlass variant="warning" dismissible>
        <AlertGlassTitle>Warning</AlertGlassTitle>
        <AlertGlassDescription>Dismissible warning alert.</AlertGlassDescription>
      </AlertGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
