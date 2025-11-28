// ========================================
// ALERT GLASS COMPONENT
// Alert messages with theme support
// ========================================

import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const alertVariants = cva(
  [
    "glass-alert",
    "flex items-start gap-3 p-4 rounded-xl",
    "transition-all duration-300",
  ],
  {
    variants: {
      type: {
        info: "glass-alert--info",
        success: "glass-alert--success",
        warning: "glass-alert--warning",
        error: "glass-alert--error",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

export type AlertType = "info" | "success" | "warning" | "error";

const ALERT_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

export interface AlertGlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
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
    const Icon = ALERT_ICONS[type ?? "info"];

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ type }), className)}
        role="alert"
        {...props}
      >
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          {title && (
            <p className="font-medium text-sm mb-1">{title}</p>
          )}
          <p className="text-sm opacity-90">{children}</p>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="p-1 rounded transition-colors duration-200 hover:bg-black/5 flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

AlertGlass.displayName = "AlertGlass";
