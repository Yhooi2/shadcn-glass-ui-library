/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassCheckboxItem,
  DropdownMenuGlassRadioItem,
  DropdownMenuGlassLabel,
  DropdownMenuGlassSeparator,
  DropdownMenuGlassShortcut,
  DropdownMenuGlassGroup,
  DropdownMenuGlassSub,
  DropdownMenuGlassSubContent,
  DropdownMenuGlassSubTrigger,
  DropdownMenuGlassRadioGroup,
} from './dropdown-menu-glass';
import { ButtonGlass } from './button-glass';
import {
  User,
  Settings,
  LogOut,
  Edit,
  Copy,
  Trash,
  Mail,
  MessageSquare,
  Plus,
  FileText,
  Folder,
  Star,
  Clock,
  Check,
} from 'lucide-react';

const meta: Meta<typeof DropdownMenuGlass> = {
  title: 'Components/Navigation/DropdownMenuGlass',
  component: DropdownMenuGlass,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DropdownMenuGlass is a compound component that provides a glass-themed dropdown menu with full shadcn/ui DropdownMenu API compatibility.

## Features

- **Compound Component API** - Root, Trigger, Content, Item, and more sub-components
- **Radix UI Primitives** - Built on @radix-ui/react-dropdown-menu
- **Glassmorphism Styling** - Backdrop blur, glow effects, CSS variables
- **Theme Support** - Works with all 3 themes (glass, light, aurora)
- **shadcn/ui Compatible** - Drop-in replacement for shadcn/ui DropdownMenu
- **Rich Features** - Checkboxes, radio groups, sub-menus, labels, separators
- **Keyboard Accessible** - Full keyboard navigation (Tab, Arrow keys, Enter, Escape)

## Sub-Components

- **DropdownMenuGlass** - Root context provider
- **DropdownMenuGlassTrigger** - Opens menu when clicked (supports asChild)
- **DropdownMenuGlassContent** - Main menu container with glass styling
- **DropdownMenuGlassItem** - Individual menu item (supports variant prop)
- **DropdownMenuGlassCheckboxItem** - Checkbox menu item with checked state
- **DropdownMenuGlassRadioItem** - Radio button menu item
- **DropdownMenuGlassRadioGroup** - Container for radio items
- **DropdownMenuGlassLabel** - Label for menu sections
- **DropdownMenuGlassSeparator** - Visual divider
- **DropdownMenuGlassGroup** - Groups related items
- **DropdownMenuGlassSub** - Sub-menu context
- **DropdownMenuGlassSubTrigger** - Opens sub-menu
- **DropdownMenuGlassSubContent** - Sub-menu content
- **DropdownMenuGlassShortcut** - Keyboard shortcut display

## Usage

\`\`\`tsx
<DropdownMenuGlass>
  <DropdownMenuGlassTrigger asChild>
    <ButtonGlass>Open Menu</ButtonGlass>
  </DropdownMenuGlassTrigger>
  <DropdownMenuGlassContent>
    <DropdownMenuGlassItem>Profile</DropdownMenuGlassItem>
    <DropdownMenuGlassItem>Settings</DropdownMenuGlassItem>
    <DropdownMenuGlassSeparator />
    <DropdownMenuGlassItem variant="destructive">Log out</DropdownMenuGlassItem>
  </DropdownMenuGlassContent>
</DropdownMenuGlass>
\`\`\`

## Accessibility

Built on @radix-ui/react-dropdown-menu with full WCAG 2.1 AA compliance:
- Keyboard: Tab, Arrow keys, Enter to select, Escape to close
- Screen Readers: role="menu", aria-haspopup, aria-expanded
- Focus Management: Auto-focus on open, return focus on close
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DropdownMenuGlass>;

// ========================================
// BASIC EXAMPLES
// ========================================

export const Basic: Story = {
  render: () => (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass>Open Menu</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent>
        <DropdownMenuGlassItem>Profile</DropdownMenuGlassItem>
        <DropdownMenuGlassItem>Settings</DropdownMenuGlassItem>
        <DropdownMenuGlassItem>Billing</DropdownMenuGlassItem>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">Log out</DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass variant="outline">
          <User className="h-4 w-4 mr-2" />
          Account
        </ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent>
        <DropdownMenuGlassItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassItem>
          <Mail className="mr-2 h-4 w-4" />
          <span>Messages</span>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass variant="outline">Actions</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassItem>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
          <DropdownMenuGlassShortcut>⌘E</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassItem>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy</span>
          <DropdownMenuGlassShortcut>⌘C</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassItem>
          <FileText className="mr-2 h-4 w-4" />
          <span>New File</span>
          <DropdownMenuGlassShortcut>⌘N</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
          <DropdownMenuGlassShortcut>⌘⌫</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass>Options</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassLabel>My Account</DropdownMenuGlassLabel>
        <DropdownMenuGlassGroup>
          <DropdownMenuGlassItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuGlassItem>
        </DropdownMenuGlassGroup>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassLabel>Actions</DropdownMenuGlassLabel>
        <DropdownMenuGlassGroup>
          <DropdownMenuGlassItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Item</span>
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Send Message</span>
          </DropdownMenuGlassItem>
        </DropdownMenuGlassGroup>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  ),
};

// ========================================
// ADVANCED EXAMPLES
// ========================================

export const WithCheckboxItems: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    return (
      <DropdownMenuGlass>
        <DropdownMenuGlassTrigger asChild>
          <ButtonGlass variant="outline">View</ButtonGlass>
        </DropdownMenuGlassTrigger>
        <DropdownMenuGlassContent className="w-56">
          <DropdownMenuGlassLabel>Appearance</DropdownMenuGlassLabel>
          <DropdownMenuGlassSeparator />
          <DropdownMenuGlassCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            Status Bar
          </DropdownMenuGlassCheckboxItem>
          <DropdownMenuGlassCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </DropdownMenuGlassCheckboxItem>
          <DropdownMenuGlassCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            Panel
          </DropdownMenuGlassCheckboxItem>
        </DropdownMenuGlassContent>
      </DropdownMenuGlass>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [position, setPosition] = useState('bottom');

    return (
      <DropdownMenuGlass>
        <DropdownMenuGlassTrigger asChild>
          <ButtonGlass variant="outline">Panel Position</ButtonGlass>
        </DropdownMenuGlassTrigger>
        <DropdownMenuGlassContent className="w-56">
          <DropdownMenuGlassLabel>Panel Position</DropdownMenuGlassLabel>
          <DropdownMenuGlassSeparator />
          <DropdownMenuGlassRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuGlassRadioItem value="top">Top</DropdownMenuGlassRadioItem>
            <DropdownMenuGlassRadioItem value="bottom">Bottom</DropdownMenuGlassRadioItem>
            <DropdownMenuGlassRadioItem value="right">Right</DropdownMenuGlassRadioItem>
          </DropdownMenuGlassRadioGroup>
        </DropdownMenuGlassContent>
      </DropdownMenuGlass>
    );
  },
};

export const WithSubMenus: Story = {
  render: () => (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass>File</ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56">
        <DropdownMenuGlassItem>
          <FileText className="mr-2 h-4 w-4" />
          <span>New File</span>
          <DropdownMenuGlassShortcut>⌘N</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassSub>
          <DropdownMenuGlassSubTrigger>
            <Plus className="mr-2 h-4 w-4" />
            <span>More Tools</span>
          </DropdownMenuGlassSubTrigger>
          <DropdownMenuGlassSubContent>
            <DropdownMenuGlassItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuGlassItem>
            <DropdownMenuGlassItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuGlassItem>
            <DropdownMenuGlassSeparator />
            <DropdownMenuGlassSub>
              <DropdownMenuGlassSubTrigger>
                <Folder className="mr-2 h-4 w-4" />
                <span>Recent</span>
              </DropdownMenuGlassSubTrigger>
              <DropdownMenuGlassSubContent>
                <DropdownMenuGlassItem>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Last Hour</span>
                </DropdownMenuGlassItem>
                <DropdownMenuGlassItem>
                  <Star className="mr-2 h-4 w-4" />
                  <span>Favorites</span>
                </DropdownMenuGlassItem>
              </DropdownMenuGlassSubContent>
            </DropdownMenuGlassSub>
          </DropdownMenuGlassSubContent>
        </DropdownMenuGlassSub>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy</span>
          <DropdownMenuGlassShortcut>⌘C</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassItem>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
          <DropdownMenuGlassShortcut>⌘E</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
          <DropdownMenuGlassShortcut>⌘⌫</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  ),
};

export const Complex: Story = {
  name: 'Complex (Kitchen Sink)',
  render: () => {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [showFullUrls, setShowFullUrls] = useState(false);
    const [person, setPerson] = useState('pedro');

    return (
      <DropdownMenuGlass>
        <DropdownMenuGlassTrigger asChild>
          <ButtonGlass>All Features</ButtonGlass>
        </DropdownMenuGlassTrigger>
        <DropdownMenuGlassContent className="w-64">
          <DropdownMenuGlassLabel>Navigation</DropdownMenuGlassLabel>
          <DropdownMenuGlassGroup>
            <DropdownMenuGlassItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuGlassShortcut>⇧⌘P</DropdownMenuGlassShortcut>
            </DropdownMenuGlassItem>
            <DropdownMenuGlassItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuGlassShortcut>⌘,</DropdownMenuGlassShortcut>
            </DropdownMenuGlassItem>
          </DropdownMenuGlassGroup>

          <DropdownMenuGlassSeparator />

          <DropdownMenuGlassLabel>View Options</DropdownMenuGlassLabel>
          <DropdownMenuGlassCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            <Star className="mr-2 h-4 w-4" />
            Show Bookmarks Bar
          </DropdownMenuGlassCheckboxItem>
          <DropdownMenuGlassCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>
            <Check className="mr-2 h-4 w-4" />
            Show Full URLs
          </DropdownMenuGlassCheckboxItem>

          <DropdownMenuGlassSeparator />

          <DropdownMenuGlassLabel>People</DropdownMenuGlassLabel>
          <DropdownMenuGlassRadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenuGlassRadioItem value="pedro">Pedro Duarte</DropdownMenuGlassRadioItem>
            <DropdownMenuGlassRadioItem value="colm">Colm Tuite</DropdownMenuGlassRadioItem>
          </DropdownMenuGlassRadioGroup>

          <DropdownMenuGlassSeparator />

          <DropdownMenuGlassSub>
            <DropdownMenuGlassSubTrigger>
              <Plus className="mr-2 h-4 w-4" />
              <span>More Options</span>
            </DropdownMenuGlassSubTrigger>
            <DropdownMenuGlassSubContent>
              <DropdownMenuGlassItem>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </DropdownMenuGlassItem>
              <DropdownMenuGlassItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </DropdownMenuGlassItem>
              <DropdownMenuGlassSeparator />
              <DropdownMenuGlassItem>
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </DropdownMenuGlassItem>
            </DropdownMenuGlassSubContent>
          </DropdownMenuGlassSub>

          <DropdownMenuGlassSeparator />

          <DropdownMenuGlassItem variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuGlassShortcut>⇧⌘Q</DropdownMenuGlassShortcut>
          </DropdownMenuGlassItem>
        </DropdownMenuGlassContent>
      </DropdownMenuGlass>
    );
  },
};

// ========================================
// USE CASES
// ========================================

export const UserMenu: Story = {
  name: 'Use Case: User Menu',
  render: () => (
    <DropdownMenuGlass>
      <DropdownMenuGlassTrigger asChild>
        <ButtonGlass variant="ghost" className="relative h-10 w-10 rounded-full">
          <User className="h-5 w-5" />
        </ButtonGlass>
      </DropdownMenuGlassTrigger>
      <DropdownMenuGlassContent className="w-56" align="end" forceMount>
        <DropdownMenuGlassLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-[var(--text-muted)]">john@example.com</p>
          </div>
        </DropdownMenuGlassLabel>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassGroup>
          <DropdownMenuGlassItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuGlassShortcut>⇧⌘P</DropdownMenuGlassShortcut>
          </DropdownMenuGlassItem>
          <DropdownMenuGlassItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuGlassShortcut>⌘,</DropdownMenuGlassShortcut>
          </DropdownMenuGlassItem>
        </DropdownMenuGlassGroup>
        <DropdownMenuGlassSeparator />
        <DropdownMenuGlassItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuGlassShortcut>⇧⌘Q</DropdownMenuGlassShortcut>
        </DropdownMenuGlassItem>
      </DropdownMenuGlassContent>
    </DropdownMenuGlass>
  ),
};
