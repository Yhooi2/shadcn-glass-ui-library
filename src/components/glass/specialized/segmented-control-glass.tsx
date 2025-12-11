// ========================================
// SEGMENTED CONTROL GLASS COMPONENT
// ========================================

import { forwardRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface SegmentOption {
  readonly value: string;
  readonly label: string;
}

export interface SegmentedControlGlassProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  readonly options: readonly SegmentOption[];
  readonly value: string;
  readonly onChange?: (value: string) => void;
}

export const SegmentedControlGlass = forwardRef<HTMLDivElement, SegmentedControlGlassProps>(
  ({ options = [], value, onChange, className, ...props }, ref) => {
    const containerStyles: CSSProperties = {
      border: '1px solid var(--segmented-container-border)',
      background: 'var(--segmented-container-bg)',
    };

    // Early return if no options provided
    if (!options || options.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('inline-flex rounded-xl overflow-hidden', className)}
        style={containerStyles}
        role="tablist"
        {...props}
      >
        {options.map((opt) => {
          const isActive = value === opt.value;
          const buttonStyles: CSSProperties = {
            background: isActive ? 'var(--segmented-active-bg)' : 'transparent',
            color: isActive ? 'var(--segmented-active-text)' : 'var(--segmented-inactive-text)',
          };

          return (
            <button
              key={opt.value}
              onClick={() => onChange?.(opt.value)}
              className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-300"
              style={buttonStyles}
              type="button"
              role="tab"
              aria-selected={isActive}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedControlGlass.displayName = 'SegmentedControlGlass';
