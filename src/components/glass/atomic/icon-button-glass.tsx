/**
 * IconButtonGlass Component
 *
 * Icon-only button with glassmorphism styling and touch-friendly sizing.
 * Perfect for toolbar actions, header controls, and compact interfaces.
 *
 * ## Features
 * - Icon-only button with required aria-label for accessibility
 * - 4 size variants: `sm` (32px), `md` (40px), `lg` (48px), `touch` (44px mobile, 40px desktop)
 * - 3 visual variants: `gradient` (colorful gradient), `subtle` (glass card), `ghost` (transparent)
 * - Touch-friendly sizing with WCAG 2.1 AA compliance (44px minimum)
 * - Responsive touch variant adapts to screen size
 * - Built-in hover scale animation (105%)
 * - Focus ring for keyboard navigation
 * - Accepts any Lucide React icon component
 * - Customizable icon size independent of button size
 * - Theme-aware styling through CSS variables
 *
 * ## CSS Variables
 * Uses inline gradient styles (NOT CSS variables) for visual variants:
 * - `gradient` variant: `--icon-btn-from`, `--icon-btn-to`, `--icon-btn-shadow`, `--icon-btn-text`
 * - `subtle` variant: `--card-subtle-bg`, `--card-subtle-border`, `--icon-btn-text`
 * - `ghost` variant: No CSS variables (transparent background)
 *
 * @example Basic icon button
 * ```tsx
 * import { IconButtonGlass } from 'shadcn-glass-ui'
 * import { Search } from 'lucide-react'
 *
 * function Toolbar() {
 *   return (
 *     <IconButtonGlass
 *       icon={Search}
 *       aria-label="Search"
 *       onClick={() => console.log('Search clicked')}
 *     />
 *   )
 * }
 * ```
 *
 * @example Touch-friendly size for mobile
 * ```tsx
 * import { Menu } from 'lucide-react'
 *
 * <IconButtonGlass
 *   icon={Menu}
 *   size="touch"
 *   aria-label="Open menu"
 * />
 * ```
 *
 * @example Different variants
 * ```tsx
 * import { Settings, Bell, User } from 'lucide-react'
 *
 * // Gradient (colorful)
 * <IconButtonGlass icon={Settings} variant="gradient" aria-label="Settings" />
 *
 * // Subtle (glass card)
 * <IconButtonGlass icon={Bell} variant="subtle" aria-label="Notifications" />
 *
 * // Ghost (transparent)
 * <IconButtonGlass icon={User} variant="ghost" aria-label="Profile" />
 * ```
 *
 * @example Custom icon size
 * ```tsx
 * import { Trash2 } from 'lucide-react'
 *
 * <IconButtonGlass
 *   icon={Trash2}
 *   iconSize={16}
 *   size="sm"
 *   variant="subtle"
 *   aria-label="Delete"
 * />
 * ```
 *
 * @accessibility
 * - `aria-label` prop is required for screen reader support
 * - Focus ring visible for keyboard navigation (2px ring with offset)
 * - Touch targets meet WCAG 2.1 AA minimum (44px) via `touch` size
 * - Hover and focus states provide clear interaction feedback
 * - Button type defaults to "button" to prevent form submission
 *
 * @since v1.0.0
 */

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

// ========================================
// VARIANTS
// ========================================

const iconButtonVariants = cva(
  'rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        // Touch target: 44px minimum for mobile (WCAG 2.1 AA)
        touch: 'w-11 h-11 md:w-10 md:h-10',
      },
      variant: {
        gradient: '',
        subtle: '',
        ghost: 'bg-transparent hover:bg-white/10',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'gradient',
    },
  }
);

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for IconButtonGlass component.
 *
 * Extends standard button attributes with icon-specific props and CVA variants.
 * The `aria-label` prop is required for accessibility since there is no visible text.
 *
 * @example
 * ```tsx
 * import { Settings } from 'lucide-react'
 *
 * const props: IconButtonGlassProps = {
 *   icon: Settings,
 *   'aria-label': 'Open settings',
 *   size: 'touch',
 *   variant: 'gradient',
 *   onClick: () => console.log('Clicked'),
 * };
 * ```
 */
export interface IconButtonGlassProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  /**
   * Lucide icon component to render inside the button.
   *
   * @example
   * ```tsx
   * import { Search, Menu, Settings } from 'lucide-react'
   *
   * <IconButtonGlass icon={Search} aria-label="Search" />
   * <IconButtonGlass icon={Menu} aria-label="Menu" />
   * <IconButtonGlass icon={Settings} aria-label="Settings" />
   * ```
   */
  readonly icon: LucideIcon;

  /**
   * Icon size in pixels.
   *
   * Independent of button size for flexible icon sizing.
   * Use smaller icons for compact buttons, larger for prominent actions.
   *
   * @default 20
   * @example
   * ```tsx
   * // Small icon in small button
   * <IconButtonGlass icon={Close} iconSize={16} size="sm" aria-label="Close" />
   *
   * // Large icon in large button
   * <IconButtonGlass icon={Plus} iconSize={24} size="lg" aria-label="Add" />
   * ```
   */
  readonly iconSize?: number;

  /**
   * Accessible label for screen readers.
   *
   * REQUIRED since icon-only buttons have no visible text.
   * Describe the button's action clearly.
   *
   * @example
   * ```tsx
   * <IconButtonGlass icon={Search} aria-label="Search repository" />
   * <IconButtonGlass icon={Settings} aria-label="Open settings" />
   * <IconButtonGlass icon={Close} aria-label="Close dialog" />
   * ```
   */
  readonly 'aria-label': string;
}

// ========================================
// COMPONENT
// ========================================

export const IconButtonGlass = forwardRef<HTMLButtonElement, IconButtonGlassProps>(
  (
    { icon: Icon, iconSize = 20, size, variant, className, 'aria-label': ariaLabel, ...props },
    ref
  ) => {
    const gradientStyles: CSSProperties | undefined =
      variant === 'gradient'
        ? {
            background: 'linear-gradient(135deg, var(--icon-btn-from), var(--icon-btn-to))',
            boxShadow: 'var(--icon-btn-shadow)',
          }
        : undefined;

    const subtleStyles: CSSProperties | undefined =
      variant === 'subtle'
        ? {
            background: 'var(--card-subtle-bg)',
            border: '1px solid var(--card-subtle-border)',
          }
        : undefined;

    const iconStyles: CSSProperties = {
      color: 'var(--icon-btn-text)',
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ size, variant }), className)}
        style={gradientStyles ?? subtleStyles}
        {...props}
      >
        <Icon size={iconSize} style={iconStyles} />
      </button>
    );
  }
);

IconButtonGlass.displayName = 'IconButtonGlass';
