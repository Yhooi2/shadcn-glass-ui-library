import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsive } from './use-responsive';

describe('useResponsive', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
  };

  const triggerResize = () => {
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
  };

  describe('Breakpoint detection', () => {
    it('should detect xs breakpoint (< 640px)', () => {
      setWindowWidth(500);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('xs');
      expect(result.current.isMobile).toBe(true);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(false);
      expect(result.current.width).toBe(500);
    });

    it('should detect sm breakpoint (640px - 767px)', () => {
      setWindowWidth(700);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('sm');
      expect(result.current.isMobile).toBe(true);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(false);
    });

    it('should detect md breakpoint (768px - 1023px)', () => {
      setWindowWidth(900);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('md');
      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(true);
      expect(result.current.isDesktop).toBe(false);
    });

    it('should detect lg breakpoint (1024px - 1279px)', () => {
      setWindowWidth(1100);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('lg');
      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(true);
    });

    it('should detect xl breakpoint (1280px - 1535px)', () => {
      setWindowWidth(1400);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('xl');
      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(true);
    });

    it('should detect 2xl breakpoint (>= 1536px)', () => {
      setWindowWidth(1600);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('2xl');
      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(true);
    });
  });

  describe('Device type flags', () => {
    it('should identify mobile devices (< 768px)', () => {
      setWindowWidth(767);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.isMobile).toBe(true);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(false);
    });

    it('should identify tablets (768px - 1023px)', () => {
      setWindowWidth(768);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(true);
      expect(result.current.isDesktop).toBe(false);

      setWindowWidth(1023);
      const { result: result2 } = renderHook(() => useResponsive());

      expect(result2.current.isMobile).toBe(false);
      expect(result2.current.isTablet).toBe(true);
      expect(result2.current.isDesktop).toBe(false);
    });

    it('should identify desktops (>= 1024px)', () => {
      setWindowWidth(1024);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(true);
    });
  });

  describe('Resize handling', () => {
    it('should update on window resize', () => {
      setWindowWidth(500);
      const { result } = renderHook(() => useResponsive());

      // Wait for useEffect to run
      triggerResize();

      expect(result.current.isMobile).toBe(true);
      expect(result.current.width).toBe(500);

      setWindowWidth(1200);
      triggerResize();

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isDesktop).toBe(true);
      expect(result.current.width).toBe(1200);
    });

    it('should update breakpoint on resize', () => {
      setWindowWidth(640);
      const { result } = renderHook(() => useResponsive());

      // useEffect runs immediately and sets the correct width
      expect(result.current.currentBreakpoint).toBe('sm');

      setWindowWidth(1000);
      triggerResize();

      expect(result.current.currentBreakpoint).toBe('md');

      setWindowWidth(1600);
      triggerResize();

      expect(result.current.currentBreakpoint).toBe('2xl');
    });
  });

  describe('Boundary values', () => {
    it('should handle exact breakpoint boundaries correctly', () => {
      // sm boundary (640px)
      setWindowWidth(640);
      const { result: smResult } = renderHook(() => useResponsive());
      expect(smResult.current.currentBreakpoint).toBe('sm');

      // md boundary (768px)
      setWindowWidth(768);
      const { result: mdResult } = renderHook(() => useResponsive());
      expect(mdResult.current.currentBreakpoint).toBe('md');
      expect(mdResult.current.isTablet).toBe(true);

      // lg boundary (1024px)
      setWindowWidth(1024);
      const { result: lgResult } = renderHook(() => useResponsive());
      expect(lgResult.current.currentBreakpoint).toBe('lg');
      expect(lgResult.current.isDesktop).toBe(true);

      // xl boundary (1280px)
      setWindowWidth(1280);
      const { result: xlResult } = renderHook(() => useResponsive());
      expect(xlResult.current.currentBreakpoint).toBe('xl');

      // 2xl boundary (1536px)
      setWindowWidth(1536);
      const { result: xxlResult } = renderHook(() => useResponsive());
      expect(xxlResult.current.currentBreakpoint).toBe('2xl');
    });

    it('should handle one pixel before breakpoint', () => {
      setWindowWidth(767);
      const { result } = renderHook(() => useResponsive());
      expect(result.current.isMobile).toBe(true);

      setWindowWidth(1023);
      const { result: result2 } = renderHook(() => useResponsive());
      expect(result2.current.isTablet).toBe(true);
      expect(result2.current.isDesktop).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should handle very small widths', () => {
      setWindowWidth(320);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('xs');
      expect(result.current.isMobile).toBe(true);
      expect(result.current.width).toBe(320);
    });

    it('should handle very large widths', () => {
      setWindowWidth(3000);
      const { result } = renderHook(() => useResponsive());

      expect(result.current.currentBreakpoint).toBe('2xl');
      expect(result.current.isDesktop).toBe(true);
      expect(result.current.width).toBe(3000);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useResponsive());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });
});
