/**
 * ButtonGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

/**
 * ButtonGlass variant types (shadcn/ui compatible)
 * - default: Primary action (was 'primary')
 * - secondary: Secondary action
 * - ghost: Minimal visual presence
 * - destructive: Dangerous/delete actions
 * - outline: Border with transparent background (shadcn/ui standard)
 * - success: Positive feedback (glass-ui extension)
 * - link: Text-only button (was 'text', shadcn/ui standard name)
 */
export type ButtonGlassVariant =
  | 'default'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'link';

/**
 * ButtonGlass size types (shadcn/ui compatible)
 * - default: Standard size (was 'md')
 * - sm: Small
 * - lg: Large
 * - xl: Extra large (glass-ui extension)
 * - icon: Square icon button
 */
export type ButtonGlassSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon';

export const buttonGlassVariants = cva(
  'relative overflow-hidden font-medium inline-flex items-center justify-center transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: '',
        secondary: '',
        ghost: '',
        destructive: '',
        outline: '',
        success: '',
        link: '',
      },
      size: {
        // All sizes include min-h for touch target compliance (Apple HIG: 44px minimum)
        // Border radius per UI_DESIGN.md: sm/default=8px, lg=12px
        sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[44px] rounded-xl', // 8px radius
        default: 'px-4 py-2.5 text-sm gap-2 min-h-[44px] rounded-xl', // 8px radius
        lg: 'px-6 py-3 text-base gap-2.5 min-h-[48px] rounded-xl', // 12px radius
        xl: 'px-8 py-4 text-lg gap-3 min-h-[56px] rounded-xl', // 16px radius (beyond spec)
        icon: 'p-2.5 min-h-[44px] min-w-[44px] rounded-xl', // 8px radius
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
