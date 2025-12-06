// ========================================
// PROFILE AVATAR GLASS COMPONENT
// Large avatar with glow animation for profiles
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import "@/glass-theme.css";

export type ProfileAvatarSize = "sm" | "md" | "lg" | "xl";
export type ProfileAvatarStatus = "online" | "offline" | "busy" | "away";

const sizeClasses: Record<ProfileAvatarSize, string> = {
  sm: "w-9 h-9 md:w-10 md:h-10 text-xs md:text-sm",
  md: "w-12 h-12 md:w-14 md:h-14 text-base md:text-lg",
  lg: "w-14 h-14 md:w-16 md:h-16 text-lg md:text-xl",
  xl: "w-18 h-18 md:w-20 md:h-20 text-xl md:text-2xl",
};

const statusSizeClasses: Record<ProfileAvatarSize, string> = {
  sm: "w-2.5 h-2.5 md:w-3 md:h-3",
  md: "w-3 h-3 md:w-3.5 md:h-3.5",
  lg: "w-3.5 h-3.5 md:w-4 md:h-4",
  xl: "w-4 h-4 md:w-5 md:h-5",
};

const statusPositionClasses: Record<ProfileAvatarSize, string> = {
  sm: "bottom-0 right-0",
  md: "bottom-0 right-0",
  lg: "-bottom-0.5 -right-0.5",
  xl: "-bottom-1 -right-1",
};

// CSS variable maps for status colors (using semantic naming)
const statusVarMap: Record<ProfileAvatarStatus, string> = {
  online: "var(--status-online)",
  offline: "var(--text-muted)",
  busy: "var(--status-busy)",
  away: "var(--status-away)",
};

export interface ProfileAvatarGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly initials: string;
  readonly size?: ProfileAvatarSize;
  readonly status?: ProfileAvatarStatus;
  readonly glowing?: boolean;
}

export const ProfileAvatarGlass = forwardRef<HTMLDivElement, ProfileAvatarGlassProps>(
  ({ initials, size = "lg", status, glowing = true, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const avatarStyles: CSSProperties = {
      boxShadow: isHovered ? "var(--profile-avatar-glow)" : "none",
      border: "3px solid var(--profile-avatar-border)",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          className={cn(
            "rounded-full bg-gradient-to-br from-blue-400 via-violet-500 to-indigo-500",
            "flex items-center justify-center text-white font-bold transition-all duration-300",
            sizeClasses[size],
            glowing && "animate-[glow-pulse_2s_ease-in-out_infinite]"
          )}
          style={avatarStyles}
          role="img"
          aria-label={`Profile avatar with initials ${initials}`}
        >
          {initials}
        </div>
        {status && (
          <span
            className={cn(
              "absolute rounded-full",
              statusPositionClasses[size],
              statusSizeClasses[size]
            )}
            style={{
              background: statusVarMap[status],
              border: "none",
              boxShadow: "none",
            }}
            role="status"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

ProfileAvatarGlass.displayName = "ProfileAvatarGlass";
