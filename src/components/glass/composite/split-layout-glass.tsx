// ========================================
// SPLIT LAYOUT GLASS COMPONENT
// Two-column responsive layout with sticky scroll behavior
// ========================================

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass/ui/glass-card';
import type { IntensityType } from '@/lib/variants/glass-card-variants';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

/**
 * Props for the SplitLayoutGlass component
 *
 * A responsive two-column layout with sticky scroll behavior and glassmorphism styling.
 * Features independent scrolling in each panel after sticky positioning activates.
 *
 * @pattern MDN, GitHub Docs, Linear
 * - Panels scroll together until reaching top offset
 * - Then each panel scrolls independently with max-height constraint
 * - Responsive: 2 columns on desktop, 1 column on mobile
 *
 * @accessibility
 * - **Semantic HTML:** Uses `<aside>` for sidebar and `<main>` for main content
 * - **ARIA Labels:** Configurable labels for screen reader navigation regions
 * - **Keyboard Navigation:** Inherits scroll behavior, no custom keyboard handling needed
 * - **Focus Management:** Normal tab order through scrollable content
 * - **Responsive:** Mobile-first approach with configurable layouts
 *
 * @example Basic usage
 * ```tsx
 * <SplitLayoutGlass
 *   sidebar={
 *     <>
 *       <div className="shrink-0 p-4">Sidebar Header</div>
 *       <ScrollArea className="flex-1 min-h-0">
 *         <div className="p-4">Sidebar Content</div>
 *       </ScrollArea>
 *     </>
 *   }
 *   main={
 *     <ScrollArea className="h-full">
 *       <div className="p-6">Main Content</div>
 *     </ScrollArea>
 *   }
 * />
 * ```
 *
 * @example Custom ratio and intensity
 * ```tsx
 * <SplitLayoutGlass
 *   sidebar={<SidebarContent />}
 *   main={<MainContent />}
 *   ratio={{ sidebar: 1, main: 3 }}  // 25% : 75%
 *   intensity="strong"
 *   minSidebarWidth="280px"
 *   maxSidebarWidth="400px"
 * />
 * ```
 *
 * @example Mobile layouts
 * ```tsx
 * // Stack sidebar above main (default)
 * <SplitLayoutGlass
 *   sidebar={<Filters />}
 *   main={<Products />}
 *   mobileLayout="stack"
 * />
 *
 * // Show only main on mobile
 * <SplitLayoutGlass
 *   sidebar={<ComplexFilters />}
 *   main={<ShoppingCart />}
 *   mobileLayout="main-only"
 * />
 * ```
 */
export interface SplitLayoutGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  // ==================== CONTENT ====================

  /**
   * Sidebar content (left column on desktop)
   * User should structure content with header + ScrollArea
   * @example
   * ```tsx
   * sidebar={
   *   <>
   *     <div className="shrink-0">Header</div>
   *     <ScrollArea className="flex-1 min-h-0">
   *       Content
   *     </ScrollArea>
   *   </>
   * }
   * ```
   */
  readonly sidebar: ReactNode;

  /**
   * Main content (right column on desktop)
   * User should use ScrollArea for scrollable content
   * @example
   * ```tsx
   * main={
   *   <ScrollArea className="h-full">
   *     Content
   *   </ScrollArea>
   * }
   * ```
   */
  readonly main: ReactNode;

  // ==================== LAYOUT ====================

  /**
   * Sidebar to main ratio (in fr units)
   * @default { sidebar: 1, main: 2 }
   * @example
   * - { sidebar: 1, main: 2 } = 33% : 67%
   * - { sidebar: 1, main: 3 } = 25% : 75%
   * - { sidebar: 1, main: 1 } = 50% : 50%
   */
  readonly ratio?: { sidebar: number; main: number };

  /**
   * Minimum sidebar width (prevents squeezing)
   * Used in CSS Grid minmax()
   * @default "300px"
   */
  readonly minSidebarWidth?: string;

  /**
   * Maximum sidebar width (optional constraint)
   * @default undefined (uses ratio fraction)
   * @example "500px" - sidebar won't exceed 500px
   */
  readonly maxSidebarWidth?: string;

  /**
   * Gap between panels
   * Can be single number (both mobile/desktop) or object
   * @default { mobile: 16, desktop: 24 }
   * @example
   * - gap={20} - 20px on all screens
   * - gap={{ mobile: 12, desktop: 32 }} - different per breakpoint
   */
  readonly gap?: number | { mobile?: number; desktop?: number };

  // ==================== RESPONSIVE ====================

  /**
   * Breakpoint for desktop layout
   * @default "md" (768px) - Shows 2-column layout on tablet and above
   *
   * Tailwind breakpoints:
   * - sm: 640px
   * - md: 768px (tablet and above)
   * - lg: 1024px
   * - xl: 1440px
   * - 2xl: 1536px
   */
  readonly breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Mobile layout mode (< breakpoint)
   * @default "stack"
   *
   * Options:
   * - 'stack': sidebar above main
   * - 'main-only': hide sidebar, show only main
   * - 'sidebar-only': hide main, show only sidebar
   */
  readonly mobileLayout?: 'stack' | 'main-only' | 'sidebar-only';

  // ==================== STICKY SCROLL ====================

  /**
   * Sticky offset from viewport top (desktop only)
   * On mobile, sticky is disabled
   * @default 24 (equivalent to Tailwind top-6)
   */
  readonly stickyOffset?: number;

  // ==================== GLASSMORPHISM ====================

  /**
   * Glass intensity for panels
   * @default "medium"
   */
  readonly intensity?: IntensityType; // 'subtle' | 'medium' | 'strong'

  // ==================== ACCESSIBILITY ====================

  /**
   * ARIA label for sidebar navigation region
   * @default "Sidebar navigation"
   */
  readonly sidebarLabel?: string;

  /**
   * ARIA label for main content region
   * @default "Main content"
   */
  readonly mainLabel?: string;

  // ==================== CUSTOMIZATION ====================

  /**
   * Custom className for container
   */
  readonly className?: string;

  /**
   * Custom className for sidebar
   */
  readonly sidebarClassName?: string;

  /**
   * Custom className for main
   */
  readonly mainClassName?: string;
}

