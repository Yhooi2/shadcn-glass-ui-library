/**
 * AlertGlass Component
 *
 * Glass-themed alert with:
 * - Theme-aware styling (glass/light/aurora)
 * - Multiple types (info, success, warning, error)
 * - Optional title
 * - Dismissible option
 * - Backdrop blur effect
 */

import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import { themeStyles } from '@/lib/themeStyles';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type AlertType = 'info' | 'success' | 'warning' | 'error';

// ========================================
// TYPE VARIANTS (using CVA)
// ========================================

const alertVariants = cva(
  'flex items-start gap-3 p-4 rounded-xl transition-all duration-300',
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
// ICON MAP
// ========================================

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
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
    const { theme } = useTheme();
    const t = themeStyles[theme];

    const getTypeConfig = () => {
      const types = {
        info: {
          bg: t.alertInfoBg,
          border: t.alertInfoBorder,
          text: t.alertInfoText,
        },
        success: {
          bg: t.alertSuccessBg,
          border: t.alertSuccessBorder,
          text: t.alertSuccessText,
        },
        warning: {
          bg: t.alertWarningBg,
          border: t.alertWarningBorder,
          text: t.alertWarningText,
        },
        error: {
          bg: t.alertDangerBg,
          border: t.alertDangerBorder,
          text: t.alertDangerText,
        },
      };
      return types[type ?? 'info'];
    };

    const config = getTypeConfig();
    const Icon = iconMap[type ?? 'info'];

    const alertStyles: CSSProperties = {
      background: config.bg,
      border: `1px solid ${config.border}`,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    };

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ type }), className)}
        style={alertStyles}
        role="alert"
        {...props}
      >
        <Icon
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          style={{ color: config.text }}
        />
        <div className="flex-1">
          {title && (
            <p
              className="font-medium text-sm mb-1"
              style={{ color: config.text }}
            >
              {title}
            </p>
          )}
          <p className="text-sm" style={{ color: `${config.text}cc` }}>
            {children}
          </p>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="p-1 rounded transition-colors duration-200 hover:bg-black/5 flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" style={{ color: config.text }} />
          </button>
        )}
      </div>
    );
  }
);

AlertGlass.displayName = 'AlertGlass';

export { alertVariants as alertGlassVariants };
