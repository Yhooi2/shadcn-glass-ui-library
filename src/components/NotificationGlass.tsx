// ========================================
// NOTIFICATION GLASS COMPONENT
// Toast notifications with theme support
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.css";

export type NotificationType = "info" | "success" | "warning" | "error";

const NOTIFICATION_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

export interface NotificationGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  readonly title: string;
  readonly message: string;
  readonly type?: NotificationType;
  readonly onClose: () => void;
}

export const NotificationGlass = forwardRef<HTMLDivElement, NotificationGlassProps>(
  ({ type = "info", title, message, onClose, className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isHovered, setIsHovered] = useState(false);

    const isGlass = theme === "glass";
    const Icon = NOTIFICATION_ICONS[type];

    // Get type-specific colors
    const getTypeStyles = (): { bg: string; border: string; text: string; glow: string } => {
      const types: Record<NotificationType, { bg: string; border: string; text: string; glow: string }> = {
        info: {
          bg: t.alertInfoBg,
          border: t.alertInfoBorder,
          text: t.alertInfoText,
          glow: isGlass ? `0 0 20px ${t.statusBlue}40` : "none",
        },
        success: {
          bg: t.alertSuccessBg,
          border: t.alertSuccessBorder,
          text: t.alertSuccessText,
          glow: isGlass ? `0 0 20px ${t.statusGreen}40` : "none",
        },
        warning: {
          bg: t.alertWarningBg,
          border: t.alertWarningBorder,
          text: t.alertWarningText,
          glow: isGlass ? `0 0 20px ${t.statusYellow}40` : "none",
        },
        error: {
          bg: t.alertDangerBg,
          border: t.alertDangerBorder,
          text: t.alertDangerText,
          glow: isGlass ? `0 0 20px ${t.statusRed}40` : "none",
        },
      };
      return types[type];
    };

    const typeStyles = getTypeStyles();

    const containerStyles: CSSProperties = {
      background: isGlass ? t.notificationBg : t.notificationBg,
      border: `1px solid ${isGlass ? t.glassMediumBorder : typeStyles.border}`,
      boxShadow: isGlass
        ? `${t.notificationGlow}, inset 0 1px 0 rgba(255,255,255,0.10)`
        : t.notificationGlow,
      backdropFilter: isGlass ? "blur(16px)" : undefined,
      WebkitBackdropFilter: isGlass ? "blur(16px)" : undefined,
    };

    const iconContainerStyles: CSSProperties = {
      background: typeStyles.bg,
      border: `1px solid ${typeStyles.border}`,
      boxShadow: typeStyles.glow,
    };

    const closeButtonStyles: CSSProperties = {
      color: t.textMuted,
      background: isHovered ? t.listItemHover : "transparent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-4 p-5 rounded-2xl min-w-[320px] max-w-[420px]",
          "transition-all duration-300",
          className
        )}
        style={containerStyles}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {/* Icon with glow */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={iconContainerStyles}
        >
          <Icon className="w-5 h-5" style={{ color: typeStyles.text }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm mb-1"
            style={{ color: t.textPrimary }}
          >
            {title}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: t.textSecondary }}
          >
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg shrink-0 transition-all duration-200"
          style={closeButtonStyles}
          type="button"
          aria-label="Close notification"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
);

NotificationGlass.displayName = "NotificationGlass";
