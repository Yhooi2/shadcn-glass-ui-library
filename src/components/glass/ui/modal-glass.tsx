/* eslint-disable react-refresh/only-export-components */
/**
 * ModalGlass Component (Compound API only)
 *
 * Glass-themed modal with:
 * - Theme-aware styling (glass/light/aurora)
 * - Smooth open/close animations
 * - Escape key to close
 * - Click outside to close
 * - Body scroll lock
 * - Size variants
 * - Compound component API for advanced composition
 *
 * @example
 * ```tsx
 * <ModalGlass.Root open={open} onOpenChange={setOpen}>
 *   <ModalGlass.Overlay />
 *   <ModalGlass.Content>
 *     <ModalGlass.Header>
 *       <ModalGlass.Title>Confirm</ModalGlass.Title>
 *       <ModalGlass.Description>Are you sure?</ModalGlass.Description>
 *       <ModalGlass.Close />
 *     </ModalGlass.Header>
 *     <ModalGlass.Body>
 *       <p>Body content</p>
 *     </ModalGlass.Body>
 *     <ModalGlass.Footer>
 *       <ButtonGlass onClick={() => setOpen(false)}>Cancel</ButtonGlass>
 *     </ModalGlass.Footer>
 *   </ModalGlass.Content>
 * </ModalGlass.Root>
 * ```
 *
 * @since v1.0.0 - Legacy API removed (isOpen/onClose/title props)
 */

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  createContext,
  useContext,
  type CSSProperties,
  type FC,
  type ReactNode,
} from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHover } from '@/lib/hooks/use-hover';
import { useFocus } from '@/lib/hooks/use-focus';
import { modalSizes, type ModalSize } from '@/lib/variants/modal-glass-variants';
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
// CONTEXT FOR COMPOUND COMPONENTS
// ========================================

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  size: ModalSize;
  isClosing: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within ModalGlass.Root');
  }
  return context;
};

// ========================================
// COMPOUND COMPONENT: ROOT
// ========================================

interface ModalRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Open state */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Size variant */
  size?: ModalSize;
  /** Child components */
  children: ReactNode;
}

const ModalRoot: FC<ModalRootProps> = ({
  open,
  onOpenChange,
  size = 'md',
  children,
  ...props
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(async () => {
    setIsClosing(true);
    await delay(MODAL_ANIMATION_DURATION);
    setIsClosing(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => {
      unlockBodyScroll();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <ModalContext.Provider value={{ isOpen: open, onClose: handleClose, size, isClosing }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        {...props}
      >
        {children}
      </div>
    </ModalContext.Provider>
  );
};

// ========================================
// COMPOUND COMPONENT: OVERLAY
// ========================================

interface ModalOverlayProps {
  className?: string;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ className }) => {
  const { onClose, isClosing } = useModalContext();

  const overlayStyles: CSSProperties = useMemo(
    () => ({
      background: 'var(--modal-overlay)',
      backdropFilter: 'blur(var(--blur-sm))',
      WebkitBackdropFilter: 'blur(var(--blur-sm))',
      opacity: isClosing ? 0 : 1,
      transition: 'all 0.3s',
    }),
    [isClosing]
  );

  return (
    <div
      className={cn('absolute inset-0 transition-all duration-300', className)}
      style={overlayStyles}
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

// ========================================
// COMPOUND COMPONENT: CONTENT
// ========================================

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className }, ref) => {
    const { size, isClosing } = useModalContext();

    const modalStyles: CSSProperties = useMemo(
      () => ({
        background: 'var(--modal-bg)',
        border: '1px solid var(--modal-border)',
        boxShadow: 'var(--modal-glow)',
        backdropFilter: 'blur(var(--blur-lg))',
        WebkitBackdropFilter: 'blur(var(--blur-lg))',
        transform: isClosing ? 'scale(0.95) translateY(10px)' : 'scale(1) translateY(0)',
        opacity: isClosing ? 0 : 1,
        animation: !isClosing ? 'modalFadeIn 0.3s ease-out' : 'none',
      }),
      [isClosing]
    );

    return (
      <div ref={ref} className={cn(modalSizes({ size }), className)} style={modalStyles}>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'var(--modal-glow-effect)',
          }}
        />
        {children}
      </div>
    );
  }
);

ModalContent.displayName = 'ModalContent';

// ========================================
// COMPOUND COMPONENT: HEADER
// ========================================

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('relative flex items-start justify-between mb-4 md:mb-5', className)}>
      {children}
    </div>
  );
};

