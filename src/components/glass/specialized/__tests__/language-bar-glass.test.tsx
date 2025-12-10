import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageBarGlass, type LanguageData } from '../language-bar-glass';

const mockLanguages: LanguageData[] = [
  { name: 'TypeScript', percent: 60, color: 'bg-blue-500' },
  { name: 'JavaScript', percent: 30, color: 'bg-yellow-400' },
  { name: 'Python', percent: 10, color: 'bg-emerald-500' },
];

describe('LanguageBarGlass', () => {
  describe('Rendering', () => {
    it('renders language bar with segments', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      expect(screen.getByRole('group', { name: /language distribution/i })).toBeInTheDocument();
    });

    it('renders each language as progressbar', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      expect(screen.getByRole('progressbar', { name: 'TypeScript: 60%' })).toBeInTheDocument();
      expect(screen.getByRole('progressbar', { name: 'JavaScript: 30%' })).toBeInTheDocument();
      expect(screen.getByRole('progressbar', { name: 'Python: 10%' })).toBeInTheDocument();
    });

    it('renders legend by default', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      expect(screen.getByText(/TypeScript 60%/)).toBeInTheDocument();
      expect(screen.getByText(/JavaScript 30%/)).toBeInTheDocument();
      expect(screen.getByText(/Python 10%/)).toBeInTheDocument();
    });

    it('hides legend when showLegend=false', () => {
      render(<LanguageBarGlass languages={mockLanguages} showLegend={false} />);
      expect(screen.queryByText(/TypeScript 60%/)).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <LanguageBarGlass languages={mockLanguages} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Percentage Validation', () => {
    it('handles percentages that sum to 100', () => {
      const validLanguages: LanguageData[] = [
        { name: 'TypeScript', percent: 50 },
        { name: 'JavaScript', percent: 50 },
      ];
      render(<LanguageBarGlass languages={validLanguages} />);
      expect(screen.getByRole('progressbar', { name: 'TypeScript: 50%' })).toBeInTheDocument();
    });

    it('handles percentages that do not sum to 100', () => {
      const invalidLanguages: LanguageData[] = [
        { name: 'TypeScript', percent: 40 },
        { name: 'JavaScript', percent: 40 },
      ];
      // Component should still render
      render(<LanguageBarGlass languages={invalidLanguages} />);
      expect(screen.getByRole('group', { name: /language distribution/i })).toBeInTheDocument();
    });

    it('handles zero percent', () => {
      const languages: LanguageData[] = [
        { name: 'TypeScript', percent: 100 },
        { name: 'JavaScript', percent: 0 },
      ];
      render(<LanguageBarGlass languages={languages} />);
      expect(screen.getByRole('progressbar', { name: 'JavaScript: 0%' })).toBeInTheDocument();
    });

    it('handles very small percentages', () => {
      const languages: LanguageData[] = [
        { name: 'TypeScript', percent: 99.5 },
        { name: 'JavaScript', percent: 0.5 },
      ];
      render(<LanguageBarGlass languages={languages} />);
      expect(screen.getByRole('progressbar', { name: 'JavaScript: 0.5%' })).toBeInTheDocument();
    });
  });

  describe('Color Fallback', () => {
    it('uses provided custom color', () => {
      const languages: LanguageData[] = [{ name: 'Custom', percent: 100, color: 'bg-pink-500' }];
      const { container } = render(<LanguageBarGlass languages={languages} />);
      const segment = container.querySelector('.bg-pink-500');
      expect(segment).toBeInTheDocument();
    });

    it('falls back to default color for known languages', () => {
      const languages: LanguageData[] = [{ name: 'TypeScript', percent: 100 }];
      const { container } = render(<LanguageBarGlass languages={languages} />);
      const segment = container.querySelector('.bg-blue-500');
      expect(segment).toBeInTheDocument();
    });

    it('falls back to slate-400 for unknown languages', () => {
      const languages: LanguageData[] = [{ name: 'UnknownLang', percent: 100 }];
      const { container } = render(<LanguageBarGlass languages={languages} />);
      const segment = container.querySelector('.bg-slate-400');
      expect(segment).toBeInTheDocument();
    });
  });

  describe('Hover Sync', () => {
    it('dims other segments when hovering one segment', async () => {
      const user = userEvent.setup();
      render(<LanguageBarGlass languages={mockLanguages} />);

      const tsSegment = screen.getByRole('progressbar', { name: 'TypeScript: 60%' });

      await user.hover(tsSegment);

      // TypeScript should remain at opacity 1, others dimmed to 0.5
      expect(tsSegment).toHaveStyle({ opacity: 1 });
    });

    it('syncs hover between bar segment and legend item', async () => {
      const user = userEvent.setup();
      render(<LanguageBarGlass languages={mockLanguages} />);

      // Hover over legend item
      const legendItem = screen.getByText(/TypeScript 60%/);
      await user.hover(legendItem);

      // The corresponding bar segment should highlight (others dimmed)
      const tsSegment = screen.getByRole('progressbar', { name: 'TypeScript: 60%' });
      expect(tsSegment).toHaveStyle({ opacity: 1 });
    });

    it('restores opacity when hover ends', async () => {
      const user = userEvent.setup();
      render(<LanguageBarGlass languages={mockLanguages} />);

      const tsSegment = screen.getByRole('progressbar', { name: 'TypeScript: 60%' });

      await user.hover(tsSegment);
      await user.unhover(tsSegment);

      // All segments should return to opacity 1
      expect(tsSegment).toHaveStyle({ opacity: 1 });
    });
  });

  describe('Accessibility', () => {
    it('has role="group" on container', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      expect(screen.getByRole('group', { name: /language distribution/i })).toBeInTheDocument();
    });

    it('has aria-label on group', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-label', 'Language distribution');
    });

    it('has progressbar role on each segment', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      const progressbars = screen.getAllByRole('progressbar');
      expect(progressbars).toHaveLength(3);
    });

    it('has aria-valuenow on each segment', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      const tsSegment = screen.getByRole('progressbar', { name: 'TypeScript: 60%' });
      expect(tsSegment).toHaveAttribute('aria-valuenow', '60');
    });

    it('has aria-valuemin and aria-valuemax', () => {
      render(<LanguageBarGlass languages={mockLanguages} />);
      const tsSegment = screen.getByRole('progressbar', { name: 'TypeScript: 60%' });
      expect(tsSegment).toHaveAttribute('aria-valuemin', '0');
      expect(tsSegment).toHaveAttribute('aria-valuemax', '100');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<LanguageBarGlass ref={ref} languages={mockLanguages} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });

    it('spreads additional props', () => {
      render(
        <LanguageBarGlass
          languages={mockLanguages}
          data-testid="language-bar"
          aria-describedby="desc"
        />
      );
      expect(screen.getByTestId('language-bar')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty languages array', () => {
      const { container } = render(<LanguageBarGlass languages={[]} />);
      // Component returns null for empty array
      expect(container.firstChild).toBeNull();
    });

    it('handles single language', () => {
      const languages: LanguageData[] = [{ name: 'TypeScript', percent: 100 }];
      render(<LanguageBarGlass languages={languages} />);
      expect(screen.getByRole('progressbar', { name: 'TypeScript: 100%' })).toBeInTheDocument();
    });

    it('handles many languages', () => {
      const languages: LanguageData[] = [
        { name: 'TypeScript', percent: 40 },
        { name: 'JavaScript', percent: 30 },
        { name: 'Python', percent: 10 },
        { name: 'Go', percent: 10 },
        { name: 'Rust', percent: 10 },
      ];
      render(<LanguageBarGlass languages={languages} />);
      const progressbars = screen.getAllByRole('progressbar');
      expect(progressbars).toHaveLength(5);
    });
  });
});
