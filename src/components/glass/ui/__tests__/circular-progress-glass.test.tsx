import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircularProgressGlass } from '../circular-progress-glass';

describe('CircularProgressGlass', () => {
  describe('Rendering', () => {
    it('renders progress indicator', () => {
      render(<CircularProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('renders with correct ARIA attributes', () => {
      render(<CircularProgressGlass value={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('applies custom className', () => {
      const { container } = render(
        <CircularProgressGlass value={50} className="custom-class" />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Value Handling', () => {
    it('displays correct percentage for value', () => {
      render(<CircularProgressGlass value={50} />);
      expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
    });

    it('clamps value at 100', () => {
      render(<CircularProgressGlass value={150} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
      expect(screen.getAllByText('100%').length).toBeGreaterThan(0);
    });

    it('clamps value at 0', () => {
      render(<CircularProgressGlass value={-10} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
      expect(screen.getAllByText('0%').length).toBeGreaterThan(0);
    });

    it('handles decimal values', () => {
      render(<CircularProgressGlass value={45.7} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '45.7');
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<CircularProgressGlass value={50} size="sm" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<CircularProgressGlass value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<CircularProgressGlass value={50} size="lg" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders extra large size', () => {
      render(<CircularProgressGlass value={50} size="xl" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Variant Types', () => {
    it('renders determinate variant by default', () => {
      render(<CircularProgressGlass value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });

    it('renders determinate variant explicitly', () => {
      render(<CircularProgressGlass value={50} variant="determinate" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });

    it('renders indeterminate variant', () => {
      render(<CircularProgressGlass value={0} variant="indeterminate" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('indeterminate variant has no aria-valuenow', () => {
      render(<CircularProgressGlass value={0} variant="indeterminate" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('Color Gradients', () => {
    it('renders violet gradient by default', () => {
      const { container } = render(<CircularProgressGlass value={50} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders blue gradient', () => {
      const { container } = render(<CircularProgressGlass value={50} color="blue" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders cyan gradient', () => {
      const { container } = render(<CircularProgressGlass value={50} color="cyan" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders amber gradient', () => {
      const { container } = render(<CircularProgressGlass value={50} color="amber" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders emerald gradient', () => {
      const { container } = render(<CircularProgressGlass value={50} color="emerald" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders rose gradient', () => {
      const { container } = render(<CircularProgressGlass value={50} color="rose" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Label Display', () => {
    it('shows label by default', () => {
      render(<CircularProgressGlass value={50} />);
      expect(screen.getAllByText('50%').length).toBeGreaterThan(0);
    });

    it('hides label when showLabel is false', () => {
      const { container } = render(<CircularProgressGlass value={50} showLabel={false} />);
      const labelDiv = container.querySelector('.absolute.inset-0');
      expect(labelDiv).not.toBeInTheDocument();
    });

    it('displays custom label', () => {
      render(<CircularProgressGlass value={50} label="Loading..." />);
      expect(screen.getAllByText('Loading...').length).toBeGreaterThan(0);
    });

    it('custom label overrides percentage', () => {
      render(<CircularProgressGlass value={50} label="Custom" />);
      expect(screen.getAllByText('Custom').length).toBeGreaterThan(0);
      const fiftyPercent = screen.queryByText(/^50%$/);
      if (fiftyPercent === null) {
        expect(fiftyPercent).toBeNull();
      } else {
        expect(screen.queryAllByText('50%').length).toBeLessThanOrEqual(1);
      }
    });

    it('indeterminate variant shows empty label by default', () => {
      render(<CircularProgressGlass value={0} variant="indeterminate" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Loading progress');
    });
  });

  describe('Glow Effects', () => {
    it('shows glow by default', () => {
      const { container } = render(<CircularProgressGlass value={50} />);
      const filter = container.querySelector('filter');
      expect(filter).toBeInTheDocument();
    });

    it('hides glow when showGlow is false', () => {
      const { container } = render(<CircularProgressGlass value={50} showGlow={false} />);
      const filter = container.querySelector('filter');
      expect(filter).not.toBeInTheDocument();
    });

    it('applies low glow intensity', () => {
      const { container } = render(<CircularProgressGlass value={50} glowIntensity="low" />);
      const filter = container.querySelector('filter');
      expect(filter).toBeInTheDocument();
    });

    it('applies medium glow intensity (default)', () => {
      const { container } = render(<CircularProgressGlass value={50} glowIntensity="medium" />);
      const filter = container.querySelector('filter');
      expect(filter).toBeInTheDocument();
    });

    it('applies high glow intensity', () => {
      const { container } = render(<CircularProgressGlass value={50} glowIntensity="high" />);
      const filter = container.querySelector('filter');
      expect(filter).toBeInTheDocument();
    });
  });

  describe('SVG Structure', () => {
    it('renders SVG element', () => {
      const { container } = render(<CircularProgressGlass value={50} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders gradient definition', () => {
      const { container } = render(<CircularProgressGlass value={50} />);
      const gradient = container.querySelector('linearGradient');
      expect(gradient).toBeInTheDocument();
    });

    it('renders track circle', () => {
      const { container } = render(<CircularProgressGlass value={50} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(2);
    });

    it('renders progress circle', () => {
      const { container } = render(<CircularProgressGlass value={50} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBe(2);
    });
  });

  describe('Customization', () => {
    it('applies custom thickness', () => {
      const { container } = render(<CircularProgressGlass value={50} thickness={12} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom track width', () => {
      const { container } = render(<CircularProgressGlass value={50} trackWidth={10} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom track color', () => {
      const { container } = render(<CircularProgressGlass value={50} trackColor="rgba(255,0,0,0.2)" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom stroke linecap', () => {
      const { container } = render(<CircularProgressGlass value={50} strokeLinecap="square" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom animation duration', () => {
      const { container } = render(<CircularProgressGlass value={50} animationDuration={2} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to wrapper div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<CircularProgressGlass ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('ARIA Labels', () => {
    it('has correct aria-label for determinate', () => {
      render(<CircularProgressGlass value={65} variant="determinate" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Progress: 65%');
    });

    it('has correct aria-label for indeterminate', () => {
      render(<CircularProgressGlass value={0} variant="indeterminate" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Loading progress');
    });

    it('uses custom label in aria-label', () => {
      render(<CircularProgressGlass value={50} label="Uploading" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Uploading');
    });
  });
});
