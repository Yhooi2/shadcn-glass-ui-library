/**
 * StepperGlass CVA Variants
 *
 * Type-safe variant definitions for the StepperGlass compound component.
 * Extracted for Fast Refresh compatibility and reusability.
 *
 * @module stepper-glass-variants
 */

import { cva } from 'class-variance-authority';

// ========================================
// TYPE DEFINITIONS
// ========================================

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperVariant = 'numbered' | 'icon' | 'dots';
export type StepperSize = 'sm' | 'md' | 'lg';
export type StepStatus = 'pending' | 'active' | 'completed' | 'disabled';

// ========================================
// ROOT VARIANTS
// ========================================

export const stepperRootVariants = cva('flex w-full', {
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// ========================================
// LIST VARIANTS
// ========================================

export const stepperListVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center w-full',
      vertical: 'flex-col gap-0',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// ========================================
// STEP CONTAINER VARIANTS
// ========================================

export const stepperStepContainerVariants = cva('relative flex transition-all duration-300', {
  variants: {
    orientation: {
      horizontal: 'flex-col items-center flex-1',
      vertical: 'flex-row items-start gap-3',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// ========================================
// STEP INDICATOR VARIANTS
// ========================================

export const stepperIndicatorVariants = cva(
  'relative flex items-center justify-center rounded-full font-medium transition-all duration-300 shrink-0',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
      },
      variant: {
        numbered: '',
        icon: '',
        dots: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'numbered',
    },
    compoundVariants: [
      // Dots variant has smaller indicators
      { variant: 'dots', size: 'sm', className: '!w-2.5 !h-2.5' },
      { variant: 'dots', size: 'md', className: '!w-3 !h-3' },
      { variant: 'dots', size: 'lg', className: '!w-4 !h-4' },
    ],
  }
);

// ========================================
// CONNECTOR VARIANTS
// ========================================

export const stepperConnectorVariants = cva('transition-all duration-500 ease-out', {
  variants: {
    orientation: {
      horizontal: 'h-0.5 flex-1 mx-2 md:mx-3',
      vertical: 'w-0.5 min-h-6 ml-5 my-1',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// ========================================
// LABEL VARIANTS
// ========================================

export const stepperLabelVariants = cva(
  'font-medium transition-colors duration-300 whitespace-nowrap',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      orientation: {
        horizontal: 'mt-2 text-center',
        vertical: '',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal',
    },
  }
);

// ========================================
// DESCRIPTION VARIANTS
// ========================================

export const stepperDescriptionVariants = cva('transition-colors duration-300', {
  variants: {
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
    },
    orientation: {
      horizontal: 'text-center max-w-[100px] md:max-w-[120px]',
      vertical: 'max-w-[200px]',
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
  },
});

// ========================================
// CONTENT VARIANTS
// ========================================

export const stepperContentVariants = cva('animate-in fade-in-0 duration-200', {
  variants: {
    orientation: {
      horizontal: 'mt-6',
      vertical: 'mt-4',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
