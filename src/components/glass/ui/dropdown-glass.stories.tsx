import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import {
  User,
  Settings,
  LogOut,
  Edit,
  Copy,
  Trash,
  ChevronDown,
  Bell,
  Heart,
  Star,
  Share,
} from 'lucide-react';
import { DropdownGlass, type DropdownItem } from './dropdown-glass';
import { ButtonGlass } from './button-glass';

/**
 * DropdownGlass Stories
 *
 * Demonstrates the DropdownGlass component with various configurations:
 * - Simple API with items prop (quick setup)
 * - Compound API for advanced use cases (see dropdown-menu-glass.stories.tsx)
 * - Left and right alignment options
 * - Icon and text-only items
 * - Danger/destructive item variant
 * - Dividers for visual grouping
 */

const meta = {
  title: 'Components/Navigation/DropdownGlass',
  component: DropdownGlass,
  parameters: {
    layout: 'centered',
    snapshot: {
      disable: false,
    },
    tags: ['autodocs'],
    docs: {
      description: {
        component: `
Glass-themed dropdown menu with simple and compound APIs.

## Features
- **Two APIs:** Simple (items prop) and Compound (DropdownMenuGlass.*)
- **Glass Styling:** Theme-aware glassmorphism with backdrop blur
- **Alignment:** Left or right positioning
- **Icons:** Optional icon support for menu items
- **Danger Variant:** Red destructive item styling
- **Dividers:** Visual grouping with separators
- **Accessibility:** Keyboard navigation, focus management, screen reader support

## CSS Variables
\`\`\`css
--dropdown-bg           /* Background color */
--dropdown-border       /* Border color */
--dropdown-item-hover   /* Item hover background */
--dropdown-item-text    /* Item text color */
--dropdown-icon         /* Icon color */
--dropdown-icon-hover   /* Icon color on hover */
--dropdown-divider      /* Divider background */
--dropdown-glow         /* Box shadow with glow */
\`\`\`

## Usage
\`\`\`tsx
import { DropdownGlass } from '@/components/glass/ui/dropdown-glass';

<DropdownGlass
  trigger={<ButtonGlass>Menu</ButtonGlass>}
  items={[
    { label: 'Edit', icon: Edit, onClick: handleEdit },
    { divider: true },
    { label: 'Delete', icon: Trash, onClick: handleDelete, danger: true }
  ]}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The alignment of the dropdown menu',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[300px] flex items-start justify-center pt-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// DROPDOWN ITEMS CONFIGURATION
// Reference: .claude/tepm/first
// Glass theme: rgba(255,255,255,0.08) bg, rgba(255,255,255,0.15) border
// Box-shadow: 0 15px 50px rgba(168,85,247,0.25), inset 0 1px 0 rgba(255,255,255,0.10)
// Backdrop-filter: blur(20px)
// ========================================

const defaultItems: DropdownItem[] = [
  { label: 'Profile', icon: User, onClick: () => console.log('Profile') },
  {
    label: 'Settings',
    icon: Settings,
    onClick: () => console.log('Settings'),
  },
  { divider: true },
  {
    label: 'Sign out',
    icon: LogOut,
    danger: true,
    onClick: () => console.log('Sign out'),
  },
];

const editItems: DropdownItem[] = [
  { label: 'Edit', icon: Edit, onClick: () => console.log('Edit') },
  { label: 'Copy', icon: Copy, onClick: () => console.log('Copy') },
  { divider: true },
  {
    label: 'Delete',
    icon: Trash,
    danger: true,
    onClick: () => console.log('Delete'),
  },
];

const manyItems: DropdownItem[] = [
  { label: 'Profile', icon: User, onClick: () => {} },
  { label: 'Settings', icon: Settings, onClick: () => {} },
  { label: 'Notifications', icon: Bell, onClick: () => {} },
  { label: 'Favorites', icon: Heart, onClick: () => {} },
  { divider: true },
  { label: 'Starred', icon: Star, onClick: () => {} },
  { label: 'Share', icon: Share, onClick: () => {} },
  { divider: true },
  { label: 'Sign out', icon: LogOut, danger: true, onClick: () => {} },
];

// ========================================
// CLOSED STATE TESTS - Trigger styling
// ========================================

export const Default: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="secondary" className="flex items-center gap-2">
        Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Closed dropdown trigger with glass effect
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AlignRight: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'right',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const PrimaryTrigger: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="default" className="flex items-center gap-2">
        Options
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// OPEN STATE TESTS - Menu styling (Critical for glass theme)
// ========================================

export const OpenedDefault: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="secondary" className="flex items-center gap-2">
        Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        // Radix Portal adds aria-hidden to parent containers, which is normal
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Use getByText to find the button by its text content
    const trigger = canvas.getByText('Menu');

    // Open dropdown
    await userEvent.click(trigger);

    // Wait for animation
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Open dropdown with glass styling
    // Background: rgba(255,255,255,0.08)
    // Border: 1px solid rgba(255,255,255,0.15)
    // Box-shadow: 0 15px 50px rgba(168,85,247,0.25)
    // Menu is rendered in a Portal, so search in body
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

export const OpenedAlignRight: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'right',
  },
  parameters: {
    a11y: {
      config: {
        // Radix Portal adds aria-hidden to parent containers, which is normal
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Menu');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

export const OpenedWithEditActions: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Actions
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: editItems,
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        // Radix Portal adds aria-hidden to parent containers, which is normal
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Actions');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Edit actions with danger item (Delete)
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

export const OpenedWithManyItems: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Full Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: manyItems,
    align: 'left',
  },
  decorators: [
    (Story) => (
      <div className="min-h-[450px] flex items-start justify-center pt-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Full Menu');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Long menu with multiple dividers
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

export const OpenedTextOnly: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Simple Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: [
      { label: 'Option 1', onClick: () => console.log('Option 1') },
      { label: 'Option 2', onClick: () => console.log('Option 2') },
      { label: 'Option 3', onClick: () => console.log('Option 3') },
    ],
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Simple Menu');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Text-only items without icons
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

// ========================================
// ITEM STYLING TESTS - Hover, active, danger states
// ========================================

export const WithEditActions: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Actions
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: editItems,
    align: 'left',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const TextOnly: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Simple Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: [
      { label: 'Option 1', onClick: () => console.log('Option 1') },
      { label: 'Option 2', onClick: () => console.log('Option 2') },
      { label: 'Option 3', onClick: () => console.log('Option 3') },
    ],
    align: 'left',
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// COMPARISON TESTS - Side by side
// ========================================

export const BothAlignments: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Options
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
  },
  render: () => (
    <div className="flex gap-8">
      <DropdownGlass
        trigger={
          <ButtonGlass variant="ghost" className="flex items-center gap-2">
            Left Align
            <ChevronDown className="w-4 h-4" />
          </ButtonGlass>
        }
        items={defaultItems}
        align="left"
      />
      <DropdownGlass
        trigger={
          <ButtonGlass variant="ghost" className="flex items-center gap-2">
            Right Align
            <ChevronDown className="w-4 h-4" />
          </ButtonGlass>
        }
        items={defaultItems}
        align="right"
      />
    </div>
  ),
  async play({ canvasElement }) {
    // Visual snapshot test - Both alignments side by side
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const LeftAlignOpened: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Left Align
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  render: () => (
    <div className="flex gap-32">
      <DropdownGlass
        trigger={
          <ButtonGlass variant="ghost" className="flex items-center gap-2">
            Left Align
            <ChevronDown className="w-4 h-4" />
          </ButtonGlass>
        }
        items={defaultItems}
        align="left"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="min-h-[350px] w-[400px] flex items-start justify-start pt-4 pl-4">
        <Story />
      </div>
    ),
  ],
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Left Align');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Left aligned dropdown open
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

export const RightAlignOpened: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Right Align
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'right',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  render: () => (
    <div className="flex gap-32 justify-end">
      <DropdownGlass
        trigger={
          <ButtonGlass variant="ghost" className="flex items-center gap-2">
            Right Align
            <ChevronDown className="w-4 h-4" />
          </ButtonGlass>
        }
        items={defaultItems}
        align="right"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="min-h-[350px] w-[400px] flex items-start justify-end pt-4 pr-4">
        <Story />
      </div>
    ),
  ],
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Right Align');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Right aligned dropdown open
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

// ========================================
// GLASS THEME SPECIFIC TESTS
// ========================================

export const GlassMenuStyling: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Glass Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        // Radix Portal adds aria-hidden to parent containers, which is normal
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },

  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Glass Menu');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Full glass theme styling
    // Menu background: rgba(255,255,255,0.08)
    // Border: 1px solid rgba(255,255,255,0.15)
    // Box-shadow: 0 15px 50px rgba(168,85,247,0.25), inset 0 1px 0 rgba(255,255,255,0.10)
    // Backdrop-filter: blur(20px)
    // Item hover: rgba(255,255,255,0.12)
    // Divider: rgba(255,255,255,0.08)
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

export const DangerItemStyling: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Danger Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: [
      { label: 'Normal Item', icon: User, onClick: () => {} },
      { divider: true },
      { label: 'Delete Item', icon: Trash, danger: true, onClick: () => {} },
      { label: 'Sign Out', icon: LogOut, danger: true, onClick: () => {} },
    ],
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Danger Menu');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Danger items color: #fb7185
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

export const AnimationTest: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="ghost" className="flex items-center gap-2">
        Animated Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        // Radix Portal adds aria-hidden to parent containers, which is normal
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },

  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Animated Menu');

    await userEvent.click(trigger);
    // Capture at animation midpoint
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Visual snapshot test - Animation: dropdownFadeIn 0.2s ease-out
    // from: opacity 0, translateY(-8px) scale(0.96)
    // to: opacity 1, translateY(0) scale(1)
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};

// ========================================
// SECONDARY BUTTON VARIANT - Glass effect on trigger
// ========================================

export const SecondaryTrigger: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="secondary" className="flex items-center gap-2">
        Glass Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  async play({ canvasElement }) {
    // Visual snapshot test - Secondary (glass) trigger button
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const SecondaryTriggerOpened: Story = {
  args: {
    trigger: (
      <ButtonGlass variant="secondary" className="flex items-center gap-2">
        Glass Menu
        <ChevronDown className="w-4 h-4" />
      </ButtonGlass>
    ),
    items: defaultItems,
    align: 'left',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
      tags: ['autodocs'],
    },
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByText('Glass Menu');

    await userEvent.click(trigger);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Visual snapshot test - Glass button with opened dropdown
    await expect(body.getByRole('menu')).toBeInTheDocument();
  },
};
