// ========================================
// NOTIFICATION GLASS COMPONENT
// ========================================

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const notificationVariants = cva(
  [
    "glass-notification",
    "flex items-start gap-4 p-5 rounded-2xl",
    "min-w-[320px] max-w-[420px]",
  ],
  {
    variants: {
      type: {
        info: "glass-notification--info",
        success: "glass-notification--success",
        warning: "glass-notification--warning",
        error: "glass-notification--error",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

const NOTIFICATION_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof notificationVariants> {
  readonly title: string;
  readonly message: string;
  readonly onClose: () => void;
}

export const NotificationGlass = forwardRef<
  HTMLDivElement,
  NotificationGlassProps
>(({ type = "info", title, message, onClose, className, ...props }, ref) => {
  const Icon = NOTIFICATION_ICONS[type ?? "info"];

  return (
    <div
      ref={ref}
      className={cn(notificationVariants({ type, className }))}
      role="alert"
      aria-live="polite"
      {...props}
    >
      {/* Icon with glow */}
      <div
        className={cn(
          "glass-notification__icon",
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="glass-notification__title font-semibold text-sm mb-1">
          {title}
        </p>
        <p className="glass-notification__message text-sm leading-relaxed">
          {message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className={cn(
          "glass-notification__close",
          "p-1.5 rounded-lg flex-shrink-0"
        )}
        type="button"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

NotificationGlass.displayName = "NotificationGlass";
