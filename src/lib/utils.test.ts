import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('text-white', 'bg-black');
      expect(result).toBe('text-white bg-black');
    });

    it('should handle conditional classes', () => {
      const shouldBeHidden = false;
      const shouldBeVisible = true;
      const result = cn('base-class', shouldBeHidden && 'hidden', shouldBeVisible && 'visible');
      expect(result).toBe('base-class visible');
    });

    it('should merge Tailwind classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toBe('py-1 px-4');
    });

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'end');
      expect(result).toBe('base end');
    });
  });
});
