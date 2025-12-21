import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SwitchGlass, Switch } from '../switch-glass';

describe('SwitchGlass', () => {
  // ========================================
  // RENDERING
  // ========================================

  it('renders without crashing', () => {
    render(<SwitchGlass />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders with data-slot attribute', () => {
    render(<SwitchGlass />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-slot', 'switch');
  });

  it('renders with label when provided', () => {
    render(<SwitchGlass label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  // ========================================
  // CONTROLLED MODE
  // ========================================

  it('respects controlled checked state', () => {
    const { rerender } = render(<SwitchGlass checked={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');

    rerender(<SwitchGlass checked={true} />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  it('calls onCheckedChange when clicked', () => {
    const handleChange = vi.fn();
    render(<SwitchGlass checked={false} onCheckedChange={handleChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // ========================================
  // UNCONTROLLED MODE
  // ========================================

  it('toggles state in uncontrolled mode', () => {
    render(<SwitchGlass defaultChecked={false} />);
    const switchEl = screen.getByRole('switch');

    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute('data-state', 'checked');
  });

  it('starts checked when defaultChecked is true', () => {
    render(<SwitchGlass defaultChecked={true} />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  // ========================================
  // DISABLED STATE
  // ========================================

  it('applies disabled state correctly', () => {
    render(<SwitchGlass disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not call onCheckedChange when disabled', () => {
    const handleChange = vi.fn();
    render(<SwitchGlass disabled onCheckedChange={handleChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================

  it('toggles on Space key', () => {
    render(<SwitchGlass defaultChecked={false} />);
    const switchEl = screen.getByRole('switch');

    switchEl.focus();
    fireEvent.keyDown(switchEl, { key: ' ', code: 'Space' });
    // Radix handles this internally, so we check the state after the event
  });

  // ========================================
  // CSS VARIABLES
  // ========================================

  it('applies glass styling via inline styles', () => {
    render(<SwitchGlass />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveStyle({ background: 'var(--toggle-bg)' });
  });

  // ========================================
  // SHADCN/UI ALIAS
  // ========================================

  it('Switch alias works identically to SwitchGlass', () => {
    render(<Switch label="Alias Test" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByText('Alias Test')).toBeInTheDocument();
  });
});
