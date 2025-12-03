/**
 * DropdownGlass Component
 *
 * Glass-themed dropdown menu with:
 * - Theme-aware styling (glass/light/aurora)
 * - Smooth animations
 * - Click outside to close
 * - Escape key to close
 * - Optional item icons and dividers
 */

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  type CSSProperties,
} from 'react';
import { type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dropdownAlign } from '@/lib/variants/dropdown-glass-variants';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface DropdownItem {
  readonly label?: string;
  readonly icon?: LucideIcon;
  readonly onClick?: () => void;
  readonly danger?: boolean;
  readonly divider?: boolean;
}

// ========================================
// PROPS INTERFACE
// ========================================

export interface DropdownGlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownAlign> {
  readonly trigger: React.ReactNode;
  readonly items: readonly DropdownItem[];
}

// ========================================
// COMPONENT
// ========================================

export const DropdownGlass = forwardRef<HTMLDivElement, DropdownGlassProps>(
  ({ trigger, items, align = 'left', className, ...props }, ref) => {
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

    // Combined effect for click outside and escape key
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

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, handleClose]);

    const handleItemClick = (onClick?: () => void): void => {
      onClick?.();
      handleClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    };

    const dropdownStyles: CSSProperties = useMemo(() => ({
      background: 'var(--dropdown-bg)',
      border: '1px solid var(--dropdown-border)',
      boxShadow: 'var(--dropdown-glow)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      animation: 'dropdownFadeIn 0.2s ease-out',
    }), []);

    const getItemStyles = (idx: number, danger?: boolean): CSSProperties => ({
      color: danger ? 'var(--alert-danger-text)' : 'var(--dropdown-item-text)',
      background:
        hoveredItem === idx ? 'var(--dropdown-item-hover)' : 'transparent',
      transition: 'all 0.2s',
    });

    const getIconStyles = (idx: number, danger?: boolean): CSSProperties => ({
      color: danger
        ? 'var(--alert-danger-text)'
        : hoveredItem === idx
          ? 'var(--dropdown-icon-hover)'
          : 'var(--dropdown-icon)',
      transition: 'all 0.2s',
    });

    return (
      <div
        ref={internalRef}
        className={cn('relative inline-block', className)}
        style={{ zIndex: isOpen ? 50000 : 'auto' }}
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
            <div
              className="fixed inset-0"
              style={{ zIndex: 50001 }}
              onClick={handleClose}
            />
            <div
              className={cn(dropdownAlign({ align }))}
              style={{ ...dropdownStyles, zIndex: 50002 }}
              role="menu"
              aria-orientation="vertical"
            >
              {items.map((item, idx) =>
                item.divider ? (
                  <div
                    key={`divider-${idx}`}
                    className="my-2 mx-3"
                    style={{
                      borderTop: '1px solid var(--dropdown-divider)',
                    }}
                    role="separator"
                  />
                ) : (
                  <button
                    key={`item-${idx}`}
                    onClick={() => handleItemClick(item.onClick)}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-left flex items-center gap-2 md:gap-3"
                    style={getItemStyles(idx, item.danger)}
                    onMouseEnter={() => setHoveredItem(idx)}
                    onMouseLeave={() => setHoveredItem(null)}
                    type="button"
                    role="menuitem"
                  >
                    {item.icon && (
                      <item.icon
                        className="w-3.5 h-3.5 md:w-4 md:h-4 transition-all duration-200"
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

DropdownGlass.displayName = 'DropdownGlass';
