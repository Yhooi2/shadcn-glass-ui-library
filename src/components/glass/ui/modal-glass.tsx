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
  useMemo,
  forwardRef,
  type CSSProperties,
} from 'react';
import { type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { modalSizes } from '@/lib/variants/modal-glass-variants';
import { ICON_SIZES } from '@/components/glass/primitives';
import '@/glass-theme.css';

// ========================================
// TYPES & CONSTANTS
// ========================================

const MODAL_ANIMATION_DURATION = 200;

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

/**
 * Props for the ModalGlass component
 *
 * A glass-themed modal dialog with backdrop blur and animations.
 * Features size variants, ESC key support, and click-outside-to-close.
 *
 * @example
 * ```tsx
 * // Basic modal
 * <ModalGlass
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure?</p>
 * </ModalGlass>
 *
 * // Different sizes
 * <ModalGlass isOpen={true} onClose={close} title="Small" size="sm">
 *   Content
 * </ModalGlass>
 * ```
 */
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
    const [isClosing, setIsClosing] = useState<boolean>(false);

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

    const modalStyles: CSSProperties = useMemo(() => ({
      background: 'var(--modal-bg)',
      border: '1px solid var(--modal-border)',
      boxShadow: 'var(--modal-glow)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      transform: isClosing
        ? 'scale(0.95) translateY(10px)'
        : 'scale(1) translateY(0)',
      opacity: isClosing ? 0 : 1,
      animation: !isClosing ? 'modalFadeIn 0.3s ease-out' : 'none',
    }), [isClosing]);

    const overlayStyles: CSSProperties = useMemo(() => ({
      background: 'var(--modal-overlay)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      opacity: isClosing ? 0 : 1,
      transition: 'all 0.3s',
    }), [isClosing]);

    const closeButtonStyles: CSSProperties = useMemo(() => ({
      background: 'var(--modal-close-btn-bg)',
      border: 'var(--modal-close-btn-border)',
      color: 'var(--text-muted)',
    }), []);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
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
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'var(--modal-glow-effect)',
            }}
          />

          {/* Header */}
          <div className="relative flex items-center justify-between mb-4 md:mb-5">
            <h3
              id="modal-title"
              className="text-lg md:text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h3>
            <button
              onClick={handleClose}
              className="p-1.5 md:p-2 rounded-xl transition-all duration-300 hover:shadow-(--modal-close-btn-hover-glow)"
              style={closeButtonStyles}
              type="button"
              aria-label="Close modal"
            >
              <X className={ICON_SIZES.md} />
            </button>
          </div>

          {/* Content */}
          <div className="relative" style={{ color: 'var(--text-secondary)' }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

ModalGlass.displayName = 'ModalGlass';
