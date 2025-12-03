/**
 * AlertGlass Component
 *
 * Glass-themed alert with:
 * - Theme-aware styling via CSS variables (glass/light/aurora)
 * - Multiple types (info, success, warning, error)
 * - Optional title
 * - Dismissible option
 * - Backdrop blur effect
 */

import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import {
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { alertVariants } from '@/lib/variants/alert-glass-variants';
import '@/glass-theme.css';

import type { AlertType } from '@/lib/variants/alert-glass-variants';

// ========================================
// ICON MAP
// ========================================

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

// ========================================
// CSS VARIABLE HELPERS
// ========================================

type AlertStyleVars = { bg: string; border: string; text: string };

const typeStyles: Record<AlertType, AlertStyleVars> = {
  info: {
    bg: 'var(--alert-info-bg)',
    border: 'var(--alert-info-border)',
    text: 'var(--alert-info-text)',
  },
  success: {
    bg: 'var(--alert-success-bg)',
    border: 'var(--alert-success-border)',
    text: 'var(--alert-success-text)',
  },
  warning: {
    bg: 'var(--alert-warning-bg)',
    border: 'var(--alert-warning-border)',
    text: 'var(--alert-warning-text)',
  },
  error: {
    bg: 'var(--alert-danger-bg)',
    border: 'var(--alert-danger-border)',
    text: 'var(--alert-danger-text)',
  },
};

const getAlertStyles = (type: AlertType): CSSProperties => {
  const config = typeStyles[type];
  return {
    background: config.bg,
    border: `1px solid ${config.border}`,
  };
};

// ========================================
// PROPS INTERFACE
// ========================================

export interface AlertGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'title'>,
    VariantProps<typeof alertVariants> {
  readonly title?: string;
  readonly children: ReactNode;
  readonly dismissible?: boolean;
  readonly onDismiss?: () => void;
}

// ========================================
// COMPONENT
// ========================================

export const AlertGlass = forwardRef<HTMLDivElement, AlertGlassProps>(
  (
    {
      className,
      type = 'info',
      title,
      children,
      dismissible,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const config = typeStyles[type ?? 'info'];
    const Icon = iconMap[type ?? 'info'];

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ type }), className)}
        style={getAlertStyles(type ?? 'info')}
        role="alert"
        {...props}
      >
        <Icon
          className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5"
          style={{ color: config.text }}
        />
        <div className="flex-1">
          {title && (
            <p
              className="font-medium text-xs md:text-sm mb-0.5 md:mb-1"
              style={{ color: config.text }}
            >
              {title}
            </p>
          )}
          <p className="text-xs md:text-sm opacity-80" style={{ color: config.text }}>
            {children}
          </p>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="p-0.5 md:p-1 rounded transition-colors duration-200 hover:bg-black/5 flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: config.text }} />
          </button>
        )}
      </div>
    );
  }
);

AlertGlass.displayName = 'AlertGlass';
