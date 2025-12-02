/**
 * ButtonGlass Component
 *
 * Glass-themed button with:
 * - Theme-aware styling via CSS variables (glass/light/aurora)
 * - Glow effects on hover
 * - Ripple effect on click (JS)
 * - Shine animation for primary variant (JS)
 * - Loading state with spinner
 * - Icon support (left/right position)
 */

import {
  forwardRef,
  useState,
  useCallback,
  type MouseEvent,
  type CSSProperties,
} from 'react';
import { type VariantProps } from 'class-variance-authority';
import { RefreshCw, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { buttonGlassVariants, type ButtonGlassVariant } from '@/lib/variants/button-glass-variants';
import '@/glass-theme.css';

// ========================================
// CSS VARIABLE STYLE MAPS
// ========================================

const getVariantStyles = (
  variant: ButtonGlassVariant,
  isHovered: boolean
): CSSProperties => {
  const baseStyles: Record<ButtonGlassVariant, CSSProperties> = {
    primary: {
      background: isHovered
        ? 'var(--btn-primary-hover-bg)'
        : 'var(--btn-primary-bg)',
      color: 'var(--btn-primary-text)',
      border: 'none',
      boxShadow: isHovered
        ? 'var(--btn-primary-glow)'
        : '0 4px 15px rgba(124,58,237,0.25)',
    },
    secondary: {
      background: isHovered
        ? 'var(--btn-secondary-hover-bg)'
        : 'var(--btn-secondary-bg)',
      color: 'var(--btn-secondary-text)',
      border: '1px solid var(--btn-secondary-border)',
      boxShadow: isHovered ? 'var(--btn-secondary-glow)' : 'none',
    },
    ghost: {
      background: isHovered
        ? 'var(--btn-ghost-hover-bg)'
        : 'var(--btn-ghost-bg)',
      color: 'var(--btn-ghost-text)',
      border: 'none',
      boxShadow: 'none',
    },
    danger: {
      background: 'var(--btn-danger-bg)',
      color: 'var(--btn-danger-text)',
      border: 'none',
      boxShadow: isHovered
        ? 'var(--btn-danger-glow)'
        : '0 4px 15px rgba(239,68,68,0.25)',
    },
    success: {
      background: 'var(--btn-success-bg)',
      color: 'var(--btn-success-text)',
      border: 'none',
      boxShadow: isHovered
        ? 'var(--btn-success-glow)'
        : '0 4px 15px rgba(16,185,129,0.25)',
    },
    text: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: 'none',
      boxShadow: 'none',
    },
  };

  return baseStyles[variant];
};

// ========================================
// PROPS INTERFACE
// ========================================

export interface ButtonGlassProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>,
    VariantProps<typeof buttonGlassVariants> {
  readonly variant?: ButtonGlassVariant;
  readonly loading?: boolean;
  readonly icon?: LucideIcon;
  readonly iconPosition?: 'left' | 'right';
}

// ========================================
// COMPONENT
// ========================================

export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      loading = false,
      disabled,
      icon: Icon,
      iconPosition = 'left',
      onClick,
      ...props
    },
    ref
  ) => {
    const { isHovered, hoverProps } = useHover();
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

    const isDisabled = disabled || loading;

    // Ripple effect handler
    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        // Create ripple effect
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setRipple({ x, y });
        setTimeout(() => setRipple(null), 600);

        onClick?.(e);
      },
      [isDisabled, onClick]
    );

    return (
      <button
        ref={ref}
        className={cn(
          buttonGlassVariants({ variant, size }),
          isHovered && !isDisabled && 'scale-[1.02]',
          className
        )}
        style={getVariantStyles(variant, isHovered && !isDisabled)}
        type="button"
        disabled={isDisabled}
        onClick={handleClick}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        {...props}
      >
        {/* Shine effect on hover for primary */}
        {isHovered && variant === 'primary' && !isDisabled && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ borderRadius: 'inherit' }}
          >
            <div
              className="absolute top-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/20 to-transparent"
              style={{ animation: 'btn-shine 1.5s ease-in-out infinite' }}
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
              transform: 'translate(-50%, -50%)',
              animation: 'ripple 0.6s ease-out',
            }}
          />
        )}

        {/* Pulsing glow on hover */}
        {isHovered && variant === 'primary' && !isDisabled && (
          <div
            className="absolute inset-0 rounded-xl animate-glow-pulse pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }}
          />
        )}

        {/* Loading spinner */}
        {loading && <RefreshCw className="w-4 h-4 animate-spin" />}

        {/* Icon left */}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon className="w-4 h-4" />
        )}

        {/* Content */}
        {!loading && children}

        {/* Icon right */}
        {!loading && Icon && iconPosition === 'right' && (
          <Icon className="w-4 h-4" />
        )}
      </button>
    );
  }
);

ButtonGlass.displayName = 'ButtonGlass';
