import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  SelectGlass,
  SelectGlassTrigger,
  SelectGlassValue,
  SelectGlassContent,
  SelectGlassItem,
  SelectGlassGroup,
  SelectGlassLabel,
  SelectGlassSeparator,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../select-glass';

// Helper to render a basic select
const renderSelect = (props = {}) => {
  return render(
    <SelectGlass {...props}>
      <SelectGlassTrigger>
        <SelectGlassValue placeholder="Select an option" />
      </SelectGlassTrigger>
      <SelectGlassContent>
        <SelectGlassItem value="option1">Option 1</SelectGlassItem>
        <SelectGlassItem value="option2">Option 2</SelectGlassItem>
        <SelectGlassItem value="option3">Option 3</SelectGlassItem>
      </SelectGlassContent>
    </SelectGlass>
  );
};

describe('SelectGlass', () => {
  // ========================================
  // RENDERING
  // ========================================

  it('renders trigger without crashing', () => {
    renderSelect();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with data-slot attribute on trigger', () => {
    renderSelect();
    expect(screen.getByRole('combobox')).toHaveAttribute('data-slot', 'select-trigger');
  });

  it('displays placeholder text', () => {
    renderSelect();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  // ========================================
  // OPENING/CLOSING
  // ========================================

  it('opens content when trigger is clicked', async () => {
    renderSelect();
    const trigger = screen.getByRole('combobox');

    fireEvent.click(trigger);

    // Wait for content to appear
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });

  it('shows options when opened', async () => {
    renderSelect();
    fireEvent.click(screen.getByRole('combobox'));

    expect(await screen.findByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  // ========================================
  // SELECTION
  // ========================================

  it('calls onValueChange when option is selected', async () => {
    const handleChange = vi.fn();
    renderSelect({ onValueChange: handleChange });

    fireEvent.click(screen.getByRole('combobox'));
    const option = await screen.findByText('Option 1');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('option1');
  });

  it('displays selected value', async () => {
    render(
      <SelectGlass defaultValue="option2">
        <SelectGlassTrigger>
          <SelectGlassValue />
        </SelectGlassTrigger>
        <SelectGlassContent>
          <SelectGlassItem value="option1">Option 1</SelectGlassItem>
          <SelectGlassItem value="option2">Option 2</SelectGlassItem>
        </SelectGlassContent>
      </SelectGlass>
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  // ========================================
  // DISABLED STATE
  // ========================================

  it('applies disabled state correctly', () => {
    renderSelect({ disabled: true });
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  // ========================================
  // GROUPS AND LABELS
  // ========================================

  it('renders groups with labels', async () => {
    render(
      <SelectGlass>
        <SelectGlassTrigger>
          <SelectGlassValue placeholder="Select" />
        </SelectGlassTrigger>
        <SelectGlassContent>
          <SelectGlassGroup>
            <SelectGlassLabel>Group 1</SelectGlassLabel>
            <SelectGlassItem value="a">Item A</SelectGlassItem>
          </SelectGlassGroup>
          <SelectGlassSeparator />
          <SelectGlassGroup>
            <SelectGlassLabel>Group 2</SelectGlassLabel>
            <SelectGlassItem value="b">Item B</SelectGlassItem>
          </SelectGlassGroup>
        </SelectGlassContent>
      </SelectGlass>
    );

    fireEvent.click(screen.getByRole('combobox'));

    expect(await screen.findByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });

  // ========================================
  // CSS VARIABLES
  // ========================================

  it('applies glass styling via inline styles', () => {
    renderSelect();
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveStyle({ background: 'var(--input-bg)' });
  });

  // ========================================
  // SHADCN/UI ALIAS
  // ========================================

  it('shadcn/ui aliases work identically', async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Alias test" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test Option</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Alias test')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('combobox'));
    expect(await screen.findByText('Test Option')).toBeInTheDocument();
  });
});
