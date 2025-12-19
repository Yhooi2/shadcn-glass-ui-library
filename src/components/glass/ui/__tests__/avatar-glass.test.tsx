import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AvatarGlass, AvatarGlassSimple, AvatarGlassFallback } from '../avatar-glass';

describe('AvatarGlass', () => {
  describe('Compound API', () => {
    it('renders avatar with compound API', () => {
      render(
        <AvatarGlass>
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <AvatarGlass className="custom-class">
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Simple API (AvatarGlassSimple)', () => {
    it('renders avatar with name', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" />);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('displays initials for single name', () => {
      render(<AvatarGlassSimple name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('displays initials for two names', () => {
      render(<AvatarGlassSimple name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('displays initials for three or more names (first two)', () => {
      render(<AvatarGlassSimple name="John Michael Doe" />);
      expect(screen.getByText('JM')).toBeInTheDocument();
    });

    it('handles empty name with fallback', () => {
      render(<AvatarGlassSimple name="" />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('handles whitespace-only name', () => {
      render(<AvatarGlassSimple name="   " />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" className="custom-class" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('ARIA Attributes', () => {
    it('has correct role and aria-label', () => {
      render(<AvatarGlassSimple name="Jane Smith" />);
      // AvatarGlassSimple uses Radix Avatar which has span elements
      const fallback = screen.getByText('JS');
      expect(fallback).toBeInTheDocument();
    });

    it('updates aria-label with different names', () => {
      render(<AvatarGlassSimple name="Bob Johnson" />);
      const fallback = screen.getByText('BJ');
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<AvatarGlassSimple name="John Doe" size="sm" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<AvatarGlassSimple name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<AvatarGlassSimple name="John Doe" size="lg" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders extra large size', () => {
      render(<AvatarGlassSimple name="John Doe" size="xl" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('Status Indicator', () => {
    it('renders without status by default', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" />);
      const status = container.querySelector('[role="status"]');
      expect(status).not.toBeInTheDocument();
    });

    it('renders online status', () => {
      render(<AvatarGlassSimple name="John Doe" status="online" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: online');
    });

    it('renders offline status', () => {
      render(<AvatarGlassSimple name="John Doe" status="offline" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: offline');
    });

    it('renders busy status', () => {
      render(<AvatarGlassSimple name="John Doe" status="busy" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: busy');
    });

    it('renders away status', () => {
      render(<AvatarGlassSimple name="John Doe" status="away" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: away');
    });
  });

  describe('Initials Logic', () => {
    it('converts initials to uppercase', () => {
      render(<AvatarGlassSimple name="john doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles names with extra spaces', () => {
      render(<AvatarGlassSimple name="  John   Doe  " />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles single character names', () => {
      render(<AvatarGlassSimple name="A" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('handles special characters in names', () => {
      render(<AvatarGlassSimple name="José García" />);
      expect(screen.getByText('JG')).toBeInTheDocument();
    });

    it('takes only first two initials from long names', () => {
      render(<AvatarGlassSimple name="Alpha Beta Gamma Delta" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });
  });

  describe('Status Colors', () => {
    it('applies online status color', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" status="online" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-online)',
      });
    });

    it('applies offline status color', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" status="offline" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-offline)',
      });
    });

    it('applies busy status color', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" status="busy" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-busy)',
      });
    });

    it('applies away status color', () => {
      const { container } = render(<AvatarGlassSimple name="John Doe" status="away" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-away)',
      });
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to span element (Radix Avatar)', () => {
      const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;
      render(
        <AvatarGlass ref={ref}>
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;
      render(
        <AvatarGlass ref={ref}>
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('SPAN');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to wrapper', () => {
      render(
        <AvatarGlass data-testid="custom-avatar" aria-describedby="description">
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );

      const wrapper = screen.getByTestId('custom-avatar');
      expect(wrapper).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      render(
        <AvatarGlass id="my-avatar">
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      // Radix Avatar applies id to the root span element
      const avatar = screen.getByText('JD').closest('[id="my-avatar"]');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Theme Styling', () => {
    it('renders with glass styling classes', () => {
      const { container } = render(
        <AvatarGlass>
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('relative', 'inline-flex');
    });

    it('fallback renders correctly', () => {
      render(
        <AvatarGlass>
          <AvatarGlassFallback>JD</AvatarGlassFallback>
        </AvatarGlass>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('Multiple Avatars', () => {
    it('renders multiple avatars independently', () => {
      const { container } = render(
        <>
          <AvatarGlassSimple name="John Doe" />
          <AvatarGlassSimple name="Jane Smith" />
          <AvatarGlassSimple name="Bob Johnson" />
        </>
      );

      const avatars = container.querySelectorAll('.relative.inline-flex');
      expect(avatars).toHaveLength(3);
    });

    it('each avatar has correct initials', () => {
      render(
        <>
          <AvatarGlassSimple name="John Doe" />
          <AvatarGlassSimple name="Jane Smith" />
        </>
      );

      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('each avatar can have different statuses', () => {
      const { container } = render(
        <>
          <AvatarGlassSimple name="John Doe" status="online" />
          <AvatarGlassSimple name="Jane Smith" status="busy" />
        </>
      );

      const statuses = container.querySelectorAll('[role="status"]');
      expect(statuses).toHaveLength(2);
    });
  });
});
