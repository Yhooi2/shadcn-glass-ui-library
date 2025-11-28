// ========================================
// BADGE GLASS COMPONENT
// Status badges with theme support
// ========================================

import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const badgeVariants = cva(
  [
    "glass-badge",
    "inline-flex items-center gap-1.5",
    "rounded-full font-medium",
  ],
  {
    variants: {
      variant: {
        default: "glass-badge--default",
        success: "glass-badge--success",
        warning: "glass-badge--warning",
        danger: "glass-badge--danger",
        info: "glass-badge--info",
        violet: "glass-badge--violet",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "violet";

export interface BadgeGlassProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  readonly children: ReactNode;
  readonly dot?: boolean;
}

export const BadgeGlass = forwardRef<HTMLSpanElement, BadgeGlassProps>(
  ({ children, className, variant, size, dot, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "currentColor" }}
          />
        )}
        {children}
      </span>
    );
  }
);

BadgeGlass.displayName = "BadgeGlass";
