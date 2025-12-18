import type { Meta, StoryObj } from '@storybook/react';
import { Menu, Filter, Settings } from 'lucide-react';
import { SheetGlass } from './sheet-glass';
import { ButtonGlass } from './button-glass';
import { InputGlass } from './input-glass';
import { CheckboxGlass } from './checkbox-glass';

const meta: Meta<typeof SheetGlass.Root> = {
  title: 'Components/Overlay/SheetGlass',
  component: SheetGlass.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="outline">Open Sheet</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content>
        <SheetGlass.Header>
          <SheetGlass.Title>Edit Profile</SheetGlass.Title>
          <SheetGlass.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetGlass.Description>
        </SheetGlass.Header>
        <div className="grid gap-4 py-4">
          <InputGlass label="Name" defaultValue="John Doe" />
          <InputGlass label="Username" defaultValue="@johndoe" />
        </div>
        <SheetGlass.Footer>
          <SheetGlass.Close asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </SheetGlass.Close>
          <ButtonGlass>Save changes</ButtonGlass>
        </SheetGlass.Footer>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="outline">
          <Menu className="h-4 w-4 mr-2" />
          Menu
        </ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content side="left">
        <SheetGlass.Header>
          <SheetGlass.Title>Navigation</SheetGlass.Title>
        </SheetGlass.Header>
        <nav className="flex flex-col gap-2 py-4">
          <a href="#" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
            Home
          </a>
          <a href="#" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
            Dashboard
          </a>
          <a href="#" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
            Projects
          </a>
          <a href="#" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
            Settings
          </a>
        </nav>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

export const FilterPanel: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content>
        <SheetGlass.Header>
          <SheetGlass.Title>Filters</SheetGlass.Title>
          <SheetGlass.Description>Narrow down your search results.</SheetGlass.Description>
        </SheetGlass.Header>
        <div className="py-4 space-y-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Availability</h4>
            <CheckboxGlass label="In Stock" />
            <CheckboxGlass label="On Sale" />
            <CheckboxGlass label="Pre-order" />
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Category</h4>
            <CheckboxGlass label="Electronics" />
            <CheckboxGlass label="Clothing" />
            <CheckboxGlass label="Home & Garden" />
          </div>
        </div>
        <SheetGlass.Footer>
          <SheetGlass.Close asChild>
            <ButtonGlass variant="ghost">Reset</ButtonGlass>
          </SheetGlass.Close>
          <ButtonGlass>Apply Filters</ButtonGlass>
        </SheetGlass.Footer>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

export const BottomSheet: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="outline">Share</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content side="bottom">
        <SheetGlass.Header>
          <SheetGlass.Title>Share</SheetGlass.Title>
          <SheetGlass.Description>Share this content with others.</SheetGlass.Description>
        </SheetGlass.Header>
        <div className="grid grid-cols-4 gap-4 py-4">
          {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform) => (
            <button
              key={platform}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-lg">{platform[0]}</span>
              </div>
              <span className="text-xs">{platform}</span>
            </button>
          ))}
        </div>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

export const TopSheet: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Quick Settings
        </ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content side="top">
        <div className="flex items-center justify-between">
          <SheetGlass.Header className="flex-1">
            <SheetGlass.Title>Quick Settings</SheetGlass.Title>
          </SheetGlass.Header>
        </div>
        <div className="flex flex-wrap gap-4 py-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
            <span className="text-sm">WiFi</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
            <span className="text-sm">Bluetooth</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
            <span className="text-sm">Dark Mode</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
            <span className="text-sm">Airplane</span>
          </div>
        </div>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <SheetGlass.Root key={side}>
          <SheetGlass.Trigger asChild>
            <ButtonGlass variant="outline" className="capitalize">
              {side}
            </ButtonGlass>
          </SheetGlass.Trigger>
          <SheetGlass.Content side={side}>
            <SheetGlass.Header>
              <SheetGlass.Title className="capitalize">{side} Sheet</SheetGlass.Title>
              <SheetGlass.Description>This sheet slides in from the {side}.</SheetGlass.Description>
            </SheetGlass.Header>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Content goes here. You can add forms, navigation, or any other content.
              </p>
            </div>
          </SheetGlass.Content>
        </SheetGlass.Root>
      ))}
    </div>
  ),
};
