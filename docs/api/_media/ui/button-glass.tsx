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
  useEffect,
  useRef,
  type MouseEvent,
  type CSSProperties,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { RefreshCw, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { useFocus } from '@/lib/hooks/use-focus';
import { buttonGlassVariants, type ButtonGlassVariant } from '@/lib/variants/button-glass-variants';
import { ICON_SIZES } from '@/components/glass/primitives';
import '@/glass-theme.css';

// ========================================
// CSS VARIABLE STYLE MAPS
// ========================================

const getVariantStyles = (
  variant: ButtonGlassVariant,
  isHovered: boolean,
  isFocusVisible: boolean
): CSSProperties => {
  const baseStyles: Record<ButtonGlassVariant, CSSProperties> = {
    primary: {
      background: isHovered
        ? 'var(--btn-primary-hover-bg)'
        : 'var(--btn-primary-bg)',
      color: 'var(--btn-primary-text)',
      border: 'none',
      boxShadow: isFocusVisible
        ? 'var(--focus-glow)'
        : isHovered
        ? 'var(--btn-primary-glow)'
        : '0 4px 15px oklch(48.5% 0.26 283 / 0.25)',
    },
    secondary: {
      background: isHovered
        ? 'var(--btn-secondary-hover-bg)'
        : 'var(--btn-secondary-bg)',
      color: 'var(--btn-secondary-text)',
      border: '1px solid var(--btn-secondary-border)',
      boxShadow: isFocusVisible
        ? 'var(--focus-glow)'
        : isHovered
        ? 'var(--btn-secondary-glow)'
        : 'none',
    },
    ghost: {
      background: isHovered
        ? 'var(--btn-ghost-hover-bg)'
        : 'var(--btn-ghost-bg)',
      color: 'var(--btn-ghost-text)',
      border: 'none',
      boxShadow: isFocusVisible ? 'var(--focus-glow)' : 'none',
    },
    destructive: {
      background: 'var(--btn-destructive-bg)',
      color: 'var(--btn-destructive-text)',
      border: 'none',
      boxShadow: isFocusVisible
        ? 'var(--focus-glow)'
        : isHovered
        ? 'var(--btn-destructive-glow)'
        : '0 4px 15px oklch(62.8% 0.225 29 / 0.25)',
    },
    success: {
      background: 'var(--btn-success-bg)',
      color: 'var(--btn-success-text)',
      border: 'none',
      boxShadow: isFocusVisible
        ? 'var(--focus-glow)'
        : isHovered
        ? 'var(--btn-success-glow)'
        : '0 4px 15px oklch(70.7% 0.143 167 / 0.25)',
    },
    text: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: 'none',
      boxShadow: isFocusVisible ? 'var(--focus-glow)' : 'none',
    },
  };

  return baseStyles[variant];
};

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for the ButtonGlass component
 *
 * A glass-themed button with ripple effects, loading states, and icon support.
 * Features theme-aware styling and hover animations.
 *
 * @accessibility
 * - **Keyboard Navigation:** Fully keyboard accessible with native `<button>` element
 * - **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
 * - **Screen Readers:** Semantic `<button>` element, disabled state announced automatically
 * - **Loading State:** When loading=true, button is disabled and loading spinner is visible
 * - **Touch Targets:** Minimum 44x44px touch target (WCAG 2.5.5) via size variants
 * - **Color Contrast:** All variants meet WCAG AA contrast ratio 4.5:1 minimum
 * - **Motion:** Respects `prefers-reduced-motion` for ripple/shine animations
 *
 * @example
 * ```tsx
 * // Basic button
 * <ButtonGlass variant="primary">Click me</ButtonGlass>
 *
 * // With icon and aria-label for icon-only buttons
 * <ButtonGlass icon={Check} iconPosition="left">Save</ButtonGlass>
 * <ButtonGlass icon={X} size="icon" aria-label="Close dialog" />
 *
 * // Loading state (automatically disables and shows spinner)
 * <ButtonGlass loading aria-live="polite">Processing...</ButtonGlass>
 *
 * // Different variants
 * <ButtonGlass variant="ghost">Cancel</ButtonGlass>
 * <ButtonGlass variant="success">Confirm</ButtonGlass>
 * <ButtonGlass variant="destructive">Delete</ButtonGlass>
 *
 * // As a link (asChild pattern) - maintains semantic HTML
 * <ButtonGlass asChild variant="primary">
 *   <a href="/dashboard">Go to Dashboard</a>
 * </ButtonGlass>
 *
 * // With Next.js Link
 * <ButtonGlass asChild variant="ghost">
 *   <Link href="/settings">Settings</Link>
 * </ButtonGlass>
 *
 * // Form submit button
 * <ButtonGlass type="submit" variant="primary">
 *   Submit Form
 * </ButtonGlass>
 * ```
 */
