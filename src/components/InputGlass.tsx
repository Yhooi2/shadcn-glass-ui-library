// ========================================
// INPUT GLASS COMPONENT
// Text input with glassmorphism styling
// ========================================

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const inputVariants = cva(
  [
    "glass-input",
    "w-full rounded-xl px-4 py-2.5 text-sm",
    "transition-all duration-300",
    "outline-none",
  ],
  {
    variants: {
      inputSize: {
        sm: "px-3 py-2 text-xs rounded-lg",
        md: "px-4 py-2.5 text-sm rounded-xl",
        lg: "px-5 py-3 text-base rounded-xl",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  }
);

export interface InputGlassProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  readonly label?: string;
  readonly error?: string;
  readonly success?: string;
  readonly icon?: LucideIcon;
  readonly iconPosition?: "left" | "right";
}

export const InputGlass = forwardRef<HTMLInputElement, InputGlassProps>(
  (
    {
      className,
      inputSize,
      label,
      error,
      success,
      icon: Icon,
      iconPosition = "left",
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasIcon = Boolean(Icon);
    const paddingLeft = hasIcon && iconPosition === "left" ? "pl-10" : "";
    const paddingRight = hasIcon && iconPosition === "right" ? "pr-10" : "";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && iconPosition === "left" && (
            <Icon
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300"
              style={{
                color: isFocused ? "var(--text-accent)" : "var(--text-muted)",
              }}
            />
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({ inputSize }),
              paddingLeft,
              paddingRight,
              error && "glass-input--error",
              success && "glass-input--success",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {Icon && iconPosition === "right" && (
            <Icon
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300"
              style={{
                color: isFocused ? "var(--text-accent)" : "var(--text-muted)",
              }}
            />
          )}
        </div>
        {error && (
          <span
            className="text-xs"
            style={{ color: "var(--alert-danger-text)" }}
          >
            {error}
          </span>
        )}
        {success && (
          <span
            className="text-xs"
            style={{ color: "var(--alert-success-text)" }}
          >
            {success}
          </span>
        )}
      </div>
    );
  }
);

InputGlass.displayName = "InputGlass";
