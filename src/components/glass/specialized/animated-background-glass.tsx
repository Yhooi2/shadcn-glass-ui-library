/**
 * AnimatedBackgroundGlass Component
 *
 * Animated gradient background with floating orbs for glassmorphism UIs.
 * Provides an immersive atmosphere with theme-aware styling.
 *
 * ## Features
 * - Theme-aware gradient background (glass/light/aurora)
 * - 5 floating animated orbs with blur effects
 * - Fixed positioning for full-page backgrounds
 * - Performance-optimized CSS animations (8s cycle)
 * - Configurable center orb visibility
 *
 * ## Orb Configuration
 * - **Orb 1:** Top-left, 600px, purple/blue tones
 * - **Orb 2:** Bottom-right, 700px, blue/violet tones, 2s delay
 * - **Orb 3:** Center-right, 500px, pink/cyan tones, 4s delay
 * - **Orb 4:** Bottom-left, 450px, cyan/violet tones, 6s delay
 * - **Orb 5:** Center, 500px, violet (glass theme only by default)
 *
 * ## CSS Variables
 * Customize colors via theme CSS variables:
 * - `--orb-1` through `--orb-5`: Orb colors (OKLCH with opacity)
 * - `--bg-from`, `--bg-via`, `--bg-to`: Gradient stops
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
 * @example With center orb forced on
 * ```tsx
 * <AnimatedBackgroundGlass showCenterOrb={true} />
 * ```
 *
 * @example With reduced opacity
 * ```tsx
 * <AnimatedBackgroundGlass className="opacity-50" />
 * ```
 *
 * @example With dark overlay for better contrast
 * ```tsx
 * <>
 *   <AnimatedBackgroundGlass />
 *   <div className="fixed inset-0 bg-black/30 z-[1]" />
 *   <main className="relative z-10">Content</main>
 * </>
 * ```
 *
 * @accessibility
 * - Uses `aria-hidden="true"` as purely decorative element
 * - Does not interfere with keyboard navigation
 * - No interactive elements within the component
 * - Animation uses CSS (respects `prefers-reduced-motion` when configured)
 *
 * @since v1.0.0
 */

import { forwardRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import '@/glass-theme.css';

// ========================================
// PROPS INTERFACE
// ========================================

/**
 * Props for AnimatedBackgroundGlass component.
 *
 * Extends standard div attributes (excluding `style`) for maximum flexibility.
 * The `style` prop is excluded because the component uses internal inline styles
 * for the gradient background.
 *
 * @example
 * ```tsx
 * const props: AnimatedBackgroundGlassProps = {
 *   showCenterOrb: true,
 *   className: 'opacity-75',
 * };
 * ```
 */
export interface AnimatedBackgroundGlassProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'style'
> {
  /**
   * Whether to show the center orb (Orb 5).
   *
   * - In `glass` theme: defaults to `true`
   * - In `light` and `aurora` themes: defaults to `false`
   *
   * Override to force visibility in any theme.
   *
   * @default undefined (auto-detected based on theme)
   */
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
