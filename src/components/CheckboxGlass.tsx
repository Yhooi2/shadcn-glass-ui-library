// ========================================
// CHECKBOX GLASS COMPONENT
// Checkbox with glow effect
// ========================================

import { forwardRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

export interface CheckboxGlassProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  readonly checked: boolean;
  readonly onChange?: (checked: boolean) => void;
  readonly label?: string;
}

export const CheckboxGlass = forwardRef<HTMLInputElement, CheckboxGlassProps>(
  (
    {
      className,
      checked,
      onChange,
      label,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            "glass-checkbox",
            "relative w-5 h-5 rounded-md",
            "flex items-center justify-center",
            "transition-all duration-300",
            checked && "glass-checkbox--checked"
          )}
          style={{
            boxShadow: isHovered && !disabled ? "var(--checkbox-glow)" : "none",
          }}
          role="checkbox"
          aria-checked={checked}
        >
          {checked && (
            <Check
              className="w-3 h-3"
              style={{ color: "var(--text-inverse)" }}
            />
          )}
        </div>
        {label && (
          <span
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

CheckboxGlass.displayName = "CheckboxGlass";
