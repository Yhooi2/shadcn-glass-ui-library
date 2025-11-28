// ========================================
// BADGE GLASS COMPONENT
// Status badges with theme support
// ========================================

import { forwardRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "violet";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeGlassProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly children: ReactNode;
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  readonly dot?: boolean;
}

const sizes: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

export const BadgeGlass = forwardRef<HTMLSpanElement, BadgeGlassProps>(
  ({ children, className, variant = "default", size = "md", dot, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];

    const getVariantStyles = (): { bg: string; text: string; border: string } => {
      const variants: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
        default: { bg: t.badgeDefaultBg, text: t.badgeDefaultText, border: t.badgeDefaultBorder },
        success: { bg: t.badgeSuccessBg, text: t.badgeSuccessText, border: t.badgeSuccessBorder },
        warning: { bg: t.badgeWarningBg, text: t.badgeWarningText, border: t.badgeWarningBorder },
        danger: { bg: t.badgeDangerBg, text: t.badgeDangerText, border: t.badgeDangerBorder },
        info: { bg: t.badgePrimaryBg, text: t.badgePrimaryText, border: t.badgePrimaryBorder },
        violet: { bg: t.badgeVioletBg, text: t.badgeVioletText, border: t.badgeVioletBorder },
      };
      return variants[variant];
    };

    const v = getVariantStyles();

    const badgeStyles: CSSProperties = {
      background: v.bg,
      color: v.text,
      border: v.border && v.border !== "transparent" ? `1px solid ${v.border}` : "none",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium",
          sizes[size],
          className
        )}
        style={badgeStyles}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: v.text }}
          />
        )}
        {children}
      </span>
    );
  }
);

BadgeGlass.displayName = "BadgeGlass";
