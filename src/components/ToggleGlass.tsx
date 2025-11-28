// ========================================
// TOGGLE GLASS COMPONENT
// Toggle switch with glow effect
// ========================================

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const toggleVariants = cva(
  [
    "glass-toggle",
    "relative rounded-full",
    "transition-all duration-300",
    "cursor-pointer",
  ],
  {
    variants: {
      size: {
        sm: "w-8 h-4",
        md: "w-11 h-6",
        lg: "w-14 h-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const knobSizes = {
  sm: { size: "w-3 h-3", translate: "translate-x-4" },
  md: { size: "w-5 h-5", translate: "translate-x-5" },
  lg: { size: "w-6 h-6", translate: "translate-x-7" },
} as const;

export interface ToggleGlassProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  readonly checked: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly label?: string;
}

export const ToggleGlass = forwardRef<HTMLButtonElement, ToggleGlassProps>(
  (
    {
      className,
      size = "md",
      checked,
      onChange,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    const knobConfig = knobSizes[size ?? "md"];

    const toggle = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={cn(
          toggleVariants({ size }),
          checked && "glass-toggle--active",
          disabled && "opacity-50 cursor-not-allowed",
          !label && className
        )}
        onClick={() => !disabled && onChange?.(!checked)}
        {...props}
      >
        <div
          className={cn(
            "glass-toggle__knob",
            "absolute top-0.5 left-0.5",
            knobConfig.size,
            "rounded-full shadow-md",
            "transition-all duration-300",
            checked && knobConfig.translate
          )}
        />
      </button>
    );

    if (label) {
      return (
        <label
          className={cn(
            "inline-flex items-center gap-2",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            className
          )}
        >
          {toggle}
          <span
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {label}
          </span>
        </label>
      );
    }

    return toggle;
  }
);

ToggleGlass.displayName = "ToggleGlass";
