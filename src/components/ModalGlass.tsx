// ========================================
// MODAL GLASS COMPONENT
// ========================================

import { useState, useEffect, useCallback, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const MODAL_ANIMATION_DURATION = 200;

const modalContentVariants = cva(
  [
    "glass-modal__content",
    "relative w-full rounded-3xl p-6",
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-4xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof modalContentVariants> {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly children: React.ReactNode;
}

/**
 * Lock body scroll
 */
const lockBodyScroll = (): void => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = "hidden";
};

/**
 * Unlock body scroll
 */
const unlockBodyScroll = (): void => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = "";
};

/**
 * Create a delay for animations
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const ModalGlass = forwardRef<HTMLDivElement, ModalGlassProps>(
  ({ isOpen, onClose, title, children, size = "md", className, ...props }, ref) => {
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const handleClose = useCallback(async (): Promise<void> => {
      setIsClosing(true);
      await delay(MODAL_ANIMATION_DURATION);
      setIsClosing(false);
      onClose();
    }, [onClose]);

    // Lock body scroll when modal is open
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

    // Close on Escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

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
          className={cn(
            "glass-modal__overlay",
            "absolute inset-0",
            isClosing && "glass-modal__overlay--closing"
          )}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Modal content */}
        <div
          ref={ref}
          className={cn(
            modalContentVariants({ size }),
            isClosing && "glass-modal__content--closing",
            className
          )}
        >
          {/* Glow effect */}
          <div className="glass-modal__glow absolute inset-0 rounded-3xl" />

          {/* Header */}
          <div className="relative flex items-center justify-between mb-5">
            <h3
              id="modal-title"
              className="glass-modal__title text-xl font-semibold"
            >
              {title}
            </h3>
            <button
              onClick={handleClose}
              className="glass-modal__close p-2 rounded-xl"
              type="button"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="glass-modal__body relative">{children}</div>
        </div>
      </div>
    );
  }
);

ModalGlass.displayName = "ModalGlass";
