/**
 * TouchTarget Component
 *
 * Ensures minimum touch target size compliance with Apple Human Interface Guidelines.
 * Wraps interactive elements to guarantee accessibility on touch devices.
 *
 * Apple HIG recommends minimum 44×44pt (44×44px) touch targets.
 * Material Design recommends 48×48dp for better accessibility.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/layout
 */

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the TouchTarget component
 */
export interface TouchTargetProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Child element(s) to wrap with touch target
   */
  children: ReactNode;

  /**
   * Minimum touch target size in pixels
   * @default 44 - Apple HIG minimum
   */
  minSize?: 44 | 48;

  /**
   * Center content within touch target
   * @default true
   */
  center?: boolean;
}

/**
 * TouchTarget wrapper component
 *
 * Ensures interactive elements meet accessibility standards for touch devices.
 * Automatically applies minimum dimensions and optional centering.
 *
 * @example
 * ```tsx
 * // Basic usage with default 44px minimum
 * <TouchTarget>
 *   <button className="w-8 h-8">×</button>
 * </TouchTarget>
 *
 * // Material Design 48px minimum
 * <TouchTarget minSize={48}>
 *   <Checkbox />
 * </TouchTarget>
 *
 * // Custom alignment
 * <TouchTarget center={false} className="justify-start">
 *   <IconButton />
 * </TouchTarget>
 * ```
 */
export const TouchTarget = forwardRef<HTMLDivElement, TouchTargetProps>(
  ({ children, minSize = 44, center = true, className, ...props }, ref) => {
    // Map minSize to Tailwind classes
    // 44px = 11 × 4px (min-h-11, min-w-11)
    // 48px = 12 × 4px (min-h-12, min-w-12)
    const sizeClass = minSize === 44 ? 'min-h-11 min-w-11' : 'min-h-12 min-w-12';

    return (
      <div
        ref={ref}
        className={cn(
          sizeClass,
          center && 'flex items-center justify-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TouchTarget.displayName = 'TouchTarget';
