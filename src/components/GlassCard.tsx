// ========================================
// GLASS CARD COMPONENT
// Container with glassmorphism effects
// ========================================

import { forwardRef, useState, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const cardVariants = cva(
  [
    "glass-card",
    "rounded-2xl",
    "transition-all duration-300",
  ],
  {
    variants: {
      intensity: {
        subtle: "glass-card--subtle",
        medium: "",
        strong: "glass-card--strong",
      },
      glow: {
        none: "",
        blue: "glass-card--glow-blue",
        violet: "glass-card--glow-violet",
        cyan: "glass-card--glow-cyan",
      },
    },
    defaultVariants: {
      intensity: "medium",
      glow: "none",
    },
  }
);

export type GlowType = "blue" | "violet" | "cyan" | null;
export type IntensityType = "subtle" | "medium" | "strong";

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  readonly children: ReactNode;
  readonly hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      intensity,
      glow,
      hover = true,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ intensity, glow }),
          hover && "glass-card--hoverable cursor-pointer",
          hover && isHovered && "shadow-lg",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
