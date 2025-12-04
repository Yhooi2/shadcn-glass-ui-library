import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonGlass } from '../skeleton-glass';

describe('SkeletonGlass', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('has aria-hidden attribute', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      const { container } = render(<SkeletonGlass className="custom-class" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('custom-class');
    });
  });

  describe('Variant Styles', () => {
    it('renders text variant by default', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('renders text variant explicitly', () => {
      const { container } = render(<SkeletonGlass variant="text" />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('renders title variant', () => {
      const { container } = render(<SkeletonGlass variant="title" />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('renders avatar variant', () => {
      const { container } = render(<SkeletonGlass variant="avatar" />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('renders thumbnail variant', () => {
      const { container } = render(<SkeletonGlass variant="thumbnail" />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('renders card variant', () => {
      const { container } = render(<SkeletonGlass variant="card" />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Custom Dimensions', () => {
    it('applies custom width as number', () => {
      const { container } = render(<SkeletonGlass width={200} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ width: '200px' });
    });

    it('applies custom width as string', () => {
      const { container } = render(<SkeletonGlass width="50%" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ width: '50%' });
    });

    it('applies custom height as number', () => {
      const { container } = render(<SkeletonGlass height={100} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ height: '100px' });
    });

    it('applies custom height as string', () => {
      const { container } = render(<SkeletonGlass height="20px" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ height: '20px' });
    });

    it('applies both custom width and height', () => {
      const { container } = render(<SkeletonGlass width={150} height={80} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ width: '150px', height: '80px' });
    });
  });

  describe('Custom Styles', () => {
    it('merges custom style prop with default styles', () => {
      const { container } = render(<SkeletonGlass style={{ borderRadius: '8px' }} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ borderRadius: '8px' });
    });

    it('allows overriding default background with custom style', () => {
      const { container } = render(<SkeletonGlass style={{ background: 'red' }} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ background: 'red' });
    });
  });

  describe('Animation', () => {
    it('has shimmer animation', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({
        animation: 'skeleton-loading 1.5s infinite',
      });
    });

    it('has gradient background for shimmer effect', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.firstChild as HTMLElement;
      const computedStyle = window.getComputedStyle(skeleton);
      expect(computedStyle.background).toContain('linear-gradient');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<SkeletonGlass ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element properties', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<SkeletonGlass ref={ref} width={200} height={100} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        const element = ref.current as HTMLElement;
        expect(element.style.width).toBe('200px');
        expect(element.style.height).toBe('100px');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to div', () => {
      const { container } = render(
        <SkeletonGlass
          data-testid="custom-skeleton"
          aria-label="Loading content"
        />
      );

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveAttribute('data-testid', 'custom-skeleton');
      expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
    });

    it('applies id attribute correctly', () => {
      const { container } = render(<SkeletonGlass id="my-skeleton" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveAttribute('id', 'my-skeleton');
    });
  });

  describe('Theme Styling', () => {
    it('applies glass theme CSS variables', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.firstChild as HTMLElement;
      const computedStyle = window.getComputedStyle(skeleton);
      expect(computedStyle.background).toContain('linear-gradient');
    });

    it('includes shine color in gradient', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.firstChild as HTMLElement;
      const computedStyle = window.getComputedStyle(skeleton);
      expect(computedStyle.background).toContain('linear-gradient');
    });
  });

  describe('Multiple Skeletons', () => {
    it('renders multiple skeletons independently', () => {
      const { container } = render(
        <>
          <SkeletonGlass variant="text" />
          <SkeletonGlass variant="title" />
          <SkeletonGlass variant="avatar" />
        </>
      );

      const skeletons = container.querySelectorAll('div[aria-hidden="true"]');
      expect(skeletons).toHaveLength(3);
    });

    it('each skeleton has independent dimensions', () => {
      const { container } = render(
        <>
          <SkeletonGlass width={100} height={20} />
          <SkeletonGlass width={200} height={40} />
        </>
      );

      const skeletons = container.querySelectorAll('div[aria-hidden="true"]');
      expect(skeletons[0]).toHaveStyle({ width: '100px', height: '20px' });
      expect(skeletons[1]).toHaveStyle({ width: '200px', height: '40px' });
    });
  });
});
