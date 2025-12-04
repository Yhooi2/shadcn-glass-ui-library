// ========================================
// NOTIFICATIONS BLOCK
// Demo showcase of notification components
// Level 5: Block (shadcn/ui pattern)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass/composite/glass-card';
import { NotificationGlass } from '@/components/glass/ui/notification-glass';
import { AlertGlass } from '@/components/glass/ui/alert-glass';
import '@/glass-theme.css';

export interface NotificationsBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Show section title */
  readonly showTitle?: boolean;
}

export const NotificationsBlock = forwardRef<HTMLDivElement, NotificationsBlockProps>(
  ({ showTitle = true, className, ...props }, ref) => {
    return (
      <GlassCard
        ref={ref}
        className={cn('p-6', className)}
        intensity="medium"
        hover={false}
        {...props}
      >
        {showTitle && (
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Notifications & Alerts
          </h2>
        )}

        <div className="space-y-6">
          {/* Notifications */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Notifications
            </label>
            <div className="space-y-2">
              <NotificationGlass
                type="info"
                title="New message"
                message="You have received a new message from John Doe"
                onClose={() => {}}
              />
              <NotificationGlass
                type="success"
                title="Success"
                message="Your changes have been saved successfully"
                onClose={() => {}}
              />
              <NotificationGlass
                type="warning"
                title="Warning"
                message="Your session will expire in 5 minutes"
                onClose={() => {}}
              />
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Alerts
            </label>
            <div className="space-y-2">
              <AlertGlass
                type="info"
                title="Information"
              >
                This is an informational alert message
              </AlertGlass>
              <AlertGlass
                type="success"
                title="Success"
              >
                Your operation completed successfully
              </AlertGlass>
              <AlertGlass
                type="warning"
                title="Warning"
              >
                Please review the following issues
              </AlertGlass>
              <AlertGlass
                type="error"
                title="Error"
              >
                An error occurred while processing your request
              </AlertGlass>
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }
);

NotificationsBlock.displayName = 'NotificationsBlock';