export interface ButtonGlassProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>,
    VariantProps<typeof buttonGlassVariants> {
  /**
   * Render as child element instead of button (polymorphic rendering).
   * Useful for rendering buttons as links or other interactive elements.
   *
   * **Note:** When using `asChild`, decorative effects (ripple, shine, glow)
   * are disabled to maintain compatibility with Radix UI Slot.
   * Only styles and event handlers are passed to the child element.
   *
   * @default false
   * @example
   * ```tsx
   * <ButtonGlass asChild>
   *   <a href="/about">About Us</a>
   * </ButtonGlass>
   * ```
   */
  readonly asChild?: boolean;

  /**
   * Visual style variant of the button
   * @default "primary"
   */
  readonly variant?: ButtonGlassVariant;

  /**
   * Show loading spinner and disable interactions
   * @default false
   */
  readonly loading?: boolean;

  /**
   * Icon component from lucide-react to display
   * @example icon={Check}
   */
  readonly icon?: LucideIcon;

  /**
   * Position of the icon relative to button text
   * @default "left"
   */
  readonly iconPosition?: 'left' | 'right';

  /**
   * Size variant of the button
   * @default "md"
   */
  readonly size?: 'sm' | 'md' | 'lg' | 'icon';
}

// ========================================
// COMPONENT
// ========================================

export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  (
    {
      asChild = false,
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
    const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

    const isDisabled = disabled || loading;
    const rippleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup ripple timeout on unmount
    useEffect(() => {
      return () => {
        if (rippleTimeoutRef.current) {
          clearTimeout(rippleTimeoutRef.current);
        }
      };
    }, []);

    // Ripple effect handler
    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        // Create ripple effect
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setRipple({ x, y });

        // Clear previous timeout if exists
        if (rippleTimeoutRef.current) {
          clearTimeout(rippleTimeoutRef.current);
        }

        rippleTimeoutRef.current = setTimeout(() => {
          setRipple(null);
          rippleTimeoutRef.current = null;
        }, 600);

        onClick?.(e);
      },
      [isDisabled, onClick]
    );

    // Polymorphic component - render as Slot when asChild is true
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonGlassVariants({ variant, size }),
          isHovered && !isDisabled && 'scale-[1.02]',
          className
        )}
        style={{
          ...getVariantStyles(variant, isHovered && !isDisabled, isFocusVisible && !isDisabled),
          outline: 'none',
        }}
        type={asChild ? undefined : 'button'}
        disabled={isDisabled}
        onClick={handleClick}
        onMouseEnter={hoverProps.onMouseEnter}
        onMouseLeave={hoverProps.onMouseLeave}
        onFocus={focusProps.onFocus}
        onBlur={focusProps.onBlur}
        {...props}
      >
        {/* When asChild is true, only render children (Slot expects a single child) */}
        {asChild ? (
          children
        ) : (
          <>
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
                    'radial-gradient(circle, oklch(100% 0 0 / 0.1) 0%, transparent 70%)',
                }}
              />
            )}

            {/* Loading spinner */}
            {loading && <RefreshCw className={cn(ICON_SIZES.md, 'animate-spin')} />}

            {/* Icon left */}
            {!loading && Icon && iconPosition === 'left' && (
              <Icon className={ICON_SIZES.md} />
            )}

            {/* Content */}
            {!loading && children}

            {/* Icon right */}
            {!loading && Icon && iconPosition === 'right' && (
              <Icon className={ICON_SIZES.md} />
            )}
          </>
        )}
      </Comp>
    );
  }
);

ButtonGlass.displayName = 'ButtonGlass';
