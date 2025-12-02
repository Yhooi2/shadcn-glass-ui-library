import { useState, useEffect } from 'react';

/**
 * Tailwind CSS breakpoints
 * @see https://tailwindcss.com/docs/responsive-design
 */
const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export interface UseResponsiveReturn {
  /** Window width is less than 768px (mobile) */
  isMobile: boolean;
  /** Window width is >= 768px and < 1024px (tablet) */
  isTablet: boolean;
  /** Window width is >= 1024px (desktop) */
  isDesktop: boolean;
  /** Current active breakpoint */
  currentBreakpoint: Breakpoint;
  /** Current window width in pixels */
  width: number;
}

/**
 * Hook to detect current responsive breakpoint
 *
 * @returns Responsive state with current breakpoint and device type flags
 *
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop, currentBreakpoint } = useResponsive();
 *
 * return (
 *   <div className={isMobile ? 'flex-col' : 'flex-row'}>
 *     {currentBreakpoint === 'lg' && <Sidebar />}
 *   </div>
 * );
 * ```
 */
export function useResponsive(): UseResponsiveReturn {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg
  );

  useEffect(() => {
    // Server-side rendering guard
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate current breakpoint
  const getCurrentBreakpoint = (): Breakpoint => {
    if (width >= BREAKPOINTS['2xl']) return '2xl';
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    return 'xs';
  };

  const currentBreakpoint = getCurrentBreakpoint();

  return {
    isMobile: width < BREAKPOINTS.md,
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
    currentBreakpoint,
    width,
  };
}
