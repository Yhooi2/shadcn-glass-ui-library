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
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// ========================================
// TYPE VARIANTS (using CVA)
// ========================================

const notificationVariants = cva(
  'flex items-start gap-4 p-5 rounded-2xl min-w-[320px] max-w-[420px] transition-all duration-300',
  {
    variants: {
      type: {
        info: '',
        success: '',
        warning: '',
        error: '',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);

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
  readonly type?: NotificationType;
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
  ({ type = 'info', title, message, onClose, className, ...props }, ref) => {
    const { isHovered, hoverProps } = useHover();
    const Icon = NOTIFICATION_ICONS[type];
    const config = getTypeVars(type);

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
        className={cn(notificationVariants({ type }), className)}
        style={containerStyles}
        role="alert"
        aria-live="polite"
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        {...props}
      >
        {/* Icon with glow */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={iconContainerStyles}
        >
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
            {title}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg shrink-0"
          style={{ color: 'var(--text-muted)' }}
          type="button"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
);

NotificationGlass.displayName = 'NotificationGlass';

export { notificationVariants as notificationGlassVariants };
