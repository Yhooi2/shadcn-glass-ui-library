// ========================================
// AVATAR GLASS COMPONENT
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

const sizeClasses: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const statusSizeClasses: Record<AvatarSize, string> = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
  xl: "w-4 h-4",
};

export interface AvatarGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name: string;
  readonly size?: AvatarSize;
  readonly status?: AvatarStatus;
}

const getInitials = (name: string): string => {
  if (!name || name.trim().length === 0) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const AvatarGlass = forwardRef<HTMLDivElement, AvatarGlassProps>(
  ({ name, size = "md", status, className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isHovered, setIsHovered] = useState(false);

    const isGlass = theme === "glass";

    // Status colors with glow for glass theme
    const getStatusStyle = (statusType: AvatarStatus): { bg: string; glow: string } => {
      const colors: Record<AvatarStatus, { bg: string; glow: string }> = {
        online: {
          bg: t.statusGreen,
          glow: `0 0 8px ${t.statusGreen}99, 0 0 16px ${t.statusGreen}4d`,
        },
        offline: { bg: t.textMuted, glow: "none" },
        busy: {
          bg: t.statusRed,
          glow: `0 0 8px ${t.statusRed}99, 0 0 16px ${t.statusRed}4d`,
        },
        away: {
          bg: t.statusYellow,
          glow: `0 0 8px ${t.statusYellow}99, 0 0 16px ${t.statusYellow}4d`,
        },
      };
      return colors[statusType];
    };

    // Avatar styles for glass theme
    const avatarStyles: CSSProperties = isGlass
      ? {
          background: "linear-gradient(135deg, rgba(168,85,247,0.80), rgba(139,92,246,0.80))",
          border: "2px solid rgba(255,255,255,0.20)",
          boxShadow: isHovered
            ? "0 0 30px rgba(168,85,247,0.50), inset 0 1px 0 rgba(255,255,255,0.20)"
            : "0 4px 20px rgba(168,85,247,0.30)",
          color: "#ffffff",
        }
      : {
          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          border: `2px solid ${t.avatarBorder}`,
          boxShadow: isHovered ? t.avatarGlow : "none",
          color: "#ffffff",
        };

    const initials = getInitials(name);

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Avatar circle */}
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-semibold transition-all duration-300",
            sizeClasses[size]
          )}
          style={avatarStyles}
          role="img"
          aria-label={`Avatar for ${name}`}
        >
          {initials}
        </div>

        {/* Status indicator */}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full transition-all duration-300",
              statusSizeClasses[size]
            )}
            style={{
              background: getStatusStyle(status).bg,
              boxShadow: isGlass ? getStatusStyle(status).glow : `0 0 6px ${getStatusStyle(status).bg}`,
            }}
            role="status"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

AvatarGlass.displayName = "AvatarGlass";
