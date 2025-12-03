// ========================================
// NOTIFICATIONS BLOCK
// Demo showcase of notification components
// Level 5: Block (shadcn/ui pattern)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/GlassCard';
import { NotificationGlass } from '@/components/NotificationGlass';
import { AlertGlass } from '@/components/AlertGlass';
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
              />
              <NotificationGlass
                type="success"
                title="Success"
                message="Your changes have been saved successfully"
              />
              <NotificationGlass
                type="warning"
                title="Warning"
                message="Your session will expire in 5 minutes"
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
                description="This is an informational alert message"
              />
              <AlertGlass
                type="success"
                title="Success"
                description="Your operation completed successfully"
              />
              <AlertGlass
                type="warning"
                title="Warning"
                description="Please review the following issues"
              />
              <AlertGlass
                type="error"
                title="Error"
                description="An error occurred while processing your request"
              />
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }
);

NotificationsBlock.displayName = 'NotificationsBlock';
