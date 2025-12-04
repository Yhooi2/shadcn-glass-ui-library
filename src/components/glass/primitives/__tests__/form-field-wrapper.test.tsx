/**
 * Unit tests for FormFieldWrapper component
 *
 * Tests form field structure, validation messages, and accessibility.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormFieldWrapper } from '../form-field-wrapper';

describe('FormFieldWrapper', () => {
  it('should render children', () => {
    const { getByRole } = render(
      <FormFieldWrapper>
        <input type="text" />
      </FormFieldWrapper>
    );

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('should render label when provided', () => {
    render(
      <FormFieldWrapper label="Email">
        <input type="email" />
      </FormFieldWrapper>
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should not render label when not provided', () => {
    const { container } = render(
      <FormFieldWrapper>
        <input type="text" />
      </FormFieldWrapper>
    );

    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  it('should link label to input via htmlFor', () => {
    render(
      <FormFieldWrapper label="Username" htmlFor="username-input">
        <input id="username-input" type="text" />
      </FormFieldWrapper>
    );

    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username-input');
  });

  it('should show required asterisk when required is true', () => {
    render(
      <FormFieldWrapper label="Email" required>
        <input type="email" />
      </FormFieldWrapper>
    );

    const asterisk = screen.getByLabelText('required');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveTextContent('*');
  });

  it('should not show required asterisk when required is false', () => {
    render(
      <FormFieldWrapper label="Email" required={false}>
        <input type="email" />
      </FormFieldWrapper>
    );

    const asterisk = screen.queryByLabelText('required');
    expect(asterisk).toBeNull();
  });

  it('should display error message', () => {
    render(
      <FormFieldWrapper label="Username" error="Username is required">
        <input type="text" />
      </FormFieldWrapper>
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Username is required');
  });

  it('should display success message', () => {
    render(
      <FormFieldWrapper label="Username" success="Username available">
        <input type="text" />
      </FormFieldWrapper>
    );

    const success = screen.getByText('Username available');
    expect(success).toBeInTheDocument();
  });

  it('should prioritize error over success message', () => {
    render(
      <FormFieldWrapper
        label="Username"
        error="Username is taken"
        success="Username available"
      >
        <input type="text" />
      </FormFieldWrapper>
    );

    expect(screen.getByText('Username is taken')).toBeInTheDocument();
    expect(screen.queryByText('Username available')).toBeNull();
  });

  it('should have role="alert" on error message', () => {
    render(
      <FormFieldWrapper error="Error message">
        <input type="text" />
      </FormFieldWrapper>
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Error message');
  });

  it('should have aria-live="polite" on error message', () => {
    render(
      <FormFieldWrapper error="Error message">
        <input type="text" />
      </FormFieldWrapper>
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveAttribute('aria-live', 'polite');
  });

  it('should have aria-live="polite" on success message', () => {
    render(
      <FormFieldWrapper success="Success message">
        <input type="text" />
      </FormFieldWrapper>
    );

    const success = screen.getByText('Success message');
    expect(success).toHaveAttribute('aria-live', 'polite');
  });

  it('should forward ref to wrapper div', () => {
    const ref = { current: null };
    render(
      <FormFieldWrapper ref={ref}>
        <input type="text" />
      </FormFieldWrapper>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should accept custom className', () => {
    const { container } = render(
      <FormFieldWrapper className="custom-wrapper">
        <input type="text" />
      </FormFieldWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-wrapper');
  });

  it('should merge custom className with default classes', () => {
    const { container } = render(
      <FormFieldWrapper className="p-4">
        <input type="text" />
      </FormFieldWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('p-4');
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('flex-col');
  });

  it('should pass through additional HTML attributes', () => {
    const { container } = render(
      <FormFieldWrapper data-testid="field-wrapper" aria-label="Form field">
        <input type="text" />
      </FormFieldWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-testid', 'field-wrapper');
    expect(wrapper).toHaveAttribute('aria-label', 'Form field');
  });

  it('should have correct displayName', () => {
    expect(FormFieldWrapper.displayName).toBe('FormFieldWrapper');
  });

  it('should apply correct flex layout', () => {
    const { container } = render(
      <FormFieldWrapper>
        <input type="text" />
      </FormFieldWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('flex-col');
    expect(wrapper).toHaveClass('gap-1');
    expect(wrapper).toHaveClass('md:gap-1.5');
  });

  it('should render multiple children', () => {
    const { getByRole, getByText } = render(
      <FormFieldWrapper>
        <input type="text" />
        <span>Helper text</span>
      </FormFieldWrapper>
    );

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('Helper text')).toBeInTheDocument();
  });

  it('should work with complete form field', () => {
    render(
      <FormFieldWrapper
        label="Email"
        error="Invalid email"
        required
        htmlFor="email-input"
      >
        <input id="email-input" type="email" />
      </FormFieldWrapper>
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should not render required asterisk without label', () => {
    const { container } = render(
      <FormFieldWrapper required>
        <input type="text" />
      </FormFieldWrapper>
    );

    const asterisk = container.querySelector('[aria-label="required"]');
    expect(asterisk).toBeNull();
  });

  it('should handle empty error string', () => {
    render(
      <FormFieldWrapper error="">
        <input type="text" />
      </FormFieldWrapper>
    );

    const error = screen.queryByRole('alert');
    expect(error).toBeNull();
  });

  it('should not render success message when success is empty string', () => {
    const { container } = render(
      <FormFieldWrapper success="">
        <input type="text" />
      </FormFieldWrapper>
    );

    // Should not render success paragraph
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('should apply CSS custom properties for colors', () => {
    render(
      <FormFieldWrapper label="Test" error="Error" success="Success">
        <input type="text" />
      </FormFieldWrapper>
    );

    const label = screen.getByText('Test');
    expect(label).toHaveStyle({ color: 'var(--text-secondary)' });

    const error = screen.getByRole('alert');
    expect(error).toHaveStyle({ color: 'var(--alert-danger-text)' });
  });
});
