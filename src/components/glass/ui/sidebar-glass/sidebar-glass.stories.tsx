import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Settings,
  Users,
  FileText,
  Calendar,
  Mail,
  Bell,
  ChevronRight,
  Plus,
  Star,
  Folder,
  MoreHorizontal,
  LogOut,
  User,
  CreditCard,
  LifeBuoy,
  Cloud,
  Github,
  Command,
} from 'lucide-react';
import { SidebarGlass, useSidebar } from './index';
import { ButtonGlass } from '../button-glass';
import { InputGlass } from '../input-glass';
import { AvatarGlass, AvatarGlassImage, AvatarGlassFallback } from '../avatar-glass';
import {
  DropdownMenuGlass,
  DropdownMenuGlassTrigger,
  DropdownMenuGlassContent,
  DropdownMenuGlassItem,
  DropdownMenuGlassSeparator,
  DropdownMenuGlassLabel,
} from '../dropdown-menu-glass';

const meta: Meta = {
  title: 'Components/Core/SidebarGlass',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
SidebarGlass is a glassmorphism sidebar component with **100% shadcn/ui Sidebar API compatibility**.

## Features

- **Collapsible Modes**: \`offcanvas\`, \`icon\`, \`none\`
- **Variants**: \`sidebar\`, \`floating\`, \`inset\`
- **Side**: \`left\`, \`right\`
- **Mobile Support**: Automatic drawer on mobile
- **Keyboard Shortcut**: \`Cmd/Ctrl + B\` to toggle
- **Cookie Persistence**: Remembers open/closed state
- **Compound Components**: Full flexibility with composition

## Usage

\`\`\`tsx
import { SidebarGlass, useSidebar } from '@/components/glass/ui/sidebar-glass';

function App() {
  return (
    <SidebarGlass.Provider>
      <SidebarGlass.Root>
        <SidebarGlass.Header>Logo</SidebarGlass.Header>
        <SidebarGlass.Content>
          <SidebarGlass.Menu>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton>
                <Home /> Dashboard
              </SidebarGlass.MenuButton>
            </SidebarGlass.MenuItem>
          </SidebarGlass.Menu>
        </SidebarGlass.Content>
        <SidebarGlass.Footer>User</SidebarGlass.Footer>
      </SidebarGlass.Root>
      <SidebarGlass.Inset>
        <main>Content</main>
      </SidebarGlass.Inset>
    </SidebarGlass.Provider>
  );
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;

// ========================================
// HELPER COMPONENTS
// ========================================

function SidebarDemo({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-[600px] w-full">{children}</div>;
}

function DemoContent() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-4">
        <SidebarGlass.Trigger />
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
      </div>
      <div
        className="rounded-xl p-6 backdrop-blur-sm"
        style={{
          background: 'var(--semantic-surface-muted)',
          border: '1px solid var(--semantic-border-muted)',
        }}
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          Sidebar state:{' '}
          <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
            {state}
          </span>
        </p>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          Press{' '}
          <kbd
            className="rounded px-2 py-0.5 font-mono text-sm"
            style={{
              background: 'var(--semantic-surface-elevated)',
              color: 'var(--text-primary)',
            }}
          >
            ⌘B
          </kbd>{' '}
          to toggle the sidebar
        </p>
        <ButtonGlass onClick={toggleSidebar} className="mt-4">
          Toggle Sidebar
        </ButtonGlass>
      </div>
    </div>
  );
}

// ========================================
// STORIES
// ========================================

export const Default: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider>
        <SidebarGlass.Root>
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Acme Inc
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Group>
              <SidebarGlass.GroupLabel>Platform</SidebarGlass.GroupLabel>
              <SidebarGlass.GroupContent>
                <SidebarGlass.Menu>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton isActive tooltip="Dashboard">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Projects">
                      <Folder className="h-4 w-4" />
                      <span>Projects</span>
                    </SidebarGlass.MenuButton>
                    <SidebarGlass.MenuBadge>12</SidebarGlass.MenuBadge>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Team">
                      <Users className="h-4 w-4" />
                      <span>Team</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Calendar">
                      <Calendar className="h-4 w-4" />
                      <span>Calendar</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                </SidebarGlass.Menu>
              </SidebarGlass.GroupContent>
            </SidebarGlass.Group>

            <SidebarGlass.Separator />

            <SidebarGlass.Group>
              <SidebarGlass.GroupLabel>Settings</SidebarGlass.GroupLabel>
              <SidebarGlass.GroupContent>
                <SidebarGlass.Menu>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Notifications">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                </SidebarGlass.Menu>
              </SidebarGlass.GroupContent>
            </SidebarGlass.Group>
          </SidebarGlass.Content>

          <SidebarGlass.Footer>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="John Doe">
                  <AvatarGlass className="h-6 w-6">
                    <AvatarGlassFallback>JD</AvatarGlassFallback>
                  </AvatarGlass>
                  <span>John Doe</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Footer>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
};

export const CollapsibleIcon: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider defaultOpen={false}>
        <SidebarGlass.Root collapsible="icon">
          <SidebarGlass.Header>
            <div className="flex items-center justify-center">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton isActive tooltip="Dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Projects">
                  <Folder className="h-4 w-4" />
                  <span>Projects</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Team">
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Content>

          <SidebarGlass.Footer>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Profile">
                  <AvatarGlass className="h-6 w-6">
                    <AvatarGlassFallback>JD</AvatarGlassFallback>
                  </AvatarGlass>
                  <span>John Doe</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Footer>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only mode shows just icons when collapsed, with tooltips on hover.',
      },
    },
  },
};

export const CollapsibleOffcanvas: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider defaultOpen={false}>
        <SidebarGlass.Root collapsible="offcanvas">
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Acme Inc
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton isActive>
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton>
                  <Folder className="h-4 w-4" />
                  <span>Projects</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton>
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Content>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Offcanvas mode completely hides the sidebar when collapsed.',
      },
    },
  },
};

export const FloatingVariant: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider>
        <SidebarGlass.Root variant="floating">
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Floating
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton isActive tooltip="Dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Projects">
                  <Folder className="h-4 w-4" />
                  <span>Projects</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Content>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Floating variant adds rounded corners and margin, giving a card-like appearance.',
      },
    },
  },
};

export const InsetVariant: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider>
        <SidebarGlass.Root variant="inset">
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Inset
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton isActive>
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton>
                  <Folder className="h-4 w-4" />
                  <span>Projects</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Content>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inset variant adds rounded corners without the floating margin.',
      },
    },
  },
};

export const RightSide: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider side="right">
        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>

        <SidebarGlass.Root>
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Right Side
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton isActive tooltip="Activity">
                  <Bell className="h-4 w-4" />
                  <span>Activity</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Messages">
                  <Mail className="h-4 w-4" />
                  <span>Messages</span>
                </SidebarGlass.MenuButton>
                <SidebarGlass.MenuBadge>3</SidebarGlass.MenuBadge>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Files">
                  <FileText className="h-4 w-4" />
                  <span>Files</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Content>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar can be positioned on the right side.',
      },
    },
  },
};

export const WithSubmenus: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider>
        <SidebarGlass.Root>
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                With Submenus
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Group>
              <SidebarGlass.GroupLabel>Platform</SidebarGlass.GroupLabel>
              <SidebarGlass.GroupContent>
                <SidebarGlass.Menu>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton isActive tooltip="Dashboard">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Projects">
                      <Folder className="h-4 w-4" />
                      <span>Projects</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </SidebarGlass.MenuButton>
                    <SidebarGlass.MenuSub>
                      <SidebarGlass.MenuSubItem>
                        <SidebarGlass.MenuSubButton isActive>
                          <span>Design System</span>
                        </SidebarGlass.MenuSubButton>
                      </SidebarGlass.MenuSubItem>
                      <SidebarGlass.MenuSubItem>
                        <SidebarGlass.MenuSubButton>
                          <span>Marketing Site</span>
                        </SidebarGlass.MenuSubButton>
                      </SidebarGlass.MenuSubItem>
                      <SidebarGlass.MenuSubItem>
                        <SidebarGlass.MenuSubButton>
                          <span>Mobile App</span>
                        </SidebarGlass.MenuSubButton>
                      </SidebarGlass.MenuSubItem>
                    </SidebarGlass.MenuSub>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Team">
                      <Users className="h-4 w-4" />
                      <span>Team</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </SidebarGlass.MenuButton>
                    <SidebarGlass.MenuSub>
                      <SidebarGlass.MenuSubItem>
                        <SidebarGlass.MenuSubButton>
                          <span>Engineering</span>
                        </SidebarGlass.MenuSubButton>
                      </SidebarGlass.MenuSubItem>
                      <SidebarGlass.MenuSubItem>
                        <SidebarGlass.MenuSubButton>
                          <span>Design</span>
                        </SidebarGlass.MenuSubButton>
                      </SidebarGlass.MenuSubItem>
                      <SidebarGlass.MenuSubItem>
                        <SidebarGlass.MenuSubButton>
                          <span>Product</span>
                        </SidebarGlass.MenuSubButton>
                      </SidebarGlass.MenuSubItem>
                    </SidebarGlass.MenuSub>
                  </SidebarGlass.MenuItem>
                </SidebarGlass.Menu>
              </SidebarGlass.GroupContent>
            </SidebarGlass.Group>
          </SidebarGlass.Content>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar supports nested submenus for hierarchical navigation.',
      },
    },
  },
};

export const WithSearch: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider>
        <SidebarGlass.Root>
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                With Search
              </span>
            </div>
            <div className="mt-2 px-2">
              <InputGlass placeholder="Search..." className="h-8" />
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Group>
              <SidebarGlass.GroupLabel>
                Favorites
                <SidebarGlass.GroupAction>
                  <Plus className="h-4 w-4" />
                </SidebarGlass.GroupAction>
              </SidebarGlass.GroupLabel>
              <SidebarGlass.GroupContent>
                <SidebarGlass.Menu>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Design System">
                      <Star className="h-4 w-4" style={{ color: 'var(--semantic-warning)' }} />
                      <span>Design System</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Marketing">
                      <Star className="h-4 w-4" style={{ color: 'var(--semantic-warning)' }} />
                      <span>Marketing</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                </SidebarGlass.Menu>
              </SidebarGlass.GroupContent>
            </SidebarGlass.Group>

            <SidebarGlass.Separator />

            <SidebarGlass.Group>
              <SidebarGlass.GroupLabel>All Projects</SidebarGlass.GroupLabel>
              <SidebarGlass.GroupContent>
                <SidebarGlass.Menu>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton isActive tooltip="Website">
                      <Folder className="h-4 w-4" />
                      <span>Website Redesign</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="Mobile">
                      <Folder className="h-4 w-4" />
                      <span>Mobile App v2</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuButton tooltip="API">
                      <Folder className="h-4 w-4" />
                      <span>API Documentation</span>
                    </SidebarGlass.MenuButton>
                  </SidebarGlass.MenuItem>
                </SidebarGlass.Menu>
              </SidebarGlass.GroupContent>
            </SidebarGlass.Group>
          </SidebarGlass.Content>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with search input in the header and grouped projects.',
      },
    },
  },
};

export const WithUserMenu: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider>
        <SidebarGlass.Root>
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Github className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                GitHub
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton isActive tooltip="Dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarGlass.MenuButton>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Pull Requests">
                  <FileText className="h-4 w-4" />
                  <span>Pull Requests</span>
                </SidebarGlass.MenuButton>
                <SidebarGlass.MenuBadge>5</SidebarGlass.MenuBadge>
              </SidebarGlass.MenuItem>
              <SidebarGlass.MenuItem>
                <SidebarGlass.MenuButton tooltip="Issues">
                  <Bell className="h-4 w-4" />
                  <span>Issues</span>
                </SidebarGlass.MenuButton>
                <SidebarGlass.MenuBadge>12</SidebarGlass.MenuBadge>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Content>

          <SidebarGlass.Footer>
            <SidebarGlass.Menu>
              <SidebarGlass.MenuItem>
                <DropdownMenuGlass>
                  <DropdownMenuGlassTrigger asChild>
                    <SidebarGlass.MenuButton className="w-full">
                      <AvatarGlass className="h-6 w-6">
                        <AvatarGlassImage src="https://github.com/shadcn.png" />
                        <AvatarGlassFallback>CN</AvatarGlassFallback>
                      </AvatarGlass>
                      <span className="flex-1 text-left">shadcn</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </SidebarGlass.MenuButton>
                  </DropdownMenuGlassTrigger>
                  <DropdownMenuGlassContent side="top" align="start" className="w-56">
                    <DropdownMenuGlassLabel>My Account</DropdownMenuGlassLabel>
                    <DropdownMenuGlassSeparator />
                    <DropdownMenuGlassItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuGlassItem>
                    <DropdownMenuGlassItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </DropdownMenuGlassItem>
                    <DropdownMenuGlassItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuGlassItem>
                    <DropdownMenuGlassSeparator />
                    <DropdownMenuGlassItem>
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      Support
                    </DropdownMenuGlassItem>
                    <DropdownMenuGlassItem>
                      <Cloud className="mr-2 h-4 w-4" />
                      API
                    </DropdownMenuGlassItem>
                    <DropdownMenuGlassSeparator />
                    <DropdownMenuGlassItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuGlassItem>
                  </DropdownMenuGlassContent>
                </DropdownMenuGlass>
              </SidebarGlass.MenuItem>
            </SidebarGlass.Menu>
          </SidebarGlass.Footer>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with user menu dropdown in the footer.',
      },
    },
  },
};

export const Loading: StoryObj = {
  render: () => (
    <SidebarDemo>
      <SidebarGlass.Provider>
        <SidebarGlass.Root>
          <SidebarGlass.Header>
            <div className="flex items-center gap-2 px-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--semantic-surface-elevated)' }}
              >
                <Command className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />
              </div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Loading
              </span>
            </div>
          </SidebarGlass.Header>

          <SidebarGlass.Content>
            <SidebarGlass.Group>
              <SidebarGlass.GroupLabel>Navigation</SidebarGlass.GroupLabel>
              <SidebarGlass.GroupContent>
                <SidebarGlass.Menu>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuSkeleton showIcon />
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuSkeleton showIcon />
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuSkeleton showIcon />
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuSkeleton showIcon />
                  </SidebarGlass.MenuItem>
                </SidebarGlass.Menu>
              </SidebarGlass.GroupContent>
            </SidebarGlass.Group>

            <SidebarGlass.Separator />

            <SidebarGlass.Group>
              <SidebarGlass.GroupLabel>Projects</SidebarGlass.GroupLabel>
              <SidebarGlass.GroupContent>
                <SidebarGlass.Menu>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuSkeleton />
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuSkeleton />
                  </SidebarGlass.MenuItem>
                  <SidebarGlass.MenuItem>
                    <SidebarGlass.MenuSkeleton />
                  </SidebarGlass.MenuItem>
                </SidebarGlass.Menu>
              </SidebarGlass.GroupContent>
            </SidebarGlass.Group>
          </SidebarGlass.Content>
          <SidebarGlass.Rail />
        </SidebarGlass.Root>

        <SidebarGlass.Inset>
          <DemoContent />
        </SidebarGlass.Inset>
      </SidebarGlass.Provider>
    </SidebarDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state with skeleton placeholders.',
      },
    },
  },
};
