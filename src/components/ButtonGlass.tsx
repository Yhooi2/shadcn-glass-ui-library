// ========================================
// BUTTON GLASS COMPONENT
// Multi-theme support with glow effects
// ========================================

import { forwardRef, useState, type MouseEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { RefreshCw, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const buttonVariants = cva(
  [
    "glass-button",
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-medium",
    "transition-all duration-300 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: "glass-button--primary",
        secondary: "glass-button--secondary",
        ghost: "glass-button--ghost",
        danger: "glass-button--danger",
        success: "glass-button--success",
        text: "glass-button--text",
      },
      size: {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-4 py-2 text-sm rounded-xl",
        lg: "px-6 py-3 text-base rounded-xl",
        xl: "px-8 py-4 text-lg rounded-2xl",
        icon: "p-2.5 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonGlassProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
  readonly loading?: boolean;
  readonly icon?: LucideIcon;
  readonly iconPosition?: "left" | "right";
}

export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  (
    {
      className,
      variant,
      size,
      children,
      loading = false,
      disabled,
      icon: Icon,
      iconPosition = "left",
      onClick,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      // Create ripple effect
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipple({ x, y });
      setTimeout(() => setRipple(null), 600);

      onClick?.(e);
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          isHovered && !isDisabled && "scale-[1.02]",
          className
        )}
        type="button"
        disabled={isDisabled}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Shine effect on hover for primary */}
        {isHovered && variant === "primary" && !isDisabled && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ borderRadius: "inherit" }}
          >
            <div
              className="absolute top-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/20 to-transparent"
              style={{ animation: "btn-shine 1.5s ease-in-out infinite" }}
            />
          </div>
        )}

        {/* Ripple effect */}
        {ripple && (
          <span
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              transform: "translate(-50%, -50%)",
              animation: "ripple 0.6s ease-out",
            }}
          />
        )}

        {/* Pulsing glow on hover */}
        {isHovered && variant === "primary" && !isDisabled && (
          <div
            className="absolute inset-0 rounded-xl animate-glow-pulse pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            }}
          />
        )}

        {/* Loading spinner */}
        {loading && <RefreshCw className="w-4 h-4 animate-spin" />}

        {/* Icon left */}
        {!loading && Icon && iconPosition === "left" && (
          <Icon className="w-4 h-4" />
        )}

        {/* Content */}
        {!loading && children}

        {/* Icon right */}
        {!loading && Icon && iconPosition === "right" && (
          <Icon className="w-4 h-4" />
        )}
      </button>
    );
  }
);

ButtonGlass.displayName = "ButtonGlass";
