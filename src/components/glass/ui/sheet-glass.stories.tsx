/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  SheetGlass,
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './sheet-glass';
import { ButtonGlass } from './button-glass';
import { InputGlass } from './input-glass';

const meta: Meta<typeof SheetGlass.Root> = {
  title: 'Components/Overlay/SheetGlass',
  component: SheetGlass.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Glass-themed sheet/drawer component with full shadcn/ui Sheet API compatibility. Slides in from top, right, bottom, or left edges with backdrop overlay and blur effects.

## Features
- 4 slide directions: top, right, bottom, left
- Backdrop overlay with blur effect and click-to-close
- Auto close button in corner (optional via showCloseButton)
- ESC key and click-outside to dismiss
- Focus trap and keyboard navigation
- Portal rendering (always in document.body)
- Controlled and uncontrolled modes
- 100% shadcn/ui compatible API
- Theme-aware glass styling via CSS variables

## Sub-Components
- **SheetGlass.Root / Sheet**: Sheet root with open/onOpenChange state
- **SheetGlass.Trigger / SheetTrigger**: Opens sheet when clicked (supports asChild)
- **SheetGlass.Portal / SheetPortal**: Renders children into portal
- **SheetGlass.Overlay / SheetOverlay**: Backdrop with glass blur effect
- **SheetGlass.Content / SheetContent**: Main container with side prop and glass styling
- **SheetGlass.Header / SheetHeader**: Header section with flex layout
- **SheetGlass.Title / SheetTitle**: Sheet title with accessibility
- **SheetGlass.Description / SheetDescription**: Sheet description text
- **SheetGlass.Footer / SheetFooter**: Footer with action buttons layout
- **SheetGlass.Close / SheetClose**: Closes sheet when clicked (supports asChild)

## CSS Variables
Uses ModalGlass CSS variables for consistent styling:
- \`--modal-bg\`: Sheet background color (glass effect)
- \`--modal-border\`: Sheet border color
- \`--modal-glow\`: Sheet shadow/glow effect
- \`--modal-glow-effect\`: Inner glow layer
- \`--modal-overlay\`: Backdrop overlay color
- \`--modal-close-btn-bg\`: Close button background
- \`--modal-close-btn-border\`: Close button border

## Usage Pattern
\`\`\`tsx
// Navigation drawer (left)
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass>Menu</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content side="left">
    <SheetGlass.Header>
      <SheetGlass.Title>Navigation</SheetGlass.Title>
    </SheetGlass.Header>
    <nav>...</nav>
  </SheetGlass.Content>
</SheetGlass.Root>

// Filters panel (right)
<SheetGlass.Root>
  <SheetGlass.Trigger asChild>
    <ButtonGlass variant="outline">Filters</ButtonGlass>
  </SheetGlass.Trigger>
  <SheetGlass.Content side="right">
    <SheetGlass.Header>
      <SheetGlass.Title>Filter Options</SheetGlass.Title>
    </SheetGlass.Header>
    <div>Filter controls...</div>
  </SheetGlass.Content>
</SheetGlass.Root>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onOpenChange: {
      description: 'Callback when open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800 p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SheetGlass.Root>;

/**
 * Default sheet sliding from the right with form inputs.
 * Common use case: Edit profile, settings panels.
 */
export const Default: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass>Open Sheet</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content>
        <SheetGlass.Header>
          <SheetGlass.Title>Edit Profile</SheetGlass.Title>
          <SheetGlass.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetGlass.Description>
        </SheetGlass.Header>
        <div className="flex-1 py-4 space-y-4">
          <InputGlass label="Name" placeholder="John Doe" />
          <InputGlass label="Email" type="email" placeholder="john@example.com" />
          <InputGlass label="Username" placeholder="@johndoe" />
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

/**
 * Navigation drawer sliding from the left.
 * Common use case: Mobile menu, sidebar navigation.
 */
export const LeftSide: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="secondary">Open Navigation</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content side="left">
        <SheetGlass.Header>
          <SheetGlass.Title>Navigation</SheetGlass.Title>
          <SheetGlass.Description>Browse the main menu</SheetGlass.Description>
        </SheetGlass.Header>
        <nav className="flex-1 py-4 space-y-2">
          <a
            href="#"
            className="block p-3 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: 'var(--text-primary)' }}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block p-3 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: 'var(--text-primary)' }}
          >
            Projects
          </a>
          <a
            href="#"
            className="block p-3 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: 'var(--text-primary)' }}
          >
            Settings
          </a>
          <a
            href="#"
            className="block p-3 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: 'var(--text-primary)' }}
          >
            Profile
          </a>
        </nav>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

/**
 * Search panel sliding from the top.
 * Common use case: Search bars, command palettes, notifications.
 */
export const TopSide: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="outline">Open Search</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content side="top">
        <SheetGlass.Header>
          <SheetGlass.Title>Search</SheetGlass.Title>
          <SheetGlass.Description>Find anything in your workspace</SheetGlass.Description>
        </SheetGlass.Header>
        <div className="py-4">
          <InputGlass placeholder="Type to search..." className="w-full" />
        </div>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

/**
 * Actions menu sliding from the bottom.
 * Common use case: Mobile action sheets, context menus, iOS-style pickers.
 */
export const BottomSide: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass variant="outline">Open Actions</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content side="bottom">
        <SheetGlass.Header>
          <SheetGlass.Title>Actions</SheetGlass.Title>
          <SheetGlass.Description>Choose an action for this item</SheetGlass.Description>
        </SheetGlass.Header>
        <div className="py-4 space-y-2">
          <ButtonGlass className="w-full justify-start" variant="ghost">
            Share
          </ButtonGlass>
          <ButtonGlass className="w-full justify-start" variant="ghost">
            Copy Link
          </ButtonGlass>
          <ButtonGlass className="w-full justify-start" variant="ghost">
            Download
          </ButtonGlass>
          <ButtonGlass className="w-full justify-start" variant="destructive">
            Delete
          </ButtonGlass>
        </div>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

/**
 * Demonstration of all 4 slide directions: top, right, bottom, left.
 * Each direction suitable for different use cases.
 */
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
            <p className="py-4" style={{ color: 'var(--text-secondary)' }}>
              Content slides in from the {side} edge of the screen.
            </p>
          </SheetGlass.Content>
        </SheetGlass.Root>
      ))}
    </div>
  ),
};

/**
 * Controlled mode with external state management.
 * Open and close the sheet programmatically from outside.
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <ButtonGlass onClick={() => setOpen(true)}>Open Sheet</ButtonGlass>
          <ButtonGlass variant="outline" onClick={() => setOpen(false)}>
            Close Sheet
          </ButtonGlass>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>Sheet is: {open ? 'Open' : 'Closed'}</p>

        <SheetGlass.Root open={open} onOpenChange={setOpen}>
          <SheetGlass.Content>
            <SheetGlass.Header>
              <SheetGlass.Title>Controlled Sheet</SheetGlass.Title>
              <SheetGlass.Description>
                This sheet&apos;s open state is controlled externally.
              </SheetGlass.Description>
            </SheetGlass.Header>
            <p className="py-4" style={{ color: 'var(--text-secondary)' }}>
              Use the buttons outside to control this sheet.
            </p>
            <SheetGlass.Footer>
              <ButtonGlass onClick={() => setOpen(false)}>Done</ButtonGlass>
            </SheetGlass.Footer>
          </SheetGlass.Content>
        </SheetGlass.Root>
      </div>
    );
  },
};

/**
 * Sheet without the X close button in the corner.
 * User must use footer button or press Escape to close.
 */
export const NoCloseButton: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass>Open Sheet</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content showCloseButton={false}>
        <SheetGlass.Header>
          <SheetGlass.Title>No Close Button</SheetGlass.Title>
          <SheetGlass.Description>
            Use the footer button or press Escape to close.
          </SheetGlass.Description>
        </SheetGlass.Header>
        <p className="flex-1 py-4" style={{ color: 'var(--text-secondary)' }}>
          This sheet doesn&apos;t have the X button in the corner.
        </p>
        <SheetGlass.Footer>
          <SheetGlass.Close asChild>
            <ButtonGlass>Close</ButtonGlass>
          </SheetGlass.Close>
        </SheetGlass.Footer>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};

/**
 * Using shadcn/ui compatible import aliases.
 * Import as: Sheet, SheetContent, SheetTrigger, etc.
 */
export const ShadcnUICompatible: Story = {
  name: 'shadcn/ui Compatible',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <ButtonGlass>Open (shadcn/ui API)</ButtonGlass>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>shadcn/ui Compatible</SheetTitle>
          <SheetDescription>
            This example uses the shadcn/ui compatible import aliases.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4">
          <p style={{ color: 'var(--text-secondary)' }}>
            Import using:{' '}
            <code className="px-1 bg-white/10 rounded">Sheet, SheetContent, SheetTrigger</code>
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <ButtonGlass variant="ghost">Cancel</ButtonGlass>
          </SheetClose>
          <ButtonGlass>Save</ButtonGlass>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet with long scrollable content.
 * Content area scrolls independently while header/footer remain fixed.
 */
export const ScrollableContent: Story = {
  render: () => (
    <SheetGlass.Root>
      <SheetGlass.Trigger asChild>
        <ButtonGlass>Open Long Content</ButtonGlass>
      </SheetGlass.Trigger>
      <SheetGlass.Content>
        <SheetGlass.Header>
          <SheetGlass.Title>Terms of Service</SheetGlass.Title>
          <SheetGlass.Description>Please read and accept our terms.</SheetGlass.Description>
        </SheetGlass.Header>
        <div className="flex-1 py-4 overflow-auto" style={{ color: 'var(--text-secondary)' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
        <SheetGlass.Footer>
          <SheetGlass.Close asChild>
            <ButtonGlass variant="ghost">Decline</ButtonGlass>
          </SheetGlass.Close>
          <ButtonGlass>Accept</ButtonGlass>
        </SheetGlass.Footer>
      </SheetGlass.Content>
    </SheetGlass.Root>
  ),
};
