import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AvatarGlass } from '../avatar-glass';

describe('AvatarGlass', () => {
  describe('Rendering', () => {
    it('renders avatar with name', () => {
      render(<AvatarGlass name="John Doe" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toBeInTheDocument();
    });

    it('displays initials for single name', () => {
      render(<AvatarGlass name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('displays initials for two names', () => {
      render(<AvatarGlass name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('displays initials for three or more names (first two)', () => {
      render(<AvatarGlass name="John Michael Doe" />);
      expect(screen.getByText('JM')).toBeInTheDocument();
    });

    it('handles empty name with fallback', () => {
      render(<AvatarGlass name="" />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('handles whitespace-only name', () => {
      render(<AvatarGlass name="   " />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<AvatarGlass name="John Doe" className="custom-class" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('ARIA Attributes', () => {
    it('has correct role and aria-label', () => {
      render(<AvatarGlass name="Jane Smith" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('aria-label', 'Avatar for Jane Smith');
    });

    it('updates aria-label with different names', () => {
      render(<AvatarGlass name="Bob Johnson" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('aria-label', 'Avatar for Bob Johnson');
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<AvatarGlass name="John Doe" size="sm" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      render(<AvatarGlass name="John Doe" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<AvatarGlass name="John Doe" size="lg" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toBeInTheDocument();
    });

    it('renders extra large size', () => {
      render(<AvatarGlass name="John Doe" size="xl" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Status Indicator', () => {
    it('renders without status by default', () => {
      const { container } = render(<AvatarGlass name="John Doe" />);
      const status = container.querySelector('[role="status"]');
      expect(status).not.toBeInTheDocument();
    });

    it('renders online status', () => {
      render(<AvatarGlass name="John Doe" status="online" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: online');
    });

    it('renders offline status', () => {
      render(<AvatarGlass name="John Doe" status="offline" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: offline');
    });

    it('renders busy status', () => {
      render(<AvatarGlass name="John Doe" status="busy" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: busy');
    });

    it('renders away status', () => {
      render(<AvatarGlass name="John Doe" status="away" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-label', 'Status: away');
    });
  });

  describe('Initials Logic', () => {
    it('converts initials to uppercase', () => {
      render(<AvatarGlass name="john doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles names with extra spaces', () => {
      render(<AvatarGlass name="  John   Doe  " />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles single character names', () => {
      render(<AvatarGlass name="A" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('handles special characters in names', () => {
      render(<AvatarGlass name="José García" />);
      expect(screen.getByText('JG')).toBeInTheDocument();
    });

    it('takes only first two initials from long names', () => {
      render(<AvatarGlass name="Alpha Beta Gamma Delta" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });
  });

  describe('Status Colors', () => {
    it('applies online status color', () => {
      const { container } = render(<AvatarGlass name="John Doe" status="online" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-online)',
      });
    });

    it('applies offline status color', () => {
      const { container } = render(<AvatarGlass name="John Doe" status="offline" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-offline)',
      });
    });

    it('applies busy status color', () => {
      const { container } = render(<AvatarGlass name="John Doe" status="busy" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-busy)',
      });
    });

    it('applies away status color', () => {
      const { container } = render(<AvatarGlass name="John Doe" status="away" />);
      const status = container.querySelector('[role="status"]') as HTMLElement;
      expect(status).toHaveStyle({
        background: 'var(--status-away)',
      });
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to wrapper div element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<AvatarGlass ref={ref} name="John Doe" />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows ref to access element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<AvatarGlass ref={ref} name="John Doe" />);

      expect(ref.current).not.toBeNull();
      if (ref.current) {
        expect((ref.current as HTMLElement).tagName).toBe('DIV');
      }
    });
  });

  describe('Additional Props', () => {
    it('passes additional HTML attributes to wrapper', () => {
      render(
        <AvatarGlass
          name="John Doe"
          data-testid="custom-avatar"
          aria-describedby="description"
        />
      );

      const wrapper = screen.getByTestId('custom-avatar');
      expect(wrapper).toHaveAttribute('aria-describedby', 'description');
    });

    it('applies id attribute correctly', () => {
      const { container } = render(<AvatarGlass name="John Doe" id="my-avatar" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute('id', 'my-avatar');
    });
  });

  describe('Theme Styling', () => {
    it('applies avatar CSS variables', () => {
      render(<AvatarGlass name="John Doe" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveStyle({
        background: 'var(--avatar-bg)',
      });
    });


    it('has default shadow', () => {
      render(<AvatarGlass name="John Doe" />);
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveStyle({
        boxShadow: 'var(--avatar-shadow)',
      });
    });
  });

  describe('Multiple Avatars', () => {
    it('renders multiple avatars independently', () => {
      const { container } = render(
        <>
          <AvatarGlass name="John Doe" />
          <AvatarGlass name="Jane Smith" />
          <AvatarGlass name="Bob Johnson" />
        </>
      );

      const avatars = container.querySelectorAll('[role="img"]');
      expect(avatars).toHaveLength(3);
    });

    it('each avatar has correct initials', () => {
      render(
        <>
          <AvatarGlass name="John Doe" />
          <AvatarGlass name="Jane Smith" />
        </>
      );

      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('each avatar can have different statuses', () => {
      const { container } = render(
        <>
          <AvatarGlass name="John Doe" status="online" />
          <AvatarGlass name="Jane Smith" status="busy" />
        </>
      );

      const statuses = container.querySelectorAll('[role="status"]');
      expect(statuses).toHaveLength(2);
    });
  });
});
