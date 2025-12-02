/**
 * TooltipGlass Component
 *
 * Glass-themed tooltip with:
 * - Unified dark design (consistent UX across themes)
 * - Position variants (top/bottom/left/right)
 * - Smooth animation
 */

import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

// ========================================
// POSITION VARIANTS (using CVA)
// ========================================

const tooltipPositions = cva(
  'absolute z-50 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 animate-float',
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  }
);

// ========================================
// PROPS INTERFACE
// ========================================

export interface TooltipGlassProps extends VariantProps<typeof tooltipPositions> {
  readonly children: ReactNode;
  readonly content: string;
  readonly position?: TooltipPosition;
  readonly className?: string;
}

// ========================================
// COMPONENT
// ========================================

export const TooltipGlass = forwardRef<HTMLDivElement, TooltipGlassProps>(
  ({ children, content, position = 'top', className }, ref) => {
    const { isHovered, hoverProps } = useHover();

    // Unified dark tooltip design for all themes (consistent UX)
    const tooltipStyles: CSSProperties = {
      background: 'var(--tooltip-bg)',
      color: 'var(--tooltip-text)',
      border: 'none',
      boxShadow: 'var(--tooltip-shadow)',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
      >
        {children}
        {isHovered && (
          <div
            className={cn(tooltipPositions({ position }))}
            style={tooltipStyles}
            role="tooltip"
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

TooltipGlass.displayName = 'TooltipGlass';

export { tooltipPositions as tooltipGlassVariants };
