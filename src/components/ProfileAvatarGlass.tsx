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
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-lg",
  lg: "w-16 h-16 text-xl",
  xl: "w-20 h-20 text-2xl",
};

const statusSizeClasses: Record<ProfileAvatarSize, string> = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
  xl: "w-5 h-5",
};

const statusPositionClasses: Record<ProfileAvatarSize, string> = {
  sm: "bottom-0 right-0",
  md: "bottom-0 right-0",
  lg: "-bottom-0.5 -right-0.5",
  xl: "-bottom-1 -right-1",
};

// CSS variable maps for status colors
const statusVarMap: Record<ProfileAvatarStatus, string> = {
  online: "var(--status-green)",
  offline: "var(--text-muted)",
  busy: "var(--status-red)",
  away: "var(--status-yellow)",
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
