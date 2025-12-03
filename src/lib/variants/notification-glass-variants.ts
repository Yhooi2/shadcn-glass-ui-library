/**
 * NotificationGlass CVA Variants
 * Extracted for Fast Refresh compatibility
 */

import { cva } from 'class-variance-authority';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export const notificationVariants = cva(
  'flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-2xl min-w-[280px] md:min-w-[320px] max-w-[360px] md:max-w-[420px] transition-all duration-300',
  {
    variants: {
      type: {
        info: '',
        success: '',
        warning: '',
        error: '',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);
