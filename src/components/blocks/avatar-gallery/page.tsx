// ========================================
// AVATAR GALLERY BLOCK
// Demo showcase of avatar components
// Level 5: Block (shadcn/ui pattern)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass/ui/glass-card';
import { AvatarGlass } from '@/components/glass/ui/avatar-glass';
import { ProfileAvatarGlass } from '@/components/glass/specialized/profile-avatar-glass';
import { StatusIndicatorGlass } from '@/components/glass/specialized/status-indicator-glass';
import '@/glass-theme.css';

export interface AvatarGalleryBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Show section title */
  readonly showTitle?: boolean;
}

export const AvatarGalleryBlock = forwardRef<HTMLDivElement, AvatarGalleryBlockProps>(
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
            Avatar Gallery
          </h2>
        )}

        <div className="space-y-6">
          {/* Standard Avatars */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Avatar Sizes
            </label>
            <div className="flex items-center gap-4">
              <AvatarGlass name="AS" size="sm" />
              <AvatarGlass name="AS" size="md" />
              <AvatarGlass name="AS" size="lg" />
            </div>
          </div>

          {/* Profile Avatars with Glow */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Profile Avatars with Status
            </label>
            <div className="flex items-center gap-4">
              <ProfileAvatarGlass initials="AS" size="sm" status="online" />
              <ProfileAvatarGlass initials="JD" size="md" status="away" />
              <ProfileAvatarGlass initials="MK" size="lg" status="busy" />
            </div>
          </div>

          {/* Status Indicators */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Status Indicators
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StatusIndicatorGlass type="green" />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Online
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicatorGlass type="yellow" />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Away
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicatorGlass type="red" />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Busy
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }
);

AvatarGalleryBlock.displayName = 'AvatarGalleryBlock';
