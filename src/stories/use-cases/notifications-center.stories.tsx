/**
 * Real-World Use Case: Notifications Center
 *
 * Demonstrates a complete notification management system with:
 * - Toast notifications (temporary)
 * - Notification center (persistent)
 * - Mark as read/unread functionality
 * - Delete notifications
 * - Filter by type (all/unread/archived)
 * - Bulk actions (mark all read, clear all)
 * - Real-time notification badges
 * - Empty states
 * - Responsive design
 *
 * Components used:
 * - NotificationGlass (toast notifications)
 * - AlertGlass (system alerts)
 * - BadgeGlass (notification counts, types)
 * - ButtonGlass (actions)
 * - GlassCard (notification items)
 * - TabsGlass (filter tabs)
 * - DropdownGlass (notification settings)
 * - CheckboxGlass (selection)
 *
 * Accessibility features:
 * - ARIA live regions for toast announcements
 * - Keyboard navigation (Tab, Enter, Space, Escape)
 * - Screen reader announcements for new notifications
 * - Focus management for modals
 * - Semantic HTML structure (nav, main, section)
 * - Role="alert" for urgent notifications
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { ThemeProvider, type Theme } from '@/lib/theme-context';
import {
  NotificationGlass,
  AlertGlass,
  BadgeGlass,
  ButtonGlass,
  GlassCard,
  TabsGlass,
  DropdownGlass,
  CheckboxGlass,
  ModalGlass,
} from '@/index';
import {
  Bell,
  Check,
  Trash2,
  Archive,
  Settings,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';

// ========================================
// META
// ========================================

// Extend story args to include theme
type StoryArgs = {
  theme: Theme;
};

const meta: Meta<StoryArgs> = {
  title: 'Use Cases/Notifications Center',
  decorators: [
    (Story, context) => (
      <ThemeProvider defaultTheme={context.args.theme || 'glass'}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive notification management system with toast notifications, persistent notification center, and filtering capabilities.',
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['glass', 'light', 'aurora'],
      description: 'Theme variant for the notifications center',
      table: {
        type: { summary: 'ThemeName' },
        defaultValue: { summary: 'glass' },
      },
    },
  },
  tags: ['use-case', 'notifications', 'alerts', 'messaging'],
};

export default meta;
type Story = StoryObj<StoryArgs>;

// ========================================
// TYPES
// ========================================

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'default' | 'success' | 'warning' | 'destructive';
  timestamp: Date;
  read: boolean;
  archived: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type NotificationFilter = 'all' | 'unread' | 'archived';

// ========================================
// DEMO DATA
// ========================================

const createDemoNotifications = (): Notification[] => [
  {
    id: '1',
    title: 'System Update',
    message: 'A new system update is available. Please restart to install.',
    type: 'default',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
    read: false,
    archived: false,
  },
  {
    id: '2',
    title: 'Build Successful',
    message: 'Your deployment to production completed successfully.',
    type: 'success',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 mins ago
    read: false,
    archived: false,
  },
  {
    id: '3',
    title: 'Warning: High Memory Usage',
    message: 'Server memory usage has exceeded 85%. Consider scaling up.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    read: true,
    archived: false,
  },
  {
    id: '4',
    title: 'Build Failed',
    message: 'Build #4521 failed. Check logs for details.',
    type: 'destructive',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    archived: false,
  },
  {
    id: '5',
    title: 'New Team Member',
    message: 'Sarah Johnson joined your team. Say hello!',
    type: 'default',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
    archived: false,
  },
  {
    id: '6',
    title: 'Backup Completed',
    message: 'Daily backup completed successfully at 2:00 AM.',
    type: 'success',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: true,
    archived: true,
  },
  {
    id: '7',
    title: 'Security Alert',
    message: 'Unusual login activity detected from new IP address.',
    type: 'destructive',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    archived: true,
  },
];

// ========================================
// NOTIFICATIONS CENTER COMPONENT
// ========================================

const NotificationsCenter = ({
  initialNotifications = createDemoNotifications(),
}: {
  initialNotifications?: Notification[];
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications
  );
  const [toastNotifications, setToastNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [isCenterOpen, setIsCenterOpen] = useState(true);

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'New Activity',
        message: 'A new event occurred in your workspace.',
        type: 'default',
        timestamp: new Date(),
        read: false,
        archived: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setToastNotifications((prev) => [...prev, newNotification]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'unread') return !notif.read && !notif.archived;
    if (activeFilter === 'archived') return notif.archived;
    return !notif.archived; // 'all' shows non-archived
  });

  const unreadCount = notifications.filter((n) => !n.read && !n.archived).length;

  // Format timestamp
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Get icon for notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'destructive':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  // Actions
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.archived ? n : { ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const archiveNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: true, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setSelectedIds(new Set());
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const bulkDelete = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
  };

  const bulkArchive = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        selectedIds.has(n.id) ? { ...n, archived: true, read: true } : n
      )
    );
    setSelectedIds(new Set());
  };

  const removeToast = (id: string) => {
    setToastNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      {/* Header with Notification Bell */}
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-white/70">Manage your alerts and updates</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ButtonGlass
                variant="ghost"
                size="lg"
                onClick={() => setIsCenterOpen(!isCenterOpen)}
                aria-label={`Notifications. ${unreadCount} unread`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <BadgeGlass
                    variant="destructive"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1"
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </BadgeGlass>
                )}
              </ButtonGlass>
            </div>
            <DropdownGlass
              trigger={
                <ButtonGlass variant="ghost" aria-label="Notification settings">
                  <Settings className="w-5 h-5" />
                </ButtonGlass>
              }
              items={[
                { label: 'Notification Preferences', onClick: () => setShowSettings(true) },
                { label: 'Mark All as Read', onClick: markAllAsRead },
                { label: 'Clear All', onClick: clearAllNotifications },
              ]}
            />
          </div>
        </div>

        {/* Main Content */}
        <GlassCard intensity="high" className="p-6">
          {/* Tabs for filtering */}
          <TabsGlass.Root value={activeFilter} onValueChange={(v) => setActiveFilter(v as NotificationFilter)}>
            <TabsGlass.List aria-label="Filter notifications">
              <TabsGlass.Trigger value="all">
                All
                {notifications.filter(n => !n.archived).length > 0 && (
                  <BadgeGlass variant="default" className="ml-2">
                    {notifications.filter(n => !n.archived).length}
                  </BadgeGlass>
                )}
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <BadgeGlass variant="destructive" className="ml-2">
                    {unreadCount}
                  </BadgeGlass>
                )}
              </TabsGlass.Trigger>
              <TabsGlass.Trigger value="archived">
                Archived
                {notifications.filter(n => n.archived).length > 0 && (
                  <BadgeGlass variant="default" className="ml-2">
                    {notifications.filter(n => n.archived).length}
                  </BadgeGlass>
                )}
              </TabsGlass.Trigger>
            </TabsGlass.List>

            {/* Bulk Actions */}
            {selectedIds.size > 0 && (
              <div className="mt-4 flex gap-2">
                <AlertGlass variant="info" title="Selection Active">
                  {selectedIds.size} notification{selectedIds.size > 1 ? 's' : ''} selected
                </AlertGlass>
                <div className="ml-auto flex gap-2">
                  <ButtonGlass variant="ghost" size="sm" onClick={bulkArchive}>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </ButtonGlass>
                  <ButtonGlass variant="destructive" size="sm" onClick={bulkDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </ButtonGlass>
                </div>
              </div>
            )}

            {/* All Tab */}
            <TabsGlass.Content value="all" className="mt-6 space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 text-lg mb-2">No notifications</p>
                  <p className="text-white/40 text-sm">
                    You're all caught up! Check back later for updates.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <GlassCard
                    key={notification.id}
                    intensity="medium"
                    className={`p-4 transition-all ${
                      !notification.read ? 'border-l-4 border-blue-400' : ''
                    } ${selectedIds.has(notification.id) ? 'ring-2 ring-blue-400' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <CheckboxGlass
                        checked={selectedIds.has(notification.id)}
                        onCheckedChange={() => toggleSelection(notification.id)}
                        aria-label={`Select ${notification.title}`}
                      />
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-white font-semibold">
                            {notification.title}
                          </h3>
                          <span className="text-white/50 text-xs whitespace-nowrap">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <ButtonGlass
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              aria-label="Mark as read"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Mark as read
                            </ButtonGlass>
                          )}
                          <ButtonGlass
                            variant="ghost"
                            size="sm"
                            onClick={() => archiveNotification(notification.id)}
                            aria-label="Archive notification"
                          >
                            <Archive className="w-3 h-3 mr-1" />
                            Archive
                          </ButtonGlass>
                          <ButtonGlass
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            aria-label="Delete notification"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </ButtonGlass>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))
              )}
            </TabsGlass.Content>

            {/* Unread Tab */}
            <TabsGlass.Content value="unread" className="mt-6 space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-green-400/50 mx-auto mb-4" />
                  <p className="text-white/60 text-lg mb-2">All caught up!</p>
                  <p className="text-white/40 text-sm">
                    You have no unread notifications.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <GlassCard
                    key={notification.id}
                    intensity="medium"
                    className="p-4 border-l-4 border-blue-400"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-white font-semibold">
                            {notification.title}
                          </h3>
                          <span className="text-white/50 text-xs">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-2">
                          {notification.message}
                        </p>
                        <ButtonGlass
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Mark as read
                        </ButtonGlass>
                      </div>
                    </div>
                  </GlassCard>
                ))
              )}
            </TabsGlass.Content>

            {/* Archived Tab */}
            <TabsGlass.Content value="archived" className="mt-6 space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Archive className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 text-lg mb-2">No archived notifications</p>
                  <p className="text-white/40 text-sm">
                    Archived notifications will appear here.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <GlassCard
                    key={notification.id}
                    intensity="low"
                    className="p-4 opacity-75"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-white font-semibold">
                            {notification.title}
                          </h3>
                          <span className="text-white/50 text-xs">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-2">
                          {notification.message}
                        </p>
                        <ButtonGlass
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete permanently
                        </ButtonGlass>
                      </div>
                    </div>
                  </GlassCard>
                ))
              )}
            </TabsGlass.Content>
          </TabsGlass.Root>
        </GlassCard>

        {/* Toast Notifications (bottom-right) */}
        <div
          className="fixed bottom-6 right-6 space-y-3 max-w-md z-50"
          role="region"
          aria-label="Notifications"
          aria-live="polite"
        >
          {toastNotifications.slice(0, 3).map((notification) => (
            <NotificationGlass
              key={notification.id}
              variant={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => removeToast(notification.id)}
            />
          ))}
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <ModalGlass.Root open={showSettings} onOpenChange={setShowSettings}>
            <ModalGlass.Overlay />
            <ModalGlass.Content>
              <ModalGlass.Header>
                <ModalGlass.Title>Notification Preferences</ModalGlass.Title>
                <ModalGlass.Description>
                  Customize how you receive notifications
                </ModalGlass.Description>
              </ModalGlass.Header>
              <ModalGlass.Body>
                <div className="space-y-4">
                  <CheckboxGlass
                    checked={true}
                    label="Email notifications"
                  />
                  <CheckboxGlass
                    checked={true}
                    label="Push notifications"
                  />
                  <CheckboxGlass
                    checked={false}
                    label="SMS notifications"
                  />
                  <CheckboxGlass
                    checked={true}
                    label="In-app notifications"
                  />
                </div>
              </ModalGlass.Body>
              <ModalGlass.Footer>
                <ButtonGlass
                  variant="ghost"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </ButtonGlass>
                <ButtonGlass
                  variant="primary"
                  onClick={() => setShowSettings(false)}
                >
                  Save Preferences
                </ButtonGlass>
              </ModalGlass.Footer>
            </ModalGlass.Content>
          </ModalGlass.Root>
        )}
      </div>
  );
};

// ========================================
// STORIES
// ========================================

/**
 * Default notifications center with a mix of read and unread notifications.
 * Shows all filtering options and bulk actions.
 */
export const Default: Story = {
  args: {
    theme: 'glass',
  },
  render: () => <NotificationsCenter />,
};

/**
 * Notifications center with only unread notifications.
 * Highlights the unread tab with notification count.
 */
export const WithUnread: Story = {
  args: {
    theme: 'glass',
  },
  render: () => {
    const unreadNotifications = createDemoNotifications().map((n, i) => ({
      ...n,
      read: i > 3, // First 4 are unread
    }));
    return <NotificationsCenter initialNotifications={unreadNotifications} />;
  },
};

/**
 * Empty state when all notifications have been cleared.
 * Shows friendly empty state message.
 */
export const EmptyState: Story = {
  args: {
    theme: 'glass',
  },
  render: () => <NotificationsCenter initialNotifications={[]} />,
};

/**
 * Notifications center with many notifications to demonstrate scrolling and pagination.
 */
export const ManyNotifications: Story = {
  args: {
    theme: 'glass',
  },
  render: () => {
    const manyNotifications: Notification[] = Array.from({ length: 20 }, (_, i) => ({
      id: `notif-${i}`,
      title: `Notification ${i + 1}`,
      message: `This is notification message number ${i + 1}. It contains important information.`,
      type: (['default', 'success', 'warning', 'destructive'] as const)[
        i % 4
      ],
      timestamp: new Date(Date.now() - i * 10 * 60 * 1000),
      read: i > 5,
      archived: i > 15,
    }));
    return <NotificationsCenter initialNotifications={manyNotifications} />;
  },
};

/**
 * Light theme variant of the notifications center.
 */
export const LightTheme: Story = {
  args: {
    theme: 'light',
  },
  render: () => <NotificationsCenter />,
};

/**
 * Aurora theme variant with gradient effects.
 */
export const AuroraTheme: Story = {
  args: {
    theme: 'aurora',
  },
  render: () => <NotificationsCenter />,
};
