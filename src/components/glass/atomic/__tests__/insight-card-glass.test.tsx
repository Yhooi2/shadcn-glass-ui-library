import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InsightCardGlass } from '../insight-card-glass';

describe('InsightCardGlass', () => {
  describe('Rendering', () => {
    it('renders text content', () => {
      render(<InsightCardGlass text="Test insight" />);
      expect(screen.getByText('Test insight')).toBeInTheDocument();
    });

    it('renders detail when provided', () => {
      render(<InsightCardGlass text="Main" detail="Detail" />);
      expect(screen.getByText('Detail')).toBeInTheDocument();
    });

    it('renders default emoji for variant', () => {
      render(<InsightCardGlass text="Test" variant="highlight" />);
      expect(screen.getByText('✨')).toBeInTheDocument();
    });

    it('renders custom emoji', () => {
      render(<InsightCardGlass text="Test" emoji="🎯" />);
      expect(screen.getByText('🎯')).toBeInTheDocument();
    });
  });

  describe('Inline variant', () => {
    it('renders as span when inline', () => {
      const { container } = render(<InsightCardGlass text="Test" inline />);
      expect(container.querySelector('span')).toBeInTheDocument();
    });
  });

  describe('Clickable behavior', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<InsightCardGlass text="Click me" onClick={handleClick} />);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has role="button" when clickable', () => {
      render(<InsightCardGlass text="Test" onClick={() => {}} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles keyboard Enter', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<InsightCardGlass text="Test" onClick={handleClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Arrow indicator', () => {
    it('shows arrow when showArrow is true', () => {
      const { container } = render(<InsightCardGlass text="Test" showArrow />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref', () => {
      const ref = { current: null };
      render(<InsightCardGlass ref={ref} text="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