// ========================================
// COMPOUND COMPONENT: BODY
// ========================================

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

const ModalBody: FC<ModalBodyProps> = ({ children, className }) => {
  return (
    <div className={cn('relative', className)} style={{ color: 'var(--text-secondary)' }}>
      {children}
    </div>
  );
};

// ========================================
// COMPOUND COMPONENT: FOOTER
// ========================================

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const ModalFooter: FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div className={cn('relative flex gap-3 mt-4 md:mt-5 justify-end', className)}>
      {children}
    </div>
  );
};

// ========================================
// COMPOUND COMPONENT: TITLE
// ========================================

interface ModalTitleProps {
  children: ReactNode;
  className?: string;
}

const ModalTitle: FC<ModalTitleProps> = ({ children, className }) => {
  return (
    <h3
      id="modal-title"
      className={cn('text-lg md:text-xl font-semibold', className)}
      style={{ color: 'var(--text-primary)' }}
    >
      {children}
    </h3>
  );
};

// ========================================
// COMPOUND COMPONENT: DESCRIPTION
// ========================================

interface ModalDescriptionProps {
  children: ReactNode;
  className?: string;
}

const ModalDescription: FC<ModalDescriptionProps> = ({ children, className }) => {
  return (
    <p
      id="modal-description"
      className={cn('text-sm md:text-base mt-1', className)}
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </p>
  );
};

// ========================================
// COMPOUND COMPONENT: CLOSE
// ========================================

interface ModalCloseProps {
  className?: string;
}

const ModalClose: FC<ModalCloseProps> = ({ className }) => {
  const { onClose } = useModalContext();
  const { isHovered, hoverProps } = useHover();
  const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });

  const closeButtonStyles: CSSProperties = useMemo(
    () => ({
      background: 'var(--modal-close-btn-bg)',
      border: 'var(--modal-close-btn-border)',
      color: 'var(--text-muted)',
      boxShadow: isFocusVisible
        ? 'var(--focus-glow)'
        : isHovered
          ? 'var(--modal-close-btn-hover-glow)'
          : 'none',
      outline: 'none',
    }),
    [isHovered, isFocusVisible]
  );

  return (
    <button
      onClick={onClose}
      onMouseEnter={hoverProps.onMouseEnter}
      onMouseLeave={hoverProps.onMouseLeave}
      onFocus={focusProps.onFocus}
      onBlur={focusProps.onBlur}
      className={cn(
        'p-1.5 md:p-2 rounded-xl transition-all duration-300',
        className
      )}
      style={closeButtonStyles}
      type="button"
      aria-label="Close modal"
    >
      <X className={ICON_SIZES.md} />
    </button>
  );
};

// ========================================
// EXPORT COMPOUND COMPONENT (v1.0.0+)
// ========================================

/**
 * ModalGlass - Compound Component API
 *
 * @example
 * ```tsx
 * <ModalGlass.Root open={open} onOpenChange={setOpen}>
 *   <ModalGlass.Overlay />
 *   <ModalGlass.Content>
 *     <ModalGlass.Header>
 *       <ModalGlass.Title>Confirm</ModalGlass.Title>
 *       <ModalGlass.Description>Are you sure?</ModalGlass.Description>
 *       <ModalGlass.Close />
 *     </ModalGlass.Header>
 *     <ModalGlass.Body>
 *       <p>Body content</p>
 *     </ModalGlass.Body>
 *     <ModalGlass.Footer>
 *       <ButtonGlass>Cancel</ButtonGlass>
 *     </ModalGlass.Footer>
 *   </ModalGlass.Content>
 * </ModalGlass.Root>
 * ```
 */
export const ModalGlass = {
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
};
