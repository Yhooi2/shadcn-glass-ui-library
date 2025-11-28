// ========================================
// PROGRESS GLASS COMPONENT
// Progress bar with gradient and glow
// ========================================

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const progressVariants = cva(["glass-progress__track", "rounded-full overflow-hidden"], {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
      xl: "h-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ProgressGradient =
  | "violet"
  | "blue"
  | "cyan"
  | "amber"
  | "emerald"
  | "rose";

const GRADIENT_CLASSES: Record<ProgressGradient, string> = {
  violet: "from-violet-500 to-purple-500",
  blue: "from-blue-400 to-cyan-400",
  cyan: "from-cyan-400 to-teal-400",
  amber: "from-amber-400 to-orange-500",
  emerald: "from-emerald-400 to-green-500",
  rose: "from-rose-400 to-pink-500",
};

export interface ProgressGlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  readonly value: number;
  readonly gradient?: ProgressGradient;
  readonly showLabel?: boolean;
}

export const ProgressGlass = forwardRef<HTMLDivElement, ProgressGlassProps>(
  (
    {
      className,
      size,
      value,
      gradient = "violet",
      showLabel,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const gradientClass = GRADIENT_CLASSES[gradient];

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1">
            <span
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Progress
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {clampedValue}%
            </span>
          </div>
        )}
        <div
          className={cn(progressVariants({ size }))}
          style={{ background: "var(--progress-bg)" }}
        >
          <div
            className={cn(
              "glass-progress__fill h-full rounded-full transition-all duration-700 ease-out",
              `bg-linear-to-r ${gradientClass}`
            )}
            style={{
              width: `${clampedValue}%`,
            }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    );
  }
);

ProgressGlass.displayName = "ProgressGlass";
