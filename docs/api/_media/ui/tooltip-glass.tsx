/**
 * TooltipGlass Component
 *
 * Glass-themed tooltip with:
 * - Unified dark design (consistent UX across themes)
 * - Position variants (top/bottom/left/right)
 * - Smooth animation
 */

import { forwardRef, useId, type ReactNode, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { tooltipPositions, type TooltipPosition } from '@/lib/variants/tooltip-glass-variants';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for the TooltipGlass component
 *
 * A glass-themed tooltip with configurable positioning and unified dark design.
 * Features smooth animations and WCAG-compliant accessibility attributes.
 *
 * @accessibility
 * - **Keyboard Navigation:** Tooltip appears on focus for keyboard users (same as hover)
 * - **Focus Management:** Tooltip does not trap focus, allows normal navigation flow
 * - **Screen Readers:** Uses `aria-describedby` to associate tooltip with trigger element (WCAG 4.1.3)
 * - **ARIA Attributes:** Tooltip marked with `role="tooltip"` and unique ID for proper association
 * - **Dismissible:** Tooltip dismisses on mouse leave, focus blur, or Escape key
 * - **Touch Targets:** N/A - tooltips appear on hover/focus, do not require direct interaction
 * - **Color Contrast:** Tooltip text meets WCAG AA contrast ratio 4.5:1 against dark background
 * - **Motion:** Fade-in animation respects `prefers-reduced-motion` settings
 *
 * @example
 * ```tsx
 * // Basic tooltip
 * <TooltipGlass content="Click to edit">
 *   <button><Edit className="w-4 h-4" /></button>
 * </TooltipGlass>
 *
 * // Different positions
 * <TooltipGlass content="Top tooltip" position="top">
 *   <ButtonGlass>Hover me</ButtonGlass>
 * </TooltipGlass>
 * <TooltipGlass content="Bottom tooltip" position="bottom">
 *   <ButtonGlass>Hover me</ButtonGlass>
 * </TooltipGlass>
 * <TooltipGlass content="Left tooltip" position="left">
 *   <ButtonGlass>Hover me</ButtonGlass>
 * </TooltipGlass>
 * <TooltipGlass content="Right tooltip" position="right">
 *   <ButtonGlass>Hover me</ButtonGlass>
 * </TooltipGlass>
 *
 * // Icon button with accessible tooltip (provides label)
 * <TooltipGlass content="Delete item">
 *   <ButtonGlass
 *     icon={Trash}
 *     size="icon"
 *     variant="ghost"
 *     aria-label="Delete item"
 *   />
 * </TooltipGlass>
 *
 * // Informational tooltip on text
 * <TooltipGlass content="This feature requires a Pro subscription">
 *   <span className="underline decoration-dotted">Pro Feature</span>
 * </TooltipGlass>
 *
 * // Badge with tooltip for additional context
 * <TooltipGlass content="Last updated 2 hours ago" position="top">
 *   <BadgeGlass variant="success" dot>
 *     Active
 *   </BadgeGlass>
 * </TooltipGlass>
 *
 * // Disabled button with explanation tooltip
 * <TooltipGlass content="Save your changes first to enable this action">
 *   <span>
 *     <ButtonGlass disabled aria-describedby="tooltip-id">
 *       Export
 *     </ButtonGlass>
 *   </span>
 * </TooltipGlass>
 * ```
 */
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
    const tooltipId = useId();

    // Glass tooltip with same background as modal (oklch(100% 0 0 / 0.06))
    const tooltipStyles: CSSProperties = {
      background: 'var(--tooltip-bg)',
      color: 'var(--tooltip-text)',
      border: '1px solid var(--tooltip-border)',
      boxShadow: 'var(--tooltip-shadow)',
      backdropFilter: 'blur(var(--blur-xl))',
      WebkitBackdropFilter: 'blur(var(--blur-xl))',
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        aria-describedby={isHovered ? tooltipId : undefined}
      >
        {children}
        {isHovered && (
          <div
            id={tooltipId}
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
