// ========================================
// DROPDOWN GLASS COMPONENT
// ========================================

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  type CSSProperties,
} from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type DropdownAlign = "left" | "right";

export interface DropdownItem {
  readonly label?: string;
  readonly icon?: LucideIcon;
  readonly onClick?: () => void;
  readonly danger?: boolean;
  readonly divider?: boolean;
}

export interface DropdownGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly trigger: React.ReactNode;
  readonly items: readonly DropdownItem[];
  readonly align?: DropdownAlign;
}

export const DropdownGlass = forwardRef<HTMLDivElement, DropdownGlassProps>(
  ({ trigger, items, align = "left", className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const internalRef = useRef<HTMLDivElement>(null);

    const isGlass = theme === "glass";

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent): void => {
        if (
          internalRef.current &&
          !internalRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, handleClose]);

    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, handleClose]);

    const handleItemClick = (onClick?: () => void): void => {
      onClick?.();
      handleClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    };

    // Glass theme specific styles
    const dropdownStyles: CSSProperties = isGlass
      ? {
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 15px 50px rgba(168,85,247,0.25), inset 0 1px 0 rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          animation: "dropdownFadeIn 0.2s ease-out",
        }
      : {
          background: t.dropdownBg,
          border: `1px solid ${t.dropdownBorder}`,
          boxShadow: t.dropdownGlow,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          animation: "dropdownFadeIn 0.2s ease-out",
        };

    const getItemStyles = (idx: number, danger?: boolean): CSSProperties => ({
      color: danger
        ? isGlass ? "#fb7185" : t.alertDangerText
        : isGlass ? "rgba(255,255,255,0.80)" : t.textSecondary,
      background: hoveredItem === idx
        ? isGlass ? "rgba(255,255,255,0.10)" : t.dropdownItemHover
        : "transparent",
      transition: "all 0.2s",
    });

    const getIconStyles = (idx: number, danger?: boolean): CSSProperties => ({
      color: danger
        ? isGlass ? "#fb7185" : t.alertDangerText
        : hoveredItem === idx
          ? isGlass ? "#c4b5fd" : t.textAccent
          : isGlass ? "rgba(255,255,255,0.50)" : t.textMuted,
      transition: "all 0.2s",
    });

    return (
      <div
        ref={internalRef}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {/* Trigger */}
        <div
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {trigger}
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={handleClose} />
            <div
              className={cn(
                "absolute z-50 mt-2 min-w-[200px] rounded-2xl py-2",
                align === "right" ? "right-0" : "left-0"
              )}
              style={dropdownStyles}
              role="menu"
              aria-orientation="vertical"
            >
              {items.map((item, idx) =>
                item.divider ? (
                  <div
                    key={`divider-${idx}`}
                    className="my-2 mx-3"
                    style={{
                      borderTop: `1px solid ${isGlass ? "rgba(255,255,255,0.08)" : t.listDivider}`,
                    }}
                    role="separator"
                  />
                ) : (
                  <button
                    key={`item-${idx}`}
                    onClick={() => handleItemClick(item.onClick)}
                    className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-3"
                    style={getItemStyles(idx, item.danger)}
                    onMouseEnter={() => setHoveredItem(idx)}
                    onMouseLeave={() => setHoveredItem(null)}
                    type="button"
                    role="menuitem"
                  >
                    {item.icon && (
                      <item.icon
                        className="w-4 h-4 transition-all duration-200"
                        style={getIconStyles(idx, item.danger)}
                      />
                    )}
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    );
  }
);

DropdownGlass.displayName = "DropdownGlass";
