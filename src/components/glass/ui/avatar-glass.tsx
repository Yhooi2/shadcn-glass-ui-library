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
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { avatarSizes, statusSizes } from '@/lib/variants/avatar-glass-variants';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

/**
 * Avatar status indicator type
 */
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for the AvatarGlass component
 *
 * A glass-themed avatar component with status indicators and size variants.
 * Displays user initials with theme-aware styling and optional status badge.
 *
 * @example
 * ```tsx
 * // Basic avatar
 * <AvatarGlass name="John Doe" />
 *
 * // With status indicator
 * <AvatarGlass name="Jane Smith" status="online" size="lg" />
 *
 * // Different sizes
 * <AvatarGlass name="Alex" size="sm" />
 * <AvatarGlass name="Sam" size="xl" />
 *
 * // As a link (asChild pattern)
 * <AvatarGlass asChild name="Sarah Connor" status="online">
 *   <a href="/profile/sarah">View Profile</a>
 * </AvatarGlass>
 * ```
 */
export interface AvatarGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>, VariantProps<typeof avatarSizes> {
  /**
   * Render as child element instead of div (polymorphic rendering).
   * Useful for making avatars clickable links.
   * @default false
   * @example
   * ```tsx
   * <AvatarGlass asChild name="John">
   *   <a href="/profile">View Profile</a>
   * </AvatarGlass>
   * ```
   */
  readonly asChild?: boolean;

  /**
   * Full name of the user. Automatically generates initials (first 2 letters).
   * @example "John Doe" → "JD"
   */
  readonly name: string;

  /**
   * Optional status indicator with glow effect
   * @default undefined
   */
  readonly status?: AvatarStatus;

  /**
   * Size variant of the avatar
   * @default "md"
   */
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
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
  ({ asChild = false, name, size = 'md', status, className, ...props }, ref) => {
    const { isHovered, hoverProps } = useHover();

    const avatarStyles: CSSProperties = {
      background: 'var(--avatar-bg)',
      border: '2px solid var(--avatar-border)',
      boxShadow: isHovered ? 'var(--avatar-hover-glow)' : 'var(--avatar-shadow)',
      color: 'var(--text-inverse)',
    };

    const initials = getInitials(name);

    // Polymorphic component - render as Slot when asChild is true
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
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
      </Comp>
    );
  }
);

AvatarGlass.displayName = 'AvatarGlass';
