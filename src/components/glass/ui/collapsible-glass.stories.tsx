import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { CollapsibleGlass } from './collapsible-glass';
import { ButtonGlass } from './button-glass';

const meta: Meta<typeof CollapsibleGlass.Root> = {
  title: 'Components/Core/CollapsibleGlass',
  component: CollapsibleGlass.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <CollapsibleGlass.Root open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <CollapsibleGlass.Trigger asChild>
            <ButtonGlass variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </ButtonGlass>
          </CollapsibleGlass.Trigger>
        </div>
        <div className="rounded-md border border-[var(--glass-border)] px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleGlass.Content className="space-y-2">
          <div className="rounded-md border border-[var(--glass-border)] px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border border-[var(--glass-border)] px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleGlass.Content>
      </CollapsibleGlass.Root>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <CollapsibleGlass.Root className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">FAQ: What is Glass UI?</h4>
        <CollapsibleGlass.Trigger asChild>
          <ButtonGlass variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </ButtonGlass>
        </CollapsibleGlass.Trigger>
      </div>
      <CollapsibleGlass.Content>
        <div className="rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-sm">
          Glass UI is a modern glassmorphism component library built with React and Tailwind CSS. It
          provides 57+ components with full TypeScript support and accessibility features.
        </div>
      </CollapsibleGlass.Content>
    </CollapsibleGlass.Root>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <CollapsibleGlass.Root defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Advanced Settings</h4>
        <CollapsibleGlass.Trigger asChild>
          <ButtonGlass variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </ButtonGlass>
        </CollapsibleGlass.Trigger>
      </div>
      <CollapsibleGlass.Content>
        <div className="rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Debug Mode</span>
            <span className="text-xs text-muted-foreground">Disabled</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Verbose Logging</span>
            <span className="text-xs text-muted-foreground">Disabled</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Experimental Features</span>
            <span className="text-xs text-muted-foreground">Disabled</span>
          </div>
        </div>
      </CollapsibleGlass.Content>
    </CollapsibleGlass.Root>
  ),
};
