/**
 * AlertGlass Component
 *
 * Glass-themed alert with:
 * - Theme-aware styling via CSS variables (glass/light/aurora)
 * - shadcn/ui compatible variants (default, destructive)
 * - Extended Glass UI variants (success, warning)
 * - Compound component API for flexible composition
 * - Dismissible option
 * - Backdrop blur effect
 *
 * @example Compound API (recommended)
 * ```tsx
 * <AlertGlass variant="default">
 *   <AlertGlassTitle>Heads up!</AlertGlassTitle>
 *   <AlertGlassDescription>
 *     You can add components to your app using the cli.
 *   </AlertGlassDescription>
 * </AlertGlass>
 * ```
 *
 * @example With dismiss button
 * ```tsx
 * <AlertGlass variant="destructive" dismissible onDismiss={() => setShow(false)}>
 *   <AlertGlassTitle>Error</AlertGlassTitle>
 *   <AlertGlassDescription>
 *     Your session has expired.
 *   </AlertGlassDescription>
 * </AlertGlass>
 * ```
 */

'use client';

import { forwardRef, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
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
    color: config.text,
  };
};

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

export interface AlertGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>, VariantProps<typeof alertVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
}

const AlertGlassRoot = forwardRef<HTMLDivElement, AlertGlassProps>(
  ({ className, variant = 'default', dismissible, onDismiss, children, ...props }, ref) => {
    const effectiveVariant: AlertVariant = variant ?? 'default';
    const Icon = iconMap[effectiveVariant];
    const config = variantStyles[effectiveVariant];

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant: effectiveVariant }), className)}
        style={getAlertStyles(effectiveVariant)}
        role="alert"
        {...props}
      >
        <Icon
          className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5"
          style={{ color: config.text }}
          aria-hidden="true"
        />
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="p-0.5 md:p-1 rounded transition-colors duration-200 hover:bg-black/5 shrink-0"
            aria-label="Dismiss alert"
          >
            <X className={ICON_SIZES.md} style={{ color: config.text }} />
          </button>
        )}
      </div>
    );
  }
);

AlertGlassRoot.displayName = 'AlertGlass';

// ========================================
// COMPOUND COMPONENT: TITLE
// ========================================

export type AlertGlassTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

const AlertGlassTitle = forwardRef<HTMLParagraphElement, AlertGlassTitleProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('font-medium text-xs md:text-sm mb-0.5 md:mb-1', className)}
        style={{ color: 'inherit', ...style }}
        {...props}
      />
    );
  }
);

AlertGlassTitle.displayName = 'AlertGlassTitle';

// ========================================
// COMPOUND COMPONENT: DESCRIPTION
// ========================================

export type AlertGlassDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const AlertGlassDescription = forwardRef<HTMLParagraphElement, AlertGlassDescriptionProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-xs md:text-sm opacity-80', className)}
        style={{ color: 'inherit', ...style }}
        {...props}
      />
    );
  }
);

AlertGlassDescription.displayName = 'AlertGlassDescription';

// ========================================
// EXPORTS
// ========================================

// Compound API (shadcn/ui pattern)
export const AlertGlass = AlertGlassRoot;
export { AlertGlassTitle, AlertGlassDescription };
