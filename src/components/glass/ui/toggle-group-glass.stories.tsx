import type { Meta, StoryObj } from '@storybook/react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Grid,
  List,
} from 'lucide-react';
import { ToggleGroupGlass } from './toggle-group-glass';

const meta: Meta<typeof ToggleGroupGlass.Root> = {
  title: 'Components/Core/ToggleGroupGlass',
  component: ToggleGroupGlass.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelection: Story = {
  render: () => (
    <ToggleGroupGlass.Root type="single" defaultValue="center" aria-label="Text alignment">
      <ToggleGroupGlass.Item value="left" aria-label="Left aligned">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="center" aria-label="Center aligned">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="right" aria-label="Right aligned">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="justify" aria-label="Justified">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupGlass.Item>
    </ToggleGroupGlass.Root>
  ),
};

export const MultipleSelection: Story = {
  render: () => (
    <ToggleGroupGlass.Root type="multiple" aria-label="Text formatting">
      <ToggleGroupGlass.Item value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupGlass.Item>
    </ToggleGroupGlass.Root>
  ),
};

export const OutlineVariant: Story = {
  render: () => (
    <ToggleGroupGlass.Root
      type="single"
      variant="outline"
      defaultValue="grid"
      aria-label="View mode"
    >
      <ToggleGroupGlass.Item value="grid" aria-label="Grid view">
        <Grid className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupGlass.Item>
    </ToggleGroupGlass.Root>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <ToggleGroupGlass.Root type="single" defaultValue="grid" aria-label="View mode">
      <ToggleGroupGlass.Item value="grid" className="gap-2">
        <Grid className="h-4 w-4" />
        <span className="text-sm">Grid</span>
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="list" className="gap-2">
        <List className="h-4 w-4" />
        <span className="text-sm">List</span>
      </ToggleGroupGlass.Item>
    </ToggleGroupGlass.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-muted-foreground">Small:</span>
        <ToggleGroupGlass.Root type="single" size="sm" defaultValue="center">
          <ToggleGroupGlass.Item value="left">
            <AlignLeft className="h-3 w-3" />
          </ToggleGroupGlass.Item>
          <ToggleGroupGlass.Item value="center">
            <AlignCenter className="h-3 w-3" />
          </ToggleGroupGlass.Item>
          <ToggleGroupGlass.Item value="right">
            <AlignRight className="h-3 w-3" />
          </ToggleGroupGlass.Item>
        </ToggleGroupGlass.Root>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-muted-foreground">Default:</span>
        <ToggleGroupGlass.Root type="single" size="default" defaultValue="center">
          <ToggleGroupGlass.Item value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupGlass.Item>
          <ToggleGroupGlass.Item value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupGlass.Item>
          <ToggleGroupGlass.Item value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupGlass.Item>
        </ToggleGroupGlass.Root>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-muted-foreground">Large:</span>
        <ToggleGroupGlass.Root type="single" size="lg" defaultValue="center">
          <ToggleGroupGlass.Item value="left">
            <AlignLeft className="h-5 w-5" />
          </ToggleGroupGlass.Item>
          <ToggleGroupGlass.Item value="center">
            <AlignCenter className="h-5 w-5" />
          </ToggleGroupGlass.Item>
          <ToggleGroupGlass.Item value="right">
            <AlignRight className="h-5 w-5" />
          </ToggleGroupGlass.Item>
        </ToggleGroupGlass.Root>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroupGlass.Root type="single" defaultValue="center" aria-label="Text alignment">
      <ToggleGroupGlass.Item value="left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="right" disabled>
        <AlignRight className="h-4 w-4" />
      </ToggleGroupGlass.Item>
      <ToggleGroupGlass.Item value="justify" disabled>
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupGlass.Item>
    </ToggleGroupGlass.Root>
  ),
};
