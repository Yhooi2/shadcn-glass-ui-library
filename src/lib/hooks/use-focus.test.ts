import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFocus } from './use-focus';

describe('useFocus', () => {
  describe('Basic functionality', () => {
    it('should initialize with isFocused as false', () => {
      const { result } = renderHook(() => useFocus());
      expect(result.current.isFocused).toBe(false);
      expect(result.current.isFocusVisible).toBe(false);
    });

    it('should set isFocused to true on focus', () => {
      const { result } = renderHook(() => useFocus());

      act(() => {
        result.current.focusProps.onFocus({} as React.FocusEvent);
      });

      expect(result.current.isFocused).toBe(true);
    });

    it('should set isFocused to false on blur', () => {
      const { result } = renderHook(() => useFocus());

      act(() => {
        result.current.focusProps.onFocus({} as React.FocusEvent);
      });

      expect(result.current.isFocused).toBe(true);

      act(() => {
        result.current.focusProps.onBlur({} as React.FocusEvent);
      });

      expect(result.current.isFocused).toBe(false);
    });

    it('should manually set focus state', () => {
      const { result } = renderHook(() => useFocus());

      act(() => {
        result.current.setIsFocused(true);
      });

      expect(result.current.isFocused).toBe(true);
      expect(result.current.focusRef.current).toBe(true);

      act(() => {
        result.current.setIsFocused(false);
      });

      expect(result.current.isFocused).toBe(false);
      expect(result.current.focusRef.current).toBe(false);
    });
  });

  describe('Focus-visible support', () => {
    it('should not track focus-visible by default', () => {
      const { result } = renderHook(() => useFocus());

      act(() => {
        result.current.focusProps.onFocus({} as React.FocusEvent);
      });

      expect(result.current.isFocused).toBe(true);
      expect(result.current.isFocusVisible).toBe(false);
    });

    it('should track keyboard focus when focusVisible is true', () => {
      const onKeyDown = vi.fn();
      const { result } = renderHook(() => useFocus({ focusVisible: true, onKeyDown }));

      // Simulate global keyboard event (Tab key) to set hadKeyboardEvent flag
      act(() => {
        const keyEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
        document.dispatchEvent(keyEvent);
      });

      // Then focus
      act(() => {
        result.current.focusProps.onFocus({} as React.FocusEvent);
      });

      expect(result.current.isFocused).toBe(true);
      expect(result.current.isFocusVisible).toBe(true);
    });

    it('should not set focus-visible without keyboard event', () => {
      const { result } = renderHook(() => useFocus({ focusVisible: true }));

      // Simulate mouse event to clear keyboard flag
      act(() => {
        const mouseEvent = new MouseEvent('mousedown', { bubbles: true });
        document.dispatchEvent(mouseEvent);
      });

      act(() => {
        result.current.focusProps.onFocus({} as React.FocusEvent);
      });

      expect(result.current.isFocused).toBe(true);
      expect(result.current.isFocusVisible).toBe(false);
    });

    it('should reset focus-visible on blur', () => {
      const onKeyDown = vi.fn();
      const { result } = renderHook(() => useFocus({ focusVisible: true, onKeyDown }));

      act(() => {
        // Simulate global keyboard event first
        const keyEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
        document.dispatchEvent(keyEvent);
        result.current.focusProps.onFocus({} as React.FocusEvent);
      });

      expect(result.current.isFocusVisible).toBe(true);

      act(() => {
        result.current.focusProps.onBlur({} as React.FocusEvent);
      });

      expect(result.current.isFocusVisible).toBe(false);
    });
  });

  describe('Keyboard events', () => {
    it('should not include onKeyDown by default', () => {
      const { result } = renderHook(() => useFocus());
      expect(result.current.focusProps.onKeyDown).toBeUndefined();
    });

    it('should include onKeyDown when callback provided', () => {
      const onKeyDown = vi.fn();
      const { result } = renderHook(() => useFocus({ onKeyDown }));
      expect(result.current.focusProps.onKeyDown).toBeDefined();
    });

    it('should call onKeyDown callback', () => {
      const onKeyDown = vi.fn();
      const { result } = renderHook(() => useFocus({ onKeyDown }));

      const event = {} as React.KeyboardEvent;
      act(() => {
        result.current.focusProps.onKeyDown?.(event);
      });

      expect(onKeyDown).toHaveBeenCalledWith(event);
    });
  });

  describe('Callbacks', () => {
    it('should call onFocusChange when focus state changes', () => {
      const onFocusChange = vi.fn();
      const { result } = renderHook(() => useFocus({ onFocusChange }));

      act(() => {
        result.current.focusProps.onFocus({} as React.FocusEvent);
      });

      expect(onFocusChange).toHaveBeenCalledWith(true);

      act(() => {
        result.current.focusProps.onBlur({} as React.FocusEvent);
      });

      expect(onFocusChange).toHaveBeenCalledWith(false);
      expect(onFocusChange).toHaveBeenCalledTimes(2);
    });

    it('should call onFocusChange when manually setting state', () => {
      const onFocusChange = vi.fn();
      const { result } = renderHook(() => useFocus({ onFocusChange }));

      act(() => {
        result.current.setIsFocused(true);
      });

      expect(onFocusChange).toHaveBeenCalledWith(true);
    });
  });

  describe('focusRef', () => {
    it('should update focusRef when focus state changes', () => {
      const { result } = renderHook(() => useFocus());

      expect(result.current.focusRef.current).toBe(false);

      act(() => {
        result.current.setIsFocused(true);
      });

      expect(result.current.focusRef.current).toBe(true);

      act(() => {
        result.current.setIsFocused(false);
      });

      expect(result.current.focusRef.current).toBe(false);
    });
  });
});
