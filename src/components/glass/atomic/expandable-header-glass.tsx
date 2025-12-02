// ========================================
// EXPANDABLE HEADER GLASS - ATOMIC COMPONENT
// Collapsible section header with icon and chevron
// Level 2: Atomic (extracted from FlagsSectionGlass)
// ========================================

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { ChevronUp, ChevronDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface ExpandableHeaderGlassProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Header title */
  readonly title: ReactNode;
  /** Leading icon component */
  readonly icon?: LucideIcon;
  /** Icon color (CSS variable or color value) */
  readonly iconColor?: string;
  /** Expanded state */
  readonly expanded: boolean;
  /** Toggle callback */
  readonly onToggle?: () => void;
}

export const ExpandableHeaderGlass = forwardRef<
  HTMLButtonElement,
  ExpandableHeaderGlassProps
>(
  (
    {
      title,
      icon: Icon,
      iconColor = 'var(--text-accent)',
      expanded,
      onToggle,
      className,
      ...props
    },
    ref
  ) => {
    const textStyles: CSSProperties = {
      color: 'var(--text-primary)',
    };

    const chevronStyles: CSSProperties = {
      color: 'var(--text-muted)',
    };

    const iconStyles: CSSProperties = {
      color: iconColor,
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={cn(
          'w-full p-4 flex items-center justify-between rounded-2xl transition-colors hover:bg-white/5',
          className
        )}
        style={textStyles}
        {...props}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" style={iconStyles} />}
          <span className="font-medium">{title}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5" style={chevronStyles} />
        ) : (
          <ChevronDown className="w-5 h-5" style={chevronStyles} />
        )}
      </button>
    );
  }
);

ExpandableHeaderGlass.displayName = 'ExpandableHeaderGlass';
