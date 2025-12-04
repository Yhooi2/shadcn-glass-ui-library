/**
 * Unit tests for InteractiveCard component
 *
 * Tests hover animations, glass effects, and interactivity.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InteractiveCard } from '../interactive-card';

// Mock useHover hook
vi.mock('@/lib/hooks/use-hover', () => ({
  useHover: ({ includeFocus }: { includeFocus?: boolean }) => ({
    isHovered: false,
    hoverProps: {
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      ...(includeFocus && {
        onFocus: vi.fn(),
        onBlur: vi.fn(),
      }),
    },
  }),
}));

describe('InteractiveCard', () => {
  it('should render children', () => {
    render(
      <InteractiveCard>
        <h3>Card Title</h3>
        <p>Card content</p>
      </InteractiveCard>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should apply default blur level', () => {
    const { container } = render(<InteractiveCard>Content</InteractiveCard>);

    const card = container.firstChild as HTMLElement;
    expect(card.style.backdropFilter).toBe('blur(var(--blur-sm))');
    expect(card.style.WebkitBackdropFilter).toBe('blur(var(--blur-sm))');
  });

  it('should apply custom blur level', () => {
    const { container } = render(
      <InteractiveCard blur="xl">Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.backdropFilter).toBe('blur(var(--blur-xl))');
  });

  it('should apply default base background', () => {
    const { container } = render(<InteractiveCard>Content</InteractiveCard>);

    const card = container.firstChild as HTMLElement;
    expect(card.style.background).toBe('var(--card-bg)');
  });

  it('should apply custom base background', () => {
    const { container } = render(
      <InteractiveCard baseBg="var(--metric-emerald-bg)">Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.background).toBe('var(--metric-emerald-bg)');
  });

  it('should apply default border color', () => {
    const { container } = render(<InteractiveCard>Content</InteractiveCard>);

    const card = container.firstChild as HTMLElement;
    expect(card.style.border).toBe('1px solid var(--card-border)');
  });

  it('should apply custom border color', () => {
    const { container } = render(
      <InteractiveCard borderColor="var(--custom-border)">Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.border).toBe('1px solid var(--custom-border)');
  });

  it('should apply default rounded class', () => {
    const { container } = render(<InteractiveCard>Content</InteractiveCard>);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-2xl');
  });

  it('should apply custom rounded class', () => {
    const { container } = render(
      <InteractiveCard rounded="rounded-3xl">Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-3xl');
  });

  it('should apply default transition', () => {
    const { container } = render(<InteractiveCard>Content</InteractiveCard>);

    const card = container.firstChild as HTMLElement;
    expect(card.style.transition).toContain('var(--transition-slow)');
  });

  it('should apply no glow when not hovered', () => {
    const { container } = render(
      <InteractiveCard hoverGlow="var(--glow-primary)">Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.boxShadow).toBe('none');
  });

  it('should apply no transform when not hovered', () => {
    const { container } = render(<InteractiveCard hoverLift>Content</InteractiveCard>);

    const card = container.firstChild as HTMLElement;
    expect(card.style.transform).toBe('translateY(0)');
  });

  it('should accept custom className', () => {
    const { container } = render(
      <InteractiveCard className="custom-card">Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-card');
  });

  it('should merge custom className with rounded class', () => {
    const { container } = render(
      <InteractiveCard className="p-6">Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-6');
    expect(card).toHaveClass('rounded-2xl');
  });

  it('should forward ref to card div', () => {
    const ref = { current: null };
    render(<InteractiveCard ref={ref}>Content</InteractiveCard>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through additional HTML attributes', () => {
    const { container } = render(
      <InteractiveCard data-testid="card" aria-label="Interactive card">
        Content
      </InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute('data-testid', 'card');
    expect(card).toHaveAttribute('aria-label', 'Interactive card');
  });

  it('should have correct displayName', () => {
    expect(InteractiveCard.displayName).toBe('InteractiveCard');
  });

  it('should accept custom inline styles', () => {
    const { container } = render(
      <InteractiveCard style={{ padding: '24px' }}>Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.padding).toBe('24px');
  });

  it('should merge custom styles with card styles', () => {
    const { container } = render(
      <InteractiveCard style={{ padding: '24px', color: 'red' }}>
        Content
      </InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.padding).toBe('24px');
    expect(card.style.color).toBe('red');
    expect(card.style.background).toBe('var(--card-bg)'); // default styles preserved
  });

  it('should support all blur levels', () => {
    const blurLevels: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

    blurLevels.forEach((blur) => {
      const { container } = render(
        <InteractiveCard blur={blur}>Content</InteractiveCard>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.style.backdropFilter).toBe(`blur(var(--blur-${blur}))`);
    });
  });

  it('should support all rounded variants', () => {
    const roundedVariants: Array<'rounded-xl' | 'rounded-2xl' | 'rounded-3xl'> = [
      'rounded-xl',
      'rounded-2xl',
      'rounded-3xl',
    ];

    roundedVariants.forEach((rounded) => {
      const { container } = render(
        <InteractiveCard rounded={rounded}>Content</InteractiveCard>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass(rounded);
    });
  });

  it('should not apply hover lift when hoverLift is false', () => {
    const { container } = render(
      <InteractiveCard hoverLift={false}>Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.transform).toBe('translateY(0)');
  });

  it('should apply webkit backdrop filter for Safari compatibility', () => {
    const { container } = render(<InteractiveCard>Content</InteractiveCard>);

    const card = container.firstChild as HTMLElement;
    expect(card.style.WebkitBackdropFilter).toBe('blur(var(--blur-sm))');
  });

  it('should render with disabled state', () => {
    const { container } = render(
      <InteractiveCard disabled>Content</InteractiveCard>
    );

    const card = container.firstChild as HTMLElement;
    expect(card.style.transform).toBe('translateY(0)');
  });

  it('should work with complex children structure', () => {
    render(
      <InteractiveCard>
        <div>
          <h3>Title</h3>
          <p>Description</p>
          <button>Action</button>
        </div>
      </InteractiveCard>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
