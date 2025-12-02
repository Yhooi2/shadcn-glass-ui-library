/**
 * useHover Hook
 *
 * Replaces the repeated hover state pattern found in 13+ components:
 *
 * ```tsx
 * // BEFORE (duplicated in every component)
 * const [isHovered, setIsHovered] = useState(false);
 * <div
 *   onMouseEnter={() => setIsHovered(true)}
 *   onMouseLeave={() => setIsHovered(false)}
 * />
 *
 * // AFTER
 * const { isHovered, hoverProps } = useHover();
 * <div {...hoverProps} />
 * ```
 */

import { useState, useCallback, type MouseEvent, type FocusEvent } from 'react';

export interface UseHoverOptions {
  /** Delay before hover state becomes true (ms) */
  enterDelay?: number;
  /** Delay before hover state becomes false (ms) */
  leaveDelay?: number;
  /** Include focus events for accessibility */
  includeFocus?: boolean;
  /** Callback when hover state changes */
  onHoverChange?: (isHovered: boolean) => void;
}

export interface UseHoverReturn {
  /** Current hover state */
  isHovered: boolean;
  /** Props to spread on the target element */
  hoverProps: {
    onMouseEnter: (e: MouseEvent) => void;
    onMouseLeave: (e: MouseEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
  };
  /** Manually set hover state */
  setIsHovered: (value: boolean) => void;
}

/**
 * Hook for managing hover state with optional delays and focus support.
 *
 * @example
 * ```tsx
 * const { isHovered, hoverProps } = useHover();
 *
 * return (
 *   <div
 *     {...hoverProps}
 *     style={{ opacity: isHovered ? 1 : 0.8 }}
 *   >
 *     Hover me
 *   </div>
 * );
 * ```
 *
 * @example With options
 * ```tsx
 * const { isHovered, hoverProps } = useHover({
 *   enterDelay: 100,
 *   leaveDelay: 200,
 *   includeFocus: true,
 *   onHoverChange: (hover) => console.log('Hovered:', hover),
 * });
 * ```
 */
export function useHover(options: UseHoverOptions = {}): UseHoverReturn {
  const {
    enterDelay = 0,
    leaveDelay = 0,
    includeFocus = false,
    onHoverChange,
  } = options;

  const [isHovered, setIsHoveredState] = useState(false);
  const [enterTimeout, setEnterTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [leaveTimeout, setLeaveTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const setIsHovered = useCallback(
    (value: boolean) => {
      setIsHoveredState(value);
      onHoverChange?.(value);
    },
    [onHoverChange]
  );

  const handleMouseEnter = useCallback(
    () => {
      // Clear any pending leave timeout
      if (leaveTimeout) {
        clearTimeout(leaveTimeout);
        setLeaveTimeout(null);
      }

      if (enterDelay > 0) {
        const timeout = setTimeout(() => {
          setIsHovered(true);
        }, enterDelay);
        setEnterTimeout(timeout);
      } else {
        setIsHovered(true);
      }
    },
    [enterDelay, leaveTimeout, setIsHovered]
  );

  const handleMouseLeave = useCallback(
    () => {
      // Clear any pending enter timeout
      if (enterTimeout) {
        clearTimeout(enterTimeout);
        setEnterTimeout(null);
      }

      if (leaveDelay > 0) {
        const timeout = setTimeout(() => {
          setIsHovered(false);
        }, leaveDelay);
        setLeaveTimeout(timeout);
      } else {
        setIsHovered(false);
      }
    },
    [leaveDelay, enterTimeout, setIsHovered]
  );

  const handleFocus = useCallback(
    () => {
      if (includeFocus) {
        setIsHovered(true);
      }
    },
    [includeFocus, setIsHovered]
  );

  const handleBlur = useCallback(
    () => {
      if (includeFocus) {
        setIsHovered(false);
      }
    },
    [includeFocus, setIsHovered]
  );

  const hoverProps: UseHoverReturn['hoverProps'] = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...(includeFocus && {
      onFocus: handleFocus,
      onBlur: handleBlur,
    }),
  };

  return {
    isHovered,
    hoverProps,
    setIsHovered,
  };
}

export default useHover;
