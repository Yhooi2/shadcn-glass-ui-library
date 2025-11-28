// ========================================
// CHECKBOX GLASS COMPONENT
// Checkbox with glow effect
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.css";

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
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isHovered, setIsHovered] = useState(false);

    const checkboxStyles: CSSProperties = {
      background: checked ? t.checkboxCheckedBg : t.checkboxBg,
      border: `2px solid ${checked ? t.checkboxCheckedBg : t.checkboxBorder}`,
      boxShadow: isHovered && !disabled ? t.checkboxGlow : "none",
    };

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
          onClick={() => !disabled && onChange?.(!checked)}
          className="relative w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300"
          style={checkboxStyles}
          role="checkbox"
          aria-checked={checked}
        >
          {checked && (
            <Check className="w-3 h-3" style={{ color: t.textInverse }} />
          )}
        </div>
        {label && (
          <span className="text-sm" style={{ color: t.textSecondary }}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

CheckboxGlass.displayName = "CheckboxGlass";
