import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Mock ResizeObserver for Radix UI components (Popover, Dropdown, etc.)
// Use globalThis for compatibility with both jsdom (global) and browser (window) test environments
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Mock scrollIntoView for cmdk/Command components
if (typeof Element.prototype.scrollIntoView === 'undefined') {
  Element.prototype.scrollIntoView = function () {};
}

// Cleanup after each test to prevent state leaking between tests
afterEach(() => {
  cleanup();
});
