/**
 * Unit tests for TouchTarget component
 *
 * Tests accessibility compliance for touch target sizing.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TouchTarget } from '../touch-target';

describe('TouchTarget', () => {
  it('should render children', () => {
    const { getByText } = render(
      <TouchTarget>
        <button>Click me</button>
      </TouchTarget>
    );

    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should apply default 44px minimum size', () => {
    const { container } = render(
      <TouchTarget>
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('min-h-11'); // 44px = 11 × 4px
    expect(wrapper).toHaveClass('min-w-11');
  });

  it('should apply 48px minimum size when specified', () => {
    const { container } = render(
      <TouchTarget minSize={48}>
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('min-h-12'); // 48px = 12 × 4px
    expect(wrapper).toHaveClass('min-w-12');
  });

  it('should center content by default', () => {
    const { container } = render(
      <TouchTarget>
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('items-center');
    expect(wrapper).toHaveClass('justify-center');
  });

  it('should not center content when center is false', () => {
    const { container } = render(
      <TouchTarget center={false}>
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).not.toHaveClass('flex');
    expect(wrapper).not.toHaveClass('items-center');
    expect(wrapper).not.toHaveClass('justify-center');
  });

  it('should accept custom className', () => {
    const { container } = render(
      <TouchTarget className="custom-class">
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should merge custom className with default classes', () => {
    const { container } = render(
      <TouchTarget className="bg-red-500">
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('bg-red-500');
    expect(wrapper).toHaveClass('min-h-11'); // default classes preserved
    expect(wrapper).toHaveClass('flex');
  });

  it('should forward ref to wrapper div', () => {
    const ref = { current: null };
    render(
      <TouchTarget ref={ref}>
        <button>×</button>
      </TouchTarget>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through additional HTML attributes', () => {
    const { container } = render(
      <TouchTarget data-testid="touch-target" aria-label="Touch area">
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-testid', 'touch-target');
    expect(wrapper).toHaveAttribute('aria-label', 'Touch area');
  });

  it('should have correct displayName', () => {
    expect(TouchTarget.displayName).toBe('TouchTarget');
  });

  it('should work with Apple HIG minimum (44px)', () => {
    const { container } = render(
      <TouchTarget minSize={44}>
        <button className="w-8 h-8">×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('min-h-11');
    expect(wrapper).toHaveClass('min-w-11');
  });

  it('should work with Material Design minimum (48px)', () => {
    const { container } = render(
      <TouchTarget minSize={48}>
        <button className="w-8 h-8">×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('min-h-12');
    expect(wrapper).toHaveClass('min-w-12');
  });

  it('should support custom alignment with center disabled', () => {
    const { container } = render(
      <TouchTarget center={false} className="justify-start items-start">
        <button>×</button>
      </TouchTarget>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('justify-start');
    expect(wrapper).toHaveClass('items-start');
    expect(wrapper).not.toHaveClass('justify-center');
  });

  it('should render complex children', () => {
    const { getByText, getByRole } = render(
      <TouchTarget>
        <button>
          <span>Click</span>
          <span>Me</span>
        </button>
      </TouchTarget>
    );

    expect(getByText('Click')).toBeInTheDocument();
    expect(getByText('Me')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should work with multiple children', () => {
    const { getByText } = render(
      <TouchTarget>
        <span>Icon</span>
        <span>Label</span>
      </TouchTarget>
    );

    expect(getByText('Icon')).toBeInTheDocument();
    expect(getByText('Label')).toBeInTheDocument();
  });
});
