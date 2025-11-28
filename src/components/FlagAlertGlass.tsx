// ========================================
// FLAG ALERT GLASS COMPONENT
// Individual warning/danger flag alert
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { StatusIndicatorGlass, type StatusType } from "./StatusIndicatorGlass";
import "@/glass-theme.css";

export type FlagType = "warning" | "danger";

export interface FlagAlertGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly type?: FlagType;
  readonly title: string;
  readonly description?: string;
}

export const FlagAlertGlass = forwardRef<HTMLDivElement, FlagAlertGlassProps>(
  ({ type = "warning", title, description, className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isHovered, setIsHovered] = useState(false);

    const getConfig = (
      flagType: FlagType
    ): { bg: string; border: string; text: string; statusType: StatusType } => {
      if (flagType === "danger") {
        return {
          bg: t.alertDangerBg,
          border: t.alertDangerBorder,
          text: t.alertDangerText,
          statusType: "red",
        };
      }
      return {
        bg: t.alertWarningBg,
        border: t.alertWarningBorder,
        text: t.alertWarningText,
        statusType: "yellow",
      };
    };

    const config = getConfig(type);

    const alertStyles: CSSProperties = {
      background: config.bg,
      borderColor: config.border,
      transform: isHovered ? "translateX(4px)" : "translateX(0)",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "p-3 rounded-xl border transition-all duration-300",
          className
        )}
        style={alertStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="alert"
        {...props}
      >
        <div
          className="flex items-center gap-2 font-medium text-sm"
          style={{ color: config.text }}
        >
          <StatusIndicatorGlass type={config.statusType} />
          {title}
        </div>
        {description && (
          <p
            className="text-xs mt-1 ml-5"
            style={{ color: `${config.text}99` }}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

FlagAlertGlass.displayName = "FlagAlertGlass";
