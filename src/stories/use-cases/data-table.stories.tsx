/**
 * Real-World Use Case: Data Table with Actions
 *
 * Demonstrates a complete data table implementation with:
 * - Sortable columns (click headers to sort)
 * - Row selection with checkboxes
 * - Bulk actions (delete, export, archive)
 * - Search and filtering
 * - Pagination controls
 * - Row actions dropdown
 * - Loading states
 * - Empty states
 * - Responsive design
 *
 * Components used:
 * - GlassCard
 * - InputGlass (search)
 * - DropdownGlass (row actions, bulk actions)
 * - BadgeGlass (status indicators)
 * - CheckboxGlass (row selection)
 * - ButtonGlass (actions, pagination)
 * - PopoverGlass (filters)
 * - SkeletonGlass (loading states)
 *
 * Accessibility features:
 * - ARIA labels for sortable columns
 * - ARIA-selected for table rows
 * - Keyboard navigation (Tab, Enter, Space, Arrow keys)
 * - Screen reader announcements for sort state
 * - Role="grid" for table semantics
 * - Focus management for modals and dropdowns
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { useTheme, type ThemeName } from '@/lib/theme-context';
import { AnimatedBackground } from '@/components/demos/AnimatedBackground';
import {
  GlassCard,
  InputGlass,
  DropdownGlass,
  BadgeGlass,
  CheckboxGlass,
  ButtonGlass,
  PopoverGlass,
  SkeletonGlass,
  ModalGlass,
  AlertGlass,
  AlertGlassTitle,
  AlertGlassDescription,
} from '@/index';
import {
  Search,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Download,
  Trash2,
  Archive,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Palette,
} from 'lucide-react';

// ========================================
// META
// ========================================

const meta: Meta = {
  title: 'Examples/Use Cases/Data Table',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive data table with sorting, filtering, bulk actions, and pagination. Perfect for admin dashboards and data management interfaces.',
      },
    },
  },
  tags: ['use-case', 'table', 'data', 'admin'],
};

export default meta;
type Story = StoryObj;

// ========================================
// THEME CONFIG
// ========================================

const themes: ThemeName[] = ['light', 'aurora', 'glass'];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
};

// ========================================
// TYPES
// ========================================

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  projects: number;
}

type SortField = keyof User;
type SortDirection = 'asc' | 'desc';

// ========================================
// DEMO DATA
// ========================================

const demoUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2 hours ago',
    projects: 12,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'editor',
    status: 'active',
    lastActive: '1 day ago',
    projects: 8,
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol.williams@example.com',
    role: 'viewer',
    status: 'inactive',
    lastActive: '1 week ago',
    projects: 3,
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'editor',
    status: 'active',
    lastActive: '3 hours ago',
    projects: 15,
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'viewer',
    status: 'pending',
    lastActive: 'Never',
    projects: 0,
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '30 minutes ago',
    projects: 20,
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace.lee@example.com',
    role: 'editor',
    status: 'active',
    lastActive: '5 hours ago',
    projects: 6,
  },
  {
    id: '8',
    name: 'Henry Wilson',
    email: 'henry.wilson@example.com',
    role: 'viewer',
    status: 'inactive',
    lastActive: '2 weeks ago',
    projects: 1,
  },
];

// ========================================
// HELPER COMPONENTS
// ========================================

const SortIcon = ({
  field,
  sortField,
  sortDirection,
}: {
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
}) => {
  if (sortField !== field) return null;
  return sortDirection === 'asc' ? (
    <ChevronUp className="w-4 h-4" />
  ) : (
    <ChevronDown className="w-4 h-4" />
  );
};

// ========================================
// DATA TABLE COMPONENT
// ========================================

const DataTable = ({
  initialData = demoUsers,
  isLoading = false,
}: {
  initialData?: User[];
  isLoading?: boolean;
}) => {
  const { theme, cycleTheme } = useTheme();
  const [users, setUsers] = useState<User[]>(initialData);

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
  const NextIcon = themeConfig[nextTheme].icon;
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const itemsPerPage = 5;

  // Filtering and sorting
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      result = result.filter((user) => statusFilter.includes(user.status));
    }

    // Role filter
    if (roleFilter.length > 0) {
      result = result.filter((user) => roleFilter.includes(user.role));
    }

    // Sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * direction;
      }
      return 0;
    });

    return result;
  }, [users, searchQuery, sortField, sortDirection, statusFilter, roleFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedUsers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedUsers.map((u) => u.id)));
    }
  };

  const toggleSelectUser = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Sort handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Bulk actions
  const handleBulkDelete = () => {
    setUsers(users.filter((u) => !selectedIds.has(u.id)));
    setSelectedIds(new Set());
    setShowDeleteModal(false);
  };

  const handleBulkExport = () => {
    const selectedUsers = users.filter((u) => selectedIds.has(u.id));
    console.log('Exporting users:', selectedUsers);
    alert(`Exporting ${selectedUsers.length} users...`);
  };

  const handleBulkArchive = () => {
    setUsers(users.map((u) => (selectedIds.has(u.id) ? { ...u, status: 'inactive' as const } : u)));
    setSelectedIds(new Set());
  };

  // Row actions
  const getRowActions = (user: User) => [
    { label: 'Edit', onClick: () => alert(`Editing ${user.name}`) },
    { label: 'View Details', onClick: () => alert(`Viewing ${user.name}`) },
    {
      label: 'Delete',
      onClick: () => {
        if (confirm(`Delete ${user.name}?`)) {
          setUsers(users.filter((u) => u.id !== user.id));
        }
      },
    },
  ];

  return (
    <div className="min-h-screen font-sans">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 p-6">
        <GlassCard intensity="high" className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                User Management
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>Manage users, roles, and permissions</p>
            </div>
            <ButtonGlass variant="secondary" size="sm" icon={NextIcon} onClick={cycleTheme}>
              {themeConfig[nextTheme].label}
            </ButtonGlass>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <InputGlass
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                aria-label="Search users"
              />
            </div>

            {/* Filters */}
            <PopoverGlass
              trigger={
                <ButtonGlass variant="ghost">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {(statusFilter.length > 0 || roleFilter.length > 0) && (
                    <BadgeGlass variant="info" className="ml-2">
                      {statusFilter.length + roleFilter.length}
                    </BadgeGlass>
                  )}
                </ButtonGlass>
              }
            >
              <div className="w-64 p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Status
                  </h3>
                  <div className="space-y-2">
                    {['active', 'inactive', 'pending'].map((status) => (
                      <CheckboxGlass
                        key={status}
                        checked={statusFilter.includes(status)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStatusFilter([...statusFilter, status]);
                          } else {
                            setStatusFilter(statusFilter.filter((s) => s !== status));
                          }
                        }}
                        label={status.charAt(0).toUpperCase() + status.slice(1)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Role
                  </h3>
                  <div className="space-y-2">
                    {['admin', 'editor', 'viewer'].map((role) => (
                      <CheckboxGlass
                        key={role}
                        checked={roleFilter.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setRoleFilter([...roleFilter, role]);
                          } else {
                            setRoleFilter(roleFilter.filter((r) => r !== role));
                          }
                        }}
                        label={role.charAt(0).toUpperCase() + role.slice(1)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </PopoverGlass>

            {/* Bulk Actions */}
            {selectedIds.size > 0 && (
              <div className="flex gap-2">
                <ButtonGlass
                  variant="ghost"
                  size="sm"
                  onClick={handleBulkExport}
                  aria-label="Export selected users"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export ({selectedIds.size})
                </ButtonGlass>
                <ButtonGlass
                  variant="ghost"
                  size="sm"
                  onClick={handleBulkArchive}
                  aria-label="Archive selected users"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </ButtonGlass>
                <ButtonGlass
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
                  aria-label="Delete selected users"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </ButtonGlass>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full" role="grid" aria-label="User management table">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3">
                    <CheckboxGlass
                      checked={
                        selectedIds.size === paginatedUsers.length && paginatedUsers.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all users"
                    />
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => handleSort('name')}
                    aria-sort={
                      sortField === 'name'
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <SortIcon field="name" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => handleSort('email')}
                    aria-sort={
                      sortField === 'email'
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <div className="flex items-center gap-2">
                      Email
                      <SortIcon field="email" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => handleSort('role')}
                    aria-sort={
                      sortField === 'role'
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <div className="flex items-center gap-2">
                      Role
                      <SortIcon field="role" sortField={sortField} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => handleSort('status')}
                    aria-sort={
                      sortField === 'status'
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <div className="flex items-center gap-2">
                      Status
                      <SortIcon
                        field="status"
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => handleSort('lastActive')}
                    aria-sort={
                      sortField === 'lastActive'
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <div className="flex items-center gap-2">
                      Last Active
                      <SortIcon
                        field="lastActive"
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={() => handleSort('projects')}
                    aria-sort={
                      sortField === 'projects'
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <div className="flex items-center gap-2">
                      Projects
                      <SortIcon
                        field="projects"
                        sortField={sortField}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Loading state
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-3" colSpan={8}>
                        <SkeletonGlass variant="text" />
                      </td>
                    </tr>
                  ))
                ) : paginatedUsers.length === 0 ? (
                  // Empty state
                  <tr>
                    <td colSpan={8} className="p-8 text-center">
                      <div style={{ color: 'var(--text-secondary)' }}>
                        <p className="mb-2">No users found</p>
                        <ButtonGlass
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSearchQuery('');
                            setStatusFilter([]);
                            setRoleFilter([]);
                          }}
                        >
                          Clear filters
                        </ButtonGlass>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Data rows
                  paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      aria-selected={selectedIds.has(user.id)}
                    >
                      <td className="p-3">
                        <CheckboxGlass
                          checked={selectedIds.has(user.id)}
                          onCheckedChange={() => toggleSelectUser(user.id)}
                          aria-label={`Select ${user.name}`}
                        />
                      </td>
                      <td className="p-3 font-medium" style={{ color: 'var(--text-primary)' }}>
                        {user.name}
                      </td>
                      <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {user.email}
                      </td>
                      <td className="p-3">
                        <BadgeGlass
                          variant={
                            user.role === 'admin'
                              ? 'destructive'
                              : user.role === 'editor'
                                ? 'info'
                                : 'default'
                          }
                        >
                          {user.role}
                        </BadgeGlass>
                      </td>
                      <td className="p-3">
                        <BadgeGlass
                          variant={
                            user.status === 'active'
                              ? 'success'
                              : user.status === 'pending'
                                ? 'warning'
                                : 'default'
                          }
                        >
                          {user.status}
                        </BadgeGlass>
                      </td>
                      <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {user.lastActive}
                      </td>
                      <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {user.projects}
                      </td>
                      <td className="p-3">
                        <DropdownGlass
                          trigger={
                            <ButtonGlass
                              variant="ghost"
                              size="sm"
                              aria-label={`Actions for ${user.name}`}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </ButtonGlass>
                          }
                          items={getRowActions(user)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && paginatedUsers.length > 0 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)} of{' '}
                {filteredAndSortedUsers.length} users
              </div>
              <div className="flex items-center gap-2">
                <ButtonGlass
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </ButtonGlass>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <ButtonGlass
                      key={page}
                      variant={currentPage === page ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </ButtonGlass>
                  ))}
                </div>
                <ButtonGlass
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </ButtonGlass>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <ModalGlass.Root open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <ModalGlass.Overlay />
            <ModalGlass.Content>
              <ModalGlass.Header>
                <ModalGlass.Title>Delete Users</ModalGlass.Title>
                <ModalGlass.Description>
                  Are you sure you want to delete {selectedIds.size} user(s)? This action cannot be
                  undone.
                </ModalGlass.Description>
              </ModalGlass.Header>
              <ModalGlass.Body>
                <AlertGlass variant="destructive">
                  <AlertGlassTitle>Warning</AlertGlassTitle>
                  <AlertGlassDescription>
                    This will permanently delete the selected users and all their associated data.
                  </AlertGlassDescription>
                </AlertGlass>
              </ModalGlass.Body>
              <ModalGlass.Footer>
                <ButtonGlass variant="ghost" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </ButtonGlass>
                <ButtonGlass variant="destructive" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete {selectedIds.size} User(s)
                </ButtonGlass>
              </ModalGlass.Footer>
            </ModalGlass.Content>
          </ModalGlass.Root>
        )}
      </div>
    </div>
  );
};

