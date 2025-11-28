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
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const dropdownVariants = cva(
  ["glass-dropdown", "absolute z-50 mt-2 min-w-[200px] rounded-2xl py-2"],
  {
    variants: {
      align: {
        left: "left-0",
        right: "right-0",
      },
    },
    defaultVariants: {
      align: "left",
    },
  }
);

export interface DropdownItem {
  readonly label?: string;
  readonly icon?: LucideIcon;
  readonly onClick?: () => void;
  readonly danger?: boolean;
  readonly divider?: boolean;
}

export interface DropdownGlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  readonly trigger: React.ReactNode;
  readonly items: readonly DropdownItem[];
}

export const DropdownGlass = forwardRef<HTMLDivElement, DropdownGlassProps>(
  ({ trigger, items, align = "left", className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    // Close dropdown when clicking outside
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

    // Close dropdown on Escape key
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
          <div
            className={cn(dropdownVariants({ align }))}
            role="menu"
            aria-orientation="vertical"
          >
            {items.map((item, idx) =>
              item.divider ? (
                <div
                  key={`divider-${idx}`}
                  className="glass-dropdown__divider my-2 mx-3"
                  role="separator"
                />
              ) : (
                <button
                  key={`item-${idx}`}
                  onClick={() => handleItemClick(item.onClick)}
                  className={cn(
                    "glass-dropdown__item",
                    item.danger && "glass-dropdown__item--danger",
                    "w-full px-4 py-2.5 text-sm text-left flex items-center gap-3"
                  )}
                  onMouseEnter={() => setHoveredItem(idx)}
                  onMouseLeave={() => setHoveredItem(null)}
                  type="button"
                  role="menuitem"
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "glass-dropdown__icon",
                        "w-4 h-4",
                        item.danger && "glass-dropdown__icon--danger",
                        hoveredItem === idx &&
                          !item.danger &&
                          "glass-dropdown__icon--active"
                      )}
                    />
                  )}
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

DropdownGlass.displayName = "DropdownGlass";
