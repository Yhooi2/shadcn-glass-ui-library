// ========================================
// FLAG ALERT GLASS COMPONENT
// Individual warning/danger flag alert
// ========================================

import { forwardRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { StatusIndicatorGlass, type StatusType } from './status-indicator-glass';
import '@/glass-theme.css';

export type FlagType = 'warning' | 'danger';

export interface FlagAlertGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly type?: FlagType;
  readonly title: string;
  readonly description?: string;
}

// CSS variable maps for flag types
const flagVarMap: Record<
  FlagType,
  { bg: string; border: string; text: string; statusType: StatusType }
> = {
  danger: {
    bg: 'var(--alert-danger-bg)',
    border: 'var(--alert-danger-border)',
    text: 'var(--alert-danger-text)',
    statusType: 'red',
  },
  warning: {
    bg: 'var(--alert-warning-bg)',
    border: 'var(--alert-warning-border)',
    text: 'var(--alert-warning-text)',
    statusType: 'yellow',
  },
};

export const FlagAlertGlass = forwardRef<HTMLDivElement, FlagAlertGlassProps>(
  ({ type = 'warning', title, description, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const config = flagVarMap[type];

    const alertStyles: CSSProperties = {
      background: config.bg,
      borderColor: config.border,
      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
    };

    return (
      <div
        ref={ref}
        className={cn('p-2.5 md:p-3 rounded-xl border transition-all duration-300', className)}
        style={alertStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="alert"
        {...props}
      >
        <div
          className="flex items-center gap-1.5 md:gap-2 font-medium text-xs md:text-sm"
          style={{ color: config.text }}
        >
          <StatusIndicatorGlass type={config.statusType} />
          {title}
        </div>
        {description && (
          <p className="text-(length:--font-size-2xs) md:text-xs mt-0.5 md:mt-1 ml-4 md:ml-5 text-(--text-muted)">
            {description}
          </p>
        )}
      </div>
    );
  }
);

FlagAlertGlass.displayName = 'FlagAlertGlass';
