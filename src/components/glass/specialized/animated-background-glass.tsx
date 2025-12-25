/**
 * AnimatedBackgroundGlass Component
 *
 * Animated gradient background with floating orbs for glassmorphism UIs.
 *
 * ## Features
 * - Theme-aware gradient background (glass/light/aurora)
 * - Floating animated orbs with blur effects
 * - Fixed positioning for full-page backgrounds
 * - Performance-optimized CSS animations
 *
 * @example Basic usage
 * ```tsx
 * import { AnimatedBackgroundGlass } from 'shadcn-glass-ui'
 *
 * function App() {
 *   return (
 *     <>
 *       <AnimatedBackgroundGlass />
 *       <main className="relative z-10">
 *         Your content here
 *       </main>
 *     </>
 *   )
 * }
 * ```
 *
 * @example With custom className
 * ```tsx
 * <AnimatedBackgroundGlass className="opacity-50" />
 * ```
 *
 * @accessibility
 * - Uses aria-hidden="true" as purely decorative
 * - Does not interfere with keyboard navigation
 */

import { forwardRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

export interface AnimatedBackgroundGlassProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'style'
> {
  /** Whether to show the center orb (only visible in glass theme by default) */
  readonly showCenterOrb?: boolean;
}

// ========================================
// COMPONENT
// ========================================

export const AnimatedBackgroundGlass = forwardRef<HTMLDivElement, AnimatedBackgroundGlassProps>(
  ({ className, showCenterOrb, ...props }, ref) => {
    const { theme } = useTheme();
    const isGlass = theme === 'glass';

    // Show center orb if explicitly set, or auto-show in glass theme
    const shouldShowCenterOrb = showCenterOrb ?? isGlass;

    const bgStyles: CSSProperties = {
      background: 'linear-gradient(135deg, var(--bg-from), var(--bg-via), var(--bg-to))',
    };

    return (
      <div
        ref={ref}
        className={cn('fixed inset-0 transition-all duration-500 overflow-hidden', className)}
        style={bgStyles}
        aria-hidden="true"
        {...props}
      >
        {/* Orb 1 - top left purple (600px) */}
        <div
          className="absolute top-20 -left-20 w-[600px] h-[600px] rounded-full animate-orb-float"
          style={{ background: 'var(--orb-1)', filter: 'blur(80px)' }}
        />
        {/* Orb 2 - bottom right blue (700px) */}
        <div
          className="absolute -bottom-20 -right-20 w-[700px] h-[700px] rounded-full animate-orb-float"
          style={{ background: 'var(--orb-2)', filter: 'blur(100px)', animationDelay: '2s' }}
        />
        {/* Orb 3 - center right pink (500px) */}
        <div
          className="absolute top-1/3 -right-10 w-[500px] h-[500px] rounded-full animate-orb-float"
          style={{ background: 'var(--orb-3)', filter: 'blur(70px)', animationDelay: '4s' }}
        />
        {/* Orb 4 - bottom left cyan (450px) */}
        <div
          className="absolute -bottom-10 left-1/4 w-[450px] h-[450px] rounded-full animate-orb-float"
          style={{ background: 'var(--orb-4)', filter: 'blur(60px)', animationDelay: '6s' }}
        />
        {/* Orb 5 - center (configurable, default: glass theme only) */}
        {shouldShowCenterOrb && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'var(--orb-5)', filter: 'blur(80px)' }}
          />
        )}
      </div>
    );
  }
);

AnimatedBackgroundGlass.displayName = 'AnimatedBackgroundGlass';

// ========================================
// ALIAS
// ========================================

/**
 * AnimatedBackground - Alias for AnimatedBackgroundGlass
 */
export const AnimatedBackground = AnimatedBackgroundGlass;
