// ========================================
// STAT ITEM GLASS - ATOMIC COMPONENT
// Compact stat display with icon and label
// Level 2: Atomic (extracted from ProfileHeaderGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

const statItemVariants = cva('flex items-center gap-1', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    layout: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start gap-0.5',
    },
  },
  defaultVariants: {
    size: 'md',
    layout: 'horizontal',
  },
});

export interface StatItemGlassProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statItemVariants> {
  /** Lucide icon component */
  readonly icon: LucideIcon;
  /** Stat value (number or formatted string) */
  readonly value: number | string;
  /** Stat label */
  readonly label: string;
  /** Icon size in pixels */
  readonly iconSize?: number;
  /** Abbreviated format for mobile (1.2k instead of 1234) */
  readonly abbreviated?: boolean;
}

export const StatItemGlass = forwardRef<HTMLSpanElement, StatItemGlassProps>(
  (
    {
      icon: Icon,
      value,
      label,
      iconSize = 16,
      abbreviated = false,
      size,
      layout,
      className,
      ...props
    },
    ref
  ) => {
    const textStyles: CSSProperties = {
      color: 'var(--text-secondary)',
    };

    const iconStyles: CSSProperties = {
      color: 'var(--text-accent)',
    };

    const formatValue = (val: number | string): string => {
      if (!abbreviated || typeof val !== 'number') return String(val);

      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
      return String(val);
    };

    return (
      <span
        ref={ref}
        className={cn(statItemVariants({ size, layout }), className)}
        style={textStyles}
        {...props}
      >
        <Icon size={iconSize} style={iconStyles} />
        <span className="font-medium">
          {formatValue(value)} {label}
        </span>
      </span>
    );
  }
);

StatItemGlass.displayName = 'StatItemGlass';
