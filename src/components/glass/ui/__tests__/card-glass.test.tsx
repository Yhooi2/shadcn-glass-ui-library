import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  CardGlass,
  CardGlassRoot,
  CardGlassHeader,
  CardGlassTitle,
  CardGlassDescription,
  CardGlassAction,
  CardGlassContent,
  CardGlassFooter,
} from '../card-glass';

describe('CardGlass', () => {
  describe('CardGlass.Root', () => {
    it('renders with default props', () => {
      render(<CardGlass.Root data-testid="card">Content</CardGlass.Root>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('data-slot', 'card');
    });

    it('applies custom className', () => {
      render(
        <CardGlass.Root data-testid="card" className="custom-class">
          Content
        </CardGlass.Root>
      );
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });

    it('applies intensity styles', () => {
      const { rerender } = render(
        <CardGlass.Root data-testid="card" intensity="subtle">
          Content
        </CardGlass.Root>
      );
      let card = screen.getByTestId('card');
      expect(card).toHaveStyle({ background: 'var(--card-subtle-bg)' });

      rerender(
        <CardGlass.Root data-testid="card" intensity="strong">
          Content
        </CardGlass.Root>
      );
      card = screen.getByTestId('card');
      expect(card).toHaveStyle({ background: 'var(--card-strong-bg)' });
    });

    it('applies glow effect', () => {
      render(
        <CardGlass.Root data-testid="card" glow="blue">
          Content
        </CardGlass.Root>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveStyle({ boxShadow: 'var(--glow-blue)' });
    });

    it('applies hover styles when hover is true', () => {
      render(
        <CardGlass.Root data-testid="card" hover>
          Content
        </CardGlass.Root>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('cursor-pointer');
    });

    it('does not apply hover styles when hover is false', () => {
      render(
        <CardGlass.Root data-testid="card" hover={false}>
          Content
        </CardGlass.Root>
      );
      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('CardGlass.Header', () => {
    it('renders with data-slot attribute', () => {
      render(<CardGlass.Header data-testid="header">Header</CardGlass.Header>);
      const header = screen.getByTestId('header');
      expect(header).toHaveAttribute('data-slot', 'card-header');
    });

    it('applies custom className', () => {
      render(
        <CardGlass.Header data-testid="header" className="custom-class">
          Header
        </CardGlass.Header>
      );
      expect(screen.getByTestId('header')).toHaveClass('custom-class');
    });
  });

  describe('CardGlass.Title', () => {
    it('renders with data-slot attribute', () => {
      render(<CardGlass.Title data-testid="title">Title</CardGlass.Title>);
      const title = screen.getByTestId('title');
      expect(title).toHaveAttribute('data-slot', 'card-title');
    });

    it('renders children correctly', () => {
      render(<CardGlass.Title>My Card Title</CardGlass.Title>);
      expect(screen.getByText('My Card Title')).toBeInTheDocument();
    });
  });

  describe('CardGlass.Description', () => {
    it('renders with data-slot attribute', () => {
      render(<CardGlass.Description data-testid="desc">Description</CardGlass.Description>);
      const desc = screen.getByTestId('desc');
      expect(desc).toHaveAttribute('data-slot', 'card-description');
    });
  });

  describe('CardGlass.Action', () => {
    it('renders with data-slot attribute', () => {
      render(<CardGlass.Action data-testid="action">Action</CardGlass.Action>);
      const action = screen.getByTestId('action');
      expect(action).toHaveAttribute('data-slot', 'card-action');
    });

    it('has correct positioning classes', () => {
      render(<CardGlass.Action data-testid="action">Action</CardGlass.Action>);
      const action = screen.getByTestId('action');
      expect(action).toHaveClass('col-start-2', 'row-span-2');
    });
  });

  describe('CardGlass.Content', () => {
    it('renders with data-slot attribute', () => {
      render(<CardGlass.Content data-testid="content">Content</CardGlass.Content>);
      const content = screen.getByTestId('content');
      expect(content).toHaveAttribute('data-slot', 'card-content');
    });
  });

  describe('CardGlass.Footer', () => {
    it('renders with data-slot attribute', () => {
      render(<CardGlass.Footer data-testid="footer">Footer</CardGlass.Footer>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveAttribute('data-slot', 'card-footer');
    });

    it('has flex layout', () => {
      render(<CardGlass.Footer data-testid="footer">Footer</CardGlass.Footer>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('flex', 'items-center');
    });
  });

  describe('Named Exports', () => {
    it('exports all sub-components individually', () => {
      expect(CardGlassRoot).toBeDefined();
      expect(CardGlassHeader).toBeDefined();
      expect(CardGlassTitle).toBeDefined();
      expect(CardGlassDescription).toBeDefined();
      expect(CardGlassAction).toBeDefined();
      expect(CardGlassContent).toBeDefined();
      expect(CardGlassFooter).toBeDefined();
    });

    it('named exports work correctly', () => {
      render(
        <CardGlassRoot data-testid="card">
          <CardGlassHeader data-testid="header">
            <CardGlassTitle data-testid="title">Title</CardGlassTitle>
            <CardGlassDescription data-testid="desc">Description</CardGlassDescription>
          </CardGlassHeader>
          <CardGlassContent data-testid="content">Content</CardGlassContent>
          <CardGlassFooter data-testid="footer">Footer</CardGlassFooter>
        </CardGlassRoot>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('desc')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Full Composition', () => {
    it('renders complete card structure', () => {
      render(
        <CardGlass.Root data-testid="card" intensity="medium" glow="blue">
          <CardGlass.Header>
            <CardGlass.Title>Card Title</CardGlass.Title>
            <CardGlass.Description>Card description text</CardGlass.Description>
            <CardGlass.Action>
              <button>Action</button>
            </CardGlass.Action>
          </CardGlass.Header>
          <CardGlass.Content>
            <p>Main content area</p>
          </CardGlass.Content>
          <CardGlass.Footer>
            <button>Cancel</button>
            <button>Save</button>
          </CardGlass.Footer>
        </CardGlass.Root>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card description text')).toBeInTheDocument();
      expect(screen.getByText('Main content area')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });
});