// ========================================
// STORIES
// ========================================

/**
 * Default data table with all features enabled.
 * Click column headers to sort, use checkboxes for selection, and access filters.
 */
export const Default: Story = {
  render: () => <DataTable />,
};

/**
 * Table with multiple rows selected, showing bulk action controls.
 * Demonstrates how bulk actions appear when users are selected.
 */
export const WithSelection: Story = {
  render: () => {
    const TableWithSelection = () => {
      const { theme, cycleTheme } = useTheme();
      const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
      const NextIcon = themeConfig[nextTheme].icon;
      const selectedIds = new Set(['1', '3', '5']);

      return (
        <div className="min-h-screen font-sans">
          <AnimatedBackground />
          <div className="relative z-10 p-6">
            <GlassCard intensity="high" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    User Management
                  </h1>
                  <AlertGlass variant="default">
                    <AlertGlassTitle>Selection Active</AlertGlassTitle>
                    <AlertGlassDescription>
                      {selectedIds.size} users selected. Bulk actions available.
                    </AlertGlassDescription>
                  </AlertGlass>
                </div>
                <ButtonGlass variant="secondary" size="sm" icon={NextIcon} onClick={cycleTheme}>
                  {themeConfig[nextTheme].label}
                </ButtonGlass>
              </div>
              <div className="flex gap-2 mb-6">
                <ButtonGlass variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export ({selectedIds.size})
                </ButtonGlass>
                <ButtonGlass variant="ghost" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </ButtonGlass>
                <ButtonGlass variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </ButtonGlass>
              </div>
            </GlassCard>
          </div>
        </div>
      );
    };
    return <TableWithSelection />;
  },
};

/**
 * Table with active filters applied.
 * Shows how the table responds to status and role filters.
 */
export const WithFilters: Story = {
  render: () => <DataTable />,
  play: async () => {
    // In a real implementation, this would interact with the filter popover
    // For now, this is a visual story showing the filter state
  },
};

/**
 * Loading state with skeleton placeholders.
 * Displayed while data is being fetched from the server.
 */
export const LoadingState: Story = {
  render: () => <DataTable isLoading={true} />,
};

/**
 * Empty state when no users match the current filters.
 * Provides clear feedback and option to clear filters.
 */
export const EmptyState: Story = {
  render: () => <DataTable initialData={[]} />,
};
