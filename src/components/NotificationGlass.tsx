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

    // Type-specific config with colors and glows
    const typeConfig: Record<NotificationType, { color: string; glow: string }> = {
      info: { color: t.statusBlue, glow: "0 0 20px rgba(96,165,250,0.30)" },
      success: { color: t.statusGreen, glow: "0 0 20px rgba(52,211,153,0.30)" },
      warning: { color: t.statusYellow, glow: "0 0 20px rgba(251,191,36,0.30)" },
      error: { color: t.statusRed, glow: "0 0 20px rgba(251,113,133,0.30)" },
    };

    const config = typeConfig[type];

    const containerStyles: CSSProperties = {
      background: isGlass ? "rgba(255,255,255,0.08)" : t.notificationBg,
      border: `1px solid ${isGlass ? "rgba(255,255,255,0.15)" : t.glassSubtleBorder}`,
      boxShadow: isHovered && isGlass ? config.glow : t.notificationGlow,
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    };

    const iconContainerStyles: CSSProperties = {
      background: isGlass ? `${config.color}20` : `${config.color}15`,
      boxShadow: isHovered && isGlass ? config.glow : "none",
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          <p
            className="font-semibold text-sm mb-1"
            style={{ color: t.textPrimary }}
          >
            {title}
          </p>
          <p
            className="text-sm"
            style={{ color: t.textSecondary }}
          >
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg shrink-0"
          style={{ color: t.textMuted }}
          type="button"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
);

NotificationGlass.displayName = "NotificationGlass";
