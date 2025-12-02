/**
 * AvatarGlass Component
 *
 * Glass-themed avatar with:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect on hover
 * - Status indicator with glow
 * - Size variants
 */

import { forwardRef, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

// ========================================
// SIZE VARIANTS (using CVA)
// ========================================

const avatarSizes = cva(
  'rounded-full flex items-center justify-center font-semibold transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const statusSizes = cva('absolute -bottom-0.5 -right-0.5 rounded-full', {
  variants: {
    size: {
      sm: 'w-2.5 h-2.5',
      md: 'w-3 h-3',
      lg: 'w-3.5 h-3.5',
      xl: 'w-4 h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ========================================
// PROPS INTERFACE
// ========================================

export interface AvatarGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof avatarSizes> {
  readonly name: string;
  readonly status?: AvatarStatus;
}

// ========================================
// HELPERS
// ========================================

const getInitials = (name: string): string => {
  if (!name || name.trim().length === 0) return '?';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// ========================================
// COMPONENT
// ========================================

// Status colors mapping to CSS variables
const getStatusVars = (statusType: AvatarStatus): { bg: string; glow: string } => {
  const statusVars: Record<AvatarStatus, { bg: string; glow: string }> = {
    online: { bg: 'var(--status-online)', glow: 'var(--status-online-glow)' },
    offline: { bg: 'var(--status-offline)', glow: 'none' },
    busy: { bg: 'var(--status-busy)', glow: 'var(--status-busy-glow)' },
    away: { bg: 'var(--status-away)', glow: 'var(--status-away-glow)' },
  };
  return statusVars[statusType];
};

export const AvatarGlass = forwardRef<HTMLDivElement, AvatarGlassProps>(
  ({ name, size = 'md', status, className, ...props }, ref) => {
    const { isHovered, hoverProps } = useHover();

    const avatarStyles: CSSProperties = {
      background: 'var(--avatar-bg)',
      border: '2px solid var(--avatar-border)',
      boxShadow: isHovered ? 'var(--avatar-hover-glow)' : 'var(--avatar-shadow)',
      color: '#ffffff',
    };

    const initials = getInitials(name);

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
          className={cn(avatarSizes({ size }))}
          style={avatarStyles}
          role="img"
          aria-label={`Avatar for ${name}`}
        >
          {initials}
        </div>

        {/* Status indicator */}
        {status && (
          <span
            className={cn(statusSizes({ size }))}
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

AvatarGlass.displayName = 'AvatarGlass';

export { avatarSizes as avatarGlassVariants };
