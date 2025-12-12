// ========================================
// PROFILE AVATAR GLASS - SPECIALIZED COMPONENT
// Large profile avatar wrapper with custom sizing
// Level 4: Specialized (wrapper over AvatarGlass)
// ========================================

import { forwardRef, type CSSProperties } from 'react';
import { type AvatarStatus } from '@/components/glass/ui/avatar-glass';
import { statusSizes } from '@/lib/variants/avatar-glass-variants';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';

export type ProfileAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ProfileAvatarGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** User initials to display */
  readonly initials: string;
  /** Size variant (profile-specific sizing - larger than AvatarGlass) */
  readonly size?: ProfileAvatarSize;
  /** Optional status indicator */
  readonly status?: AvatarStatus;
  /** Enable pulsing glow animation */
  readonly glowing?: boolean;
}

/**
 * Profile-specific size classes (larger than standard AvatarGlass)
 */
const profileSizeClasses: Record<ProfileAvatarSize, string> = {
  sm: 'w-9 h-9 md:w-10 md:h-10 text-xs md:text-sm',
  md: 'w-12 h-12 md:w-14 md:h-14 text-base md:text-lg',
  lg: 'w-14 h-14 md:w-16 md:h-16 text-lg md:text-xl',
  xl: 'w-18 h-18 md:w-20 md:h-20 text-xl md:text-2xl',
};

/**
 * Get CSS variables for status indicator colors
 */
const getStatusVars = (statusType: AvatarStatus): { bg: string; glow: string } => {
  const statusVars: Record<AvatarStatus, { bg: string; glow: string }> = {
    online: { bg: 'var(--status-online)', glow: 'var(--status-online-glow)' },
    offline: { bg: 'var(--status-offline)', glow: 'none' },
    busy: { bg: 'var(--status-busy)', glow: 'var(--status-busy-glow)' },
    away: { bg: 'var(--status-away)', glow: 'var(--status-away-glow)' },
  };
  return statusVars[statusType];
};

/**
 * ProfileAvatarGlass - Large profile avatar with bold styling
 *
 * Built on top of the same CSS variables as AvatarGlass but with
 * profile-specific sizing and bold font weight.
 *
 * @example
 * ```tsx
 * <ProfileAvatarGlass initials="JD" size="lg" glowing />
 * <ProfileAvatarGlass initials="AS" status="online" />
 * ```
 */
export const ProfileAvatarGlass = forwardRef<HTMLDivElement, ProfileAvatarGlassProps>(
  ({ initials, size = 'lg', status, glowing = true, className, ...props }, ref) => {
    const { isHovered, hoverProps } = useHover();

    const avatarStyles: CSSProperties = {
      background: 'var(--avatar-bg)',
      border: '3px solid var(--avatar-border)',
      boxShadow: isHovered ? 'var(--avatar-hover-glow)' : 'var(--avatar-shadow)',
      color: 'var(--text-inverse)',
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        {...props}
      >
        {/* Avatar circle */}
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-bold transition-all duration-300',
            profileSizeClasses[size],
            glowing && 'animate-[glow-pulse_2s_ease-in-out_infinite]'
          )}
          style={avatarStyles}
          role="img"
          aria-label={`Profile avatar with initials ${initials}`}
        >
          {initials}
        </div>

        {/* Status indicator */}
        {status && (
          <span
            className={cn(statusSizes({ size }), 'absolute -bottom-0.5 -right-0.5')}
            style={{
              background: getStatusVars(status).bg,
              boxShadow: getStatusVars(status).glow,
            }}
            role="status"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

ProfileAvatarGlass.displayName = 'ProfileAvatarGlass';
