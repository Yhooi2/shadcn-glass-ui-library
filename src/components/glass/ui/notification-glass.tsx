/**
 * NotificationGlass Component
 *
 * Glass-themed toast notification with:
 * - Theme-aware styling (glass/light/aurora)
 * - Type variants (info/success/warning/error)
 * - Glow effect on hover
 * - Dismissible
 */

import { forwardRef, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { notificationVariants } from '@/lib/variants/notification-glass-variants';
import { ICON_SIZES } from '@/components/glass/primitives';
import '@/glass-theme.css';

import type { NotificationType } from '@/lib/variants/notification-glass-variants';

// ========================================
// CONSTANTS
// ========================================

const NOTIFICATION_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

// ========================================
// PROPS INTERFACE
// ========================================

export interface NotificationGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'style'>,
    VariantProps<typeof notificationVariants> {
  readonly title: string;
  readonly message: string;
  /**
   * @deprecated Use `variant` prop instead. Will be removed in v4.0.
   * Maps to: info → default, error → destructive, success/warning unchanged
   */
  readonly type?: NotificationType;
  /** Notification variant (shadcn/ui compatible). Takes precedence over deprecated `type` prop. */
  readonly variant?: 'default' | 'destructive' | 'success' | 'warning';
  readonly onClose: () => void;
}

// ========================================
// COMPONENT
// ========================================

// Type-specific CSS variable mapping
const getTypeVars = (notifType: NotificationType): { color: string; glow: string; iconBg: string } => {
  const configs: Record<NotificationType, { color: string; glow: string; iconBg: string }> = {
    info: { color: 'var(--notification-info-color)', glow: 'var(--notification-info-glow)', iconBg: 'var(--notification-info-icon-bg)' },
    success: { color: 'var(--notification-success-color)', glow: 'var(--notification-success-glow)', iconBg: 'var(--notification-success-icon-bg)' },
    warning: { color: 'var(--notification-warning-color)', glow: 'var(--notification-warning-glow)', iconBg: 'var(--notification-warning-icon-bg)' },
    error: { color: 'var(--notification-error-color)', glow: 'var(--notification-error-glow)', iconBg: 'var(--notification-error-icon-bg)' },
  };
  return configs[notifType];
};

export const NotificationGlass = forwardRef<HTMLDivElement, NotificationGlassProps>(
  ({ type, variant, title, message, onClose, className, ...props }, ref) => {
    // Map variant to type for backward compatibility
    // variant takes precedence over type
    const variantToType: Record<string, NotificationType> = {
      default: 'info',
      destructive: 'error',
      success: 'success',
      warning: 'warning',
    };

    const effectiveType: NotificationType = variant
      ? variantToType[variant] || 'info'
      : (type || 'info');

    const { isHovered, hoverProps } = useHover();
    const Icon = NOTIFICATION_ICONS[effectiveType];
    const config = getTypeVars(effectiveType);

    const containerStyles: CSSProperties = {
      background: 'var(--notification-bg)',
      border: '1px solid var(--notification-border)',
      boxShadow: isHovered ? config.glow : 'var(--notification-shadow)',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    };

    const iconContainerStyles: CSSProperties = {
      background: config.iconBg,
      boxShadow: isHovered ? config.glow : 'none',
    };

    return (
      <div
        ref={ref}
        className={cn(notificationVariants({ type: effectiveType }), className)}
        style={containerStyles}
        role="alert"
        aria-live="polite"
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        {...props}
      >
        {/* Icon with glow */}
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0"
          style={iconContainerStyles}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: config.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs md:text-sm mb-0.5 md:mb-1" style={{ color: 'var(--text-primary)' }}>
            {title}
          </p>
          <p className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1 md:p-1.5 rounded-lg shrink-0"
          style={{ color: 'var(--text-muted)' }}
          type="button"
          aria-label="Close notification"
        >
          <X className={ICON_SIZES.md} />
        </button>
      </div>
    );
  }
);

NotificationGlass.displayName = 'NotificationGlass';
