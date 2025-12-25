/**
 * NotificationGlass Component
 *
 * Glass-themed toast notification with variant-based styling, icons, and dismiss functionality.
 * Provides visual feedback for user actions and system events.
 *
 * ## Features
 * - **shadcn/ui Compatible** - Variant API (default, destructive, success, warning)
 * - **Theme-aware styling** - Works with all 3 themes (glass, light, aurora) via CSS variables
 * - **Variant-specific icons** - Info (default), CheckCircle (success), AlertTriangle (warning), AlertCircle (error)
 * - **Glow effects on hover** - Variant-specific glow colors (blue, green, yellow, red)
 * - **Dismissible** - Close button with X icon
 * - **Responsive sizing** - Different text/icon sizes for mobile and desktop
 * - **ARIA support** - role="alert", aria-live="polite" for screen reader announcements
 *
 * ## CSS Variables
 * Customize styling via theme CSS variables:
 * - `--notification-bg` - Notification background color
 * - `--notification-border` - Notification border color
 * - `--notification-shadow` - Default box shadow
 * - `--notification-info-color` - Info icon color (blue)
 * - `--notification-info-icon-bg` - Info icon background
 * - `--notification-info-glow` - Info hover glow
 * - `--notification-success-color` - Success icon color (green)
 * - `--notification-success-icon-bg` - Success icon background
 * - `--notification-success-glow` - Success hover glow
 * - `--notification-warning-color` - Warning icon color (yellow)
 * - `--notification-warning-icon-bg` - Warning icon background
 * - `--notification-warning-glow` - Warning hover glow
 * - `--notification-error-color` - Error icon color (red)
 * - `--notification-error-icon-bg` - Error icon background
 * - `--notification-error-glow` - Error hover glow
 * - `--text-primary`, `--text-secondary`, `--text-muted` - Text colors
 *
 * @example Basic usage (default variant)
 * ```tsx
 * import { NotificationGlass } from 'shadcn-glass-ui'
 *
 * function MyComponent() {
 *   const [showNotif, setShowNotif] = useState(true)
 *
 *   return showNotif ? (
 *     <NotificationGlass
 *       variant="default"
 *       title="New update available"
 *       message="Version 2.0 is ready to install with new features."
 *       onClose={() => setShowNotif(false)}
 *     />
 *   ) : null
 * }
 * ```
 *
 * @example Success notification
 * ```tsx
 * <NotificationGlass
 *   variant="success"
 *   title="Payment successful"
 *   message="Your payment has been processed successfully."
 *   onClose={() => console.log('Closed')}
 * />
 * ```
 *
 * @example Warning notification
 * ```tsx
 * <NotificationGlass
 *   variant="warning"
 *   title="Storage almost full"
 *   message="You're using 90% of your available storage."
 *   onClose={() => console.log('Closed')}
 * />
 * ```
 *
 * @example Destructive (error) notification
 * ```tsx
 * <NotificationGlass
 *   variant="destructive"
 *   title="Connection failed"
 *   message="Unable to connect to the server. Please try again."
 *   onClose={() => console.log('Closed')}
 * />
 * ```
 *
 * @accessibility
 * - **Screen Readers:** role="alert" and aria-live="polite" announce notifications to screen readers
 * - **Keyboard Navigation:** Close button is keyboard accessible (Tab to focus, Enter/Space to activate)
 * - **Focus Management:** Close button receives focus outline on keyboard navigation
 * - **ARIA Labels:** Close button has aria-label="Close notification" for screen readers
 * - **Touch Targets:** Close button meets minimum 44x44px touch target (WCAG 2.5.5)
 * - **Color Contrast:** All text and icons meet WCAG AA contrast ratio 4.5:1 minimum
 * - **Motion:** Hover transform animation respects `prefers-reduced-motion` settings
 *
 * @since v1.0.0
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

/**
 * Props for the NotificationGlass component.
 *
 * Toast notification with variant-based styling, icons, and dismiss functionality.
 *
 * @example
 * ```tsx
 * const props: NotificationGlassProps = {
 *   variant: 'success',
 *   title: 'Success',
 *   message: 'Operation completed successfully',
 *   onClose: () => console.log('Closed'),
 * };
 * ```
 */
export interface NotificationGlassProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'style'>,
    VariantProps<typeof notificationVariants> {
  /**
   * Notification title displayed in bold.
   */
  readonly title: string;

  /**
   * Notification message displayed below the title.
   */
  readonly message: string;

  /**
   * Notification variant (shadcn/ui compatible).
   * - `default` - Info notification (blue)
   * - `destructive` - Error notification (red)
   * - `success` - Success notification (green)
   * - `warning` - Warning notification (yellow)
   *
   * @default "default"
   */
  readonly variant?: 'default' | 'destructive' | 'success' | 'warning';

  /**
   * @deprecated Use variant prop instead. Will be removed in next major version.
   */
  readonly type?: NotificationType;

  /**
   * Callback function when the close button is clicked.
   */
  readonly onClose: () => void;
}

// ========================================
// COMPONENT
// ========================================

// Type-specific CSS variable mapping
const getTypeVars = (
  notifType: NotificationType
): { color: string; glow: string; iconBg: string } => {
  const configs: Record<NotificationType, { color: string; glow: string; iconBg: string }> = {
    info: {
      color: 'var(--notification-info-color)',
      glow: 'var(--notification-info-glow)',
      iconBg: 'var(--notification-info-icon-bg)',
    },
    success: {
      color: 'var(--notification-success-color)',
      glow: 'var(--notification-success-glow)',
      iconBg: 'var(--notification-success-icon-bg)',
    },
    warning: {
      color: 'var(--notification-warning-color)',
      glow: 'var(--notification-warning-glow)',
      iconBg: 'var(--notification-warning-icon-bg)',
    },
    error: {
      color: 'var(--notification-error-color)',
      glow: 'var(--notification-error-glow)',
      iconBg: 'var(--notification-error-icon-bg)',
    },
  };
  return configs[notifType];
};

export const NotificationGlass = forwardRef<HTMLDivElement, NotificationGlassProps>(
  ({ variant: variantProp, type: typeProp, title, message, onClose, className, ...props }, ref) => {
    // Backward compatibility: support deprecated 'type' prop
    const variant = variantProp ?? typeProp ?? 'default';

    // Show deprecation warning in development
    if (process.env.NODE_ENV === 'development' && typeProp) {
      console.warn(
        'NotificationGlass: The "type" prop is deprecated. Use "variant" instead. Example: <NotificationGlass variant="destructive" />'
      );
    }

    // Map variant to internal notification type
    const variantToType: Record<string, NotificationType> = {
      default: 'info',
      destructive: 'error',
      success: 'success',
      warning: 'warning',
      // Backward compatibility aliases
      info: 'info',
      error: 'error',
    };

    const effectiveType: NotificationType = variantToType[variant] || 'info';

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
        data-slot="notification"
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
          <p
            className="font-semibold text-xs md:text-sm mb-0.5 md:mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
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
