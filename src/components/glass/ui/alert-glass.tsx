/**
 * AlertGlass Component
 *
 * Glass-themed alert with:
 * - Theme-aware styling via CSS variables (glass/light/aurora)
 * - shadcn/ui compatible variants (default, destructive)
 * - Extended Glass UI variants (success, warning)
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
import { ICON_SIZES } from '@/components/glass/primitives';
import '@/glass-theme.css';

import type { AlertVariant } from '@/lib/variants/alert-glass-variants';

// ========================================
// ICON MAP
// ========================================

const iconMap: Record<AlertVariant, typeof Info> = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  // Aliases
  info: Info,
  error: AlertCircle,
};

// ========================================
// CSS VARIABLE HELPERS
// ========================================

type AlertStyleVars = { bg: string; border: string; text: string };

const variantStyles: Record<AlertVariant, AlertStyleVars> = {
  // shadcn/ui compatible variants
  default: {
    bg: 'var(--alert-default-bg)',
    border: 'var(--alert-default-border)',
    text: 'var(--alert-default-text)',
  },
  destructive: {
    bg: 'var(--alert-destructive-bg)',
    border: 'var(--alert-destructive-border)',
    text: 'var(--alert-destructive-text)',
  },
  // Glass UI extended variants
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
  // Backward compatibility aliases
  info: {
    bg: 'var(--alert-default-bg)',
    border: 'var(--alert-default-border)',
    text: 'var(--alert-default-text)',
  },
  error: {
    bg: 'var(--alert-destructive-bg)',
    border: 'var(--alert-destructive-border)',
    text: 'var(--alert-destructive-text)',
  },
};

const getAlertStyles = (variant: AlertVariant): CSSProperties => {
  const config = variantStyles[variant];
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
      variant = 'default',
      title,
      children,
      dismissible,
      onDismiss,
      ...props
    },
    ref
  ) => {

    const config = variantStyles[variant];
    const Icon = iconMap[variant];

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        style={getAlertStyles(variant)}
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
            <X className={ICON_SIZES.md} style={{ color: config.text }} />
          </button>
        )}
      </div>
    );
  }
);

AlertGlass.displayName = 'AlertGlass';
