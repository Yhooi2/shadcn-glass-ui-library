// ========================================
// BUTTON GLASS COMPONENT
// Multi-theme support with glow effects
// ========================================

import { forwardRef, useState, type MouseEvent, type CSSProperties } from "react";
import { RefreshCw, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type ButtonGlassVariant = "primary" | "secondary" | "ghost" | "danger" | "success" | "text";
export type ButtonGlassSize = "sm" | "md" | "lg" | "xl" | "icon";

export interface ButtonGlassProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  readonly variant?: ButtonGlassVariant;
  readonly size?: ButtonGlassSize;
  readonly loading?: boolean;
  readonly icon?: LucideIcon;
  readonly iconPosition?: "left" | "right";
}

const sizes: Record<ButtonGlassSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
  xl: "px-8 py-4 text-lg gap-3",
  icon: "p-2.5",
};

export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
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
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isHovered, setIsHovered] = useState(false);
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

    const getVariantStyles = (): CSSProperties => {
      const variants: Record<ButtonGlassVariant, CSSProperties> = {
        primary: {
          background: isHovered ? t.btnPrimaryHoverBg : t.btnPrimaryBg,
          color: t.btnPrimaryText,
          border: "none",
          boxShadow: isHovered ? t.btnPrimaryGlow : "0 4px 15px rgba(124,58,237,0.25)",
        },
        secondary: {
          background: isHovered ? t.btnSecondaryHoverBg : t.btnSecondaryBg,
          color: t.btnSecondaryText,
          border: `1px solid ${t.btnSecondaryBorder}`,
          boxShadow: isHovered ? t.btnSecondaryGlow : "none",
        },
        ghost: {
          background: isHovered ? t.btnGhostHoverBg : t.btnGhostBg,
          color: t.btnGhostText,
          border: "none",
          boxShadow: "none",
        },
        danger: {
          background: t.btnDangerBg,
          color: t.btnDangerText,
          border: "none",
          boxShadow: isHovered ? t.btnDangerGlow : "0 4px 15px rgba(239,68,68,0.25)",
        },
        success: {
          background: t.btnSuccessBg,
          color: t.btnSuccessText,
          border: "none",
          boxShadow: isHovered ? t.btnSuccessGlow : "0 4px 15px rgba(16,185,129,0.25)",
        },
        text: {
          background: "transparent",
          color: t.textSecondary,
          border: "none",
          boxShadow: "none",
        },
      };
      return variants[variant];
    };

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
          "relative overflow-hidden rounded-xl font-medium inline-flex items-center justify-center",
          "transition-all duration-300 ease-out",
          sizes[size],
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          isHovered && !isDisabled && "scale-[1.02]",
          className
        )}
        style={getVariantStyles()}
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
