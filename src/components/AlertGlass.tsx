// ========================================
// ALERT GLASS COMPONENT
// Alert messages with theme support
// ========================================

import { forwardRef, type ReactNode, type CSSProperties } from "react";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly type?: AlertType;
  readonly title?: string;
  readonly children: ReactNode;
  readonly dismissible?: boolean;
  readonly onDismiss?: () => void;
}

export const AlertGlass = forwardRef<HTMLDivElement, AlertGlassProps>(
  (
    {
      className,
      type = "info",
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
        info: { bg: t.alertInfoBg, border: t.alertInfoBorder, text: t.alertInfoText, icon: Info },
        success: { bg: t.alertSuccessBg, border: t.alertSuccessBorder, text: t.alertSuccessText, icon: CheckCircle },
        warning: { bg: t.alertWarningBg, border: t.alertWarningBorder, text: t.alertWarningText, icon: AlertTriangle },
        error: { bg: t.alertDangerBg, border: t.alertDangerBorder, text: t.alertDangerText, icon: AlertCircle },
      };
      return types[type];
    };

    const config = getTypeConfig();
    const Icon = config.icon;

    const alertStyles: CSSProperties = {
      background: config.bg,
      border: `1px solid ${config.border}`,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-3 p-4 rounded-xl transition-all duration-300",
          className
        )}
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
          <p
            className="text-sm"
            style={{ color: `${config.text}cc` }}
          >
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

AlertGlass.displayName = "AlertGlass";
