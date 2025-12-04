/**
 * useFocus Hook
 *
 * Manages focus state for form elements with keyboard navigation support.
 * Similar to useHover but for focus events.
 *
 * Implements proper :focus-visible behavior by tracking keyboard vs mouse interaction
 * at the document level, ensuring focus rings only appear for keyboard navigation.
 */

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type FocusEvent,
  type KeyboardEvent,
} from 'react';

// Global state to track whether the last user interaction was via keyboard
let hadKeyboardEvent = false;
let isInitialized = false;

/**
 * Initialize global keyboard/mouse tracking for focus-visible behavior.
 * This ensures focus rings only appear when navigating via keyboard (Tab key),
 * not when clicking with a mouse.
 */
function initializeKeyboardTracking() {
  if (isInitialized || typeof window === 'undefined') return;

  isInitialized = true;

  // Track keyboard events (Tab, Shift, Arrow keys, etc.)
  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    // Only consider keyboard navigation keys
    if (e.key === 'Tab' || e.key.startsWith('Arrow') || e.key === 'Enter' || e.key === ' ') {
      hadKeyboardEvent = true;
    }
  };

  // Track mouse/pointer events - clear keyboard flag
  const handlePointerDown = () => {
    hadKeyboardEvent = false;
  };

  // Use capture phase to detect events before they reach components
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('mousedown', handlePointerDown, true);
  document.addEventListener('pointerdown', handlePointerDown, true);
  document.addEventListener('touchstart', handlePointerDown, true);

  // Cleanup not needed - these are global listeners that persist for the app lifecycle
}

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

  // Initialize global keyboard tracking on mount (runs once per app)
  useEffect(() => {
    if (focusVisible) {
      initializeKeyboardTracking();
    }
  }, [focusVisible]);

  const setIsFocused = useCallback(
    (value: boolean) => {
      setIsFocusedState(value);
      focusRef.current = value;
      onFocusChange?.(value);
    },
    [onFocusChange]
  );

  const handleFocus = useCallback(
    () => {
      setIsFocused(true);

      if (focusVisible) {
        // Use global keyboard tracking state for accurate focus-visible detection
        const isKeyboardFocus = hadKeyboardEvent;
        setIsFocusVisible(isKeyboardFocus);
        hadKeyboardEventRef.current = isKeyboardFocus;
      }
    },
    [setIsFocused, focusVisible]
  );

  const handleBlur = useCallback(
    () => {
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
