import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Star } from 'lucide-react';
import { StatItemGlass } from '../stat-item-glass';

describe('StatItemGlass', () => {
  describe('Rendering', () => {
    it('renders icon, value, and label', () => {
      const { container } = render(
        <StatItemGlass icon={Star} value={42} label="stars" />
      );
      expect(screen.getByText(/42 stars/)).toBeInTheDocument();
      expect(container.querySelector('.lucide-star')).toBeInTheDocument();
    });

    it('renders string value', () => {
      render(<StatItemGlass icon={Star} value="N/A" label="stars" />);
      expect(screen.getByText(/N\/A stars/)).toBeInTheDocument();
    });

    it('renders numeric value', () => {
      render(<StatItemGlass icon={Star} value={1234} label="stars" />);
      expect(screen.getByText(/1234 stars/)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <StatItemGlass icon={Star} value={42} label="stars" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Number Abbreviation', () => {
    it('shows full number when abbreviated=false', () => {
      render(<StatItemGlass icon={Star} value={1234} label="stars" />);
      expect(screen.getByText(/1234 stars/)).toBeInTheDocument();
    });

    it('abbreviates thousands to k when abbreviated=true', () => {
      render(<StatItemGlass icon={Star} value={1234} label="stars" abbreviated />);
      expect(screen.getByText(/1.2k stars/)).toBeInTheDocument();
    });

    it('abbreviates millions to M when abbreviated=true', () => {
      render(<StatItemGlass icon={Star} value={1500000} label="stars" abbreviated />);
      expect(screen.getByText(/1.5M stars/)).toBeInTheDocument();
    });

    it('shows exact number below 1000', () => {
      render(<StatItemGlass icon={Star} value={999} label="stars" abbreviated />);
      expect(screen.getByText(/999 stars/)).toBeInTheDocument();
    });

    it('handles exactly 1000', () => {
      render(<StatItemGlass icon={Star} value={1000} label="stars" abbreviated />);
      expect(screen.getByText(/1.0k stars/)).toBeInTheDocument();
    });

    it('handles exactly 1 million', () => {
      render(<StatItemGlass icon={Star} value={1000000} label="stars" abbreviated />);
      expect(screen.getByText(/1.0M stars/)).toBeInTheDocument();
    });

    it('formats with 1 decimal place for k', () => {
      render(<StatItemGlass icon={Star} value={5678} label="stars" abbreviated />);
      expect(screen.getByText(/5.7k stars/)).toBeInTheDocument();
    });

    it('formats with 1 decimal place for M', () => {
      render(<StatItemGlass icon={Star} value={2340000} label="stars" abbreviated />);
      expect(screen.getByText(/2.3M stars/)).toBeInTheDocument();
    });

    it('does not abbreviate string values', () => {
      render(<StatItemGlass icon={Star} value="1234" label="stars" abbreviated />);
      expect(screen.getByText(/1234 stars/)).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('applies sm size', () => {
      const { container } = render(
        <StatItemGlass icon={Star} value={42} label="stars" size="sm" />
      );
      expect(container.firstChild).toHaveClass('text-xs');
    });

    it('applies md size (default)', () => {
      const { container } = render(
        <StatItemGlass icon={Star} value={42} label="stars" />
      );
      expect(container.firstChild).toHaveClass('text-sm');
    });

    it('applies lg size', () => {
      const { container } = render(
        <StatItemGlass icon={Star} value={42} label="stars" size="lg" />
      );
      expect(container.firstChild).toHaveClass('text-base');
    });
  });

  describe('Layout Variants', () => {
    it('applies horizontal layout (default)', () => {
      const { container } = render(
        <StatItemGlass icon={Star} value={42} label="stars" />
      );
      expect(container.firstChild).toHaveClass('flex-row');
    });

    it('applies vertical layout', () => {
      const { container } = render(
        <StatItemGlass icon={Star} value={42} label="stars" layout="vertical" />
      );
      expect(container.firstChild).toHaveClass('flex-col');
      expect(container.firstChild).toHaveClass('items-start');
    });
  });

  describe('Icon Size', () => {
    it('uses default icon size 16', () => {
      render(<StatItemGlass icon={Star} value={42} label="stars" />);
      // Icon is rendered with size prop
      expect(screen.getByText(/42 stars/)).toBeInTheDocument();
    });

    it('applies custom icon size', () => {
      render(<StatItemGlass icon={Star} value={42} label="stars" iconSize={24} />);
      expect(screen.getByText(/42 stars/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<StatItemGlass ref={ref} icon={Star} value={42} label="stars" />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
    });

    it('spreads additional props', () => {
      render(
        <StatItemGlass
          icon={Star}
          value={42}
          label="stars"
          data-testid="stat-item"
          aria-label="Star count"
        />
      );
      expect(screen.getByTestId('stat-item')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero value', () => {
      render(<StatItemGlass icon={Star} value={0} label="stars" />);
      expect(screen.getByText(/0 stars/)).toBeInTheDocument();
    });

    it('handles negative value', () => {
      render(<StatItemGlass icon={Star} value={-5} label="stars" />);
      expect(screen.getByText(/-5 stars/)).toBeInTheDocument();
    });

    it('handles very large numbers', () => {
      render(<StatItemGlass icon={Star} value={999999999} label="stars" abbreviated />);
      expect(screen.getByText(/1000.0M stars/)).toBeInTheDocument();
    });

    it('handles empty string value', () => {
      render(<StatItemGlass icon={Star} value="" label="stars" />);
      expect(screen.getByText(/stars/)).toBeInTheDocument();
    });

    it('handles long label text', () => {
      render(
        <StatItemGlass
          icon={Star}
          value={42}
          label="very long label that might wrap"
        />
      );
      expect(screen.getByText(/42 very long label that might wrap/)).toBeInTheDocument();
    });
  });
});
