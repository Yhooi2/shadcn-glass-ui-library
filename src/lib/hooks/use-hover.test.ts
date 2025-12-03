import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHover } from './use-hover';

describe('useHover', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('should initialize with isHovered as false', () => {
      const { result } = renderHook(() => useHover());
      expect(result.current.isHovered).toBe(false);
    });

    it('should set isHovered to true on mouse enter', () => {
      const { result } = renderHook(() => useHover());

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      expect(result.current.isHovered).toBe(true);
    });

    it('should set isHovered to false on mouse leave', () => {
      const { result } = renderHook(() => useHover());

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      expect(result.current.isHovered).toBe(true);

      act(() => {
        result.current.hoverProps.onMouseLeave({} as React.MouseEvent);
      });

      expect(result.current.isHovered).toBe(false);
    });

    it('should manually set hover state', () => {
      const { result } = renderHook(() => useHover());

      act(() => {
        result.current.setIsHovered(true);
      });

      expect(result.current.isHovered).toBe(true);

      act(() => {
        result.current.setIsHovered(false);
      });

      expect(result.current.isHovered).toBe(false);
    });
  });

  describe('Enter delay', () => {
    it('should delay hover state with enterDelay', () => {
      const { result } = renderHook(() => useHover({ enterDelay: 200 }));

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      expect(result.current.isHovered).toBe(false);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.isHovered).toBe(false);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.isHovered).toBe(true);
    });

    it('should cancel enter delay on mouse leave', () => {
      const { result } = renderHook(() => useHover({ enterDelay: 200 }));

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      act(() => {
        result.current.hoverProps.onMouseLeave({} as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(result.current.isHovered).toBe(false);
    });
  });

  describe('Leave delay', () => {
    it('should delay unhover with leaveDelay', () => {
      const { result } = renderHook(() => useHover({ leaveDelay: 200 }));

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      expect(result.current.isHovered).toBe(true);

      act(() => {
        result.current.hoverProps.onMouseLeave({} as React.MouseEvent);
      });

      expect(result.current.isHovered).toBe(true);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.isHovered).toBe(true);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.isHovered).toBe(false);
    });

    it('should cancel leave delay on mouse enter', () => {
      const { result } = renderHook(() => useHover({ leaveDelay: 200 }));

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      act(() => {
        result.current.hoverProps.onMouseLeave({} as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(result.current.isHovered).toBe(true);
    });
  });

  describe('Focus support', () => {
    it('should not include focus props by default', () => {
      const { result } = renderHook(() => useHover());
      expect(result.current.hoverProps.onFocus).toBeUndefined();
      expect(result.current.hoverProps.onBlur).toBeUndefined();
    });

    it('should include focus props when includeFocus is true', () => {
      const { result } = renderHook(() => useHover({ includeFocus: true }));
      expect(result.current.hoverProps.onFocus).toBeDefined();
      expect(result.current.hoverProps.onBlur).toBeDefined();
    });

    it('should set isHovered on focus when includeFocus is true', () => {
      const { result } = renderHook(() => useHover({ includeFocus: true }));

      act(() => {
        result.current.hoverProps.onFocus?.({} as React.FocusEvent);
      });

      expect(result.current.isHovered).toBe(true);
    });

    it('should set isHovered to false on blur when includeFocus is true', () => {
      const { result } = renderHook(() => useHover({ includeFocus: true }));

      act(() => {
        result.current.hoverProps.onFocus?.({} as React.FocusEvent);
      });

      expect(result.current.isHovered).toBe(true);

      act(() => {
        result.current.hoverProps.onBlur?.({} as React.FocusEvent);
      });

      expect(result.current.isHovered).toBe(false);
    });
  });

  describe('Callback', () => {
    it('should call onHoverChange when hover state changes', () => {
      const onHoverChange = vi.fn();
      const { result } = renderHook(() => useHover({ onHoverChange }));

      act(() => {
        result.current.hoverProps.onMouseEnter({} as React.MouseEvent);
      });

      expect(onHoverChange).toHaveBeenCalledWith(true);

      act(() => {
        result.current.hoverProps.onMouseLeave({} as React.MouseEvent);
      });

      expect(onHoverChange).toHaveBeenCalledWith(false);
      expect(onHoverChange).toHaveBeenCalledTimes(2);
    });

    it('should call onHoverChange when manually setting state', () => {
      const onHoverChange = vi.fn();
      const { result } = renderHook(() => useHover({ onHoverChange }));

      act(() => {
        result.current.setIsHovered(true);
      });

      expect(onHoverChange).toHaveBeenCalledWith(true);
    });
  });
});