// ========================================
// COMPONENT
// ========================================

export const SplitLayoutGlass = forwardRef<HTMLDivElement, SplitLayoutGlassProps>(
  (
    {
      sidebar,
      main,
      ratio = { sidebar: 1, main: 2 },
      minSidebarWidth = '300px',
      maxSidebarWidth,
      gap = { mobile: 16, desktop: 24 },
      breakpoint = 'md',
      mobileLayout = 'stack',
      stickyOffset = 24,
      intensity = 'medium',
      sidebarLabel = 'Sidebar navigation',
      mainLabel = 'Main content',
      className,
      sidebarClassName,
      mainClassName,
      ...props
    },
    ref
  ) => {
    // Normalize gap values
    const gapMobile = typeof gap === 'number' ? gap : (gap.mobile ?? 16);
    const gapDesktop = typeof gap === 'number' ? gap : (gap.desktop ?? 24);

    // Build grid-template-columns for desktop
    // Examples:
    // - minmax(300px, 1fr) 2fr          // min 300px, no max (uses ratio)
    // - minmax(300px, 400px) 2fr        // min 300px, max 400px
    const gridTemplate = maxSidebarWidth
      ? `minmax(${minSidebarWidth}, ${maxSidebarWidth}) ${ratio.main}fr`
      : `minmax(${minSidebarWidth}, ${ratio.sidebar}fr) ${ratio.main}fr`;

    // Breakpoint prefix for responsive classes
    const bp = breakpoint;

    // Breakpoint map for media queries in style tag
    const breakpointMap: Record<string, string> = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1536px',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          // Mobile layout variants
          mobileLayout === 'stack' && 'grid-cols-1',
          mobileLayout === 'main-only' && 'grid-cols-1 [&>aside]:hidden',
          mobileLayout === 'sidebar-only' && 'grid-cols-1 [&>main]:hidden',
          // Desktop grid-template via arbitrary value
          bp === 'xl' && 'xl:grid-cols-[var(--grid-template)]',
          bp === 'lg' && 'lg:grid-cols-[var(--grid-template)]',
          bp === 'md' && 'md:grid-cols-[var(--grid-template)]',
          bp === 'sm' && 'sm:grid-cols-[var(--grid-template)]',
          bp === '2xl' && '2xl:grid-cols-[var(--grid-template)]',
          className
        )}
        style={
          {
            // CSS Variables for dynamic values
            '--grid-template': gridTemplate,
            '--sticky-offset': `${stickyOffset}px`,
            '--sticky-max-height': `calc(100vh - calc(${stickyOffset}px * 2))`,
            // Gap: mobile default, desktop via inline style
            gap: `${gapMobile}px`,
            // Note: Desktop gap is handled via @media in inline style below
          } as CSSProperties
        }
        {...props}
      >
        {/* ==================== SIDEBAR ==================== */}
        <GlassCard
          asChild
          intensity={intensity}
          padding="none"
          className={cn(
            'overflow-hidden',
            // Desktop: sticky with max-height and flex for ScrollArea
            `${bp}:sticky`,
            `${bp}:top-[var(--sticky-offset)]`,
            `${bp}:max-h-[var(--sticky-max-height)]`,
            `${bp}:flex`,
            `${bp}:flex-col`,
            sidebarClassName
          )}
        >
          <aside aria-label={sidebarLabel}>{sidebar}</aside>
        </GlassCard>

        {/* ==================== MAIN ==================== */}
        <GlassCard
          asChild
          intensity={intensity}
          padding="none"
          className={cn(
            'overflow-hidden',
            // Desktop: sticky with max-height
            `${bp}:sticky`,
            `${bp}:top-[var(--sticky-offset)]`,
            `${bp}:max-h-[var(--sticky-max-height)]`,
            mainClassName
          )}
        >
          <main aria-label={mainLabel}>{main}</main>
        </GlassCard>

        {/* Inline style for desktop gap (can't use arbitrary values for gap) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (min-width: ${breakpointMap[bp]}) {
                [style*="--grid-template"] {
                  gap: ${gapDesktop}px;
                }
              }
            `,
          }}
        />
      </div>
    );
  }
);

SplitLayoutGlass.displayName = 'SplitLayoutGlass';
