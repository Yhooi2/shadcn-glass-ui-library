import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollAreaGlass } from '../scroll-area-glass';

describe('ScrollAreaGlass', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(
        <ScrollAreaGlass>
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <ScrollAreaGlass>
          <div>Test content</div>
        </ScrollAreaGlass>
      );
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ScrollAreaGlass className="custom-class h-[300px]">
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('h-[300px]');
    });

    it('has correct data-slot attribute', () => {
      const { container } = render(
        <ScrollAreaGlass>
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toHaveAttribute('data-slot', 'scroll-area-glass');
    });
  });

  describe('Viewport', () => {
    it('renders viewport with correct data-slot', () => {
      const { container } = render(
        <ScrollAreaGlass>
          <div>Content</div>
        </ScrollAreaGlass>
      );
      const viewport = container.querySelector('[data-slot="scroll-area-viewport-glass"]');
      expect(viewport).toBeInTheDocument();
    });

    it('viewport contains children', () => {
      const { container } = render(
        <ScrollAreaGlass>
          <div data-testid="child">Content</div>
        </ScrollAreaGlass>
      );
      const viewport = container.querySelector('[data-slot="scroll-area-viewport-glass"]');
      expect(viewport).toContainElement(screen.getByTestId('child'));
    });
  });

  describe('Styling', () => {
    it('has overflow-hidden class', () => {
      const { container } = render(
        <ScrollAreaGlass>
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toHaveClass('overflow-hidden');
    });

    it('has relative positioning', () => {
      const { container } = render(
        <ScrollAreaGlass>
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toHaveClass('relative');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the root element', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <ScrollAreaGlass ref={ref}>
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Orientation prop', () => {
    it('accepts vertical orientation', () => {
      const { container } = render(
        <ScrollAreaGlass orientation="vertical">
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('accepts horizontal orientation', () => {
      const { container } = render(
        <ScrollAreaGlass orientation="horizontal">
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('accepts both orientation', () => {
      const { container } = render(
        <ScrollAreaGlass orientation="both">
          <div>Content</div>
        </ScrollAreaGlass>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

// Note: Scrollbar rendering and styling tests are covered by visual regression tests
// because Radix UI ScrollArea requires browser layout calculations to render scrollbars.
// See: src/components/__visual__/scroll-area-glass.visual.test.tsx
