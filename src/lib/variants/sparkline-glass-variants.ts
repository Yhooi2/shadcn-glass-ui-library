import { cva } from 'class-variance-authority';

export type SparklineHeight = 'sm' | 'md' | 'lg';
export type SparklineGap = 'none' | 'sm' | 'md';

export const sparklineContainerVariants = cva('flex items-end', {
  variants: {
    height: {
      sm: 'h-4', // 16px
      md: 'h-6', // 24px
      lg: 'h-8', // 32px
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-px', // 1px
      md: 'gap-0.5', // 2px
    },
  },
  defaultVariants: {
    height: 'md',
    gap: 'sm',
  },
});

export const sparklineBarVariants = cva('flex-1 rounded-sm transition-all duration-300', {
  variants: {
    animated: {
      true: 'animate-sparkline-grow',
      false: '',
    },
  },
  defaultVariants: {
    animated: false,
  },
});
