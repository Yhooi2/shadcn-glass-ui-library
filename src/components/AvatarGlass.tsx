// ========================================
// AVATAR GLASS COMPONENT
// ========================================

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const avatarVariants = cva("glass-avatar relative inline-flex", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const avatarCircleVariants = cva(
  [
    "glass-avatar__circle",
    "rounded-full flex items-center justify-center font-semibold",
  ],
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const avatarStatusVariants = cva(
  ["glass-avatar__status", "absolute bottom-0 right-0 rounded-full"],
  {
    variants: {
      size: {
        sm: "w-2.5 h-2.5",
        md: "w-3 h-3",
        lg: "w-3.5 h-3.5",
        xl: "w-4 h-4",
      },
      status: {
        online: "glass-avatar__status--online",
        offline: "glass-avatar__status--offline",
        busy: "glass-avatar__status--busy",
        away: "glass-avatar__status--away",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarGlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  readonly name: string;
  readonly status?: AvatarStatus;
}

/**
 * Generate initials from a name
 */
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
    const initials = getInitials(name);

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {/* Avatar circle */}
        <div
          className={cn(avatarCircleVariants({ size }))}
          role="img"
          aria-label={`Avatar for ${name}`}
        >
          {initials}
        </div>

        {/* Status indicator */}
        {status && (
          <span
            className={cn(avatarStatusVariants({ size, status }))}
            role="status"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

AvatarGlass.displayName = "AvatarGlass";
