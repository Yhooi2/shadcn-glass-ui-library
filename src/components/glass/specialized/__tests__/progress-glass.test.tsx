import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressGlass } from '../progress-glass';

describe('ProgressGlass', () => {
  describe('Rendering', () => {
    it('renders progress bar', () => {
      render(<ProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(<ProgressGlass value={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
      expect(progressbar).toHaveAttribute('aria-label', 'Progress: 75%');
    });

    it('applies custom className', () => {
      const { container } = render(<ProgressGlass value={50} className="custom-class" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Value Handling', () => {
    it('displays correct width for value', () => {
      const { container } = render(<ProgressGlass value={60} />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill).toHaveStyle({ width: '60%' });
    });

    it('clamps value at 100', () => {
      const { container } = render(<ProgressGlass value={150} />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill).toHaveStyle({ width: '100%' });
    });

    it('clamps value at 0', () => {
      const { container } = render(<ProgressGlass value={-10} />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill).toHaveStyle({ width: '0%' });
    });

    it('handles decimal values', () => {
      const { container } = render(<ProgressGlass value={45.7} />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill).toHaveStyle({ width: '45.7%' });
    });

    it('handles 0 value', () => {
      const { container } = render(<ProgressGlass value={0} />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill).toHaveStyle({ width: '0%' });
    });

    it('handles 100 value', () => {
      const { container } = render(<ProgressGlass value={100} />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill).toHaveStyle({ width: '100%' });
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<ProgressGlass value={50} size="sm" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<ProgressGlass value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<ProgressGlass value={50} size="lg" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Gradient Colors', () => {
    it('renders violet gradient by default', () => {
      const { container } = render(<ProgressGlass value={50} />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill.style.background).toContain('var(--metric-default-text)');
    });

    it('renders blue gradient', () => {
      const { container } = render(<ProgressGlass value={50} gradient="blue" />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill.style.background).toContain('var(--metric-default-text)');
    });

    it('renders cyan gradient', () => {
      const { container } = render(<ProgressGlass value={50} gradient="cyan" />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill.style.background).toContain('var(--metric-secondary-text)');
    });

    it('renders amber gradient', () => {
      const { container } = render(<ProgressGlass value={50} gradient="amber" />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill.style.background).toContain('var(--metric-warning-text)');
    });

    it('renders emerald gradient', () => {
      const { container } = render(<ProgressGlass value={50} gradient="emerald" />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill.style.background).toContain('var(--metric-success-text)');
    });

    it('renders rose gradient', () => {
      const { container } = render(<ProgressGlass value={50} gradient="rose" />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill.style.background).toContain('var(--metric-destructive-text)');
    });
  });

  describe('Label Display', () => {
    it('hides label by default', () => {
      render(<ProgressGlass value={50} />);
      expect(screen.queryByText('Progress')).not.toBeInTheDocument();
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('shows label when showLabel is true', () => {
      render(<ProgressGlass value={50} showLabel />);
      expect(screen.getByText('Progress')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('displays correct percentage in label', () => {
      render(<ProgressGlass value={75} showLabel />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('label updates with clamped value', () => {
      render(<ProgressGlass value={150} showLabel />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('label text has correct styling', () => {
      render(<ProgressGlass value={50} showLabel />);
      const progressLabel = screen.getByText('Progress');
      const percentageLabel = screen.getByText('50%');

      // Uses Tailwind classes instead of inline styles
      expect(progressLabel).toHaveClass('text-(--text-muted)');
      expect(percentageLabel).toHaveClass('text-(--text-secondary)');
    });
  });

  describe('Theme Styling', () => {
    it('applies track background CSS variable', () => {
      const { container } = render(<ProgressGlass value={50} />);
      const track = container.querySelector('.w-full > div') as HTMLElement;
      expect(track).toHaveStyle({
        background: 'var(--progress-bg)',
      });
    });

    it('applies glow effect to fill', () => {
      const { container } = render(<ProgressGlass value={50} gradient="violet" />);
      const fill = container.querySelector('[role="progressbar"]') as HTMLElement;
      expect(fill.style.boxShadow).toContain('var(--progress-glow-violet)');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to wrapper div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<ProgressGlass ref={ref} value={50} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<ProgressGlass ref={ref} value={50} />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to wrapper', () => {
      render(
        <ProgressGlass value={50} data-testid="custom-progress" aria-describedby="description" />
      );

      const wrapper = screen.getByTestId('custom-progress');
      expect(wrapper).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      const { container } = render(<ProgressGlass value={50} id="my-progress" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute('id', 'my-progress');
    });
  });

  describe('Animation', () => {
    it('fill has transition classes', () => {
      const { container } = render(<ProgressGlass value={50} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveClass('transition-all', 'duration-700', 'ease-out');
    });
  });

  describe('Multiple Progress Bars', () => {
    it('renders multiple progress bars independently', () => {
      const { container } = render(
        <>
          <ProgressGlass value={25} gradient="blue" />
          <ProgressGlass value={50} gradient="emerald" />
          <ProgressGlass value={75} gradient="rose" />
        </>
      );

      const progressbars = container.querySelectorAll('[role="progressbar"]');
      expect(progressbars).toHaveLength(3);
    });

    it('each progress bar has independent values', () => {
      const { container } = render(
        <>
          <ProgressGlass value={30} />
          <ProgressGlass value={60} />
        </>
      );

      const fills = container.querySelectorAll('[role="progressbar"]') as NodeListOf<HTMLElement>;
      expect(fills[0]).toHaveStyle({ width: '30%' });
      expect(fills[1]).toHaveStyle({ width: '60%' });
    });
  });
});
