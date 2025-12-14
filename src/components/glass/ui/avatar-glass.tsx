/**
 * AvatarGlass Component
 *
 * Glass-themed avatar with:
 * - Theme-aware styling (glass/light/aurora)
 * - Glow effect on hover
 * - Optional glow-pulse animation
 * - Status indicator with glow
 * - Size variants
 * - Built on Radix UI primitives
 *
 * @example Compound API (recommended)
 * ```tsx
 * <AvatarGlass size="default">
 *   <AvatarGlassImage src="/avatar.jpg" alt="User" />
 *   <AvatarGlassFallback>JD</AvatarGlassFallback>
 * </AvatarGlass>
 * ```
 *
 * @example With status indicator
 * ```tsx
 * <AvatarGlass size="lg" status="online">
 *   <AvatarGlassImage src="/avatar.jpg" alt="User" />
 *   <AvatarGlassFallback>JD</AvatarGlassFallback>
 * </AvatarGlass>
 * ```
 *
 * @example With glow animation
 * ```tsx
 * <AvatarGlass size="xl" glowing>
 *   <AvatarGlassImage src="/avatar.jpg" alt="User" />
 *   <AvatarGlassFallback>JD</AvatarGlassFallback>
 * </AvatarGlass>
 * ```
 */

'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { avatarSizes, statusSizes } from '@/lib/variants/avatar-glass-variants';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

// ========================================
// HELPERS
// ========================================

const getStatusVars = (statusType: AvatarStatus): { bg: string; glow: string } => {
  const statusVars: Record<AvatarStatus, { bg: string; glow: string }> = {
    online: { bg: 'var(--status-online)', glow: 'var(--status-online-glow)' },
    offline: { bg: 'var(--status-offline)', glow: 'none' },
    busy: { bg: 'var(--status-busy)', glow: 'var(--status-busy-glow)' },
    away: { bg: 'var(--status-away)', glow: 'var(--status-away-glow)' },
  };
  return statusVars[statusType];
};

// ========================================
// CONTEXT
// ========================================

interface AvatarGlassContextValue {
  size: AvatarSize;
  status?: AvatarStatus;
  glowing?: boolean;
}

const AvatarGlassContext = React.createContext<AvatarGlassContextValue>({
  size: 'md',
});

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

interface AvatarGlassRootProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
  status?: AvatarStatus;
  glowing?: boolean;
}

const AvatarGlassRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarGlassRootProps
>(({ className, size = 'md', status, glowing = false, children, ...props }, ref) => {
  const { isHovered, hoverProps } = useHover();

  const avatarStyles: React.CSSProperties = {
    background: 'var(--avatar-bg)',
    border: '3px solid var(--avatar-border)',
    boxShadow: isHovered ? 'var(--avatar-hover-glow)' : 'var(--avatar-shadow)',
    color: 'var(--text-inverse)',
  };

  return (
    <AvatarGlassContext.Provider value={{ size, status, glowing }}>
      <div
        className={cn('relative inline-flex', className)}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
      >
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(
            avatarSizes({ size }),
            glowing && 'animate-[glow-pulse_2s_ease-in-out_infinite]'
          )}
          style={avatarStyles}
          {...props}
        >
          {children}
        </AvatarPrimitive.Root>

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
    </AvatarGlassContext.Provider>
  );
});

AvatarGlassRoot.displayName = 'AvatarGlass';

// ========================================
// COMPOUND COMPONENT: IMAGE
// ========================================

type AvatarGlassImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

const AvatarGlassImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarGlassImageProps
>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  );
});

AvatarGlassImage.displayName = 'AvatarGlassImage';

// ========================================
// COMPOUND COMPONENT: FALLBACK
// ========================================

type AvatarGlassFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

const AvatarGlassFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarGlassFallbackProps
>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center font-semibold uppercase',
        className
      )}
      {...props}
    />
  );
});

AvatarGlassFallback.displayName = 'AvatarGlassFallback';

// ========================================
// HELPER FUNCTION (for simple use cases)
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
// SIMPLE WRAPPER (backward compatibility)
// ========================================

interface AvatarGlassSimpleProps {
  name: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  glowing?: boolean;
  className?: string;
}

const AvatarGlassSimple: React.FC<AvatarGlassSimpleProps> = ({
  name,
  size = 'md',
  status,
  glowing,
  className,
}) => {
  return (
    <AvatarGlassRoot size={size} status={status} glowing={glowing} className={className}>
      <AvatarGlassFallback>{getInitials(name)}</AvatarGlassFallback>
    </AvatarGlassRoot>
  );
};

// ========================================
// EXPORTS
// ========================================

// Compound API (shadcn/ui pattern)
export const AvatarGlass = AvatarGlassRoot;
export { AvatarGlassImage, AvatarGlassFallback };

// Simple wrapper (backward compatibility)
export { AvatarGlassSimple };
