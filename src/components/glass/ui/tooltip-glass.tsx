/**
 * TooltipGlass Component
 *
 * Glass-themed tooltip with:
 * - Unified dark design (consistent UX across themes)
 * - Position variants (top/bottom/left/right)
 * - Smooth animation
 */

import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { tooltipPositions, type TooltipPosition } from '@/lib/variants/tooltip-glass-variants';
import '@/glass-theme.css';

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

    // Glass tooltip design with backdrop blur
    const tooltipStyles: CSSProperties = {
      background: 'var(--tooltip-bg)',
      color: 'var(--tooltip-text)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: 'var(--tooltip-shadow)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
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
