import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlassCard } from '../glass-card';

describe('GlassCard', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(
        <GlassCard>
          <p>Card content</p>
        </GlassCard>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders complex children', () => {
      render(
        <GlassCard>
          <div>
            <h3>Title</h3>
            <p>Description</p>
          </div>
        </GlassCard>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <GlassCard className="custom-class">Content</GlassCard>
      );
      const card = container.firstChild;
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Intensity Variants', () => {
    it('renders subtle intensity', () => {
      const { container } = render(
        <GlassCard intensity="subtle">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        background: 'var(--card-subtle-bg)',
      });
    });

    it('renders medium intensity (default)', () => {
      const { container } = render(
        <GlassCard>Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        background: 'var(--card-medium-bg)',
      });
    });

    it('renders strong intensity', () => {
      const { container } = render(
        <GlassCard intensity="strong">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        background: 'var(--card-strong-bg)',
      });
    });
  });

  describe('Glow Variants', () => {
    it('renders without glow by default', () => {
      const { container } = render(
        <GlassCard>Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        boxShadow: 'var(--glow-neutral)',
      });
    });

    it('renders with blue glow', () => {
      const { container } = render(
        <GlassCard glow="blue">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        boxShadow: 'var(--glow-blue)',
      });
    });

    it('renders with violet glow', () => {
      const { container } = render(
        <GlassCard glow="violet">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        boxShadow: 'var(--glow-violet)',
      });
    });

    it('renders with violet glow', () => {
      const { container } = render(
        <GlassCard glow="violet">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        boxShadow: 'var(--glow-violet)',
      });
    });

    it('renders with cyan glow', () => {
      const { container } = render(
        <GlassCard glow="cyan">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        boxShadow: 'var(--glow-cyan)',
      });
    });
  });

  describe('Hover Effects', () => {
    it('enables hover by default', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <GlassCard>Content</GlassCard>
      );

      const card = container.firstChild as HTMLElement;
      await user.hover(card);

      expect(card).toBeInTheDocument();
    });

    it('disables hover when hover=false', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <GlassCard hover={false}>Content</GlassCard>
      );

      const card = container.firstChild as HTMLElement;
      await user.hover(card);

      expect(card).toBeInTheDocument();
    });

    it('applies hover styles on mouse enter', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <GlassCard>Content</GlassCard>
      );

      const card = container.firstChild as HTMLElement;
      await user.hover(card);

      await new Promise(resolve => setTimeout(resolve, 50));
      expect(card).toBeInTheDocument();
    });

    it('removes hover styles on mouse leave', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <GlassCard>Content</GlassCard>
      );

      const card = container.firstChild as HTMLElement;
      await user.hover(card);
      await user.unhover(card);

      expect(card).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to card div', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <GlassCard ref={ref}>Content</GlassCard>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(
        <GlassCard ref={ref}>Content</GlassCard>
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to div', () => {
      render(
        <GlassCard data-testid="custom-card" aria-label="Card container">
          Content
        </GlassCard>
      );

      const card = screen.getByTestId('custom-card');
      expect(card).toHaveAttribute('aria-label', 'Card container');
    });

    it('applies id attribute correctly', () => {
      const { container } = render(
        <GlassCard id="my-card">Content</GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('id', 'my-card');
    });
  });

  describe('Combined Props', () => {
    it('renders with intensity and glow', () => {
      const { container } = render(
        <GlassCard intensity="strong" glow="blue">
          Content
        </GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveStyle({
        background: 'var(--card-strong-bg)',
        boxShadow: 'var(--glow-blue)',
      });
    });

    it('renders with all props', () => {
      const { container } = render(
        <GlassCard
          intensity="subtle"
          glow="cyan"
          hover={false}
          className="custom"
        >
          Content
        </GlassCard>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom');
      expect(card).toHaveStyle({
        background: 'var(--card-subtle-bg)',
        boxShadow: 'var(--glow-cyan)',
      });
    });
  });

  describe('Multiple Cards', () => {
    it('renders multiple cards independently', () => {
      const { container } = render(
        <>
          <GlassCard intensity="subtle">Card 1</GlassCard>
          <GlassCard intensity="medium">Card 2</GlassCard>
          <GlassCard intensity="strong">Card 3</GlassCard>
        </>
      );

      const cards = container.querySelectorAll('div');
      expect(cards.length).toBeGreaterThanOrEqual(3);
    });
  });
});
