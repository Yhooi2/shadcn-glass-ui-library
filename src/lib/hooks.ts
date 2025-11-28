// ========================================
// CUSTOM HOOKS FOR GLASS THEME COMPONENTS
// ========================================

import { useState, useEffect, useCallback, useRef, type RefObject } from 'react';

// ========================================
// useHover Hook
// ========================================

/**
 * Hook to track hover state of an element
 * @returns Tuple of [ref, isHovered]
 */
export const useHover = <T extends HTMLElement = HTMLElement>(): [
  RefObject<T | null>,
  boolean
] => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = (): void => setIsHovered(true);
    const handleMouseLeave = (): void => setIsHovered(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, isHovered];
};

// ========================================
// useClickOutside Hook
// ========================================

/**
 * Hook to detect clicks outside of an element
 * @param callback - Function to call when click outside occurs
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  callback: () => void
): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callback]);

  return ref;
};

// ========================================
// useEscapeKey Hook
// ========================================

/**
 * Hook to handle Escape key press
 * @param callback - Function to call when Escape is pressed
 * @param isActive - Whether the hook is active
 */
export const useEscapeKey = (callback: () => void, isActive = true): void => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [callback, isActive]);
};

// ========================================
// useLockBodyScroll Hook
// ========================================

/**
 * Hook to lock body scroll when component is mounted
 * @param lock - Whether to lock the scroll
 */
export const useLockBodyScroll = (lock = true): void => {
  useEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
};

// ========================================
// useDebounce Hook
// ========================================

/**
 * Hook to debounce a value
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// ========================================
// useMediaQuery Hook
// ========================================

/**
 * Hook to track media query matches
 * @param query - Media query string
 * @returns Boolean indicating if query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    // Sync initial state in listener callback
    listener({ matches: media.matches } as MediaQueryListEvent);

    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

// ========================================
// usePrefersReducedMotion Hook
// ========================================

/**
 * Hook to detect if user prefers reduced motion
 * @returns Boolean indicating preference
 */
export const usePrefersReducedMotion = (): boolean => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

// ========================================
// useToggle Hook
// ========================================

/**
 * Hook to toggle a boolean value
 * @param initialValue - Initial boolean value
 * @returns Tuple of [value, toggle, setValue]
 */
export const useToggle = (
  initialValue = false
): [boolean, () => void, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
};

// ========================================
// useTimeout Hook
// ========================================

/**
 * Hook to set a timeout
 * @param callback - Function to call after timeout
 * @param delay - Delay in milliseconds (null to clear)
 */
export const useTimeout = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
};

// ========================================
// useInterval Hook
// ========================================

/**
 * Hook to set an interval
 * @param callback - Function to call on each interval
 * @param delay - Delay in milliseconds (null to clear)
 */
export const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};

// ========================================
// usePrevious Hook
// ========================================

/**
 * Hook to get previous value
 * @param value - Current value
 * @returns Previous value
 */
export const usePrevious = <T,>(value: T): T | undefined => {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
};

// ========================================
// useIsMounted Hook
// ========================================

/**
 * Hook to check if component is mounted
 * @returns Function that returns mount status
 */
export const useIsMounted = (): (() => boolean) => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
};

// ========================================
// useWindowSize Hook
// ========================================

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Hook to track window size
 * @returns Object with width and height
 */
export const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = (): void => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

// ========================================
// useFocusTrap Hook
// ========================================

/**
 * Hook to trap focus within an element (useful for modals)
 * @param isActive - Whether the focus trap is active
 */
export const useFocusTrap = <T extends HTMLElement = HTMLElement>(
  isActive = true
): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return ref;
};

// ========================================
// useLocalStorage Hook
// ========================================

/**
 * Hook to persist state in localStorage
 * @param key - Storage key
 * @param initialValue - Initial value
 * @returns Tuple of [value, setValue]
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue];
};
