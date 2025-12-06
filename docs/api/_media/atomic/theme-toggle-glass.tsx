// ========================================
// THEME TOGGLE GLASS - ATOMIC COMPONENT
// Theme switcher button with cycle animation
// Level 2: Atomic (extracted from HeaderNavGlass)
// ========================================

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme, type ThemeName } from '@/lib/theme-context';
import '@/glass-theme.css';

const themes: ThemeName[] = ['light', 'aurora', 'glass'];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: 'Light', icon: Sun },
  aurora: { label: 'Aurora', icon: Moon },
  glass: { label: 'Glass', icon: Palette },
};

export interface ThemeToggleGlassProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Custom theme toggle handler (overrides default cycleTheme) */
  readonly onToggle?: () => void;
  /** Icon size in pixels (default: 20) */
  readonly iconSize?: number;
  /** Show icon only (hide label on mobile) */
  readonly iconOnly?: boolean;
}

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
