/**
 * useFocus Hook
 *
 * Manages focus state for form elements with keyboard navigation support.
 * Similar to useHover but for focus events.
 */

import { useState, useCallback, useRef, type FocusEvent, type KeyboardEvent } from 'react';

export interface UseFocusOptions {
  /** Callback when focus state changes */
  onFocusChange?: (isFocused: boolean) => void;
  /** Include focus-visible behavior (keyboard focus only) */
  focusVisible?: boolean;
  /** Callback for keyboard events while focused */
  onKeyDown?: (e: KeyboardEvent) => void;
}

export interface UseFocusReturn {
  /** Current focus state */
  isFocused: boolean;
  /** True only when focused via keyboard (if focusVisible enabled) */
  isFocusVisible: boolean;
  /** Props to spread on the target element */
  focusProps: {
    onFocus: (e: FocusEvent) => void;
    onBlur: (e: FocusEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
  };
  /** Manually set focus state */
  setIsFocused: (value: boolean) => void;
  /** Reference to track if last focus was from keyboard */
  focusRef: React.RefObject<boolean>;
}

/**
 * Hook for managing focus state with optional focus-visible support.
 *
 * @example Basic usage
 * ```tsx
 * const { isFocused, focusProps } = useFocus();
 *
 * return (
 *   <input
 *     {...focusProps}
 *     style={{
 *       borderColor: isFocused ? 'violet' : 'gray',
 *     }}
 *   />
 * );
 * ```
 *
 * @example Focus-visible for keyboard navigation
 * ```tsx
 * const { isFocusVisible, focusProps } = useFocus({ focusVisible: true });
 *
 * return (
 *   <button
 *     {...focusProps}
 *     style={{
 *       outline: isFocusVisible ? '2px solid violet' : 'none',
 *     }}
 *   >
 *     Click or Tab to me
 *   </button>
 * );
 * ```
 */
export function useFocus(options: UseFocusOptions = {}): UseFocusReturn {
  const { onFocusChange, focusVisible = false, onKeyDown } = options;

  const [isFocused, setIsFocusedState] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const hadKeyboardEventRef = useRef(false);
  const focusRef = useRef(false);

  // TODO: Implement global event listeners in useEffect for full focus-visible support
  // Currently focusVisible works via handleKeyDown which updates hadKeyboardEventRef

  const setIsFocused = useCallback(
    (value: boolean) => {
      setIsFocusedState(value);
      focusRef.current = value;
      onFocusChange?.(value);
    },
    [onFocusChange]
  );

  const handleFocus = useCallback(
    (_e: FocusEvent) => {
      setIsFocused(true);

      if (focusVisible) {
        // Determine if this focus was from keyboard
        const isKeyboardFocus = hadKeyboardEventRef.current;
        setIsFocusVisible(isKeyboardFocus);
      }
    },
    [setIsFocused, focusVisible]
  );

  const handleBlur = useCallback(
    (_e: FocusEvent) => {
      setIsFocused(false);
      setIsFocusVisible(false);
    },
    [setIsFocused]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      hadKeyboardEventRef.current = true;
      onKeyDown?.(e);
    },
    [onKeyDown]
  );

  const focusProps: UseFocusReturn['focusProps'] = {
    onFocus: handleFocus,
    onBlur: handleBlur,
    ...(onKeyDown && { onKeyDown: handleKeyDown }),
  };

  return {
    isFocused,
    isFocusVisible,
    focusProps,
    setIsFocused,
    focusRef,
  };
}

export default useFocus;
