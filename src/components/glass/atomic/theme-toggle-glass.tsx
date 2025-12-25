/**
 * ThemeToggleGlass Component
 *
 * Theme cycling button that switches between Light, Aurora, and Glass themes.
 * Displays animated icon transitions with theme-aware styling.
 *
 * ## Features
 * - One-click theme cycling through 3 themes (light → aurora → glass → light)
 * - Animated icon transitions (Sun → Moon → Palette)
 * - Built on IconButtonGlass styling for consistency
 * - Theme preview via icon (shows NEXT theme, not current)
 * - Optional text label showing next theme name
 * - Responsive label visibility (hidden on mobile by default)
 * - Integrates with useTheme hook for global theme state
 * - Accessible button with descriptive aria-label
 * - Keyboard accessible (Enter/Space to activate)
 * - Custom toggle handler support for advanced use cases
 *
 * ## CSS Variables
 * Uses IconButtonGlass CSS variables:
 * - `--card-subtle-bg` - Button background
 * - `--card-subtle-border` - Button border
 * - `--text-secondary` - Icon and label color
 *
 * @example Basic theme toggle
 * ```tsx
 * import { ThemeToggleGlass } from 'shadcn-glass-ui'
 *
 * function Header() {
 *   return (
 *     <ThemeToggleGlass />
 *   )
 * }
 * ```
 *
 * @example Icon-only (no label)
 * ```tsx
 * <ThemeToggleGlass iconOnly />
 * ```
 *
 * @example Custom toggle handler
 * ```tsx
 * function AdvancedThemeToggle() {
 *   const handleToggle = () => {
 *     console.log('Theme changing...')
 *     // Custom logic here
 *   }
 *
 *   return <ThemeToggleGlass onToggle={handleToggle} />
 * }
 * ```
 *
 * @example Larger icon size
 * ```tsx
 * <ThemeToggleGlass iconSize={24} />
 * ```
 *
 * @accessibility
 * - Descriptive aria-label indicates next theme (e.g., "Switch to Aurora theme")
 * - Focus ring visible for keyboard navigation
 * - Keyboard activation via Enter or Space key
 * - Icon provides visual feedback for theme state
 * - Hover scale animation (105%) indicates interactivity
 *
 * @since v1.0.0
 */

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme, type ThemeName } from '@/lib/theme-context';
import '@/glass-theme.css';

// ========================================
// CONFIGURATION
// ========================================

const themes: ThemeName[] = ['light', 'aurora', 'glass'];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
};

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for ThemeToggleGlass component.
 *
 * Extends standard button attributes with theme-specific props.
 * Integrates with useTheme hook for automatic theme cycling.
 *
 * @example
 * ```tsx
 * const props: ThemeToggleGlassProps = {
 *   iconOnly: true,
 *   iconSize: 24,
 *   onToggle: () => console.log('Theme changed'),
 * };
 * ```
 */
export interface ThemeToggleGlassProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Custom theme toggle handler.
   *
   * Overrides default cycleTheme behavior from useTheme hook.
   * Useful for adding analytics, animations, or custom theme logic.
   *
   * @example
   * ```tsx
   * <ThemeToggleGlass
   *   onToggle={() => {
   *     trackEvent('theme_changed')
   *     // Custom logic
   *   }}
   * />
   * ```
   */
  readonly onToggle?: () => void;

  /**
   * Icon size in pixels.
   *
   * Controls the size of the Sun, Moon, or Palette icon.
   *
   * @default 20
   * @example
   * ```tsx
   * // Larger icon for prominent placement
   * <ThemeToggleGlass iconSize={24} />
   *
   * // Smaller icon for compact toolbar
   * <ThemeToggleGlass iconSize={16} />
   * ```
   */
  readonly iconSize?: number;

  /**
   * Show icon only (hide label).
   *
   * When `false`, displays theme name label on desktop (hidden on mobile).
   * When `true`, only shows icon on all screen sizes.
   *
   * @default false
   * @example
   * ```tsx
   * // Icon with label (desktop only)
   * <ThemeToggleGlass />
   *
   * // Icon only (all screens)
   * <ThemeToggleGlass iconOnly />
   * ```
   */
  readonly iconOnly?: boolean;
}

// ========================================
// COMPONENT
// ========================================

export const ThemeToggleGlass = forwardRef<HTMLButtonElement, ThemeToggleGlassProps>(
  ({ onToggle, iconSize = 20, iconOnly = false, className, ...props }, ref) => {
    const { theme, cycleTheme } = useTheme();

    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    const NextIcon = themeConfig[nextTheme].icon;
    const nextLabel = themeConfig[nextTheme].label;

    const buttonStyles: CSSProperties = {
      background: 'var(--card-subtle-bg)',
      border: '1px solid var(--card-subtle-border)',
    };

    const iconStyles: CSSProperties = {
      color: 'var(--text-secondary)',
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle ?? cycleTheme}
        aria-label={`Switch to ${nextLabel} theme`}
        className={cn(
          'p-2.5 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
          iconOnly && 'md:px-4 md:gap-2',
          className
        )}
        style={buttonStyles}
        {...props}
      >
        <div className="flex items-center gap-2">
          <NextIcon size={iconSize} style={iconStyles} />
          {!iconOnly && (
            <span className="hidden md:inline text-sm font-medium" style={iconStyles}>
              {nextLabel}
            </span>
          )}
        </div>
      </button>
    );
  }
);

ThemeToggleGlass.displayName = 'ThemeToggleGlass';
