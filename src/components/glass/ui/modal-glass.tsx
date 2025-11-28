/**
 * ModalGlass Component
 *
 * Glass-themed modal with:
 * - Theme-aware styling (glass/light/aurora)
 * - Smooth open/close animations
 * - Escape key to close
 * - Click outside to close
 * - Body scroll lock
 * - Size variants
 */

import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  type CSSProperties,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import { themeStyles } from '@/lib/themeStyles';
import '@/glass-theme.css';

// ========================================
// TYPES & CONSTANTS
// ========================================

const MODAL_ANIMATION_DURATION = 200;

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// ========================================
// SIZE VARIANTS (using CVA)
// ========================================

const modalSizes = cva('relative w-full rounded-3xl p-6 transition-all duration-300', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-4xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ========================================
// HELPERS
// ========================================

const lockBodyScroll = (): void => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = 'hidden';
};

const unlockBodyScroll = (): void => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = '';
};

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// ========================================
// PROPS INTERFACE
// ========================================

export interface ModalGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof modalSizes> {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly children: React.ReactNode;
}

// ========================================
// COMPONENT
// ========================================

export const ModalGlass = forwardRef<HTMLDivElement, ModalGlassProps>(
  ({ isOpen, onClose, title, children, size = 'md', className, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const isGlass = theme === 'glass';

    const handleClose = useCallback(async (): Promise<void> => {
      setIsClosing(true);
      await delay(MODAL_ANIMATION_DURATION);
      setIsClosing(false);
      onClose();
    }, [onClose]);

    useEffect(() => {
      if (isOpen) {
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
      return () => {
        unlockBodyScroll();
      };
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    // Glass theme specific styles
    const modalStyles: CSSProperties = isGlass
      ? {
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow:
            '0 25px 80px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          transform: isClosing
            ? 'scale(0.95) translateY(10px)'
            : 'scale(1) translateY(0)',
          opacity: isClosing ? 0 : 1,
          animation: !isClosing ? 'modalFadeIn 0.3s ease-out' : 'none',
        }
      : {
          background: t.modalBg,
          border: `1px solid ${t.modalBorder}`,
          boxShadow: t.modalGlow,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          transform: isClosing
            ? 'scale(0.95) translateY(10px)'
            : 'scale(1) translateY(0)',
          opacity: isClosing ? 0 : 1,
          animation: !isClosing ? 'modalFadeIn 0.3s ease-out' : 'none',
        };

    const overlayStyles: CSSProperties = {
      background: t.modalOverlay,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      opacity: isClosing ? 0 : 1,
      transition: 'all 0.3s',
    };

    const closeButtonStyles: CSSProperties = {
      background: isGlass ? 'rgba(255,255,255,0.08)' : t.listItemHover,
      border: isGlass ? '1px solid rgba(255,255,255,0.10)' : 'none',
      color: t.textMuted,
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        {...props}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={overlayStyles}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Modal content */}
        <div
          ref={ref}
          className={cn(modalSizes({ size }), className)}
          style={modalStyles}
        >
          {/* Glow effect for glass theme */}
          {isGlass && (
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at top, rgba(168,85,247,0.15) 0%, transparent 50%)',
              }}
            />
          )}

          {/* Header */}
          <div className="relative flex items-center justify-between mb-5">
            <h3
              id="modal-title"
              className="text-xl font-semibold"
              style={{ color: t.textPrimary }}
            >
              {title}
            </h3>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl transition-all duration-300"
              style={closeButtonStyles}
              type="button"
              aria-label="Close modal"
              onMouseEnter={(e) => {
                if (isGlass) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.boxShadow =
                    '0 0 20px rgba(168,85,247,0.30)';
                }
              }}
              onMouseLeave={(e) => {
                if (isGlass) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="relative" style={{ color: t.textSecondary }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

ModalGlass.displayName = 'ModalGlass';

export { modalSizes as modalGlassVariants };
